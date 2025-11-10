import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const product = {
  _id: 'p1',
  name: 'Sample Product',
  price: 19.99,
  rating: 4.2,
  stock: 3,
  images: ['https://example.com/img.jpg']
}

test('renders product name, price and rating', () => {
  render(
    <BrowserRouter>
      <ProductCard product={product} />
    </BrowserRouter>
  )
  expect(screen.getByText('Sample Product')).toBeInTheDocument()
  expect(screen.getByText(/Only 3 left!/)).toBeInTheDocument()
  expect(screen.getByText(/\$|USD|€|£|₹/)).toBeInTheDocument()
  expect(screen.getByLabelText(/Rating/)).toBeInTheDocument()
})
