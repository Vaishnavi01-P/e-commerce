export const initialCartState = { items: [] }

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find((i) => i._id === action.payload._id)
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i._id === action.payload._id ? { ...i, qty: i.qty + (action.payload.qty || 1) } : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: action.payload.qty || 1 }] }
    }
    case 'REMOVE_ITEM': {
      return { ...state, items: state.items.filter((i) => i._id !== action.payload._id) }
    }
    case 'CHANGE_QTY': {
      const { _id, qty } = action.payload
      if (qty <= 0) {
        return { ...state, items: state.items.filter((i) => i._id !== _id) }
      }
      return { ...state, items: state.items.map((i) => (i._id === _id ? { ...i, qty } : i)) }
    }
    case 'CLEAR_CART': {
      return { items: [] }
    }
    default:
      return state
  }
}
