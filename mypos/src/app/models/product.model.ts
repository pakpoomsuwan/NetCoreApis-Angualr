export class Product {
  productId: number;
  name: string;
  image: string;
  stock: number;
  price: number;
  qty: number;
  created: Date;
}

export interface ProductResponse {
  result: Product | Product[];
  message: string;
}
