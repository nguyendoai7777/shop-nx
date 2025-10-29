import { defineConfig } from '@prisma/config';
import { configDotenv } from 'dotenv';
import { join, resolve } from 'node:path';

configDotenv({
  path: resolve(__dirname, './.env'),
});

export default defineConfig({
  // Cấu hình khác sẽ được định nghĩa tại đây
  schema: join('apps/backend/src/prisma', 'schema.prisma'),
});
