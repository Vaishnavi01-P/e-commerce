export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  const prev = () => onChange(Math.max(1, page - 1))
  const next = () => onChange(Math.min(totalPages, page + 1))
  return (
    <div className="flex items-center gap-2 mt-6">
      <button onClick={prev} disabled={page === 1} className="px-3 py-2 border rounded disabled:opacity-50">Prev</button>
      <span className="text-sm">Page {page} of {totalPages}</span>
      <button onClick={next} disabled={page === totalPages} className="px-3 py-2 border rounded disabled:opacity-50">Next</button>
    </div>
  )
}
