const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000; 

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use("/", require("./router/index.js"));
app.use("/registro", require("./router/db.js"));

app.listen(port, () => {
    console.log("El servidor está corriendo en el puerto:", port);
});