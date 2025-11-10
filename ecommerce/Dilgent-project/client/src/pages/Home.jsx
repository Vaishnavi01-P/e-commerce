import { useEffect, useState } from 'react'
import { apiGet } from '../utils/apiClient'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

export default function Home() {
  const [data, setData] = useState({ items: [], loading: true })

  useEffect(() => {
    apiGet('/api/products', { limit: 8, sort: 'rating_desc' })
      .then((res) => setData({ items: res.items, loading: false }))
      .catch(() => setData({ items: [], loading: false }))
  }, [])

  return (
    <div>
      <section className="bg-blue-50 rounded-lg p-8 mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome to MiniShop</h1>
        <p className="text-gray-700">Discover popular products and great deals.</p>
      </section>

      <h2 className="text-xl font-semibold mb-4">Featured</h2>
      {data.loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.items.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
