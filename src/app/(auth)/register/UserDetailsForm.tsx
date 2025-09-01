'use client';

import { Input } from '@heroui/react';
import React from 'react'
import { useFormContext } from 'react-hook-form';


export default function UserDetailsForm() {
  const {register, formState: { errors }} = useFormContext();
  return (
    <div className='space-y-4'>
      <Input
        defaultValue=''
        label='Firstname'
        variant='bordered'
        {...register('firstname')}
        isInvalid={!!errors.firstname}
        errorMessage={errors.firstname?.message as string}
      />
      <Input
        defaultValue=''
        label='Lastname'
        variant='bordered'
        {...register('lastname')}
        isInvalid={!!errors.lastname}
        errorMessage={errors.lastname?.message as string}
      />
      <Input
        defaultValue=''
        label='Email'
        variant='bordered'
        {...register('email')}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message as string}
      />
      <Input
        defaultValue=''
        label='Password'
        variant='bordered'
        type='password'
        {...register('password')}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message as string}
      />
    </div>
  )
}
