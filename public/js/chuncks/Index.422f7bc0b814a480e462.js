(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Index"],{

/***/ "./node_modules/@material-ui/icons/Lock.js":
/*!*************************************************!*\
  !*** ./node_modules/@material-ui/icons/Lock.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ "./node_modules/@material-ui/icons/utils/createSvgIcon.js"));

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
}), 'Lock');

exports.default = _default;

/***/ }),

/***/ "./resources/react/actions/login/authUpdate.js":
/*!*****************************************************!*\
  !*** ./resources/react/actions/login/authUpdate.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//Se crea una acción la cual será capturada
//por el reducer correspondiente.
var authUpdate = function authUpdate(payload) {
  return {
    type: "AUTH_UPDATE",
    payload: payload
  };
};

/* harmony default export */ __webpack_exports__["default"] = (authUpdate);

/***/ }),

/***/ "./resources/react/components/ShowInfoVersion.js":
/*!*******************************************************!*\
  !*** ./resources/react/components/ShowInfoVersion.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

 //Material-UI


 //Animación

var Transition = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function Transition(props, ref) {
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Slide"], _extends({
      direction: "up",
      ref: ref
    }, props))
  );
});

function ShowInfoVersion() {
  //Open
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1]; //Resolution RESPONSIVE DIALOG


  var theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["useTheme"])();
  var fullScreen = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["useMediaQuery"])(theme.breakpoints.down('xs')); //Variables

  var Dtitle = '';
  var Dcontent = '';
  var dataContent = [{
    id: 'v4.0Alpha.3',
    title: 'v4.0Alpha.3',
    content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Bienvenidos a la v4.0Alpha.3 de la p\xE1gina web")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Novedades:", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- Nueva interfaz.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- Modo oscuro.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- Mejora en la carga de la p\xE1gina.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Esta p\xE1gina se encuentra en Alpha, eso quiere decir que muchas de las funciones de la anteri\xF3r versi\xF3n no est\xE1n disponibles, si lo desea puede volver a la versi\xF3n anterior del la p\xE1gina, pero recuerde que esa versi\xF3n dejar\xE1 de tener soporte."))
  }]; //Seleccionar contenido

  dataContent.map(function (object) {
    if ('v4.0Alpha.3' === object.id) {
      Dtitle = object.title;
      Dcontent = object.content;
    }

    return null;
  }); //HANDLE

  var handleClose = function handleClose(e) {
    setOpen(false);
  };

  var handleReturn = function handleReturn(e) {
    window.location.replace("http://old.".concat("lacandelaria.com.ve"));
  };

  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Dialog"], {
      open: open,
      onClose: handleClose,
      scroll: "paper",
      fullScreen: fullScreen //Insertar animación
      ,
      TransitionComponent: Transition,
      "aria-labelledby": "info-title-dialog",
      "aria-describedby": "info-description-dialog"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogTitle"], {
      id: "info-title-dialog"
    }, Dtitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContent"], {
      dividers: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContentText"], {
      id: "info-description-dialog"
    }, Dcontent)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogActions"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      color: "secondary",
      onClick: handleReturn
    }, "Volver a la antigua versi\xF3n"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      color: "primary",
      onClick: handleClose
    }, "Entendido")))
  );
}

/* harmony default export */ __webpack_exports__["default"] = (ShowInfoVersion);

/***/ }),

/***/ "./resources/react/components/reutilizar/verifyErrorCustom.js":
/*!********************************************************************!*\
  !*** ./resources/react/components/reutilizar/verifyErrorCustom.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var verifyErrorCustom = function verifyErrorCustom(InputsArray, errorInfo, type) {
  var errorStatus = false; //Verificar datos

  InputsArray.map(function (input) {
    if (input.value.length === 0) {
      //Empty
      errorInfo(input.name, 'Campo obligatorio', type);
      errorStatus = true;
    } else if (input.minValue && input.value.length < input.minValue) {
      //No valid cédula
      errorInfo(input.name, 'No válido', type);
      errorStatus = true;
    }

    return null;
  });
  return errorStatus;
};

/* harmony default export */ __webpack_exports__["default"] = (verifyErrorCustom);

/***/ }),

/***/ "./resources/react/views/index/Form.js":
/*!*********************************************!*\
  !*** ./resources/react/views/index/Form.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_updateInputValue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/updateInputValue */ "./resources/react/actions/updateInputValue.js");
