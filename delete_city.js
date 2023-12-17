const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Route DELETE pour supprimer une ville par son ID
app.delete('/city/:id', (req, res) => {
  const cityId = req.params.id;

  if (!cityId) {
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
    return res.status(500).send('Erreur lors de la lecture du fichier cities.json : ' + error.message);
  }

  // Trouver l'index de la ville à supprimer dans le tableau
  const index = data.cities.findIndex(city => city.id === cityId);

  if (index === -1) {
    return res.status(404).send('Erreur : Aucune ville trouvée avec cet ID.');
  }

  // Supprimer la ville du tableau
  data.cities.splice(index, 1);

  // Écrire la liste mise à jour dans le fichier cities.json
  fs.writeFileSync('cities.json', JSON.stringify(data, null, 2), 'utf-8');

  return res.status(200).send('Supression effectuée');
  
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
