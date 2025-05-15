FROM node:18

WORKDIR /var/www/tuile/frontend

# Copie uniquement les fichiers package.json d'abord pour profiter du cache Docker
COPY ./frontend/package*.json ./

RUN npm install

# Ensuite copie le reste des fichiers
COPY ./frontend/ ./

EXPOSE 3000