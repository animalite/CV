FROM node:20-alpine AS builder

# Enable BuildKit for better caching
ENV DOCKER_BUILDKIT=1
ENV BUILDKIT_INLINE_CACHE=1

# Install necessary tools
RUN apk add --no-cache \
    wget \
    bash

# Set working directory
WORKDIR /app

# Install pnpm
RUN corepack enable pnpm && \
    corepack prepare pnpm@latest --activate

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies with BuildKit cache mount
RUN --mount=type=cache,target=/root/.pnpm-store,sharing=locked,id=pnpm-store \
    --mount=type=cache,target=/root/.npm/_cacache,id=npm-cache,sharing=shared \
    pnpm install --no-frozen-lockfile

# Copy entire project
COPY . .


# Build the application
RUN pnpm build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Ensure fonts directory exists in nginx html
RUN mkdir -p /usr/share/nginx/html/fonts

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# Build optimizations for ARM:
# - BuildKit inline cache for faster rebuilds
# - Cache mounts for node_modules and pnpm store
# - Frozen lockfile to prevent re-downloads
# - Optimized layer ordering for better cache reuse
