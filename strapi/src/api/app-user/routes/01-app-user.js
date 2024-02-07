module.exports = {
  routes: [
    {
      method: 'PUT',
      path: '/app-user/:UUID',
      handler: 'app-user.update',
    },
    {
      method: 'GET',
      path: '/app-user/:UUID',
      handler: 'app-user.findOne',
    },
  ],
};
