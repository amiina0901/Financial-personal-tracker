const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const { db } = require('./db/db');


const app = express();

require('dotenv').config();

const PORT = process.env.PORT //|| 5000; 

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

const server = async () => {
   try {
     if (!process.env.MONGO_URL) {
       throw new Error('MONGO_URL is not defined in the environment variables.');
     }

     db()
    app.listen(PORT, () => {
      console.log('Server is running on port:', PORT);
    });
   } catch (error) {
     console.error('Error starting the server:', error.message);
   }
};

server();
