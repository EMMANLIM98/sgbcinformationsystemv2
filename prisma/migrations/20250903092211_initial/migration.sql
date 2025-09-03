-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('VERIFICATION', 'PASSWORD_RESET');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- CreateTable
CREATE TABLE "sgbcinformationsystem_Groups" (
    "Id" SERIAL NOT NULL,
    "Name" VARCHAR(256) NOT NULL DEFAULT '',
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "sgbcinformationsystem_Groups_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "sgbcinformationsystem_Logins" (
    "Id" SERIAL NOT NULL,
    "Username" VARCHAR(256) NOT NULL DEFAULT '',
    "Password" VARCHAR(256) NOT NULL DEFAULT '',
    "LastLogin" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "sgbcinformationsystem_Logins_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "sgbcinformationsystem_Members" (
    "Id" SERIAL NOT NULL,
    "FirstName" VARCHAR(256) NOT NULL,
    "LastName" VARCHAR(256) NOT NULL,
    "Email" VARCHAR(256) DEFAULT '',
    "Mobile" VARCHAR(15) DEFAULT '',
    "Birthdate" DATE,
    "Address" VARCHAR(256) DEFAULT '',
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "Group" INTEGER DEFAULT 0,
    "Role" INTEGER DEFAULT 0,
    "Login" INTEGER DEFAULT 0,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMPTZ(6),
    "SpiritualBirthdate" DATE,

    CONSTRAINT "sgbcinformationsystem_Members_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "sgbcinformationsystem_Roles" (
    "Id" SERIAL NOT NULL,
    "Name" VARCHAR(256) NOT NULL DEFAULT '',
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "sgbcinformationsystem_Roles_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "sgbcinformationsystem_Visitors" (
    "Id" SERIAL NOT NULL,
    "FirstName" VARCHAR(256) NOT NULL,
    "LastName" VARCHAR(256) NOT NULL,
    "Email" VARCHAR(256) DEFAULT '',
    "Mobile" VARCHAR(15) DEFAULT '',
    "Birthdate" DATE,
    "Address" VARCHAR(256) DEFAULT '',
    "WillingToBeVisited" BOOLEAN NOT NULL DEFAULT false,
    "DateAttended" DATE,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "sgbcinformationsystem_Visitors_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "passwordHash" TEXT,
    "image" TEXT,
    "profileComplete" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "gender" TEXT NOT NULL,
    "address" TEXT,
    "contactNumber" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "spiritualBirthDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "city" TEXT,
    "country" TEXT,
    "image" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "sourceUserId" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("sourceUserId","targetUserId")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT,
    "recipientId" TEXT,
    "dateRead" TIMESTAMP(3),
    "senderDeleted" BOOLEAN NOT NULL DEFAULT false,
    "recipientDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "type" "TokenType" NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Group_Idx" ON "sgbcinformationsystem_Groups"("Name");

-- CreateIndex
CREATE INDEX "Login_Idx" ON "sgbcinformationsystem_Logins"("Username");

-- CreateIndex
CREATE INDEX "MemberEmail_Idx" ON "sgbcinformationsystem_Members"("Email");

-- CreateIndex
CREATE INDEX "Role_Idx" ON "sgbcinformationsystem_Roles"("Name");

-- CreateIndex
CREATE INDEX "VisitorEmail_Idx" ON "sgbcinformationsystem_Visitors"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Member_userId_key" ON "Member"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Token_email_token_key" ON "Token"("email", "token");

-- AddForeignKey
ALTER TABLE "sgbcinformationsystem_Members" ADD CONSTRAINT "sgbcinformationsystem_Members_Group_sgbcinformationsystem_Group" FOREIGN KEY ("Group") REFERENCES "sgbcinformationsystem_Groups"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sgbcinformationsystem_Members" ADD CONSTRAINT "sgbcinformationsystem_Members_Login_sgbcinformationsystem_Login" FOREIGN KEY ("Login") REFERENCES "sgbcinformationsystem_Logins"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sgbcinformationsystem_Members" ADD CONSTRAINT "sgbcinformationsystem_Members_Role_sgbcinformationsystem_Roles_" FOREIGN KEY ("Role") REFERENCES "sgbcinformationsystem_Roles"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_sourceUserId_fkey" FOREIGN KEY ("sourceUserId") REFERENCES "Member"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "Member"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Member"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Member"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
