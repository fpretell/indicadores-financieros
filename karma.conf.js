module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/app.module.js',
      'app/**/*.js',
      'app/shared/utils.js',
      'app/services/*.js',
      'app/home/*.js',
      'app/historial/historial.controller.js',
      'app/detalle/*.js',
      
      'test/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      'app/**/*.js': ['coverage']
    },
    reporters: ['spec', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity
  });
};