FROM node:18.13.0

RUN apt-get update && apt-get install -y sqlite3 libsqlite3-dev

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
