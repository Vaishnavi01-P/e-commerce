import { cartReducer, initialCartState } from '../context/cartReducer'

describe('cartReducer', () => {
  test('ADD_ITEM adds a new item', () => {
    const action = { type: 'ADD_ITEM', payload: { _id: '1', name: 'A', price: 10, qty: 1 } }
    const state = cartReducer(initialCartState, action)
    expect(state.items).toHaveLength(1)
    expect(state.items[0].qty).toBe(1)
  })

  test('ADD_ITEM increments qty if exists', () => {
    const start = { items: [{ _id: '1', name: 'A', price: 10, qty: 1 }] }
    const action = { type: 'ADD_ITEM', payload: { _id: '1', name: 'A', price: 10, qty: 2 } }
    const state = cartReducer(start, action)
    expect(state.items[0].qty).toBe(3)
  })

  test('CHANGE_QTY updates qty and removes when qty <= 0', () => {
    const start = { items: [{ _id: '1', name: 'A', price: 10, qty: 2 }] }
    const s1 = cartReducer(start, { type: 'CHANGE_QTY', payload: { _id: '1', qty: 5 } })
    expect(s1.items[0].qty).toBe(5)
    const s2 = cartReducer(s1, { type: 'CHANGE_QTY', payload: { _id: '1', qty: 0 } })
    expect(s2.items).toHaveLength(0)
  })

  test('REMOVE_ITEM removes item', () => {
    const start = { items: [{ _id: '1', name: 'A', price: 10, qty: 1 }] }
    const state = cartReducer(start, { type: 'REMOVE_ITEM', payload: { _id: '1' } })
    expect(state.items).toHaveLength(0)
  })

  test('CLEAR_CART clears all', () => {
    const start = { items: [{ _id: '1', name: 'A', price: 10, qty: 1 }] }
    const state = cartReducer(start, { type: 'CLEAR_CART' })
    expect(state.items).toHaveLength(0)
  })
})
