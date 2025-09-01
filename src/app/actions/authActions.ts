'use server';

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { combinedRegisterSchema, registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { date } from "zod";
import { ZodIssue } from "zod/v3";

export async function signInUser(data: LoginSchema): Promise<ActionResult<string>> {
    try {
        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        });
        console.log(result);

        return { status: 'success', data: 'Logged in successfully.' };
    } catch (error) {
        console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { status: 'error', error: 'Invalid email or password.' };
                default:
                    return { status: 'error', error: 'An unexpected error occurred.' };
            }
        } else {
            return { status: 'error', error: 'An unexpected error occurred.' };
        }
    }
}

export async function signOutUser() {
    await signOut({ redirectTo: '/' });
}

export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
    try {
        const validated = combinedRegisterSchema.safeParse(data);

        if (!validated.success) {
            return { status: 'error', error: validated.error.issues as ZodIssue[] };
        }

        const { firstname, lastname, email, password, gender, description, city, country, dateOfBirth } = validated.data;

        const hashedPassword = await bcrypt.hash(password, 14);

        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        })

        if (existingUser) {
            return { status: 'error', error: 'User already exists with this email.' }
        }

        const user = await prisma.user.create({
            data: {
                name: `${firstname} ${lastname}`,
                email: email,
                passwordHash: hashedPassword,
                Member: {
                    create:{
                        firstName: firstname,
                        lastName: lastname,
                        description,
                        city,
                        country,
                        dateOfBirth: new Date(dateOfBirth),
                        gender
                    }
                }
            }
        })

        return { status: 'success', data: user }
    } catch (error) {
        console.log(error);
        return { status: 'error', error: 'An unexpected error occurred.' }
    }
}

export async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email: email }
    })
}

export async function getUserById(id: string) {
    return await prisma.user.findUnique({
        where: { id: id }
    })
}

export async function getAuthUserId() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) throw new Error("Unauthorized");
    return userId;
}