import 'dotenv/config'
import app from './app.js'
import { connectDB } from './config/db.js'

const PORT = process.env.PORT || 4000
const URI = process.env.MONGODB_URI

if (!URI) {
  console.error('Missing MONGODB_URI')
  process.exit(1)
}

connectDB(URI)
  .then(() => {
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('DB connection error', err)
    process.exit(1)
  })
