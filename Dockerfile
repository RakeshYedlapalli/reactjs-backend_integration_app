# # Step 1: Use Node.js for building the React app
# FROM node:16 AS build

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json to install dependencies
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application
# COPY . .

# # Build the React app for production
# RUN npm run build

# # Step 2: Use Nginx to serve the production build
# FROM nginx:alpine

# # Copy the production build from the build stage
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose port 80 to the host
# EXPOSE 80

# # Default command to start Nginx
# CMD ["nginx", "-g", "daemon off;"]


# Step 1: Use Node.js for building the React app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Use Nginx to serve the production build
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy the production build from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the host
EXPOSE 80

# Default command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
