# Use a lightweight Node.js image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --verbose

# Copy the rest of the application code
COPY . .

# Build the application (if applicable, e.g., for React, Vue, etc.)
RUN npm run build

# Use a lightweight web server for production
FROM nginx:alpine AS production

# Copy built files to the Nginx web server
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
