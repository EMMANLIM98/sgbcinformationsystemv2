"use server";

import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types";
import { Group } from "@prisma/client";

export async function getMemberGroups(): Promise<ActionResult<Group[]>> {
  try {
    const groups = await prisma.group.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });

    return { status: "success", data: groups };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Failed to fetch groups" };
  }
}
