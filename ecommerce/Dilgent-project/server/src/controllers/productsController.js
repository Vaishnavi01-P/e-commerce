import { Product } from '../models/Product.js'

export async function listProducts(req, res, next) {
  try {
    const { q = '', category, sort = '', page = 1, limit = 12 } = req.query
    const pageNum = Math.max(1, parseInt(page))
    const lim = Math.min(50, Math.max(1, parseInt(limit)))

    const filter = {}
    if (q) filter.name = { $regex: q, $options: 'i' }
    if (category) filter.category = category

    const sortMap = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      rating_desc: { rating: -1 },
    }
    const sortObj = sortMap[sort] || { createdAt: -1 }

    const [items, total] = await Promise.all([
      Product.find(filter).sort(sortObj).skip((pageNum - 1) * lim).limit(lim),
      Product.countDocuments(filter),
    ])

    const totalPages = Math.max(1, Math.ceil(total / lim))

    res.set('Cache-Control', 'public, max-age=60')
    return res.json({ items, page: pageNum, limit: lim, total, totalPages })
  } catch (err) {
    next(err)
  }
}

export async function getProductById(req, res, next) {
  try {
    const { id } = req.params
    const item = await Product.findById(id)
    if (!item) return res.status(404).json({ message: 'Product not found' })
    return res.json(item)
  } catch (err) {
    next(err)
  }
}
