import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/Product';

const SORT_MAP: Record<string, Record<string, 1 | -1>> = {
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  rating_desc: { rating: -1 },
};

export async function listProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const q = (req.query.q as string) || '';
    const category = (req.query.category as string) || '';
    const sortKey = (req.query.sort as string) || '';
    const page = Math.max(parseInt((req.query.page as string) || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt((req.query.limit as string) || '12', 10), 1), 50);

    const filter: any = {};
    if (q) filter.name = { $regex: q, $options: 'i' };
    if (category) filter.category = category;

    const sort = SORT_MAP[sortKey] || {};

    const [items, total] = await Promise.all([
      Product.find(filter).sort(sort).skip((page - 1) * limit).limit(limit).lean(),
      Product.countDocuments(filter),
    ]);

    res.setHeader('Cache-Control', 'public, max-age=60');
    res.json({ items, page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
}

export async function getProductById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const item = await Product.findById(id).lean();
    if (!item) return res.status(404).json({ message: 'Product not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}