/* harmony import */ var _actions_updateLoading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/updateLoading */ "./resources/react/actions/updateLoading.js");
/* harmony import */ var _actions_errorInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/errorInfo */ "./resources/react/actions/errorInfo.js");
/* harmony import */ var _actions_login_updateDataUser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../actions/login/updateDataUser */ "./resources/react/actions/login/updateDataUser.js");
/* harmony import */ var _actions_login_authUpdate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions/login/authUpdate */ "./resources/react/actions/login/authUpdate.js");
/* harmony import */ var _RenderForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./RenderForm */ "./resources/react/views/index/RenderForm.js");
/* harmony import */ var _components_reutilizar_verifyErrorCustom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/reutilizar/verifyErrorCustom */ "./resources/react/components/reutilizar/verifyErrorCustom.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! notistack */ "./node_modules/notistack/build/index.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(notistack__WEBPACK_IMPORTED_MODULE_10__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//React
 //Redux






 //Components


 //SnackBar



function Form(_ref) {
  var updateInputValue = _ref.updateInputValue,
      updateLoading = _ref.updateLoading,
      auth = _ref.auth,
      updateDataUser = _ref.updateDataUser,
      authUpdate = _ref.authUpdate,
      dataLogin = _ref.dataLogin,
      errorInfo = _ref.errorInfo;
  //Destructing
  var user = dataLogin.user,
      pass = dataLogin.pass,
      checkbox = dataLogin.checkbox; //Crear un SnackBar

  var _useSnackbar = Object(notistack__WEBPACK_IMPORTED_MODULE_10__["useSnackbar"])(),
      enqueueSnackbar = _useSnackbar.enqueueSnackbar; //cancel


  var cancel = false;

  var handleChange = function handleChange(e) {
    // enviar input al store para actualizar states
    updateInputValue(e, 'LOGIN');
  };

  var handleSubmit = function handleSubmit(e) {
    //Preparativos
    e.preventDefault(); //Verificar datos erroneos

    var InputsArray = [{
      value: user,
      name: 'user',
      minValue: 3
    }, {
      value: pass,
      name: 'pass',
      minValue: 4
    }];
    var error = Object(_components_reutilizar_verifyErrorCustom__WEBPACK_IMPORTED_MODULE_9__["default"])(InputsArray, errorInfo, 'LOGIN'); //Verificar que estén los datos.

    if (error === true) {
      return null;
    } //Loading


    updateLoading(true, 'LOGIN'); //Consulta

    getConsult();
  };

  var getConsult = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var res, access_key, _error$response, status, data;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return axios.post('api/login', {
                user: user,
                pass: pass,
                checkbox: checkbox
              });

            case 3:
              res = _context.sent;

              if (!cancel) {
                //Al estar todo correcto el servidor DEBE regresar los
                //datos de usuario, los cuales se cargarán con
                //"updateDataUser"
                updateDataUser(_objectSpread({}, res.data));
                access_key = res.data.access_key; //Guardar el Access Key

                if (checkbox) {
                  //Datos permanentes.
                  localStorage.setItem('key', JSON.stringify(access_key));
                  sessionStorage.setItem('key', JSON.stringify(access_key));
                } else {
                  //Datos de SOLO sesión.
                  sessionStorage.setItem('key', JSON.stringify(access_key));
                } //Una vez terminado de actualizar los datos, se procede a
                //decirle a la APP que se realizó un login correctamente.


                authUpdate(true); //Add SnackBar

                enqueueSnackbar('Login exitoso', {
                  variant: 'success'
                });
              }

              _context.next = 11;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              _error$response = _context.t0.response, status = _error$response.status, data = _error$response.data;

              if (status === 400) {
                enqueueSnackbar(data.description, {
                  variant: 'warning'
                });
              } else if (status === 422) {
                enqueueSnackbar(data.description, {
                  variant: 'error'
                });
              } else if (status === 500) {
                enqueueSnackbar('No se ha podido conectar con la base de datos', {
                  variant: 'error'
                });
              } else {
                enqueueSnackbar('Error interno en el sistema', {
                  variant: 'error'
                });
              }

            case 11:
              //Cambiar Loading
              updateLoading(false, 'LOGIN');

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function getConsult() {
      return _ref2.apply(this, arguments);
    };
  }(); //Al desmontar


  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    return function () {
      cancel = true;
    };
  }, [cancel]); //Renderizar form

  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_RenderForm__WEBPACK_IMPORTED_MODULE_8__["default"], {
      options: {
        handleChange: handleChange,
        handleSubmit: handleSubmit
      }
    })
  );
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    auth: state.loginStatus.auth,
    dataLogin: state.dataLogin
  };
};

