require('dotenv').config()
const express  = require('express')
const cors     = require('cors')
const helmet   = require('helmet')
const morgan   = require('morgan')
const rateLimit = require('express-rate-limit')

const connectDB    = require('./config/db')
const errorHandler = require('./middleware/errorHandler')

const authRoutes      = require('./routes/auth')
const quoteRoutes     = require('./routes/quotes')
const contactRoutes   = require('./routes/contact')
const dashboardRoutes = require('./routes/dashboard')
// ── Connect Database ─────────────────────────────────────────────────────────
connectDB();

const app = express()

// ── Security ─────────────────────────────────────────────────────────────────
app.use(helmet())

app.use(cors({
  origin: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// ── Rate Limiting ─────────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
  skip: () => process.env.NODE_ENV === 'development', // Disable in dev
})

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // Increased from 10 to 100
  message: { success: false, message: 'Too many submissions from this IP. Try again later.' },
  skip: () => process.env.NODE_ENV === 'development', // Disable in dev
})

app.use(globalLimiter)

// ── Parsing ───────────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// ── Logging ───────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
}

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Sainik Global Logistics API',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  })
})

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth',      authRoutes)
app.use('/api/quotes',    submitLimiter, quoteRoutes)
app.use('/api/contact',   submitLimiter, contactRoutes)
app.use('/api/dashboard', dashboardRoutes)

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` })
})

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use(errorHandler)

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5001
const server = app.listen(PORT, () => {
  console.log(`🚀 Sainik Global API running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`)
})

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Stop the process using it or set a different PORT in backend/.env.`)
  } else {
    console.error('❌ Server error:', error.message)
  }
  process.exit(1)
})

module.exports = app
