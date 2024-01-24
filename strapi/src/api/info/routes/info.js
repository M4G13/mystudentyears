'use strict';

/**
 * info router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::info.info', {
  only: ['find', 'findOne'],
  config: {
    find: {
      auth: false,
    },
    fingOne: {
      auth: false,
    },
  },
});
