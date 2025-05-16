import type { Product } from "~/types/product.types";

interface ProductCardProps {
  product: Product;
  layout?: "horizontal" | "vertical";
}

export function ProductCard({ product, layout = "vertical" }: ProductCardProps) {
  return (
    <div className={`group relative bg-[#F5F5F7] group-hover:bg-[#FAFAFA] transition-colors rounded-2xl overflow-hidden ${
      layout === "horizontal"
        ? "flex-shrink-0 w-80"
        : "w-96"
    }`}>
      <a href={`/products/${product.code}`} className="block">
        {product.dropRatio > 0 && (
          <div className="absolute top-4 left-4 bg-red-500/90 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
            %{product.dropRatio} İndirim
          </div>
        )}
        
        <div className="relative aspect-square flex justify-center items-center p-8 bg-[#F5F5F7]">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-48 h-48 object-contain transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-6">
          <h3 className="text-blue-500 font-medium text-base text-center line-clamp-1 hover:underline mb-1">
            {product.name}
          </h3>
          
          <div className="mt-4 space-y-2">
            <p className="text-xl font-semibold text-gray-900">
              {product.price.toLocaleString("tr-TR")} TL
            </p>
            
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span>{product.countOfPrices} satıcı</span>
              <span className="text-gray-300">•</span>
              <span>{product.followCount.toLocaleString("tr-TR")}+ takip</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}