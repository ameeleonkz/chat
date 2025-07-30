FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Собираем Next.js (если используется)
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "dev"]