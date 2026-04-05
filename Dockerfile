FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm ci --production

# Build frontend
WORKDIR /app/frontend
RUN npm ci && npm run build

# Set up backend
WORKDIR /app/backend
EXPOSE 3000
CMD ["npm", "start"]
