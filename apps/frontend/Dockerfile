# apps/frontend/Dockerfile

# ----------- Builder stage -----------
FROM node:22.17-alpine AS builder

WORKDIR /app

# Copy root package + frontend package
COPY package*.json ./
COPY apps/frontend/package*.json ./apps/frontend/

# Cài dependencies
RUN npm install

# Copy toàn bộ source
COPY . .

# Build Next.js app (Nx target)
RUN npm run build frontend

# ----------- Runtime stage -----------
FROM node:22.17-alpine

WORKDIR /app

# Copy node_modules để runtime
COPY --from=builder /app/node_modules ./node_modules

# Copy build output của Next.js
COPY --from=builder /app/dist/apps/frontend ./dist

EXPOSE 3000

# Next.js start
CMD ["node", "dist/apps/frontend/server.js"]