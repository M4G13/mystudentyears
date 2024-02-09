module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/students',
      handler: 'student.populateDeep',
      config: {
        auth: false
      }
    }
  ]
};
