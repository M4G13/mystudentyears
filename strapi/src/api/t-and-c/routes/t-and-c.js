'use strict';

/**
 * t-and-c router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::t-and-c.t-and-c', {
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
