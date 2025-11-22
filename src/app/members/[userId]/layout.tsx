import { getMemberByUserId } from "@/app/actions/memberActions";
import React, { ReactNode } from "react";
import MemberSidebar from "../MemberSidebar";
import { notFound } from "next/navigation";
import { Card } from "@heroui/card";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  const basePath = `/members/${member.userId}`;

  const navLinks = [
    { name: "Profile", href: `${basePath}` },
    { name: "Photos", href: `${basePath}/photos` },
    { name: "Chat", href: `${basePath}/chat` },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4">
        {/* Mobile Sidebar - Horizontal scroll */}
        <div className="w-full">
          <MemberSidebar member={member} navLinks={navLinks} isMobile={true} />
        </div>

        {/* Mobile Content */}
        <Card className="w-full min-h-[60vh] overflow-hidden">
          <div className="h-full overflow-y-auto">{children}</div>
        </Card>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 xl:gap-8 min-h-[80vh]">
        {/* Desktop Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-6">
            <MemberSidebar
              member={member}
              navLinks={navLinks}
              isMobile={false}
            />
          </div>
        </div>

        {/* Desktop Content */}
        <div className="lg:col-span-8 xl:col-span-9">
          <Card className="w-full h-[80vh] overflow-hidden">
            <div className="h-full overflow-y-auto">{children}</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
