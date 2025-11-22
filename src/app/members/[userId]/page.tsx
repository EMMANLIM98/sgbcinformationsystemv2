import { getMemberByUserId } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import React from "react";
import ViewForm from "./ViewForm";

export default async function MemberDetailedPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return (
    <div className="w-full h-full">
      <ViewForm member={member} />
    </div>
  );
}
