const fs = require('fs');
const process = require('process'); 

const filePath = 'data.csv';
const nouvelleLigne=process.argv[2];

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier :', err);
        return;
    }
    const fileContents = data + '\n' + nouvelleLigne;
    fs.writeFile(filePath, fileContents, 'utf8', (err) => {
        if (err) {
            console.error("Erreur lors de l'écriture du fichier :", err);

        } else {
            console.log('Nouvelle ligne ajoutée avec succès.');
        }
        const fileContents = fs.readFileSync('data.csv', 'utf-8');
        console.log("data:\n", fileContents);
    });
});

