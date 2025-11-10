import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-3xl font-bold mb-2">404 - Not Found</h1>
      <p className="text-gray-600 mb-6">The page you are looking for doesn't exist.</p>
      <Link to="/" className="text-blue-600 underline">Go home</Link>
    </div>
  )
}
