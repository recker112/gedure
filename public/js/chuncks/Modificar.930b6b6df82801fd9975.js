(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Modificar"],{

/***/ "./node_modules/@material-ui/icons/Search.js":
/*!***************************************************!*\
  !*** ./node_modules/@material-ui/icons/Search.js ***!
  \***************************************************/
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
  d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
}), 'Search');

exports.default = _default;

/***/ }),

/***/ "./resources/react/actions/panel/modify/verifyEmpty.js":
/*!*************************************************************!*\
  !*** ./resources/react/actions/panel/modify/verifyEmpty.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//Se crea una acción la cual será capturada
//por el reducer correspondiente.
var verifyEmpty = function verifyEmpty(inputValue) {
  return {
    type: "VERIFY_EMPTY",
    payload: inputValue
  };
};

/* harmony default export */ __webpack_exports__["default"] = (verifyEmpty);

/***/ }),

/***/ "./resources/react/components/ConverterCursoCode.js":
/*!**********************************************************!*\
  !*** ./resources/react/components/ConverterCursoCode.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ConverterCursoCode(code) {
  if (typeof code !== 'undefined') {
    var grado = code.substring(1, 2);
    var number = code.substring(0, 1);

    if (grado === "G") {
      return "".concat(number, " grado");
    } else {
      return "".concat(number, " a\xF1o");
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ConverterCursoCode);

/***/ }),

/***/ "./resources/react/components/ListDataGlobal.js":
/*!******************************************************!*\
  !*** ./resources/react/components/ListDataGlobal.js ***!
  \******************************************************/
/*! exports provided: CursosList, SeccionList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CursosList", function() { return CursosList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SeccionList", function() { return SeccionList; });
var CursosList = [{
  value: '1G',
  name: '1 grado'
}, {
  value: '2G',
  name: '2 grado'
}, {
  value: '3G',
  name: '3 grado'
}, {
  value: '4G',
  name: '4 grado'
}, {
  value: '5G',
  name: '5 grado'
}, {
  value: '6G',
  name: '6 grado'
}, {
  value: '1',
  name: '1 año'
}, {
  value: '2',
  name: '2 año'
}, {
  value: '3',
  name: '3 año'
}, {
  value: '4',
  name: '4 año'
}, {
  value: '5',
  name: '5 año'
}, {
  value: '6',
  name: '6 año'
}];
var SeccionList = [{
  value: 'A',
  name: 'A'
}, {
  value: 'B',
  name: 'B'
}, {
  value: 'C',
  name: 'C'
}, {
  value: 'U',
  name: 'U'
}];

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

/***/ "./resources/react/views/panel/contentChangeAdmin/consultarModificar/ModifyForm.js":
/*!*****************************************************************************************!*\
  !*** ./resources/react/views/panel/contentChangeAdmin/consultarModificar/ModifyForm.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ListDataGlobal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/ListDataGlobal */ "./resources/react/components/ListDataGlobal.js");
/* harmony import */ var _components_RendersGlobal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/RendersGlobal */ "./resources/react/components/RendersGlobal.js");
/* harmony import */ var _components_ButtonLoading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/ButtonLoading */ "./resources/react/components/ButtonLoading.js");
/* harmony import */ var _components_reutilizar_verifyErrorCustom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/reutilizar/verifyErrorCustom */ "./resources/react/components/reutilizar/verifyErrorCustom.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_updateInputValue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../actions/updateInputValue */ "./resources/react/actions/updateInputValue.js");
/* harmony import */ var _actions_updateLoading__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../actions/updateLoading */ "./resources/react/actions/updateLoading.js");
/* harmony import */ var _actions_panel_modify_verifyEmpty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../actions/panel/modify/verifyEmpty */ "./resources/react/actions/panel/modify/verifyEmpty.js");
/* harmony import */ var _actions_errorInfo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../actions/errorInfo */ "./resources/react/actions/errorInfo.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! notistack */ "./node_modules/notistack/build/index.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(notistack__WEBPACK_IMPORTED_MODULE_12__);


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

 //Components




 //Material-ui

 //Redux





 //SnackBar



