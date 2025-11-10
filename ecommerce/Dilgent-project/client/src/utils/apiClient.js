const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export async function apiGet(path, params = {}) {
  const url = new URL(path, baseURL)
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v)
  })
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } })
  if (!res.ok) throw new Error((await res.json()).message || 'Request failed')
  return res.json()
}
