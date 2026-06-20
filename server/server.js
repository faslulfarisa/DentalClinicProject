const app = require('./src/app');
const connectDB = require('./src/config/db');
const { port } = require('./src/config/env');
const logger = require('./src/utils/logger');

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    logger.success(`Server running on port ${port}`);
    logger.info(`Health check: http://localhost:${port}/api/health`);
  });
};

startServer().catch((err) => {
  logger.error(`Failed to start server: ${err.message}`);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});
