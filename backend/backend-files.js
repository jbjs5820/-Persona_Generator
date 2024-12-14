// File: backend/server.js

const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Rest of the server implementation...

// File: backend/.env

OPENAI_API_KEY=your_api_key_here
PORT=5000

// File: backend/package.json

{
  "name": "personas-backend",
  "version": "1.0.0",
  "description": "Backend for Personas Generator",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "openai": "^4.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}