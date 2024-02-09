'use strict';

/**
 * app-user controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::app-user.app-user', ({ strapi }) => ({
  async update(ctx) {
    const entry = (await strapi.entityService.findMany('api::app-user.app-user', {
      filters: {
        UUID: {
          $eq: ctx.request.params.UUID
        }
      },
      populate: {
        CompletedQuizzes: {
          populate: 'quiz'
        }
      }
    }))[0];

    // fix this shit (strapi moment)
    entry.CompletedQuizzes?.forEach(cq => {
      if (ctx.request.body.data.CompletedQuizzes?.find(newcq => newcq.quiz !== cq.quiz.id)) {
        ctx.request.body.data.CompletedQuizzes?.push({
          quiz: cq.quiz.id,
          results: cq.results
        })
      }
    })

    ctx.request.params.id = entry.id;

    return super.update(ctx);
  }
}));
