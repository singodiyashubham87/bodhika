# Use official Node.js LTS image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies only when needed
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy all files
COPY . .

# Build the Next.js app
RUN yarn build

# Expose the port that Next.js listens on
EXPOSE 3000

# Set environment variables (optional, can also use `.env` or Docker Compose)
ENV NODE_ENV=production

# Run the application
CMD ["yarn", "start"]
