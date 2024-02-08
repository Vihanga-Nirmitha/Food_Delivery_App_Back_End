FROM node:latest
WORKDIR /home/vihan/Documents/GoFood/backend
copy package.json ./
RUN npm install
copy . .
EXPOSE 5000
CMD [ "node","index.js"]