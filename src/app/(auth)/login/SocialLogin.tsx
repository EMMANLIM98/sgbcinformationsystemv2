import { Button } from "@heroui/react";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function SocialLogin() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/members",
    });
  };

  return (
    <div className="w-full space-y-4">
      {/* Divider with "or" text */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 font-medium">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Login Buttons - Mobile First Design */}
      <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4">
        {/* Google Button */}
        <Button
          size="lg"
          fullWidth
          variant="bordered"
          radius="lg"
          className="flex-1 h-12 sm:h-14 border-2 border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium"
          onPress={() => onClick("google")}
        >
          <div className="flex items-center justify-center gap-3">
            <FcGoogle size={20} className="flex-shrink-0" />
            <span className="hidden sm:inline text-gray-700 dark:text-gray-300">
              Continue with Google
            </span>
            <span className="sm:hidden text-gray-700 dark:text-gray-300 font-medium">
              Google
            </span>
          </div>
        </Button>

        {/* GitHub Button */}
        <Button
          size="lg"
          fullWidth
          variant="bordered"
          radius="lg"
          className="flex-1 h-12 sm:h-14 border-2 border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium"
          onPress={() => onClick("github")}
        >
          <div className="flex items-center justify-center gap-3">
            <FaGithub
              size={20}
              className="flex-shrink-0 text-gray-700 dark:text-gray-300"
            />
            <span className="hidden sm:inline text-gray-700 dark:text-gray-300">
              Continue with GitHub
            </span>
            <span className="sm:hidden text-gray-700 dark:text-gray-300 font-medium">
              GitHub
            </span>
          </div>
        </Button>
      </div>

      {/* Alternative: Stacked Buttons for Mobile (uncomment if preferred) */}
      {/* 
            <div className='flex flex-col gap-3 sm:hidden'>
                <Button
                    size='lg'
                    fullWidth
                    variant='bordered'
                    radius="lg"
                    className='h-12 border-2 border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium'
                    onPress={() => onClick('google')}
                >
                    <div className="flex items-center justify-center gap-3">
                        <FcGoogle size={20} />
                        <span className="text-gray-700 dark:text-gray-300">Continue with Google</span>
                    </div>
                </Button>

                <Button
                    size='lg'
                    fullWidth
                    variant='bordered'
                    radius="lg"
                    className='h-12 border-2 border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium'
                    onPress={() => onClick('github')}
                >
                    <div className="flex items-center justify-center gap-3">
                        <FaGithub size={20} className="text-gray-700 dark:text-gray-300" />
                        <span className="text-gray-700 dark:text-gray-300">Continue with GitHub</span>
                    </div>
                </Button>
            </div>

            <div className='hidden sm:flex flex-row w-full gap-4'>
                <Button
                    size='lg'
                    fullWidth
                    variant='bordered'
                    radius="lg"
                    className='flex-1 h-14 border-2 border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium'
                    onPress={() => onClick('google')}
                >
                    <div className="flex items-center justify-center gap-3">
                        <FcGoogle size={22} />
                        <span className="text-gray-700 dark:text-gray-300">Continue with Google</span>
                    </div>
                </Button>

                <Button
                    size='lg'
                    fullWidth
                    variant='bordered'
                    radius="lg"
                    className='flex-1 h-14 border-2 border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium'
                    onPress={() => onClick('github')}
                >
                    <div className="flex items-center justify-center gap-3">
                        <FaGithub size={22} className="text-gray-700 dark:text-gray-300" />
                        <span className="text-gray-700 dark:text-gray-300">Continue with GitHub</span>
                    </div>
                </Button>
            </div>
            */}

      {/* Security Note */}
      <div className="text-center pt-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Secure authentication powered by OAuth 2.0
        </p>
      </div>
    </div>
  );
}
