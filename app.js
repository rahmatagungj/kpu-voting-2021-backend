const CONNECTION_URL = "mongodb+srv://rahmatagungj:1010123@cluster0.7sail.mongodb.net/Cluster0?retryWrites=true&w=majority";
const DATABASE_NAME = "kpu-stkip-2021";
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const apiRoutes = require("./api-routes");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true});

var db = mongoose.DATABASE_NAME;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 3001;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello Duded, Math Here ...'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});