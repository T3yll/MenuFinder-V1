FROM node:18

WORKDIR /var/www/tuile/backend

COPY backend/package*.json ./

# RUN npm install --omit=dev

COPY backend ./

EXPOSE 4000