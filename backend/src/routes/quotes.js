const express = require('express')
const { createQuote, getQuotes, getQuote, updateQuote, deleteQuote } = require('../controllers/quoteController')
const { protect, adminOnly } = require('../middleware/auth')

const router = express.Router()

router.post('/',          createQuote)                        // public
router.get('/',           protect, adminOnly, getQuotes)
router.get('/:id',        protect, adminOnly, getQuote)
router.patch('/:id',      protect, adminOnly, updateQuote)
router.delete('/:id',     protect, adminOnly, deleteQuote)

module.exports = router
