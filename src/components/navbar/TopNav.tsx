import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { Button } from "@heroui/button";
import Link from "next/link";
import React from "react";
import { GiMatchTip } from "react-icons/gi";
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
        className="site-header site-header--sticky"
        classNames={{
          item: [
            "text-xl",
            "text-white",
            "uppercase",
            "data-[active=true]: text-yellow-200",
          ],
        }}
      >
        <NavbarBrand as={Link} href="/" className="flex items-center gap-2">
          <GiMatchTip size={40} className="text-gray-700" />
          <div className="font-bold text-2xl hidden md:block">
            <span className="text-gray-900">SGBC</span>
            <span className="text-gray-800 ml-1">Info</span>
          </div>
        </NavbarBrand>

        {/* center nav — hidden on mobile, shown on md+ (only links) */}
        <NavbarContent justify="center" className="hidden md:flex">
          {session &&
            links.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
        </NavbarContent>

        {/* end content — controls (theme + auth) shown on md+ */}
        <NavbarContent
          justify="end"
          className="hidden md:flex items-center gap-3"
        >
          <ThemeToggle />
          {userInfo ? (
            <UserMenu userInfo={userInfo} />
          ) : (
            <>
              <Button
                as={Link}
                href="/login"
                variant="bordered"
                className="text-white"
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/register"
                variant="bordered"
                className="text-white"
              >
                Register
              </Button>
            </>
          )}
        </NavbarContent>

        {/* mobile: single container with theme toggle + drawer button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <MobileDrawer links={links} userInfo={userInfo} />
        </div>
      </Navbar>
      <FiltersWrapper />
    </>
  );
}
