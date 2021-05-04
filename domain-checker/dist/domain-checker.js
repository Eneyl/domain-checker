function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || (/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/).test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
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
function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return fn;
}
var getTemplate = function getTemplate(_ref) {
  var title = _ref.title, _ref$url = _ref.url, url = _ref$url === void 0 ? false : _ref$url;
  var titleText = title !== null && title !== void 0 ? title : 'Domain checker API REG.RU';
  return ("\n    <form action=\"POST\" data-dc=\"form\" class=\"domain-checker__form\">\n    <fieldset class=\"domain-checker__fiedlset\">\n      <legend class=\"domain-checker__legend\">").concat(titleText, "</legend>\n      <p class=\"domain-checker__row\">\n        <label class=\"domain-checker__label\">Domain list</label>\n        <textarea\n          data-dc=\"form-control\"\n          class=\"domain-checker__form-control--textarea domain-checker__form-control\"\n          name=\"domains\"\n          placeholder=\"Enter domains\"\n        ></textarea>\n      </p>\n      \n      ").concat(!url ? "\n        <p class=\"domain-checker__row\">\n          <label class=\"domain-checker__label\">Username</label>\n          <input\n            data-dc=\"form-control\"\n            class=\"domain-checker__form-control\"\n            type=\"text\"\n            name=\"username\"\n            placeholder=\"Enter username\"\n          />\n        </p>\n\n        <p class=\"domain-checker__row\">\n          <label class=\"domain-checker__label\">Password</label>\n          <input\n            data-dc=\"form-control\"\n            class=\"domain-checker__form-control\"\n            type=\"password\"\n            name=\"password\"\n            placeholder=\"Password\"\n          />\n        </p>\n        " : '', "\n      \n      <button data-dc=\"btn-submit\" class=\"domain-checker__btn\" disabled>Submit</button>\n    </fieldset>\n  </form>\n  <p data-dc=\"result\" class=\"domain-checker__result\"></p>\n  ");
};
var getPostData = function getPostData(params) {
  var postData = [];
  for (var key in params) {
    if (params.hasOwnProperty(key)) postData.push(key + '=' + params[key]);
  }
  return postData.join('&');
};
var _render = new WeakSet();
var _setup = new WeakSet();
var DomainChecker = /*#__PURE__*/(function () {
  /**
  *
  * @param {*} selector Selector string or DOM element
  * @param {Object} options Object with settings
  * @param {String} options.url URL to request to the backend server
  * @param {String} options.title Text in legend tag
  */
  function DomainChecker(selector, options) {
    var _this = this;
    _classCallCheck(this, DomainChecker);
    _setup.add(this);
    _render.add(this);
    _defineProperty(this, "submitHandler", function (e) {
      e.preventDefault();
      _this.postRequest();
    });
    _defineProperty(this, "blurHandler", function () {
      var isFilled = _this.$formControls.length > 1 ? _this.$form.domains.value && _this.$form.username.value && _this.$form.password.value : Bool(_this.$form.domains.value);
      if (isFilled) _this.$button.removeAttribute('disabled'); else _this.$button.setAttribute('disabled', '');
    });
    this.$el = typeof selector == 'string' ? document.querySelector(selector) : selector;
    this.options = options;
    _classPrivateMethodGet(this, _render, _render2).call(this);
    _classPrivateMethodGet(this, _setup, _setup2).call(this);
  }
  _createClass(DomainChecker, [{
    key: "loginDetails",
    get: function get() {
      var url = this.options.url;
      if (!url) {
        return {
          username: this.$form.username.value,
          password: this.$form.password.value
        };
      } else {
        return {};
      }
    }
  }, {
    key: "display",
    value: function display(_ref2) {
      var result = _ref2.result, error_text = _ref2.error_text, answer = _ref2.answer;
      if (result === 'error') {
        this.$resultOutput.textContent = error_text;
        return false;
      }
      var strings = answer.domains.map(function (domain) {
        if (domain.result === 'error') {
          return ("<b>").concat(domain.dname, "</b> - ").concat(domain.error_text, ";<br/>");
        }
        if (domain.price) {
          return ("<b>").concat(domain.dname, "</b> - ").concat(domain.result, " (Стоимость в ").concat(domain.currency, " - ").concat(domain.price, ", ").concat(domain.is_premium ? 'премиум' : '', ");<br/>");
        }
        return ("<b>").concat(domain.dname, "</b> - ").concat(domain.result, ";<br/>");
      });
      this.$resultOutput.innerHTML = strings.join('');
    }
  }, {
    key: "postRequest",
    value: function postRequest() {
      var _this2 = this;
      var xhr = new XMLHttpRequest();
      var url = this.options.url;
      // From string to objects
      var domainList = this.$form.domains.value.replace(/\s/g, '').split(';').map(function (item) {
        return {
          dname: item
        };
      });
      var params = _objectSpread({
        input_format: 'json',
        output_format: 'json',
        io_encoding: 'utf8',
        input_data: JSON.stringify(_objectSpread({
          domains: _toConsumableArray(domainList)
        }, this.loginDetails)),
        show_input_params: 0
      }, this.loginDetails);
      xhr.open("POST", url !== null && url !== void 0 ? url : 'https://api.reg.ru/api/regru2/domain/check');
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          _this2.display(JSON.parse(xhr.responseText));
        }
      };
      xhr.send(getPostData(params));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;
      this.$form.removeEventListener('submit', this.submitHandler);
      this.$formControls.forEach(function (control) {
        control.removeEventListener('blur', _this3.blurHandler);
      });
    }
  }]);
  return DomainChecker;
})();
function _render2() {
  this.$el.classList.add('domain-checker');
  this.$el.innerHTML = getTemplate(this.options);
}
function _setup2() {
  var _this4 = this;
  this.$form = this.$el.querySelector('[data-dc="form"]');
  this.$form.addEventListener('submit', this.submitHandler);
  this.$resultOutput = this.$el.querySelector('[data-dc="result"]');
  this.$button = this.$form.querySelector('[data-dc="btn-submit"');
  this.$formControls = this.$form.querySelectorAll('[data-dc="form-control"]');
  this.$formControls.forEach(function (control) {
    control.addEventListener('blur', _this4.blurHandler);
  });
}