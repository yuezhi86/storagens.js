'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

var BaseStorage = /*#__PURE__*/_createClass(function BaseStorage(apiName) {
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
  _defineProperty(this, "allValues", function () {
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
    var includeExpired = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var value = JSON.parse(window[_this.apiName].getItem(_this._getKeyName(key)));
    if (value === null) return null;
    var isExpired = value.expireTime > 0 && Date.now() > value.expireTime;
    if (!includeExpired && isExpired) {
      _this.delete(key);
      return null;
    }
    return value;
  });
  _defineProperty(this, "getValue", function (key) {
    var includeExpired = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var value = _this.get(key, includeExpired);
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
    var value = _this.get(key, false);
    return value === null;
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
});
var LocalStorage = /*#__PURE__*/function (_BaseStorage2) {
  function LocalStorage(namespace) {
    _classCallCheck(this, LocalStorage);
    return _callSuper(this, LocalStorage, ["localStorage", namespace]);
  }
  _inherits(LocalStorage, _BaseStorage2);
  return _createClass(LocalStorage);
}(BaseStorage);
var SessionStorage = /*#__PURE__*/function (_BaseStorage3) {
  function SessionStorage(namespace) {
    _classCallCheck(this, SessionStorage);
    return _callSuper(this, SessionStorage, ["sessionStorage", namespace]);
  }
  _inherits(SessionStorage, _BaseStorage3);
  return _createClass(SessionStorage);
}(BaseStorage);

exports.LocalStorage = LocalStorage;
exports.SessionStorage = SessionStorage;
