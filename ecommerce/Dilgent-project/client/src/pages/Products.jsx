import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { apiGet } from '../utils/apiClient'
import ProductCard from '../components/ProductCard'
import FiltersBar from '../components/FiltersBar'
import SortControl from '../components/SortControl'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import EmptyState from '../components/EmptyState'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState({ items: [], totalPages: 1, page: 1, loading: true })

  const q = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || ''
  const page = Number(searchParams.get('page') || '1')
  const limit = 12

  const onFilterChange = (patch) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(patch).forEach(([k, v]) => {
      if (v) next.set(k, v)
      else next.delete(k)
    })
    next.set('page', '1')
    setSearchParams(next)
  }

  useEffect(() => {
    setData((d) => ({ ...d, loading: true }))
    apiGet('/api/products', { q, category, sort, page, limit })
      .then((res) => setData({ items: res.items, totalPages: res.totalPages, page: res.page, loading: false }))
      .catch(() => setData({ items: [], totalPages: 1, page: 1, loading: false }))
  }, [q, category, sort, page])

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <FiltersBar q={q} category={category} onChange={onFilterChange} />
      <SortControl sort={sort} onChange={onFilterChange} />

      {data.loading ? (
        <Loader />
      ) : data.items.length === 0 ? (
        <EmptyState title="No products found" subtitle="Try different filters or search" />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.items.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
          <Pagination page={data.page} totalPages={data.totalPages} onChange={(p) => setSearchParams({ q, category, sort, page: String(p) })} />
        </>
      )}
    </div>
  )
}
