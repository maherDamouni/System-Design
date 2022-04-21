const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sdc')
  .then(() => {
    console.log('connected to mongo')
  })
  .catch((err) => {
    console.error(err);
  })

let questionSchema = new mongoose.Schema({

  question_id: { type: Number, unique: true },
  product_id: { type: Number, required: true },
  question_body: String,
  question_date: Number,
  asker_name: String,
  asker_email: String,
  reported: { type: Boolean, default: false },
  question_helpfulness: Number
});

let answerSchema = new mongoose.Schema({

  answer_id: { type: Number, unique: true },
  questions_id: { type: Number, required: true},
  answer_body: String,
  answer_date: Date,
  answerer_name: String,
  answerer_email: String,
  reported: { type: Boolean, default: false },
  answer_helpfulness: Boolean
  // photos: Array,
});

let photoSchema = new mongoose.Schema({

  photo_id: { type: Number, unique: true },
  answer_id: { type: Number, required: true },
  photo_url: String
})

let Question = mongoose.model('Question', questionSchema);
let Answer = mongoose.model('Answer', answerSchema);
let Photo = mongoose.model('Photo', photoSchema);

module.exports.Question = Question;
module.exports.Answer = Answer;
module.exports.Photo = Photo;