const express = require("express");
const bodyParser = require('body-parser');
const routes = require('../router/routes');
//const morgan = require("morgan")

//const router = require("../router/product.router")

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

///app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.send("Se ha iniciado el servidor express");
});

//app.use(express.json())
//app.use("/api/v1", router)

module.exports = app;


