import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/currency'

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow-sm transition">
      <Link to={`/products/${product._id}`}>
        <img src={product.images?.[0]} alt={product.name} className="w-full h-48 object-cover" loading="lazy" />
      </Link>
      <div className="p-4">
        <Link to={`/products/${product._id}`} className="font-medium line-clamp-1">{product.name}</Link>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-semibold">{formatCurrency(product.price)}</span>
          <span className="text-sm text-yellow-600" aria-label={`Rating ${product.rating}`}>★ {product.rating?.toFixed(1) ?? '0.0'}</span>
        </div>
        {product.stock <= 5 && (
          <div className="mt-2 text-xs text-red-600">Only {product.stock} left!</div>
        )}
      </div>
    </div>
  )
}