function ModifyForm(_ref) {
  var modifySection = _ref.modifySection,
      updateInputValue = _ref.updateInputValue,
      updateLoading = _ref.updateLoading,
      errorInfo = _ref.errorInfo,
      verifyEmpty = _ref.verifyEmpty;
  //Destruct
  var privilegio = modifySection.privilegio,
      cedula = modifySection.cedula,
      name = modifySection.name,
      option = modifySection.option,
      curso = modifySection.curso,
      seccion = modifySection.seccion,
      pass = modifySection.pass,
      loading = modifySection.loading,
      error = modifySection.error; //Cancel

  var cancel = false; //Crear un SnackBar

  var _useSnackbar = Object(notistack__WEBPACK_IMPORTED_MODULE_12__["useSnackbar"])(),
      enqueueSnackbar = _useSnackbar.enqueueSnackbar; //Al desmontar


  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    return function () {
      cancel = true;
    };
  }, [cancel]); //FetchData

  var fetchData = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var dataForm, res, _res, status, data, _error$response, _status, _data;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              //Inicar datos
              dataForm = {
                cedula: cedula,
                privilegio: privilegio,
                name: name,
                pass: pass,
                curso: curso,
                seccion: seccion
              }; //Inicializar res

              if (!(option === 'insert')) {
                _context.next = 8;
                break;
              }

              _context.next = 5;
              return axios.post('api/user', dataForm);

            case 5:
              res = _context.sent;
              _context.next = 18;
              break;

            case 8:
              if (!(option === 'update')) {
                _context.next = 14;
                break;
              }

              _context.next = 11;
              return axios.patch("api/user/".concat(cedula), dataForm);

            case 11:
              res = _context.sent;
              _context.next = 18;
              break;

            case 14:
              if (!(option === 'delete')) {
                _context.next = 18;
                break;
              }

              _context.next = 17;
              return axios["delete"]("api/user/".concat(cedula), {
                data: dataForm
              });

            case 17:
              res = _context.sent;

            case 18:
              if (!cancel) {
                _res = res, status = _res.status, data = _res.data; //Mostar alerta

                enqueueSnackbar(data.description, {
                  variant: 'success'
                });
              }

              _context.next = 25;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](0);
              _error$response = _context.t0.response, _status = _error$response.status, _data = _error$response.data;

              if (_status === 403) {
                enqueueSnackbar(_data.description, {
                  variant: 'error'
                });
              } else if (_status === 400) {
                enqueueSnackbar(_data.description, {
                  variant: 'warning'
                });
              } else if (_status === 500) {
                enqueueSnackbar('No se ha podido conectar con la base de datos', {
                  variant: 'error'
                });
              } else {
                enqueueSnackbar('Error interno en el sistema', {
                  variant: 'error'
                });
              }

            case 25:
              //Quitar loading
              updateLoading(false, 'MODIFY');

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 21]]);
    }));

    return function fetchData() {
      return _ref2.apply(this, arguments);
    };
  }(); //Enviar datos


  function handleSubmit(e) {
    //Preparativos
    e.preventDefault();
    var errorStatus = false; //Verificar datos

    var InputsArray = [{
      value: cedula,
      name: 'cedula',
      minValue: 3
    }, {
      value: pass,
      name: 'pass',
      minValue: 4
    }, {
      value: name,
      name: 'name',
      minValue: 3
    }, {
      value: curso,
      name: 'curso'
    }, {
      value: seccion,
      name: 'seccion'
    }];
    var error = Object(_components_reutilizar_verifyErrorCustom__WEBPACK_IMPORTED_MODULE_5__["default"])(InputsArray, errorInfo, 'MODIFY');

    if (error) {
      return null;
    } //Enviar consulta


    updateLoading(true, 'MODIFY');
    fetchData();
  }

  function handleChange(e) {
    //Cambiar elemento
    updateInputValue(e, 'MODIFY');
    verifyEmpty({
      name: e.target.name,
      value: e.target.value
    });
  } //Config de Privilegios


  var radioPrivi = {
    title: 'Privilegio',
    name: 'privilegio',
    values: [{
      value: 'V-',
      name: 'V-'
    }, {
      value: 'A-',
      name: 'A-'
    }, {
      value: 'CR-',
      name: 'CR-'
    }],
    color: 'primary'
  }; //Config de Acción

  var radioAcc = {
    title: 'Acción',
    name: 'option',
    values: [{
      value: 'insert',
      name: 'Añadir'
    }, {
      value: 'update',
      name: 'Actualizar'
    }, {
      value: 'delete',
      name: 'Borrar'
    }],
    color: 'secondary'
  }; //Config de curso

  var cursoSelect = {
    name: 'curso',
    values: [{
      value: '',
      name: 'Grado/Año'
    }].concat(_toConsumableArray(_components_ListDataGlobal__WEBPACK_IMPORTED_MODULE_2__["CursosList"]))
  }; //Config de seccion

  var seccionSelect = {
    name: 'seccion',
    values: [{
      value: '',
      name: 'Seccion'
    }].concat(_toConsumableArray(_components_ListDataGlobal__WEBPACK_IMPORTED_MODULE_2__["SeccionList"]))
  };
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
      autoComplete: "off",
      method: "POST",
      onSubmit: handleSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
      container: true,
      spacing: 2,
      justify: "center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_3__["RenderRadios"], {
      val: privilegio,
      accion: handleChange,
      data: radioPrivi
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
      item: true,
      xs: 12,
      sm: 6,
      md: 4
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Zoom"], {
      "in": true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_3__["RenderInputs"], {
      data: {
        val: cedula,
        name: 'cedula',
        label: 'Cédula'
      },
      accion: handleChange,
      error: error.cedula
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
      item: true,
      xs: 12,
      sm: 6,
      md: 4
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Zoom"], {
      "in": option === 'delete' ? false : true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_3__["RenderInputs"], {
      data: {
        val: name,
        name: 'name',
        label: 'Nombre'
      },
      accion: handleChange,
      error: error.name
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
      item: true,
      xs: 12,
      sm: 6,
      md: 4
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Zoom"], {
      "in": option === 'delete' || option === 'update' ? false : true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_3__["RenderInputs"], {
      data: {
        val: pass,
        name: 'pass',
        label: 'Contraseña'
      },
      accion: handleChange,
      error: error.pass
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_3__["RenderRadios"], {
      val: option,
      accion: handleChange,
      data: radioAcc
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Zoom"], {
      "in": privilegio === 'V-' ? true : false
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
      item: true,
      xs: 5,
      sm: 4,
      md: 3
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_3__["RenderSelect"], {
      action: handleChange,
      val: curso,
      data: cursoSelect,
      error: error.curso
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Zoom"], {
      "in": privilegio === 'V-' ? true : false
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
      item: true,
      xs: 5,
      sm: 4,
      md: 3
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_3__["RenderSelect"], {
      action: handleChange,
      val: seccion,
      data: seccionSelect,
      error: error.seccion
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
      container: true,
      justify: "center",
      style: {
        marginTop: '20px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ButtonLoading__WEBPACK_IMPORTED_MODULE_4__["default"], {
      estilo: "outlined",
      colorsito: "inherit",
      text: "Realizar",
      loading: loading
    })))
  );
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    modifySection: state.panelSettings.modifySection
  };
};

