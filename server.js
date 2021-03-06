const express = require('express');
const cors = require('cors');
const path = require('path');

//required to connect to mongodb
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//database uri
const uri = require('./config/keys').mongoURI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;

//outputs message once the connection is opened
connection.once('open', () => {
    console.log("MongoDB Connected!");
})

//import the files into the variables
const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//when accessing root url with these, it will load the files respectively
app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

//serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});