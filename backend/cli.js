"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const generateHttpFile = (moduleName) => {
    const baseUrl = `http://localhost:3000/${moduleName.toLowerCase()}`;
    const templatePath = (0, path_1.join)(process.cwd(), 'templates', 'template.http');
    let content = (0, fs_1.readFileSync)(templatePath, 'utf8');
    content = content
        .split('\n')
        .filter((line) => !line.includes('@entity = entity_placeholder'))
        .join('\n');
    content = content.replace(/{{module}}/g, moduleName);
    let entity = `${moduleName.toLowerCase()}s`;
    content = content.replace(/{{entity}}/g, entity);
    const moduleFolderPath = (0, path_1.join)(process.cwd(), 'src/resources/', moduleName.toLowerCase());
    if (!(0, fs_1.existsSync)(moduleFolderPath)) {
        (0, fs_1.mkdirSync)(moduleFolderPath, { recursive: true });
    }
    const outputPath = (0, path_1.join)(moduleFolderPath, `${moduleName}.api.http`);
    (0, fs_1.writeFileSync)(outputPath, content);
    console.log(`✅ Fichier HTTP généré : ${outputPath}`);
};
const generateResourceAndHttpFile = (moduleName) => {
    try {
        const resourcePath = `resources/${moduleName}`;
        console.log(`🚀 Génération de la ressource NestJS pour le module : ${moduleName}`);
        (0, child_process_1.execSync)(`nest g resource ${resourcePath}`, { stdio: 'inherit' });
        console.log(`🚀 Génération du fichier HTTP pour le module : ${moduleName}`);
        generateHttpFile(moduleName);
        console.log('🎉 Génération complète terminée avec succès !');
    }
    catch (error) {
        console.error('❌ Une erreur est survenue lors de la génération de la ressource et du fichier HTTP :', error.message);
        process.exit(1);
    }
};
const generateHttpForExistingModule = (moduleName) => {
    try {
        console.log(`🚀 Génération du fichier HTTP pour le module existant : ${moduleName}`);
        generateHttpFile(moduleName);
        console.log('🎉 Génération complète du fichier HTTP terminée avec succès !');
    }
    catch (error) {
        console.error('❌ Une erreur est survenue lors de la génération du fichier HTTP :', error.message);
        process.exit(1);
    }
};
const run = () => {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.error('❌ Usage : ts-node cli.ts <action> <ModuleName>');
        console.log('Actions disponibles :');
        console.log('  - "generate" pour générer la ressource complète et le fichier HTTP');
        console.log('  - "http" pour générer uniquement le fichier HTTP');
        process.exit(1);
    }
    const action = args[0];
    const moduleName = args[1];
    if (action === 'resource') {
        generateResourceAndHttpFile(moduleName);
    }
    else if (action === 'http') {
        generateHttpForExistingModule(moduleName);
    }
    else {
        console.error('❌ Action non reconnue. Utilisez "generate" ou "http".');
        process.exit(1);
    }
};
run();
//# sourceMappingURL=cli.js.map