const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

require('./controllers/authController')(app);


app.listen(3000);