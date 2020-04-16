(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Publicar"],{

/***/ "./resources/react/components/reutilizar/donwloadFiles.js":
/*!****************************************************************!*\
  !*** ./resources/react/components/reutilizar/donwloadFiles.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var downloadFiles = function downloadFiles(response, fileName, fileExtension) {
  //Url del archivo
  var url = window.URL.createObjectURL(new Blob([response])); //Elemento Link

  var link = document.createElement('a'); //Linkear url

  link.href = url; //Atributos,

  link.setAttribute('download', "".concat(fileName, ".").concat(fileExtension)); //Insertar elemento

  document.body.appendChild(link); //Descargar

  link.click();
};

/* harmony default export */ __webpack_exports__["default"] = (downloadFiles);

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

/***/ "./resources/react/views/panel/contentChangeAdmin/publicar/RenderPublicar.js":
/*!***********************************************************************************!*\
  !*** ./resources/react/views/panel/contentChangeAdmin/publicar/RenderPublicar.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _components_RendersGlobal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/RendersGlobal */ "./resources/react/components/RendersGlobal.js");
/* harmony import */ var _components_ButtonLoading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/ButtonLoading */ "./resources/react/components/ButtonLoading.js");
/* harmony import */ var _components_LoadArchives__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/LoadArchives */ "./resources/react/components/LoadArchives.js");
/* harmony import */ var _components_reutilizar_verifyErrorCustom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/reutilizar/verifyErrorCustom */ "./resources/react/components/reutilizar/verifyErrorCustom.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_updateInputValue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../actions/updateInputValue */ "./resources/react/actions/updateInputValue.js");
/* harmony import */ var _actions_errorInfo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../actions/errorInfo */ "./resources/react/actions/errorInfo.js");
/* harmony import */ var _actions_updateLoading__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../actions/updateLoading */ "./resources/react/actions/updateLoading.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! notistack */ "./node_modules/notistack/build/index.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(notistack__WEBPACK_IMPORTED_MODULE_11__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//React
 //Material-UI

 //Component




 //Redux




 //NotiStack



function RenderPublicar(_ref) {
  var data = _ref.data,
      updateInputValue = _ref.updateInputValue,
      errorInfo = _ref.errorInfo,
      updateLoading = _ref.updateLoading;
  //Destructing
  var option = data.option,
      loading = data.loading,
      error = data.error,
      title = data.title,
      content = data.content,
      img = data.img,
      archives = data.archives; //Máximo de caracteres.

  var contentMaxLength = option === 'noticia' ? 10000 : 520; //Progress

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(0),
      _useState2 = _slicedToArray(_useState, 2),
      progress = _useState2[0],
      setProgress = _useState2[1]; //Crear un SnackBar


  var _useSnackbar = Object(notistack__WEBPACK_IMPORTED_MODULE_11__["useSnackbar"])(),
      enqueueSnackbar = _useSnackbar.enqueueSnackbar;

  var handleChange = function handleChange(e) {
    updateInputValue(e, 'PUBLICAR');
  };

  var onUploadProgress = function onUploadProgress(progressEvent) {
    var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
    setProgress(percentCompleted);
  };

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
              return axios.post('api/news', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: onUploadProgress
              });

            case 4:
              res = _context.sent;
              _context.next = 10;
              break;

            case 7:
              _context.next = 9;
              return axios.post('api/anuncios', formData);

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
              updateLoading(false, 'PUBLICAR');

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

  var handleSubmit = function handleSubmit(e) {
    //Preparativos
    e.preventDefault();
    var errorStatus = false; //Verificar datos

    var InputsArray = [{
      value: title,
      name: 'title',
      minValue: 5
    }, {
      value: content,
      name: 'content',
      minValue: 20
    }];
    errorStatus = Object(_components_reutilizar_verifyErrorCustom__WEBPACK_IMPORTED_MODULE_6__["default"])(InputsArray, errorInfo, 'PUBLICAR'); //Verificar máximo de caracteres

    if (content.length > contentMaxLength) {
      errorInfo('content', '', 'PUBLICAR');
      errorStatus = true;
    } //Verificar máximo de archivos


    if (option === 'noticia') {
      if (archives.length > 4) {
        enqueueSnackbar('Solo puede subir un máximo de 4 archivos', {
          variant: 'warning'
        });
        errorStatus = true;
      }
    } //Preparar data


    var formData = new FormData();
    formData.append('title', title); //Formatear contenido

    formData.append('content', content.replace(/\r?\n/g, "</br>")); //Guardar todos las imagenes en un array

    for (var i = 0; i < img.length; i++) {
      var archivo = img[i];
      formData.append('img[]', archivo); //Verificar tamaño máximo

      if (archivo.size / 1024 > 3072) {
        enqueueSnackbar('Una de las imagenes supera el tamaño máximo', {
          variant: 'warning'
        });
        errorStatus = true;
      }
    } //Guardar todos los archivos en un array


    for (var _i2 = 0; _i2 < archives.length; _i2++) {
      var _archivo = archives[_i2];
      formData.append('archives[]', _archivo); //Verificar tamaño máximo

      if (_archivo.size / 1024 > 2048) {
        enqueueSnackbar('Uno de los archivos supera el tamaño máximo', {
          variant: 'warning'
        });
        errorStatus = true;
      }
    } //Verificar errores


    if (errorStatus) {
      return null;
    } //Loading


    updateLoading(true, 'PUBLICAR'); //Realizar consulta

    fetchData(formData);
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(SelectorPublicar, {
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
      autoComplete: "off",
      onSubmit: handleSubmit,
      method: "POST",
      style: {
        marginTop: '0'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(RenderForm, {
      handleChange: handleChange,
      error: error,
      values: {
        title: title,
        content: content,
        img: img
      },
      loading: loading,
      updateInputValue: updateInputValue,
      option: option,
      contentMaxLength: contentMaxLength,
      progress: progress
    })))))))
  );
}

