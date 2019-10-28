import { Product } from '../products/product.type';

export type CartItem = {
  qty: number;
  product: Product;
};

export type CartState = {
  items: CartItem[];
};
