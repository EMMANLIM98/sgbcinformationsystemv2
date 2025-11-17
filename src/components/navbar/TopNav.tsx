import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { Button } from "@heroui/button";
import Link from "next/link";
import React from "react";
import { Image } from "@heroui/image";
import NavLink from "./NavLink";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";
import { getUserInfoForNav } from "@/app/actions/userActions";
import FiltersWrapper from "./FiltersWrapper";
import MobileDrawer from "./MobileDrawer";
import ThemeToggle from "@/components/ThemeToggle";

export default async function TopNav() {
  const session = await auth();
  const userInfo = session?.user && (await getUserInfoForNav());

  const memberLinks = [
    { href: "/members", label: "Members" },
    { href: "/lists", label: "Lists" },
    { href: "/messages", label: "Messages" },
  ];

  const adminLinks = [{ href: "/admin/moderation", label: "Photo Moderation" }];

  const links = session?.user.role === "ADMIN" ? adminLinks : memberLinks;

  return (
    <>
      <Navbar
        maxWidth="xl"
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm"
        height="72px"
      >
        {/* Professional Logo - Responsive */}
        <NavbarBrand
          as={Link}
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
        >
          {/* Logo Image Container */}
          <div className="relative">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              <Image
                src="/images/SGBC_Logo.ico"
                alt="SGBC Logo"
                width={28}
                height={28}
                className="object-contain"
                classNames={{
                  img: "filter brightness-0 invert", // Makes logo white on colored background
                }}
              />
            </div>
            {/* Optional: Add a small indicator dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></div>
          </div>

          {/* Logo Text - Desktop */}
          <div className="hidden sm:block">
            <div className="flex flex-col">
              <div className="text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-700 dark:from-gray-100 dark:via-gray-200 dark:to-emerald-300 bg-clip-text text-transparent">
                SGBC Information System
              </div>
            </div>
          </div>

          {/* Logo Text - Mobile (Compact) */}
          <div className="sm:hidden">
            <div className="flex flex-col">
              <div className="text-lg font-bold bg-gradient-to-r from-gray-900 to-emerald-700 dark:from-gray-100 dark:to-emerald-300 bg-clip-text text-transparent">
                SGBC
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                Information System
              </div>
            </div>
          </div>
        </NavbarBrand>

        {/* Center Navigation - Desktop Only */}
        <NavbarContent justify="center" className="hidden md:flex">
          {session &&
            links.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
        </NavbarContent>

        {/* End Content - Desktop Only */}
        <NavbarContent
          justify="end"
          className="hidden md:flex items-center gap-4"
        >
          <ThemeToggle />
          {userInfo ? (
            <UserMenu userInfo={userInfo} />
          ) : (
            <div className="flex items-center gap-3">
              <Button
                as={Link}
                href="/login"
                variant="ghost"
                radius="lg"
                className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors duration-200"
              >
                Sign in
              </Button>
              <Button
                as={Link}
                href="/register"
                radius="lg"
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                Get started
              </Button>
            </div>
          )}
        </NavbarContent>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <MobileDrawer links={links} userInfo={userInfo} />
        </div>
      </Navbar>
      <FiltersWrapper />
    </>
  );
}
