'use client';

import { registerUser } from '@/app/actions/authActions';
import { RegisterSchema, registerSchema } from '@/lib/schemas/registerSchema';
import { handleFormServerErrors } from '@/lib/util';
import { Card, CardHeader, CardBody, Input, Button } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';
import UserDetailsForm from './UserDetailsForm';

export default function RegisterForm() {
    const methods = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched',
    });

    const {handleSubmit, setError, getValues, formState: { errors, isValid, isSubmitting }} = methods;

    const onSubmit = async (getValues) => {
        console.log(getValues());
        // const result = await registerUser(data);

        // if (result.status === 'success') {
        //     console.log('User registered successfully.');
        // } else {
        //     handleFormServerErrors(result, setError);
        // }
    }

    return (
        <Card className='w-2/5 mx-auto'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center'>
                    <div className='flex flex-row items-center gap-3'>
                        <GiPadlock size={30} />
                        <h1 className='text-3xl font-semibold'>Register</h1>
                    </div>
                    <p className='text-neutral-500'>Welcome to SGBC Information System</p>
                </div>
            </CardHeader>
            <CardBody>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-4'>
                            <UserDetailsForm />
                            {errors.root?.serverError && (
                                <p className='text-danger text-sm'>{errors.root.serverError.message}</p>
                            )}
                            <Button isLoading={isSubmitting} isDisabled={!isValid} fullWidth color='primary' type='submit'>
                                Register
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CardBody>
        </Card>
    )
}
