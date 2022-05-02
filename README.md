# API-QA

## Authors
Maher Damouni - https://github.com/maherDamouni
<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/> - https://www.linkedin.com/in/maher-damouni-5a908222b/



## Stack
<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/> <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /> <img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/>

## Overview

This Systems Design Capstone project was developed during the senior phase of the Hack Reactor Software Engineering Immersive (RFP2202). Our group was tasked to implement a REST API service for an e-commerce application. This particular API service was developed for the '/qa' endpoints specifically.


## Install

```
npm install
```
change example.env to .env and configure variables.

## Run the App

```
npm start
```

## Description/API EndPoint

The API endpoints for this service are as follows:

| Method | Path    |
|--------|---------|
| GET    | '/qa/questions'  |
| POST   | '/qa/questions'  |
| POST   | '/qa/questions/:question_id/answers'  |
| PUT    | '/qa/questions/:question_id/helpful'  |
| PUT    | '/qa/questions/:question_id/report'  |
| PUT    | '/qa/answers/:answer_id/helpful'  |
| PUT    | '/qa/answers/:answer_id/report'  |

### GET /qa/questions/
Will return a list of questions and answers for specified product.

#### Parameters
| Parameter | Type    | Description                                                |
|-----------|---------|------------------------------------------------------------|
| product_id| Integer | Required - Specifies which product to return reviews for   |

#### Response
status - 200
```json
{
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": false,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [],
          }
        }
      },
      // ...
  ]
}
```


### POST /qa/questions
Will post a question for a specified product.

#### Body Parameters
| Parameter | Type    | Description                                                  |
|-----------|---------|--------------------------------------------------------------|
| body	    | text    |	Text of question being asked                                 |
| name	    | text	  | Username for question asker                                  |
| email	    | text	  | Email address for question asker                             |
| product_id|	integer	| Required ID of the Product for which the question is posted  |

#### Response
status - 201


### POST /qa/questions/:question_id/answers
Will post an answer for specified question id.

#### Parameters

| Parameter       | Type    | Description                                                |
|-----------------|---------|------------------------------------------------------------|
|question_id	    | integer |	Required ID of the question to post the answer for         |

#### Body Parameters

| Parameter       | Type    | Description                                                |
|-----------------|---------|------------------------------------------------------------|
| body	          | text	  | Text of question being asked                               |
| name	          | text	  | Username for question asker                                |
| email           |	text	  | Email address for question asker                           |
| photos	        | [text]	| An array of urls corresponding to images to display        |

#### Response
Status: 201


### PUT /qa/questions/:question_id/(helpful || report)
Updates a question to show it was found to be helpful or to be reported. Note, reporting a question does not delete it but the question will not be returned in the above GET request.

#### Route Parameters

| Parameter   | Type    | Description                           |
|-------------|---------|---------------------------------------|
| question_id | Integer | Required ID of the question to update |

#### Response
Status: 204 - No Content.


### PUT /qa/answers/:answer_id/(helpful || report)
Updates an answer to show it was found to be helpful or to be reported. Note, reporting an answer does not delete it but the answer will not be returned in the above GET request.

#### Route Parameters

| Parameter   | Type    | Description                           |
|-------------|---------|---------------------------------------|
| question_id | Integer | Required ID of the question to update |

#### Response
Status: 204 - No Content.
