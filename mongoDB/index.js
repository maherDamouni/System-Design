
let questionSchema = new mongoose.Schema({

  question_id: { type: Number, unique: true }
  question_body: String,
  question_date: Number,
  asker_name: String,
  question_helpfulness: Number,
  reported: {
    type: Boolean,
    default: false,
  },
  product_id: {
    type: Number,
    required: true
  }
});

let answerSchema = new mongoose.Schema({

  answer_id: { type: Number, unique: true },
  answer_body: String,
  answer_date: Date,
  answerer_name: String,
  reported: {
    type: Boolean,
    default: false,
  },
  answer_helpfulness: Boolean,
  photos: Array
  questions_id: {
    type: Number,
    required: true
  }
});