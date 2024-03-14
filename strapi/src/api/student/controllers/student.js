module.exports = {
  async populateDeep() {
    return await strapi.entityService.findMany('api::student.student', {
      sort: 'Order',
      'populate': {
        'image': true,
        'category': {
          'populate': {
            'information': {
              'populate': {
                'pages': {
                  'populate': '*'
                }
              }
            },
            'quiz': {
              'populate': {
                'questions': {
                  'populate': '*'
                }
              }
            }
          }
        }
      }
    });
  }
};
