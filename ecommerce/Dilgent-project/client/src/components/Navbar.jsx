import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { itemCount } = useCart()
  return (
    <header className="bg-white border-b sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">MiniShop</Link>
        <nav className="flex items-center gap-4">
          <NavLink to="/products" className={({isActive})=>isActive? 'font-medium text-blue-600':'text-gray-700'}>Products</NavLink>
          <NavLink to="/cart" className={({isActive})=>isActive? 'font-medium text-blue-600 relative':'relative'} aria-label="Cart">
            Cart
            <span className="ml-1 inline-flex items-center justify-center text-xs bg-blue-600 text-white rounded-full w-5 h-5" aria-label={`Cart items: ${itemCount}`}>{itemCount}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
