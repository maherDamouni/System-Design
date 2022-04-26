const pool = require('../postgresDB/index.js');

 // const queryString =

    //   `SELECT json_agg(
    //   json_build_object(
    //     'question_id', questions.question_id,
    //     'question_body', questions.question_body,
    //     'date', questions.date,
    //     'asker_name', questions.asker_name,
    //     'reported', questions.reported,
    //     'question_helpfulness', questions.question_helpfulness,
    //     'answers', (SELECT json_object_agg(
    //       answers.id, json_build_object(
    //         'id', answers.id,
    //         'question_id', answers.question_id,
    //         'body', answers.body,
    //         'date', answers.date,
    //         'answerer_name', answers.answerer_name,
    //         'reported', answers.reported,
    //         'helpfulness', answers.helpfulness,
    //         'photos', (SELECT json_agg(
    //           photos.photo_url
    //         ) FROM photos WHERE photos.answer_id = answers.id)
    //       )
    //     ) FROM answers WHERE answers.question_id = questions.question_id)
    //   )
    // ) AS results FROM questions WHERE questions.product_id = ${req.query.product_id}`

controller = {

  getAll: (req, res) => {

    // needs pagination

    const queryString =

      `SELECT json_agg(
      json_build_object(
        'question_id', questions.question_id,
        'question_body', questions.question_body,
        'date', questions.date,
        'asker_name', questions.asker_name,
        'reported', questions.reported,
        'question_helpfulness', questions.question_helpfulness,
        'answers', (SELECT json_object_agg(
          answers.id, json_build_object(
            'id', answers.id,
            'question_id', answers.question_id,
            'body', answers.body,
            'date', answers.date,
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

  questions: {

    postQuestion: (req, res) => {

      const queryString =

        `INSERT INTO questions
      (product_id, question_body, date, asker_name, asker_email, reported, question_helpfulness)
      VALUES
      ($1, $2, current_timestamp(0), $3, $4, false, 0) RETURNING question_id`

      const values = [req.body.product_id, req.body.body, req.body.name, req.body.email];

      pool.query(queryString, values, (err, results) => {
        if (err) {
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
          res.status(201).send('question reported')
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
          res.status(201).send('helpful question')
        }
      });
    }
  },

  answers: {

    postAnswer: (req, res) => {

      const queryString =

        `INSERT INTO answers
        (question_id, body, date, answerer_name, answerer_email, reported, helpfulness)
        VALUES
        ($1, $2, current_timestamp(0), $3, $4, false, 0)`

      const values = [req.query.question_id, req.body.body, req.body.name, req.body.email]

      pool.query(queryString, values, (err, results) => {
        if (err) {
          res.status(401).send(err)
        } else {

          const photoQuery =

            `INSERT INTO photos
          (answer_id, photo_url)
          VALUES
          ((SELECT MAX(id) FROM answers), $1)`

          const photo_values = [req.body.photos]

          pool.query(photoQuery, photo_values, (err, results) => {
            if (err) {
              res.status(401).send(err)
            } else {
              res.status(201).send('answer posted with photos')
            }
          });
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
          res.status(201).send('answer reported')
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
          res.status(201).send('helpful answer')
        }
      });
    }

  }
}

module.exports = controller;