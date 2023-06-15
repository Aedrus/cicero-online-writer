// Entrypoint for our node server.
// ====================================
// 1. Library imports
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
require('dotenv').config();

// 2. Create an Express server application.
const app = express();

// 3. Parses body content (data) of incoming request and attach it to "req" object as json. Also we include cors as middleware here.
app.use(express.json());
app.use(cors());

// 4. Use mongoose to connect to our database. Start our server app by creating a port listener
// only if we are connected to our database.
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(3001, () => console.log('App running on port 3001.'))
  })
  .catch((error) => console.log(error));
