export type ProductImages = {
  standard: string;
  webp: string;
  thumbStandard: string;
  thumbWebp: string;
  blur: string;
  thumbBlur: string;
};

export type Product = {
  _id: string;
  name: string;
  descriptions: string[];
  image: string;
  department: string;
  price: string;
  related: string[];
  images: ProductImages | null;
  comments: ProductComment[];
  createdAt: string;
  updatedAt: string;
};

export type ProductComment = {
  _id: string;
  userId: number;
  rating: number;
  userName: string;
  content: string;
  createdAt: string;
};

export type ProductState = {
  productsByKey: Record<number, Product>;
  productIds: number[];
  productComments: Record<number, Array<ProductComment>>;
  currentPage: number;
  hasMore: boolean;
  loadingProducts: boolean;
};