var mapDispatchToProps = {
  updateInputValue: _actions_updateInputValue__WEBPACK_IMPORTED_MODULE_8__["default"],
  updateLoading: _actions_updateLoading__WEBPACK_IMPORTED_MODULE_9__["default"],
  errorInfo: _actions_errorInfo__WEBPACK_IMPORTED_MODULE_11__["default"],
  verifyEmpty: _actions_panel_modify_verifyEmpty__WEBPACK_IMPORTED_MODULE_10__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStateToProps, mapDispatchToProps)(ModifyForm));

/***/ }),

/***/ "./resources/react/views/panel/contentChangeAdmin/consultarModificar/RenderCO_MO.js":
/*!******************************************************************************************!*\
  !*** ./resources/react/views/panel/contentChangeAdmin/consultarModificar/RenderCO_MO.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _SearchUsers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchUsers */ "./resources/react/views/panel/contentChangeAdmin/consultarModificar/SearchUsers.js");
/* harmony import */ var _SearchSeccion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SearchSeccion */ "./resources/react/views/panel/contentChangeAdmin/consultarModificar/SearchSeccion.js");
/* harmony import */ var _ModifyForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ModifyForm */ "./resources/react/views/panel/contentChangeAdmin/consultarModificar/ModifyForm.js");
 //Material-UI

 //Components





