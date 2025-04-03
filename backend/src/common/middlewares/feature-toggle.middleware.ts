import { Injectable, NestMiddleware } from '@nestjs/common';
import { FeatureService } from '@/resources/feature/feature.service';
import { Request, Response, NextFunction } from 'express';

const EXCLUDED_MODULES = ['auth', 'features', 'users', 'teams'];

@Injectable()
export class FeatureToggleMiddleware implements NestMiddleware {
  constructor(private readonly featureService: FeatureService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const disabledFeatures = await this.featureService.findDisabledFeatures();

    // Si on est sur la home, on laisse passer sans contrôle
    if (req.originalUrl === '/') {
      return next();
    }

    const activeFeatures = await this.featureService.findAll();
    const activeFeatureLabels = activeFeatures.data
      .filter((feature) => feature.isEnabled)
      .map((feature) => feature.label);

    // On ignore les paramètres de la requête 
    const pathWithoutQuery = req.originalUrl.split('?')[0];
    const moduleName = pathWithoutQuery.split('/')[1];

    if (EXCLUDED_MODULES.includes(moduleName)) {
      return next();
    }

    const disabledRoutes = disabledFeatures.map(
      (feature) => `/${feature.label}`
    );

    // On vérifie d'abord que la feature existe mais est désactivée 
    if (disabledRoutes.some((route) => req.originalUrl.startsWith(route))) {
      const message = `Access denied: this feature is disabled.`;
      console.error(message);
      return res.status(503).json({ message });
    }

    // Ensuite on check si la feature n'existe juste pas 
    if (!activeFeatureLabels.includes(moduleName)) {
      const message = `Access denied: the feature "${moduleName}" does not exist.`;
      console.error(message);
      return res.status(503).json({ message });
    }

    next();
  }
}
