# Stage 1: Cài đặt dependencies
FROM node:18-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install
RUN npx browserslist@latest --update-db

# Stage 2: Build source code
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Stage 3: Chạy production server
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Chỉ cần thư mục build
COPY --from=builder /app/build ./build

# Cài đặt công cụ 'serve' để chạy file tĩnh
RUN npm install -g serve

EXPOSE 3000

# Chạy serve để phục vụ thư mục build ở port 3000
CMD ["serve", "-s", "build", "-l", "3000"]