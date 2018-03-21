
//Fix here for our JSON
const ingredientJson = require('./json/ingredients.json');
const booksJson = require('./json/books.json');
const materielJson = require('./json/matriel.json');
const dummybookingJson = require('./json/dummybooking.json');
const dummyusersJson = require('./json/dummyusers.json');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const ModelAndRoutes = require('./classes/model-and-routes.class');
const SessionHandler = require('./classes/session-handler.class');
const UserRouteProtector = require('./classes/user-route-protector.class');


// Make ModelAndRoutes into a global
global.ModelAndRoutes = ModelAndRoutes;

// Make mongoose, it's Schema obj and it's db connection into globals
global.mongoose = mongoose;
global.Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/webbshop');
global.db = mongoose.connection;
db.on('error', (e)=>{ console.error(e); });
db.once('open', ()=>{ console.info('db connected');});

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // needed to post json
app.use(cookieParser()); // needed to read and set cookies
app.use(new SessionHandler());
app.use(new UserRouteProtector());
app.use(express.static('www'));



// but a Mongoose model + setting up routes
const Ingredient = require('./classes/ingredient.class');
const Book = require('./classes/book.class');
const Materiel = require('./classes/materiel.class');
const Order = require('./classes/order.class');
const UserInfo = require('./classes/userinfo.class')
const Cart = require('./classes/cart.class')

let ingredient = new Ingredient(app);
let book = new Book(app);
let materiel = new Materiel(app);
let order = new Order(app);
let userinfo = new UserInfo(app);
let cart = new Cart(app);

const User = require('./classes/user.class');
let u = new User(app);
global.User = u.myModel;
const LoginHandler = require('./classes/login-handler.class');
new LoginHandler(app);



ingredient.setupImportRoute(ingredientJson);
book.setupImportRoute(booksJson);
materiel.setupImportRoute(materielJson);
order.setupImportRoute(dummybookingJson);
userinfo.setupImportRoute(dummyusersJson);
u.setupImportRoute(dummyusersJson);
cart.setupImportRoute();

const mailer = require('./classes/sendmail.class');
//let sendMail = new mailer(app);
app.post('/send-mail', mailer)

app.get(/^[^\.]*$/, (req, res) => {
 res.sendFile(__dirname + '/www/index.html');
});

app.listen(3000,()=>{
  console.log("Listening on port 3000!");
});
