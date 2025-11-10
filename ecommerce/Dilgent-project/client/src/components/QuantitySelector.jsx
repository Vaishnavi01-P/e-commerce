export default function QuantitySelector({ value, onChange, max = 99 }) {
  return (
    <div className="inline-flex items-center border rounded">
      <button className="px-3 py-2" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity">-</button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Math.min(max, Math.max(1, Number(e.target.value))))}
        className="w-14 text-center border-l border-r py-2"
        aria-label="Quantity"
      />
      <button className="px-3 py-2" onClick={() => onChange(Math.min(max, value + 1))} aria-label="Increase quantity">+</button>
    </div>
  )
}
