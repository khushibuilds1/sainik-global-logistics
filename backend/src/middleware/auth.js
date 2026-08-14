const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorised. No token.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Allow test admin without database
    if (decoded.id === 'test-admin-id') {
      req.user = {
        _id: 'test-admin-id',
        name: 'Sainik Admin',
        email: 'admin@sainikglobal.com',
        role: 'superadmin',
        active: true,
      }
      return next()
    }

    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user || !req.user.active) {
      return res.status(401).json({ success: false, message: 'User not found or inactive.' })
    }

    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Token invalid or expired.' })
  }
}

const adminOnly = (req, res, next) => {
  if (req.user?.role === 'admin' || req.user?.role === 'superadmin') return next()
  res.status(403).json({ success: false, message: 'Admin access only.' })
}

module.exports = { protect, adminOnly }
