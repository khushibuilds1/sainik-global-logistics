const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, lowercase: true, trim: true },
    phone:   { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    read:    { type: Boolean, default: false },
    replied: { type: Boolean, default: false },
  },
  { timestamps: true }
)

contactSchema.index({ email: 1 })
contactSchema.index({ read: 1 })
contactSchema.index({ createdAt: -1 })

module.exports = mongoose.model('ContactInquiry', contactSchema)
