FROM node:10
WORKDIR /app
RUN npm install -g yarn
CMD ls -ltr && yarn install && yarn start