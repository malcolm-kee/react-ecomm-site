export type ProductImages = {
  standard: string;
  webp: string;
  thumbStandard: string;
  thumbWebp: string;
  blur: string;
  thumbBlur: string;
};

export type Product = {
  id: number;
  name: string;
  description: string[];
  image: string;
  department: string;
  price: string;
  related: number[];
  images: ProductImages | null;
};

export type ProductComment = {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  content: string;
  createdOn: number;
};

export type ProductState = {
  productsByKey: Record<number, Product>;
  productIds: number[];
  productComments: Record<number, Array<ProductComment>>;
  currentPage: number;
  hasMore: boolean;
  loadingProducts: boolean;
};
