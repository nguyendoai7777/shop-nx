FROM node:22.17.0-alpine

WORKDIR /app

# Copy package files
COPY package.json .

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build app (giả sử NX output vào dist/apps/backend)
RUN npm run build backend

# ----------- runtime stage -----------
FROM node:22.17-alpine

WORKDIR /app

# Copy built app
COPY --from=builder /app/dist/apps/backend ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/package*.json ./

EXPOSE 3000
CMD ["node", "dist/main.js"]