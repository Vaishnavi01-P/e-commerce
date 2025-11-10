import { useEffect, useState } from 'react'

export default function Toast({ message, show, onClose }) {
  const [visible, setVisible] = useState(show)
  useEffect(() => {
    setVisible(show)
    if (show) {
      const t = setTimeout(() => onClose?.(), 2000)
      return () => clearTimeout(t)
    }
  }, [show, onClose])
  if (!visible) return null
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded shadow">
      {message}
    </div>
  )
}
