'use client';

import { generateResetPasswordEmail, resetPassword } from '@/app/actions/authActions';
import CardWrapper from '@/components/CardWrapper';
import ResultMessage from '@/components/ResultMessage';
import { ResetPasswordSchema, resetPasswordSchema } from '@/lib/schemas/forgotPasswordSchema';
import { ActionResult } from '@/types';
import { Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const [result, setResult] = useState<ActionResult<string> | null>(null);
    const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitting } } = useForm<ResetPasswordSchema>({
        mode: 'onTouched',
        resolver: zodResolver(resetPasswordSchema)
    });
    const onSubmit = async (data: ResetPasswordSchema) => {
        setResult(await resetPassword(data.password, searchParams.get('token')));
    }

    return (
        <CardWrapper
            headerIcon={GiPadlock}
            headerText='Reset Password'
            subHeaderText='Please enter your new password.'
            body={
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
                    <Input
                        type='password'
                        placeholder='Password'
                        variant='bordered'
                        defaultValue=''
                        {...register('password')}
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message as string}
                    />
                    <Input
                        type='password'
                        placeholder='Confirm Password'
                        variant='bordered'
                        defaultValue=''
                        {...register('confirmPassword')}
                        isInvalid={!!errors.confirmPassword}
                        errorMessage={errors.confirmPassword?.message as string}
                    />
                    <Button type='submit'
                        color='secondary'
                        isLoading={isSubmitting}
                        isDisabled={!isValid}
                    >
                        Reset Password
                    </Button>
                </form>
            }
            footer={
                <ResultMessage result={result} />
            }
        />
    )
}
