'use strict';

const { createCoreController } = require("@strapi/strapi").factories;

async function processSurvey(type) {
  let entries = await strapi.entityService.findMany('api::app-user.app-user', {
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

module.exports = createCoreController(
  "api::app-user.app-user",
  () => ({
    initialSurvey: async () => processSurvey('InitialSurvey'),
    finalSurvey: async () => processSurvey('FinalSurvey'),
  })
);
