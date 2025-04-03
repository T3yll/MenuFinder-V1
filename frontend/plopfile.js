export default function (plop) {
    plop.setGenerator('module', {
        description: 'Créer un module React avec sa structure',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Nom du module :'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/modules/{{pascalCase name}}/containers/{{pascalCase name}}Index.tsx',
                templateFile: 'plop-templates/containers/index.hbs'
            },
            {
                type: 'add',
                path: 'src/modules/{{pascalCase name}}/containers/{{pascalCase name}}Add.tsx',
                templateFile: 'plop-templates/containers/add.hbs'
            },
            {
                type: 'add',
                path: 'src/modules/{{pascalCase name}}/containers/{{pascalCase name}}Edit.tsx',
                templateFile: 'plop-templates/containers/edit.hbs'
            },
            {
                type: 'add',
                path: 'src/modules/{{pascalCase name}}/containers/{{pascalCase name}}Router.tsx',
                templateFile: 'plop-templates/containers/router.hbs'
            },
            {
                type: 'add',
                path: 'src/modules/{{pascalCase name}}/components/{{pascalCase name}}Form.tsx',
                templateFile: 'plop-templates/components/form.hbs'
            },
            {
                type: 'add',
                path: 'src/modules/{{pascalCase name}}/components/{{pascalCase name}}IndexDatatable.tsx',
                templateFile: 'plop-templates/components/indexDatatable.hbs'
            },
            {
                type: 'add',
                path: 'src/modules/{{pascalCase name}}/services/{{pascalCase name}}Service.ts',
                templateFile: 'plop-templates/services/service.hbs'
            },
            {
                type: 'add',
                path: 'src/modules/{{pascalCase name}}/models/I{{pascalCase name}}.ts',
                templateFile: 'plop-templates/models/type.hbs'
            },
        ]
    });
};
