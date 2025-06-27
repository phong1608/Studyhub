# ----- Build stage -----
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps

# 👉 Tạo client Prisma sau khi cài dependency và có schema
RUN npx prisma generate

COPY . .

RUN npm run build

# ----- Production stage -----
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev --legacy-peer-deps

COPY --from=builder /app/build ./build
COPY --from=builder /app/prisma ./prisma

# 👉 Copy folder `.prisma` được generate bên trong node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 8080
CMD ["npm", "run", "start"]
