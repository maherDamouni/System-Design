const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({

  user: process.env.PGUSER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PW,
  port: process.env.DBPORT
 })

 pool.connect((err) => {

   err ? console.error(err) : console.log('conencted to the elephant')
 })

 module.exports = pool;