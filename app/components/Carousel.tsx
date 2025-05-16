import { useState } from "react";
import type { Product } from "~/types/product.types";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
}

export function Carousel({ products }: Props) {
  const [current, setCurrent] = useState(0);

  if (!products.length) return null;

  const goTo = (idx: number) => {
    if (idx < 0) setCurrent(products.length - 1);
    else if (idx >= products.length) setCurrent(0);
    else setCurrent(idx);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative flex justify-center items-center w-full max-w-xs mx-auto">
        <button
          aria-label="Önceki"
          onClick={() => goTo(current - 1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10"
        >
          ◀
        </button>
        <div className="w-full flex justify-center p-4">
          <ProductCard product={products[current]} layout="horizontal" />
        </div>
        <button
          aria-label="Sonraki"
          onClick={() => goTo(current + 1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10"
        >
          ▶
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        {products.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${current === idx ? "bg-blue-400" : "bg-gray-300"} inline-block`}
            style={{ transition: "background 0.2s" }}
          />
        ))}
      </div>
    </div>
  );
}