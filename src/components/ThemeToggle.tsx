'use client';

import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light'|'dark' | null>(null);

  useEffect(() => {
    // Read persisted theme or system preference on mount
    try {
      const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (stored) {
        setTheme(stored);
        document.documentElement.classList.toggle('dark', stored === 'dark');
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', prefersDark);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  if (theme === null) return null;

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <FaSun className="text-yellow-300" /> : <FaMoon />}
    </button>
  );
}