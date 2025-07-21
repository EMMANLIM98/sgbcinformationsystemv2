import { PrismaClient } from "@prisma/client";
import { membersData } from "./membersData";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function seedMembers() {
    return membersData.map(async member => prisma.member.create({
        data: {
            email: member.email,
            emailVerified: new Date(),
            firstName: member.firstName,
            lastName: member.lastName,
            image: member.image,
            dateOfBirth: new Date(member.dateOfBirth),
            spiritualBirthDate: new Date(member.spiritualBirthDate),
            gender: member.gender,
            address: member.address,
            contactNumber: member.contactNumber,
            isActive: member.isActive ?? true,
            created: new Date(member.created),
            updated: new Date(member.lastActive),
            description: member.description,
            city: member.city,
            country: member.country,
            photos: {
                create: {
                    url: member.image
                }
            },
            user: {
                create: {
                    name: member.firstName + " " + member.lastName,
                    email: member.email,
                    passwordHash: await hash("Password", 14),
                    image: member.image
                }
            }
        }
    }))
}

async function main() {
    await seedMembers();
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})