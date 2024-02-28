# TUI (Version 7.5.0)
## internal-tool-tui

## Description
TUI is an web app creation script that will create an interactive webpage shell based on a template and a set of client side configuration options.
TUI styles and elements are built into the template. They can be altered by creating a template with new styles and a new library of template literals.
The TUI client side code consists of a set of TUI files (JS), a config file (JS), a page file (JS), an HTML file, and, if selected, a router config file (JS).
Below is a description of what each file does.
- TUI files - Contain the element logic, the render code, various utilities, the element templates, and if selected, the router code.
- - logic.js
- - render.js
- - util.js
- - elm.js
- - router.js
- 'page.config.js' - Contains all of the client side configuration options.
- 'page.js'- Contains the necessary code to start TUI and call the project's custom code.
- 'page.html' - Contains the basic HTML required for TUI to function.
- 'router.config.js' - Contains the route configuration if routing is selected.
*** The 'page' in the file name is a place holder for whatever page name that is being used. If you are using the router and creating a SPA, the page name will always be index. However, if you are creating a MPA, each set of files ('page.html', 'page.js', and 'page.config.js') will have a unique name. ***

## TUI can be deployed 3 different ways
- TUI Static - Does not required a template or any significant code. Consists of static HTML pages that have had the TechTB theme added. Static pages cannot use any of the TUI element logic without manually adding it. TUI Static pages a primarily used as the foundation for the TechTB theme, for testing, for error pages, or very simple sites.
- TUI Basic - Consists of the dynamically generated webpage shells, the JS used to generate it, and the JS needed to make them interactive. TUI Basic does not include routing. TUI Basic is recommended for MPAs. With TUI Basic, each page needs it's own 'page.config.js' file.
- TUI Router - Consists of the dynamically generated webpage shells, the JS used to generate it, the JS needed to make them interactive, as well as the JS needed for client-side routing. TUI Router is recommended for SPAs.
*** TUI Static pages can and often are used alongside TUI Basic and TUI Router. For example, the static 404 page is often used in the site root for 404 errors. ***

## Custom Content
To add additional content to a page, you typically append the ('id_content') element, which is created in every TUI app. The other page elements can be altered by the config file or with custom code once the page is rendered.
Post TUI render content will be added differently depending on which TUI flavor being used.
- TUI Static - Links and content must all be adjusted manually either in the HTML or via added custom JS.
- TUI Basic - You must add custom content and logic in the 'ex' function in the 'page.js' file ('index.js' by default). If desired, you can import code to the 'page.js' file using ES modules. Depending on how complicated the application is, this may be the best practice.
- TUI Router - You must add custom content and logic in the route functions in the 'router.config.js' file. If desired, you can import code to the 'router.config.js' file using ES modules.This is the best practice. TUI does not currently have a built in method for route views, however this can easily be achieved by adding custom routing inside the already existing route that updates the URL and the content. This can be done with or without a full page load without affecting the rest of the pages or the TUI logic. A view routing feature may be added later.

## HTML File Notes
- A module script tag must be placed in the HTML file which calls the corresponding JS file. The CLI will deploy an HTML file that already contains this tag.
- It is recommended that the 'page' in the file name 'page.js' or 'page.config.js' match the name of the HTML file. When routing is being used, the page name is nearly always 'index'.
    - Examples:
      - The HTML file 'index.html' should have a config file named 'index.config.js' and JS file 'index.js'
      - The HTML file 'about.html' should have a config file named 'about.config.js' and JS file 'about.js'

## TUI Router
- In order to use the routing included with TUI, the 'router.config.js' file must be customized for the app being created.
- TUI Router is started from an 'index.js' file which will be generated when using the TUI CLI.
- The 'routeServer' variable in the 'router.config.js' file can be used to specify routes that must go to the server first before having client-side routing applied.
  This will allow the server to decided what to do with the route. For example, this can be used to manage restricted routes when using authentication.
  It should be noted that an experienced malicious actor can manipulate the client side code, to allow them access to the page, however if the server-side code is written securely,
  The page will be empty. It is important to only include data on the client-side that is safe to be exposed without authentication.
*** FOR THE BEST USER EXPERIENCE, IT IS RECOMMENDED THAT YOUR SERVER REDIRECT ALL TRAFFIC TO THE INDEX.HTML. ***
*** AUTHENTICATION HAS NOT YET BEEN FULLY TESTED WITH TUI ROUTING, HOWEVER INITIAL TESTING WITH NODEJS INDICATES THAT IT SHOULD WORK. ***
*** IF AUTHENTICATION IS BEING USED, SERVER-SIDE ROUTES WILL BE NECESSARY TO PROTECT RESTRICTED FILES, CODE, AND DATA. ***

## TUI Templates
- TUI templates are designed to allow for the creation of new themes.
- TUI templates consist of a config.json file and a 'lib' directory.
- The 'config.json' file consists of options for the templates deployment including, the target site root directory, the target TUI JS file directory, as well as references to custom CSS files.
- Templates may replace one or all of the default TUI files by including them in the 'lib' directory with the appropriate name. Any file that is in the template, in the correct location, with the same name as the default file, will be copied to the target site directory and the TUI default file will not.
- A Template requires a 'color.var.css' in order to have a custom color palette. This file MUST have a specific set of color variables with specific names. The files in the existing templates can be used as a reference, however if no file is provided, a default file will be deployed which can be manually updated.
- The TUI CLI will also deploy a 'color.css' which contains all of the critical color classes for TUI to work in its default form. If there is a desire to move away from these classes, the 'elm.js', 'logic.js', and 'render.js' files must be changed/customized.
- The current TUI template structure is rudimentary and may be updated in the future.

# TUI CLI
- The TUI CLI is the easiest way to deploy any flavor of TUI.
- The TUI CLI can also deploy a development Node.js server that can be used for testing.

### TUI CLI Installation
- Copy the 'pkg-tui' directory to the root of the project.
- Run 'npm i --save-dev "./pkg-tui' from the terminal.

### TUI CLI Instructions
- To use the CLI, run 'npx tui' from the terminal, once installed.
- If no arguments are provided, the CLI will deploy TUI Basic with the default template.
- The arguments in the CLI **MUST** be in the correct order.
- Below are the arguments that may be used.
- - 'npx tui'                                                                 = **Deploys the default template as a TUI Basic app.**
- - 'npx tui -router(-r)'                                                     = **Deploys the default template as a TUI Router app.**
- - 'npx tui -static(-s) ***staticFileName*** ***destinationFileLocation***'  = **Deploys a static TUI file.**
- - 'npx tui -template(-t) ***templateName***'                                = **Deploys a selected template as a TUI Basic app.**
- - 'npx tui -template(-t) ***templateName*** -router(-r)'                    = **Deploys a selected template as a TUI Router app.**
- - 'npx tui -dev'                                                            = **Deploys the TUI development server.**

### TUI Development Server Instructions
- The TUI development server will deploy a directory called 'devServer' to the root and will install express, as it is a dependency.
- The TUI development server is very simple and can easily be customized as desired.
- To run the development server, just launching the 'app.js' file with the 'node' command. So 'node ./devServer/app.js' by default from the terminal root.
- - By default, the development server will try to serve files from 'projectrRoot/src'. If you wish to change this, simply add an argument when launching the 'app.js' file.
    For example: 'node ./devServer/app.js public'

# Additional Information

## Notes
- Thought the TUI router is strictly client side and should work work with many types of backends, it was created and test using Node.js.