var mapDispatchToProps = {
  updateInputValue: _actions_updateInputValue__WEBPACK_IMPORTED_MODULE_3__["default"],
  updateLoading: _actions_updateLoading__WEBPACK_IMPORTED_MODULE_4__["default"],
  updateDataUser: _actions_login_updateDataUser__WEBPACK_IMPORTED_MODULE_6__["default"],
  authUpdate: _actions_login_authUpdate__WEBPACK_IMPORTED_MODULE_7__["default"],
  errorInfo: _actions_errorInfo__WEBPACK_IMPORTED_MODULE_5__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Form));

/***/ }),

/***/ "./resources/react/views/index/PageIndex.js":
/*!**************************************************!*\
  !*** ./resources/react/views/index/PageIndex.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_icons_Lock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/icons/Lock */ "./node_modules/@material-ui/icons/Lock.js");
/* harmony import */ var _material_ui_icons_Lock__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Lock__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Form */ "./resources/react/views/index/Form.js");
/* harmony import */ var _VerifyRelogin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VerifyRelogin */ "./resources/react/views/index/VerifyRelogin.js");
/* harmony import */ var _components_ShowInfoVersion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/ShowInfoVersion */ "./resources/react/components/ShowInfoVersion.js");
 //Material-UI


 //Componentes





function PageIndex(_ref) {
  var auth = _ref.auth,
      reloginSuccess = _ref.reloginSuccess;
  //Titulo
  document.title = 'La Candelaria - Login'; //Regresar contenido del login

  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VerifyRelogin__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "BoxPageIndex"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Zoom"], {
      "in": true,
      timeout: 600
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "HeadMain"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "IconBoxIndex"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Lock__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        fontSize: 40
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "TitleIndex"
    }, "La Candelaria"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form__WEBPACK_IMPORTED_MODULE_3__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ShowInfoVersion__WEBPACK_IMPORTED_MODULE_5__["default"], null))
  );
}

/* harmony default export */ __webpack_exports__["default"] = (PageIndex);

/***/ }),

/***/ "./resources/react/views/index/RenderForm.js":
/*!***************************************************!*\
  !*** ./resources/react/views/index/RenderForm.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _components_ButtonLoading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/ButtonLoading */ "./resources/react/components/ButtonLoading.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components_RendersGlobal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/RendersGlobal */ "./resources/react/components/RendersGlobal.js");
//React
 //Material-UI

 //Componentes

 //Redux




function RenderForm(_ref) {
  var options = _ref.options,
      dataLogin = _ref.dataLogin,
      validating = _ref.validating,
      error = _ref.error;
  //Destructurar datos
  var handleChange = options.handleChange,
      handleSubmit = options.handleSubmit;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grow"], {
    "in": true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: handleSubmit
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "space"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_4__["RenderInputs"], {
    data: {
      val: dataLogin.user,
      name: 'user',
      label: 'Usuario'
    },
    accion: handleChange,
    error: error.user,
    focus: true
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "space"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_4__["RenderInputs"], {
    data: {
      val: dataLogin.pass,
      name: 'pass',
      label: 'Contraseña'
    },
    accion: handleChange,
    error: error.pass,
    visibleToggle: true,
    maxWidth: "278px"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "space"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["FormControlLabel"], {
    value: dataLogin.checkbox,
    onChange: handleChange,
    control: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], {
      name: "checkbox",
      color: "primary"
    }),
    label: "Recordar en este equipo",
    labelPlacement: "end"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "space"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ButtonLoading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    estilo: "contained",
    colorsito: "primary",
    text: "Acceder",
    loading: validating
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "Copyright"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\xA9 UEP APEP \"La Candelaria\" - 2020"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Desarollado por Recker"))));
} //REDUX


var mapStateToProps = function mapStateToProps(state) {
  return {
    dataLogin: state.dataLogin,
    validating: state.loginStatus.validating,
    error: state.dataLogin.error
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps)(RenderForm));

/***/ }),

/***/ "./resources/react/views/index/VerifyRelogin.js":
/*!******************************************************!*\
  !*** ./resources/react/views/index/VerifyRelogin.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_login_updateDataUser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/login/updateDataUser */ "./resources/react/actions/login/updateDataUser.js");
/* harmony import */ var _actions_login_authUpdate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/login/authUpdate */ "./resources/react/actions/login/authUpdate.js");
/* harmony import */ var _actions_login_logout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/login/logout */ "./resources/react/actions/login/logout.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Routers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Routers */ "./resources/react/views/Routers.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! notistack */ "./node_modules/notistack/build/index.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(notistack__WEBPACK_IMPORTED_MODULE_8__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//React
 //redux




 //React Router

 //Componentes

 //SnackBar



