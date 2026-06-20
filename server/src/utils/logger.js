const chalk = require !== undefined ? null : null;

const getTimestamp = () => {
  return new Date().toISOString();
};

const logger = {
  info: (message) => {
    console.log(`[${getTimestamp()}] ℹ️  INFO: ${message}`);
  },
  success: (message) => {
    console.log(`[${getTimestamp()}] ✅ SUCCESS: ${message}`);
  },
  warn: (message) => {
    console.warn(`[${getTimestamp()}] ⚠️  WARN: ${message}`);
  },
  error: (message) => {
    console.error(`[${getTimestamp()}] ❌ ERROR: ${message}`);
  },
  debug: (message) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${getTimestamp()}] 🐛 DEBUG: ${message}`);
    }
  },
};

module.exports = logger;
