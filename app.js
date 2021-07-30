const CONNECTION_URL = "mongodb+srv://rahmatagungj:1010123@cluster0.7sail.mongodb.net/Cluster0?retryWrites=true&w=majority";
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const apiRoutes = require("./api-routes");
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true});


function verifyToken(req, res, next) {
    let KEY = '1010123'
    const thisDay = new Date()
    KEY = KEY + thisDay.getMinutes().toString() + thisDay.getDay().toString()
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        req.token = bearerHeader;
        if (req.token === KEY) {
            next();
        } else {
            // Forbidden
            res.sendStatus(403);
        }
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

// Send message for default URL
app.get('/', (req, res) => {
    res.send('Hello Duded, Math Here ...')
});


// Use Api routes in the App
app.use('/api', verifyToken, apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running API on port " + port);
});