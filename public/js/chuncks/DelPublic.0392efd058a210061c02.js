(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["DelPublic"],{

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

/***/ "./resources/react/views/panel/contentChangeAdmin/delposting/RenderDelPublic.js":
/*!**************************************************************************************!*\
  !*** ./resources/react/views/panel/contentChangeAdmin/delposting/RenderDelPublic.js ***!
  \**************************************************************************************/
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
/* harmony import */ var _components_RendersGlobal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/RendersGlobal */ "./resources/react/components/RendersGlobal.js");
/* harmony import */ var _components_ButtonLoading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/ButtonLoading */ "./resources/react/components/ButtonLoading.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_updateInputValue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../actions/updateInputValue */ "./resources/react/actions/updateInputValue.js");
/* harmony import */ var _actions_updateLoading__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../actions/updateLoading */ "./resources/react/actions/updateLoading.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! notistack */ "./node_modules/notistack/build/index.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(notistack__WEBPACK_IMPORTED_MODULE_10__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//React
 //Material-UI



 //Component


 //Redux



 //NotiStack



function RenderPublicar(_ref) {
  var data = _ref.data,
      updateInputValue = _ref.updateInputValue,
      updateLoading = _ref.updateLoading;
  var option = data.option,
      id = data.id,
      loading = data.loading; //Crear un SnackBar

  var _useSnackbar = Object(notistack__WEBPACK_IMPORTED_MODULE_10__["useSnackbar"])(),
      enqueueSnackbar = _useSnackbar.enqueueSnackbar;

  var fetchData = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(formData) {
      var res, description, _error$response, status, _data;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!(option === 'noticia')) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return axios["delete"]("api/news/".concat(id));

            case 4:
              res = _context.sent;
              _context.next = 10;
              break;

            case 7:
              _context.next = 9;
              return axios["delete"]("api/anuncios/".concat(id));

            case 9:
              res = _context.sent;

            case 10:
              description = res.data.description;
              enqueueSnackbar(description, {
                variant: 'success'
              });
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);

              if (_context.t0.response) {
                //Errores HTTP
                _error$response = _context.t0.response, status = _error$response.status, _data = _error$response.data;

                if (status === 400) {
                  enqueueSnackbar(_data.description, {
                    variant: 'warning'
                  });
                } else if (status === 403) {
                  enqueueSnackbar(_data.description, {
                    variant: 'error'
                  });
                } else if (status === 422) {
                  enqueueSnackbar(_data.description, {
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
                enqueueSnackbar('Error interno en el sistema', {
                  variant: 'error'
                });
              }

            case 17:
              //Revertir loading
              updateLoading(false, 'DEL_POSTING');

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 14]]);
    }));

    return function fetchData(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var handleChange = function handleChange(e) {
    updateInputValue(e, 'DEL_POSTING');
  };

  var handleSubmit = function handleSubmit(e) {
    //Preparativos
    e.preventDefault();
    var errorStatus = false; //Verificar datos

    if (id.length <= 0) {
      enqueueSnackbar('Debe seleccionar algún post', {
        variant: 'error'
      });
      errorStatus = true;
    }

    if (errorStatus) {
      return null;
    }
  };

  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      container: true,
      spacing: 2,
      justify: "center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      item: true,
      xs: 12,
      sm: 5,
      md: 3
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"], {
      variant: "outlined"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(SelectorDelPublicar, {
      action: handleChange,
      value: option
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      item: true,
      xs: 12,
      sm: 10
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"], {
      variant: "outlined"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "Box"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      container: true,
      spacing: 2,
      justify: "center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(SearchPost, {
      option: option,
      enqueueSnackbar: enqueueSnackbar,
      handleChange: handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      item: true,
      xs: 12,
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ButtonLoading__WEBPACK_IMPORTED_MODULE_6__["default"], {
      estilo: "outlined",
      colorsito: "inherit",
      text: "Eliminar",
      loading: loading
    }))))))))
  );
}

