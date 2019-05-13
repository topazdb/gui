FROM node:11-stretch as development
WORKDIR /app 
VOLUME "/app"
EXPOSE 80

FROM node as production
WORKDIR /app
COPY . .
RUN npm run clean
RUN npm install
RUN NODE_ENV=production npm run build
CMD [ "npm", "start" ]
EXPOSE 80
