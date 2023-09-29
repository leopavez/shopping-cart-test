export const cartInitialState = getCartInitialState()

function getCartInitialState() {
  try {
    const cartData = window.localStorage.getItem('cart');
    if (cartData) {
      const parsedData = JSON.parse(cartData);
      return Array.isArray(parsedData) ? parsedData : [];
    }
  } catch (error) {
    console.error('Error parsing cart data from localStorage:', error);
  }
  return [];
}

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  DELETE_TO_CART: 'DELETE_TO_CART',
}

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartState extends Array<Product> {}

export interface Action {
    type: string;
    payload: Product;
}

export const updateLocalStorage = (state: CartState) => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

const UPDATE_STATE_BY_ACTION = {
    [CART_ACTION_TYPES.ADD_TO_CART]: (state: CartState, action: Action) => {
        const { id } = action.payload
        const productInCartIndex = state.findIndex((item: Product) => item.id === id)

        if (productInCartIndex >= 0) {
            const newState = [
                ...state.slice(0, productInCartIndex),
                { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1 },
                ...state.slice(productInCartIndex + 1)
            ]

            updateLocalStorage(newState)
            return newState
        }

        const newState = [
            ...state,
            {
                ...action.payload,
                quantity: 1
            }
        ]

        updateLocalStorage(newState)
        return newState
    },
    [CART_ACTION_TYPES.DELETE_TO_CART]: (state: CartState, action: Action) => {
        const { id } = action.payload;
        const productInCartIndex = state.findIndex((item: Product) => item.id === id);
      
        if (productInCartIndex >= 0) {
          let newState;
      
          if (state[productInCartIndex].quantity > 1) {
            newState = [
              ...state.slice(0, productInCartIndex),
              { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity - 1 },
              ...state.slice(productInCartIndex + 1),
            ];
          } else {
            newState = state.filter((item: Product) => item.id !== id);
          }
      
          updateLocalStorage(newState);
          return newState;
        }
      
        const newState = [
          ...state,
          {
            ...action.payload,
            quantity: 1,
          },
        ];
      
        updateLocalStorage(newState);
        return newState;
      }
      ,
    [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state: CartState, action: Action) => {
        const { id } = action.payload
        const newState = state.filter((item: Product) => item.id !== id)
        updateLocalStorage(newState)
        return newState
    },
    [CART_ACTION_TYPES.CLEAR_CART]: () => {
        updateLocalStorage([])
        return []
    }
}

export const cartReducer = (state: CartState, action: Action) => {
    const { type: actionType } = action
    const updateState = UPDATE_STATE_BY_ACTION[actionType]
    return updateState ? updateState(state, action) : state
}