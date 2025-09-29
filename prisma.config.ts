import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import path = require('node:path');

dotenv.config({
  path: path.resolve(__dirname, './.env'),
});

export default defineConfig({
  // Cấu hình khác sẽ được định nghĩa tại đây
  schema: path.join('apps/backend/src/prisma', 'schema.prisma'),
});
