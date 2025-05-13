import type { ProductListResponse, ProductDetailResponse } from "../types/product.types";

export async function getProductList(pageUrl: string): Promise<ProductListResponse> {
  const response = await fetch(pageUrl);
  if (!response.ok) {
    throw new Error("Ürünler yüklenirken bir hata oluştu");
  }
  return response.json();
}

export async function getProductDetail(productId: string): Promise<ProductDetailResponse> {
  const response = await fetch(`https://mock.akakce.dev/product${productId}.json`);
  if (!response.ok) {
    throw new Error("Ürün detayı yüklenirken bir hata oluştu");
  }
  return response.json();
}