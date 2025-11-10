export default function EmptyState({ title = 'Nothing here', subtitle }) {
  return (
    <div className="text-center py-10 text-gray-500">
      <div className="text-lg">{title}</div>
      {subtitle && <div className="text-sm mt-1">{subtitle}</div>}
    </div>
  )
}
