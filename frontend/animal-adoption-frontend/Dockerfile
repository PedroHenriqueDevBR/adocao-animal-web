FROM node:16.15.0

RUN mkdir /app 
WORKDIR /app

RUN apt-get update && apt-get upgrade -y && apt-get install -y nano

COPY package.json /app/

RUN npm i -g @angular/cli
RUN npm install

ADD . /app/
EXPOSE 4200
