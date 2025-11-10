import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    images: { type: [String], default: [], validate: v => v.length >= 1 },
    category: { type: String, index: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Product = mongoose.model('Product', ProductSchema)
