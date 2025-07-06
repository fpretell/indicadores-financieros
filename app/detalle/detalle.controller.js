angular.module('IndicadoresApp')
  .controller('DetalleController', function($scope, $routeParams, $location, IndicadoresService, Utils) {
    const id = $routeParams.id;
    const definido = IndicadoresService.getIndicadoresDefinidos().find(i => i.id === id);

    if (!definido) return;

    $scope.indicador = {
      id: definido.id,
      label: definido.label,
      unidad: definido.unidad,
      valor: '...',
      fecha: ''
    };

    const queryFecha = $location.search().fecha;

    // Si hay una fecha en el query param y es un indicador diario
    if (queryFecha && ['uf', 'dolar', 'euro'].includes(id)) {


      const [dia, mes, anio] = queryFecha.split('-');

      IndicadoresService.obtenerPorFecha(id, anio, mes, dia)
        .then(response => {
          const raw = Object.values(response.data)[0];
          if (raw && raw[0] && raw[0].Valor) {
            $scope.indicador.valor = raw[0].Valor;
            $scope.indicador.fecha = raw[0].Fecha;
          } else {
            $scope.indicador.valor = 'No disponible';
          }
        }).catch(() => {
          $scope.indicador.valor = 'Error al obtener valor';
        });
    } else {
      // Si no hay fecha, mostrar el valor actual
      IndicadoresService.obtenerIndicador(definido.id).then(response => {
        const valor = Utils.extraerValorSeguro(response);
        $scope.indicador.valor = valor;
      });
    }

    // Cargar historial para el gráfico
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');

    let promesa;
    if (['uf', 'dolar', 'euro'].includes(id)) {
      promesa = IndicadoresService.obtenerHistorial(id, anio, mes);
    } else if (['ipc', 'utm'].includes(id)) {
      promesa = IndicadoresService.obtenerHistorialAnual(id, anio);
    }

    promesa.then(response => {
      const raw = Object.values(response.data)[0];

      let datos = raw;
      if (['uf', 'dolar', 'euro'].includes(id)) {
        datos = raw.slice(0, 10);
      } else if (['ipc', 'utm'].includes(id)) {
        datos = raw.slice(0, 12);
      }

      const fechas = datos.map(d => d.Fecha).reverse();
      const valores = datos.map(d => parseFloat(d.Valor.replace(',', '').replace('.', '').replace(',', '.'))).reverse();

      setTimeout(() => {
        const ctx = document.getElementById('graficoDetalle');
        if (ctx) {
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: fechas,
              datasets: [{
                label: 'Valor',
                data: valores,
                borderColor: '#007bff',
                fill: false,
                tension: 0.3
              }]
            },
            options: {
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: false } }
            }
          });
        }
      }, 100);
    });
  });
