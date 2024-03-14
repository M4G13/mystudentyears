module.exports = [
  {
    method: 'GET',
    path: '/initialSurvey',
    handler: 'analytics.initialSurvey',
  },
  {
    method: 'GET',
    path: '/finalSurvey',
    handler: 'analytics.finalSurvey',
  },
  {
    method: 'GET',
    path: '/quizData',
    handler: 'analytics.quizData',
  },
  {
    method: 'GET',
    path: '/laFreq',
    handler: 'analytics.laFreq',
  },
  {
    method: 'GET',
    path: '/studentCompletion',
    handler: 'analytics.studentCompletion',
  },
  {
    method: 'GET',
    path: '/userDetails',
    handler: 'analytics.userDetails',
  },
];
