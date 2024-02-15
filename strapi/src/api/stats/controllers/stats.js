'use strict';

const processSurvey = async (type) => (await strapi.db.connection.context.raw(`
    SELECT
      cs."order" AS question,
      cm.answer AS response,
      COUNT(*) as count
    FROM
      app_users_components AS ac
    INNER JOIN
      components_survey_surveys_components AS cs ON ac.component_id=cs.entity_id
    INNER JOIN
      components_survey_survey_completions AS cm ON cs.component_id=cm.id
    WHERE
      ac.field='${type}'
    GROUP BY
      cs."order", cm.answer
  `)).reduce((i,{question:q, response:r, count:c})=>{ // Formatting for vis.
    i[q-1] = {question: q, ...i[q-1], [r]: c }; return i; }, []);

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

module.exports = {
  initialSurvey: async () => processSurvey('InitialSurvey'),
  finalSurvey: async () => processSurvey('FinalSurvey'),
  quizData: processQuiz,
};
