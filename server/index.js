const express = require('express');
const app = express();
const router = require('./router.js');
require('dotenv').config();

const port = process.env.PORT;

app.use(express.json());
app.use('/api', router);

app.listen(port, (err) => {

  err ? console.log('not connected to server') :
   console.log(`connected on port ${port}`)
});
