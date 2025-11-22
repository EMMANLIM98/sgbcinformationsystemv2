import { getMemberByUserId } from "@/app/actions/memberActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import { notFound } from "next/navigation";
import React from "react";

export default async function MemberDetailedPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <CardInnerWrapper header="Profile" body={member.description} />
    </div>
  );
}
