'use strict';

/**
 * homepage-image router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::category-image.category-image');


module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/category-image',
        handler: 'category-image.populateDeep',
        config: {
          auth: false
        }
      }
    ]
  };
  