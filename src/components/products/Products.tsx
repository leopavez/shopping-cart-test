import { Product } from '../../interface/Product';
import { useCart } from '../../hooks/useCart';

interface ProductsProps {
  products: Product[];
}

export function Products({ products }: ProductsProps) {
  const { addToCart, cart } = useCart();

  const checkProductInCart = (product: Product) => {
    return cart.some((item: Product) => item.id === product.id);
  };

  return (
    <main className="container mx-auto p-4">
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => {
        const productInCart = checkProductInCart(product);
  
        return (
          <li key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div>
              <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <span className="text-gray-600">${product.price}</span>
              <p className="text-gray-400">{product.description}</p>
            </div>
            <div className="p-4">
              <button
                className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full ${
                  productInCart ? 'bg-green-500 hover:bg-green-600' : ''
                }`}
                onClick={() => addToCart(product)}
              >
                {productInCart ? 'Agregado' : 'Añadir al carrito'}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  </main>
  
  );
}