function RenderCO_MO() {
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      container: true,
      spacing: 2,
      justify: "center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      item: true,
      xs: 12,
      sm: 6
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Paper"], {
      variant: "outlined"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SearchUsers__WEBPACK_IMPORTED_MODULE_2__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      item: true,
      xs: 12,
      sm: 6
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Paper"], {
      variant: "outlined"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SearchSeccion__WEBPACK_IMPORTED_MODULE_3__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      item: true,
      xs: 12,
      sm: 10
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Paper"], {
      className: "Box",
      variant: "outlined"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "title"
    }, "Modificar"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ModifyForm__WEBPACK_IMPORTED_MODULE_4__["default"], null)))))
  );
}

/* harmony default export */ __webpack_exports__["default"] = (RenderCO_MO);

/***/ }),

/***/ "./resources/react/views/panel/contentChangeAdmin/consultarModificar/SearchSeccion.js":
/*!********************************************************************************************!*\
  !*** ./resources/react/views/panel/contentChangeAdmin/consultarModificar/SearchSeccion.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _TableShowInfoSecion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TableShowInfoSecion */ "./resources/react/views/panel/contentChangeAdmin/consultarModificar/TableShowInfoSecion.js");
/* harmony import */ var _components_ConverterCursoCode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/ConverterCursoCode */ "./resources/react/components/ConverterCursoCode.js");
/* harmony import */ var _components_ListDataGlobal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/ListDataGlobal */ "./resources/react/components/ListDataGlobal.js");
/* harmony import */ var _components_RendersGlobal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/RendersGlobal */ "./resources/react/components/RendersGlobal.js");


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

 //Material-UI


 //Componentes




 //Animaciรณn

var Transition = react__WEBPACK_IMPORTED_MODULE_1___default.a.forwardRef(function Transition(props, ref) {
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Slide"], _extends({
      direction: "up",
      ref: ref
    }, props))
  );
});

function SearchSeccion() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(''),
      _useState2 = _slicedToArray(_useState, 2),
      select = _useState2[0],
      setSelect = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      open = _useState4[0],
      setOpen = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]),
      _useState8 = _slicedToArray(_useState7, 2),
      lista = _useState8[0],
      setLista = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])('none'),
      _useState10 = _slicedToArray(_useState9, 2),
      curso = _useState10[0],
      setCurso = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(''),
      _useState12 = _slicedToArray(_useState11, 2),
      error = _useState12[0],
      setError = _useState12[1]; //Resolution RESPONSIVE DIALOG


  var theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["useTheme"])();
  var fullScreen = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["useMediaQuery"])(theme.breakpoints.down('xs'));

  var fetchData = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(curso) {
      var res, _error$response, status, data;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //Descargar lista
              setLista([]);
              _context.prev = 1;
              _context.next = 4;
              return axios.get("api/curso/".concat(curso));

            case 4:
              res = _context.sent;
              //Actualizar datos
              setLista(res.data);
              setCurso(Object(_components_ConverterCursoCode__WEBPACK_IMPORTED_MODULE_5__["default"])(curso));
              _context.next = 13;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              _error$response = _context.t0.response, status = _error$response.status, data = _error$response.data;

              if (status === 403) {
                setError(data.description + '.');
              } else if (status === 400) {
                setError(data.description + '.');
              } else if (status === 500) {
                setError('No se ha podido conectar con la base de datos.');
              } else {
                setError('Error interno en el sistema.');
              }

            case 13:
              //Quitar loading
              setLoading(false);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 9]]);
    }));

    return function fetchData(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  function handleChange(e) {
    var curso = e.target.value;
    setSelect(curso);

    if (curso !== '') {
      setOpen(true);
      setLoading(true);
      fetchData(curso);
    }
  } //Config de seccionSearch


  var searchSelect = {
    name: 'seachSeccion',
    values: [{
      value: '',
      name: 'Buscar Sección...'
    }].concat(_toConsumableArray(_components_ListDataGlobal__WEBPACK_IMPORTED_MODULE_6__["CursosList"]))
  };
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "searchSeccion",
      style: {
        padding: '10px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_7__["RenderSelect"], {
      action: handleChange,
      val: select,
      data: searchSelect
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Dialog"], {
      open: open,
      fullScreen: fullScreen,
      scroll: "paper",
      TransitionComponent: Transition,
      "aria-labelledby": "popad-dialog-title",
      "aria-describedby": "popad-dialog-description"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogTitle"], {
      id: "popad-dialog-title"
    }, "Lista de estudiantes"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContent"], {
      dividers: true
    }, loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContentText"], {
      id: "popad-dialog-description"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "Buscando usuarios en la base de datos, por favor espere...")) : lista.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContentText"], {
      id: "popad-dialog-description"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "A continuaci\u0E23\u0E13n se muestran los estudiates encontrados en ", curso, ":")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_TableShowInfoSecion__WEBPACK_IMPORTED_MODULE_4__["default"], {
      data: lista,
      changeOpen: setOpen
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContentText"], {
      id: "popad-dialog-description"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, error))), loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CircularProgress"], null)), !loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogActions"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      color: "primary",
      onClick: function onClick() {
        setOpen(false);
      }
    }, "Entendido"))))
  );
}

