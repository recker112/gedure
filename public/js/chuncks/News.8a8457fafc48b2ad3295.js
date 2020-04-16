(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["News"],{

/***/ "./resources/react/actions/news/changeContentNews.js":
/*!***********************************************************!*\
  !*** ./resources/react/actions/news/changeContentNews.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//Se crea una acción la cual será capturada
//por el reducer correspondiente.
var changeContentNews = function changeContentNews(content) {
  return {
    type: "CHANGE_CONTENT_NEWS",
    payload: content
  };
};

/* harmony default export */ __webpack_exports__["default"] = (changeContentNews);

/***/ }),

/***/ "./resources/react/actions/news/updateNews.js":
/*!****************************************************!*\
  !*** ./resources/react/actions/news/updateNews.js ***!
  \****************************************************/
/*! exports provided: updateNewsAnuncios, updateNewsNoticias */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateNewsAnuncios", function() { return updateNewsAnuncios; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateNewsNoticias", function() { return updateNewsNoticias; });
//Se crea una acción la cual será capturada
//por el reducer correspondiente.
var updateNewsAnuncios = function updateNewsAnuncios(query) {
  return {
    type: "UPDATE_NEWS_ANUNCIOS",
    payload: query
  };
};
var updateNewsNoticias = function updateNewsNoticias(query) {
  return {
    type: 'UPDATE_NEWS_NOTICIAS',
    payload: query
  };
};

/***/ }),

/***/ "./resources/react/components/ArchiveVisor.js":
/*!****************************************************!*\
  !*** ./resources/react/components/ArchiveVisor.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_lab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/lab */ "./node_modules/@material-ui/lab/esm/index.js");
/* harmony import */ var react_lazy_images__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-lazy-images */ "./node_modules/react-lazy-images/dist/react-lazy-images.es.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

 //Material-UI


 //LazyImg



function ArchiveVisor(_ref) {
  var options = _ref.options;

  if (Array.isArray(options) && options.length !== 0) {
    var files = options.map(function (archive, i) {
      return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: archive.url,
          key: i
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_lazy_images__WEBPACK_IMPORTED_MODULE_3__["LazyImage"], {
          alt: "extensi\xF3n de archivo",
          src: archive.extension,
          placeholder: function placeholder(_ref2) {
            var imageProps = _ref2.imageProps,
                ref = _ref2.ref;
            return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_2__["Skeleton"], {
                ref: ref,
                key: i,
                variant: "rect",
                height: 50,
                width: 50
              })
            );
          },
          actual: function actual(_ref3) {
            var imageProps = _ref3.imageProps;
            return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", _extends({
                key: i,
                width: "50"
              }, imageProps))
            );
          },
          error: function error() {
            return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
                style: {
                  width: '110px',
                  height: '100px',
                  background: 'rgb(252, 72, 80)'
                }
              }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Error al obtener imagen"))
            );
          }
        }))
      );
    });
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
        container: true,
        spacing: 2,
        justify: "space-evenly",
        wrap: "wrap",
        className: "fixGrid"
      }, files))
    );
  }

  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null)
  );
}

/* harmony default export */ __webpack_exports__["default"] = (ArchiveVisor);

/***/ }),

/***/ "./resources/react/components/ImagenVisor.js":
/*!***************************************************!*\
  !*** ./resources/react/components/ImagenVisor.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_lab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/lab */ "./node_modules/@material-ui/lab/esm/index.js");
/* harmony import */ var react_lazy_images__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-lazy-images */ "./node_modules/react-lazy-images/dist/react-lazy-images.es.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

 //Material-UI


 //LazyImg



