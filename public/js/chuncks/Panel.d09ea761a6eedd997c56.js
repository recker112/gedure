(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Panel"],{

/***/ "./resources/react/components/ShowInfoContent.js":
/*!*******************************************************!*\
  !*** ./resources/react/components/ShowInfoContent.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

 //React Router

 //Material-UI


 //Animación

var Transition = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function Transition(props, ref) {
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Slide"], _extends({
      direction: "up",
      ref: ref
    }, props))
  );
});

function ShowInfoContent(_ref) {
  var dataContent = _ref.dataContent,
      defaultPath = _ref.defaultPath,
      _ref$noShowInfo = _ref.noShowInfo,
      noShowInfo = _ref$noShowInfo === void 0 ? false : _ref$noShowInfo,
      _ref$queryParams = _ref.queryParams,
      queryParams = _ref$queryParams === void 0 ? false : _ref$queryParams;
  //Resolution RESPONSIVE DIALOG
  var theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["useTheme"])();
  var fullScreen = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["useMediaQuery"])(theme.breakpoints.down('xs')); //Query Param Select

  var query = useQuery(); //Path

  var _useRouteMatch = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useRouteMatch"])(),
      path = _useRouteMatch.path; //Content


  var content; //Select content

  if (queryParams) {
    content = query.get(queryParams);
  } else {
    content = path;
  } //OpenDialog


  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1]; //Verifi list and open dialog


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    //Verificar si se debe mostrar info.
    var noInfo = noShowInfo;
    var found = false;
    var storage = JSON.parse(localStorage.getItem('noListStorage')); //Verificar que la lista esté en array

    if (_typeof(noInfo) === 'object') {
      //Verificar lista de los items a NO mostrar
      noInfo.map(function (itemContent) {
        if (content === itemContent && !found) {
          found = true;
        }

        return null;
      });
    } //Verificar que exista el contenido actual en la lista


    var foundInList = false;
    dataContent.map(function (object) {
      if (content === object.id) {
        foundInList = true;
      }

      return null;
    }); //Verificar si el usuario quiere seguir viendo esta info

    var seeIt = true;
    storage.map(function (item) {
      if (content === item) {
        seeIt = false;
      }

      return null;
    }); //Fix null value

    if (!found && content === null) {
      found = true;
    }

    var openOnInit = !found && foundInList && seeIt;
    setOpen(openOnInit);
  }, [content]); //Variables

  var Dtitle = '';
  var Dcontent = ''; //Seleccionar contenido

  dataContent.map(function (object) {
    if (content === object.id) {
      Dtitle = object.title;
      Dcontent = object.content;
    }

    return null;
  }); //HANDLE

  var handleClose = function handleClose(e) {
    //Cerrar dialog
    setOpen(false);
  };

  var handleCloseAndNoSeeMore = function handleCloseAndNoSeeMore() {
    //Variable
    var dataStorage = JSON.parse(localStorage.getItem('noListStorage')); //Verificar existencia de data

    if (dataStorage === null || dataStorage.length === 0) {
      //Setear dada
      localStorage.setItem('noListStorage', JSON.stringify([content]));
    } else {
      //Buscador de iguales.
      var found = false;
      dataStorage.map(function (valueLocal) {
        if (content === valueLocal && !found) {
          found = true;
        }

        return null;
      }); //Insertar si NO se encuentra.

      if (!found) {
        var newArray = JSON.stringify([].concat(_toConsumableArray(dataStorage), [content]));
        localStorage.setItem('noListStorage', newArray);
      }
    } //Cerrar dialog


    setOpen(false);
  };

  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Dialog"], {
      open: open,
      onClose: handleClose,
      scroll: "paper",
      fullScreen: fullScreen //Insertar animación
      ,
      TransitionComponent: Transition,
      "aria-labelledby": "info-title-dialog",
      "aria-describedby": "info-description-dialog"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogTitle"], {
      id: "info-title-dialog"
    }, Dtitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContentText"], {
      id: "info-description-dialog"
    }, Dcontent)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogActions"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      color: "secondary",
      onClick: handleCloseAndNoSeeMore
    }, "No mostrar m\xE1s"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      color: "primary",
      onClick: handleClose
    }, "Entendido")))
  );
} // A custom hook that builds on useLocation to parse
// the query string for you.


function useQuery() {
  return new URLSearchParams(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLocation"])().search);
}

/* harmony default export */ __webpack_exports__["default"] = (ShowInfoContent);

/***/ }),

/***/ "./resources/react/views/panel/PagePanel.js":
/*!**************************************************!*\
  !*** ./resources/react/views/panel/PagePanel.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RenderPanel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _RenderContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RenderContent */ "./resources/react/views/panel/RenderContent.js");
/* harmony import */ var _components_ShowInfoContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/ShowInfoContent */ "./resources/react/components/ShowInfoContent.js");
 //Componentes


 //InfoContent

