'use server';

import { memberEditSchema, MemberEditSchema } from "@/lib/schemas/memberEditSchema";
import { ActionResult } from "@/types";
import { Member } from "@prisma/client";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";

export async function updateMemberProfile(data: MemberEditSchema): Promise<ActionResult<Member>> {
    try {
         const userId = await getAuthUserId();

         const validated = memberEditSchema.safeParse(data);

         if (!validated.success) return {status: 'error', error: validated.error.message};

         const {firstName, lastName, description, city, country} = validated.data;

         const member = await prisma.member.update({
            where: { userId },
            data: {
                firstName,
                lastName,
                description: description || null,
                city: city || null,
                country: country || null
            }
         })
         return {status: 'success', data: member};
    } catch (error) {
        console.log(error);
        return {status: 'error', error: 'Something went wrong'};
    }
}