import { defineConfig } from '@prisma/config';
import { configDotenv } from 'dotenv';
import path = require('node:path');

configDotenv({
  path: path.resolve(__dirname, './.env'),
});

export default defineConfig({
  // Cấu hình khác sẽ được định nghĩa tại đây
  schema: path.join('apps/backend/src/prisma', 'schema.prisma'),
});
