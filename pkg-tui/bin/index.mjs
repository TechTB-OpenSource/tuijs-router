#! /usr/bin/env node
//// IMPORTS ////
import fs from 'fs';
import { join } from 'path';
import { exec } from 'child_process';

// IMPORTS - Custom
import {
    indexHtml,
    indexJsBasic,
    indexJsRouter,
    indexConfigJsBasic,
    indexConfigJsRouter,
    routerConfigJs,
} from './files.mjs';
import {
    colorVarCss,
    colorCss,
    siteCss
} from './filesCss.mjs';
import {
    devServer,
    devServerPackageJson
} from './filesDevServer.mjs';

//// VERSION ////
const version = '7.5.0-002';

//// VARIABLES ////

// VARIABLES - CLI - COLORS
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

// VARIABLES - Directories
const dirProjectRoot = process.cwd();
const dirPackageRoot = join(dirProjectRoot, './node_modules/tui/');
const dirTemplatesRoot = join(dirPackageRoot, '/templates');

//// EX ////
ex(process.argv.slice(2));

//// FUNCTIONS ////
async function ex(arg) {
    try {
        // If no arguments are provided after 'tui', deploy the default TTB site template
        if (!arg[0]) {
            console.log(`${colors.yellow}No arguments provided. Deploying Default TTB site template.${colors.reset}`);
            templateCheck(join(dirTemplatesRoot, `/default`));
            createTemplateProject(join(dirTemplatesRoot, `/default`));
            return;
        }
        // If the no other arguments are provided but the router switch is provided, deploy the default TTB site template with routing
        if (arg[0] === '-r' || arg[0] === '-router') {
            console.log(`${colors.yellow}No site or page arguments provided. Deploying Default TTB site template.${colors.reset}`);
            console.log(`${colors.blue}Client side routing selected.${colors.reset}`);
            templateCheck(join(dirTemplatesRoot, `/default`));
            createTemplateProject(join(dirTemplatesRoot, `/default`), true);
            return;
        }
        // If the template switch is provided after 'tui'
        if (arg[0] === '-t' || arg[0] === '-template') {
            // if no template name is provided after 'tui -t', deploy the default TTB site template
            if (!arg[1]) {
                throw `No site template name was provided.`;
            }
            // if a template name is provided after 'tui -t', and the router switch is provided, deploy the specified template with routing
            if (arg[2] === '-r' || arg[2] === '-router') {
                console.log(`${colors.blue}Client side routing selected.${colors.reset}`);
                templateCheck(join(dirTemplatesRoot, `${arg[1]}`), arg[1]);
                console.log(`${colors.blue}Deploying TUI Template '${arg[1]}'...${colors.reset}`);
                createTemplateProject(join(dirTemplatesRoot, `/${arg[1]}`), true);
                console.log(`${colors.blue}TUI Template TTB Basic deployment complete.${colors.reset}`);
                return;
            }
            const dirTemplate = join(dirTemplatesRoot, `/${arg[1]}`);
            templateCheck(dirTemplate, arg[1]);
            //// TEMPLATE MAY PROVIDE INDEX OR CONFIG FILES. CREATE/COPY THOSE FILES OR IF THEY ALREADY EXIST, SKIP OVER THEM
            console.log(`${colors.blue}Deploying TUI Template '${arg[1]}'...${colors.reset}`);
            createTemplateProject(dirTemplate, false);
            console.log(`${colors.blue}TUI deployment complete.${colors.reset}`);
            return;
        }
        // If the static switch is provided after 'tui'
        if (arg[0] === '-s' || arg[0] === '-static') {
            console.log(`${colors.blue}Deploying TUI static page '${arg[1]}'...${colors.reset}`);
            deployStaticFile(arg[1], arg[2]);
            console.log(`${colors.blue}TUI static page '${arg[1]}' deployment complete.${colors.reset}`);
            return;
        }
        // If the 'dev' switch is provided after 'tui'
        if (arg[0] === '-dev') {
            deployDevServer();
            return;
        }
        // TUI UNKNOWN ARGUMENT
        throw `Unknown argument.`
    } catch (er) {
        console.error(`${colors.red}TUI CLI ERROR: ${er}${colors.reset}`);
    }
}

