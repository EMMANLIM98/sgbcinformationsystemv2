import { z } from "zod/v3";

export const memberEditSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  contactNumber: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  roleIds: z.array(z.string()).optional(),
  groupId: z.string().optional(),
});

export type MemberEditSchema = z.infer<typeof memberEditSchema>;
