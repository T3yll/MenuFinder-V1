FROM node:18

WORKDIR /app

# Copier le package.json et installer les dépendances
COPY frontend/package*.json ./
RUN npm install

# Copier le reste du code
COPY frontend/ ./

# Créer un lien symbolique pour react-refresh dans src/node_modules
RUN mkdir -p src/node_modules && \
    ln -sf /app/node_modules/react-refresh src/node_modules/

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]