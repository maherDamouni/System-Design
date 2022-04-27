const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/qa/questions')
  .get(controller.getAll)
  .post(controller.questions.postQuestion)

router
  .route('/qa/questions/:question_id/answers')
  .post(controller.answers.postAnswer)

router
  .route('/qa/question/:question_id/helpful')
  .put(controller.questions.helpfulQuestion)

router
  .route('/qa/question/:question_id/report')
  .put(controller.questions.reportQuestion)

router
  .route('/qa/answers/:answer_id/helpful')
  .put(controller.answers.helpfulAnswer)

router
  .route('/qa/answers/:answer_id/report')
  .put(controller.answers.reportAnswer)

module.exports = router;