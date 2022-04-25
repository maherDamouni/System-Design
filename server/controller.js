const pool = require('../postgresDB/index.js');
// const db = require('../mongoDB/index.js');

controller = {

  getAll: (req, res) => {

    const queryString =

      `SELECT json_agg(
      json_build_object(
        'question_id', questions.question_id,
        'question_body', questions.question_body,

        'asker_name', questions.asker_name,
        'reported', questions.reported,
        'question_helpfulness', questions.question_helpfulness,
        'answers', (SELECT json_object_agg(
          answers.id, json_build_object(
            'id', answers.id,
            'question_id', answers.question_id,
            'body', answers.body,
            'question_date', to_timestamp(questions.question_date/ 1000),
            'answerer_name', answers.answerer_name,
            'reported', answers.reported,
            'helpfulness', answers.helpfulness,
            'photos', (SELECT json_agg(
              photos.photo_url
            ) FROM photos WHERE photos.answer_id = answers.id)
          )
        ) FROM answers WHERE answers.question_id = questions.question_id)
      )
    ) AS results FROM questions WHERE questions.product_id = ${req.query.product_id}`

    pool.query(queryString, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {

        res.send(results.rows)
      }
    });
  },

  // posting and updating will be handled by the main database. copy databases will be updated upon posting.

  // 'question_date', to_timestamp(questions.question_date/ 1000)
  // 'date', to_timestamp(answers.date/ 1000),

  questions: {

    postQuestion: (req, res) => {

      //needs work

      console.log('in question post', req.body)
      const queryString =

        `INSERT INTO questions
      (question_body, asker_name, asker_email, product_id)
      VALUES
      (?, ?, ?, ?),
      ['${req.body.body}', '${req.body.name}', '${req.body.email}', '${req.body.product_id}']`

      // ("${req.body.body}", "${req.body.name}", "${req.body.email}", "${req.body.product_id}")

      pool.query(queryString, (err, results) => {
        if (err) {
          console.log(results)
          res.status(401).send(err)
        } else {
          res.status(201).send('question posted')
        }
      });
    },

    reportQuestion: (req, res) => {

      const queryString =

        `UPDATE questions
      SET reported = true
      WHERE question_id = ${req.query.question_id}`

      pool.query(queryString, (err, results) => {
        if (err) {
          res.status(404).send(err)
        } else {
          res.status(204).send('question reported')
        }
      });
    },

    helpfulQuestion: (req, res) => {

      const queryString =

        `UPDATE questions
      SET question_helpfulness = question_helpfulness + 1
      WHERE question_id = ${req.query.question_id}`

      pool.query(queryString, (err, results) => {
        if (err) {
          res.status(404).send(err)
        } else {
          res.status(204).send('helpful question')
        }
      });
    }

  },

  answers: {

    postAnswer: (req, res) => {

      //needs work

      console.log('in answer post', req.body)
      const queryString =

        `INSERT INTO answers
        (body, answerer_name, answerer_email, photos)
        VALUES
        (?, ?, ?, ?),
        ['${req.body.body}', '${req.body.name}', '${req.body.email}', '${req.body.product_id}']`

      pool.query(queryString, (err, results) => {
        if (err) {
          console.log(results)
          res.status(401).send(err)
        } else {
          res.status(201).send('question posted')
        }
      });
    },

    reportAnswer: (req, res) => {

      const queryString =

        `UPDATE answers
      SET reported = true
      WHERE id = ${req.query.answer_id}`

      pool.query(queryString, (err, results) => {
        if (err) {
          res.status(404).send(err)
        } else {
          res.status(204).send('answer reported')
        }
      });
    },

    helpfulAnswer: (req, res) => {

      const queryString =

        `UPDATE answers
      SET helpfulness = helpfulness + 1
      WHERE id = ${req.query.answer_id}`

      pool.query(queryString, (err, results) => {
        if (err) {
          res.status(404).send(err)
        } else {
          res.status(204).send('helpful answer')
        }
      });
    }

  }
}

// module.exports = controller;
module.exports = controller;
// module.exports = db;