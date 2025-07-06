angular.module('IndicadoresApp')
  .factory('Utils', function() {
    return {
      extraerValorSeguro: function(response) {
        const valores = Object.values(response.data);
        if (!valores.length || !Array.isArray(valores[0])) return 'Dato no disponible';

        const primerElemento = valores[0][0];
        return primerElemento && primerElemento.Valor ? primerElemento.Valor : 'Dato no disponible';
      }
    };
  });
