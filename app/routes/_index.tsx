import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProductCard } from "~/components/ProductCard";
import Pagination from "~/components/Pagination";
import { getProductList } from "~/services/product.server";
import { useEffect, useState } from "react";
import { Carousel } from "~/components/Carousel";

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
      hasNextPage: !!data?.nextUrl,
    });
  } catch (error) {
    throw new Response("Ürünler yüklenirken bir hata oluştu", { status: 500 });
  }
}

export default function Index() {
  const { data, currentPage, hasNextPage } = useLoaderData<typeof loader>();
  const [horizontalList, setHorizontalList] = useState(
    data.horizontalProductList ?? []
  );

  useEffect(() => {
    if (data.horizontalProductList && data.horizontalProductList.length > 0) {
      setHorizontalList(data.horizontalProductList);
    }
  }, [data.horizontalProductList]);

  const productList = data?.productList ?? [];

  return (
    <>
      <header className="bg-blue-100">
        <h1 className="text-2xl text-blue-100 mb-6">Akakçe</h1>
      </header>
      <div className="container mx-auto px-4 py-8">
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Öne Çıkan Ürünler
          </h2>
          <Carousel products={horizontalList} />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Tüm Ürünler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 items-stretch mx-auto">
            {productList.map((product) => (
              <div key={product.code} className="flex justify-center">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} hasNextPage={hasNextPage} />
        </section>
      </div>
    </>
  );
}
