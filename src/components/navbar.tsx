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
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/icons";
import { FiLogOut, FiUser, FiGrid } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import FallBack from "./fallBack";
import LastRefreshed from "./lastRefreshed";
import { useAuth } from "@/context/authContext";
import { auth } from "@/firebase";

export const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <NextUINavbar maxWidth="full" position="sticky">
      {/* Left side: Brand and Desktop Nav Links */}
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
                {item.label === "Home" ? "Browse" : item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      {/* Center (hidden on small screens): Last Refreshed */}
      <NavbarContent className="hidden lg:flex items-center" justify="center">
        <React.Suspense fallback={<FallBack text="Loading..." />}>
          <LastRefreshed />
        </React.Suspense>
      </NavbarContent>

      {/* Right side: Icons and Auth Actions */}
      <NavbarContent className="max-w-min flex gap-2" justify="end">
        {/* Auth Section */}
        {currentUser ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                isIconOnly
                as="button"
                variant="light"
                className="transition-transform rounded-full"
                aria-label="User menu"
              >
                <FiUser size={22} className="text-default-600" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownSection showDivider>
                <DropdownItem key="profile" className="h-14 gap-2" isReadOnly>
                  <p className="font-semibold">
                    Hi, {currentUser.displayName || currentUser.email}!
                  </p>
                </DropdownItem>
              </DropdownSection>
              <DropdownItem
                key="dashboard"
                startContent={<FiGrid />}
                onPress={() => navigate("/dashboard")}
              >
                My Dashboard
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                startContent={<FiLogOut />}
                onPress={handleLogout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div className="hidden sm:flex items-center">
            <Button
              as={Link}
              href="/login"
              color="default"
              variant="bordered"
              className="transition-all bg-white duration-300 font-medium px-6 py-2 shadow-sm hover:shadow-md"
            >
              Sign In
            </Button>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <NavbarMenuToggle className="sm:hidden" />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-white">
        {siteConfig.navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}

        {!currentUser && (
          <NavbarMenuItem>
            <Button
              as={Link}
              href="/login"
              color="secondary"
              variant="solid"
              className="w-full bg-gradient-to-r from-[#b249f8] to-[#9333ea] hover:from-[#9333ea] hover:to-[#7c3aed] transition-all duration-300 font-medium shadow-lg"
              size="lg"
            >
              Sign In
            </Button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </NextUINavbar>
  );
};
