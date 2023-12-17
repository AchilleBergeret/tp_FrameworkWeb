const express = require('express');
const app = express();
const fs = require('fs');


    app.get('/cities', (req, res) => {
        if (fs.existsSync('cities.json')) {
            console.log("le fichier existe");
            const results = [];
            const fichierJSON = fs.readFileSync('cities.json', 'utf-8');
            const data = JSON.parse(fichierJSON);
            res.json(data);
            }
        else{
            console.log("Erreur, pas de fichier à ce nom");
        }
    });
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });

