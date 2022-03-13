export type Basket = {
  id: string;
  userId: string;
  products: Product[];
};

export type Product = {
  id: string;
  productId: number;
  amount: number;
  basket: Basket;
};
