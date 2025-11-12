FROM oven/bun:1.3.1 AS base

WORKDIR /usr/src/app

FROM base AS builder

ARG MODE
ARG VITE_BASE_URL
ARG VITE_BACKEND_URL

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN MODE=$MODE VITE_BASE_URL=$VITE_BASE_URL VITE_BACKEND_URL=$VITE_BACKEND_URL bun run build

FROM nginx:1.25-alpine AS release

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
