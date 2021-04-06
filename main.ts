import express from 'express'
const cors = require("cors");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
const port = process.env.PORT; 
const www = process.env.WWW || './public';

var corsOptions = {
    credentials: true,
    origin: "*"
  };

// Middelware
app.use(express.static(www));
app.use(cors(corsOptions));
app.use(cookieParser())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`listening on http://localhost:${port}`));