"use client";

import React from "react";
import { Member, Role } from "@prisma/client";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { calculateAge, transformImageUrl } from "@/lib/util";

type Props = {
  member: Member & {
    Roles?: Role[];
  };
  navLinks: { name: string; href: string }[];
  isMobile?: boolean;
};

export default function MemberSidebar({
  member,
  navLinks,
  isMobile = false,
}: Props) {
  const pathname = usePathname();
  const isEditMode = pathname.includes("/edit");

  if (isMobile) {
    return (
      <div className="space-y-4">
        {/* Mobile Member Info Card */}
        <Card className="w-full shadow-md border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
          <CardBody className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  alt={`${member.firstName} ${member.lastName}`}
                  src={transformImageUrl(member.image) || "/images/user.png"}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
                {isEditMode && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold truncate bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                  {member.firstName} {member.lastName}
                </h2>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {calculateAge(member.dateOfBirth)} years old
                  </p>
                  {isEditMode && (
                    <span className="text-xs bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-700">
                      Editing
                    </span>
                  )}
                </div>
                {member.city && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 truncate mt-1">
                    📍 {member.city}
                  </p>
                )}
              </div>
            </div>

            {/* Mobile Roles - Show fewer on mobile */}
            {member.Roles && member.Roles.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {member.Roles.slice(0, 2).map((role) => (
                  <span
                    key={role.id}
                    className="text-xs bg-gradient-to-r from-emerald-500 to-green-500 text-white px-2 py-1 rounded-full font-medium"
                  >
                    {role.name}
                  </span>
                ))}
                {member.Roles.length > 2 && (
                  <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                    +{member.Roles.length - 2}
                  </span>
                )}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Mobile Navigation - Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Button
                key={link.name}
                as={Link}
                href={link.href}
                variant={isActive ? "solid" : "bordered"}
                size="sm"
                className={`flex-shrink-0 min-w-fit ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg"
                    : "border-emerald-200 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                } transition-all duration-200`}
              >
                <span className="text-xs sm:text-sm font-medium">
                  {link.name}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <Card className="w-full h-fit shadow-lg border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col items-center text-center w-full">
          <div className="relative mb-4">
            <Image
              alt={`${member.firstName} ${member.lastName}`}
              src={transformImageUrl(member.image) || "/images/user.png"}
              className="w-32 h-32 rounded-full object-cover"
            />
            {isEditMode && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center border-3 border-white dark:border-gray-800 shadow-lg">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
              {member.firstName} {member.lastName}
            </h2>

            <div className="flex items-center justify-center gap-2">
              <p className="text-gray-600 dark:text-gray-400">
                {calculateAge(member.dateOfBirth)} years old
              </p>
              {isEditMode && (
                <span className="text-xs bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-700 font-medium">
                  Edit Mode
                </span>
              )}
            </div>

            {member.city && (
              <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center justify-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {member.city}
              </p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardBody className="pt-0">
        {/* Desktop Roles */}
        {member.Roles && member.Roles.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 text-center">
              Church Roles
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {member.Roles.map((role) => (
                <span
                  key={role.id}
                  className="text-xs bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded-full font-medium shadow-sm"
                >
                  {role.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            {isEditMode ? "Edit Options" : "Navigation"}
          </h3>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Button
                key={link.name}
                as={Link}
                href={link.href}
                variant={isActive ? "solid" : "light"}
                fullWidth
                className={`justify-start h-12 ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg"
                    : "text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                } transition-all duration-200`}
                startContent={
                  isEditMode ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  ) : (
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
                  )
                }
              >
                <span className="font-medium">{link.name}</span>
              </Button>
            );
          })}
        </div>

        {/* Edit Mode Help */}
        {isEditMode && (
          <div className="mt-6 p-3 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg">
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h4 className="text-xs font-semibold text-emerald-800 dark:text-emerald-200 mb-1">
                  Edit Mode
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                  You&apos;re currently editing your profile.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
