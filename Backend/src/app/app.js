const express = require("express");
const bodyParser = require('body-parser');
const routes = require('../router/routes');
const morgan = require("morgan");
const app = express();
const path = require("path");
const cors = require('cors');
//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerSpec = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Node MYSQL API",
            version:"1.0.0"
        }
    },
    apis: [`${path.join(__dirname,"./router/*.js")}`]
}

app.use(bodyParser.json());
app.use(morgan("dev"));
// Configura CORS para permitir solicitudes desde cualquier origen
app.use(cors({
    origin: '*', // Permite solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));

app.use('/api', routes);
app.use('/api-doc', swaggerUi.serve,swaggerUi.setup(swaggerJsdoc(swaggerSpec)));
app.get("/", (req, res) => {
    res.send("Se ha iniciado el servidor express");
});

module.exports = app;


