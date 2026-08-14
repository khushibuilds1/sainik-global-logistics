const express = require('express')
const { getDashboard } = require('../controllers/dashboardController')
const { protect, adminOnly } = require('../middleware/auth')

const router = express.Router()

router.get('/', protect, adminOnly, getDashboard)

module.exports = router
