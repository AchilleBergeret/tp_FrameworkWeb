const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();
port = 3000;
app.use(bodyParser.json());

// Route POST pour ajouter une nouvelle ville
app.post('/city', (req, res) => {
  // Vérification de l'existence du fichier cities.json
  if (!fs.existsSync('cities.json')) {
    console.log("le fichier existe");
    fs.writeFileSync('cities.json', '{"cities": []}', 'utf-8');
  }

  const fichierJSON = fs.readFileSync('cities.json', 'utf-8');
  let data;
  data = JSON.parse(fichierJSON);
  const cityname = req.body.name;
  const cityid=uuidv4()
  // Vérifier si la nouvelle ville existe déjà dans la liste
  const existingCity = data.cities.find(city => city.name === cityname);

  if (existingCity) {
    return res.status(500).send('Erreur : La ville existe déjà dans la liste.');
  }
  // nouvelle ville
  const newCity = {
    id: cityid,
    name: cityname
  };

  data.cities.push(newCity);

  // Écrire la liste mise à jour dans le fichier cities.json
  fs.writeFileSync('cities.json', JSON.stringify(data, null, 2), 'utf-8');

  return res.status(201).json(newCity);
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
