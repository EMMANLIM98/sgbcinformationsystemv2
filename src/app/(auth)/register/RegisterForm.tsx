"use client";

import { registerUser } from "@/app/actions/authActions";
import {
  combinedRegisterSchema,
  profileSchema,
  RegisterSchema,
  registerSchema,
} from "@/lib/schemas/registerSchema";
import { handleFormServerErrors } from "@/lib/util";
import { Card, CardHeader, CardBody, Input, Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import UserDetailsForm from "./UserDetailsForm";
import ProfileForm from "./ProfileForm";
import { useRouter } from "next/navigation";

const stepSchemas = [combinedRegisterSchema];

export default function RegisterForm() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = stepSchemas[activeStep];

  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(currentValidationSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = methods;

  const onSubmit = async () => {
    const result = await registerUser(getValues());

    if (result.status === "success") {
      router.push("/register/success");
    } else {
      handleFormServerErrors(result, setError);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <UserDetailsForm />;
      case 1:
        return <ProfileForm />;
      default:
        return "Unknown step";
    }
  };

  const onBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onNext = async () => {
    if (activeStep === stepSchemas.length - 1) {
      await onSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
      <Card className="w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-auto shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0">
        <CardHeader className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
          <div className="flex flex-col gap-3 sm:gap-4 items-center w-full">
            {/* Logo and Title Section - Responsive */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl shadow-lg">
                <GiPadlock size={24} className="sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-700 dark:from-gray-100 dark:via-gray-200 dark:to-emerald-300 bg-clip-text text-transparent">
                  Create Account
                </h1>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Join the SGBC Information System
              </p>
            </div>

            {/* Progress Indicator - Mobile Friendly */}
            {stepSchemas.length > 1 && (
              <div className="w-full max-w-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Step {activeStep + 1} of {stepSchemas.length}
                  </span>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    {Math.round(((activeStep + 1) / stepSchemas.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((activeStep + 1) / stepSchemas.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </CardHeader>

        <CardBody className="px-6 sm:px-8 pb-6 sm:pb-8">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onNext)} className="space-y-6">
              {/* Form Content */}
              <div className="space-y-4 sm:space-y-6">
                {getStepContent(activeStep)}
              </div>

              {/* Error Message */}
              {errors.root?.serverError && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                    {errors.root.serverError.message}
                  </p>
                </div>
              )}

              {/* Action Buttons - Responsive Layout */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {activeStep !== 0 && (
                  <Button
                    onPress={onBack}
                    variant="bordered"
                    radius="lg"
                    size="lg"
                    className="w-full sm:w-auto sm:flex-1 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800 transition-all duration-200 font-medium"
                  >
                    ← Back
                  </Button>
                )}

                <Button
                  isLoading={isSubmitting}
                  isDisabled={!isValid}
                  type="submit"
                  radius="lg"
                  size="lg"
                  className={`w-full font-semibold transition-all duration-200 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl ${
                    activeStep !== 0 ? "sm:flex-1" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="hidden sm:inline">
                        {activeStep === stepSchemas.length - 1
                          ? "Creating Account..."
                          : "Processing..."}
                      </span>
                      <span className="sm:hidden">
                        {activeStep === stepSchemas.length - 1
                          ? "Creating..."
                          : "Loading..."}
                      </span>
                    </div>
                  ) : (
                    <>
                      <span className="hidden sm:inline">
                        {activeStep === stepSchemas.length - 1
                          ? "Create Account"
                          : "Continue →"}
                      </span>
                      <span className="sm:hidden">
                        {activeStep === stepSchemas.length - 1
                          ? "Create"
                          : "Next →"}
                      </span>
                    </>
                  )}
                </Button>
              </div>

              {/* Sign In Link */}
              <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium hover:underline transition-colors duration-200"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </form>
          </FormProvider>
        </CardBody>
      </Card>
    </div>
  );
}
