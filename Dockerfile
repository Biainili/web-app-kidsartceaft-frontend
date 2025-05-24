# Этап сборки
FROM node:16 as build
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

# Этап запуска
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]