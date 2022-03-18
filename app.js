const express = require('express');

require('./passport');

const app = express();

const auth = require('./routes/auth');

app.use('/auth',auth)

