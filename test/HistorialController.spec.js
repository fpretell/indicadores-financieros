describe('HistorialController', function() {
  var $controller, $rootScope, $scope, $routeParams, IndicadoresService;

  beforeEach(module('IndicadoresApp'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _IndicadoresService_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    IndicadoresService = _IndicadoresService_;

    $scope = $rootScope.$new();

    // 🔧 Simulamos el parámetro de ruta
    $routeParams = { id: 'dolar' };

    $controller('HistorialController', {
      $scope: $scope,
      $routeParams: $routeParams,
      IndicadoresService: IndicadoresService,
      Utils: {
        extraerValorSeguro: function () { return '900,00'; }
      }
    });
  }));

  it('debería definir el indicador en el scope', function() {
    expect($scope.indicador).toBeDefined();
    expect($scope.indicador.id).toBe('dolar');
  });
});
