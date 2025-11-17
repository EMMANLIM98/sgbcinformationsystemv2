"use client";

import {
  MemberEditSchema,
  memberEditSchema,
} from "@/lib/schemas/memberEditSchema";
import { Member } from "@prisma/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardBody,
  CardHeader,
} from "@heroui/react";
import { updateMemberProfile } from "@/app/actions/userActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleFormServerErrors } from "@/lib/util";

type Props = {
  member: Member;
};

export default function EditForm({ member }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isDirty, isSubmitting, errors },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (member) {
      reset({
        firstName: member.firstName,
        lastName: member.lastName,
        description: member.description ?? undefined,
        city: member.city ?? undefined,
        country: member.country ?? undefined,
      });
    }
  }, [member, reset]);

  const onSubmit = async (data: MemberEditSchema) => {
    const nameUpdated =
      data.firstName !== member.firstName || data.lastName !== member.lastName;
    const result = await updateMemberProfile(data, nameUpdated);

    if (result.status === "success") {
      toast.success("Profile updated successfully");
      router.refresh();
      reset({ ...data });
    } else {
      handleFormServerErrors(result, setError);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardHeader className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Edit Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Update your personal information and profile details
            </p>
          </div>
        </CardHeader>

        <CardBody className="px-6 sm:px-8 pb-6 sm:pb-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Personal Information
              </h2>

              {/* Name Fields - Responsive Layout */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    label="First Name"
                    variant="bordered"
                    size="lg"
                    radius="lg"
                    {...register("firstName")}
                    defaultValue={member.firstName}
                    isInvalid={!!errors.firstName}
                    errorMessage={errors.firstName?.message}
                    classNames={{
                      input: "text-sm sm:text-base",
                      inputWrapper:
                        "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm",
                    }}
                    startContent={
                      <div className="text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    }
                  />
                </div>

                <div className="flex-1">
                  <Input
                    label="Last Name"
                    variant="bordered"
                    size="lg"
                    radius="lg"
                    {...register("lastName")}
                    defaultValue={member.lastName}
                    isInvalid={!!errors.lastName}
                    errorMessage={errors.lastName?.message}
                    classNames={{
                      input: "text-sm sm:text-base",
                      inputWrapper:
                        "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm",
                    }}
                    startContent={
                      <div className="text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    }
                  />
                </div>
              </div>

              {/* Description Field */}
              <div>
                <Textarea
                  label="About Me"
                  variant="bordered"
                  radius="lg"
                  {...register("description")}
                  defaultValue={member.description ?? undefined}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                  minRows={4}
                  maxRows={8}
                  placeholder="Tell others about yourself..."
                  classNames={{
                    input: "text-sm sm:text-base resize-none",
                    inputWrapper:
                      "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm",
                  }}
                />
              </div>
            </div>

            {/* Location Information Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Location
              </h2>

              {/* Location Fields - Responsive Layout */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    label="City"
                    variant="bordered"
                    size="lg"
                    radius="lg"
                    {...register("city")}
                    defaultValue={member.city ?? undefined}
                    isInvalid={!!errors.city}
                    errorMessage={errors.city?.message}
                    placeholder="Enter your city"
                    classNames={{
                      input: "text-sm sm:text-base",
                      inputWrapper:
                        "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm",
                    }}
                    startContent={
                      <div className="text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    }
                  />
                </div>

                <div className="flex-1">
                  <Input
                    label="Country"
                    variant="bordered"
                    size="lg"
                    radius="lg"
                    {...register("country")}
                    defaultValue={member.country ?? undefined}
                    isInvalid={!!errors.country}
                    errorMessage={errors.country?.message}
                    placeholder="Enter your country"
                    classNames={{
                      input: "text-sm sm:text-base",
                      inputWrapper:
                        "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm",
                    }}
                    startContent={
                      <div className="text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errors.root?.serverError && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                  {errors.root.serverError.message}
                </p>
              </div>
            )}

            {/* Action Buttons - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="bordered"
                radius="lg"
                size="lg"
                className="w-full sm:w-auto border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800 transition-all duration-200"
                onPress={() => router.back()}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="solid"
                radius="lg"
                size="lg"
                isDisabled={!isValid || !isDirty}
                isLoading={isSubmitting}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="hidden sm:inline">Updating...</span>
                    <span className="sm:hidden">Saving...</span>
                  </div>
                ) : (
                  <>
                    <span className="hidden sm:inline">Update Profile</span>
                    <span className="sm:hidden">Save Changes</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
