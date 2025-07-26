import { CardHeader, Divider, CardBody, Image } from '@heroui/react'
import React from 'react'
import { getAuthUserId } from '@/app/actions/authActions'
import { getMemberPhotosByUserId } from '@/app/actions/memberActions';

export default async function PhotosPage() {
    const userId = await getAuthUserId();
    const photos = await getMemberPhotosByUserId(userId);

    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Edit Profile
            </CardHeader>
            <Divider />
            <CardBody>
                <div className='grid grid-cols-5 gap-3 p-5'>
                    {photos && photos.map(photo => (
                        <div key={photo.id} className='relative'>
                            <Image
                                width={220}
                                height={220}
                                src={photo.url}
                                alt='Image of user'
                            />
                        </div>
                    ))}
                </div>
            </CardBody>
        </>
    )
}
