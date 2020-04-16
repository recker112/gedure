(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Home"],{

/***/ "./resources/react/views/panel/contentChangeAdmin/home/AnnounceBox.js":
/*!****************************************************************************!*\
  !*** ./resources/react/views/panel/contentChangeAdmin/home/AnnounceBox.js ***!
  \****************************************************************************/
/*! exports provided: AnnounceBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnounceBox", function() { return AnnounceBox; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");


function AnnounceBox(props) {
  //Destructing
  var _props$options = props.options,
      text = _props$options.text,
      background = _props$options.background,
      data = _props$options.data; //regresar

  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Paper"], {
      variant: "outlined",
      className: "Status"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Zoom"], {
      "in": true,
      timeout: 800
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "circulo",
      style: {
        background: background
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "text"
    }, data))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, text))
  );
}

/***/ }),

/***/ "./resources/react/views/panel/contentChangeAdmin/home/RenderHome.js":
/*!***************************************************************************!*\
  !*** ./resources/react/views/panel/contentChangeAdmin/home/RenderHome.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _AnnounceBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AnnounceBox */ "./resources/react/views/panel/contentChangeAdmin/home/AnnounceBox.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! notistack */ "./node_modules/notistack/build/index.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(notistack__WEBPACK_IMPORTED_MODULE_4__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

 //Material-UI

 //Componentes

 //SnackBar



function RenderHome() {
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(RenderAnnounceBox, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      container: true,
      spacing: 2,
      className: "FixGrid"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"], {
      variant: "outlined",
      className: "Box"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "title"
    }, "Bienvenidos"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Le damos la bienvenida al Panel de Administaci\xF3n, aqu\xED usted prodr\xE1 realizar acciones como: cargar matricula, ver registros, consultar, modificar, cargar archivos, cargar boletas, entre otros. Para m\xE1s informaci\xF3n por favor mantenga el mouse encima de la opci\xF3n que desea saber m\xE1s informaci\xF3n en el men\xFA."))))))
  );
}

function RenderAnnounceBox() {
  //Crear un SnackBar
  var _useSnackbar = Object(notistack__WEBPACK_IMPORTED_MODULE_4__["useSnackbar"])(),
      enqueueSnackbar = _useSnackbar.enqueueSnackbar; //Query mantiene la cantidad total a mostrar


  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    StudientsTotal: '-',
    StudientsBlock: '-',
    StudientsPermaBlock: '-',
    PublicNotice: '-',
    PublicAnnounce: '-'
  }),
      _useState2 = _slicedToArray(_useState, 2),
      query = _useState2[0],
      setQuery = _useState2[1]; //Variable para verificar solo la primera vez.


  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      first = _useState4[0],
      setFirst = _useState4[1]; //Pedir datos


  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var cancel;
    var CancelAxios = axios.CancelToken; //FetchData

    var fetchData = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var res, _error$response, status, data;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.get("api/infobox/announcebox?show=all", {
                  cancelToken: new CancelAxios(function (c) {
                    cancel = c;
                  })
                });

              case 3:
                res = _context.sent;
                //Actualizar datos
                setQuery(res.data);
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);

                if (axios.isCancel(_context.t0)) {//Mensaje al cancelar peticion
                } else {
                  if (_context.t0.response) {
                    //Errores HTTP
                    _error$response = _context.t0.response, status = _error$response.status, data = _error$response.data;

                    if (status === 400) {
                      enqueueSnackbar(data.description, {
                        variant: 'warning'
                      });
                    } else if (status === 403) {
                      enqueueSnackbar(data.description, {
                        variant: 'error'
                      });
                    } else {
                      enqueueSnackbar('Error al pedir los infobox al servidor', {
                        variant: 'error'
                      });
                    }
                  } else {//Error interno
                  }
                }

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      return function fetchData() {
        return _ref.apply(this, arguments);
      };
    }(); //Realizar consulta solo en la primera carga


    if (!first) {
      fetchData();
    } //Al desmontar


    return function () {
      //Ejectuar axios CANCEL SI la peticion fue cancelada
      if (cancel) {
        cancel();
      }

      setQuery({
        StudientsTotal: '-',
        StudientsBlock: '-',
        StudientsPermaBlock: '-',
        PublicNotice: '-',
        PublicAnnounce: '-'
      });
    };
  }, [first]); //Lista

  var Estados = [{
    background: '#4879FC',
    text: 'Estudiantes registrado en el sistema',
    data: query.StudientsTotal
  }, {
    background: '#F8C822',
    text: 'Estudiantes bloqueados',
    data: query.StudientsBlock
  }, {
    background: '#FC4850',
    text: 'Estudiantes bloqueados permanentemente',
    data: query.StudientsPermaBlock
  }, {
    background: '#b448fc',
    text: 'Noticias publicadas',
    data: query.PublicNotice
  }, {
    background: '#b448fc',
    text: 'Anuncios publicados',
    data: query.PublicAnnounce
  } // {
  // 	background: '#39CCCC',
  // 	text: '"Me gusta" recibidos',
  // 	data: 'Likes'
  // }
  ];
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      container: true,
      spacing: 2,
      justify: "center"
    }, Estados.map(function (element, i) {
      return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
          key: i,
          item: true,
          xs: 12,
          sm: 6,
          md: 4
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_AnnounceBox__WEBPACK_IMPORTED_MODULE_3__["AnnounceBox"], {
          options: {
            background: element.background,
            text: element.text,
            data: element.data
          }
        }))
      );
    }))
  );
}

/* harmony default export */ __webpack_exports__["default"] = (RenderHome);

/***/ })

}]);