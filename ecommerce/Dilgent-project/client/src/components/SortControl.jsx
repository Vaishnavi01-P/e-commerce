export default function SortControl({ sort, onChange }) {
  return (
    <div className="mb-4">
      <label className="mr-2">Sort:</label>
      <select
        aria-label="Sort products"
        value={sort}
        onChange={(e) => onChange({ sort: e.target.value })}
        className="border rounded px-3 py-2"
      >
        <option value="">Relevance</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating_desc">Rating: High to Low</option>
      </select>
    </div>
  )
}
