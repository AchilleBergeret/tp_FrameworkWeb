const http = require('http');
const pug=require('pug');
const fs=require('fs');
const path = require('path');

const port = 3000;

const compiledFunction=pug.compileFile('C:/Users/utilisateur/Desktop/my-app/views/index.pug');


server=http.createServer(function (req, res) {
    if (req.url === '/style.css') {
        const cssPath = 'C:/Users/utilisateur/Desktop/my-app/public/style.css';
        const cssContent = fs.readFileSync(cssPath, 'utf-8');
        
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(cssContent);
    } else if (req.url === '/') {
    const data = fs.readFileSync('data.csv', 'utf-8');
    res.statusCode = 200
    const rows = data.split('\n');
    const dataArray = [];
    for (const row of rows) {
        const columns = row.split(';');
        const rowData = {
            Identifiant: columns[0],
            Ville: columns[1],
        };
        dataArray.push(rowData);
    }
    const html =compiledFunction({data: dataArray });
    //res.statusCode = 200;
    //res.setHeader('Content-Type', 'text/html');
    res.end(html);
}});
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
