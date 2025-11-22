"use client";

import React from "react";
import { Member } from "@prisma/client";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { calculateAge, transformImageUrl } from "@/lib/util";

type Props = {
  member: Member & {
    Roles?: { name: string; id: string }[];
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

  if (isMobile) {
    return (
      <div className="space-y-4">
        {/* Mobile Member Info Card */}
        <Card className="w-full">
          <CardBody className="p-4">
            <div className="flex items-center gap-4">
              <Image
                alt={`${member.firstName} ${member.lastName}`}
                src={transformImageUrl(member.image) || "/images/user.png"}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold truncate bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                  {member.firstName} {member.lastName}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {calculateAge(member.dateOfBirth)} years old
                </p>
                {member.city && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                    {member.city}
                  </p>
                )}
              </div>
            </div>

            {/* Mobile Roles */}
            {member.Roles && member.Roles.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {member.Roles.slice(0, 3).map((role) => (
                  <span
                    key={role.id}
                    className="text-xs bg-gradient-to-r from-emerald-500 to-green-500 text-white px-2 py-1 rounded-full"
                  >
                    {role.name}
                  </span>
                ))}
                {member.Roles.length > 3 && (
                  <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                    +{member.Roles.length - 3}
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
                className={`flex-shrink-0 ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white"
                    : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                {link.name}
              </Button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <Card className="w-full h-fit">
      <CardHeader className="pb-4">
        <div className="flex flex-col items-center text-center w-full">
          <Image
            alt={`${member.firstName} ${member.lastName}`}
            src={transformImageUrl(member.image) || "/images/user.png"}
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
            {member.firstName} {member.lastName}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {calculateAge(member.dateOfBirth)} years old
          </p>
          {member.city && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              {member.city}
            </p>
          )}
        </div>
      </CardHeader>

      <CardBody className="pt-0">
        {/* Desktop Roles */}
        {member.Roles && member.Roles.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {member.Roles.map((role) => (
                <span
                  key={role.id}
                  className="text-xs bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded-full"
                >
                  {role.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Button
                key={link.name}
                as={Link}
                href={link.href}
                variant={isActive ? "solid" : "light"}
                fullWidth
                className={`justify-start ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white"
                    : "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                }`}
              >
                {link.name}
              </Button>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
