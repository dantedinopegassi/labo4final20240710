# crear la app
FROM node:18 AS build

WORKDIR /app

COPY package*.json .

RUN npm install --production

COPY src ./src

COPY public ./public

RUN npm run build



# hostear la app
FROM nginx:stable

COPY --from=build /app/build /usr/share/nginx/html






EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]