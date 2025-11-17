import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import TopNav from "@/components/navbar/TopNav";
import { auth } from "@/auth";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SGBC Information System",
  description: "Created by Emman Lim Jr.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userId = session?.user?.id || null;
  const profileComplete = session?.user?.profileComplete as boolean;

  // inline script to set theme before React hydrates (prevents FOUC)
  const themeInit = `
    (function() {
      try {
        var theme = localStorage.getItem('theme');
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en">
      <body>
        <Providers userId={userId} profileComplete={profileComplete}>
          <TopNav />
          {/* reserve space for sticky header/footer using main-with-nav */}
          <main className="container mx-auto main-with-nav">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