function RenderForm(_ref3) {
  var handleChange = _ref3.handleChange,
      error = _ref3.error,
      values = _ref3.values,
      option = _ref3.option,
      loading = _ref3.loading,
      updateInputValue = _ref3.updateInputValue,
      contentMaxLength = _ref3.contentMaxLength,
      progress = _ref3.progress;
  //Destructing
  var title = values.title,
      content = values.content,
      img = values.img,
      archives = values.archives;
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      container: true,
      spacing: 2,
      justify: "center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      item: true,
      xs: 12,
      sm: 7,
      md: 5
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_3__["RenderInputs"], {
      data: {
        val: title,
        name: 'title',
        label: 'Título'
      },
      size: "small",
      accion: handleChange,
      error: error.title
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      item: true,
      xs: 12,
      sm: 10,
      md: 8,
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_3__["RenderInputs"], {
      data: {
        val: content,
        name: 'content',
        label: 'Contenido de la publicación'
      },
      accion: handleChange,
      error: error.content,
      textarea: true,
      maxRows: "20"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      item: true,
      xs: 12,
      style: {
        textAlign: 'center'
      }
    }, error.content.status && error.content.message === '' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      style: {
        color: '#f44336'
      }
    }, "".concat(content.length, "/").concat(contentMaxLength, " caracteres")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "".concat(content.length, "/").concat(contentMaxLength, " caracteres"))), option === 'noticia' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      item: true,
      xs: 12,
      sm: 5,
      md: 3
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_LoadArchives__WEBPACK_IMPORTED_MODULE_5__["default"], {
      idName: "uploadPublic",
      accepted: "image/*",
      reset: option,
      files: img,
      action: updateInputValue,
      multiple: true,
      maxSizeFile: {
        unique: '3MB',
        multiple: '3MB'
      },
      label: {
        unique: 'imagenes',
        multiple: 'imagenes'
      },
      name: "img",
      type: "PUBLICAR"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      item: true,
      xs: 12,
      sm: 5,
      md: 3
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_LoadArchives__WEBPACK_IMPORTED_MODULE_5__["default"], {
      idName: "uploadArchivesPublic",
      accepted: ".doc,.docx,.pdf,.xlsx,.xls",
      reset: option,
      files: archives,
      action: updateInputValue,
      multiple: true,
      maxSizeFile: {
        unique: '2MB',
        multiple: '2MB'
      },
      label: {
        unique: 'archivos',
        multiple: 'archivos'
      },
      name: "archives",
      type: "PUBLICAR"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      item: true,
      xs: 12,
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      container: true,
      direction: 'column',
      justify: 'center',
      alignItems: 'center'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ButtonLoading__WEBPACK_IMPORTED_MODULE_4__["default"], {
      estilo: "outlined",
      colorsito: "inherit",
      text: "Publicar",
      loading: loading,
      progressBar: option === 'noticia' ? true : false,
      progress: progress
    }))))
  );
}

