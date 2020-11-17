var Service = require('node-windows').Service;

var svc = new Service({
    name:'EurekaPrinter',
    description: 'Eureka printer service',
    script: 'C:\\Users\\thiag\\Desktop\\impressao_vacina\\app.js'
});

svc.on('uninstall',function(){
    console.log('Uninstall complete.');
});
svc.uninstall();