function SelectorDelPublicar(_ref3) {
  var action = _ref3.action,
      value = _ref3.value;
  //Config de opciones
  var delPostingSelect = {
    name: 'option',
    values: [{
      value: 'noticia',
      name: 'Noticia'
    }, {
      value: 'anuncio',
      name: 'Anuncio'
    }]
  };
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "Box"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "title"
    }, "Eliminar publicaci\xF3n"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_5__["RenderSelect"], {
      action: action,
      val: value,
      data: delPostingSelect,
      classNameSet: "select",
      customWidth: "auto",
      empty: false
    })))
  );
}

function SearchPost(_ref4) {
  var option = _ref4.option,
      enqueueSnackbar = _ref4.enqueueSnackbar,
      handleChange = _ref4.handleChange;

  //Autocomplete vars
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]),
      _useState4 = _slicedToArray(_useState3, 2),
      options = _useState4[0],
      setOptions = _useState4[1];

  var loading = open && options.length === 0;
  var textSearch = option === 'noticia' ? 'noticias' : 'anuncios';
  var textLabel = option === 'noticia' ? 'Noticia' : 'Anuncio'; //AUTOCOMPLEtE AGARRANDO TODO LOS DAToS DE UNA
  //Buscar DATA

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var cancel;
    var CancelAxios = axios.CancelToken;

    var fetchData = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var res, _error$response2, status, data;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (!(option === 'noticia')) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return axios.get('api/news/search', {
                  cancelToken: new CancelAxios(function (c) {
                    cancel = c;
                  })
                });

              case 4:
                res = _context2.sent;
                _context2.next = 10;
                break;

              case 7:
                _context2.next = 9;
                return axios.get('api/anuncios/search', {
                  cancelToken: new CancelAxios(function (c) {
                    cancel = c;
                  })
                });

              case 9:
                res = _context2.sent;

              case 10:
                setOptions(res.data);
                _context2.next = 16;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](0);

                if (axios.isCancel(_context2.t0)) {//Mensaje al cancelar peticion
                } else {
                  if (_context2.t0.response) {
                    //Errores HTTP
                    _error$response2 = _context2.t0.response, status = _error$response2.status, data = _error$response2.data;

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

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 13]]);
      }));

      return function fetchData() {
        return _ref5.apply(this, arguments);
      };
    }(); //Realizar consulta


    if (loading) {
      fetchData();
    }

    return function () {
      if (cancel) {
        cancel();
      }
    };
  }, [loading]);

  var handleClick = function handleClick(deleteTHIS) {
    var e = {
      target: {
        name: 'id',
        value: deleteTHIS
      }
    };
    handleChange(e);
  };

  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "autoComplete"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab_Autocomplete__WEBPACK_IMPORTED_MODULE_4__["default"] //Verificar si está loading o no
    , {
      loading: loading,
      multiple: true //Mensajes
      ,
      loadingText: "Cargando...",
      noOptionsText: "Sin resultados" //Data a usar para el autocompletado
      ,
      options: options,
      onChange: function onChange(e, deleteTHIS) {
        handleClick(deleteTHIS);
      } //Texto a mostrar al seleccionar un resultado.
      ,
      getOptionLabel: function getOptionLabel(option) {
        return "".concat(textLabel, " #").concat(option.id);
      } //Renderizar texto en la caja del autocompletado.
      ,
      renderOption: function renderOption(option) {
        return "".concat(textLabel, " #").concat(option.id);
      } //Verificar si está open o no.
      ,
      open: open //Acción al abrir.
      ,
      onOpen: function onOpen() {
        setOpen(true);
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
            placeholder: "Buscar ".concat(textSearch, "..."),
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
} //Redux


var mapStateToProps = function mapStateToProps(state) {
  return {
    data: state.panelSettings.delPostingSection
  };
};

var mapDispatchToProps = {
  updateLoading: _actions_updateLoading__WEBPACK_IMPORTED_MODULE_9__["default"],
  updateInputValue: _actions_updateInputValue__WEBPACK_IMPORTED_MODULE_8__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStateToProps, mapDispatchToProps)(RenderPublicar));

/***/ })

}]);