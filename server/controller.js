const pool = require('../postgresDB/index.js');
// const db = require('../mongoDB/index.js');

// controller = {

  // getAll: {

  // this needs database scaling. create copy databases alternating requests to each database.

  //   gets questions answers and photos based on product id and
  //   returns that data in a specific format.
  //   an array of objects(questions)
  //   inside those objects a key called answers set to an object.
  //   inside that object is a key called photos set to an array.
  // }

//   questions: {

  // post question to question table
  // updates reported to be true
  // updates helpfulness by adding 1
//   },

//   answers: {

  // posts answer to answer table
    //posts photos to photos table
  // updates reported to be true
  // updates helpfulness by adding 1

//   },
// }

// module.exports = controller;
module.exports = pool;
// module.exports = db;