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
