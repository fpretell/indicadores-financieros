angular.module('IndicadoresApp')
  .factory('IndicadoresService', function($http, config) {
    const apiKey = config.apiKey;
    const baseUrl = 'https://api.cmfchile.cl/api-sbifv3/recursos_api';

    const indicadoresDefinidos = [
      { id: 'dolar', label: 'Dólar', unidad: 'Pesos' },
      { id: 'euro', label: 'Euro', unidad: 'Pesos' },
      { id: 'uf', label: 'UF', unidad: 'Pesos' },
      { id: 'utm', label: 'UTM', unidad: 'Pesos' },
      { id: 'ipc', label: 'IPC', unidad: 'Porcentaje' }
    ];

    function obtenerIndicador(indicador) {
      const url = `${baseUrl}/${indicador}?apikey=${apiKey}&formato=json`;
      return $http.get(url);
    }

    function obtenerHistorial(indicador) {
      if (!['dolar', 'euro', 'uf'].includes(indicador)) {
        throw new Error("Este método es solo para dolar, euro y uf");
      }

      const hoy = new Date();
      const hace30 = new Date();
      hace30.setDate(hoy.getDate() - 30);

      const anio = hace30.getFullYear();
      const mes = String(hace30.getMonth() + 1).padStart(2, '0');
      const dia = String(hace30.getDate()).padStart(2, '0');

      const url = `${baseUrl}/${indicador}/posteriores/${anio}/${mes}/dias/${dia}?apikey=${apiKey}&formato=json`;
      return $http.get(url);
    }

    function obtenerHistorialAnual(indicador, anio) {
      const url = `${baseUrl}/${indicador}/${anio}?apikey=${apiKey}&formato=json`;
      return $http.get(url);
    }

    function obtenerPorFecha(indicador, anio, mes, dia) {
      const url = `${baseUrl}/${indicador}/${anio}/${mes}/dias/${dia}?apikey=${apiKey}&formato=json`;
      return $http.get(url);
    }

    function getIndicadoresDefinidos() {
      return indicadoresDefinidos;
    }

    return {
      obtenerIndicador,
      obtenerHistorial,
      obtenerHistorialAnual,
      obtenerPorFecha,
      getIndicadoresDefinidos
    };
  });
