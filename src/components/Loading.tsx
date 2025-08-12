import { Spinner } from '@heroui/react'
import React from 'react'

export default function Loading({ label }: { label?: string }) {
    return (
        <div className='flex justify-center items-center vertical-center'>
            <Spinner
                label={label || 'Loading...'}
                color='secondary'
                labelColor='secondary'
            />
        </div>
    )
}
