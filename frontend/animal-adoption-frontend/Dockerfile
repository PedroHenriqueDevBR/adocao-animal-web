FROM node:16.3.0

RUN mkdir /app 
WORKDIR /app

RUN apt-get update && apt-get upgrade -y && apt-get install -y nano

COPY package.json /app/
RUN npm install
ADD . /app/
EXPOSE 4200
