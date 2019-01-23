FROM node:11-stretch as development
WORKDIR /var/topazdb-gui/
COPY . .
ENTRYPOINT eval "npm i && npm start"
EXPOSE 80