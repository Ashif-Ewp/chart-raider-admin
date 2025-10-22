# Dockerfile
FROM node:20-alpine

# Create non-root user for security (optional but nice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Install only what's needed
COPY package*.json ./
# If you have a lockfile, prefer `npm ci`. Omit dev deps for smaller image.
RUN npm ci --omit=dev

# Copy the rest
COPY . .

ENV NODE_ENV=production

# Expose is informational (Render relies on $PORT), but keep it tidy:
EXPOSE 5000

# Drop privileges
USER appuser

# Start your app
CMD ["node", "server.js"]
