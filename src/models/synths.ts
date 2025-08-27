export type Synth = {
  name: string;
  href: string;
  price: number | null;
  availability: string;
  image: string;
  brand: string;
  source: string;
  id: string;
  liked?: boolean;
  prices: {
    price: number | null;
    date: string;
  }[];
};
