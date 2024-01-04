FROM node:18

WORKDIR /usr/src/virtual-classroom/api_gateway

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
