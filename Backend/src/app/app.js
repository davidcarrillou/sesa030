const express = require("express");
const bodyParser = require('body-parser');
const routes = require('../router/routes');
const morgan = require("morgan");
const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use('/api', routes);
app.get("/", (req, res) => {
    res.send("Se ha iniciado el servidor express");
});

module.exports = app;