function ImagenVisor(_ref) {
  var options = _ref.options;

  if (Array.isArray(options) && options.length !== 0) {
    var restante = options.length - 3;
    var imagenes = options.map(function (img, i) {
      if (i === 3) {
        return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            key: i,
            className: "more"
          }, "+", restante)
        );
      } else if (i < 4) {
        return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_lazy_images__WEBPACK_IMPORTED_MODULE_3__["LazyImage"], {
            key: i,
            alt: "imagen".concat(i + 1),
            src: img,
            placeholder: function placeholder(_ref2) {
              var imageProps = _ref2.imageProps,
                  ref = _ref2.ref;
              return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_2__["Skeleton"], {
                  ref: ref,
                  key: i,
                  variant: "rect",
                  height: 100,
                  width: 110
                })
              );
            },
            actual: function actual(_ref3) {
              var imageProps = _ref3.imageProps;
              return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", _extends({
                  key: i
                }, imageProps))
              );
            },
            error: function error() {
              return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
                  style: {
                    width: '110px',
                    height: '100px',
                    background: 'rgb(252, 72, 80)'
                  }
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Error al obtener imagen"))
              );
            }
          })
        );
      } else {
        return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
            key: i,
            src: img,
            alt: "imagen".concat(i + 1),
            style: {
              display: 'none'
            }
          })
        );
      }
    });
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
        container: true,
        spacing: 2,
        justify: "space-evenly",
        wrap: "wrap",
        className: "fixGrid"
      }, imagenes))
    );
  } //Loading


  if (options === 'loading') {
    var SkeletonImg = [1, 2, 3, 4].map(function (e, i) {
      return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_2__["Skeleton"], {
          key: i,
          variant: "rect",
          height: 100,
          width: 110
        })
      );
    });
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
        container: true,
        spacing: 2,
        justify: "space-evenly",
        wrap: "wrap",
        className: "fixGrid"
      }, SkeletonImg))
    );
  }

  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null)
  );
}

/* harmony default export */ __webpack_exports__["default"] = (ImagenVisor);

/***/ }),

/***/ "./resources/react/views/news/ListAnuncios.js":
/*!****************************************************!*\
  !*** ./resources/react/views/news/ListAnuncios.js ***!
  \****************************************************/
/*! exports provided: SkeletonAnuncio, Anuncio, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkeletonAnuncio", function() { return SkeletonAnuncio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Anuncio", function() { return Anuncio; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_lab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/lab */ "./node_modules/@material-ui/lab/esm/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_news_updateNews__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/news/updateNews */ "./resources/react/actions/news/updateNews.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! notistack */ "./node_modules/notistack/build/index.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(notistack__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-infinite-scroll-component */ "./node_modules/react-infinite-scroll-component/dist/index.es.js");


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

 //Material-UI


 //redux


 //SnackBar

 //ScrollInfinitoBOY



