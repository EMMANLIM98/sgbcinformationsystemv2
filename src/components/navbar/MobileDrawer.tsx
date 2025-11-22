"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { IoClose, IoMenu, IoPersonCircle } from "react-icons/io5";
import { transformImageUrl } from "@/lib/util";

type LinkItem = { href: string; label: string };

export default function MobileDrawer({
  links,
  userInfo,
}: {
  links: LinkItem[];
  userInfo: any;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && open) {
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
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    } else {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
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
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-drawer"
        onClick={() => setOpen((s) => !s)}
        className="p-2 rounded-md inline-flex items-center justify-center bg-transparent md:hidden"
      >
        {open ? <IoClose size={22} /> : <IoMenu size={22} />}
      </button>

      {open &&
        createPortal(
          <>
            {/* Enhanced overlay with backdrop blur */}
            <div
              role="presentation"
              onClick={() => setOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] transition-opacity duration-300"
              style={{ pointerEvents: "auto" }}
            />

            {/* Professional mobile user panel */}
            <aside
              ref={panelRef}
              className="fixed left-0 top-0 bottom-0 z-[1001] w-80 max-w-full bg-white dark:bg-slate-800 shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-out"
              style={{
                pointerEvents: "auto",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              aria-label="Mobile user menu"
              onClick={(e) => e.stopPropagation()}
            >
              {/* User profile header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-xl text-gray-900 dark:text-gray-100">
                    Menu
                  </h2>
                  <button
                    ref={closeBtnRef}
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <IoClose size={20} />
                  </button>
                </div>

                {/* User info display */}
                {userInfo ? (
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={
                          transformImageUrl(userInfo.image) ||
                          "/images/user.png"
                        }
                        alt="User avatar"
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {userInfo.firstName} {userInfo.lastName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Welcome back!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                      <IoPersonCircle size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        Guest User
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Sign in to get started
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation with professional styling */}
              <nav className="p-6 space-y-2" aria-label="Mobile navigation">
                {userInfo &&
                  links.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-200 font-medium"
                    >
                      <div className="w-1 h-1 bg-gray-400 group-hover:bg-emerald-500 rounded-full transition-colors duration-200"></div>
                      {item.label}
                    </Link>
                  ))}

                {/* Divider with emerald accent */}
                <div className="my-6">
                  <div className="border-t border-gray-200 dark:border-gray-700 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-px bg-gradient-to-r from-emerald-500 to-blue-500"></div>
                    </div>
                  </div>
                </div>

                {/* Auth section with enhanced styling */}
                {userInfo ? (
                  <div className="space-y-2">
                    <Link
                      href="/members/edit"
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-200 font-medium"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors duration-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit Profile
                    </Link>

                    <Link
                      href="/members"
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 font-medium"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      View Profile
                    </Link>

                    <button
                      onClick={() => {
                        setOpen(false);
                        // Add logout logic here
                        window.location.href = "/api/auth/signout";
                      }}
                      className="group flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium w-full text-left"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 font-medium border border-gray-200 dark:border-gray-600"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Sign In
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Get Started
                    </Link>
                  </div>
                )}
              </nav>

              {/* Footer with branding */}
              <div className="mt-auto p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-900/50">
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SGBC Information System by SGBC (Main) ITM
                  </p>
                  <div className="flex justify-center mt-2">
                    <div className="w-16 h-px bg-gradient-to-r from-emerald-500 to-blue-500"></div>
                  </div>
                </div>
              </div>
            </aside>
          </>,
          document.body
        )}
    </>
  );
}
