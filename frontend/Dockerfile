# Use a lightweight Node.js image for building
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Define build arguments (non-sensitive)
ARG NODE_ENV
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_APP_URL

# Export only non-sensitive arguments as environment variables
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

# Disable linting during the build
ENV NEXT_PUBLIC_SKIP_ESLINT=true

# Copy the application code
COPY ./frontend/ ./

# Install dependencies
RUN npm ci

# Build the application for production
RUN npm run build

# Use a lightweight Node.js image for running the application
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose the port used by the application
EXPOSE 3000

# Default command to start the application
CMD ["node", "dist/index.js"]