/* harmony default export */ __webpack_exports__["default"] = (SearchSeccion);

/***/ }),

/***/ "./resources/react/views/panel/contentChangeAdmin/consultarModificar/SearchUsers.js":
/*!******************************************************************************************!*\
  !*** ./resources/react/views/panel/contentChangeAdmin/consultarModificar/SearchUsers.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/Search */ "./node_modules/@material-ui/icons/Search.js");
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_lab_Autocomplete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/lab/Autocomplete */ "./node_modules/@material-ui/lab/esm/Autocomplete/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_updateInputValue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../actions/updateInputValue */ "./resources/react/actions/updateInputValue.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! notistack */ "./node_modules/notistack/build/index.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(notistack__WEBPACK_IMPORTED_MODULE_7__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//React
 //Material-UI



 //Redux


 //SnackBar



function SearchUsers(_ref) {
  var updateInputValue = _ref.updateInputValue;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]),
      _useState4 = _slicedToArray(_useState3, 2),
      options = _useState4[0],
      setOptions = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(undefined),
      _useState6 = _slicedToArray(_useState5, 2),
      val = _useState6[0],
      setVal = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState8 = _slicedToArray(_useState7, 2),
      loading = _useState8[0],
      setLoading = _useState8[1]; // const loading = open && options.length === 0;
  //Crear un SnackBar


  var _useSnackbar = Object(notistack__WEBPACK_IMPORTED_MODULE_7__["useSnackbar"])(),
      enqueueSnackbar = _useSnackbar.enqueueSnackbar;

  var cancel;
  var CancelAxios = axios.CancelToken;

  var fetchData = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(val) {
      var res, _error$response, status, data;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return axios.get("api/user/".concat(val, "?like=true"), {
                cancelToken: new CancelAxios(function (c) {
                  cancel = c;
                })
              });

            case 3:
              res = _context.sent;

              //Verificar existencia de usuarios
              if (res.data.length !== 0) {
                setOptions(res.data);
              } else {
                setOptions([]);
              }

              setLoading(false);
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);

              if (axios.isCancel(_context.t0)) {//Mensaje al cancelar peticion
              } else {
                if (_context.t0.response) {
                  //Errores HTTP
                  _error$response = _context.t0.response, status = _error$response.status, data = _error$response.data;

                  if (status === 403) {
                    enqueueSnackbar(data.description, {
                      variant: 'error'
                    });
                  }

                  if (status === 401) {
                    enqueueSnackbar('No estás autorizado', {
                      variant: 'error'
                    });
                  } else if (status === 500) {
                    enqueueSnackbar('No se ha podido conectar con la base de datos', {
                      variant: 'error'
                    });
                  } else {
                    enqueueSnackbar('Error interno en el servidor', {
                      variant: 'error'
                    });
                  }
                } else {
                  enqueueSnackbar('Error interno en el servidor', {
                    variant: 'error'
                  });
                }
              }

              setLoading(false);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    return function fetchData(_x) {
      return _ref2.apply(this, arguments);
    };
  }(); //AUTOCOMPLEtE AGARRANDO TODO LOS DAToS DE UNA
  // //Buscar DATA
  // useEffect(
  // 	() => {
  // 		const fetchData = async () => {
  // 			try {
  // 				const res = await axios.get('api/user/all', {
  // 					cancelToken: new CancelAxios(c=>{
  // 						cancel = c;
  // 					})
  // 				});
  // 				setOptions(res.data);
  // 			} catch (error) {
  // 				if (axios.isCancel(error)){
  // 					//Mensaje al cancelar peticion
  // 				}else {
  // 					if (error.response){
  // 						//Errores HTTP
  // 						const { status, data } = error.response;
  // 						if (status === 403) {
  // 							enqueueSnackbar(data.description, {
  // 								variant: 'error'
  // 							});
  // 						}if (status === 401) {
  // 							enqueueSnackbar('No estás autorizado', {
  // 								variant: 'error'
  // 							});
  // 						} else if (status === 500) {
  // 							enqueueSnackbar('No se ha podido conectar con la base de datos', {
  // 								variant: 'error'
  // 							});
  // 						} else {
  // 							enqueueSnackbar('Error interno en el servidor', {
  // 								variant: 'error'
  // 							});
  // 						}
  // 					}else {
  // 						enqueueSnackbar('Error interno en el servidor', {
  // 							variant: 'error'
  // 						});
  // 					}
  // 				}
  // 			}
  // 		};
  // 		//Realizar consulta
  // 		if(loading) {
  // 			fetchData();
  // 		}
  // 		return () => {
  // 			if (cancel){
  // 				cancel();
  // 			}
  // 			//Reset de DATA guardada.
  // 			if (!open) {
  // 				setOptions([]);
  // 			}
  // 		};
  // 	},
  // 	[loading]
  // );
  //Clear data on close


  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    return function () {
      if (cancel) {
        cancel();
      } //Reset de DATA guardada.


      if (!open) {
        setOptions([]);
        setLoading(false);
      }
    };
  }, [loading]); //Hacer petición cada vez que cambie el value

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    //Verificar no null
    if (val) {
      //Loading
      setLoading(true); //Abrir box de busqueda

      setOpen(true); //Consulta

      fetchData(val);
    } else {
      setLoading(false);
      setOpen(false);
    }

    return function () {
      if (cancel) {
        cancel();
      } //Reset de DATA guardada.


      setOptions([]);
    };
  }, [val]);

  var handleClick = function handleClick(user) {
    //Cerrar caja.
    setVal(false);
    setOpen(false);
    setLoading(false);
    setOptions([]); //Actualizar datos

    if (user !== null) {
      updateInputValue(user, 'MODIFY_EXTERNO');
    }
  };

  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "searchUser"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab_Autocomplete__WEBPACK_IMPORTED_MODULE_4__["default"] //Verificar si está loading o no
    , {
      loading: loading //Mensajes
      ,
      loadingText: "Cargando...",
      noOptionsText: "Sin resultados" //Data a usar para el autocompletado
      ,
      options: options,
      onChange: function onChange(e, user) {
        handleClick(user);
      },
      onInputChange: function onInputChange(e, val) {
        setVal(val);
      } //Texto a mostrar al seleccionar un resultado.
      ,
      getOptionLabel: function getOptionLabel(option) {
        return "".concat(option.privilegio).concat(option.cedula);
      } //Renderizar texto en la caja del autocompletado.
      ,
      renderOption: function renderOption(option) {
        return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
            className: "searchBoxInfo"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, option.privilegio + option.cedula), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, option.name))
        );
      } //Verificar si está open o no.
      ,
      open: open //Acción al abrir.
      ,
      onOpen: function onOpen() {
        setLoading(true); // setOpen(true);
      } //Acción al cerrar.
      ,
      onClose: function onClose() {
        setOpen(false);
      } //Render input.
      ,
      renderInput: function renderInput(params) {
        return (
          /*#__PURE__*/
          //Se usa el input base porque queda más bonito. xD
          react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["InputBase"], {
            style: {
              padding: '10px',
              width: '100%'
            },
            placeholder: "Buscar usuario...",
            inputProps: _objectSpread({}, params.inputProps, {
              type: 'search',
              'aria-label': 'buscar usuario'
            }),
            startAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["InputAdornment"], {
              position: "start"
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_3___default.a, null)),
            endAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["InputAdornment"], {
              position: "end"
            }, loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CircularProgress"], {
              color: "inherit",
              size: 30
            }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null)),
            ref: params.InputProps.ref
          })
        );
      }
    }))
  );
} //REDUX


