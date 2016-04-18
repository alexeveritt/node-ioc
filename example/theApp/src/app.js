// call any modules that do not use DI
var theLib = require('aLibrary');

// call any modules using DI
require = require('IoC').req;
var test = require('Interfaces/ITest');

// Do app stuff
module.exports = {
    doStuff: doStuff
};

function doStuff() {
    test.func1();
    test.func2();
    console.log(test.name);

    // call a library that also uses the DI
    theLib.something();
}