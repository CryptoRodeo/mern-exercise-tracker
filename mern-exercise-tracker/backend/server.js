const express = require('express'),
    cors            = require('cors'),
    mongoose =  require('mongoose'),
    app             = express();


require('dotenv').config();

const port = process.env.PORT || 3001;

app.use(cors());
//parse json
app.use(express.json());


//mongodb client.
const mongo = require('mongodb').MongoClient();

mongoose.connect('mongodb://localhost:27017/mern-app', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

//Require routes for the CRUD operations
const exerciseRouter = require('./routes/exercises'),
          usersRouter       = require('./routes/users');

//When the user visits these url routes, its going to load everything in the accompanying folders
app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);



app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});