export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "SynthLobby",
  description:
    "Don't waste time searching the internet for the cheapest keyboard prices. SynthLobby does it for you.",
  navItems: [
    {
      label: "Home",
      href: "/synths",
    },
    {
      label: "Brands",
      href: "/brands",
    },
    {
      label: "Wishlist",
      href: "/wishlist",
    },
  ],
  links: {
    github: "https://github.com/tiesvdp",
  },
};
