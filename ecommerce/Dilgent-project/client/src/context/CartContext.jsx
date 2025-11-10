import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { cartReducer, initialCartState } from './cartReducer'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    () => {
      const raw = localStorage.getItem('cart_state')
      return raw ? JSON.parse(raw) : initialCartState
    }
  )

  useEffect(() => {
    localStorage.setItem('cart_state', JSON.stringify(state))
  }, [state])

  const value = useMemo(() => {
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0)
    const itemCount = state.items.reduce((sum, i) => sum + i.qty, 0)
    return { state, dispatch, subtotal, itemCount }
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
