# ── Build Stage ──────────────────────────────────────────
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files first (better layer caching)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --ignore-scripts

# Copy source code
COPY . .

# Build args for env variables (passed at build time)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# Build the app
RUN npm run build

# ── Serve Stage ─────────────────────────────────────────
FROM nginx:alpine AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
