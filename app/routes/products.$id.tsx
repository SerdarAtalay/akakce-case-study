import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import type { ProductDetailResponse } from "~/types/product.types";

export async function loader({ params }: LoaderFunctionArgs) {
  const productId = params.id;
  const response = await fetch(`https://mock.akakce.dev/product${productId}.json`);
  if (!response.ok) {
    throw new Response("Ürün detayı yüklenirken bir hata oluştu", { status: 500 });
  }
  const data: ProductDetailResponse = await response.json();
  return { product: data };
}

export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();
  const [selectedStorage, setSelectedStorage] = useState(
    product.storageOptions?.[0] || ""
  );

  return (
    <div className="flex items-center justify-center mt-12 mx-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col items-center">
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="max-h-64 max-w-64 object-contain rounded-lg border"
            />
            <div className="flex items-center gap-2 mt-4">
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                {product.badge}
              </span>
              <span className="flex items-center text-yellow-500 text-sm font-medium">
                {"★".repeat(Math.round(product.rating))}
                <span className="ml-1 text-gray-500">{product.rating.toFixed(1)}</span>
              </span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-blue-600 font-bold text-lg">{product.mkName}</h2>
              <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
              <div className="mb-4">
                <span className="text-gray-600 text-sm">{product.countOfPrices} satıcı</span>
              </div>
              {product.storageOptions && product.storageOptions.length > 0 && (
                <div className="mb-4">
                  <div className="font-semibold mb-1 text-sm">Kapasite seçenekleri:</div>
                  <div className="flex gap-2">
                    {product.storageOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedStorage(option)}
                        className={`px-3 py-1 rounded border text-sm ${
                          selectedStorage === option
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                        }`}
                        type="button"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="text-3xl font-bold text-blue-700 mt-4">
                {product.price.toLocaleString()} TL
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded ${product.freeShipping ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                  {product.freeShipping ? "Ücretsiz Kargo" : "Kargo Ücretli"}
                </span>
                <span className="text-xs text-gray-400">
                  Son güncelleme: {product.lastUpdate}
                </span>
              </div>
            </div>
            <div className="mt-6 bg-gray-50 rounded p-4">
              <h2 className="font-semibold mb-2 text-sm">Ürün Özellikleri</h2>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                <li>Marka: {product.mkName}</li>
                <li>Model: {product.productName}</li>
                <li>Puan: {product.rating}</li>
                <li>Satıcı sayısı: {product.countOfPrices}</li>
                <li>Fiyat: {product.price.toLocaleString()} TL</li>
                <li>Depolama Seçenekleri: {product.storageOptions.join(", ")}</li>
                <li>Son güncelleme: {product.lastUpdate}</li>
                <li>Ücretsiz kargo: {product.freeShipping ? "Evet" : "Hayır"}</li>
                <li>Seçilen depolama: {selectedStorage}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}