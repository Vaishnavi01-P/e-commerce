const currency = import.meta.env.VITE_CURRENCY || 'USD'

export function formatCurrency(value) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(value)
}
