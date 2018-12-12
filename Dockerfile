FROM node as development
WORKDIR /var/topazdb-gui/
COPY . .
RUN npm i && npm i -g http-server
CMD eval "http-server src -p 80 &"  && npm run watch
EXPOSE 80

FROM nginx as production
WORKDIR /usr/share/nginx/html
COPY --from=development /var/topazdb-gui/src .
EXPOSE 80