import { useReducer, createContext } from 'react'
import { cartReducer, cartInitialState, Action } from '../reducers/cart'


interface CartContextType {
        cart: typeof cartInitialState;
        addToCart: (product: Product) => void;
        removeFromCart: (product: Product) => void;
        deleteToCart: (product: Product) => void;
        clearCart: () => void;
      }


export const CartContext = createContext<CartContextType | undefined>(undefined)

interface Product {
        id: number;
        name: string;
        price: number;
}

function useCartReducer () {
        const [state, dispatch] = useReducer(cartReducer, cartInitialState)

        const addToCart = (product: Product) => dispatch({
                type: 'ADD_TO_CART',
                payload: product
        } as Action)

        const removeFromCart = (product: Product) => dispatch({
                type: 'REMOVE_FROM_CART',
                payload: product
        } as Action)

        const deleteToCart = (product: Product) => dispatch({
                type: 'DELETE_TO_CART',
                payload: product
        } as Action)

        const clearCart = () => dispatch({ type: 'CLEAR_CART' } as Action)

        return { state, addToCart, removeFromCart, clearCart, deleteToCart }
}

export function CartProvider ({ children }: { children: React.ReactNode }) {
    const { state, addToCart, removeFromCart, clearCart, deleteToCart } = useCartReducer()

    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            clearCart,
            deleteToCart
        }}
        >
            {children}
        </CartContext.Provider>
    )
}