var mapDispatchToProps = {
  updateInputValue: _actions_updateInputValue__WEBPACK_IMPORTED_MODULE_6__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(null, mapDispatchToProps)(SearchUsers));

/***/ }),

/***/ "./resources/react/views/panel/contentChangeAdmin/consultarModificar/TableShowInfoSecion.js":
/*!**************************************************************************************************!*\
  !*** ./resources/react/views/panel/contentChangeAdmin/consultarModificar/TableShowInfoSecion.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_updateInputValue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../actions/updateInputValue */ "./resources/react/actions/updateInputValue.js");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//React
 //Material-UI

 //Redux




function TableShowInfoSecion(_ref) {
  var data = _ref.data,
      changeOpen = _ref.changeOpen,
      updateInputValue = _ref.updateInputValue;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0),
      _useState2 = _slicedToArray(_useState, 2),
      tabValue = _useState2[0],
      setTabValue = _useState2[1];

  var handleChange = function handleChange(e, value) {
    setTabValue(value);
  }; //Selector de panel a controlar


  function a11yProps(index) {
    return {
      id: "seccion-tab-".concat(index),
      'aria-controls': "seccion-tabpanel-".concat(index)
    };
  }

  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Tabs"], {
      value: tabValue,
      indicatorColor: "primary",
      onChange: handleChange,
      "aria-label": "Tab seccion",
      variant: "scrollable",
      scrollButtons: "auto"
    }, data.map(function (curso, i) {
      return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Tab"], _extends({
          key: i,
          label: "Secci\xF3n ".concat(curso.seccion)
        }, a11yProps(i)))
      );
    })), data.map(function (curso, i) {
      return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPanel, {
          key: i,
          value: tabValue,
          index: i
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RenderTable, {
          data: curso.estudiantes,
          changeOpen: changeOpen,
          update: updateInputValue
        }))
      );
    }))
  );
}
/*
Renderizador de tablas.
*/


