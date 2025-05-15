# Documentation Front-End - MenuFinder

## Architecture du Projet

Le front-end de MenuFinder est construit avec les technologies suivantes:

- **React** - Bibliothèque JavaScript pour construire l'interface utilisateur
- **TypeScript** - Superset typé de JavaScript pour améliorer la qualité du code
- **Tailwind CSS** - Framework CSS utilitaire pour le styling
- **React Router** - Gestion de la navigation entre les pages

## Structure des Dossiers

```
front-end/
├── public/            # Fichiers statiques et index.html
├── src/               # Code source du projet
│   ├── assets/        # Images, logos et autres ressources
│   ├── components/    # Composants réutilisables
│   ├── hooks/         # Hooks React personnalisés
│   ├── pages/         # Pages de l'application
│   ├── services/      # Services pour les appels API
│   ├── types/         # Définitions de types TypeScript
│   └── App.tsx        # Composant principal de l'application
├── package.json       # Dépendances et scripts npm
└── tailwind.config.js # Configuration de Tailwind CSS
```

## Composants Principaux

### Navigation.tsx
Barre de navigation principale de l'application permettant aux utilisateurs de naviguer entre les différentes sections.

### RestaurantCard.tsx
Composant de carte pour afficher les informations d'un restaurant dans une liste ou grille.

## Pages

### Home.tsx
Page d'accueil de l'application, présentant les fonctionnalités principales et permettant d'accéder rapidement aux restaurants et menus.

### Login.tsx
Page de connexion pour les utilisateurs existants.

### Register.tsx
Page d'inscription pour les nouveaux utilisateurs.

### Restaurants.tsx
Page listant les restaurants disponibles avec options de filtrage et recherche.

### Menus.tsx
Page affichant les menus d'un restaurant sélectionné.

## Style et Design

L'application utilise Tailwind CSS pour le styling, offrant une approche utilitaire avec des classes prédéfinies. Ce choix permet une personnalisation facile et un développement rapide sans nécessiter Bootstrap.

Le design suit les principes suivants:
- Interface épurée et intuitive
- Cohérence visuelle à travers l'application
- Expérience responsive pour tous les appareils

## Bonnes Pratiques de Développement

### Principes de Clean Code

1. **Lisibilité** - Code facile à lire et à comprendre
2. **Modularité** - Composants et fonctions avec responsabilité unique
3. **Maintenabilité** - Structure cohérente et documentation claire
4. **Testabilité** - Code conçu pour être facilement testable

### Conventions de Nommage

- **PascalCase** pour les composants React
- **camelCase** pour les variables et fonctions
- **Noms descriptifs** expliquant clairement la responsabilité

## Guide de Contribution

### Configuration de l'Environnement de Développement

1. Cloner le dépôt:
   ```
   git clone <URL_DU_DEPOT>
   cd MenuFinder/front-end
   ```

2. Installer les dépendances:
   ```
   npm install
   ```

3. Démarrer le serveur de développement:
   ```
   npm start
   ```

### Workflow de Développement

1. Créer une nouvelle branche pour chaque fonctionnalité ou correction
2. Suivre les principes de clean code mentionnés ci-dessus
3. Tester localement avant de soumettre les modifications
4. Soumettre une pull request avec une description claire des changements

## Déploiement

Pour créer une version de production:

```
npm run build
```

Cette commande générera les fichiers optimisés dans le dossier `build/`, prêts à être déployés sur un serveur web.

---

Cette documentation est destinée à évoluer avec le projet. N'hésitez pas à la compléter ou à la modifier selon les besoins du projet.
