module.exports = {
  routes: [
    {
      method: 'PUT',
      path: '/app-user/:UUID',
      handler: 'app-user.update',
      config: {
        auth: false,
      },
    },
  ],
};
