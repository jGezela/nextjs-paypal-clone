FROM node:22.16
WORKDIR /app

COPY ./.next ./.next
COPY ./node_modules ./node_modules
COPY ./public ./public
COPY ./package.json ./package.json

ENV PORT 3000
EXPOSE 3000

CMD ["npm", "start"]