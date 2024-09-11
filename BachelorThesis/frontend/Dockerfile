# Base image for Node.js
FROM node:21-alpine3.18

# Set working directory in container
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files into the container
COPY . .

# Expose port 5173 to allow access
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
