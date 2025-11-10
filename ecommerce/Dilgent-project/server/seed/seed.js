import 'dotenv/config'
import mongoose from 'mongoose'
import { Product } from '../src/models/Product.js'
import { sampleProducts } from './data.js'

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('Missing MONGODB_URI')
  process.exit(1)
}

async function run() {
  await mongoose.connect(uri, { dbName: 'ecommerce_mini' })
  await Product.deleteMany({})
  await Product.insertMany(sampleProducts)
  const count = await Product.countDocuments()
  console.log(`Seeded ${count} products`)
  await mongoose.disconnect()
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
