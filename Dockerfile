# Dockerfile.dev
FROM node:22.17-alpine

WORKDIR /app

# Copy toàn bộ package.json để cài dependency
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
COPY apps/frontend/package*.json ./apps/frontend/

RUN npm install

# Mặc định chạy shell, command sẽ override từ docker-compose
CMD ["sh"]