var dataContent = [{
  id: 'reg',
  title: 'Registros',
  content: 'Muestra todos los movimientos realizados en toda la app, desde inicios de sesión hasta movimientos en la matrícula.'
}, {
  id: 'modify',
  title: 'Consultar y Modificar',
  content: 'Permite modificar a los estudiantes de una sección, y muestra una lista de los estudantes existentes en una sección.'
}, {
  id: 'upload',
  title: 'Cargar',
  content: 'Permite cargar boletas o matricula en el servidor, modificando las ya existentes.'
}, {
  id: 'userOptions',
  title: 'Opciones',
  content: 'Configurar algunas opciones del estudiante o una sección completa.'
}, {
  id: 'files',
  title: 'Archivos',
  content: 'Cargar o eliminar los archivos los descargables por el estudiante.'
}, {
  id: 'delete',
  title: 'Eliminar',
  content: 'Elimina boletas, o secciones del sistema.'
}, {
  id: 'posting',
  title: 'Publicar',
  content: 'Publica un auncio o una noticia nueva.'
}, {
  id: 'delPosting',
  title: 'Borrar publicación',
  content: 'Permite eliminar una noticia o anuncio publicado'
}, {
  id: 'boleta',
  title: 'Boleta',
  content: 'Permite descargar la boleta del estudiante solamente si ya se encuentra cargada en el sistema previamente'
}];
function RenderPanel(_ref) {
  var content = _ref.content;
  //Titulo
  document.title = 'La Candelaria - Panel';
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "BoxPagePanel"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RenderContent__WEBPACK_IMPORTED_MODULE_1__["default"], {
      content: content
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ShowInfoContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
      dataContent: dataContent,
      noShowInfo: ['home'],
      queryParams: 'show',
      defaultPath: 'home'
    }))
  );
}

/***/ }),

/***/ "./resources/react/views/panel/RenderContent.js":
/*!******************************************************!*\
  !*** ./resources/react/views/panel/RenderContent.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Routers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Routers */ "./resources/react/views/Routers.js");
//React
 //Router

 //Redux

 //Components

 //Lazy

var Home = Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return __webpack_require__.e(/*! import() | Home */ "Home").then(__webpack_require__.bind(null, /*! ./contentChangeAdmin/home/RenderHome */ "./resources/react/views/panel/contentChangeAdmin/home/RenderHome.js"));
});
var Registros = Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return __webpack_require__.e(/*! import() | Registros */ "Registros").then(__webpack_require__.bind(null, /*! ./contentChangeAdmin/registros/RenderRegistros */ "./resources/react/views/panel/contentChangeAdmin/registros/RenderRegistros.js"));
});
var Modificar = Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return Promise.all(/*! import() | Modificar */[__webpack_require__.e("vendors~DelPublic~Modificar~News"), __webpack_require__.e("Modificar")]).then(__webpack_require__.bind(null, /*! ./contentChangeAdmin/consultarModificar/RenderCO_MO */ "./resources/react/views/panel/contentChangeAdmin/consultarModificar/RenderCO_MO.js"));
});
var Cargar = Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return __webpack_require__.e(/*! import() | Cargar */ "Cargar").then(__webpack_require__.bind(null, /*! ./contentChangeAdmin/cargar/RenderCargar */ "./resources/react/views/panel/contentChangeAdmin/cargar/RenderCargar.js"));
});
var Opciones = Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return __webpack_require__.e(/*! import() | Opciones */ "Opciones").then(__webpack_require__.bind(null, /*! ./contentChangeAdmin/opciones/RenderOptions */ "./resources/react/views/panel/contentChangeAdmin/opciones/RenderOptions.js"));
});
var Borrar = Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return __webpack_require__.e(/*! import() | Borrar */ "Borrar").then(__webpack_require__.bind(null, /*! ./contentChangeAdmin/borrar/RenderBorrar */ "./resources/react/views/panel/contentChangeAdmin/borrar/RenderBorrar.js"));
});
var Publicar = Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return __webpack_require__.e(/*! import() | Publicar */ "Publicar").then(__webpack_require__.bind(null, /*! ./contentChangeAdmin/posting/RenderPublicar */ "./resources/react/views/panel/contentChangeAdmin/posting/RenderPublicar.js"));
});
var BorrarPublicacion = Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return Promise.all(/*! import() | DelPublic */[__webpack_require__.e("vendors~DelPublic~Modificar~News"), __webpack_require__.e("DelPublic")]).then(__webpack_require__.bind(null, /*! ./contentChangeAdmin/delposting/RenderDelPublic */ "./resources/react/views/panel/contentChangeAdmin/delposting/RenderDelPublic.js"));
});
var BoletasUser = Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return __webpack_require__.e(/*! import() | Publicar */ "Publicar").then(__webpack_require__.bind(null, /*! ./contentChangeUser/boletas/RenderBoletas */ "./resources/react/views/panel/contentChangeUser/boletas/RenderBoletas.js"));
});

function RenderContent(_ref) {
  var content = _ref.content,
      privilegio = _ref.privilegio;
  var fixNull;

  if (content === null) {
    fixNull = "home";
  } else {
    fixNull = content;
  }

  if (privilegio === 'A-') {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RenderContentAdmin, {
        content: fixNull
      })
    );
  } else if (privilegio === 'V-') {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RenderContentUser, {
        content: fixNull
      })
    );
  } else {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, "No disponible por los momentos")
    );
  }
}

function RenderContentUser(_ref2) {
  var content = _ref2.content;

  if (content === 'home') {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, "Bienvenido.")
    );
  }

  if (content === 'news') {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null)
    );
  }

  if (content === 'boleta') {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(BoletasUser, null))
    );
  }

  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Routers__WEBPACK_IMPORTED_MODULE_3__["NoFound"], null)
  );
}

function RenderContentAdmin(_ref3) {
  var content = _ref3.content;

  if (content === "home") {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Home, null))
    );
  } else if (content === "reg") {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Registros, null))
    );
  } else if (content === "modify") {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Modificar, null))
    );
  } else if (content === "upload") {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Cargar, null))
    );
  } else if (content === "userOptions") {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Opciones, null))
    );
  } else if (content === "delete") {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Borrar, null))
    );
  } else if (content === "posting") {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Publicar, null))
    );
  } else if (content === "delPosting") {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(BorrarPublicacion, null))
    );
  } else {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Routers__WEBPACK_IMPORTED_MODULE_3__["NoFound"], null)
    );
  }
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    privilegio: state.userData.privilegio
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps)(RenderContent));

/***/ })

}]);