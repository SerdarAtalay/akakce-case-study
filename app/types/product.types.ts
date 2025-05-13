export interface Product {
  code: number;
  name: string;
  imageUrl: string;
  dropRatio: number;
  price: number;
  countOfPrices: number;
  followCount: number;
  url: string;
}

export interface ProductListResponse {
  horizontalProductList: Product[];
  productList: Product[];
  nextUrl?: string;
}

export interface ProductDetailResponse {
    mkName: string;
    productName: string;
    badge: string;
    rating: number;
    imageUrl: string;
    storageOptions: string[];
    countOfPrices: number;
    price: number;
    freeShipping: boolean;
    lastUpdate: string;
}