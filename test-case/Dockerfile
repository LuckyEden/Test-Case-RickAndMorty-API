# Üretim aşaması
FROM node:18 AS build

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılıkları yükle
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Uygulama kodunu kopyala
COPY . .


# Set node environment to production
ENV NODE_ENV="production"
 

# Uygulamayı üretim için derle
RUN pnpm build

# Nginx aşaması
FROM nginx:alpine

# Nginx yapılandırma dosyasını kopyala
COPY ./server/nginx.conf /etc/nginx/nginx.conf

# Yapılandırılmış dosyaları kopyala
COPY --from=build /app/dist /usr/share/nginx/html 

COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"]
