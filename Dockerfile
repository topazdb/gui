FROM node:11-stretch as development
WORKDIR /app 
VOLUME "/app"
EXPOSE 80

FROM development as production
WORKDIR /app
COPY . .
RUN npm run clean
RUN npm i && npm run build
EXPOSE 80
