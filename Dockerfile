FROM node:12.9.1

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app/

COPY package.json /usr/src/app/

RUN yarn install

COPY . /usr/src/app/

RUN yarn global add expo-cli
