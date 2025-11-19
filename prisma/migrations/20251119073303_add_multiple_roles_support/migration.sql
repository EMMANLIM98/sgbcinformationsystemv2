-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_roleId_fkey";

-- CreateTable
CREATE TABLE "_MemberRoles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MemberRoles_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MemberRoles_B_index" ON "_MemberRoles"("B");

-- AddForeignKey
ALTER TABLE "_MemberRoles" ADD CONSTRAINT "_MemberRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberRoles" ADD CONSTRAINT "_MemberRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
