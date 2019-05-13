FROM node:11-stretch as development
WORKDIR /app 
VOLUME "/app"
EXPOSE 80

FROM node as production
WORKDIR /app
COPY . .
RUN npm run clean
RUN npm i
EXPOSE 80
