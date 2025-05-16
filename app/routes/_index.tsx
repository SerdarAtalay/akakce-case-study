import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProductCard } from "~/components/ProductCard";
import Pagination from "~/components/Pagination";
import { getProductList } from "~/services/product.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  let apiUrl = "https://mock.akakce.dev/page.json";
  if (currentPage > 1) {
    apiUrl = `https://mock.akakce.dev/page${currentPage}.json`;
  }

  try {
    const data = await getProductList(apiUrl);
    return json({ 
      data: {
        horizontalProductList: data?.horizontalProductList ?? [],
        productList: data?.productList ?? [],
        nextUrl: data?.nextUrl ?? null,
      }, 
      currentPage,
      hasNextPage: !!data?.nextUrl
    });
  } catch (error) {
    throw new Response("Ürünler yüklenirken bir hata oluştu", { status: 500 });
  }
}

export default function Index() {
  const { data, currentPage, hasNextPage } = useLoaderData<typeof loader>();

  const horizontalList = data?.horizontalProductList ?? [];
  const productList = data?.productList ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Akakce Ürünleri</h1>
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Öne Çıkan Ürünler</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {horizontalList.map((product) => (
            <ProductCard 
              key={product.code}
              product={product} 
              layout="horizontal" 
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Tüm Ürünler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {productList.map((product) => (
            <ProductCard 
              key={product.code}
              product={product} 
            />
          ))}
        </div>
        <Pagination 
          currentPage={currentPage} 
          hasNextPage={hasNextPage} 
        />
      </section>
    </div>
  );
}