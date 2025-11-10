import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../utils/apiClient'
import Loader from '../components/Loader'
import { useCart } from '../context/CartContext'
import QuantitySelector from '../components/QuantitySelector'
import { formatCurrency } from '../utils/currency'

export default function ProductDetails() {
  const { id } = useParams()
  const [data, setData] = useState({ item: null, loading: true })
  const [qty, setQty] = useState(1)
  const { dispatch } = useCart()

  useEffect(() => {
    setData({ item: null, loading: true })
    apiGet(`/api/products/${id}`)
      .then((res) => setData({ item: res, loading: false }))
      .catch(() => setData({ item: null, loading: false }))
  }, [id])

  if (data.loading) return <Loader />
  if (!data.item) return <div>Product not found</div>

  const p = data.item

  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { _id: p._id, name: p.name, price: p.price, image: p.images?.[0], qty } })
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <img src={p.images?.[0]} alt={p.name} className="w-full rounded" />
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {(p.images || []).slice(1).map((src, i) => (
            <img key={i} src={src} alt={`thumb ${i}`} className="w-20 h-20 object-cover rounded border" />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{p.name}</h1>
        <div className="mt-2 text-yellow-700">★ {p.rating?.toFixed(1) ?? '0.0'}</div>
        <div className="mt-4 text-3xl font-bold">{formatCurrency(p.price)}</div>
        <p className="mt-4 text-gray-700 whitespace-pre-line">{p.description}</p>
        {p.stock <= 5 && <div className="mt-2 text-sm text-red-600">Only {p.stock} left!</div>}

        <div className="mt-6 flex items-center gap-4">
          <QuantitySelector value={qty} onChange={setQty} max={p.stock || 99} />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={addToCart} disabled={p.stock === 0}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
