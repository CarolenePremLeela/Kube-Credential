FROM node:18-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code
COPY src/ ./src/

# Create shared directory structure
RUN mkdir -p shared/database/models shared/types

# Copy shared database files
COPY ../shared/database/connection.ts ./shared/database/
COPY ../shared/database/models/Credential.ts ./shared/database/models/

# Copy shared types
COPY ../shared/types/Credential.ts ./shared/types/

# Copy TypeScript config
COPY ../tsconfig.json ./

RUN npm run build

EXPOSE 3002

CMD ["npm", "start"]