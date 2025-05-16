import type { Product } from "~/types/product.types";

interface ProductCardProps {
  product: Product;
  layout?: "horizontal" | "vertical";
}

export function ProductCard({ product, layout = "vertical" }: ProductCardProps) {
  return (
    <div
      className={`bg-white border mx-10 my-4 border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 ${
        layout === "horizontal"
          ? "flex-shrink-0 w-96 max-w-full mx-auto"
          : "flex-shrink-0 w-full max-w-xs mx-auto"
      }`}
    >
      <a href={`/products/${product.code}`} className="block p-4">
        <div className="relative flex justify-center items-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-36 w-36 object-contain bg-white"
          />
          {product.dropRatio > 0 && (
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold rounded-full w-9 h-9 flex items-center justify-center shadow">
              %{product.dropRatio}
            </div>
          )}
        </div>
        <div className="mt-3 flex flex-col items-center">
          <h3 className="text-blue-500 font-medium text-base text-center line-clamp-1 hover:underline mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
            {product.price.toLocaleString("tr-TR")},00 <span className="text-base font-normal">TL</span>
          </p>
          <p className="text-xs text-gray-500 mb-1">
            {product.countOfPrices} satıcı <span className="text-gray-400">›</span>
          </p>
          <p className="text-xs text-gray-400">
            {product.followCount.toLocaleString("tr-TR")}+ takip
          </p>
        </div>
      </a>
    </div>
  );
}