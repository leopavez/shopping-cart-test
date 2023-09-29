import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";

type Filters = {
  category: string;
  minPrice: number;
  search: string;
};

type FiltersContextType = {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

export const FiltersContext = createContext<FiltersContextType | null>(null);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters>({
    category: "all",
    minPrice: 0,
    search: "",
  });

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
