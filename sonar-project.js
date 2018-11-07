const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    token : process.env.SONAR_TOKEN,
    options: {
      'sonar.sources': 'src/',
    },
  },
  () => {},
);
