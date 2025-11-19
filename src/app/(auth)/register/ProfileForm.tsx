"use client";

import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import { format, subYears } from "date-fns";
import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { getMemberRoles } from "@/app/actions/roleActions";
import { getMemberGroups } from "@/app/actions/groupActions";
import { ChurchGroup, GroupRole } from "@prisma/client";

export default function ProfileForm() {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();

  const [displayDate, setDisplayDate] = useState("");
  const [roles, setRoles] = useState<GroupRole[]>([]);
  const [groups, setGroups] = useState<ChurchGroup[]>([]);
  const [loading, setLoading] = useState(true);
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
            />
          </div>

          {/* Description */}
          <div>
            <Textarea
              defaultValue={getValues("description")}
              label="About Me"
              variant="bordered"
              radius="lg"
              {...register("description")}
              isInvalid={!!errors.description}
              errorMessage={errors.description?.message as string}
              minRows={2}
              maxRows={4}
              placeholder="Tell us about yourself..."
              classNames={{
                input: "text-sm resize-none",
                inputWrapper:
                  "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200",
              }}
            />
          </div>
        </div>

        {/* Church Ministry Section */}
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
            Church Ministry
          </h3>

          {/* Role and Group - Dynamic from Database */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Select
              defaultSelectedKeys={
                getValues("groupRoleId") ? [getValues("groupRoleId")] : []
              }
              label="Church Role"
              aria-label="Select Church Role"
              variant="bordered"
              size="md"
              radius="lg"
              {...register("groupRoleId")}
              isInvalid={!!errors.groupRoleId}
              errorMessage={errors.groupRoleId?.message as string}
              onChange={(e) => setValue("groupRoleId", e.target.value)}
              isLoading={loading}
              classNames={{
                trigger:
                  "border-2 hover:border-purple-400 group-data-[focus=true]:border-purple-600 shadow-sm transition-all duration-200 min-h-[44px]",
                value: "text-sm",
              }}
            >
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </Select>

            <Select
              defaultSelectedKeys={
                getValues("churchGroupId") ? [getValues("churchGroupId")] : []
              }
              label="Ministry Group"
              aria-label="Select Ministry Group"
              variant="bordered"
              size="md"
              radius="lg"
              {...register("churchGroupId")}
              isInvalid={!!errors.churchGroupId}
              errorMessage={errors.churchGroupId?.message as string}
              onChange={(e) => setValue("churchGroupId", e.target.value)}
              isLoading={loading}
              classNames={{
                trigger:
                  "border-2 hover:border-purple-400 group-data-[focus=true]:border-purple-600 shadow-sm transition-all duration-200 min-h-[44px]",
              }}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
