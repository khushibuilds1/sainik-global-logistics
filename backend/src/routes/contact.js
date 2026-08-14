const express = require('express')
const { createContact, getContacts, updateContact, deleteContact } = require('../controllers/contactController')
const { protect, adminOnly } = require('../middleware/auth')

const router = express.Router()

router.post('/',      createContact)                      // public
router.get('/',       protect, adminOnly, getContacts)
router.patch('/:id',  protect, adminOnly, updateContact)
router.delete('/:id', protect, adminOnly, deleteContact)

module.exports = router
