# 📜 Documentation : Ajout de permissions sur un module dans l'API NestJS

## 🚀 Introduction

Cette documentation détaille le fonctionnement de la gestion des permissions au sein des projets basés sur la brique logicielle Tuile. Le système de gestion des permissions repose sur des règles définies dans des fichiers spécifiques, injectés dans les modules correspondants et appliqués via un décorateur.

---

## 🎯 1. Ajouter un fichier de règles pour un module

Chaque module doit disposer d'un fichier dédié à la gestion de ses permissions. Ce fichier suit une structure bien définie et permet d'implémenter des méthodes de vérification des droits d'accès.

### 📝 Exemple : `team.rules.ts`

Le fichier contient :

- **Une classe injectable** permettant l'utilisation du fichier comme service.
- **Des méthodes de validation des permissions** pour chaque action (lecture, modification, suppression, etc.).
- **Un appel au service d'authentification** pour vérifier les permissions globales.
- **Une vérification spécifique** des permissions si nécessaire.

#### 📌 Exemple de structure :

```typescript
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { RESOURCES } from '@/common/constants/permissions/resources.constant';
import { RIGHTS } from '@/common/constants/permissions/rights.constant';
import { IUserPayload } from '@/resources/user/IUserPayload';

@Injectable()
export class TeamRules {
  constructor(private readonly authService: AuthService) {}

  async canView(payloadUser: IUserPayload, teamId: number): Promise<boolean> {
    // Vérification des permissions globales
    const hasGlobalPermission = await this.authService.validatePermission(
      payloadUser.userId,
      RESOURCES.TEAM,
      RIGHTS.READ
    );
    if (hasGlobalPermission) return true;

    // Vérification spécifique des permissions
    return true;
  }

  async canEdit(payloadUser: IUserPayload, teamId: number): Promise<boolean> {
    // Vérification des permissions globales
    const hasGlobalPermission = await this.authService.validatePermission(
      payloadUser.userId,
      RESOURCES.TEAM,
      RIGHTS.WRITE
    );
    if (hasGlobalPermission) return true;

    // Vérification spécifique des permissions
    return true;
  }

  async canDelete(payloadUser: IUserPayload, teamId: number): Promise<boolean> {
    // Vérification des permissions globales
    const hasGlobalPermission = await this.authService.validatePermission(
      payloadUser.userId,
      RESOURCES.TEAM,
      RIGHTS.DELETE
    );
    if (hasGlobalPermission) return true;

    // Vérification spécifique des permissions
    return true;
  }
}
```

### 🔹 Remarque

Tout droit et tout module doit être référencé via les constantes :

- `@/common/constants/permissions/resources.constant`
- `@/common/constants/permissions/rights.constant`

---

## 📦 2. Importer le fichier de règles dans le module du contrôleur

Pour permettre l'utilisation des permissions dans un contrôleur, il faut importer le fichier de règles dans le module concerné, comme un service.

### 📌 Exemple : `team.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamRules } from './team.rules';

@Module({
  controllers: [TeamController],
  providers: [TeamService, TeamRules],
  exports: [TeamRules],
})
export class TeamModule {}
```

---

## 🔐 3. Appliquer la vérification des permissions sur les méthodes du contrôleur

Dans le contrôleur, utilisez l'annotation `@CheckPermission` au-dessus de chaque méthode à protéger.

### 📌 Exemple : `team.controller.ts`

```typescript
import { Controller, Get, Param } from '@nestjs/common';
import { CheckPermission } from '@/common/decorators/check-permission.decorator';
import { TeamRules } from './team.rules';

@Controller('team')
export class TeamController {
  @Get(':id')
  @CheckPermission('canView', TeamRules) // Appliquer la permission "canView" de TeamRules
  async getTeam(@Param('id') id: number) {
    return { message: `Détails de l'équipe ${id}` };
  }
}
```

---

## 🎭 Philosophie des droits

Le système de permissions repose sur un principe de hiérarchie et de flexibilité :

1. **Droits globaux prioritaires** 🏛️ : Ces permissions s'appliquent à l'ensemble d'un module et priment sur les droits unitaires. Par exemple, un administrateur ayant le droit global "READ" sur une ressource peut voir toutes les équipes, sans vérification supplémentaire.

2. **Droits unitaires en cas d'absence de droits globaux** 🔍 : Si l'utilisateur ne possède pas le droit global, la validation se fait au cas par cas, en fonction des règles définies dans `team.rules.ts`. Cela permet d'accorder des accès plus fins et précis.

---

## ✅ Conclusion

En suivant ces étapes :

1. **Créer un fichier de règles** contenant les méthodes de validation des permissions.
2. **Importer ces règles dans le module** du contrôleur associé.
3. **Utiliser l'annotation `@CheckPermission`** pour appliquer les restrictions sur les méthodes du contrôleur.

Ce système permet une gestion flexible, évolutive et sécurisée des permissions dans l'API NestJS. 🚀
