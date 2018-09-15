FROM node

COPY . /fmail

WORKDIR /fmail

EXPOSE 443

RUN npm install --production

CMD ["node", "server.js"]
