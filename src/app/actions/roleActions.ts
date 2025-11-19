"use server";

import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types";
import { Role } from "@prisma/client";

export async function getMemberRoles(): Promise<ActionResult<MemberRole[]>> {
  try {
    const roles = await prisma.memberRole.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });

    return { status: "success", data: roles };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Failed to fetch roles" };
  }
}