function ListAnuncios(_ref) {
  var list = _ref.list,
      updateNewsAnuncios = _ref.updateNewsAnuncios;

  //Crear un SnackBar
  var _useSnackbar = Object(notistack__WEBPACK_IMPORTED_MODULE_6__["useSnackbar"])(),
      enqueueSnackbar = _useSnackbar.enqueueSnackbar; //Variables


  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      hasFinish = _useState2[0],
      setHasFinish = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      noData = _useState4[0],
      setNoData = _useState4[1];

  var cancel = false; //FetchData

  var fetchData = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(offset, limit) {
      var res, _res$data, data, finish;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return axios.get("api/anuncios?offset=".concat(offset, "&limit=").concat(limit));

            case 3:
              res = _context.sent;
              _res$data = res.data, data = _res$data.data, finish = _res$data.finish; //Verificar si está desmontado

              if (!cancel) {
                if (data.length > 0) {
                  updateNewsAnuncios([].concat(_toConsumableArray(list), _toConsumableArray(data)));
                  setHasFinish(finish);
                } else {
                  setNoData(true);
                }
              }

              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              enqueueSnackbar('No se han podido obtener los anuncios', {
                variant: 'error'
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    return function fetchData(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }(); //GetMoreData


  var getMore = function getMore() {
    var offset = list.length;
    fetchData(offset, 7);
  }; //No DATA SET


  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (list.length === 0) {
      getMore();
    } //Al cancelar


    return function () {
      cancel = true;
    };
  }, [list, cancel]); //Al desmontar

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    return function () {
      cancel = true;
      updateNewsAnuncios([]);
    };
  }, [updateNewsAnuncios, cancel]);
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("aside", {
      id: "test",
      className: "BoxAnuncios"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"], {
      variant: "outlined",
      className: "PaperMargin"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "AHead"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "Anuncios"))), list.length !== 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_7__["default"], {
      dataLength: list.length,
      hasMore: !hasFinish,
      next: getMore,
      scrollThreshold: 0.2,
      loader: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(SkeletonAnuncio, null),
      endMessage: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
        style: {
          textAlign: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", null, "No hay m\xE1s anuncios que cargar."))
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Anuncio, {
      option: list
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(SkeletonAnuncio, null), noData && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", null, "No hay anuncios publicados."))))
  );
}

function SkeletonAnuncio() {
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"], {
      variant: "outlined"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", {
      className: "Anuncio"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_3__["Skeleton"], {
      variant: "text",
      className: "ATitle",
      width: 200
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
      className: "AContent"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_3__["Skeleton"], {
      variant: "text",
      width: "100%"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_3__["Skeleton"], {
      variant: "text",
      width: "100%"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_3__["Skeleton"], {
      variant: "text",
      width: "100%"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_3__["Skeleton"], {
      variant: "text",
      width: "100%"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("footer", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_3__["Skeleton"], {
      variant: "text",
      width: 150
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "AId"
    })))
  );
}
function Anuncio(props) {
  var recorrerLista = props.option.map(function (anuncio) {
    var name;

    if (anuncio.privilegio === 'A-') {
      name = anuncio.nameA;
    } else {
      name = anuncio.nameC;
    }

    function createMarkup() {
      return {
        __html: anuncio.content
      };
    }

    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"], {
        variant: "outlined",
        key: anuncio.id,
        className: "AnuncioPaper"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", {
        className: "Anuncio"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "ATitle"
      }, anuncio.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
        className: "AContent",
        dangerouslySetInnerHTML: createMarkup()
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("footer", null, "Escrito por ", name, " ", anuncio.fecha), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "AId"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("small", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", null, "#", anuncio.id)))))
    );
  });
  return recorrerLista;
} //REDUX

var mapStateToProps = function mapStateToProps(state) {
  return {
    list: state.news.dataA
  };
};

var mapDispatchToProps = {
  updateNewsAnuncios: _actions_news_updateNews__WEBPACK_IMPORTED_MODULE_5__["updateNewsAnuncios"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(ListAnuncios));

/***/ }),

/***/ "./resources/react/views/news/ListNoticias.js":
/*!****************************************************!*\
  !*** ./resources/react/views/news/ListNoticias.js ***!
  \****************************************************/
/*! exports provided: ListNoticias, SkeletonNoticia, Noticia, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListNoticias", function() { return ListNoticias; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkeletonNoticia", function() { return SkeletonNoticia; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Noticia", function() { return Noticia; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ImagenVisor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/ImagenVisor */ "./resources/react/components/ImagenVisor.js");
/* harmony import */ var _components_ArchiveVisor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/ArchiveVisor */ "./resources/react/components/ArchiveVisor.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_news_updateNews__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/news/updateNews */ "./resources/react/actions/news/updateNews.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_lab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/lab */ "./node_modules/@material-ui/lab/esm/index.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! notistack */ "./node_modules/notistack/build/index.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(notistack__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-infinite-scroll-component */ "./node_modules/react-infinite-scroll-component/dist/index.es.js");


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

//React
 //Componentes


 //Redux


 //Material-UI


 //SnackBar

 //ScrollInfinitoBOY


