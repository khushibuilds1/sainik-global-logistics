console.log('=== TESTING MONGODB CONNECTION ===');
require('dotenv').config();
console.log('Loaded .env file');

const mongoose = require('mongoose');
console.log('Loaded mongoose');

console.log('MONGODB_URI from env:', process.env.MONGODB_URI);

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'sainik_global',
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ MongoDB connected successfully!');
    console.log('Host:', conn.connection.host);
    console.log('Database:', conn.connection.name);

    // Test a simple query
    console.log('\nTesting simple query...');
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('Collections in database:', collections.map(c => c.name));

    process.exit(0);
  } catch (err) {
    console.error('\n❌ MongoDB connection error:');
    console.error('Error message:', err.message);
    console.error('Error name:', err.name);
    console.error('Full error:', err);
    process.exit(1);
  }
}

testConnection();
