FROM node:18-alpine3.15
WORKDIR /src/backend
COPY ./package*.json ./
RUN npm i
RUN npm i -g nodemon
COPY . ./
ENTRYPOINT [ "nodemon", "--inspect=0.0.0.0", "bin/www" ]