function ListNoticias(_ref) {
  var list = _ref.list,
      updateNewsNoticias = _ref.updateNewsNoticias;

  //Crear un SnackBar
  var _useSnackbar = Object(notistack__WEBPACK_IMPORTED_MODULE_8__["useSnackbar"])(),
      enqueueSnackbar = _useSnackbar.enqueueSnackbar; //Variables


  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      hasFinish = _useState2[0],
      setHasFinish = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      noData = _useState4[0],
      setNoData = _useState4[1];

  var cancel = false; //fetchData

  var fetchData = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(offset, limit) {
      var res, _res$data, data, finish;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return axios.get("api/news?offset=".concat(offset, "&limit=").concat(limit));

            case 3:
              res = _context.sent;
              _res$data = res.data, data = _res$data.data, finish = _res$data.finish; //Verificar si estรก desmontado

              if (!cancel) {
                if (data.length > 0) {
                  updateNewsNoticias([].concat(_toConsumableArray(list), _toConsumableArray(data)));
                  setHasFinish(finish);
                } else {
                  setNoData(true);
                }
              }

              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              enqueueSnackbar('No se han podido obtener las noticias', {
                variant: 'error'
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    return function fetchData(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }(); //GetMoreData


  var getMore = function getMore() {
    var offset = list.length;
    fetchData(offset, 5);
  }; //No DATA SET


  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (list.length === 0) {
      getMore();
    } //Al cancelar


    return function () {
      cancel = true;
    };
  }, [list, cancel]); //Al desmontar

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    return function () {
      cancel = true;
      updateNewsNoticias([]);
    };
  }, [updateNewsNoticias, cancel]);
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("article", {
      className: "BoxNoticias"
    }, list.length !== 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_9__["default"], {
      dataLength: list.length,
      hasMore: !hasFinish,
      next: getMore,
      scrollThreshold: 0.3,
      loader: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(SkeletonNoticia, null),
      endMessage: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
        style: {
          textAlign: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", null, "No hay m\u0E23\u0E01s noticias que cargar."))
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Noticia, {
      options: list
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(SkeletonNoticia, null), noData && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", null, "No hay anuncios publicados."))))
  );
}
function SkeletonNoticia() {
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Paper"], {
      variant: "outlined"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", {
      className: "Noticia"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "NHead"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_7__["Skeleton"], {
      variant: "circle",
      className: "NHeadImg"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_7__["Skeleton"], {
      variant: "text",
      className: "NHeadName",
      width: 150
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_7__["Skeleton"], {
      variant: "text",
      className: "NHeadName",
      width: 35
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "NContent"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_7__["Skeleton"], {
      variant: "text",
      className: "NContentTitle",
      width: 200
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
      className: "NContentP"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_7__["Skeleton"], {
      variant: "text",
      width: "100%"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_7__["Skeleton"], {
      variant: "text",
      width: "100%"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_7__["Skeleton"], {
      variant: "text",
      width: "100%"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_7__["Skeleton"], {
      variant: "text",
      width: "100%"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ImagenVisor__WEBPACK_IMPORTED_MODULE_2__["default"], {
      options: "loading"
    })))
  );
}
function Noticia(props) {
  var recorrerList = props.options.map(function (news) {
    //Datos
    var name;
    var avatar;

    if (news.privilegio === 'A-') {
      name = news.nameA;
      avatar = news.avatarA;
    } else {
      name = news.nameC;
      avatar = news.avatarC;
    }

    function createMarkup() {
      return {
        __html: news.content
      };
    }

    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Paper"], {
        variant: "outlined",
        key: news.id
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", {
        className: "Noticia"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "NHead"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Avatar"], {
        src: avatar,
        alt: "Usuario",
        className: "NHeadImg",
        style: {
          backgroundColor: '#B46BD6'
        }
      }, name.substring(0, 1).toUpperCase()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "NHeadName"
      }, name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("small", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", null, "#", news.id))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "NContent"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "NContentTitle"
      }, news.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
        className: "NContentP",
        dangerouslySetInnerHTML: createMarkup()
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ImagenVisor__WEBPACK_IMPORTED_MODULE_2__["default"], {
        options: JSON.parse(news.imgList)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ArchiveVisor__WEBPACK_IMPORTED_MODULE_3__["default"], {
        options: JSON.parse(news.archivesList)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
        className: "NFecha"
      }, "Publicado ", news.fecha)))
    );
  });
  return recorrerList;
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    list: state.news.dataN
  };
};

