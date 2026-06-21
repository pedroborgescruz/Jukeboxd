FROM node:20-alpine

WORKDIR /app

# Copy package files first to leverage Docker's caching layers
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install dependencies with legacy-peer-deps to bypass strict version conflicts
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  elif [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  else npm install --legacy-peer-deps; \
  fi

# Copy the rest of your Next.js project files
COPY . .

# Next.js dev server runs on port 3000 by default
EXPOSE 3000

# Run the Next.js development server with hot reloading
CMD ["npm", "run", "dev"]
