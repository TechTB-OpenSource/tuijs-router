import routerStart from './tui-router.js'

let routes = {
    '/': routeHome,
    '/about': routeAbout,
    '/contact': routeContact
}

routerStart(routes, [], '404.html')

function routeHome() {
    document.body.innerHTML = /* HTML */ `
        <h1>Home<h1>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    `
}

function routeAbout() {
    document.body.innerHTML = /* HTML */ `
        <h1>About<h1>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    `
}

function routeContact() {
    document.body.innerHTML = /* HTML */ `
        <h1>Contact<h1>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    `
}
