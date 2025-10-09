FROM node:18-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the project
RUN npm run build

# Use preview instead of dev for production
EXPOSE 3000

CMD ["npm", "run", "preview"]