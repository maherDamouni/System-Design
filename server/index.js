const express = require('express');
const app = express();
const router = require('./router.js');

const port = 3000;

app.use(express.json());
app.use('/', router);

app.listen(port, (err) => {

  if(err) {
    console.log('not connected to server')
  } else {
    console.log(`connected on port ${port}`)
  }
})
