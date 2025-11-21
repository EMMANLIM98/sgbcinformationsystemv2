"use server";

import {
  memberEditSchema,
  MemberEditSchema,
} from "@/lib/schemas/memberEditSchema";
import { ActionResult } from "@/types";
import { Member, Photo } from "@prisma/client";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { cloudinary } from "@/lib/cloudinary";

export async function updateMemberProfile(
  data: MemberEditSchema,
  nameUpdated: boolean
): Promise<ActionResult<Member>> {
  try {
    const userId = await getAuthUserId();

    const validated = memberEditSchema.safeParse(data);

    if (!validated.success)
      return { status: "error", error: validated.error.message };

    const {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      contactNumber,
      address,
      description,
      city,
      country,
      roleIds,
      groupId,
    } = validated.data;

    if (nameUpdated) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          firstName: firstName,
          lastName: lastName,
        },
      });
    }

    const member = await prisma.member.update({
      where: { userId },
      data: {
        firstName,
        lastName,
        gender,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        contactNumber: contactNumber || null,
        address: address || null,
        description: description || null,
        city: city || null,
        country: country || null,
        // Update roles - disconnect all current roles and connect new ones
        Roles: {
          set: [], // Disconnect all current roles
          connect:
            roleIds && roleIds.length > 0 ? roleIds.map((id) => ({ id })) : [],
        },
        groupId: groupId || null,
      },
      include: {
        Roles: true,
        Group: true,
      },
    });
    return { status: "success", data: member };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function addImage(url: string, publicId: string) {
  try {
    const userId = await getAuthUserId();
    return prisma.member.update({
      where: { userId },
      data: {
        photos: {
          create: [
            {
              url,
              publicId,
            },
          ],
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteImage(photo: Photo) {
  try {
    const userId = await getAuthUserId();
    if (photo.publicId) {
      await cloudinary.v2.uploader.destroy(photo.publicId);
    }
    return prisma.member.update({
      where: { userId },
      data: {
        photos: {
          delete: { id: photo.id },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function setMainImage(photo: Photo) {
  if (!photo.isApproved)
    throw new Error("Only approved photos can be set as main image.");
  try {
    const userId = await getAuthUserId();
    await prisma.user.update({
      where: { id: userId },
      data: { image: photo.url },
    });
    return prisma.member.update({
      where: { userId },
      data: { image: photo.url },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfoForNav() {
  try {
    const userId = await getAuthUserId();
    return prisma.user.findUnique({
      where: { id: userId },
      select: { firstName: true, lastName: true, image: true },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
