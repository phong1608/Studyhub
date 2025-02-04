FROM node:20-alpine3.18

WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install

EXPOSE 4001

CMD [ "npm", "run", "dev" ]