function VerifyRelogin(_ref) {
  var children = _ref.children,
      auth = _ref.auth,
      checkbox = _ref.checkbox,
      updateDataUser = _ref.updateDataUser,
      authUpdate = _ref.authUpdate,
      logout = _ref.logout;

  //Notistack
  var _useSnackbar = Object(notistack__WEBPACK_IMPORTED_MODULE_8__["useSnackbar"])(),
      enqueueSnackbar = _useSnackbar.enqueueSnackbar; //Auntenticate Waiting


  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true),
      _useState2 = _slicedToArray(_useState, 2),
      waitingAuth = _useState2[0],
      setWaitingAuth = _useState2[1]; //RedirectInRelogin


  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      redirect = _useState4[0],
      setRedirect = _useState4[1]; //React Router


  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["useHistory"])();
  var location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["useLocation"])(); //Cancel

  var cancel = false; //Seleccionar from

  var _ref2 = location.state || {
    from: {
      pathname: "/"
    },
    protect: false
  },
      from = _ref2.from,
      protect = _ref2.protect; //Lugar de petición hacia el servidor


  var fetchData = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(key) {
      var localData,
          res,
          _ref4,
          status,
          _args = arguments;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              localData = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
              _context.prev = 1;
              _context.next = 4;
              return axios.get('api/relogin', {
                headers: {
                  Authorization: "Bearer ".concat(key)
                }
              });

            case 4:
              res = _context.sent;
              //Update data
              updateDataUser(res.data); //Refrescar ACCESS_KEY en los archivos locales

              if (localData) {
                //Datos permanentes.
                localStorage.setItem('key', JSON.stringify(res.data.access_key));
                sessionStorage.setItem('key', JSON.stringify(res.data.access_key));
              } else {
                //Datos de SOLO sesión.
                sessionStorage.setItem('key', JSON.stringify(res.data.access_key));
              } //Redirect


              setRedirect(true); //Autenticación OK;

              authUpdate(true); //Redireccionar al venir de un relogin

              if (from.pathname !== '/' && from.pathname !== '/login') {
                //Redireccionar
                history.replace(from);
              } else {
                //Redireccionar
                history.replace('/panel');
              }

              _context.next = 17;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](1);
              _ref4 = _context.t0.response || {
                status: "error"
              }, status = _ref4.status;

              if (status === 401) {
                enqueueSnackbar('Sesión expirada', {
                  variant: 'error'
                });
              } else if (status === 500) {
                enqueueSnackbar('Error interno del servidor', {
                  variant: 'error'
                });
              } else {
                enqueueSnackbar('Error interno en el sistema', {
                  variant: 'error'
                });
              } //Limpiar todos los datos si ocurre algún error


              logout();

            case 17:
              if (!cancel) {
                //Quitar autenticación
                setWaitingAuth(false);
              }

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 12]]);
    }));

    return function fetchData(_x) {
      return _ref3.apply(this, arguments);
    };
  }(); //Verificar datos


  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    //AccessKey
    var keyL = JSON.parse(localStorage.getItem('key'));
    var keyS = JSON.parse(sessionStorage.getItem('key')); //Verificar KEYS

    if (!auth && typeof keyL === 'string' && keyL.length > 0) {
      fetchData(keyL, true);
    } else if (!auth && typeof keyS === 'string' && keyS.length > 0) {
      fetchData(keyS, false);
    } else {
      //Quitar waiting
      setWaitingAuth(false);
    }

    return function () {
      cancel = true;
    };
  }, [waitingAuth]); //Verificar si se está autenticando

  if (waitingAuth) {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Routers__WEBPACK_IMPORTED_MODULE_7__["Loader"], null)
    );
  } //Verificar si está autenticado y viene del login


  if (auth && !redirect) {
    //Redireccionar
    history.replace('/panel');
  }

  return children;
} //REDUX


var mapStateToProps = function mapStateToProps(state) {
  return {
    auth: state.loginStatus.auth,
    checkbox: state.dataLogin.checkbox
  };
};

var mapDispatchToProps = {
  updateDataUser: _actions_login_updateDataUser__WEBPACK_IMPORTED_MODULE_3__["default"],
  authUpdate: _actions_login_authUpdate__WEBPACK_IMPORTED_MODULE_4__["default"],
  logout: _actions_login_logout__WEBPACK_IMPORTED_MODULE_5__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(VerifyRelogin));

/***/ })

}]);