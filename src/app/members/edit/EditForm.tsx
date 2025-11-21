"use client";

import {
  MemberEditSchema,
  memberEditSchema,
} from "@/lib/schemas/memberEditSchema";
import { Member, Role, Group } from "@prisma/client";
import React, { useEffect, useState, useMemo } from "react";
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
  Selection,
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
    Roles?: Role[];
    Group?: Group | null;
  };
};

export default function EditForm({ member }: Props) {
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState<Selection>(new Set());

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

  // Get selected role names for display
  const selectedRoleItems = useMemo(() => {
    if (selectedRoles === "all") {
      return roles;
    }
    if (selectedRoles instanceof Set) {
      return roles.filter((role) => selectedRoles.has(role.id));
    }
    return [];
  }, [selectedRoles, roles]);

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
      const memberRoleIds = member.Roles?.map((role) => role.id) || [];
      setSelectedRoles(new Set(memberRoleIds));

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
        roleIds: memberRoleIds,
        groupId: member.Group?.id ?? "",
      });
    }
  }, [member, reset]);

  const handleRoleSelectionChange = (keys: Selection) => {
    setSelectedRoles(keys);

    if (keys === "all") {
      const allRoleIds = roles.map((role) => role.id);
      setValue("roleIds", allRoleIds);
    } else {
      const selectedArray = Array.from(keys as Set<string>);
      setValue("roleIds", selectedArray);
    }
  };

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
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-700 dark:from-emerald-200 dark:via-green-300 dark:to-emerald-300 bg-clip-text text-transparent">
              Edit Profile
            </h1>
            <p className="text-emerald-600 dark:text-emerald-400 text-sm sm:text-base">
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
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-emerald-100 via-green-100 to-emerald-200 dark:from-emerald-900/30 dark:via-green-900/30 dark:to-emerald-800/30 rounded-full flex items-center justify-center border border-emerald-200/50 dark:border-emerald-700/50">
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
                <span className="bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-600 dark:from-emerald-300 dark:via-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  Personal Details
                </span>
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
                      "border-2 border-emerald-200 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px] bg-gradient-to-r from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/20",
                  }}
                  startContent={
                    <div className="text-emerald-500 dark:text-emerald-400">
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
                      "border-2 border-emerald-200 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px] bg-gradient-to-r from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/20",
                  }}
                  startContent={
                    <div className="text-emerald-500 dark:text-emerald-400">
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
                      "border-2 border-emerald-200 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px] bg-gradient-to-r from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/20",
                    value: "text-sm",
                    listbox:
                      "bg-gradient-to-br from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/30",
                  }}
                  startContent={
                    <div className="text-emerald-500 dark:text-emerald-400">
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
                    <SelectItem key={item.value}>{item.label}</SelectItem>
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
                      "border-2 border-emerald-200 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px] bg-gradient-to-r from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/20",
                  }}
                  startContent={
                    <div className="text-emerald-500 dark:text-emerald-400">
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
                      "border-2 border-emerald-200 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px] bg-gradient-to-r from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/20",
                  }}
                  startContent={
                    <div className="text-emerald-500 dark:text-emerald-400">
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
            </div>

            {/* Church Details Section */}
            <div className="space-y-4">
              <h3 className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100 dark:from-emerald-900/30 dark:via-green-900/30 dark:to-teal-900/30 rounded-full flex items-center justify-center border border-emerald-200/50 dark:border-emerald-700/50">
                  <svg
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600 dark:text-emerald-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <span className="bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 dark:from-emerald-300 dark:via-green-400 dark:to-teal-400 bg-clip-text text-transparent">
                  Church Details
                </span>
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {/* Custom Multiple Roles Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                    Church Roles <span className="text-red-500">*</span>
                  </label>

                  {/* Role Selection Dropdown */}
                  <Select
                    aria-label="Select Church Roles"
                    variant="bordered"
                    size="md"
                    radius="lg"
                    selectionMode="multiple"
                    selectedKeys={selectedRoles}
                    onSelectionChange={handleRoleSelectionChange}
                    isLoading={loading}
                    placeholder="Select one or more roles"
                    classNames={{
                      trigger:
                        "border-2 border-emerald-200 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px] bg-gradient-to-r from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/20",
                      value: "text-sm",
                      listbox:
                        "bg-gradient-to-br from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/30",
                    }}
                    startContent={
                      <div className="text-emerald-500 dark:text-emerald-400">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                      </div>
                    }
                    renderValue={() => {
                      if (selectedRoleItems.length === 0) {
                        return (
                          <span className="text-gray-400 text-sm">
                            Select one or more roles
                          </span>
                        );
                      }
                      return (
                        <span className="text-sm bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-300 dark:to-green-300 bg-clip-text text-transparent font-medium">
                          {selectedRoleItems.length} role
                          {selectedRoleItems.length !== 1 ? "s" : ""} selected
                        </span>
                      );
                    }}
                  >
                    {roles.map((role) => (
                      <SelectItem key={role.id}>{role.name}</SelectItem>
                    ))}
                  </Select>

                  {/* Selected Roles Display */}
                  {selectedRoleItems.length > 0 && (
                    <div className="mt-3 p-3 bg-gradient-to-br from-emerald-50 via-green-25 to-teal-50 dark:from-emerald-900/20 dark:via-green-800/15 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium bg-gradient-to-r from-emerald-800 to-green-800 dark:from-emerald-200 dark:to-green-200 bg-clip-text text-transparent">
                          Selected Roles ({selectedRoleItems.length})
                        </span>
                      </div>

                      {/* Responsive Grid for Role Tags */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {selectedRoleItems.map((role, index) => (
                          <div
                            key={role.id}
                            className={`
                              flex items-center justify-between 
                              bg-gradient-to-r from-white via-emerald-50/80 to-green-50/80 
                              dark:from-gray-800 dark:via-emerald-900/30 dark:to-green-900/30 
                              border border-emerald-200/70 dark:border-emerald-600/50 
                              rounded-lg px-3 py-2 text-sm 
                              shadow-sm hover:shadow-md 
                              transition-all duration-300 ease-out
                              hover:scale-[1.02] hover:bg-gradient-to-r 
                              hover:from-emerald-100/90 hover:to-green-100/90
                              dark:hover:from-emerald-800/50 dark:hover:to-green-800/50
                              hover:border-emerald-300 dark:hover:border-emerald-500
                            `}
                            style={{
                              animationDelay: `${index * 0.1}s`,
                            }}
                          >
                            <span className="font-medium bg-gradient-to-r from-emerald-800 via-green-700 to-teal-600 dark:from-emerald-200 dark:via-green-300 dark:to-teal-300 bg-clip-text text-transparent truncate">
                              {role.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const newSelection = new Set(
                                  selectedRoles as Set<string>
                                );
                                newSelection.delete(role.id);
                                handleRoleSelectionChange(newSelection);
                              }}
                              className="ml-2 w-6 h-6 rounded-full bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md"
                            >
                              <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Clear All Button */}
                      {selectedRoleItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRoleSelectionChange(new Set())}
                          className="mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200 transition-all duration-200 hover:underline hover:scale-105"
                        >
                          Clear All ({selectedRoleItems.length})
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Single Group Selection */}
                <Select
                  selectedKeys={member.Group?.id ? [member.Group.id] : []}
                  label="Group (Optional)"
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
                      "border-2 border-emerald-200 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px] bg-gradient-to-r from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/20",
                    value: "text-sm",
                    listbox:
                      "bg-gradient-to-br from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/30",
                  }}
                  startContent={
                    <div className="text-emerald-500 dark:text-emerald-400">
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
                    <SelectItem key={group.id}>{group.name}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <h3 className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-emerald-100 via-cyan-100 to-blue-100 dark:from-emerald-900/30 dark:via-cyan-900/30 dark:to-blue-900/30 rounded-full flex items-center justify-center border border-emerald-200/50 dark:border-emerald-700/50">
                  <svg
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600 dark:text-emerald-400"
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
                <span className="bg-gradient-to-r from-emerald-700 via-cyan-600 to-blue-600 dark:from-emerald-300 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Location
                </span>
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
                    "border-2 border-emerald-200 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px] bg-gradient-to-r from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/20",
                }}
                startContent={
                  <div className="text-emerald-500 dark:text-emerald-400">
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
                      "border-2 border-emerald-200 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px] bg-gradient-to-r from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/20",
                  }}
                  startContent={
                    <div className="text-emerald-500 dark:text-emerald-400">
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
                      "border-2 border-emerald-200 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px] bg-gradient-to-r from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/20",
                  }}
                  startContent={
                    <div className="text-emerald-500 dark:text-emerald-400">
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
            <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-900/20 dark:via-green-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-3">
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
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4 border-t border-emerald-200 dark:border-emerald-700">
              <Button
                variant="bordered"
                radius="lg"
                size="lg"
                className="w-full sm:w-auto border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 dark:border-emerald-600 dark:hover:border-emerald-500 dark:hover:bg-emerald-800/20 transition-all duration-200 text-emerald-700 dark:text-emerald-300"
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
