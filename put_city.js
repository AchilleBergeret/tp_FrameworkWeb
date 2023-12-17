const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.put('/city/:id', (req, res) => {
  const cityid = req.params.id;
  if (!cityid) {
    return res.status(400).send('Erreur : L\'ID de la ville est manquant dans les paramètres de l\'URL.');
  }
  if (!fs.existsSync('cities.json')) {
    return res.status(404).send('Erreur : Le fichier cities.json n\'existe pas.');
  }

  const fichierJSON = fs.readFileSync('cities.json', 'utf-8');
  let data;

  try {
    data = JSON.parse(fichierJSON);

    // Vérifier si le résultat est un objet avec une propriété "cities" contenant un tableau
    if (!data || !data.cities || !Array.isArray(data.cities)) {
      throw new Error('Le contenu du fichier cities.json n\'est pas au format attendu.');
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }

  // Vérifier si le corps de la requête contient l'ID et le nouveau nom de la ville
  if (!req.body || !req.body.name) {
    return res.status(400).send('Erreur : des paramètres sont manquants dans le corps de la requête.');
  }

  const newid = req.body.id;
  const newname = req.body.name;

  // Vérifier si la ville avec l'ID spécifié existe
  const existingCityIndex = data.cities.findIndex(city => city.id === cityid);

  if (existingCityIndex === -1) {
    return res.status(404).send('Erreur : Aucune ville trouvée avec cet ID.');
  }

  // Mettre à jour le nom de la ville
  data.cities[existingCityIndex].name = newname;

  // Écrire la liste mise à jour dans le fichier cities.json
  fs.writeFileSync('cities.json', JSON.stringify(data, null, 2), 'utf-8');

  return res.status(200).send('Mise a jour effectuée');
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
