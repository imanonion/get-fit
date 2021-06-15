// =======================================
//              DEPENDENCIES
// =======================================
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const { flash } = require('express-flash-message');
const { setUserVarMiddleware } = require('./middlewares/auth-middleware')
const classesRouter = require('./routers/classes_router');
const usersRouter = require('./routers/users_router');

const app = express();
const port = process.env.PORT || 3000; // tenary operator
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

//middlewares to accept json and urlencoded request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware to include main.css file
app.use(express.static('public'));

//middlware to accept form methods other than GET and POST
app.use(methodOverride('_method'));

//middleware to support session, all requests will be subjected to this middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: 'user_session', 
  resave: false,
  saveUninitialized: false,
  cookie: { path: '/', secure: false, maxAge: 3600000 }
}));

//middleware to use flash message
app.use(flash({ sessionKeyName: 'flash_message' }));

//middleware to ensure global template user variable
app.use(setUserVarMiddleware)

//set view engine
app.set('view engine', 'ejs');

// =======================================
//              ROUTES
// =======================================

app.get('/', (req, res) => {
  res.redirect('/classes');
})

//connect to classes router
app.use('/classes', classesRouter);

//connect to users router
app.use('/users', usersRouter);

// =======================================
//              LISTENER
// =======================================
//initialise MongoDB connection via Mongoose
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(response => {
    app.listen(port, () => {
      console.log(`Get Fit app listening on port: ${port}`)
    })
  })