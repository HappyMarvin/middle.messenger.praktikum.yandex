FROM ubuntu:20.04
RUN apt update && apt install -y nodejs && apt install -y npm
WORKDIR /var/www
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD node server.js