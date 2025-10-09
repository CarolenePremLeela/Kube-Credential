FROM node:18-alpine
WORKDIR /app

# Copy entire backend
COPY . .

# Install dependencies
WORKDIR /app/verification-service
RUN npm install

# Use development mode
EXPOSE 3002

CMD ["npm", "run", "dev"]