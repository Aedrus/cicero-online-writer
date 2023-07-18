// Entrypoint for our node server.
// ====================================
// 1. Library imports
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Document = require('./models/documentModel');

// 1.5 Route Imports
const pages = require('./routes/documents');
const users = require('./routes/users');

// 2. Create an Express server application.
const app = express();

// 3. Parses body content (data) of incoming request and attach it to "req" object as json. Also we include cors as middleware here.
app.use(express.json());
app.use(cors());

// 3.5 Include routers in our server.
app.use('/users', users);
app.use('/documents', pages);

// 4. Use mongoose to connect to our database. Start our server app by creating a port listener
// only if we are connected to our database.
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => console.log('Node App running on port 3000.'))
  })
  .catch((error) => console.log("Could not connect to database: " + error));
