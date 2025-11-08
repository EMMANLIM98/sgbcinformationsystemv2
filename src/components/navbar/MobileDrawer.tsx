'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { IoClose, IoMenu } from 'react-icons/io5';

type LinkItem = { href: string; label: string };

export default function MobileDrawer({ links, userInfo }: { links: LinkItem[]; userInfo: any }) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
            if (e.key === 'Tab' && open) {
                const panel = panelRef.current;
                if (!panel) return;
                const focusable = panel.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
                );
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        if (open) {
            document.addEventListener('keydown', onKey);
            document.body.style.overflow = 'hidden';
            setTimeout(() => closeBtnRef.current?.focus(), 0);
        } else {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open]);

    if (!mounted) {
        return (
            <button
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-drawer"
                onClick={() => setOpen(true)}
                className="p-2 rounded-md inline-flex items-center justify-center bg-transparent md:hidden"
            >
                <IoMenu size={22} />
            </button>
        );
    }

    return (
        <>
            <button
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-drawer"
                onClick={() => setOpen(s => !s)}
                className="p-2 rounded-md inline-flex items-center justify-center bg-transparent md:hidden"
            >
                {open ? <IoClose size={22} /> : <IoMenu size={22} />}
            </button>

            {open &&
                createPortal(
                    <>
                        {/* overlay: inline style guarantees visible background */}
                        <div
                            role="presentation"
                            onClick={() => setOpen(false)}
                            aria-hidden="true"
                            style={{
                               position: 'fixed',
                                inset: 0,
                                backgroundColor: 'rgba(0,0,0,0.72)',
                                zIndex: 1000,
                                pointerEvents: 'auto'
                            }}
                        />

                        {/* panel: fixed to left, explicit width, sits above overlay */}
                        <aside
                            ref={panelRef}
                            style={{
                                position: 'fixed',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: 320,
                                maxWidth: '100%',
                                backgroundColor: '#ffffff',
                                color: '#111827',
                                padding: '1rem',
                                zIndex: 1001,
                                boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
                                overflowY: 'auto',
                                pointerEvents: 'auto'
                            }}
                            aria-label="Mobile menu"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between">
                                <div className="font-bold text-lg">Menu</div>
                                <button
                                    ref={closeBtnRef}
                                    onClick={() => setOpen(false)}
                                    aria-label="Close menu"
                                    className="p-2 rounded-md"
                                >
                                    <IoClose size={20} />
                                </button>
                            </div>

                            <nav className="mt-4 flex flex-col gap-2" aria-label="Mobile navigation">
                                {links.map(item => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className="block px-3 py-2 rounded hover:bg-gray-100"
                                        style={{ color: '#111827' }}
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                <div className="border-t my-3" />

                                {userInfo ? (
                                    <Link href="/members" onClick={() => setOpen(false)} className="block px-3 py-2" style={{ color: '#111827' }}>
                                        Profile
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/login" onClick={() => setOpen(false)} className="block px-3 py-2" style={{ color: '#111827' }}>
                                            Login
                                        </Link>
                                        <Link href="/register" onClick={() => setOpen(false)} className="block px-3 py-2" style={{ color: '#111827' }}>
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </aside>
                    </>,
                    document.body
                )}
        </>
    );
}