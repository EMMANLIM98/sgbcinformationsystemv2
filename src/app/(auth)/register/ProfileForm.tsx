"use client";

import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import { format, subYears } from "date-fns";
import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { getMemberRoles } from "@/app/actions/roleActions";
import { getMemberGroups } from "@/app/actions/groupActions";
import { Group, Role } from "@prisma/client";

export default function ProfileForm() {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();

  const [displayDate, setDisplayDate] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set()); // Added missing state
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

  // Format date for display
  useEffect(() => {
    if (dateValue) {
      try {
        const date = new Date(dateValue);
        const formatted = format(date, "yyyy-MMM-dd");
        setDisplayDate(formatted);
      } catch (error) {
        setDisplayDate("");
      }
    } else {
      setDisplayDate("");
    }
  }, [dateValue]);

  const genderList = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  // Handle role selection changes
  const handleRoleSelectionChange = (keys: any) => {
    const selectedKeys = new Set(keys);
    setSelectedRoles(selectedKeys);
    setValue("roleIds", Array.from(selectedKeys));
  };

  return (
    <div className="w-full mx-auto">
      <div className="space-y-4 sm:space-y-6">
        {/* Personal Details Section */}
        <div className="space-y-3 sm:space-y-4">
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
              defaultValue={getValues("firstName")}
              label="First Name"
              variant="bordered"
              size="md"
              radius="lg"
              {...register("firstName")}
              isInvalid={!!errors.firstName}
              errorMessage={errors.firstName?.message as string}
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
              defaultValue={getValues("lastName")}
              label="Last Name"
              variant="bordered"
              size="md"
              radius="lg"
              {...register("lastName")}
              isInvalid={!!errors.lastName}
              errorMessage={errors.lastName?.message as string}
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
              defaultSelectedKeys={
                getValues("gender") ? [getValues("gender")] : []
              }
              label="Gender"
              aria-label="Select Gender"
              variant="bordered"
              size="md"
              radius="lg"
              {...register("gender")}
              isInvalid={!!errors.gender}
              errorMessage={errors.gender?.message as string}
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
              defaultValue={getValues("dateOfBirth")}
              label="Date of Birth"
              max={format(subYears(new Date(), 18), "yyyy-MM-dd")}
              type="date"
              variant="bordered"
              size="md"
              radius="lg"
              {...register("dateOfBirth")}
              isInvalid={!!errors.dateOfBirth}
              errorMessage={errors.dateOfBirth?.message as string}
              placeholder="1990-Aug-24"
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

          {/* Contact Number and Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Input
              defaultValue={getValues("contactNumber")}
              label="Contact Number (Optional)"
              variant="bordered"
              size="md"
              radius="lg"
              {...register("contactNumber")}
              isInvalid={!!errors.contactNumber}
              errorMessage={errors.contactNumber?.message as string}
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
        </div>

        {/* Church Details Section */}
        <div className="space-y-3 sm:space-y-4">
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
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {/* Multiple Roles Selection */}
            <Select
              label="Church Roles (Choose 1 or more)"
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
              renderValue={(items) => {
                return (
                  <div className="flex flex-wrap gap-1">
                    {items.map((item) => (
                      <div
                        key={item.key}
                        className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {item.textValue}
                      </div>
                    ))}
                  </div>
                );
              }}
            >
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </Select>

            {/* Single Group Selection */}
            <Select
              defaultSelectedKeys={
                getValues("groupId") ? [getValues("groupId")] : []
              }
              label="Group"
              aria-label="Select Group"
              variant="bordered"
              size="md"
              radius="lg"
              {...register("groupId")}
              isInvalid={!!errors.groupId}
              errorMessage={errors.groupId?.message as string}
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
        <div className="space-y-3 sm:space-y-4">
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
          <Input
            defaultValue={getValues("address")}
            label="Address (Optional)"
            variant="bordered"
            size="md"
            radius="lg"
            {...register("address")}
            isInvalid={!!errors.address}
            errorMessage={errors.address?.message as string}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Input
              defaultValue={getValues("city")}
              label="City"
              variant="bordered"
              size="md"
              radius="lg"
              {...register("city")}
              isInvalid={!!errors.city}
              errorMessage={errors.city?.message as string}
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
              defaultValue={getValues("country") || "Philippines"}
              label="Country"
              variant="bordered"
              size="md"
              radius="lg"
              {...register("country")}
              isInvalid={!!errors.country}
              errorMessage={errors.country?.message as string}
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
                Your personal information is secure and only visible to verified
                church members.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
