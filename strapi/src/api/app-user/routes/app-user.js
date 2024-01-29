'use strict';

/**
 * app-user router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::app-user.app-user', {
  only: ['create'],
  config: {
    create: {
      auth: false,
    },
  },
});
