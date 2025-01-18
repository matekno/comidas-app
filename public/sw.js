// Este service worker es para mejorar la experiencia cunado no hay conexión a internet.
// Esto se consigue con estos scripts.
// https://medium.com/samsung-internet-dev/pwa-series-service-workers-los-b%C3%A1sicos-de-la-experiencia-offline-14592542c738

self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
  });
  
  self.addEventListener('fetch', (event) => {
    console.log('Interceptando solicitud:', event.request.url);
  });
  