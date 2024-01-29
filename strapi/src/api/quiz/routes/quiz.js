'use strict';

/**
 * quiz router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::quiz.quiz', {
  only: ['find', 'findOne'],
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
