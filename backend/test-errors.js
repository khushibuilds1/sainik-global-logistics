console.log('Testing backend for errors...');

try {
  // Test dotenv
  require('dotenv').config();
  console.log('✓ dotenv loaded');

  // Test mongoose
  const mongoose = require('mongoose');
  console.log('✓ mongoose loaded');

  // Test models
  const User = require('./src/models/User');
  const Contact = require('./src/models/ContactInquiry');
  const Quote = require('./src/models/QuoteRequest');
  console.log('✓ Models loaded');

  // Test controllers
  require('./src/controllers/authController');
  require('./src/controllers/contactController');
  require('./src/controllers/quoteController');
  require('./src/controllers/dashboardController');
  console.log('✓ Controllers loaded');

  // Test middleware
  require('./src/middleware/auth');
  require('./src/middleware/errorHandler');
  console.log('✓ Middleware loaded');

  // Test routes
  require('./src/routes/auth');
  require('./src/routes/contact');
  require('./src/routes/quotes');
  require('./src/routes/dashboard');
  console.log('✓ Routes loaded');

  // Test config
  require('./src/config/db');
  require('./src/config/mailer');
  console.log('✓ Config loaded');

  console.log('\n✅ No syntax errors found in backend code!');
} catch (err) {
  console.error('\n❌ Error found:');
  console.error(err);
  console.error('\nStack trace:');
  console.error(err.stack);
}
