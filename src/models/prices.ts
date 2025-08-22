export type PricePoint = {
  date: Date;
  price: number;
};

export interface PriceChangeResult {
  currentPrice: number | null;
  previousPrice: number | null;
  percentChange: number | null;
}
