const express = require('express')
const { login, register, getMe } = require('../controllers/authController')
const { protect } = require('../middleware/auth')

const router = express.Router()

router.post('/login',    login)
router.post('/register', register)   // Protect this in production with a seed script
router.get('/me',        protect, getMe)

module.exports = router
