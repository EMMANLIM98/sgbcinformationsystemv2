'use client';
import { signOut } from '@/auth'
import { Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownSection, DropdownItem } from '@heroui/react'
import { Session } from 'next-auth'
import Link from 'next/link'
import React from 'react'

type Props = {
    user: Session['user']
}

export default function UserMenu({user}: Props) {
  return (
    <Dropdown placement='bottom-end'>
        <DropdownTrigger>
          <Avatar
            isBordered
            as='button'
            className='transition-transform'
            color='secondary'
            name={user?.name || 'user avatar'}
            size='sm'
            src={user?.image || '/images/user.png'}
          />
        </DropdownTrigger>
        <DropdownMenu variant='flat' aria-label='User actions menu'>
          <DropdownSection showDivider>
            <DropdownItem key='signInAs' isReadOnly as='span' className='h-14 flex flex-row' aria-label='username'>
              Signed in as {user?.name}
            </DropdownItem>
          </DropdownSection>
          <DropdownItem key='editProfile' as={Link} href='/members/edit'>
            Edit Profile
          </DropdownItem>
          <DropdownItem key='logOut' color='danger' onPress={() => signOut()}>
            Logout
          </DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}
