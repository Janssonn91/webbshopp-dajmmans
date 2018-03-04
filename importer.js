
//OUR JSON
const booksJson = require('./books.json');
const mongoose = require('mongoose');
//----------------------------

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//OUR collections!
mongoose.connect('mongodb://localhost/mongo_books');
//--------------------------

const db = mongoose.connection;
db.on('error', (e)=>{ console.error(e); });
db.once('open', ()=>{ console.info('db connected');});
const Book = require('./classes/Book.class');
const Materiel = require('./classes/Materiel.class');
const Ingredienser = require('./classes/Ingredienser.class');
let ingredienserModel = new Ingredienser(app).myModel;
let bookModel = new Book(app).myModel;
let materielModel = new Materiel(app).myModel;

// Empty collections
bookModel.remove({}, ()=> {
  authorModel.remove({}, ()=> {start()});
});

function start(){

  // Author mem - to avoid duplicates
  let authorMem = {};

  // Import authors and store their ids in the db
  for (let book of booksJson){

    if(authorMem[book.author]){
      continue;
    }

    let a = new authorModel({
      books: [],
      name: book.author,
      description: book.author + ' is considered the best author in the world by many people.'
    });

    a.save();

    authorMem[book.author] = a;

  }

  // Import books and store in db with their connection to an author
  for (let book of booksJson){

    let temp = book;
    temp.author = authorMem[temp.author]._id;

    let b = new bookModel(temp);

    b.save(() => {
      // Look up the author again and add the book id
      authorModel.find({_id: temp.author}, (err,a) => {
        a = a[0];
        a.books.push(b);
        a.save();
      });
    });


  }

}
