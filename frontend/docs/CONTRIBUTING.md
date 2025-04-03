# Contribuer à Tuile Front

Lorsque vous contribuez à l'application Tuile Front, ...

# Table des matières

1. [Règles de code](#règles-de-code)
2. [Architecture du projet](#architecture-du-projet)
3. [Conventions de nommage](#conventions-de-nommage)

## 📚 Règles de code

### 🔗 Navigation et Boutons

Même s'ils ont la même apparence visuelle :
- Chaque bouton destiné à la navigation devra utiliser la balise react-router ```<Link></Link>```
- Tout autre bouton devra utiliser la balise définie dans le common component ```<Button></Button>```

Dans les formulaires, le _bouton Retour_ est toujours le plus **à gauche** et le _bouton Enregistrer_ est toujours **à droite du bouton retour**.

### Thèmes

Il est nécessaire de ne pas utiliser de couleurs arbitraires mais bien des couleurs par le biais de variables : `primary`, `secondary`, `accent`...


### 🌐 Locales & traduction

La locale primereact vient d'un [Repository prime react](https://github.com/primefaces/primelocale). Pour mettre à jour la locale française ou en ajouter une autre, rendez vous sur le repository et copiez les traductions de la langue dans le fichier de locale correspondant dans ```src/common/config/locales```. Puis, changez la date d'update de la locale dans ```src/App.tsx```.

## 🏗️ Architecture du projet

L'architecture du projet react est orienté module: on peut retrouver un dossier module dans lequel sont définis tous les modules de l'application.

Un module possède son dossier propre dès qu'il contient des opérations **CRUD**. Cette distinction permet le fait de définir un sous-module. 

Chaque module **présent dans le dossier du même nom** possède les types de dossiers suivants :

- 🧩 components : Ce dossier contient les components qui ne seront utilisés que dans le module en question (il convient de déplacer dans le dossier global tout component dont la portée serait jugée utile au global)

- 🖥️ containers : Ce dossier contient les "pages" du module en question, les conventions de nommage de celles-ci sont définies plus bas. Voici les types de page que l'ont peut s'attendre à trouver dans un module :
    - Une page pour chaque opération **CRUD** (Add, Index, Show, Edit...)
    - Les pages spécifiques au module.
    - Un fichier **Router** qui définit toutes les _"sous-routes"_  du module
    - Un fichier **Menu** qui sert de menu contextuel au nodule, il doit être accessible depuis toutes les pages.

- ⚙️ services : L'appélation service dans le front correspond aux appels à l'API

- 🏷️ models : Ce dossier contient toutes les définitions d'interfaces et de type utiles à l'interieur du module (il convient de déplacer dans le dossier global tout type dont la portée serait jugée plus grande que celle du module)

- 🪝 hooks : Ce dossier contient les hooks du module (il convient de déplacer dans le dossier global tout hook dont la portée serait jugée plus grande que celle du module)

- etc...

Les fichiers qui ne sont spécifique à aucun module ou qui sont utilisé par plusieurs modules à la fois doivent être placés dans le dossier **common**, ce dossier contient la même architecture que les modules classique à quelques exceptions près :

- 🧩 components : Les **composants** du dossier **common** sont divisés en 3 catégories :
    - **base**: Pour les composants simples tels que les boutons, les cards, les menus...
    - **advanced**: Pour les composants plus complexes, ultra paramétriques et/ou au coeur de chaque module: Paginator, Datatable...
    - **layout**: Pour les composants utilisés dans l'affichage global de l'application Header, Sidebar...

- 🧬 Constants : Toutes les constantes nécessaires au global sont dans 

## 🔤 Conventions de nommage

### 🧩 Containers & components

Chaque container doit être nommé de la façon suivante :

<blockquote>

**Module|CRUDAction** 

_Exemple: **InfoAdd** ou **InfoIndex**_ 

</blockquote>

Chaque component doit être nommé de la façon suivante :

<blockquote>

**Module|(CRUDAction)|Specif** 

_Exemple: **InfoIndexDatatable** ou **InfoForm**_ 

</blockquote>

### 🏷️ Models

Les interfaces (dans leur nom et dans le nom de leur fichier) doivent toutes commencer par un "I". _Exemple_ :

<blockquote>

```file: /src/modules/Info/models/IInfo```

export interface IInfo {
    
}

</blockquote>

### 📄 Formulaires

Le bouton qui sert à envoyer le formulaire s'appelle **Enregistrer**, le bouton qui sert à quitter le formulaire s'appelle **Retour**
