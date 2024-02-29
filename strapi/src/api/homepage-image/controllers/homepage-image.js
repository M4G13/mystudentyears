
module.exports = {
    async populateDeep() {
      return await strapi.entityService.findMany('api::homepage-image.homepage-image', {
        'populate': {
            'image':true
        }
    })
}
}