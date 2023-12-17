const fs = require('fs');

const fileContents = fs.readFileSync('cities.json', 'utf-8');
console.log("data:\n", fileContents);