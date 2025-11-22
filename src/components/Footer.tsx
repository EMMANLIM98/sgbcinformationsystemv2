import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full site-footer text-center py-4 site-footer--fixed-mobile">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-0">
        <div className="text-sm hidden md:block">
          © {new Date().getFullYear()} SGBC Information System by SGBC (Main)
          ITM
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/privacy" className="text-sm hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm hover:underline">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
