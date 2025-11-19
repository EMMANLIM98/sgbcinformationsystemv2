"use client";

import {
  MemberEditSchema,
  memberEditSchema,
} from "@/lib/schemas/memberEditSchema";
import { Member, Role, Group } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { updateMemberProfile } from "@/app/actions/userActions";
import { getMemberRoles } from "@/app/actions/roleActions";
import { getMemberGroups } from "@/app/actions/groupActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleFormServerErrors } from "@/lib/util";
import { format, subYears } from "date-fns";

type Props = {
  member: Member & {
    memberRole?: Role;
    memberGroup?: Group;
  };
};

export default function EditForm({ member }: Props) {
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    formState: { isValid, isDirty, isSubmitting, errors },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: "onTouched",
  });

  const dateValue = watch("dateOfBirth");

  // Fetch roles and groups on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rolesResult, groupsResult] = await Promise.all([
          getMemberRoles(),
          getMemberGroups(),
        ]);

        if (rolesResult.status === "success") {
          setRoles(rolesResult.data);
        }

        if (groupsResult.status === "success") {
          setGroups(groupsResult.data);
        }
      } catch (error) {
        console.error("Failed to fetch roles and groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (member) {
      reset({
        firstName: member.firstName,
        lastName: member.lastName,
        gender: member.gender,
        dateOfBirth: member.dateOfBirth
          ? format(new Date(member.dateOfBirth), "yyyy-MM-dd")
          : "",
        contactNumber: member.contactNumber ?? "",
        address: member.address ?? "",
        description: member.description ?? "",
        city: member.city ?? "",
        country: member.country ?? "",
        roleId: member.roleId ?? "",
        groupId: member.groupId ?? "",
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

  const genderList = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

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
            {/* Personal Details Section */}
            <div className="space-y-4">
              <h3 className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600 dark:text-emerald-400"
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
                Personal Details
              </h3>

              {/* First Name and Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  label="First Name"
                  variant="bordered"
                  size="md"
                  radius="lg"
                  {...register("firstName")}
                  isInvalid={!!errors.firstName}
                  errorMessage={errors.firstName?.message}
                  placeholder="Your first name"
                  classNames={{
                    input: "text-sm",
                    inputWrapper:
                      "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px]",
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

                <Input
                  label="Last Name"
                  variant="bordered"
                  size="md"
                  radius="lg"
                  {...register("lastName")}
                  isInvalid={!!errors.lastName}
                  errorMessage={errors.lastName?.message}
                  placeholder="Your last name"
                  classNames={{
                    input: "text-sm",
                    inputWrapper:
                      "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px]",
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

              {/* Gender and Date of Birth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Select
                  selectedKeys={member.gender ? [member.gender] : []}
                  label="Gender"
                  aria-label="Select Gender"
                  variant="bordered"
                  size="md"
                  radius="lg"
                  {...register("gender")}
                  isInvalid={!!errors.gender}
                  errorMessage={errors.gender?.message}
                  onChange={(e) => setValue("gender", e.target.value)}
                  classNames={{
                    trigger:
                      "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px]",
                    value: "text-sm",
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
                >
                  {genderList.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  label="Date of Birth"
                  max={format(subYears(new Date(), 18), "yyyy-MM-dd")}
                  type="date"
                  variant="bordered"
                  size="md"
                  radius="lg"
                  {...register("dateOfBirth")}
                  isInvalid={!!errors.dateOfBirth}
                  errorMessage={errors.dateOfBirth?.message}
                  classNames={{
                    input: "text-sm",
                    inputWrapper:
                      "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px]",
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
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  }
                />
              </div>

              {/* Contact Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  label="Contact Number (Optional)"
                  variant="bordered"
                  size="md"
                  radius="lg"
                  {...register("contactNumber")}
                  isInvalid={!!errors.contactNumber}
                  errorMessage={errors.contactNumber?.message}
                  placeholder="+63 912 345 6789"
                  type="tel"
                  classNames={{
                    input: "text-sm",
                    inputWrapper:
                      "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px]",
                  }}
                  startContent={
                    <div className="text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                  }
                />
              </div>

              {/* Description */}
              <div>
                <Textarea
                  label="About Me"
                  variant="bordered"
                  radius="lg"
                  {...register("description")}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                  minRows={3}
                  maxRows={6}
                  placeholder="Tell us about yourself..."
                  classNames={{
                    input: "text-sm resize-none",
                    inputWrapper:
                      "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200",
                  }}
                />
              </div>
            </div>

            {/* Church Details Section */}
            <div className="space-y-4">
              <h3 className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-600 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                Church Details
              </h3>

              {/* Role and Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Select
                  selectedKeys={member.roleId ? [member.roleId] : []}
                  label="Church Role"
                  aria-label="Select Church Role"
                  variant="bordered"
                  size="md"
                  radius="lg"
                  {...register("roleId")}
                  isInvalid={!!errors.roleId}
                  errorMessage={errors.roleId?.message}
                  onChange={(e) => setValue("roleId", e.target.value)}
                  isLoading={loading}
                  classNames={{
                    trigger:
                      "border-2 hover:border-purple-400 group-data-[focus=true]:border-purple-600 shadow-sm transition-all duration-200 min-h-[44px]",
                    value: "text-sm",
                  }}
                  startContent={
                    <div className="text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                    </div>
                  }
                >
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  selectedKeys={member.groupId ? [member.groupId] : []}
                  label="Group"
                  aria-label="Select Group"
                  variant="bordered"
                  size="md"
                  radius="lg"
                  {...register("groupId")}
                  isInvalid={!!errors.groupId}
                  errorMessage={errors.groupId?.message}
                  onChange={(e) => setValue("groupId", e.target.value)}
                  isLoading={loading}
                  classNames={{
                    trigger:
                      "border-2 hover:border-purple-400 group-data-[focus=true]:border-purple-600 shadow-sm transition-all duration-200 min-h-[44px]",
                    value: "text-sm",
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
                          d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  }
                >
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <h3 className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600 dark:text-blue-400"
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
                Location
              </h3>

              {/* Address */}
              <Input
                label="Address (Optional)"
                variant="bordered"
                size="md"
                radius="lg"
                {...register("address")}
                isInvalid={!!errors.address}
                errorMessage={errors.address?.message}
                placeholder="Your complete address"
                classNames={{
                  input: "text-sm",
                  inputWrapper:
                    "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px]",
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

              {/* City and Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  label="City"
                  variant="bordered"
                  size="md"
                  radius="lg"
                  {...register("city")}
                  isInvalid={!!errors.city}
                  errorMessage={errors.city?.message}
                  placeholder="Your city"
                  classNames={{
                    input: "text-sm",
                    inputWrapper:
                      "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px]",
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

                <Input
                  label="Country"
                  variant="bordered"
                  size="md"
                  radius="lg"
                  {...register("country")}
                  isInvalid={!!errors.country}
                  errorMessage={errors.country?.message}
                  placeholder="Philippines"
                  classNames={{
                    input: "text-sm",
                    inputWrapper:
                      "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px]",
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

            {/* Privacy Note */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-emerald-800 dark:text-emerald-200 mb-1">
                    Privacy & Security
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                    Your personal information is secure and only visible to
                    verified church members.
                  </p>
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
