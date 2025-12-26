FROM node:22-alpine
WORKDIR /app
RUN npm install -g http-server
COPY . /app
EXPOSE 80
CMD ["http-server", ".", "-p", "80"]
