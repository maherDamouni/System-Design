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
     console.error(err)
   } else {
     console.log('connected to the elephant')
   }
 })

 module.exports = pool;