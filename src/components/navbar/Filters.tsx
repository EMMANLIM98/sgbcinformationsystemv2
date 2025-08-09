'use client';

import { useFilters } from '@/hooks/useFilters';
import { Button, Select, SelectItem, Slider, Spinner } from '@heroui/react';
import React from 'react'

export default function Filters() {
    const { orderbyList, genderList, selectAge, selectGender, selectOrder, filters, isPending } = useFilters();

    return (
        <div className='shadow-md py-2'>
            <div className='flex flex-row justify-around items-center'>
                <div className='flex gap-2 items-center'>
                    <div className='text-secondary font-semibold text-xl'>Results: 10</div>
                    {isPending && <Spinner size='sm' color='secondary' />}
                </div>

                <div className='flex gap-2 items-center'>
                    <div>Gender:</div>
                    {genderList.map(({ icon: Icon, label }) => (
                        <Button
                            key={label}
                            size='sm'
                            isIconOnly
                            color={filters.gender.includes(label) ? 'secondary' : 'default'}
                            onPress={() => selectGender(label)}
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
                        defaultValue={filters.ageRange}
                        onChangeEnd={(value) => selectAge(value as number[])}
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
                        selectedKeys={new Set([filters.orderBy])}
                        onSelectionChange={selectOrder}
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
