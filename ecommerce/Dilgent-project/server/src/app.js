import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import productsRouter from './routes/products.js'
import { notFound, errorHandler } from './middleware/error.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/products', productsRouter)

app.use(notFound)
app.use(errorHandler)

export default app
