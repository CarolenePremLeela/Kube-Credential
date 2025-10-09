FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY issuance/package*.json ./ 
RUN npm install

# Copy shared + src + tsconfig
COPY shared ./shared
COPY issuance/src ./src
COPY issuance/tsconfig.json ./tsconfig.json

RUN npm run build

EXPOSE 3001
CMD ["npm", "start"]
