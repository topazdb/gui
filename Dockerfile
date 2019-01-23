FROM node:11-stretch as development
WORKDIR /var/topazdb-gui/
COPY . .
ENV NODE_ENV="development"
ENV PATH="/node_modules/.bin:${PATH}"
RUN npm i && mv node_modules /node_modules
EXPOSE 80