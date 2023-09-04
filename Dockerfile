FROM node:18.8.0-alpine3.16 as builder
WORKDIR /app
COPY . .
RUN  npm install
RUN  npm run build

# FROM node:18.8.0-alpine3.16
# WORKDIR /app
# COPY package*.json ./
# RUN npm install --production
# COPY --from=builder /app/dist/ dist/
# COPY --from=builder /app/src/asset dist/asset
