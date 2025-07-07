angular.module('IndicadoresApp')
  .controller('HistorialController', function($scope, $routeParams, $location, IndicadoresService, Utils) {
    const id = $routeParams.id;
    const definido = IndicadoresService.getIndicadoresDefinidos().find(i => i.id === id);

    if (!definido) return;

    $scope.indicador = definido;
    $scope.loading = true;
    $scope.error = false;
    $scope.indicadorId = id;
    $scope.indicadorNombre = definido.label

    let promesa;
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    

    if (['dolar', 'euro', 'uf'].includes(id)) {
      promesa = IndicadoresService.obtenerHistorial(id);
    } else if (['ipc', 'utm'].includes(id)) {
      promesa = IndicadoresService.obtenerHistorialAnual(id, anio);
    }

    promesa
      .then(function(response) {
        const raw = Object.values(response.data)[0];
        raw.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha)); // Orden descendente por fecha
        $scope.datos = raw.map(item => ({
          fecha: item.Fecha,
          valor: item.Valor
        }));
      })
      .catch(function(error) {
        console.error("Error al cargar historial:", error);
        $scope.error = true;
      })
      .finally(function() {
        $scope.loading = false;
      });

    // ✅ Función para redirigir al detalle con fecha
    $scope.verDetalle = function(indicadorId, item) {
      const fechaISO = item.fecha.split('-').reverse().join('-'); // "dd-mm-yyyy" → "yyyy-mm-dd"
      $location.path('/detalle/' + indicadorId).search({ fecha: fechaISO });
    };
  });
