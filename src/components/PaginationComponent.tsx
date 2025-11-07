'use client';

import usePaginationStore from '@/hooks/usePaginationStore';
import { Pagination } from '@heroui/react';
import clsx from 'clsx';
import React, { useEffect } from 'react'
import { useShallow } from 'zustand/shallow';

export default function PaginationComponent({ totalCount }: { totalCount: number }) {

    const { setPage, setPageSize, setPagination, pagination } = usePaginationStore(
        useShallow(
            state => ({
                setPage: state.setPage,
                setPageSize: state.setPageSize,
                setPagination: state.setPagination,
                pagination: state.pagination
            })));

    const { pageNumber, pageSize, totalPages } = pagination;

    useEffect(() => {
        setPagination(totalCount);
    }, [setPagination, totalCount])

    const start = (pageNumber - 1) * pageSize + 1;
    const end = Math.min(pageNumber * pageSize, totalCount);
    const resultText = `Showing ${start}-${end} of ${totalCount} results`;

    return (
        <div className='border-t-2 w-full mt-5'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-5 pagination-mobile'>
                <div className='pagination-info w-full md:w-auto text-sm md:text-base text-center md:text-left'>
                    {resultText}
                </div>

                <div className='flex items-center justify-center md:justify-center'>
                    <div className='pagination-controls'>
                        <Pagination
                            total={totalPages}
                            color='secondary'
                            page={pageNumber}
                            variant='bordered'
                            onChange={setPage}
                        />
                    </div>
                </div>

                <div className='flex flex-row gap-1 items-center justify-center md:justify-end w-full md:w-auto'>
                    <span className='text-sm'>Page size:</span>
                    <div className='flex gap-2 ml-2'>
                        {[3, 6, 12].map(size => (
                            <div
                                key={size}
                                onClick={() => setPageSize(size)}
                                className={clsx('page-size-box flex items-center justify-center', {
                                    'bg-secondary text-white hover:bg-secondary hover:text-white': pageSize === size
                                })}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
