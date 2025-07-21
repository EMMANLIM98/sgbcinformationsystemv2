import React from 'react'
import { Member } from '@prisma/client'
import { Card, CardFooter } from '@heroui/card'
import { Image } from '@heroui/image'


type Props = {
    member: Member
}

export default function MemberCard({ member }: Props) {
    return (
        <Card fullWidth>
            <Image
                isZoomed
                alt={member.firstName + ' ' + member.lastName}
                width={300}
                src={member.image || '/images/user.png'}
                className='aspect-square object-cover'
            />
            <CardFooter>
                <div className='flex flex-col text-white'>
                    <span className='font-semibold'>{member.firstName + ' ' + member.lastName}</span>
                    <span className='te"xt-sm'>{member.city}</span>
                </div>
            </CardFooter>
        </Card>
    )
}
