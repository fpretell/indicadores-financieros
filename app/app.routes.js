angular.module('IndicadoresApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeController'
      })
      .when('/detalle/:id', {
        templateUrl: 'app/detalle/detalle.html',
        controller: 'DetalleController'
      })
      .when('/historial/:id', {
        templateUrl: 'app/historial/historial.html',
        controller: 'HistorialController'
      })
      .otherwise({ redirectTo: '/' });
  });
