Mise en production - Tuile

Ici, la documentation pour la mise en production de la Tuile applicative. Une application mono-repository en backend API Nest.js + frontend React (Vite).

---

**📌 1. Préparation de la VM Debian**

Connecte-toi à ta VM et installe les dépendances :

```
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx nodejs npm pm2
```

Dans le cas d’un pull du projet via git :

```jsx
sudo apt install -y git
```

Vérifie que node et npm est installé :

```
node -v
npm -v
```

⚠️ Node doit être en version 18

---

**📦 2. Récupérer et installer le projet**

Se positionner dans le dossier web

```jsx
cd /var/www/
```

Clone ton projet dans le dossier web : SSH ou pull GitLab (sûrement impossible en intra)

Installer les dépendances du monorepo (À la racine)

```jsx
npm install
```

---

📄**3. Gestion des variables d’environnement**

Dans un monorepo Turborepo, les commandes sont exécutées depuis la racine, ce qui signifie que les variables définies dans .env à la racine sont accessibles par défaut.

Il faut les récupérer depuis le .env.example et les adapter

```jsx
### Environnement de développement
NODE_ENV=development

### FRONT END 

# Configuration des ports des serveurs
FRONTEND_PORT=3000

# Configuration Vite
VITE_API_URL=http://localhost:4000/api

### BACK END

# Configuration de la base de données
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

# Configuration des ports des serveurs
BACKEND_PORT=4000

# Configuration de l'API
JWT_SECRET=your_secret_key
JWT_EXPIRATION=3600s
```

Générer la clé secrète JWT_SECRET

```jsx
openssl rand -base64 32
```

Certaines variable d’environnement propres au frontend sont dans le dossier frontend du projet.

Il faut les récupérer depuis le .env.example du frontend et les adapter.

```jsx
VITE_API_URL=http://localhost:3000/api //URL du backend

// Ces informations correspondent à un user qui 
//doit être créé en base tant que le SSO n'est pas lié à l'application
VITE_USER_USERNAME=username
VITE_USER_PASSWORD=password
```

---

**🏗️ 4. Build du projet backend (Nest.js)**

Builder l’API depuis la racine

```
turbo run build --filter=backend
```

Les fichiers compilés sont dans apps/backend/dist/

Démarrer le Nest.js avec PM2 depuis la racine

```jsx
pm2 start apps/backend/dist/main.js --name nest-api
pm2 save
pm2 startup
```

Vérifie que l’API tourne :

```jsx
pm2 status
```

---

**🚀 5. Build du projet frontend (React)**

Builder le front depuis la racine

```bash
turbo run build --filter=frontend
```

Les fichiers compilés sont dans apps/frontend/dist/

Copier les fichiers du build dans le dossier web de Nginx

```bash
sudo rm -rf /var/www/html/*
sudo cp -r apps/frontend/dist/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html
```

Configurer Nginx en modifiant le fichier de configuration

```jsx
sudo nano /etc/nginx/sites-available/default
```

Exemple :

```jsx
server {
    listen 80;
    server_name monsite.com;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
    
    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Recharger Nginx :

```jsx
sudo systemctl restart nginx
```

---

**🚀 6. Automatisation du redémarrage de l’API en Cas de reboot**

Pour que Nest.js redémarre après un reboot :

```jsx
pm2 save
pm2 startup
```

Vérifie que tout tourne bien après un reboot :

```jsx
pm2 status
```