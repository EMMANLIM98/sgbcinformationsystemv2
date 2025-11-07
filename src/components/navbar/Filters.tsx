'use client';

import { useFilters } from '@/hooks/useFilters';
import { Button, Select, SelectItem, Slider, Spinner, Switch } from '@heroui/react';
import React from 'react'

export default function Filters() {
    const { orderbyList, genderList, selectAge, selectGender, selectOrder, filters, isPending, totalCount, selectWithPhoto } = useFilters();

    return (
        <div className='shadow-md py-2 px-2 md:px-0 filters-mobile'>
            <div className='flex flex-col md:flex-row md:justify-around md:items-center gap-3'>
                <div className='flex gap-2 items-center justify-start md:justify-center w-full md:w-auto'>
                    <div className='text-secondary font-semibold text-sm md:text-xl result-count'>
                        Results: {isPending ? <Spinner size='sm' color='secondary' /> : totalCount}
                    </div>
                </div>

                <div className='flex gap-2 items-center w-full md:w-auto'>
                    <div className='text-sm md:text-base mr-1'>Gender:</div>
                    <div className='flex gap-2 items-center'>
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
                </div>

                <div className='flex items-center gap-2 w-full md:w-1/4 slider-wrapper'>
                    <div className='hidden md:block text-sm'>Age Range</div>
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

                <div className='flex flex-col items-center w-full md:w-auto'>
                    <p className='text-sm md:text-base'>With Photo</p>
                    <Switch 
                        color='secondary'
                        defaultSelected
                        size='sm'
                        onChange={selectWithPhoto}
                    />
                </div>

                <div className='w-full md:w-1/4'>
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