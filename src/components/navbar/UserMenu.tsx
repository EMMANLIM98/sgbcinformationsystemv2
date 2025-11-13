"use client";

import React from "react";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/react";
import Link from "next/link";
import { transformImageUrl } from "@/lib/util";
import { signOutUser } from "@/app/actions/authActions";

type Props = {
  userInfo: {
    firstName: string | null;
    lastName: string | null;
    image: string | null;
  } | null;
};

export default function UserMenu({ userInfo }: Props) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="user-avatar transition-all duration-200 hover:scale-105"
          color="success"
          name={userInfo?.firstName + " " + userInfo?.lastName || "user avatar"}
          size="sm"
          src={transformImageUrl(userInfo?.image) || "/images/user.png"}
          classNames={{
            base: "ring-2 ring-emerald-600/20 shadow-md",
            img: "transition-all duration-200",
            name: "text-emerald-600 font-semibold",
          }}
        />
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        aria-label="User actions menu"
        className="user-dropdown bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900/30 shadow-xl rounded-xl"
      >
        <DropdownSection
          showDivider
          className="border-emerald-100 dark:border-emerald-900/30"
        >
          <DropdownItem
            key="signInAs"
            isReadOnly
            as="span"
            className="h-14 flex flex-row text-emerald-700 dark:text-emerald-300 font-semibold"
            aria-label="username"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Signed in as {userInfo?.firstName} {userInfo?.lastName}
            </div>
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          key="editProfile"
          as={Link}
          href="/members/edit"
          className="text-gray-700 dark:text-gray-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-lg transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Profile
          </div>
        </DropdownItem>
        <DropdownItem
          key="logOut"
          color="danger"
          onPress={() => signOutUser()}
          className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            Logout
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
