(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Opciones"],{

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

/***/ "./resources/react/views/panel/contentChangeAdmin/opciones/RenderOptions.js":
/*!**********************************************************************************!*\
  !*** ./resources/react/views/panel/contentChangeAdmin/opciones/RenderOptions.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _components_RendersGlobal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/RendersGlobal */ "./resources/react/components/RendersGlobal.js");
/* harmony import */ var _components_ButtonLoading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/ButtonLoading */ "./resources/react/components/ButtonLoading.js");
/* harmony import */ var _components_ListDataGlobal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/ListDataGlobal */ "./resources/react/components/ListDataGlobal.js");
/* harmony import */ var _components_reutilizar_verifyErrorCustom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/reutilizar/verifyErrorCustom */ "./resources/react/components/reutilizar/verifyErrorCustom.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_updateInputValue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../actions/updateInputValue */ "./resources/react/actions/updateInputValue.js");
/* harmony import */ var _actions_errorInfo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../actions/errorInfo */ "./resources/react/actions/errorInfo.js");
/* harmony import */ var _actions_updateLoading__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../actions/updateLoading */ "./resources/react/actions/updateLoading.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//React
 //Material-UI


 //Components



 //Redux






function RenderOptions(_ref) {
  var data = _ref.data,
      updateInputValue = _ref.updateInputValue,
      errorInfo = _ref.errorInfo,
      updateLoading = _ref.updateLoading;
  var option = data.option,
      nota = data.nota,
      horario = data.horario,
      estudiante = data.estudiante,
      error = data.error,
      curso = data.curso,
      seccion = data.seccion,
      loading = data.loading;

  var handleChange = function handleChange(e) {
    updateInputValue(e, 'OPTIONS');
  };

  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var error = false; //Verificar datos

    if (option === 'estudiante') {
      var InputsArray = [{
        value: estudiante,
        name: 'estudiante',
        minValue: 3
      }];
      error = Object(_components_reutilizar_verifyErrorCustom__WEBPACK_IMPORTED_MODULE_5__["default"])(InputsArray, errorInfo, 'OPTIONS');
    } else if (option === 'seccion') {
      var _InputsArray = [{
        value: curso,
        name: 'curso'
      }, {
        value: seccion,
        name: 'seccion'
      }];
      error = Object(_components_reutilizar_verifyErrorCustom__WEBPACK_IMPORTED_MODULE_5__["default"])(_InputsArray, errorInfo, 'OPTIONS');
    } //Cancelar REQ si hay errores


    if (error) {
      return null;
    } //REQ


    updateLoading(true, 'OPTIONS');
  }; //Config de Nota


  var notaRadio = {
    title: 'Nota',
    name: 'nota',
    values: [{
      value: 'activo',
      name: 'Activar'
    }, {
      value: 'desactivo',
      name: 'Desactivar'
    }],
    color: 'primary'
  }; //Config de Horario

  var horarioRadio = {
    title: 'Horario',
    name: 'horario',
    values: [{
      value: 'activo',
      name: 'Activar'
    }, {
      value: 'desactivo',
      name: 'Desactivar'
    }],
    color: 'secondary'
  }; //Config de curso

  var cursoSelect = {
    name: 'curso',
    values: [{
      value: '',
      name: 'Grado/Año'
    }].concat(_toConsumableArray(_components_ListDataGlobal__WEBPACK_IMPORTED_MODULE_4__["CursosList"]))
  }; //Config de seccion

  var seccionSelect = {
    name: 'seccion',
    values: [{
      value: '',
      name: 'Seccion'
    }].concat(_toConsumableArray(_components_ListDataGlobal__WEBPACK_IMPORTED_MODULE_4__["SeccionList"]))
  };
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      container: true,
      spacing: 2,
      justify: "center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      item: true,
      xs: 12,
      sm: 5,
      md: 4
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Paper"], {
      variant: "outlined"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SelectFromOptions, {
      action: handleChange,
      value: option
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      item: true,
      xs: 12,
      sm: 10
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Paper"], {
      variant: "outlined"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "Box"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      autoComplete: "off",
      onSubmit: handleSubmit,
      method: "POST",
      style: {
        marginTop: '0'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      container: true,
      spacing: 2,
      justify: "center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      item: true,
      xs: 12,
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_2__["RenderRadios"], {
      val: nota,
      accion: handleChange,
      data: notaRadio
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      item: true,
      xs: 12,
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_2__["RenderRadios"], {
      val: horario,
      accion: handleChange,
      data: horarioRadio
    })), option === 'estudiante' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      item: true,
      xs: 12,
      sm: 6,
      md: 4,
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_2__["RenderInputs"], {
      data: {
        val: estudiante,
        name: 'estudiante',
        label: 'Estudiante'
      },
      accion: handleChange,
      error: error.estudiante
    })), option === 'seccion' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      item: true,
      xs: 5,
      sm: 4,
      md: 3
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_2__["RenderSelect"], {
      action: handleChange,
      val: curso,
      data: cursoSelect,
      error: error.curso
    })), option === 'seccion' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      item: true,
      xs: 5,
      sm: 4,
      md: 3
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_2__["RenderSelect"], {
      action: handleChange,
      val: seccion,
      data: seccionSelect,
      error: error.seccion
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      item: true,
      xs: 12,
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ButtonLoading__WEBPACK_IMPORTED_MODULE_3__["default"], {
      estilo: "outlined",
      colorsito: "inherit",
      text: "Cambiar",
      loading: loading
    })))))))))
  );
}

function SelectFromOptions(_ref2) {
  var action = _ref2.action,
      value = _ref2.value;
  //Config de opciones
  var optionsSelect = {
    name: 'option',
    values: [{
      value: 'estudiante',
      name: 'Estudiante'
    }, {
      value: 'seccion',
      name: 'Sección'
    }]
  };
  return (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "Box"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "title"
    }, "Cambiar opciones de:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_RendersGlobal__WEBPACK_IMPORTED_MODULE_2__["RenderSelect"], {
      action: action,
      val: value,
      data: optionsSelect,
      classNameSet: "select",
      customWidth: "auto",
      empty: false
    })))
  );
} //REDUX


var mapStateToProps = function mapStateToProps(state) {
  return {
    data: state.panelSettings.optionsSection
  };
};

var mapDispatchToProps = {
  updateInputValue: _actions_updateInputValue__WEBPACK_IMPORTED_MODULE_7__["default"],
  errorInfo: _actions_errorInfo__WEBPACK_IMPORTED_MODULE_8__["default"],
  updateLoading: _actions_updateLoading__WEBPACK_IMPORTED_MODULE_9__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(mapStateToProps, mapDispatchToProps)(RenderOptions));

/***/ })

}]);