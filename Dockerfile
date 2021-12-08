FROM node:alpine
LABEL name="Zadanie1"
LABEL author="Bartlomiej Szabat"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]