# Use the official Node.js image as the base
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire app directory
COPY . .

# Expose port 3000
EXPOSE 3000

# start the app
CMD ["npm", "run", "dev"]