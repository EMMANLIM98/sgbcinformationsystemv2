import { getMemberPhotosByUserId } from '@/app/actions/memberActions';
import { CardBody, CardHeader } from '@heroui/card'
import { Divider } from '@heroui/divider'
import Image from 'next/image';
import React from 'react'

export default async function PhotosPage({params}: Promise<{ userId: string }>) {
    const {userId} = await params;
    console.log('userId', userId);
    const photos = await getMemberPhotosByUserId(userId);

    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Photos
            </CardHeader>
            <Divider />
            <CardBody>
                <div className='grid grid-cols-5 gap-3'>
                    {photos && photos.map(photo => (
                        <div key={photo.id}>
                            <Image 
                                width={300}
                                height={300}
                                src={photo.url}
                                alt='Image of member'
                                className='object-cover aspect-square'
                            />
                        </div>
                    ))}
                </div>
            </CardBody>
        </>
    )
}
