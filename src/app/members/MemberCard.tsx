"use client";

import React, { useState } from "react";
import { Member } from "@prisma/client";
import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import Link from "next/link";
import { calculateAge, transformImageUrl } from "@/lib/util";
import LikeButton from "@/components/LikeButton";
import PresenceDot from "@/components/PresenceDot";
import { toggleLikeMember } from "../actions/likeActions";

type Props = {
  member: Member;
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
    <Card fullWidth as={Link} href={`/members/${member.userId}`} isPressable>
      <Image
        isZoomed
        alt={member.firstName + " " + member.lastName}
        width={300}
        src={transformImageUrl(member.image) || "/images/user.png"}
        className="aspect-square object-cover"
      />
      <div onClick={preventLinkAction}>
        <div className="absolute top-3 right-3 z-50">
          <LikeButton
            loading={loading}
            toggleLike={toggleLike}
            hasLiked={hasLiked}
          />
        </div>
        <div className="absolute top-2 left-3 z-50">
          <PresenceDot member={member} />
        </div>
      </div>
      <CardFooter className="flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient">
        <div className="flex flex-col text-white">
          <span className="font-semibold">
            {member.firstName + " " + member.lastName},{" "}
            {calculateAge(member.dateOfBirth)}
          </span>
          {member.roles && member.roles.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {member.roles.slice(0, 2).map((role) => (
                <span
                  key={role.id}
                  className="text-xs bg-purple-600/80 px-2 py-1 rounded-full"
                >
                  {role.name}
                </span>
              ))}
              {member.roles.length > 2 && (
                <span className="text-xs bg-gray-600/80 px-2 py-1 rounded-full">
                  +{member.roles.length - 2} more
                </span>
              )}
            </div>
          )}
          <span className='te"xt-sm'>{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
