# FRONTEND

...

# BACKEND

## Fichiers Http Api

### Configuration - VS Code

Il est possible d'utiliser les fichiers **nomDeModule.http.api** afin de tester les requêtes api directement depuis l'IDE. Ce système est natif à Php Storm et utilisable grâce à l'extension **REST Client** de VS Code.

Pour les utiliser, il faut un minimum de configuration dans votre environnement VS Code. Pour ce faire, vous devez créer un dossier **.vscode** à la racine du projet, et y ajouter un fichier **settings.json**.

```
mkdir .vscode
touch settings.json
```

Ensuite, vous devez utilisé le fichier **auth.http.api** pour vous connecter, et récupérer le token JWT, qui ne va pas expirer en environnement de développement.

Enfin, vous allez ajouter le token et vos informations de connexion dans le fichier **settings.json** afin qu'elles soient utilisées par les autres fichiers api, comme ceci :

```
{
    "rest-client.environmentVariables": {
    "$shared": {
        "TOKEN": "votre_token_jwt",
        "USERNAME": "votre_username",
        "PASSWORD": "votre_mot_de_passe"
    },
  }
}
```

### Génération de module + Http

Pour générer les fichiers d'un module complet (service, controller, entité, etc..) + le fichier http, il faut passer par la commande suivante :

```
npm run resource nomDuModule
```

Cette commande combine la génération des fichiers de la commande nest g resource nomDuModule et la génération du fichier nomDuModule.http.api effectuée grâce au script présent dans backend/cli.ts.

Si vous souhaitez uniquement re-générer le fichier d'un module, dans son état de base, vous pouvez utiliser la commande suivante :

```
npm run http nomDuModule
```

Cette commande est déconseillée si vous utilisez un CRUD complexe, et que les méthodes http ont déjà été écrites dans le fichier, car celles-ci se verraient écrasées.