var mapDispatchToProps = {
  updateNewsNoticias: _actions_news_updateNews__WEBPACK_IMPORTED_MODULE_5__["updateNewsNoticias"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(ListNoticias));

/***/ }),

/***/ "./resources/react/views/news/PageNews.js":
/*!************************************************!*\
  !*** ./resources/react/views/news/PageNews.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _SwitchButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SwitchButton */ "./resources/react/views/news/SwitchButton.js");
/* harmony import */ var _ShowComponentResponsive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ShowComponentResponsive */ "./resources/react/views/news/ShowComponentResponsive.js");
//React
 //Material-UI

 //Componentes




function PageNews() {
  //Titulo
  document.title = "La Candelaria - News";
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "BoxPageNews"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Hidden"], {
      mdUp: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SwitchButton__WEBPACK_IMPORTED_MODULE_2__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ShowComponentResponsive__WEBPACK_IMPORTED_MODULE_3__["default"], null)))
  );
}

/* harmony default export */ __webpack_exports__["default"] = (PageNews);

/***/ }),

/***/ "./resources/react/views/news/ShowComponentResponsive.js":
/*!***************************************************************!*\
  !*** ./resources/react/views/news/ShowComponentResponsive.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _ListNoticias__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ListNoticias */ "./resources/react/views/news/ListNoticias.js");
/* harmony import */ var _ListAnuncios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ListAnuncios */ "./resources/react/views/news/ListAnuncios.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
//React
 //Material-UI


 //Componentes


 //redux



function ShowComponentResponsive(_ref) {
  var content = _ref.content;
  //SwitchButton modo responsive.
  var theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["useTheme"])(); //True si la resoluciรณn es mayor a sm.

  var resolution = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["useMediaQuery"])(theme.breakpoints.up("md"));
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "container"
    }, resolution ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ListNoticias__WEBPACK_IMPORTED_MODULE_3__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ListAnuncios__WEBPACK_IMPORTED_MODULE_4__["default"], null)) :
    /* Verificar el estado del switchNews de la app, para
    saber cual componente se debe mostrar. */
    content === 'noticias' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ListNoticias__WEBPACK_IMPORTED_MODULE_3__["default"], {
      styles: {
        marginTop: '0px',
        marginLeft: '0'
      }
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ListAnuncios__WEBPACK_IMPORTED_MODULE_4__["default"], null))
  );
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    content: state.news.content
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps)(ShowComponentResponsive));

/***/ }),

/***/ "./resources/react/views/news/SwitchButton.js":
/*!****************************************************!*\
  !*** ./resources/react/views/news/SwitchButton.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_news_changeContentNews__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/news/changeContentNews */ "./resources/react/actions/news/changeContentNews.js");
 //Material-UI

 //redux




function SwitchButton(_ref) {
  var changeContentNews = _ref.changeContentNews,
      content = _ref.content;
  //Select Class
  var classNameN = content === 'noticias' ? 'ItemSwitchNews active' : 'ItemSwitchNews';
  var classNameA = content === 'anuncios' ? 'ItemSwitchNews active' : 'ItemSwitchNews'; //HanldeClick

  var handleClickSwitch = function handleClickSwitch(e) {
    if (e.target.id === 'SwitchNoticias') {
      changeContentNews('noticias');
    } else {
      changeContentNews('anuncios');
    }
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "SwitchOptionNews"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grow"], {
    "in": true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Paper"], {
    variant: "outlined"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    id: "SwitchNoticias",
    className: classNameN,
    onClick: handleClickSwitch
  }, "Noticias"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    id: "SwitchAnuncios",
    className: classNameA,
    onClick: handleClickSwitch
  }, "Anuncios"))));
} //REDUX


var mapStateToProps = function mapStateToProps(state) {
  return {
    content: state.news.content
  };
};

var mapDispatchToProps = {
  changeContentNews: _actions_news_changeContentNews__WEBPACK_IMPORTED_MODULE_3__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(SwitchButton));

/***/ })

}]);