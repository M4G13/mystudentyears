
module.exports = {
    async populateDeep() {
      return await strapi.entityService.findMany('api::category-image.category-image', {
        'populate': {
            'Pair':{
                'populate':{
                    'Image' : true
                }
            }
        }
    })
}
}