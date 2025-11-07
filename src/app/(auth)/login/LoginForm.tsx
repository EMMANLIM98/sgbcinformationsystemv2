'use client';

import { Card, CardBody, CardHeader } from '@heroui/card'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import React from 'react'
import { GiPadlock } from 'react-icons/gi'
import { useForm } from 'react-hook-form'
import { loginSchema, LoginSchema } from '@/lib/schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInUser } from '@/app/actions/authActions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import SocialLogin from './SocialLogin';

export default function LoginForm() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: LoginSchema) => {
        const result = await signInUser(data);
        if (result.status === 'success') {
            router.push('/members');
            router.refresh();
        } else {
            toast.error(result.error as string);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-base-100">
            <Card className='w-full max-w-md mx-auto px-4 sm:px-6 py-6 sm:py-8'>
                <CardHeader className='flex flex-col items-center justify-center text-center'>
                    <div className='flex flex-col gap-2 items-center'>
                        <div className='flex flex-row items-center gap-3'>
                            <GiPadlock size={30} />
                            <h1 className='text-2xl sm:text-3xl font-semibold'>Login</h1>
                        </div>
                        <p className='text-sm sm:text-base text-neutral-500 text-center'>Welcome back to SGBC Information System</p>
                    </div>
                </CardHeader>

                <CardBody>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        <Input
                            className='w-full'
                            {...register('email')}
                            placeholder='Email'
                            aria-invalid={!!errors.email}
                        />
                        {errors.email && <p className='text-xs text-red-500'>{errors.email.message}</p>}

                        <Input
                            className='w-full'
                            {...register('password')}
                            type='password'
                            placeholder='Password'
                            aria-invalid={!!errors.password}
                        />
                        {errors.password && <p className='text-xs text-red-500'>{errors.password.message}</p>}

                        <Button type='submit' size='lg' fullWidth disabled={!isValid || isSubmitting}>
                            {isSubmitting ? 'Signing in...' : 'Sign in'}
                        </Button>

                        <div className='flex items-center justify-center'>
                            <Link href='/auth/forgot' className='text-sm text-primary-600'>Forgot password?</Link>
                        </div>

                        <div className='w-full flex flex-col sm:flex-row sm:items-center gap-3'>
                            <SocialLogin />
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}