function RenderTable(_ref2) {
  var data = _ref2.data,
      changeOpen = _ref2.changeOpen,
      update = _ref2.update;

  if (data.length > 0) {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Table"], {
        "aria-label": "table seccion info"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TableHead"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TableRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TableCell"], null, "Cedula"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TableCell"], null, "Nombre"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TableCell"], null, "N\xB0 lista"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TableBody"], null, data.map(function (row) {
        return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TableRow"], {
            key: row.cedula
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TableCell"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], {
            onClick: function onClick() {
              delete row.lista;
              update(row, 'MODIFY_EXTERNO');
              changeOpen(false);
            }
          }, row.privilegio + row.cedula)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TableCell"], null, row.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TableCell"], null, row.lista))
        );
      })))
    );
  }

  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "No hay estudiantes."))
  );
}
/*
Creador de panels en TABS, tomado de
material-UI
*/


function TabPanel(props) {
  var children = props.children,
      value = props.value,
      index = props.index,
      other = _objectWithoutProperties(props, ["children", "value", "index"]);

  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], _extends({
      component: "div",
      role: "tabpanel",
      hidden: value !== index,
      id: "seccion-tabpanel-".concat(index),
      "aria-labelledby": "seccion-tab-".concat(index)
    }, other), value === index && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Box"], {
      p: 3
    }, children))
  );
}

var mapDispatchToProps = {
  updateInputValue: _actions_updateInputValue__WEBPACK_IMPORTED_MODULE_3__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(null, mapDispatchToProps)(TableShowInfoSecion));

/***/ })

}]);