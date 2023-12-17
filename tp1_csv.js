const fs = require('fs');

const fileContents = fs.readFileSync('data.csv', 'utf-8');
console.log("data:\n", fileContents);
