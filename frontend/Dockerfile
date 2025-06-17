# Use official Node.js image
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Expose port for dev server (usually 3000)
EXPOSE 3000

# Run dev mode
CMD ["npm", "run", "dev"]
