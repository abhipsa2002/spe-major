FROM node:alpine

WORKDIR /frontend

COPY . /frontend

RUN npm install --legacy-peer-deps
RUN npm install axios

CMD ["npm","start"]
