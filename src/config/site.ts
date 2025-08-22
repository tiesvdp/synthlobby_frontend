export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "SynthLobby",
  description:
    "Don't waste time searching the internet for the cheapest keyboard prices. SynthLobby does it for you.",
  navItems: [
    {
      label: "Browse",
      href: "/synths",
    },
    /*     {
      label: "Updates",
      href: "/updates",
    }, */
    {
      label: "Wishlist",
      href: "/wishlist",
    },
    {
      label: "Brands",
      href: "/brands",
    },
  ],
  links: {
    github: "https://github.com/tiesvdp",
    website: "https://tiesvdp.be",
  },
};
