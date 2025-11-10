import request from 'supertest';
import mongoose from 'mongoose';
import { createApp } from '../app';
import { Product } from '../models/Product';

const app = createApp();

describe('Products API', () => {
  beforeAll(async () => {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce_mini_test';
    await mongoose.connect(uri);
    await Product.deleteMany({});
    await Product.create({
      name: 'Test Product',
      description: 'A test product',
      price: 9.99,
      images: ['https://picsum.photos/seed/test/400/300'],
      category: 'TestCat',
      rating: 4.5,
      stock: 10,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('GET /api/products returns list with pagination', async () => {
    const res = await request(app).get('/api/products').expect(200);
    expect(res.body).toHaveProperty('items');
    expect(res.body).toHaveProperty('page');
    expect(res.body).toHaveProperty('limit');
    expect(res.body).toHaveProperty('total');
    expect(res.body).toHaveProperty('totalPages');
  });

  it('GET /api/products/:id returns a product', async () => {
    const item = await Product.findOne();
    const res = await request(app).get(`/api/products/${item!._id}`).expect(200);
    expect(res.body._id).toBe(String(item!._id));
  });
});