function createTemplateProject(dirTemplateRoot, routingBoolean) {
    // Set variables for template directories
    const fileTemplateConfig = join(dirTemplateRoot, '/config.json');
    const dirTemplateLib = join(dirTemplateRoot, '/lib');
    // Read and parse 'config.js'
    const dataTemplateConfigJsonTemplateConfig = fs.readFileSync(fileTemplateConfig, 'utf-8');
    const dataTemplateConfig = JSON.parse(dataTemplateConfigJsonTemplateConfig);
    // Set default site directory if none set
    if (!dataTemplateConfig.dirSite) {
        dataTemplateConfig.dirSite = '/src';
    }
    // Set site root directory
    const dirSiteRoot = join(dirProjectRoot, dataTemplateConfig.dirSite);
    // Check for custom tui directory
    if (!dataTemplateConfig.dirTuiFiles) {
        dataTemplateConfig.dirTuiFiles = '/tui';
    }

    if (dataTemplateConfig.dirTuiFiles !== '/tui') {
        if (!fs.existsSync(join(dirSiteRoot, dataTemplateConfig.dirTuiFiles))) {
            throw `You have selected the custom TUI client directory '${dataTemplateConfig.dirTuiFiles}' in your 'config.json' file.
However, the custom directory specified does not exist in the template 'lib' directory.
Please create the custom directory '${dataTemplateConfig.dirTuiFiles}', and try again.`;
        }
    }
    // Set tui file directory in site directory
    const dirSiteTui = join(dirSiteRoot, dataTemplateConfig.dirTuiFiles);
    // Check for CSS URLS
    if (!dataTemplateConfig.cssUrls) {
        throw `The template 'config.json' file is missing the 'cssUrls' key.
Please include this dataTemplateConfig in the 'config.json' file.
A 'color.css' file URL MUST be included if the default renderer, logic, and/or elm library is being used.`;
    }
    // Checks for existing site directory. THIS IS CRITICAL TO AVOID OVERWRITING AN EXISTING SITE BY MISTAKE.
    if (fs.existsSync(dirSiteRoot)) {
        throw `The site directory '${dirSiteRoot}' already exists.
Please delete the existing directories if you want to redeploy.`;
    }
    // Copy template lib files from the template to the site directory
    copyDirRecursive(dirTemplateLib, dirSiteRoot);
    // Copy standard TUI files from the TUI lib to the site tui directory. Will skip over existing files, allowing files from the template to take precedence.
    copyDirRecursive(join(dirPackageRoot, `/lib/tui`), dirSiteTui);
    // If selected, copy the TUI routing file to the site TUI directory
    if (routingBoolean) {
        copyFile(join(dirPackageRoot, `/lib/router/router.js`), join(dirSiteTui, `/router.js`));
    }
    // If the 'img' directory doesn't exit in site directory, create it
    if (!fs.existsSync(join(dirSiteRoot, '/img'))) {
        fs.mkdirSync(join(dirSiteRoot, '/img'));
        console.log(`${colors.green}Created the directory '${join(dirSiteRoot, '/img')}'.${colors.reset}`);
    }
    // If the 'css' directory doesn't exit in site directory, create it
    if (!fs.existsSync(join(dirSiteRoot, '/css'))) {
        fs.mkdirSync(join(dirSiteRoot, '/css'));
        console.log(`${colors.green}Created the directory '${join(dirSiteRoot, '/css')}'.${colors.reset}`);
    }
    // If the 'js' directory doesn't exit in site directory, create it
    if (!fs.existsSync(join(dirSiteRoot, '/js'))) {
        fs.mkdirSync(join(dirSiteRoot, '/js'));
        console.log(`${colors.green}Created the directory '${join(dirSiteRoot, '/js')}'.${colors.reset}`);
    }
    // If the 'config' directory doesn't exit in site directory, create it
    if (!fs.existsSync(join(dirSiteRoot, '/config'))) {
        fs.mkdirSync(join(dirSiteRoot, '/config'));
        console.log(`${colors.green}Created the directory '${join(dirSiteRoot, '/config')}'.${colors.reset}`);
    }
    // Copy 404.html file to the site root
    copyFile(join(dirPackageRoot, `/lib/static/404.html`), join(dirSiteRoot, `/404.html`));
    /**
     * Copy standard TUI img files from the TUI 'lib/img' directory to the site 'img' directory.
     * Will skip over existing files, allowing files from the template to take precedence.
     */
    copyDirRecursive(join(dirPackageRoot, `/lib/img`), join(dirSiteRoot, '/img'));
    // Create site files in site directory
    createFile(join(dirSiteRoot, '/index.html'), indexHtml);
    /**
     * If the '/css/color.var.css' file doesn't exit in site directory, create it.
     * A template should provide a file.
     */
    if (!fs.existsSync(join(dirSiteRoot, '/css/color.var.css'))) {
        createFile(join(dirSiteRoot, '/css/color.var.css'), colorVarCss);
    }
    createFile(join(dirSiteRoot, '/css/color.css'), colorCss);
    createFile(join(dirSiteRoot, '/css/site.css'), siteCss(dataTemplateConfig.cssUrls));
    if (routingBoolean) {
        createFile(join(dirSiteRoot, '/js/index.js'), indexJsRouter);
        createFile(join(dirSiteRoot, '/config/index.config.js'), indexConfigJsRouter);
        createFile(join(dirSiteRoot, '/config/router.config.js'), routerConfigJs);
        return;
    }
    createFile(join(dirSiteRoot, '/js/index.js'), indexJsBasic);
    createFile(join(dirSiteRoot, '/config/index.config.js'), indexConfigJsBasic);
    return;
}

