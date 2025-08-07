'use client';

import { Button, Select, SelectItem, Slider, Selection } from '@heroui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { FaMale, FaFemale } from 'react-icons/fa'

export default function Filters() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const orderbyList = [
        { label: 'Last Active', value: 'updated' },
        { label: 'Newest Members', value: 'created' }
    ];

    const genders = [
        { label: 'male', icon: FaMale },
        { label: 'female', icon: FaFemale }
    ];

    const handleAgeSelect = (value: number[]) => {
        const params = new URLSearchParams(searchParams);
        params.set('ageRange', value.join(','));
        router.replace(`${pathname}?${params}`);
    }

    const handleOrderSelect = (value: Selection) => {
        if (value instanceof Set) {
            const params = new URLSearchParams(searchParams);
            params.set('orderBy', value.values().next().value as string);
            router.replace(`${pathname}?${params}`);
        }
    }

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
                        aria-label='Slider for age selection'
                        label='Age Range'
                        color='secondary'
                        size='sm'
                        minValue={1}
                        maxValue={100}
                        defaultValue={[1, 100]}
                        onChangeEnd={(value) => handleAgeSelect(value as number[])}
                    />
                </div>
                <div className='w-1/4'>
                    <Select
                        size='sm'
                        fullWidth
                        label='Order By'
                        variant='bordered'
                        color='secondary'
                        aria-label='Order by selector'
                        selectedKeys={new Set([searchParams.get('orderBy') || 'updated'])}
                        onSelectionChange={handleOrderSelect}
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
