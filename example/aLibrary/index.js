require = require('IoC').req;
var test = require('Interfaces/ITest');

module.exports = {
    something: something
};

function something() {
    console.log('Loading from the library');
    test.func1();
    test.func2();
    console.log(test.name);
}