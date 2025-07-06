describe('IndicadoresService', function() {
  var IndicadoresService, $httpBackend, config;

  // 1. Cargamos el módulo principal
  beforeEach(module('IndicadoresApp'));

  // 2. Mockeamos el $templateRequest para evitar que cargue vistas como home.html
  beforeEach(module(function($provide) {
    $provide.decorator('$templateRequest', function() {
      return function() {
        return {
          then: function() {}
        };
      };
    });
  }));

  // 3. Inyectamos dependencias
  beforeEach(inject(function(_IndicadoresService_, _$httpBackend_, _config_) {
    IndicadoresService = _IndicadoresService_;
    $httpBackend = _$httpBackend_;
    config = _config_;
  }));

  // 4. Test
  it('debería construir correctamente la URL para obtener un indicador', function() {
    const mockResponse = {
      Dolares: [{ Valor: '900,12', Fecha: '2025-07-01' }]
    };

    const expectedUrl = `https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar?apikey=${config.apiKey}&formato=json`;

    $httpBackend.expectGET(expectedUrl).respond(200, mockResponse);

    IndicadoresService.obtenerIndicador('dolar').then(function(response) {
      expect(response.data.Dolares[0].Valor).toBe('900,12');
    });

    $httpBackend.flush();
  });

  // 5. Limpieza
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});
