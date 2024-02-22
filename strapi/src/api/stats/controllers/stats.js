'use strict';

async function processSurvey(type) {
  const entries = await strapi.entityService.findMany('api::app-user.app-user', {
    populate: {
      [type]: {
        populate: '*',
        Completed: {
          populate: '*',
        }
      }
    }
  });

  let result = [];
  entries.forEach((e) => { // Quite inefficient, test if it can handle lots of entries
    if (e[type]) {
      let questions = e[type].Completed;
      questions.forEach((q,i) => {
        let dict = result[i] || {question: i+1};
        dict[q.answer] = (dict[q.answer] || 0) +1;
        result[i] = dict;
      });
    }
  });

  return result;

}

async function processQuiz() {
  const entries = await strapi.entityService.findMany('api::app-user.app-user', {
    populate: {
      CompletedQuizzes: {
        populate: '*',
      }
    }
  });
  let result = [];
  entries.forEach((e) => {
    e.CompletedQuizzes.forEach((q) => {
      let dict = result[q.quiz.id] || {quiz: q.quiz.description};
      dict['numResponses'] = (dict['numResponses'] || 0) +1;
      let thisScore = q.results.reduce((i,j) => i+j, 0);
      dict['avgScore'] = (dict['avgScore'] || 0) + thisScore/dict['numResponses'];
      result[q.quiz.id] = dict;
    });
  });
  return result;
}

module.exports = {
  initialSurvey: async () => processSurvey('InitialSurvey'),
  finalSurvey: async () => processSurvey('FinalSurvey'),
  quizData: processQuiz,
};
