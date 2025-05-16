import type { Product } from "~/types/product.types";

interface ProductCardProps {
  product: Product;
  layout?: "horizontal" | "vertical";
}

export function ProductCard({ product, layout = "vertical" }: ProductCardProps) {
  return (
    <div className={`border rounded-lg overflow-hidden shadow-md ${layout === "horizontal" ? "flex-shrink-0 w-64" : ""}`}>
      <a href={`/products/${product.code}`}>
        <div className="relative">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="h-48 w-full object-contain bg-white" 
          />
          {product.dropRatio > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
              %{product.dropRatio}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
          <p className="text-lg font-bold mt-2">{product.price.toLocaleString()} TL</p>
          <p className="text-xs text-gray-500">{product.countOfPrices} satıcı</p>
          <p className="text-xs text-gray-500">{product.followCount} takip</p>
        </div>
      </a>
    </div>
  );
}