# Use the Node.js slim image as the base image
FROM node:slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose a port for the application to listen on (change this if needed)
EXPOSE 8000

# Define the command to run your application
CMD [ "npm", "start" ]
