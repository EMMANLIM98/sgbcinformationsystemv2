import { PrismaClient } from "@prisma/client";
import { membersData } from "./membersData";
import { groupsData } from "./groupsData";
import { rolesData } from "./rolesData";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function seedMembers() {
  return membersData.map(async (member) =>
    prisma.member.create({
      data: {
        email: member.email,
        emailVerified: new Date(),
        name: `${member.firstName} ${member.lastName}`,
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
            url: member.image,
            isApproved: true,
          },
        },
        user: {
          create: {
            name: `${member.firstName} ${member.lastName}`,
            firstName: member.firstName,
            lastName: member.lastName,
            email: member.email,
            emailVerified: new Date(member.emailVerified),
            passwordHash: await hash("Password", 14),
            image: member.image,
            profileComplete: true,
          },
        },
      },
    })
  );
}

async function seedGroup() {
  return groupsData.map(async (group) =>
    prisma.group.create({
      data: {
        name: group.name,
        description: group.description,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
  );
}

async function seedRole() {
  return rolesData.map(async (role) =>
    prisma.role.create({
      data: {
        name: role.name,
        description: role.description,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
  );
}

async function main() {
  if (
    process.env.RUN_SEED === "true" ||
    process.env.NODE_ENV === "development"
  ) {
    await seedMembers();
    await seedGroup();
    await seedRole();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
