module.exports = {
  async populateDeep() {
    return await strapi.entityService.findMany('api::student.student', {
      'populate': {
        'category': {
          'populate': {
            'information': {
              'populate': {
                'image': true
              }
            },
            'quiz': {
              'populate': {
                'questions': {
                  'populate': {
                    'options': true,
                    'image': true,
                    'answers': true
                  }
                }
              }
            }
          }
        }
      }
    });
  }
};