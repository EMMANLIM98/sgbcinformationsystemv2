import {z} from 'zod/v3';

export const memberEditSchema = z.object({
    firstName: z.string().min(1, {message:'Firstname is required'}),
    lastName: z.string().min(1, {message:'Lastname is required'}),
    description: z.string().min(1, {message: 'Description is required'}),
    city: z.string().min(1, {message: 'City is required'}),
    country: z.string().min(1, {message: 'Country is required'})
})

export type MemberEditSchema = z.infer<typeof memberEditSchema>