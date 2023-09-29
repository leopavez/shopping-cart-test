import { useState } from "react";
import { BsFillCartFill, } from "react-icons/bs";
import { useCart } from "../../hooks/useCart";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};


export function Cart() {
  const { cart, addToCart, deleteToCart } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="relative">
    <div
      className="fixed top-3 right-3 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-transform transform hover:scale-110"
      onClick={toggleCart}
    >
      <BsFillCartFill className="text-xl" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">
        {cart ? cart.length : 0}
      </span>
    </div>

    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isCartOpen ? '' : 'hidden'}`}
    ></div>

    <div
      className={`absolute top-20 right-20 w-72 bg-white rounded-lg shadow-lg p-6 ${isCartOpen ? '' : 'hidden'}`}
    >
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2
                      className="text-lg font-medium text-gray-900"
                      id="slide-over-title"
                    >
                      Carrito
                    </h2>
                    <button
                      className="text-gray-400 hover:text-gray-500"
                      onClick={toggleCart}
                    >
                      <span className="sr-only">Close panel</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cart &&
                          cart.map((product: Product) => (
                            <li key={product.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={product.thumbnail}
                                  alt={product.title}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href="#">{product.title}</a>
                                    </h3>
                                    <p className="ml-4">${product.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                  {product.title}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex">
                                    <button
                                      type="button"
                                      className="font-medium bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600"
                                      onClick={() => deleteToCart(product)}
                                    >
                                      -
                                    </button>
                                  </div>
                                  <p className="text-gray-500">
                                    {product.quantity}
                                  </p>
                                  <div className="flex">
                                    <button
                                      type="button"
                                      className="bg-indigo-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-indigo-600"
                                      onClick={() => addToCart(product)}
                                    >
                                      +
                                    </button>
                                    
                                  </div>
                                </div>
                              </div>
                              
                            </li>
                            
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
