var container = new Container();
var _interfaces = null;

module.exports = {
    init: init,
    container: container,
    req: require
};

function init(interfaceDefs) {
    _interfaces = interfaceDefs;
}

function Container() {
    var _this = this;
    _this.moduleCache = {};
}

Container.prototype.register = register;
Container.prototype.resolve = resolve;
Container.prototype.remove = remove;
Container.prototype.has = has;
Container.prototype.replace = replace;

function register(interfaceName) {
    var _this = this;
    interfaceName = getInterfaceName(interfaceName);
    if (_this.has(interfaceName)) {
        throw new Error('Module already registered')
    }

    return {
        as: function(moduleInstance) {
            if (!validate(interfaceName, moduleInstance)) {
                throw new Error('Module does not match expected interface');
            }

            _this.moduleCache[interfaceName] = moduleInstance;
        }
    };
}

function replace(interfaceName) {
    var _this = this;
    interfaceName = getInterfaceName(interfaceName);
    _this.remove(interfaceName)

    return {
        as: function(moduleInstance) {
            if (!validate(interfaceName, moduleInstance)) {
                throw new Error('Module does not match expected interface');
            }

            _this.moduleCache[interfaceName] = moduleInstance;
        }
    };
}

function has(interfaceName) {
    var _this = this;
    interfaceName = getInterfaceName(interfaceName);
    var instance = _this.moduleCache[interfaceName];
    return (typeof instance !== 'undefined');
}

function remove(interfaceName) {
    var _this = this;
    interfaceName = getInterfaceName(interfaceName);
    delete _this.moduleCache[interfaceName];
}

function resolve(interfaceName) {
    var _this = this;
    interfaceName = getInterfaceName(interfaceName);
    var instance = _this.moduleCache[interfaceName];
    if (typeof instance === 'undefined') {
        throw new Error('unable to locate instance associated with ' + moduleName);
    }

    return instance;
}

function require(moduleName) {
    var _this = this;
    return _this.resolve(moduleName);

}

function validate(interfaceName, instance) {
    var interfaceObj = getInterface(interfaceName);
    var interfaceKeys = Object.keys(interfaceObj);
    var interfaceValid = true;

    interfaceKeys.forEach(function(key) {
        if (typeof instance[key] !== typeof interfaceObj[key]) {
            interfaceValid = false;
        }
    });

    return interfaceValid;
}

function getInterfaceName(interfaceName) {
    if (typeof interfaceName === 'undefined' || interfaceName === null) {
        interfaceName = '';
    }

    interfaceName = interfaceName.trim();

    if (interfaceName.length === 0) {
        throw new Error('Interface name missing');
    }

    var slashPos = interfaceName.lastIndexOf('/');

    if (slashPos > 0) {
        // this is a path to an interface object
        // extract the interface title from the path
        interfaceName = interfaceName.substr(slashPos + 1);
        if (interfaceName.length === 0) {
            throw  new Error('Unable to determine interface name from ' + moduleName)
        }
    }
}

function getInterface(interfaceName) {
    return _interfaces[interfaceName];
}