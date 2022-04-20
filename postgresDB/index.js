const { Pool } = require('pg');

const pool = new Pool({

  user: 'maherdamouni',
  host: 'localhost',
  database: 'sdc',
  password: '',
  port: 5432
 })

 pool.connect((err) => {
   if (err) {
     console.log('not connected to db')
   } else {
     console.log('connected to db')
   }
 })

 module.exports = pool;