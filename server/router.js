const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/getAll')
  .get(controller.getAll)

router
  .route('/questions')
  .post(controller.questions.postQuestion)
  .put(controller.questions.reportQuestion)

router
  .route('/helpfulQuestion')
  .put(controller.questions.helpfulQuestion)

router
  .route('/answers')
  // posts photos as well
  .post(controller.answers.postAnswer)
  .put(controller.answers.reportAnswer)

router
  .route('/helpfulAnswer')
  .put(controller.answers.helpfulAnswer)


module.exports = router;