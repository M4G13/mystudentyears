module.exports = {
  fetchSchools: {
    task: ({ strapi }) => {
      strapi.service('api::school.school').fetchSchools();
    },
    options: {
      rule: "0 0 0 1 */3 *",
    },
  },
};
