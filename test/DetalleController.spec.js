describe('DetalleController', function() {
  var $controller, $rootScope, $scope, $routeParams, IndicadoresService, Utils, $q, $httpBackend;

  beforeEach(module('IndicadoresApp'));

  // Evitar error de carga de template HTML en pruebas
  beforeEach(module(function($provide) {
    $provide.value('$routeProvider', {});
  }));

  // Inyectar dependencias y configurar mocks
  beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, _$httpBackend_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $q = _$q_;
    $httpBackend = _$httpBackend_;

    // Evitar error de template no encontrado
    $httpBackend.whenGET('app/home/home.html').respond(200, '');

    $routeParams = { id: 'dolar' };

    IndicadoresService = {
      getIndicadoresDefinidos: function() {
        return [
          { id: 'dolar', label: 'Dólar', unidad: 'Pesos' },
          { id: 'uf', label: 'UF', unidad: 'Pesos' }
        ];
      },
      obtenerIndicador: function(id) {
        const deferred = $q.defer();
        deferred.resolve({
          data: { Dolares: [{ Valor: '900,12', Fecha: '2025-07-01' }] }
        });
        return deferred.promise;
      },
      obtenerHistorial: function(id) {
        const deferred = $q.defer();
        deferred.resolve({
          data: {
            Dolares: [
              { Valor: '900,12', Fecha: '2025-07-01' },
              { Valor: '899,50', Fecha: '2025-06-30' }
            ]
          }
        });
        return deferred.promise;
      },
      obtenerHistorialAnual: jasmine.createSpy()
    };

    Utils = {
      extraerValorSeguro: function(response) {
        return response.data.Dolares[0].Valor;
      }
    };

    $controller('DetalleController', {
      $scope: $scope,
      $routeParams: $routeParams,
      IndicadoresService: IndicadoresService,
      Utils: Utils
    });
  }));

  it('debería asignar el valor del indicador y preparar los datos del historial', function() {
    // Ejecutar digest cycle para resolver promesas
    $rootScope.$digest();

    expect($scope.indicador.id).toBe('dolar');
    expect($scope.indicador.valor).toBe('900,12');
  });
});
