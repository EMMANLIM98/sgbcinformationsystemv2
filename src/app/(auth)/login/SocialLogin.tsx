import { Button } from '@heroui/react'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import {signIn} from 'next-auth/react'

export default function SocialLogin() {
    const onClick = (provider: 'google' | 'github') => {
        signIn(provider, {callbackUrl: '/members'
            
        });
    }
    return (
        <div className='flex w-full gap-2 flex-col sm:flex-row'>
            <Button
                size='lg'
                fullWidth
                variant='bordered'
                className='flex-1'
                onPress={() => onClick('google')}
            >
                <FcGoogle size={20} />
                <span className='ml-2 hidden sm:inline'>Continue with Google</span>
            </Button>
            <Button
                size='lg'
                fullWidth
                variant='bordered'
                className='flex-1'
                onPress={() => onClick('github')}
            >
                <FaGithub size={20} />
                <span className='ml-2 hidden sm:inline'>Continue with GitHub</span>
            </Button>
        </div>
    )
}
