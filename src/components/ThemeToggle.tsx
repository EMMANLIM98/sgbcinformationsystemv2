'use client';

import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (stored) {
        setTheme(stored);
        document.documentElement.classList.toggle('dark', stored === 'dark');
        return;
      }
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    } catch (e) {
      setTheme('light');
    }
  }, []);

  const toggle = () => {
    const map = { dark: 'light', light: 'dark' } as const;
    const next = (map as Record<string, 'light' | 'dark'>)[theme as string] ?? 'dark';
    setTheme(next);
    try { localStorage.setItem('theme', next); } catch { }
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  if (theme === null) return null;

  return (
    <button
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onClick={toggle}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition"
    >
      {theme === 'dark' ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-black" />}
    </button>
  );
}