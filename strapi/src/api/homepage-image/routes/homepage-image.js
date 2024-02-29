'use strict';

/**
 * homepage-image router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::homepage-image.homepage-image');


module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/homepage-image',
        handler: 'homepage-image.populateDeep',
        config: {
          auth: false
        }
      }
    ]
  };
  