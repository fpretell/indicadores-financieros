# Indicadores Financieros - AngularJS App

Aplicación desarrollada con AngularJS 1.7 y Bootstrap, que consume la API pública de la CMF Chile para mostrar indicadores como Dólar, Euro, UF, UTM e IPC.

---

## 🚀 Instalación y ejecución

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repo>
   cd indicadores
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Ejecutar tests unitarios:
   ```bash
   npm test
   ```

---

## 📁 Estructura del proyecto

```
indicadores/
├── app/
│   ├── home/
│   ├── detalle/
│   ├── historial/
│   ├── services/
│   ├── shared/
│   └── config/
├── test/
├── index.html
├── karma.conf.js
└── README.md
```

---

## ✅ Buenas prácticas aplicadas

- Separación por responsabilidades: controladores, servicios y utilidades.
- Uso de `$http` en `IndicadoresService` para encapsular la lógica de consumo de API.
- Organización modular por funcionalidad.
- Componentes reutilizables planificados.
- Configuración de pruebas unitarias con Jasmine y Karma.

---

## ⚠️ Consideraciones

### 🔐 Clave API expuesta
La clave API está incluida directamente en `config.js` **porque no se desarrolló un backend** en esta versión. Es una decisión aceptada **solo para fines demostrativos**.  
En producción se recomienda:

- Usar un backend que oculte la clave.
- Usar variables de entorno (`.env`) del lado servidor.

### 📦 Organización y evolución

- Considerar una carpeta `components/` si se agregan partes reutilizables visualmente.
- AngularJS 1.5+ permite usar `.component()` para definir componentes de forma más moderna y encapsulada. Es una buena práctica para mejorar escalabilidad.

---

## 📊 Funcionalidades

- Home: muestra valores actuales de indicadores.
- Historial: muestra datos de los últimos 30 días o 12 meses, según el indicador.
- Detalle: visualización con gráfico y datos diarios.
- Navegación clara, diseño responsivo con Bootstrap.

---

## 🧪 Testing

- Tests unitarios con Jasmine.
- Cobertura para servicios (`IndicadoresService`) y controladores (`Home`, `Historial`, `Detalle`).

---

## 🛠 Dependencias

- AngularJS 1.7
- Bootstrap 3
- Chart.js
- Karma + Jasmine

---

## ✍ Autor

Desarrollado como proyecto de prueba/demostración con buenas prácticas (fpretellmdz@gmail.com).
