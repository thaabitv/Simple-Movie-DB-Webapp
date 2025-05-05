# Dockerfile for the server
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy the package files to install dependencies
COPY package*.json ./
RUN npm install

# Install nodemon as a development dependency
RUN npm install --save-dev nodemon

# Copy the rest of the application code
COPY . .

# Expose the port on which the server will run
EXPOSE 5000

# Run the server using nodemon to enable hot reloading
CMD ["npx", "nodemon", "server.js"]
