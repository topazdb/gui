FROM node as development
WORKDIR /var/topazdb-gui/
COPY . .
RUN npm i
CMD eval "npm start"
EXPOSE 8080