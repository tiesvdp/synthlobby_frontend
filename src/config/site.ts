export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "SynthLobby",
  description:
    "Don't waste time searching the internet for the cheapest keyboard prices. SynthLobby does it for you.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Merken",
      href: "/merken",
    },
    {
      label: "Wishlist",
      href: "/wishlist",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/tiesvdp",
  },
};
