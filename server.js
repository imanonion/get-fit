// =======================================
//              DEPENDENCIES
// =======================================
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const classController = require('./controllers/classes_controller');

const app = express();
const port = 3000;
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

//set view engine
app.set('view engine', 'ejs');

// =======================================
//              ROUTES
// =======================================
//index route
app.get('/classes', classController.index);

// new route
app.get('/classes/new', classController.new);

//create route
app.post('/classes', classController.create);

//show route
app.get('/classes/:slug/:id', classController.show);

//edit route
app.get('/classes/:slug/:id/edit', classController.edit);

//update route
app.patch('/classes/:slug/:id', classController.update);

//delete route
app.delete('/classes/:slug/:id', classController.delete);


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