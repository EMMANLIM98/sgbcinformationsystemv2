import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='w-full bg-base-200 text-center py-4 site-footer--fixed-mobile'>
      <div className='container mx-auto flex items-center justify-between px-4 md:px-0'>
        <div className='text-sm text-neutral-600 hidden md:block'>
          © {new Date().getFullYear()} SGBC Information System
        </div>
        <div className='flex gap-4 items-center'>
          <Link href='/privacy' className='text-sm text-neutral-600'>Privacy</Link>
          <Link href='/terms' className='text-sm text-neutral-600'>Terms</Link>
        </div>
      </div>
    </footer>
  )
}