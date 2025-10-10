FROM node:18-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code including .env files
COPY . .

# Expose the port (will use 3003 from .env)
EXPOSE 3003

# Use dev server with environment configuration
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]