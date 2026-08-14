const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema(
  {
    // Contact
    name:        { type: String, required: true, trim: true },
    email:       { type: String, required: true, lowercase: true, trim: true },
    phone:       { type: String, trim: true },
    company:     { type: String, trim: true },

    // Shipment
    serviceType: { type: String, required: true },
    origin:      { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    incoterm:    { type: String },
    cargoType:   { type: String },
    weight:      { type: String },
    volume:      { type: String },
    pieces:      { type: String },
    readyDate:   { type: String },
    additionalInfo: { type: String, trim: true },

    // Admin
    status: {
      type: String,
      enum: ['new', 'reviewed', 'quoted', 'won', 'lost'],
      default: 'new',
    },
    notes:      { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

quoteSchema.index({ email: 1 })
quoteSchema.index({ status: 1 })
quoteSchema.index({ createdAt: -1 })

module.exports = mongoose.model('QuoteRequest', quoteSchema)
