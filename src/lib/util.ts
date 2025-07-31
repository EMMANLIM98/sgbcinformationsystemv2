import { differenceInYears, format } from 'date-fns';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { ZodIssue } from "zod/v3";

export function calculateAge(dob: Date | null) {
    if (!dob) return '-';
    return differenceInYears(new Date(), new Date(dob));
}

export function formatShrotDateTime(date: Date) {
    return format(date, 'dd MMM yy h:mm:a');
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

export function transformImageUrl(imageUrl?: string | null) {
    if (!imageUrl) return null;

    if (!imageUrl.includes('cloudinary')) return imageUrl;

    const uploadIndex = imageUrl.indexOf('/upload/') + '/upload/'.length;
    const transformation = 'c_fill,w_300,h_300,g_faces/';

    return `${imageUrl.slice(0, uploadIndex)}${transformation}${imageUrl.slice(uploadIndex)}`;
}

export default function truncateString(text?: string |null, num = 50) {
    if (!text) return null;
    if(text.length <= num) return text;
    return text.slice(0, num) + '...';
}