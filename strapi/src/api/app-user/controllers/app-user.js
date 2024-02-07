'use strict';

/**
 * app-user controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::app-user.app-user', ({ strapi }) => ({
  async update(ctx) {
    const entry = await strapi.entityService.findMany('api::app-user.app-user', {
      filters: {
        UUID: {
          $eq: ctx.request.params.UUID
        }
      }
    });
    ctx.request.params.id = entry[0].id;
    return super.update(ctx);
  }
}));
