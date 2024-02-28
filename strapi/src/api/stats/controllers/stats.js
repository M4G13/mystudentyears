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

const processQuiz = async () => await strapi.db.connection.context.raw(`
    SELECT
      l.quiz_id,
      q.description,
      AVG(
        (LENGTH(c.results) - LENGTH(REPLACE(c.results, 'true', '')))*1.0 /
        LENGTH('true'))
      AS avg_score
    FROM
      components_completion_completions_quiz_links AS l
    INNER JOIN
      components_completion_completions AS c ON completion_id=c.id
    INNER JOIN
      quizzes AS q ON quiz_id=q.id
    GROUP BY
      l.quiz_id;
  `);

const laFreq = async () => await strapi.db.connection.context.raw(`
    SELECT schools.lacode as id, COUNT(*) as value
    FROM app_users_school_links as l
    INNER JOIN schools ON schools.id=l.school_id
    INNER JOIN app_users ON app_users.id=l.app_user_id
    GROUP BY schools.lacode;
  `);

module.exports = {
  initialSurvey: async () => processSurvey('InitialSurvey'),
  finalSurvey: async () => processSurvey('FinalSurvey'),
  quizData: processQuiz,
  laFreq: laFreq,
};
