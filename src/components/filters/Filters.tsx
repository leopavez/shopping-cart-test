import { useId } from "react";
import { useFilters } from "../../hooks/useFilters";
import { products } from "../../mocks/products.json";

export function Filters() {
  const { filters, setFilters } = useFilters();

  const minPriceFilterId = useId();
  const categoryFilterId = useId();
  const searchFilterId = useId();

  const handleChangeMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      minPrice: Number(event.target.value),
    });
  };

  const handleChangeCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters({
      ...filters,
      category: event.target.value,
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      search: event.target.value,
    });
  };

  const getMaxPrice = () => {
    return products.reduce((max, product) => {
      return product.price > max ? product.price : max;
    }, 0);
  };

  const getCategoryOptions = () => {
    const categories = products.reduce((categories, product) => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
      return categories;
    }, [] as string[]);

    return categories.map((category) => (
      <option key={category} value={category}>
        {category.toUpperCase()}
      </option>
    ));
  };

  return (
<section className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 shadow-lg text-white">
  <div className="mb-4">
    <input
      className="w-72 md:w-96 py-2 px-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none mx-auto block"
      placeholder="Escribe tu búsqueda"
      type="text"
      id={searchFilterId}
      onChange={handleSearch}
      value={filters.search}
    />
  </div>

  <div className="flex flex-col md:flex-row md:space-x-4">
    <div className="md:w-1/2">
      <label htmlFor={minPriceFilterId} className="block text-xl font-medium mb-2">Precio Mínimo</label>
      <div className="flex items-center">
        <input
          type="range"
          id={minPriceFilterId}
          min="0"
          max={getMaxPrice()}
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
          className="w-full bg-gray-100"
        />
        <span className="ml-2 text-xl font-semibold">${filters.minPrice}</span>
      </div>
    </div>

    <div className="md:w-1/2">
      <label htmlFor={categoryFilterId} className="block text-xl font-medium mb-2">Categoría</label>
      <select
        id={categoryFilterId}
        onChange={handleChangeCategory}
        value={filters.category}
        className="w-full py-2 px-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none"
      >
        <option value="all">TODAS</option>
        {getCategoryOptions()}
      </select>
    </div>
  </div>
</section>
);
}
