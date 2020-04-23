const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

require('./controllers/authController')(app);


app.listen(3000);