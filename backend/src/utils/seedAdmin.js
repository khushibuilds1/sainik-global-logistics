/**
 * Run once to seed the initial admin user:
 *   node src/utils/seedAdmin.js
 */
require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/User')

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'sainik_global' })

  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@sainikglobal.com' })
  if (existing) {
    console.log('✅ Admin user already exists:', existing.email)
    process.exit(0)
  }

  await User.create({
    name:     'Sainik Admin',
    email:    process.env.ADMIN_EMAIL    || 'admin@sainikglobal.com',
    password: process.env.ADMIN_PASSWORD || 'Sainik@2024!',
    role:     'superadmin',
  })

  console.log('✅ Admin user seeded. Email:', process.env.ADMIN_EMAIL || 'admin@sainikglobal.com')
  console.log('   Password:', process.env.ADMIN_PASSWORD || 'Sainik@2024!')
  console.log('   ⚠️  Change the password after first login!')
  process.exit(0)
}

seed().catch((err) => { console.error(err); process.exit(1) })
