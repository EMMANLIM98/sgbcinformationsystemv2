'use client';

import { MemberEditSchema, memberEditSchema } from '@/lib/schemas/memberEditSchema';
import { Member } from '@prisma/client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Textarea } from '@heroui/react';
import { updateMemberProfile } from '@/app/actions/userActions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { handleFormServerErrors } from '@/lib/util';

type Props = {
  member: Member
}

export default function EditForm({ member }: Props) {
  const router = useRouter();
  const { register, handleSubmit, reset, setError, formState: { isValid, isDirty, isSubmitting, errors } } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: 'onTouched'
  });

  useEffect(() => {
    if (member) {
      reset({
        firstName: member.firstName,
        lastName: member.lastName,
        description: member.description ?? undefined,
        city: member.city ?? undefined,
        country: member.country ?? undefined
      })
    }
  }, [member, reset]);

  const onSubmit = async (data: MemberEditSchema) => {
    const nameUpdated = data.firstName !== member.firstName || data.lastName !== member.lastName;
    const result = await updateMemberProfile(data, nameUpdated);

    if (result.status === 'success') {
      toast.success('Profile updated successfully');
      router.refresh();
      reset({ ...data });
    } else {
      handleFormServerErrors(result, setError);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
      <Input
        label='First Name'
        variant='bordered'
        {...register('firstName')}
        defaultValue={member.firstName}
        isInvalid={!!errors.firstName}
        errorMessage={errors.firstName?.message}
      />
      <Input
        label='Last Name'
        variant='bordered'
        {...register('lastName')}
        defaultValue={member.lastName}
        isInvalid={!!errors.lastName}
        errorMessage={errors.lastName?.message}
      />
      <Textarea
        label='Description'
        variant='bordered'
        {...register('description')}
        defaultValue={member.description ?? undefined}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
        minRows={6}
      />
      <div className='flex flex-row gap-3'>
        <Input
          label='City'
          variant='bordered'
          {...register('city')}
          defaultValue={member.city ?? undefined}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message}
        />
        <Input
          label='Country'
          variant='bordered'
          {...register('country')}
          defaultValue={member.country ?? undefined}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message}
        />
      </div>
      {errors.root?.serverError && (
        <p className='text-danger text-sm'>{errors.root.serverError.message}</p>
      )}
      <Button
        type='submit'
        className='flex self-end'
        variant='solid'
        isDisabled={!isValid || !isDirty}
        isLoading={isSubmitting}
        color='secondary'
      >
        Update Profile
      </Button>
    </form>
  )
}
