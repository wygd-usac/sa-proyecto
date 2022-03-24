const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');
const context = '/esb/client';
const router = require('./rutas/router');

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ extended: true, limit: '10mb' }));
app.use(context, router);
app.listen(port, () => console.log(`${port}...`));