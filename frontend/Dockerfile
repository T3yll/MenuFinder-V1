FROM node:20

WORKDIR /app

COPY ./package*.json ./

# Installer les dépendances et corriger les vulnérabilités
RUN npm install && \
    npm audit fix --force && \
    npm cache clean --force

COPY . .

EXPOSE 3000

# Pas de CMD ici, car il sera fourni par docker-compose