FROM node:18-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy entire backend and frontend directories
COPY backend ./backend
COPY frontend ./frontend

# Install and build frontend
WORKDIR /app/frontend
RUN npm ci && npm run build

# Install backend dependencies (production only)
WORKDIR /app/backend
RUN npm ci --production

# Expose port and start backend
EXPOSE 3000
CMD ["npm", "start"]
