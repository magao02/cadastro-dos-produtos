const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

require('./controllers/authController')(app);


app.listen(process.env.PORT || 3333);