# Build stage
FROM node:20-alpine3.18 AS builder

# Create app directory
WORKDIR /app

# Copy package files and prisma schema
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:20-alpine3.18

WORKDIR /app

# Copy build artifacts and dependencies from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build

# Expose the port and run the app
EXPOSE 4000
CMD ["npm", "run", "start"]
