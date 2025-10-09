FROM node:18-alpine
WORKDIR /app

# Copy entire backend
COPY . .

# Install dependencies
WORKDIR /app/issuance-service
RUN npm install

# Use development mode
EXPOSE 3001

CMD ["npm", "run", "dev"]