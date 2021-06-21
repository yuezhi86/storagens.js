'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var BaseStorage = function BaseStorage(apiName) {
  var _this = this;

  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  _classCallCheck(this, BaseStorage);

  _defineProperty(this, "set", function (key, value) {
    var expireTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    window[_this.apiName].setItem(_this._getKeyName(key), JSON.stringify({
      value: value,
      updateTime: Date.now(),
      expireTime: expireTime
    }));
  });

  _defineProperty(this, "all", function () {
    var storageData = window[_this.apiName];
    var keys = Object.keys(storageData);
    return keys.reduce(function (values, key) {
      if (_this._hasKey(key)) {
        values[_this._delNamespace(key)] = JSON.parse(storageData[key]);
      }

      return values;
    }, {});
  });

  _defineProperty(this, "allValue", function () {
    var all = _this.all();

    var values = {};

    for (var key in all) {
      if (!Object.prototype.hasOwnProperty.call(all, key)) continue;
      var item = all[key];

      if (item !== null) {
        values[_this._delNamespace(key)] = item.value;
      }
    }

    return values;
  });

  _defineProperty(this, "get", function (key) {
    return JSON.parse(window[_this.apiName].getItem(_this._getKeyName(key)));
  });

  _defineProperty(this, "getValue", function (key) {
    var value = _this.get(key);

    if (value === null) return null;
    return value.value;
  });

  _defineProperty(this, "has", function (key) {
    return _this._getKeyName(key) in window[_this.apiName];
  });

  _defineProperty(this, "delete", function (key) {
    window[_this.apiName].removeItem(_this._getKeyName(key));
  });

  _defineProperty(this, "clear", function () {
    Object.keys(_this.all()).forEach(function (key) {
      _this.delete(key);
    });
  });

  _defineProperty(this, "expired", function (key) {
    var value = _this.get(key);

    if (value === null) return false;
    return value.expireTime > 0 && Date.now() > value.expireTime;
  });

  _defineProperty(this, "clearExpired", function () {
    var count = 0;

    var all = _this.all();

    for (var key in all) {
      if (!Object.prototype.hasOwnProperty.call(all, key)) continue;
      var item = all[key];

      if (item !== null && item.expireTime > 0 && Date.now() > item.expireTime) {
        count++;

        _this.delete(key);
      }
    }

    return count;
  });

  _defineProperty(this, "_hasKey", function (key) {
    var regx = _this.namespace ? "^".concat(_this.namespace, "\\.") : "^".concat(key, "$");
    return new RegExp(regx).test(key);
  });

  _defineProperty(this, "_getKeyName", function (key) {
    return _this.namespace ? "".concat(_this.namespace, ".").concat(key) : "".concat(key);
  });

  _defineProperty(this, "_delNamespace", function (key) {
    var keyStr = "".concat(key);
    return _this.namespace ? keyStr.replace(new RegExp("^".concat(_this.namespace, "\\.")), "") : keyStr;
  });

  this.apiName = apiName;
  this.namespace = namespace;
};

var LocalStorage = /*#__PURE__*/function (_BaseStorage) {
  _inherits(LocalStorage, _BaseStorage);

  var _super = _createSuper(LocalStorage);

  function LocalStorage(namespace) {
    _classCallCheck(this, LocalStorage);

    return _super.call(this, "localStorage", namespace);
  }

  return LocalStorage;
}(BaseStorage);
var SessionStorage = /*#__PURE__*/function (_BaseStorage2) {
  _inherits(SessionStorage, _BaseStorage2);

  var _super2 = _createSuper(SessionStorage);

  function SessionStorage(namespace) {
    _classCallCheck(this, SessionStorage);

    return _super2.call(this, "sessionStorage", namespace);
  }

  return SessionStorage;
}(BaseStorage);

exports.LocalStorage = LocalStorage;
exports.SessionStorage = SessionStorage;
