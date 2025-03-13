FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY . .
RUN yarn build
FROM node:20-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json yarn.lock ./
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
EXPOSE 3000
ENTRYPOINT ["sh", "-c", "yarn typeorm:run && yarn seed && yarn start"]