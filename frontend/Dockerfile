# Use an official Node.js runtime as the base image
FROM node:19-alpine

# Set the working directory in the container
WORKDIR /app

COPY volume .

# # Install dependencies
RUN npm install

# Expose port 80 to the host
EXPOSE 80

# Run the command to start the application
CMD ["npm", "run", "dev", "--", "--open"]
