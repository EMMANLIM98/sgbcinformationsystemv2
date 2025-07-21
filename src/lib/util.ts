import { differenceInYears } from 'date-fns';

export function calculateAge(dob: Date | null) 
{
    if (!dob) return '-';
    return differenceInYears(new Date(), new Date(dob));
}