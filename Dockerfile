# Use official Node.js LTS image as base
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project files
COPY . .

# Expose port (usually 3000 or 8080 for Node.js apps)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
