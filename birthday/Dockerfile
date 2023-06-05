# Use the official Node.js image as the base
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire app directory
COPY . .

# Build the app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Set the runtime command
CMD ["npm", "start"]
