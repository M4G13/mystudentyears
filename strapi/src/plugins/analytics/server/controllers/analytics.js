'use strict';

const processSurvey = async (type) => {
  const raw = await strapi.db.connection.context.raw(`
    SELECT
      q.question AS question,
      opt.option AS response,
      COUNT(*) as count
    FROM
      app_users_components AS ac
    INNER JOIN
      components_survey_surveys_components AS sc ON ac.component_id=sc.entity_id
    INNER JOIN
      components_survey_survey_completions_survey_option_links AS res_opt ON sc.component_id=res_opt.survey_completion_id
    INNER JOIN
      components_survey_survey_completions_survey_question_links AS res_q ON res_opt.survey_completion_id=res_q.survey_completion_id
    INNER JOIN
      survey_questions AS q on res_q.survey_question_id=q.id
    INNER JOIN
      survey_options AS opt on res_opt.survey_option_id=opt.id
    WHERE
      ac.field='${type}'
    GROUP BY
      question, response
  `);
  const response = raw.rows?raw.rows:raw;
  return Object.values(response.reduce((i, {question:q, response:r, count:c})=>{
    i[q] = {question: q, ...i[q], [r]: c }; return i; }, {}));
  };

const studentCompletion = async () => {
  const raw = await strapi.db.connection.context.raw(`
    SELECT
      s.id AS id,
      s.name AS label,
      COUNT(*) AS value
    FROM
      students AS s
    INNER JOIN
      students_components AS sc ON sc.entity_id=s.id
    INNER JOIN
      components_category_categories_quiz_links AS ql ON ql.category_id=sc.component_id
    INNER JOIN
      components_completion_completions_quiz_links AS c ON c.quiz_id=ql.quiz_id
    GROUP BY
      s.id
    ORDER BY
      s."Order";
  `);
  return(raw.rows?raw.rows:raw);
  };

const quizData = async () => {
  const raw = await strapi.db.connection.context.raw(`
    SELECT
      q.id AS quiz_id,
      q.description,
      c.results as results
    FROM
      quizzes AS q
    LEFT OUTER JOIN
      components_completion_completions_quiz_links AS l ON l.quiz_id=q.id
    LEFT OUTER JOIN
      components_completion_completions AS c ON completion_id=c.id
  `);
  const response = raw.rows?raw.rows:raw;
  let result = {};
  response.forEach((quiz) => {
    let quizId = quiz.quiz_id;
    if(!result[quizId]) {
      result[quizId] = {};
    }
    result[quizId]["description"] = quiz.description;
    if(quiz.results) {
      result[quizId]["totalResponses"] = (result[quizId]["totalResponses"] || 0) + 1
      JSON.parse(quiz.results).forEach((question, questionIndex) => {
        let questionId = "question"+(questionIndex+1);
        result[quizId][questionId] = (result[quizId][questionId] || 0) + (question?1:0);
      });
    } else {
      result[quizId]["totalResponses"] = 0;
    }
  });
  return Object.values(result);
};

const laFreq = async () => {
  const raw = await strapi.db.connection.context.raw(`
    SELECT schools.lacode as id, COUNT(*) as value
    FROM app_users_school_links as l
    INNER JOIN schools ON schools.id=l.school_id
    INNER JOIN app_users ON app_users.id=l.app_user_id
    GROUP BY schools.lacode;
  `);
  return(raw.rows?raw.rows:raw);
}

const userDetails = async () => {
  const raw = await strapi.entityService.findMany('api::app-user.app-user', {
  populate: {
    InitialSurvey: {
      populate: {
        Completed: {
          populate: {
            survey_question: {
              populate: {
                question: true
              }
            },
            survey_option: {
              populate: {
                option: true
              }
            }
          }
        }
      }
    },
    FinalSurvey: {
      populate: {
        Completed: {
          populate: {
            survey_question: {
              populate: {
                question: true
              }
            },
            survey_option: {
              populate: {
                option: true
              }
            }
          }
        }
      }
    }
  }});
  //const response = raw.rows?raw.rows:raw;
  let response = [];

  (raw.rows?raw.rows:raw).forEach((e, i) => {
    response.push({"id":e.id, "email":e.Email});
    ["InitialSurvey", "FinalSurvey"].forEach((survey) => {
      if(e[survey]) {
        e[survey].Completed.forEach((completed, ci) => {
          response[i][survey+ci] = completed.survey_option.option;
          response[i][survey+"Question"+ci] = completed.survey_question.question;
        })
      }
    });
  });
  let converter = require('json-2-csv');

  return await converter.json2csv(response);
}


module.exports = {
  initialSurvey: async () => processSurvey('InitialSurvey'),
  finalSurvey: async () => processSurvey('FinalSurvey'),
  quizData,
  laFreq,
  studentCompletion,
  userDetails
};
