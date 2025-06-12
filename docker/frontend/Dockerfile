# frontend/Dockerfile

# 開発ステージ
FROM node:18-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 本番ステージ
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=development /app/package*.json ./
RUN npm install --omit=dev

COPY --from=development /app/.next ./.next
COPY --from=development /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]