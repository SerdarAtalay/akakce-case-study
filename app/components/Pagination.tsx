import { Link } from "@remix-run/react";

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
}

export default function Pagination({
  currentPage,
  hasNextPage,
}: PaginationProps) {
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Sayfa <span className="font-medium">{currentPage}</span>
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        {currentPage > 1 && (
          <Link
            to={`/?page=${currentPage - 1}`}
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Önceki
          </Link>
        )}

        {hasNextPage && (
          <Link
            to={`/?page=${currentPage + 1}`}
            className={`relative ${currentPage > 1 ? "ml-3" : ""} inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
          >
            Sonraki
          </Link>
        )}
      </div>
    </nav>
  );
}