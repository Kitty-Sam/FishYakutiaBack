# Use Node.js 20.11.1 base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./front/package*.json ./

# Install dependencies
RUN npm cache clean --force
RUN npm install 

RUN npm i -g serve

# Copy the rest of the application code
COPY ./front .

RUN npm run build
# Generate Prisma Client code
#RUN npx prisma generate

EXPOSE 3000

# Command to run the app
CMD [ "serve", "-s", "dist" ]