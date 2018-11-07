const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    token : process.env.SONAR_TOKEN,
    options: {
      'sonar.projectKey': 'D3-Stencil',
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.host.url': 'http://localhost:9000',
      'sonar.login': process.env.SONAR_TOKEN,
      'sonar.sources': 'src/',
      'sonar.exclusions': 'src/*.d.ts',
      'sonar.tests': 'test/',
      'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info'
    },
  },
  () => {},
);