function SelectorPublicar(_ref4) {
  var action = _ref4.action,
      value = _ref4.value;
  //Config de opciones
  var publicarSelect = {
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
    }, "Publicar"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_3__["RenderSelect"], {
      action: action,
      val: value,
      data: publicarSelect,
      classNameSet: "select",
      customWidth: "auto",
      empty: false
    })))
  );
} //Redux


var mapStateToProps = function mapStateToProps(state) {
  return {
    data: state.panelSettings.publicarSection
  };
};

var mapDispatchToProps = {
  updateInputValue: _actions_updateInputValue__WEBPACK_IMPORTED_MODULE_8__["default"],
  errorInfo: _actions_errorInfo__WEBPACK_IMPORTED_MODULE_9__["default"],
  updateLoading: _actions_updateLoading__WEBPACK_IMPORTED_MODULE_10__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStateToProps, mapDispatchToProps)(RenderPublicar));

/***/ }),

/***/ "./resources/react/views/panel/contentChangeUser/boletas/RenderBoletas.js":
/*!********************************************************************************!*\
  !*** ./resources/react/views/panel/contentChangeUser/boletas/RenderBoletas.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_reutilizar_donwloadFiles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/reutilizar/donwloadFiles */ "./resources/react/components/reutilizar/donwloadFiles.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! notistack */ "./node_modules/notistack/build/index.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(notistack__WEBPACK_IMPORTED_MODULE_4__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

 //Components

 //Material-UI

 //NotiStack



function RenderBoletas() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      query = _useState2[0],
      setQuery = _useState2[1];

  var cancel = false; //Crear un SnackBar

  var _useSnackbar = Object(notistack__WEBPACK_IMPORTED_MODULE_4__["useSnackbar"])(),
      enqueueSnackbar = _useSnackbar.enqueueSnackbar;

  var fetchData = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var res, _error$response, status, data;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return axios.get('api/archivos/boleta', {
                responseType: 'blob'
              });

            case 3:
              res = _context.sent;
              //Descargar archivo
              Object(_components_reutilizar_donwloadFiles__WEBPACK_IMPORTED_MODULE_2__["default"])(res.data, 'boleta', 'pdf');
              enqueueSnackbar('Descargando boleta', {
                variant: 'info'
              });

              if (!cancel) {
                setQuery(true);
              }

              _context.next = 13;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              _error$response = _context.t0.response, status = _error$response.status, data = _error$response.data;

              if (status === 400) {
                enqueueSnackbar('Su boleta aún no ha sido cargada', {
                  variant: 'warning'
                });
              } else if (status === 403) {
                enqueueSnackbar('No estás autorizado', {
                  variant: 'error'
                });
              } else if (status === 422) {
                enqueueSnackbar('El servidor rechazó tu solicitud', {
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

            case 13:
              if (!cancel) {
                setQuery(true);
              }

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));

    return function fetchData() {
      return _ref.apply(this, arguments);
    };
  }(); //Verificar si ya está la query


  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (!query) {
      fetchData();
    }

    return function () {
      cancel = true;
    };
  }, [query, cancel, setQuery]);

  if (!query) {
    return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", null, "Buscando boleta...")
    );
  }

  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", null, "Respuesta obtenida."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "outlined",
      color: "inherit",
      onClick: function onClick() {
        setQuery(false);
      }
    }, "Click aqu\xED para re-intentar"))
  );
}

/* harmony default export */ __webpack_exports__["default"] = (RenderBoletas);

/***/ })

}]);