// app.js
const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const serverless = require('serverless-http'); // ✅ Import this

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// Load all routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

db(); // ✅ DB connected

module.exports = serverless(app); // ✅ Wrap and export
