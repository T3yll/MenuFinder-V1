import { execSync } from 'child_process';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

/**
 * Génère un fichier .http avec les routes CRUD pour le module donné en utilisant un fichier template.
 * @param moduleName Nom du module
 */
const generateHttpFile = (moduleName: string) => {
  const baseUrl = `http://localhost:3000/${moduleName.toLowerCase()}`;

  // Chemin vers le fichier template
  const templatePath = join(process.cwd(), 'templates', 'template.http');

  // Lire le fichier template
  let content = readFileSync(templatePath, 'utf8');

  // Supprimer la ligne contenant "@entity = entity_placeholder"
  content = content
    .split('\n')
    .filter((line) => !line.includes('@entity = entity_placeholder'))
    .join('\n');

  // Remplacer le placeholder {{moduleName}} par le nom du module
  content = content.replace(/{{module}}/g, moduleName);

  // Déclaration du nom de l'entité (module avec un s)
  let entity = `${moduleName.toLowerCase()}s`;

  // Remplacer le placeholder {{entity}} par le nom de l'entité (au pluriel)
  content = content.replace(/{{entity}}/g, entity);

  // Détermine le chemin du dossier du module
  const moduleFolderPath = join(
    process.cwd(),
    'src/resources/',
    moduleName.toLowerCase()
  );

  // Vérifie si le dossier existe, sinon le créer
  if (!existsSync(moduleFolderPath)) {
    mkdirSync(moduleFolderPath, { recursive: true });
  }

  // Chemin du fichier de sortie
  const outputPath = join(moduleFolderPath, `${moduleName}.api.http`);

  // Écriture du fichier
  writeFileSync(outputPath, content);
  console.log(`✅ Fichier HTTP généré : ${outputPath}`);
};

/**
 * Gère la commande complète de génération du module et du fichier HTTP.
 */
const generateResourceAndHttpFile = (moduleName: string) => {
  try {
    const resourcePath = `resources/${moduleName}`;

    // Générer la ressource NestJS
    console.log(
      `🚀 Génération de la ressource NestJS pour le module : ${moduleName}`
    );
    execSync(`nest g resource ${resourcePath}`, { stdio: 'inherit' });

    // Générer le fichier HTTP
    console.log(`🚀 Génération du fichier HTTP pour le module : ${moduleName}`);
    generateHttpFile(moduleName);

    console.log('🎉 Génération complète terminée avec succès !');
  } catch (error) {
    console.error(
      '❌ Une erreur est survenue lors de la génération de la ressource et du fichier HTTP :',
      error.message
    );
    process.exit(1);
  }
};

/**
 * Gère la commande complète de génération du fichier HTTP pour un module existant.
 */
const generateHttpForExistingModule = (moduleName: string) => {
  try {
    // Générer uniquement le fichier HTTP
    console.log(
      `🚀 Génération du fichier HTTP pour le module existant : ${moduleName}`
    );
    generateHttpFile(moduleName);

    console.log(
      '🎉 Génération complète du fichier HTTP terminée avec succès !'
    );
  } catch (error) {
    console.error(
      '❌ Une erreur est survenue lors de la génération du fichier HTTP :',
      error.message
    );
    process.exit(1);
  }
};

/**
 * Gère la logique de la commande en fonction des arguments.
 */
const run = () => {
  const args = process.argv.slice(2);

  // Vérifie qu'un module a été spécifié et qu'une commande est présente
  if (args.length < 2) {
    console.error('❌ Usage : ts-node cli.ts <action> <ModuleName>');
    console.log('Actions disponibles :');
    console.log(
      '  - "generate" pour générer la ressource complète et le fichier HTTP'
    );
    console.log('  - "http" pour générer uniquement le fichier HTTP');
    process.exit(1);
  }

  const action = args[0];
  const moduleName = args[1];

  if (action === 'resource') {
    generateResourceAndHttpFile(moduleName);
  } else if (action === 'http') {
    generateHttpForExistingModule(moduleName);
  } else {
    console.error('❌ Action non reconnue. Utilisez "generate" ou "http".');
    process.exit(1);
  }
};

// Exécute la commande
run();
