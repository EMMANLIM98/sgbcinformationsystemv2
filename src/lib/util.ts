import { differenceInYears } from 'date-fns';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { ZodIssue } from "zod/v3";

export function calculateAge(dob: Date | null) {
    if (!dob) return '-';
    return differenceInYears(new Date(), new Date(dob));
}

export function handleFormServerErrors<TFieldValues extends FieldValues>(errorResponse: { error: string | ZodIssue[] }, setError: UseFormSetError<TFieldValues>) {
    let errors = errorResponse.error;

    if (typeof errors === 'string') {
        try {
           errors = JSON.parse(errors);
        } catch (error) {
            console.log(error);
            setError('root.serverError', { message: String(error) });
        }
    }

    if (Array.isArray(errors)) {
        errors.forEach((e) => {
            const fieldName = e.path.join('.') as Path<TFieldValues>;
            setError(fieldName, { message: e.message });
        })
    } else {
        setError('root.serverError', { message: typeof errorResponse.error === 'string' ? errorResponse.error : JSON.stringify(errorResponse.error) });
    }
}