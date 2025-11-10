import request from 'supertest'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from '../app.js'
import { Product } from '../models/Product.js'

let mongo

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  await mongoose.connect(uri, { dbName: 'testdb' })
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongo.stop()
})

describe('Products API', () => {
  beforeEach(async () => {
    await Product.deleteMany({})
    await Product.create({ name: 'Test', price: 10, images: ['https://x'], category: 'Books', rating: 4, stock: 3 })
  })

  test('GET /api/products returns list with pagination', async () => {
    const res = await request(app).get('/api/products')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.items)).toBe(true)
    expect(res.body).toHaveProperty('page')
    expect(res.body).toHaveProperty('total')
    expect(res.body).toHaveProperty('totalPages')
  })

  test('GET /api/products/:id returns product', async () => {
    const item = await Product.findOne()
    const res = await request(app).get(`/api/products/${item._id}`)
    expect(res.status).toBe(200)
    expect(res.body._id).toBe(String(item._id))
  })
})
