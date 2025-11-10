import { useCart } from '../context/CartContext'
import QuantitySelector from '../components/QuantitySelector'
import { formatCurrency } from '../utils/currency'
import EmptyState from '../components/EmptyState'

export default function Cart() {
  const { state, dispatch, subtotal } = useCart()

  const remove = (id) => dispatch({ type: 'REMOVE_ITEM', payload: { _id: id } })
  const changeQty = (id, qty) => dispatch({ type: 'CHANGE_QTY', payload: { _id: id, qty } })
  const clear = () => dispatch({ type: 'CLEAR_CART' })

  if (state.items.length === 0) return <EmptyState title="Your cart is empty" subtitle="Add some products to begin" />

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {state.items.map((i) => (
          <div key={i._id} className="flex items-center gap-4 border rounded p-4 bg-white">
            {i.image && <img src={i.image} alt={i.name} className="w-20 h-20 object-cover rounded" />}
            <div className="flex-1">
              <div className="font-medium line-clamp-1">{i.name}</div>
              <div className="text-sm text-gray-600">{formatCurrency(i.price)}</div>
            </div>
            <QuantitySelector value={i.qty} onChange={(v) => changeQty(i._id, v)} />
            <div className="w-24 text-right font-semibold">{formatCurrency(i.price * i.qty)}</div>
            <button className="text-red-600" onClick={() => remove(i._id)} aria-label={`Remove ${i.name}`}>
              Remove
            </button>
          </div>
        ))}
        <button className="text-sm text-gray-600 underline" onClick={clear}>Clear cart</button>
      </div>
      <aside className="border rounded p-4 h-fit bg-white">
        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span className="font-semibold">{formatCurrency(subtotal)}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">Taxes and shipping calculated at checkout (not implemented).</p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded" disabled>Checkout (N/A)</button>
      </aside>
    </div>
  )
}
