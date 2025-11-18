import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import React, { ReactNode } from "react";
import { GiPadlock } from "react-icons/gi";
import { IconType } from "react-icons/lib";

type Props = {
  body?: ReactNode;
  headerIcon: IconType;
  headerText: string;
  subHeaderText?: string;
  action?: () => void;
  actionLabel?: string;
  footer?: ReactNode;
};

export default function CardWrapper({
  body,
  footer,
  headerIcon: Icon,
  headerText,
  subHeaderText,
  action,
  actionLabel,
}: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0">
        <CardHeader className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6">
          <div className="flex flex-col gap-3 sm:gap-4 items-center w-full">
            {/* Icon and Title - Responsive Layout */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl shadow-lg">
                <Icon
                  size={24}
                  className="sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white"
                />
              </div>

              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-700 dark:from-gray-100 dark:via-gray-200 dark:to-emerald-300 bg-clip-text text-transparent leading-tight">
                  {headerText}
                </h1>
              </div>
            </div>

            {/* Subtitle */}
            {subHeaderText && (
              <div className="text-center max-w-md">
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                  {subHeaderText}
                </p>
              </div>
            )}
          </div>
        </CardHeader>

        {/* Card Body - Responsive Padding */}
        {body && (
          <CardBody className="px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
            {body}
          </CardBody>
        )}

        {/* Card Footer - Responsive */}
        <CardFooter className="flex flex-col gap-4 px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 pt-4">
          {action && actionLabel && (
            <Button
              onPress={action}
              fullWidth
              size="lg"
              radius="lg"
              color="secondary"
              variant="bordered"
              className="h-11 sm:h-12 font-medium border-2 transition-all duration-200"
            >
              <span className="text-sm sm:text-base">{actionLabel}</span>
            </Button>
          )}

          {footer && <div className="w-full">{footer}</div>}
        </CardFooter>
      </Card>
    </div>
  );
}
