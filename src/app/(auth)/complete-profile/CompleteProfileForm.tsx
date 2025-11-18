"use client";

import CardWrapper from "@/components/CardWrapper";
import { ProfileSchema, profileSchema } from "@/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RiProfileLine } from "react-icons/ri";
import ProfileForm from "../register/ProfileForm";
import { Button } from "@heroui/react";
import { completeSocialLoginProfile } from "@/app/actions/authActions";
import { signIn } from "next-auth/react";

export default function CompleteProfileForm() {
  const methods = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const onSubmit = async (data: ProfileSchema) => {
    const result = await completeSocialLoginProfile(data);

    if (result.status === "success") {
      signIn(result.data, {
        callbackUrl: "/members",
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 dark:from-gray-900 dark:via-slate-900 dark:to-emerald-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl">
        <CardWrapper
          headerText="Complete Your Profile"
          subHeaderText="Please complete your profile to continue to the app."
          headerIcon={RiProfileLine}
          body={
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Compact Welcome Message */}
                <div className="text-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    Almost There! 🎉
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Just a few more details needed
                  </p>
                </div>

                {/* Profile Form - Compact */}
                <div className="space-y-4">
                  <ProfileForm />
                </div>

                {/* Compact Error Message */}
                {errors.root?.serverError && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-red-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xs font-medium text-red-800 dark:text-red-200">
                          Setup Error
                        </h3>
                        <p className="text-xs text-red-700 dark:text-red-300">
                          {errors.root.serverError.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Compact Action Section */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  {/* Compact Progress Indicator */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        Final Step
                      </span>
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        100%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 h-1.5 rounded-full w-full transition-all duration-300"></div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    isLoading={isSubmitting}
                    isDisabled={!isValid}
                    type="submit"
                    size="lg"
                    radius="lg"
                    className="w-full h-11 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="text-sm">Setting up...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Complete Profile</span>
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </Button>

                  {/* Compact Security Note */}
                  <div className="text-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Secure & encrypted</span>
                    </div>
                  </div>
                </div>
              </form>
            </FormProvider>
          }
        />
      </div>
    </div>
  );
}
