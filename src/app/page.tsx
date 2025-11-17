import { auth } from "@/auth";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] px-4 sm:px-6 lg:px-8">
      {/* Professional Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-8">
        {/* Responsive Logo */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Mobile Logo - Smaller */}
            <div className="sm:hidden">
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-2xl shadow-lg border border-emerald-200 dark:border-emerald-700">
                <Image
                  src="/images/SGBC_Logo.jpg"
                  alt="SGBC Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                  classNames={{
                    img: "rounded-xl",
                  }}
                />
              </div>
            </div>

            {/* Tablet Logo - Medium */}
            <div className="hidden sm:block lg:hidden">
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-3xl shadow-xl border border-emerald-200 dark:border-emerald-700">
                <Image
                  src="/images/SGBC_Logo.jpg"
                  alt="SGBC Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                  classNames={{
                    img: "rounded-2xl",
                  }}
                />
              </div>
            </div>

            {/* Desktop Logo - Large */}
            <div className="hidden lg:block">
              <div className="p-8 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-3xl shadow-2xl border border-emerald-200 dark:border-emerald-700 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <Image
                  src="/images/SGBC_Logo.jpg"
                  alt="SGBC Logo"
                  width={160}
                  height={160}
                  className="object-contain"
                  classNames={{
                    img: "rounded-2xl",
                  }}
                />
              </div>
            </div>

            {/* Animated indicator dots */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full border-2 border-white dark:border-slate-900 animate-bounce"></div>
          </div>
        </div>

        {/* Hero Text - Responsive Typography */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-700 dark:from-gray-100 dark:via-gray-200 dark:to-emerald-300 bg-clip-text text-transparent leading-tight">
            Welcome to SGBC
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-emerald-600 dark:text-emerald-400">
            Information System
          </h2>
        </div>

        {/* Action Buttons - Responsive */}
        <div className="pt-4">
          {session ? (
            <Button
              as={Link}
              href="/members"
              size="lg"
              radius="lg"
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-base sm:text-lg"
            >
              Continue to Dashboard
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                href="/login"
                size="lg"
                radius="lg"
                variant="bordered"
                className="w-full sm:w-auto px-8 py-3 border-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 font-semibold transition-all duration-200 text-base sm:text-lg"
              >
                Sign In
              </Button>
              <Button
                as={Link}
                href="/register"
                size="lg"
                radius="lg"
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-base sm:text-lg"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
