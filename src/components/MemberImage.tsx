'use client';

import { Photo } from '@prisma/client';
import { CldImage } from 'next-cloudinary';
import React from 'react';
import { Image } from '@heroui/image';
import clsx from 'clsx';

type Props = {
    photo: Photo | null;
}

export default function MemberImage({ photo }: Props) {
    return (
        <div>
            {photo?.publicId ? (
                <CldImage
                    alt='image of member'
                    src={photo.publicId}
                    width={300}
                    height={300}
                    crop='fill'
                    gravity='faces'
                    className={clsx('rounded-2xl',{
                        'opacity-40': !photo.isApproved
                    })}
                    priority
                />
            ) : (
                <Image
                    width={220}
                    src={photo?.url || '/images/user.png'}
                    alt='Image of user'
                />
            )}
            {!photo?.isApproved && (
                <div className='absolute bottom-2 w-full bg-slate-200 p-1'>
                    <div className='flex justify-center text-danger font-semibold'>
                        Awaiting Approval
                    </div>
                </div>
            )}
        </div>
    )
}
