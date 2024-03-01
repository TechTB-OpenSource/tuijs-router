//// IMPORT ////
const express = require('express');
const path = require('path');

//// VARIABLES ////
const app = express();
const port = 3000;
const arg = process.argv.slice(2);
const dirProjectRoot = path.join(__dirname, '..');
let siteRoot = path.join(dirProjectRoot, '/src');
if (arg[0]) {
    siteRoot = path.join(dirProjectRoot, `/${arg[0]}`);
}

//// MIDDLEWARE ////
app.use(express.static(siteRoot));

//// ROUTES ////
app.get('*', function (req, res) {
    res.sendFile(path.join(siteRoot, '/index.html'));
});

//// SERVER ////
app.listen(port, function () {
    console.log(`Development server started on port ${port}`);
    console.log(`Development site root is ${siteRoot}`);
});
