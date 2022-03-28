const express = require('express');
const app = express();
const mysql = require('mysql');
const conexion = require('express-myconnection');
require('dotenv').config();
const port = process.env.PORT || 5002;
const cors = require('cors');
const context = '/administracion';
const router = require('./rutas/router');

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ extended: true, limit: '10mb' }));
app.use(context, router);

app.listen(port, () => console.log(`${port}...`));