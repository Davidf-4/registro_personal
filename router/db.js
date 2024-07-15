const express=require("express")
const router= express.Router()
const mysql = require('mysql2');

// Configuración de la base de datos
const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD_DB, // Coloca tu contraseña si tienes una configurada
  database: process.env.DATABASE // Nombre de tu base de datos
};

// Crear la conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Abrir la conexión a la base de datos
connection.connect(error => {
  if (error) {
    console.error('Error connecting to database: ', error);
    return;
  }
  console.log('Connected to the database');
});

// Get all personal data
router.get('/', (req, res) => {
    connection.query(`SELECT * FROM ${process.env.TABLE}`, (err, results) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json(results);
      }
    });
  });
  
  // Get personal data by ID
  router.get('/:id', (req, res) => {
    const dataId = req.params.id;
    connection.query(`SELECT * FROM ${process.env.TABLE} WHERE id = ?`, dataId, (err, results) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (results.length === 0) {
        res.status(404).send('Personal data not found');
      } else {
        res.json(results[0]);
      }
    });
  });
  
  // Insert new personal data
  router.post('/', (req, res) => {
    const newData = req.body;
    console.log(newData)
    connection.query(`INSERT INTO ${process.env.TABLE} SET ?`, newData, (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(201).send('Personal data added successfully');
      }
    });
  });
  
  // Update personal data
  router.put('/:id', (req, res) => {
    const dataId = req.params.id;
    const updatedData = req.body;
    connection.query(`UPDATE ${process.env.TABLE} SET ? WHERE id = ?`, [updatedData, dataId], (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.send('Personal data updated successfully');
      }
    });
  });
  
  // Delete personal data
  router.delete('/:id', (req, res) => {
    const dataId = req.params.id;
    console.log(dataId)
    connection.query(`DELETE FROM ${process.env.TABLE} WHERE id = ?`, dataId, (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.send('Personal data deleted successfully');
      }
    });
  });

module.exports= router