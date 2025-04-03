# Documentation : Utilisation du Logger Winston pour le backend de Tuile

## Introduction

Ce projet utilise [Winston](https://github.com/winstonjs/winston) comme logger pour assurer une gestion centralisée et flexible des logs. Winston est déjà installé et initialisé.

## Fichier de logs

Les logs sont stocké dans `logger/logs/{combine|error}.log` seulement dans un environnement de production. En environnement de développement, les logs sont affichées en console. Pour changer l'environnement, il suffit de changer la variable d'environnement (`ENV`) du `.env`.

En production seulement les logs de type `info`, `warn`ou `error` sont remontées. <u>En développement tous les niveaux de logs sont affichées en console</u>.

### combine.log

Ce fichier regroupe toutes les logs de type `info`, `warn`ou `error`.

### error.log

Ce fichier regroupe seulement les logs de type `error`.

Les logs d'erreur apparraisent donc dans `combine.log` ET `error.log`.

## Utilisation dans un Service ou un Contrôleur

Injectez le logger Winston dans n'importe quel service ou contrôleur et ajoutez un contexte pour mieux identifier l'origine des logs :

```typescript
import { Logger, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger
  ) {}

  readonly SERVICE_NAME = AppController.name;

  @Get()
  getHello(): string {
    this.logger.log('Info hello world', this.SERVICE_NAME); // Apparait comme info dans combine.log
    this.logger.warn('Warning hello world', this.SERVICE_NAME); // Apparait comme warn dans combine.log
    this.logger.error('Error hello world', this.SERVICE_NAME); // Apparait comme error dans combine.log et error.log
    return this.appService.getHello();
  }
}
```

L'ajout du deuxième paramètre (`this.SERVICE_NAME`) permet de spécifier un contexte pour chaque log, facilitant ainsi le suivi et le débogage.

## Bonnes Pratiques

- Toujours utiliser le logger au lieu de `console.log` (même si cela fonctionne).
- Définir des niveaux de logs appropriés pour faciliter le débogage.
- Ajouter un contexte aux logs pour identifier leur provenance.
- Ne pas loguer d’informations sensibles (ex: mots de passe, tokens).