function templateCheck(dirTemplate, templateName) {
    const fileConfig = join(dirTemplate, `/config.json`);
    const dirTemplateLib = join(dirTemplate, `/lib`);
    if (!fs.existsSync(dirTemplate)) {
        throw `Template '${templateName}' does not exist`;
    }
    if (!fs.existsSync(fileConfig)) {
        throw `Unable to locate th 'config.json' file for template '${templateName}'.`;
    }
    if (!fs.existsSync(dirTemplateLib)) {
        throw `Unable to locate the 'lib' directory for template '${templateName}'.`;
    }
    return;
}

function deployStaticFile(fileName, dirDest) {
    if (fileName !== '404' && fileName !== 'blank' && fileName !== 'login' && fileName !== 'terms') {
        throw `Incorrect static page name provided. Please use one of the following page names.${colors.yellow}\n404\nblank\nlogin\nterms`;
    }
    if (!dirDest) {
        console.log(`${colors.yellow}No directory destination provided. Attempting to deploy in default site directory 'src'.${colors.reset}`);
        dirDest = `src`;
        if (!fs.existsSync(join(dirProjectRoot, '/src'))) {
            console.log(`${colors.yellow}Directory 'src' does not exist. Creating directory.${colors.reset}`);
            fs.mkdirSync(join(dirProjectRoot, '/src'));
        }
    }
    if (join(dirProjectRoot, dirDest) === dirProjectRoot || join(dirProjectRoot, dirDest) === join(dirProjectRoot, `/`)) {
        throw `File cannot be deployed in project root folder`;
    }
    copyFile(join(dirPackageRoot, `/lib/static/${fileName}.html`), join(dirDest, `/${fileName}.html`));
    return;
}

function deployDevServer() {
    console.log(`${colors.blue}Attempting to deploy the development server.${colors.reset}`);
    if (fs.existsSync(join(dirProjectRoot, '/devServer'))) {
        throw `Development server has already been deployed.`;
    }
    fs.mkdirSync(join(dirProjectRoot, '/devServer'));
    console.log(`${colors.green}Created the directory '${join(dirProjectRoot, '/devServer')}'.${colors.reset}`);
    createFile(join(dirProjectRoot, '/devServer/app.js'), devServer);
    createFile(join(dirProjectRoot, '/devServer/package.json'), devServerPackageJson);
    exec(`cd devServer && npm i`, function (error, stdout, stderr) {
        if (error) {
            throw error;
        }
        if (stderr) {
            throw stderr;
        }
        console.log(stdout);
        console.log(`${colors.blue}Development server deployment complete.${colors.reset}`);
        return
    })
    return;
}

function copyDirRecursive(dirSrc, dirDest) {
    if (!fs.existsSync(dirDest)) {
        fs.mkdirSync(dirDest);
        console.log(`${colors.green}Created the directory '${dirDest}'.${colors.reset}`);
    }
    const files = fs.readdirSync(dirSrc);
    for (let i = 0; i < files.length; i++) {
        const sourcePath = join(dirSrc, files[i]);
        const destinationPath = join(dirDest, files[i]);
        if (fs.statSync(sourcePath).isDirectory()) {
            copyDirRecursive(sourcePath, destinationPath);
            continue;
        }
        if (fs.existsSync(destinationPath)) {
            console.log(`${colors.yellow} File '${destinationPath}' already exists'. File ${sourcePath} was not copied.${colors.reset}`);
            continue;
        }
        fs.copyFileSync(sourcePath, destinationPath);
        console.log(`${colors.green}Copied the file '${sourcePath}' to '${destinationPath}'.${colors.reset}`);
        continue;
    }
    return;
}

function copyFile(fileSrc, fileDest) {
    if (fs.existsSync(fileDest)) {
        throw `File ${fileDest} already exists. Please delete the existing file if you want to redeploy.`;
    }
    if (fs.statSync(fileSrc).isDirectory()) {
        copyDirRecursive(fileSrc, fileDest);
        throw `Provided path is a directory. Please provide a file.`;
    }
    fs.copyFileSync(fileSrc, fileDest);
    console.log(`${colors.green}Copied the file '${fileSrc}' to '${fileDest}'.${colors.reset}`);
    return;
}

function createFile(filePath, fileTemplate) {
    fs.writeFileSync(filePath, fileTemplate);
    console.log(`${colors.green}TUI file '${filePath}' created.${colors.reset}`);
    return;
}
