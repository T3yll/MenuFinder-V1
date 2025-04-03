# Projet Full-Stack avec TypeScript, Vite, NestJS et PostgreSQL

Ce projet est une application full-stack utilisant **Vite** pour le frontend, **NestJS** pour le backend et **PostgreSQL** comme base de données. Les deux parties de l'application sont contenues dans un environnement Docker pour faciliter le développement et le déploiement.

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Utilisation](#utilisation)
- [API](#api)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Docker](https://www.docker.com/get-started) (et Docker Compose)
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)

## Installation

1. Clonez le dépôt :

   ```bash
   git clone http://to-be-continued.ovh/la-team/tuile.git
   cd votre-repo
   ```

2. Accédez au dossier du projet et installez les dépendances :

   ```bash
   # Dans le dossier frontend
   cd frontend
   npm install

   # Dans le dossier backend
   cd ../backend
   npm install
   ```

3. Créez un fichier `.env` pour à la racine du projet en reprenant le contenu de .env.example

4. Générez votre `JWT_SECRET`

   ```bash
   openssl rand -base64 32
   ```

5. Insérez le `JWT_SECRET` dans le fichier .env
   ```bash
   JWT_SECRET=secret_genere
   ```

## Configuration

### Variables d'environnement

Les variables d'environnement sont définies dans le fichier `.env`. Vous pouvez les modifier selon vos besoins. Assurez-vous que la connexion à la base de données est correcte.

### Docker

Le projet utilise `docker compose` pour orchestrer les conteneurs. Les services suivants sont définis :

- **frontend**: l'application Vite
- **backend**: l'application NestJS
- **postgres**: la base de données PostgreSQL

## Démarrage

Pour démarrer l'application, exécutez la commande suivante à la racine du projet :

```bash
docker compose up --build
```

## Module Backend

Pour générer un module (CRUD) complet, il faut utiliser une commande disponible dans le **package.json** (back) :

```
npm run resource nomDuModule
```

Si vous souhaitez re-générer le fichier **nomDuModule.api.http**, qui est normalement généré avec la commande précédente, utilisez :

```
npm run http nomDuModule
```
