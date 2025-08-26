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

    {
      label: "Compare",
      href: "/compare",
    },
    {
      label: "My Dashboard",
      href: "/dashboard",
    },
  ],
  links: {
    github: "https://github.com/tiesvdp",
    website: "https://tiesvdp.be",
  },
};
