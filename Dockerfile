FROM node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 300
CMD ["npm", "start"]