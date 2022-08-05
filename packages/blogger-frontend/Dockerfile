FROM node:18-alpine3.15
WORKDIR /app/frontend
COPY ./package*.json ./
RUN npm i
COPY . ./
CMD npm start
