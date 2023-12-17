const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engine', 'pug');
app.use(express.static('public'));

    app.get('/', (req, res) => {
    const results = [];
    const fileContents = fs.readFileSync('data.csv', 'utf-8');
    const lines = fileContents.split('\n');

    lines.forEach((line) => {
        const [identifiant, ville] = line.split(';');
        results.push({ Identifiant: identifiant, Ville: ville });
    });

    console.log(results);
    res.render('index', { title: 'Tableau', data: results });
    });

    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });

