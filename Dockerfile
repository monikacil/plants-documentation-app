# ---------- BUILDER ----------
FROM node:20-alpine AS builder
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

ARG DATABASE_URL
ARG NEXTAUTH_SECRET
ENV DATABASE_URL=$DATABASE_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- RUNNER ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PATH /app/node_modules/.bin:$PATH

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

USER node

EXPOSE 3000
CMD ["node", "server.js"]
