import { CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import React from "react";
import { getAuthUserId } from "@/app/actions/authActions";
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from "@/app/actions/memberActions";
import MemberPhotoUpload from "./MemberPhotoUpload";
import MemberPhotos from "@/components/MemberPhotos";

export default async function PhotosPage() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <div className="w-full h-full overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center p-4 sm:p-6 lg:p-8">
        {/* Mobile: Stack vertically, Desktop: Side by side */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-700 dark:from-emerald-200 dark:via-green-300 dark:to-emerald-300 bg-clip-text text-transparent">
            Edit Profile Photos
          </h1>
          <p className="text-sm sm:text-base text-emerald-600 dark:text-emerald-400 hidden sm:block">
            Upload and manage your profile photos
          </p>
        </div>

        {/* Upload Button - Full width on mobile, auto width on desktop */}
        <div className="w-full sm:w-auto">
          <MemberPhotoUpload />
        </div>
      </CardHeader>

      <Divider className="bg-emerald-200 dark:bg-emerald-700" />

      <CardBody className="p-4 sm:p-6 lg:p-8 h-full overflow-y-auto">
        <div className="space-y-4 sm:space-y-6">
          {/* Instructions - Mobile optimized */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-semibold text-emerald-800 dark:text-emerald-200">
                  Photo Guidelines
                </h3>
                <div className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 space-y-1">
                  <p>• Upload high-quality photos (max 10MB each)</p>
                  <p className="hidden sm:block">
                    • Supported formats: JPG, PNG, WebP
                  </p>
                  <p>• First photo will be your main profile picture</p>
                  <p className="hidden sm:block">
                    • Tap and hold to reorder photos
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Stats - Mobile friendly */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {photos?.length || 0}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Photos
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">
                {member?.image ? "1" : "0"}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Main Photo
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 text-center col-span-2 sm:col-span-1">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.max(0, 10 - (photos?.length || 0))}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Remaining
              </div>
            </div>
          </div>

          {/* Photos Grid */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="bg-gradient-to-r from-emerald-700 to-green-600 dark:from-emerald-300 dark:to-green-400 bg-clip-text text-transparent">
                Photo Gallery
              </span>
            </h2>

            {/* Responsive Photo Grid */}
            <div className="min-h-[200px] sm:min-h-[300px] lg:min-h-[400px]">
              <MemberPhotos
                photos={photos}
                editing={true}
                mainImageUrl={member?.image}
              />
            </div>
          </div>

          {/* Mobile-specific help text */}
          <div className="block sm:hidden bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                  Mobile Tip
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Tap photos to view full size. Long press to reorder or delete.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  );
}
