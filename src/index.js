var container = new Container();
var interfaceDefinitions = null;

module.exports = {
    init: init,
    container: container,
    req: require
};

function init(interfaceDefs) {
    interfaceDefinitions = interfaceDefs;
}

function Container() {
    var _this = this;
    _this.moduleCache = {};
}

Container.prototype.register = register;
Container.prototype.resolve = resolve;

function register(m) {
    var _this = this;

    return {
        as: function(i) {
            if (!validate(i, m)) {
                throw new Error('arrfghh! you make bad interface');
            }

            _this.moduleCache[i] = m;
        }
    };
}

function resolve(i) {
    var _this = this;
    return _this.moduleCache[i];
}

function require(iface) {
    var interfaceName = iface.substr(iface.lastIndexOf('/') + 1);

    // all modules added to container
    return container.moduleCache[interfaceName];
}

function validate(iFace, instance) {
    var interfaceObj = interfaceDefinitions[iFace];
    var interfaceKeys = Object.keys(interfaceObj);

    var interfaceValid = true;
    interfaceKeys.forEach(function(key) {
        if (typeof instance[key] !== typeof interfaceObj[key]) {
            interfaceValid = false;
        }
    });
    return interfaceValid;

}