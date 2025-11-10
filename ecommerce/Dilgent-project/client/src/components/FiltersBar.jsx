export default function FiltersBar({ q, category, onChange }) {
  return (
    <div className="flex flex-wrap gap-3 items-center mb-4">
      <input
        aria-label="Search products"
        type="search"
        placeholder="Search by name..."
        value={q}
        onChange={(e) => onChange({ q: e.target.value })}
        className="border rounded px-3 py-2 w-full sm:w-64"
      />
      <select
        aria-label="Filter by category"
        value={category}
        onChange={(e) => onChange({ category: e.target.value })}
        className="border rounded px-3 py-2"
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Books">Books</option>
        <option value="Home & Kitchen">Home & Kitchen</option>
        <option value="Fashion">Fashion</option>
      </select>
    </div>
  )
}
