'use strict';

const processSurvey = async (type) => Object.values((await strapi.db.connection.context.raw(`
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
  `)).reduce((i, {question:q, response:r, count:c})=>{ // Formatting for vis.
    i[q] = {question: q, ...i[q], [r]: c }; return i; }, {}));

const studentCompletion = async () => await strapi.db.connection.context.raw(`
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
  `)

const quizData = async () => {
  const raw = await strapi.db.connection.context.raw(`
    SELECT
      l.quiz_id,
      c.id,
      q.description,
      c.results as results
    FROM
      components_completion_completions_quiz_links AS l
    INNER JOIN
      components_completion_completions AS c ON completion_id=c.id
    INNER JOIN
      quizzes AS q ON quiz_id=q.id
  `)
  let result = {};
  raw.forEach((quiz) => {
    let quizId = "quiz"+quiz.quiz_id;
    if(!result[quizId]) {
      result[quizId] = {};
    }
    result[quizId]["description"] = quiz.description;
    result[quizId]["totalResponses"] = (result[quizId]["totalResponses"] || 0) + 1
    JSON.parse(quiz.results).forEach((question, questionIndex) => {
      let questionId = "question"+(questionIndex+1);
      result[quizId][questionId] = (result[quizId][questionId] || 0) + (question?1:0);
      console.log(result[quizId][questionId]);
    });
  });
  return result;
};

const laFreq = async () => await strapi.db.connection.context.raw(`
    SELECT schools.lacode as id, COUNT(*) as value
    FROM app_users_school_links as l
    INNER JOIN schools ON schools.id=l.school_id
    INNER JOIN app_users ON app_users.id=l.app_user_id
    GROUP BY schools.lacode;
  `);

// StudentID, Email,
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
  let response = [];

  raw.forEach((e, i) => {
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
