/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useContext } from "react";
import { FiltersContext } from "../context/filters.tsx";
export function useFilters() {
  const filtersContext = useContext(FiltersContext);

  if (!filtersContext) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }

  const { filters, setFilters } = filtersContext;

  const filterProducts = (products: {
    price: number;
    category: string;
    thumbnail: string;
    title: string;
    id: number;
    description: string;
  }[]) => {
    return products
      .filter((product) => {
        return (
          product.price >= filters?.minPrice! &&
          (filters?.category === 'all' || product.category === filters?.category) &&
          (filters?.search
            ? product.title.toLowerCase().includes(filters?.search.toLowerCase()) ||
              product.description.toLowerCase().includes(filters?.search.toLowerCase())
            : true)
        );
      })
      .map((product) => {
        return {
          ...product,
          price: product.price || 0,
          thumbnail: product.thumbnail || '',
          title: product.title || '',
          id: product.id || 0,
          category: product.category || '',
          description: product.description || '',
        };
      });
  };

  return { filters, filterProducts, setFilters }
}
