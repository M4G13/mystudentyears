module.exports = {
  routes : [
    {
      method: 'GET',
      path: '/stats/initialSurvey',
      handler: 'stats.initialSurvey',
    },
    {
      method: 'GET',
      path: '/stats/finalSurvey',
      handler: 'stats.finalSurvey',
    },
  ]
}
