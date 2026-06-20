const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/dental-clinic',
  jwtSecret: process.env.JWT_SECRET || 'fallback_secret_key',
  jwtExpire: process.env.JWT_EXPIRE || '24h',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
};
