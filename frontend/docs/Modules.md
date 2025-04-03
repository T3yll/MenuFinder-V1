# Génération automatique des modules avec Plop

## Introduction

Afin d'accélérer le développement et d'assurer une structure homogène dans notre projet, nous utilisons Plop pour générer automatiquement les fichiers d'un nouveau module. Grâce à des templates prédéfinis, nous pouvons créer en quelques secondes l'ensemble des fichiers nécessaires à un module, y compris ses modèles, services et composants.
## Installation

Si ce n'est pas déjà fait, installez Plop en tant que dépendance de développement

Avec Docker : 
```
docker compose exec frontend npm i
```

Sans Docker :
```
npm install --save-dev plop
```


## Utilisation

Pour générer un nouveau module, exécutez la commande suivante

Avec Docker : 
```
docker compose exec frontend npm run plop
```

Sans Docker : 
```
npm run plop
```

Plop vous demandera alors de renseigner le nom du module. Une fois cette étape complétée, tous les fichiers correspondants seront créés automatiquement dans les bons dossiers.

## Structure des fichiers générés

Le script Plop va générer plusieurs fichiers en fonction des templates définis. 
Voici un exemple de structure après la création d'un module **Exemple** :
```
src/modules/Exemple/
 ├── services/
 │   └── ExempleService.ts
 ├── models/
 │   └── IExemple.ts
 ├── components/
 │   └── ExempleIndexDatatable.tsx
```

Ces fichiers contiennent une implémentation de base qui peut être modifiée selon les besoins du projet.

## Mise à jour des templates

Les templates utilisés par **Plop** sont stockés dans le dossier **plop-templates**. 
Si des ajustements sont nécessaires au fil du développement, il suffit de modifier ces fichiers pour que les prochaines générations de modules en tiennent compte.

## Avantages

- Gain de temps significatif dans la création de nouveaux modules
- Uniformisation du code et des conventions
- Évolutivité : possibilité de modifier les templates au fur et à mesure

--- 

En cas de problème ou d'erreur lors de la génération, vérifiez bien la syntaxe des templates et consultez la documentation officielle de **Plop.js**.