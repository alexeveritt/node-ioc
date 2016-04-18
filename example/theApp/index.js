var config = require('./config');

// setup the containers
// ====================

var ioc = require('IoC');
ioc.init(require('Interfaces'));

if (config.version == 1) {
    ioc.container.register(require('./src/classes/test')).as('ITest');
} else {
    ioc.container.register(require('./src/classes/test2')).as('ITest');
}

// run the application
// ===================

var theApp = require('./src/app');

theApp.doStuff();
