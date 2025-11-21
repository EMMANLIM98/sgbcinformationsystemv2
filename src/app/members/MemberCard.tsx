"use client";

import React, { useState } from "react";
import { Member, Role } from "@prisma/client";
import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import Link from "next/link";
import { calculateAge, transformImageUrl } from "@/lib/util";
import LikeButton from "@/components/LikeButton";
import PresenceDot from "@/components/PresenceDot";
import { toggleLikeMember } from "../actions/likeActions";

type Props = {
  member: Member & {
    Roles?: Role[];
  };
  likeIds: string[];
};

export default function MemberCard({ member, likeIds }: Props) {
  const [hasLiked, setHasLiked] = useState(likeIds.includes(member.userId));
  const [loading, setLoading] = useState(false);

  async function toggleLike() {
    setLoading(true);
    try {
      await toggleLikeMember(member.userId, hasLiked);
      setHasLiked(!hasLiked);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const preventLinkAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card
      fullWidth
      as={Link}
      href={`/members/${member.userId}`}
      isPressable
      className="relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      {/* Main Image */}
      <div className="relative">
        <Image
          isZoomed
          alt={`${member.firstName} ${member.lastName}`}
          width="100%"
          height={300}
          src={transformImageUrl(member.image) || "/images/user.png"}
          className="aspect-square object-cover w-full"
          classNames={{
            wrapper: "w-full",
            img: "w-full h-full object-cover",
          }}
        />

        {/* Action Buttons Overlay */}
        <div
          onClick={preventLinkAction}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Like Button */}
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-50 pointer-events-auto">
            <LikeButton
              loading={loading}
              toggleLike={toggleLike}
              hasLiked={hasLiked}
            />
          </div>

          {/* Presence Dot */}
          <div className="absolute top-2 left-2 sm:left-3 z-50 pointer-events-auto">
            <PresenceDot member={member} />
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content Footer */}
      <CardFooter className="absolute bottom-0 left-0 right-0 z-10 flex-col items-start bg-transparent p-3 sm:p-4 bg-dark-gradient">
        <div className="w-full text-white space-y-1.5 sm:space-y-2">
          {/* Name and Age */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h3 className="font-semibold text-sm sm:text-base leading-tight">
              {member.firstName} {member.lastName}
            </h3>
            <span className="text-xs sm:text-sm text-emerald-200 font-medium">
              {calculateAge(member.dateOfBirth)}
            </span>
          </div>

          {/* Roles */}
          {member.Roles && member.Roles.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {member.Roles.slice(0, 2).map((role) => (
                <span
                  key={role.id}
                  className="text-[10px] sm:text-xs bg-gradient-to-r from-emerald-500/90 to-green-500/90 hover:from-emerald-600 hover:to-green-600 px-2 py-1 rounded-full transition-all duration-200 shadow-sm font-medium backdrop-blur-sm"
                >
                  {role.name}
                </span>
              ))}
              {member.Roles.length > 2 && (
                <span className="text-[10px] sm:text-xs bg-gradient-to-r from-emerald-700/80 to-gray-600/80 px-2 py-1 rounded-full shadow-sm font-medium backdrop-blur-sm">
                  +{member.Roles.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Location */}
          {member.city && (
            <div className="flex items-center gap-1 text-gray-200">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs sm:text-sm truncate">{member.city}</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
