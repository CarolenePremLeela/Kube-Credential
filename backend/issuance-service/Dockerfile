# Step 1: Use Node base image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy only package files first for caching
COPY issuance-service/package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy source and shared folders into container
COPY issuance-service/src ./src
COPY shared ./shared
COPY issuance-service/tsconfig.json ./

# Step 6: Build the project
RUN npm run build

# Step 7: Expose service port
EXPOSE 3001

# Step 8: Run server
CMD ["npm", "start"]
