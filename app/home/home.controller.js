angular.module('IndicadoresApp')
  .controller('HomeController', function($scope, IndicadoresService, Utils) {
    $scope.indicadores = [];

    const definidos = IndicadoresService.getIndicadoresDefinidos();

    definidos.forEach(item => {
      IndicadoresService.obtenerIndicador(item.id).then(response => {
        const valor = Utils.extraerValorSeguro(response);

        $scope.indicadores.push({
          id: item.id,
          label: item.label,
          valor: valor,
          unidad: item.unidad,
        });
      }).catch(error => {
        console.error(`Error al obtener ${item.label}:`, error);
        $scope.indicadores.push({
          id: item.id,
          label: item.label,
          valor: 'Error',
          unidad: 'Unidad',
        });
      });
    });
  });
