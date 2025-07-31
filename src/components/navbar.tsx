import { Link } from "@heroui/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import { Logo } from "@/components/icons";
import { WebsiteIcon } from "@/components/websiteIcon.tsx";
import React from "react";
import FallBack from "./fallBack";
import LastRefreshed from "./lastRefreshed";

// ...existing imports...

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="full" position="sticky">
      <NavbarContent className="basis-auto" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1 transition-transform duration-300 hover:scale-105"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit me-2">SYNTHLOBBY</p>
          </Link>
        </NavbarBrand>
        {/* Desktop nav items */}
        <div className="hidden sm:flex items-center ml-6 gap-3">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                  "relative py-2 px-1 transition-all duration-300 hover:text-[#b249f8]",
                  "after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-[#b249f8] after:left-0 after:bottom-0",
                  "after:transition-all after:duration-300 hover:after:w-full"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label == "Home" ? "Browse" : item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      {/* Desktop: LastRefreshed just left of icons */}
      <NavbarContent className="hidden lg:flex items-center pb-1" justify="end">
        <React.Suspense fallback={<FallBack text="Loading..." />}>
          <LastRefreshed />
        </React.Suspense>
      </NavbarContent>

      {/* Desktop right-side icons */}
      <NavbarContent className="max-w-min hidden sm:flex gap-2" justify="end">
        <NavbarItem className="gap-2">
          <Link
            isExternal
            href={siteConfig.links.github}
            title="GitHub"
            className="transition-transform duration-300 hover:scale-110 me-2"
          >
            <GithubIcon className="text-default-500" />
          </Link>
          <Link
            isExternal
            href={siteConfig.links.website}
            className="transition-transform duration-300 hover:scale-110"
          >
            <WebsiteIcon className="text-default-500" />
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile hamburger and icons */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link
          isExternal
          href={siteConfig.links.github}
          className="transition-transform duration-300 hover:scale-110"
        >
          <GithubIcon className="text-default-500" />
        </Link>
        <Link
          isExternal
          href={siteConfig.links.website}
          className="transition-transform duration-300 hover:scale-110"
        >
          <WebsiteIcon className="text-default-500" />
        </Link>
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu>
        {siteConfig.navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className={clsx(
                linkStyles({ color: "foreground" }),
                "w-full",
                "data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
              color="foreground"
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
};
