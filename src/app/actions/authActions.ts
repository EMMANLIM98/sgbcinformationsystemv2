'use server';

import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ZodIssue } from "zod/v3";

export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
    try {
        const validated = registerSchema.safeParse(data);

        if (!validated.success) {
            return { status: 'error', error: validated.error.issues as ZodIssue[] };
        }

        const {name, email, password} = validated.data;

        const hashedPassword = await bcrypt.hash(password, 14);

        const existingUser = await prisma.user.findUnique({
            where: { email: email }        
        })

        if (existingUser) {
            return {status: 'error', error: 'User already exists with this email.'}
        }

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                passwordHash: hashedPassword
            }
        })

        return {status: 'success', data: user}
    } catch (error) {
        console.log(error);
        return {status: 'error', error: 'An unexpected error occurred.'}
    }

    
}