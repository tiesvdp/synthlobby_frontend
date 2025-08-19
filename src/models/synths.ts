export type Synth = {
  name: string;
  href: string;
  price: number;
  availability: string;
  image: string;
  brand: string;
  source: string;
  id: string;
  liked?: boolean;
  prices: {
    price: number;
    date: string;
  }[];
};
