DROP TABLE IF EXISTS Answers;
DROP TABLE IF EXISTS Questions;
DROP TABLE IF EXISTS Photos;

-- ---
-- Table 'Answers'
-- ---

CREATE TABLE Answers (
  id SERIAL NOT NULL,
  question_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date BIGINT NOT NULL,
  answerer_name VARCHAR(50) NOT NULL,
  answerer_email VARCHAR(50) NOT NULL,
  reported BOOLEAN DEFAULT 'false',
  helpfulness INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE INDEX Answers_index ON Answers (id);
CREATE INDEX Answers_Questions_index ON Answers (question_id);

\COPY Public.Answers FROM 'postgresDB/csv/answers.csv' DELIMITER ',' CSV HEADER;

-- ---
-- Table 'Questions'
-- ---

CREATE TABLE Questions (
  question_id SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date BIGINT NOT NULL,
  asker_name VARCHAR(50) NOT NULL,
  asker_email VARCHAR(50) NOT NULL,
  reported BOOLEAN DEFAULT 'false',
  question_helpfulness INT NOT NULL DEFAULT 0,
  PRIMARY KEY (question_id)
);

CREATE INDEX Questions_index ON Questions (question_id);
CREATE INDEX Product_index ON Questions (product_id);

\COPY Public.Questions FROM 'postgresDB/csv/questions.csv' DELIMITER ',' CSV HEADER;

-- ---
-- Table 'Photos'
-- ---

CREATE TABLE Photos (
  photo_id SERIAL NOT NULL,
  answer_id INTEGER NOT NULL,
  photo_url VARCHAR(200) NOT NULL,
  PRIMARY KEY (photo_id)
);

CREATE INDEX Photo_index ON Photos (photo_id);
CREATE INDEX Photo_Answers_index ON Photos (answer_id);

\COPY Public.Photos FROM 'postgresDB/csv/answers_photos.csv' DELIMITER ',' CSV HEADER;

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE Answers ADD FOREIGN KEY (question_id) REFERENCES Questions (question_id);
-- ALTER TABLE PHOTOS ADD FOREIGN KEY (answer_id) REFERENCES Answers (id);

-- ALTER TABLE questions ALTER COLUMN question_date TYPE TIMESTAMP WITHOUT TIME ZONE USING to_timestamp(question_date) AT TIME ZONE 'UTC';
-- ALTER TABLE questions ALTER COLUMN question_date set DEFAULT CURRENT_TIMESTAMP;

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Answers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Questions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Answers` (`id`,`body`,`helpfulness`,`answer_reported`,`answerer_name`,`photos`,`answer_time`,`question_id`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `Questions` (`question_id`,`question_body`,`question_helpfulness`,`asker_name`,`question_date`,`reported`,`product_id`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Product` (`product_id`) VALUES
-- ('');