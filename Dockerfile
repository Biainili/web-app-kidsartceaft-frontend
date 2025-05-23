# Этап сборки
FROM node:16 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm install --legacy-peer-deps

# Этап запуска
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]