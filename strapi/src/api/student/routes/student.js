'use strict';

/**
 * student router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::student.student', {
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
