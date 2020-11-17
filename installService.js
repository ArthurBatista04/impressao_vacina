var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'EurekaPrinter',
  description: 'Eureka printer service',
  script: 'C:\\Users\\thiag\\Desktop\\impressao_vacina\\app.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  console.log('Install complete.');
  svc.start();
});

svc.install();