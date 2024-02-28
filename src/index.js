import router from 'tui-router'

let routes = [
    '/', routeHome,
    '/about', routeAbout,
    '/contact', routeContact
]

router(routes, ['/'], '')

function routeHome() {
    document.body.innerHTML = /* HTML */ `
        <h1>Home<h1>
        <a href="/">Home</a>
        <a href="/About">About</a>
        <a href="/Contact">Contact</a>
    `
}

function routeAbout() {
    document.body.innerHTML = /* HTML */ `
        <h1>About<h1>
        <a href="/">Home</a>
        <a href="/About">About</a>
        <a href="/Contact">Contact</a>
    `
}

function routeContact() {
    document.body.innerHTML = /* HTML */ `
        <h1>Contact<h1>
        <a href="/">Home</a>
        <a href="/About">About</a>
        <a href="/Contact">Contact</a>
    `
}
