
//Fix here for our JSON
const booksJson = require('./books.json');
const authorJson = require('./authors.json');


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()) // needed to post json
app.use(express.static('www'));

// Please note that "a Book" here is not really a book
// but a Mongoose model + setting up routes
const Book = require('./classes/Book.class');
let book = new Book(app);
//book.setupImportRoute(booksJson);
const Materiel = require('./classes/Materiel.class');
let materiel = new Materiel(app);
//author.setupImportRoute(authorJson);
const Ingredienser = require('./classes/Ingredienser.class');
let ingredienser = new Ingredienser(app);

app.listen(3000,()=>{
  console.log("Listening on port 3000!");
});
