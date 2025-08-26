import { Link } from "@heroui/link";
import PageTransition from "@/utils/motion/pageTransition";
import { Navbar } from "@/components/navbar";
import { FaGithub } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { siteConfig } from "@/config/site";
import React from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen container mx-auto max-w-8xl">
      <Navbar />
      <main className="container mx-auto max-w-8xl px-4 xl:px-6 flex-grow pt-8">
        <PageTransition>{children}</PageTransition>
      </main>
      <footer>
        <div className="container border-t border-default-200 mt-12 mx-auto max-w-8xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-default-600">
            <Link
              isExternal
              className="flex items-center text-current"
              href="https://tiesvdp.be"
              title="tiesvdp portfolio"
            >
              <span>Developed with ❤️ by&nbsp;</span>
              <p className="text-primary"> Tiesvdp</p>
            </Link>
            <span className="hidden sm:inline">|</span>

            <Link
              isExternal
              className="flex items-center gap-1.5 transition-colors"
              href="https://buymeacoffee.com/tiesvdp"
              title="tiesvdp buymeacoffee"
            >
              <span className="text-lg">☕</span>
              <span className="text-current">Buy me a coffee</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" title="Privacy Policy">
              Privacy Policy
            </Link>
            <div className="flex items-center gap-3">
              <Link
                isExternal
                href={siteConfig.links.github}
                title="GitHub"
                className="text-default-500 hover:text-primary transition-all duration-300"
              >
                <FaGithub size={22} />
              </Link>
              <Link
                isExternal
                href={siteConfig.links.website}
                title="Website"
                className="text-default-500 hover:text-primary transition-all duration-300"
              >
                <FiGlobe size={24} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
