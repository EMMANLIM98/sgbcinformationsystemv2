'use client';

import { Button, Select, SelectItem, Slider } from '@heroui/react';
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaMale, FaFemale } from 'react-icons/fa'

export default function Filters() {
    const pathname = usePathname();

    const orderbyList = [
        { label: 'Last Active', value: 'updated' },
        { label: 'Newest Members', value: 'created' }
    ];

    const genders = [
        { label: 'male', icon: FaMale },
        { label: 'female', icon: FaFemale }
    ];

    if (pathname !== '/members') return null;

    return (
        <div className='shadow-md py-2'>
            <div className='flex flex-row justify-around items-center'>
                <div className='text-secondary font-semibold text-xl'>Results: 10</div>
                <div className='flex gap-2 items-center'>
                    <div>Gender:</div>
                    {genders.map(({ icon: Icon, label }) => (
                        <Button
                            key={label}
                            size='sm'
                            isIconOnly
                            color='secondary'
                        >
                            <Icon size={24} />
                        </Button>
                    ))}
                </div>
                <div className='flex flex-row items-center gap-2 w-1/4'>
                    <Slider 
                        label='Age Range'
                        color='secondary'
                        size='sm'
                        minValue={1}
                        maxValue={100}
                        defaultValue={[1, 100]}
                    />
                </div>
                <div className='w-1/4'>
                    <Select
                        size='sm'
                        fullWidth
                        placeholder='Order By'
                        variant='bordered'
                        color='secondary'
                        aria-label='Order by selector'
                    >
                        {orderbyList.map(item => (
                            <SelectItem key={item.value}>
                                {item.label}
                            </SelectItem> 
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    )
}
