export interface ProductImages {
  standard: string;
  webp: string;
  thumbStandard: string;
  thumbWebp: string;
  blur: string;
  thumbBlur: string;
}

export interface Product {
  id: number;
  name: string;
  description: string[];
  image: string;
  department: string;
  price: string;
  related: number[];
  images: ProductImages | null;
}
