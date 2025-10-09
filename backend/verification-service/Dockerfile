FROM node:18-alpine
WORKDIR /app

# Copy entire backend
COPY . .

# Install and build from service directory
WORKDIR /app/verification-service

# Install dependencies first
RUN npm install

# Then build
RUN npm run build

EXPOSE 3002

CMD ["npm", "start"]