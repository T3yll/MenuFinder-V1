FROM node:20

WORKDIR /app

COPY ./package*.json ./

# Installer les dépendances
RUN npm install

COPY . .

EXPOSE 3000

# Pas de CMD ici, car il sera fourni par docker-compose