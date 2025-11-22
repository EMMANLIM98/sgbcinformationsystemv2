"use client";

import { Member, Role, Group } from "@prisma/client";
import React from "react";
import { Card, CardBody, CardHeader, Chip, Divider } from "@heroui/react";
import { calculateAge, formatLongDate } from "@/lib/util";

type Props = {
  member: Member & {
    Roles?: Role[];
    Group?: Group | null;
  };
};

export default function ViewForm({ member }: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardHeader className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-700 dark:from-emerald-200 dark:via-green-300 dark:to-emerald-300 bg-clip-text text-transparent">
              Member Profile
            </h1>
            <p className="text-emerald-600 dark:text-emerald-400 text-sm sm:text-base">
              View member information and profile details
            </p>
          </div>
        </CardHeader>

        <CardBody className="px-6 sm:px-8 pb-6 sm:pb-8">
          <div className="flex flex-col space-y-6">
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

              {/* Name and Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Full Name
                  </label>
                  <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {member.firstName} {member.lastName}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Age
                  </label>
                  <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300">
                    {calculateAge(member.dateOfBirth)} years old
                  </p>
                </div>
              </div>

              {/* Gender and Date of Birth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Gender
                  </label>
                  <p className="text-base font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {member.gender}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date of Birth
                  </label>
                  <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                    {member.dateOfBirth
                      ? formatLongDate(member.dateOfBirth)
                      : "Not provided"}
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              {member.contactNumber && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact Number
                  </label>
                  <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                    {member.contactNumber}
                  </p>
                </div>
              )}

              {/* About Me */}
              {member.description && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    About Me
                  </label>
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-4">
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {member.description}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Divider className="bg-emerald-200 dark:bg-emerald-700" />

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

              {/* Church Roles */}
              <div className="space-y-3">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Church Roles
                </label>

                {member.Roles && member.Roles.length > 0 ? (
                  <div className="bg-gradient-to-br from-emerald-50 via-green-25 to-teal-50 dark:from-emerald-900/20 dark:via-green-800/15 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
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
                        Active Roles ({member.Roles.length})
                      </span>
                    </div>

                    {/* Responsive Grid for Role Tags */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {member.Roles.map((role, index) => (
                        <Chip
                          key={role.id}
                          variant="flat"
                          className={`
                            bg-gradient-to-r from-white via-emerald-50/80 to-green-50/80 
                            dark:from-gray-800 dark:via-emerald-900/30 dark:to-green-900/30 
                            border border-emerald-200/70 dark:border-emerald-600/50 
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
                          <span className="font-medium bg-gradient-to-r from-emerald-800 via-green-700 to-teal-600 dark:from-emerald-200 dark:via-green-300 dark:to-teal-300 bg-clip-text text-transparent">
                            {role.name}
                          </span>
                        </Chip>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center">
                      No church roles assigned
                    </p>
                  </div>
                )}
              </div>

              {/* Church Group */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Church Group
                </label>
                {member.Group ? (
                  <Chip
                    variant="flat"
                    className="bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-300 dark:border-emerald-600"
                  >
                    <span className="font-medium text-emerald-800 dark:text-emerald-200">
                      {member.Group.name}
                    </span>
                  </Chip>
                ) : (
                  <p className="text-base font-medium text-gray-500 dark:text-gray-400 italic">
                    No group assigned
                  </p>
                )}
              </div>
            </div>

            <Divider className="bg-emerald-200 dark:bg-emerald-700" />

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
                  Location Information
                </span>
              </h3>

              {/* Address */}
              {member.address && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Address
                  </label>
                  <div className="flex items-start gap-2 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
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
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      {member.address}
                    </p>
                  </div>
                </div>
              )}

              {/* City and Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {member.city && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      City
                    </label>
                    <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                      {member.city}
                    </p>
                  </div>
                )}

                {member.country && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Country
                    </label>
                    <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                      {member.country}
                    </p>
                  </div>
                )}
              </div>

              {/* No location info message */}
              {!member.address && !member.city && !member.country && (
                <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center">
                    No location information provided
                  </p>
                </div>
              )}
            </div>

            {/* Member Status */}
            <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-900/20 dark:via-green-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-200 mb-1">
                    Active Member
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                    This member is currently active and part of our church
                    community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
