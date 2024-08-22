# Use Node.js 20.11.1 base image
FROM node:latest

WORKDIR /app

COPY ./front/package*.json ./

# Install dependencies
RUN npm cache clean --force
RUN npm install 

RUN npm i -g serve
# Copy the rest of the application code
COPY ./front .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]