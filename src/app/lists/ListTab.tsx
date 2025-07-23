'use client';

import { Tab, Tabs } from '@heroui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Key } from 'react'
import MemberCard from '../members/MemberCard';
import { Member } from '@prisma/client';

type Props = {
    members: Member[];
    likeIds: string[];
}

export default function ListTab({ members, likeIds }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const tabs = [
        { id: 'source', label: 'Members I have liked' },
        { id: 'target', label: 'Members that liked me' },
        { id: 'mutual', label: 'Mutual likes' }
    ];

    function handleTabChange(key: Key) {
        const params = new URLSearchParams(searchParams);
        params.set('type', key.toString());
        router.replace(`${pathname}?${params.toString()}`);
    }
    return (
        <div className='flex w-full flex-col mt-10 gap-5'>
            <Tabs
                aria-label='Like Tabs'
                items={tabs}
                color='secondary'
                onSelectionChange={(key) => handleTabChange(key)}
            >
                {
                    (item) => (
                        <Tab key={item.id} title={item.label}>
                            {
                                members.length > 0 ? (
                                    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8'>
                                        {
                                            members.map(member => (
                                                <MemberCard key={member.id} member={member} likeIds={likeIds} />
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div>
                                        No members for this filter.
                                    </div>
                                )
                            }
                        </Tab>
                    )
                }
            </Tabs>
        </div>

    )
}
