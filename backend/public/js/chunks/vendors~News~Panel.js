(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~News~Panel"],{

/***/ "./node_modules/@material-ui/core/esm/utils/deprecatedPropType.js":
/*!************************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/utils/deprecatedPropType.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return deprecatedPropType; });
function deprecatedPropType(validator, reason) {
  if (false) {}

  return function (props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    if (typeof props[propName] !== 'undefined') {
      return new Error("The ".concat(location, " `").concat(propFullNameSafe, "` of ") + "`".concat(componentNameSafe, "` is deprecated. ").concat(reason));
    }

    return null;
  };
}

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/utils/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/utils/index.js ***!
  \***********************************************************/
/*! exports provided: capitalize, deprecatedPropType, isMuiElement, ownerDocument, ownerWindow, requirePropFactory, setRef, unsupportedProp, useEventCallback, useForkRef, useControlled, useIsFocusVisible */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _capitalize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capitalize */ "./node_modules/@material-ui/core/esm/utils/capitalize.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "capitalize", function() { return _capitalize__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _deprecatedPropType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deprecatedPropType */ "./node_modules/@material-ui/core/esm/utils/deprecatedPropType.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deprecatedPropType", function() { return _deprecatedPropType__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _isMuiElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isMuiElement */ "./node_modules/@material-ui/core/esm/utils/isMuiElement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isMuiElement", function() { return _isMuiElement__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _ownerDocument__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ownerDocument */ "./node_modules/@material-ui/core/esm/utils/ownerDocument.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ownerDocument", function() { return _ownerDocument__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _ownerWindow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ownerWindow */ "./node_modules/@material-ui/core/esm/utils/ownerWindow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ownerWindow", function() { return _ownerWindow__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _requirePropFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./requirePropFactory */ "./node_modules/@material-ui/core/esm/utils/requirePropFactory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requirePropFactory", function() { return _requirePropFactory__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _setRef__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./setRef */ "./node_modules/@material-ui/core/esm/utils/setRef.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setRef", function() { return _setRef__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _unsupportedProp__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./unsupportedProp */ "./node_modules/@material-ui/core/esm/utils/unsupportedProp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unsupportedProp", function() { return _unsupportedProp__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _useEventCallback__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./useEventCallback */ "./node_modules/@material-ui/core/esm/utils/useEventCallback.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventCallback", function() { return _useEventCallback__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _useForkRef__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./useForkRef */ "./node_modules/@material-ui/core/esm/utils/useForkRef.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useForkRef", function() { return _useForkRef__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _useControlled__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./useControlled */ "./node_modules/@material-ui/core/esm/utils/useControlled.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useControlled", function() { return _useControlled__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _focusVisible__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./focusVisible */ "./node_modules/@material-ui/core/esm/utils/focusVisible.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useIsFocusVisible", function() { return _focusVisible__WEBPACK_IMPORTED_MODULE_11__["useIsFocusVisible"]; });














/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/Alert/Alert.js":
/*!**********************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/Alert/Alert.js ***!
  \**********************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/esm/Paper/index.js");
/* harmony import */ var _internal_svg_icons_SuccessOutlined__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../internal/svg-icons/SuccessOutlined */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/SuccessOutlined.js");
/* harmony import */ var _internal_svg_icons_ReportProblemOutlined__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../internal/svg-icons/ReportProblemOutlined */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/ReportProblemOutlined.js");
/* harmony import */ var _internal_svg_icons_ErrorOutline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../internal/svg-icons/ErrorOutline */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/ErrorOutline.js");
/* harmony import */ var _internal_svg_icons_InfoOutlined__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../internal/svg-icons/InfoOutlined */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/InfoOutlined.js");
/* harmony import */ var _internal_svg_icons_Close__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../internal/svg-icons/Close */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/Close.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");














var styles = function styles(theme) {
  var getColor = theme.palette.type === 'light' ? _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["darken"] : _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["lighten"];
  var getBackgroundColor = theme.palette.type === 'light' ? _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["lighten"] : _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["darken"];
  return {
    /* Styles applied to the root element. */
    root: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, theme.typography.body2, {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: 'transparent',
      display: 'flex',
      padding: '6px 16px'
    }),

    /* Styles applied to the root element if `variant="standard"` and `color="success"`. */
    standardSuccess: {
      color: getColor(theme.palette.success.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.success.main, 0.9),
      '& $icon': {
        color: theme.palette.success.main
      }
    },

    /* Styles applied to the root element if `variant="standard"` and `color="info"`. */
    standardInfo: {
      color: getColor(theme.palette.info.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.info.main, 0.9),
      '& $icon': {
        color: theme.palette.info.main
      }
    },

    /* Styles applied to the root element if `variant="standard"` and `color="warning"`. */
    standardWarning: {
      color: getColor(theme.palette.warning.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.warning.main, 0.9),
      '& $icon': {
        color: theme.palette.warning.main
      }
    },

    /* Styles applied to the root element if `variant="standard"` and `color="error"`. */
    standardError: {
      color: getColor(theme.palette.error.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.error.main, 0.9),
      '& $icon': {
        color: theme.palette.error.main
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="success"`. */
    outlinedSuccess: {
      color: getColor(theme.palette.success.main, 0.6),
      border: "1px solid ".concat(theme.palette.success.main),
      '& $icon': {
        color: theme.palette.success.main
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="info"`. */
    outlinedInfo: {
      color: getColor(theme.palette.info.main, 0.6),
      border: "1px solid ".concat(theme.palette.info.main),
      '& $icon': {
        color: theme.palette.info.main
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="warning"`. */
    outlinedWarning: {
      color: getColor(theme.palette.warning.main, 0.6),
      border: "1px solid ".concat(theme.palette.warning.main),
      '& $icon': {
        color: theme.palette.warning.main
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="error"`. */
    outlinedError: {
      color: getColor(theme.palette.error.main, 0.6),
      border: "1px solid ".concat(theme.palette.error.main),
      '& $icon': {
        color: theme.palette.error.main
      }
    },

    /* Styles applied to the root element if `variant="filled"` and `color="success"`. */
    filledSuccess: {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.success.main
    },

    /* Styles applied to the root element if `variant="filled"` and `color="info"`. */
    filledInfo: {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.info.main
    },

    /* Styles applied to the root element if `variant="filled"` and `color="warning"`. */
    filledWarning: {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.warning.main
    },

    /* Styles applied to the root element if `variant="filled"` and `color="error"`. */
    filledError: {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.error.main
    },

    /* Styles applied to the icon wrapper element. */
    icon: {
      marginRight: 12,
      padding: '7px 0',
      display: 'flex',
      fontSize: 22,
      opacity: 0.9
    },

    /* Styles applied to the message wrapper element. */
    message: {
      padding: '8px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },

    /* Styles applied to the action wrapper element if `action` is provided. */
    action: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      paddingLeft: 16,
      marginRight: -8
    }
  };
};
var defaultIconMapping = {
  success: react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_SuccessOutlined__WEBPACK_IMPORTED_MODULE_7__["default"], {
    fontSize: "inherit"
  }),
  warning: react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_ReportProblemOutlined__WEBPACK_IMPORTED_MODULE_8__["default"], {
    fontSize: "inherit"
  }),
  error: react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_ErrorOutline__WEBPACK_IMPORTED_MODULE_9__["default"], {
    fontSize: "inherit"
  }),
  info: react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_InfoOutlined__WEBPACK_IMPORTED_MODULE_10__["default"], {
    fontSize: "inherit"
  })
};

var _ref = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_Close__WEBPACK_IMPORTED_MODULE_11__["default"], {
  fontSize: "small"
});

var Alert = react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function Alert(props, ref) {
  var action = props.action,
      children = props.children,
      classes = props.classes,
      className = props.className,
      _props$closeText = props.closeText,
      closeText = _props$closeText === void 0 ? 'Close' : _props$closeText,
      color = props.color,
      icon = props.icon,
      _props$iconMapping = props.iconMapping,
      iconMapping = _props$iconMapping === void 0 ? defaultIconMapping : _props$iconMapping,
      onClose = props.onClose,
      _props$role = props.role,
      role = _props$role === void 0 ? 'alert' : _props$role,
      _props$severity = props.severity,
      severity = _props$severity === void 0 ? 'success' : _props$severity,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'standard' : _props$variant,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(props, ["action", "children", "classes", "className", "closeText", "color", "icon", "iconMapping", "onClose", "role", "severity", "variant"]);

  return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    role: role,
    square: true,
    elevation: 0,
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.root, classes["".concat(variant).concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_13__["capitalize"])(color || severity))], className),
    ref: ref
  }, other), icon !== false ? react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: classes.icon
  }, icon || iconMapping[severity] || defaultIconMapping[severity]) : null, react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: classes.message
  }, children), action != null ? react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: classes.action
  }, action) : null, action == null && onClose ? react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: classes.action
  }, react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_12__["default"], {
    size: "small",
    "aria-label": closeText,
    title: closeText,
    color: "inherit",
    onClick: onClose
  }, _ref)) : null);
});
 true ? Alert.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,

  /**
   * The content of the component.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  closeText: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * The main color for the alert. Unless provided, the value is taken from the `severity` prop.
   */
  color: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['error', 'info', 'success', 'warning']),

  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   */
  icon: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,

  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
    error: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,
    info: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,
    success: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,
    warning: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node
  }),

  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * The ARIA role attribute of the element.
   */
  role: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * The severity of the alert. This defines the color and icon used.
   */
  severity: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['error', 'info', 'success', 'warning']),

  /**
   * The variant to use.
   */
  variant: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['filled', 'outlined', 'standard'])
} : undefined;
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["withStyles"])(styles, {
  name: 'MuiAlert'
})(Alert));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/Alert/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/Alert/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Alert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Alert */ "./node_modules/@material-ui/lab/esm/Alert/Alert.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _Alert__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/AlertTitle/AlertTitle.js":
/*!********************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/AlertTitle/AlertTitle.js ***!
  \********************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");







var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      fontWeight: theme.typography.fontWeightMedium,
      marginTop: -2
    }
  };
};
var AlertTitle = react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function AlertTitle(props, ref) {
  var classes = props.classes,
      className = props.className,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(props, ["classes", "className"]);

  return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Typography"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    gutterBottom: true,
    component: "div",
    ref: ref,
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_6__["default"])(classes.root, className)
  }, other));
});
 true ? AlertTitle.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string
} : undefined;
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(styles, {
  name: 'MuiAlertTitle'
})(AlertTitle));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/AlertTitle/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/AlertTitle/index.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AlertTitle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AlertTitle */ "./node_modules/@material-ui/lab/esm/AlertTitle/AlertTitle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _AlertTitle__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/Autocomplete/Autocomplete.js":
/*!************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/Autocomplete/Autocomplete.js ***!
  \************************************************************************/
/*! exports provided: createFilterOptions, styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_Popper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Popper */ "./node_modules/@material-ui/core/esm/Popper/index.js");
/* harmony import */ var _material_ui_core_ListSubheader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/ListSubheader */ "./node_modules/@material-ui/core/esm/ListSubheader/index.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/esm/Paper/index.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Chip */ "./node_modules/@material-ui/core/esm/Chip/index.js");
/* harmony import */ var _internal_svg_icons_Close__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../internal/svg-icons/Close */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/Close.js");
/* harmony import */ var _internal_svg_icons_ArrowDropDown__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../internal/svg-icons/ArrowDropDown */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/ArrowDropDown.js");
/* harmony import */ var _useAutocomplete__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../useAutocomplete */ "./node_modules/@material-ui/lab/esm/useAutocomplete/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createFilterOptions", function() { return _useAutocomplete__WEBPACK_IMPORTED_MODULE_14__["createFilterOptions"]; });

















var styles = function styles(theme) {
  var _option;

  return {
    /* Styles applied to the root element. */
    root: {
      '&:hover $clearIndicatorDirty, &$focused $clearIndicatorDirty': {
        visibility: 'visible'
      }
    },

    /* Pseudo-class applied to the root element if focused. */
    focused: {},

    /* Styles applied to the tag elements, e.g. the chips. */
    tag: {
      margin: 3,
      maxWidth: 'calc(100% - 6px)'
    },

    /* Styles applied to the tag elements, e.g. the chips if `size="small"`. */
    tagSizeSmall: {
      margin: 2,
      maxWidth: 'calc(100% - 4px)'
    },

    /* Styles applied when the popup icon is rendered. */
    hasPopupIcon: {},

    /* Styles applied when the clear icon is rendered. */
    hasClearIcon: {},

    /* Styles applied to the Input element. */
    inputRoot: {
      flexWrap: 'wrap',
      '$hasPopupIcon &, $hasClearIcon &': {
        paddingRight: 26 + 4
      },
      '$hasPopupIcon$hasClearIcon &': {
        paddingRight: 52 + 4
      },
      '& $input': {
        width: 0,
        minWidth: 30
      },
      '&[class*="MuiInput-root"]': {
        paddingBottom: 1,
        '& $input': {
          padding: 4
        },
        '& $input:first-child': {
          padding: '6px 0'
        }
      },
      '&[class*="MuiInput-root"][class*="MuiInput-marginDense"]': {
        '& $input': {
          padding: '4px 4px 5px'
        },
        '& $input:first-child': {
          padding: '3px 0 6px'
        }
      },
      '&[class*="MuiOutlinedInput-root"]': {
        padding: 9,
        '$hasPopupIcon &, $hasClearIcon &': {
          paddingRight: 26 + 4 + 9
        },
        '$hasPopupIcon$hasClearIcon &': {
          paddingRight: 52 + 4 + 9
        },
        '& $input': {
          padding: '9.5px 4px'
        },
        '& $input:first-child': {
          paddingLeft: 6
        },
        '& $endAdornment': {
          right: 9
        }
      },
      '&[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"]': {
        padding: 6,
        '& $input': {
          padding: '4.5px 4px'
        }
      },
      '&[class*="MuiFilledInput-root"]': {
        paddingTop: 19,
        paddingLeft: 8,
        '$hasPopupIcon &, $hasClearIcon &': {
          paddingRight: 26 + 4 + 9
        },
        '$hasPopupIcon$hasClearIcon &': {
          paddingRight: 52 + 4 + 9
        },
        '& $input': {
          padding: '9px 4px'
        },
        '& $endAdornment': {
          right: 9
        }
      },
      '&[class*="MuiFilledInput-root"][class*="MuiFilledInput-marginDense"]': {
        paddingBottom: 1,
        '& $input': {
          padding: '4.5px 4px'
        }
      }
    },

    /* Styles applied to the input element. */
    input: {
      flexGrow: 1,
      textOverflow: 'ellipsis',
      opacity: 0
    },

    /* Styles applied to the input element if tag focused. */
    inputFocused: {
      opacity: 1
    },

    /* Styles applied to the endAdornment element. */
    endAdornment: {
      // We use a position absolute to support wrapping tags.
      position: 'absolute',
      right: 0,
      top: 'calc(50% - 14px)' // Center vertically

    },

    /* Styles applied to the clear indicator. */
    clearIndicator: {
      marginRight: -2,
      padding: 4,
      color: theme.palette.action.active,
      visibility: 'hidden'
    },

    /* Styles applied to the clear indicator if the input is dirty. */
    clearIndicatorDirty: {},

    /* Styles applied to the popup indicator. */
    popupIndicator: {
      padding: 2,
      marginRight: -2,
      color: theme.palette.action.active
    },

    /* Styles applied to the popup indicator if the popup is open. */
    popupIndicatorOpen: {
      transform: 'rotate(180deg)'
    },

    /* Styles applied to the popper element. */
    popper: {
      zIndex: theme.zIndex.modal
    },

    /* Styles applied to the popper element if `disablePortal={true}`. */
    popperDisablePortal: {
      position: 'absolute'
    },

    /* Styles applied to the `Paper` component. */
    paper: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, theme.typography.body1, {
      overflow: 'hidden',
      margin: '4px 0'
    }),

    /* Styles applied to the `listbox` component. */
    listbox: {
      listStyle: 'none',
      margin: 0,
      padding: '8px 0px',
      maxHeight: '40vh',
      overflow: 'auto'
    },

    /* Styles applied to the loading wrapper. */
    loading: {
      color: theme.palette.text.secondary,
      padding: '14px 16px'
    },

    /* Styles applied to the no option wrapper. */
    noOptions: {
      color: theme.palette.text.secondary,
      padding: '14px 16px'
    },

    /* Styles applied to the option elements. */
    option: (_option = {
      minHeight: 48,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      cursor: 'pointer',
      paddingTop: 6,
      boxSizing: 'border-box',
      outline: '0',
      WebkitTapHighlightColor: 'transparent',
      paddingBottom: 6,
      paddingLeft: 16,
      paddingRight: 16
    }, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_option, theme.breakpoints.up('sm'), {
      minHeight: 'auto'
    }), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_option, '&[aria-selected="true"]', {
      backgroundColor: theme.palette.action.selected
    }), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_option, '&[data-focus="true"]', {
      backgroundColor: theme.palette.action.hover
    }), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_option, '&:active', {
      backgroundColor: theme.palette.action.selected
    }), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_option, '&[aria-disabled="true"]', {
      opacity: theme.palette.action.disabledOpacity,
      pointerEvents: 'none'
    }), _option),

    /* Styles applied to the group's label elements. */
    groupLabel: {
      backgroundColor: theme.palette.background.paper,
      top: -8
    },

    /* Styles applied to the group's ul elements. */
    groupUl: {
      padding: 0,
      '& $option': {
        paddingLeft: 24
      }
    }
  };
};

function DisablePortal(props) {
  // eslint-disable-next-line react/prop-types
  var anchorEl = props.anchorEl,
      open = props.open,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(props, ["anchorEl", "open"]);

  return react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", other);
}

var _ref = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_internal_svg_icons_Close__WEBPACK_IMPORTED_MODULE_12__["default"], {
  fontSize: "small"
});

var _ref2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_internal_svg_icons_ArrowDropDown__WEBPACK_IMPORTED_MODULE_13__["default"], null);

var Autocomplete = react__WEBPACK_IMPORTED_MODULE_3__["forwardRef"](function Autocomplete(props, ref) {
  /* eslint-disable no-unused-vars */
  var _props$autoComplete = props.autoComplete,
      autoComplete = _props$autoComplete === void 0 ? false : _props$autoComplete,
      _props$autoHighlight = props.autoHighlight,
      autoHighlight = _props$autoHighlight === void 0 ? false : _props$autoHighlight,
      _props$autoSelect = props.autoSelect,
      autoSelect = _props$autoSelect === void 0 ? false : _props$autoSelect,
      _props$blurOnSelect = props.blurOnSelect,
      blurOnSelect = _props$blurOnSelect === void 0 ? false : _props$blurOnSelect,
      ChipProps = props.ChipProps,
      classes = props.classes,
      className = props.className,
      _props$clearOnEscape = props.clearOnEscape,
      clearOnEscape = _props$clearOnEscape === void 0 ? false : _props$clearOnEscape,
      _props$clearText = props.clearText,
      clearText = _props$clearText === void 0 ? 'Clear' : _props$clearText,
      _props$closeIcon = props.closeIcon,
      closeIcon = _props$closeIcon === void 0 ? _ref : _props$closeIcon,
      _props$closeText = props.closeText,
      closeText = _props$closeText === void 0 ? 'Close' : _props$closeText,
      _props$debug = props.debug,
      debug = _props$debug === void 0 ? false : _props$debug,
      _props$defaultValue = props.defaultValue,
      defaultValue = _props$defaultValue === void 0 ? props.multiple ? [] : null : _props$defaultValue,
      _props$disableClearab = props.disableClearable,
      disableClearable = _props$disableClearab === void 0 ? false : _props$disableClearab,
      _props$disableCloseOn = props.disableCloseOnSelect,
      disableCloseOnSelect = _props$disableCloseOn === void 0 ? false : _props$disableCloseOn,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableListWra = props.disableListWrap,
      disableListWrap = _props$disableListWra === void 0 ? false : _props$disableListWra,
      _props$disablePortal = props.disablePortal,
      disablePortal = _props$disablePortal === void 0 ? false : _props$disablePortal,
      filterOptions = props.filterOptions,
      _props$filterSelected = props.filterSelectedOptions,
      filterSelectedOptions = _props$filterSelected === void 0 ? false : _props$filterSelected,
      _props$forcePopupIcon = props.forcePopupIcon,
      forcePopupIcon = _props$forcePopupIcon === void 0 ? 'auto' : _props$forcePopupIcon,
      _props$freeSolo = props.freeSolo,
      freeSolo = _props$freeSolo === void 0 ? false : _props$freeSolo,
      getOptionDisabled = props.getOptionDisabled,
      _props$getOptionLabel = props.getOptionLabel,
      getOptionLabel = _props$getOptionLabel === void 0 ? function (x) {
    return x;
  } : _props$getOptionLabel,
      getOptionSelected = props.getOptionSelected,
      groupBy = props.groupBy,
      idProp = props.id,
      _props$includeInputIn = props.includeInputInList,
      includeInputInList = _props$includeInputIn === void 0 ? false : _props$includeInputIn,
      inputValueProp = props.inputValue,
      _props$ListboxCompone = props.ListboxComponent,
      ListboxComponent = _props$ListboxCompone === void 0 ? 'ul' : _props$ListboxCompone,
      ListboxProps = props.ListboxProps,
      _props$loading = props.loading,
      loading = _props$loading === void 0 ? false : _props$loading,
      _props$loadingText = props.loadingText,
      loadingText = _props$loadingText === void 0 ? 'Loading…' : _props$loadingText,
      _props$multiple = props.multiple,
      multiple = _props$multiple === void 0 ? false : _props$multiple,
      _props$noOptionsText = props.noOptionsText,
      noOptionsText = _props$noOptionsText === void 0 ? 'No options' : _props$noOptionsText,
      onChange = props.onChange,
      onClose = props.onClose,
      onInputChange = props.onInputChange,
      onOpen = props.onOpen,
      open = props.open,
      _props$openOnFocus = props.openOnFocus,
      openOnFocus = _props$openOnFocus === void 0 ? false : _props$openOnFocus,
      _props$openText = props.openText,
      openText = _props$openText === void 0 ? 'Open' : _props$openText,
      options = props.options,
      _props$PaperComponent = props.PaperComponent,
      PaperComponent = _props$PaperComponent === void 0 ? _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9__["default"] : _props$PaperComponent,
      _props$PopperComponen = props.PopperComponent,
      PopperComponentProp = _props$PopperComponen === void 0 ? _material_ui_core_Popper__WEBPACK_IMPORTED_MODULE_7__["default"] : _props$PopperComponen,
      _props$popupIcon = props.popupIcon,
      popupIcon = _props$popupIcon === void 0 ? _ref2 : _props$popupIcon,
      renderGroupProp = props.renderGroup,
      renderInput = props.renderInput,
      renderOptionProp = props.renderOption,
      renderTags = props.renderTags,
      _props$selectOnFocus = props.selectOnFocus,
      selectOnFocus = _props$selectOnFocus === void 0 ? !props.freeSolo : _props$selectOnFocus,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      valueProp = props.value,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(props, ["autoComplete", "autoHighlight", "autoSelect", "blurOnSelect", "ChipProps", "classes", "className", "clearOnEscape", "clearText", "closeIcon", "closeText", "debug", "defaultValue", "disableClearable", "disableCloseOnSelect", "disabled", "disableListWrap", "disablePortal", "filterOptions", "filterSelectedOptions", "forcePopupIcon", "freeSolo", "getOptionDisabled", "getOptionLabel", "getOptionSelected", "groupBy", "id", "includeInputInList", "inputValue", "ListboxComponent", "ListboxProps", "loading", "loadingText", "multiple", "noOptionsText", "onChange", "onClose", "onInputChange", "onOpen", "open", "openOnFocus", "openText", "options", "PaperComponent", "PopperComponent", "popupIcon", "renderGroup", "renderInput", "renderOption", "renderTags", "selectOnFocus", "size", "value"]);
  /* eslint-enable no-unused-vars */


  var PopperComponent = disablePortal ? DisablePortal : PopperComponentProp;

  var _useAutocomplete = Object(_useAutocomplete__WEBPACK_IMPORTED_MODULE_14__["default"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, props, {
    componentName: 'Autocomplete'
  })),
      getRootProps = _useAutocomplete.getRootProps,
      getInputProps = _useAutocomplete.getInputProps,
      getInputLabelProps = _useAutocomplete.getInputLabelProps,
      getPopupIndicatorProps = _useAutocomplete.getPopupIndicatorProps,
      getClearProps = _useAutocomplete.getClearProps,
      getTagProps = _useAutocomplete.getTagProps,
      getListboxProps = _useAutocomplete.getListboxProps,
      getOptionProps = _useAutocomplete.getOptionProps,
      value = _useAutocomplete.value,
      dirty = _useAutocomplete.dirty,
      id = _useAutocomplete.id,
      popupOpen = _useAutocomplete.popupOpen,
      focused = _useAutocomplete.focused,
      focusedTag = _useAutocomplete.focusedTag,
      anchorEl = _useAutocomplete.anchorEl,
      setAnchorEl = _useAutocomplete.setAnchorEl,
      inputValue = _useAutocomplete.inputValue,
      groupedOptions = _useAutocomplete.groupedOptions;

  var startAdornment;

  if (multiple && value.length > 0) {
    var getCustomizedTagProps = function getCustomizedTagProps(params) {
      return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
        className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__["default"])(classes.tag, size === 'small' && classes.tagSizeSmall),
        disabled: disabled
      }, getTagProps(params));
    };

    if (renderTags) {
      startAdornment = renderTags(value, getCustomizedTagProps);
    } else {
      startAdornment = value.map(function (option, index) {
        return react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_11__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
          label: getOptionLabel(option),
          size: size
        }, getCustomizedTagProps({
          index: index
        }), ChipProps));
      });
    }
  }

  var defaultRenderGroup = function defaultRenderGroup(params) {
    return react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("li", {
      key: params.key
    }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_material_ui_core_ListSubheader__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: classes.groupLabel,
      component: "div"
    }, params.key), react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("ul", {
      className: classes.groupUl
    }, params.children));
  };

  var renderGroup = renderGroupProp || defaultRenderGroup;
  var renderOption = renderOptionProp || getOptionLabel;

  var renderListOption = function renderListOption(option, index) {
    var optionProps = getOptionProps({
      option: option,
      index: index
    });
    return react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("li", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, optionProps, {
      className: classes.option
    }), renderOption(option, {
      selected: optionProps['aria-selected'],
      inputValue: inputValue
    }));
  };

  var hasClearIcon = !disableClearable && !disabled;
  var hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;
  return react__WEBPACK_IMPORTED_MODULE_3__["createElement"](react__WEBPACK_IMPORTED_MODULE_3__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
    ref: ref,
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__["default"])(classes.root, className, focused && classes.focused, hasClearIcon && classes.hasClearIcon, hasPopupIcon && classes.hasPopupIcon)
  }, getRootProps(other)), renderInput({
    id: id,
    disabled: disabled,
    fullWidth: true,
    size: size === 'small' ? 'small' : undefined,
    InputLabelProps: getInputLabelProps(),
    InputProps: {
      ref: setAnchorEl,
      className: classes.inputRoot,
      startAdornment: startAdornment,
      endAdornment: react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
        className: classes.endAdornment
      }, hasClearIcon ? react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_10__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, getClearProps(), {
        "aria-label": clearText,
        title: clearText,
        className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__["default"])(classes.clearIndicator, dirty && classes.clearIndicatorDirty)
      }), closeIcon) : null, hasPopupIcon ? react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_10__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, getPopupIndicatorProps(), {
        disabled: disabled,
        "aria-label": popupOpen ? closeText : openText,
        title: popupOpen ? closeText : openText,
        className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__["default"])(classes.popupIndicator, popupOpen && classes.popupIndicatorOpen)
      }), popupIcon) : null)
    },
    inputProps: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
      className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__["default"])(classes.input, focusedTag === -1 && classes.inputFocused),
      disabled: disabled
    }, getInputProps())
  })), popupOpen && anchorEl ? react__WEBPACK_IMPORTED_MODULE_3__["createElement"](PopperComponent, {
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__["default"])(classes.popper, disablePortal && classes.popperDisablePortal),
    style: {
      width: anchorEl ? anchorEl.clientWidth : null
    },
    role: "presentation",
    anchorEl: anchorEl,
    open: true
  }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"](PaperComponent, {
    className: classes.paper
  }, loading && groupedOptions.length === 0 ? react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
    className: classes.loading
  }, loadingText) : null, groupedOptions.length === 0 && !freeSolo && !loading ? react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
    className: classes.noOptions
  }, noOptionsText) : null, groupedOptions.length > 0 ? react__WEBPACK_IMPORTED_MODULE_3__["createElement"](ListboxComponent, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
    className: classes.listbox
  }, getListboxProps(), ListboxProps), groupedOptions.map(function (option, index) {
    if (groupBy) {
      return renderGroup({
        key: option.key,
        children: option.options.map(function (option2, index2) {
          return renderListOption(option2, option.index + index2);
        })
      });
    }

    return renderListOption(option, index);
  })) : null)) : null);
});
 true ? Autocomplete.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the portion of the selected suggestion that has not been typed by the user,
   * known as the completion string, appears inline after the input cursor in the textbox.
   * The inline completion string is visually highlighted and has a selected state.
   */
  autoComplete: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * If `true`, the first option is automatically highlighted.
   */
  autoHighlight: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * If `true`, the selected option becomes the value of the input
   * when the Autocomplete loses focus unless the user chooses
   * a different option or changes the character string in the input.
   */
  autoSelect: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * Control if the input should be blurred when an option is selected:
   *
   * - `false` the input is not blurred.
   * - `true` the input is always blurred.
   * - `touch` the input is blurred after a touch event.
   * - `mouse` the input is blurred after a mouse event.
   */
  blurOnSelect: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOf(['mouse', 'touch']), prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool]),

  /**
   * Props applied to the [`Chip`](/api/chip/) element.
   */
  ChipProps: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,

  /**
   * If `true`, clear all values when the user presses escape and the popup is closed.
   */
  clearOnEscape: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * Override the default text for the *clear* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  clearText: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,

  /**
   * The icon to display in place of the default close icon.
   */
  closeIcon: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,

  /**
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  closeText: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,

  /**
   * If `true`, the popup will ignore the blur event if the input is filled.
   * You can inspect the popup markup with your browser tools.
   * Consider this option when you need to customize the component.
   */
  debug: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * The default input value. Use when the component is not controlled.
   */
  defaultValue: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.any, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.array]),

  /**
   * If `true`, the input can't be cleared.
   */
  disableClearable: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * If `true`, the popup won't close when a value is selected.
   */
  disableCloseOnSelect: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * If `true`, the input will be disabled.
   */
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * If `true`, the list box in the popup will not wrap focus.
   */
  disableListWrap: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * A filter function that determines the options that are eligible.
   *
   * @param {T[]} options The options to render.
   * @param {object} state The state of the component.
   * @returns {T[]}
   */
  filterOptions: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * If `true`, hide the selected options from the list box.
   */
  filterSelectedOptions: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * Force the visibility display of the popup icon.
   */
  forcePopupIcon: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOf(['auto']), prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool]),

  /**
   * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
   */
  freeSolo: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * Used to determine the disabled state for a given option.
   */
  getOptionDisabled: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * Used to determine the string value for a given option.
   * It's used to fill the input (and the list box options if `renderOption` is not provided).
   */
  getOptionLabel: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * Used to determine if an option is selected.
   * Uses strict equality by default.
   */
  getOptionSelected: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * If provided, the options will be grouped under the returned string.
   * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
   *
   * @param {T} options The option to group.
   * @returns {string}
   */
  groupBy: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,

  /**
   * If `true`, the highlight can move to the input.
   */
  includeInputInList: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * The input value.
   */
  inputValue: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,

  /**
   * The component used to render the listbox.
   */
  ListboxComponent: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.elementType,

  /**
   * Props applied to the Listbox element.
   */
  ListboxProps: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,

  /**
   * If `true`, the component is in a loading state.
   */
  loading: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * Text to display when in a loading state.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  loadingText: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,

  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   */
  multiple: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * Text to display when there are no options.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  noOptionsText: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,

  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {T} value
   * @param {string} reason One of "create-option", "select-option", "remove-option", "blur" or "clear".
   */
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggleInput"`, `"escape"`, `"select-option"`, `"blur"`.
   */
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * Callback fired when the input value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {string} value The new value of the text input.
   * @param {string} reason Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`.
   */
  onInputChange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * Control the popup` open state.
   */
  open: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * If `true`, the popup will open on input focus.
   */
  openOnFocus: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * Override the default text for the *open popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  openText: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,

  /**
   * Array of options.
   */
  options: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.array.isRequired,

  /**
   * The component used to render the body of the popup.
   */
  PaperComponent: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.elementType,

  /**
   * The component used to position the popup.
   */
  PopperComponent: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.elementType,

  /**
   * The icon to display in place of the default popup icon.
   */
  popupIcon: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,

  /**
   * Render the group.
   *
   * @param {any} option The group to render.
   * @returns {ReactNode}
   */
  renderGroup: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * Render the input.
   *
   * @param {object} params
   * @returns {ReactNode}
   */
  renderInput: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func.isRequired,

  /**
   * Render the option, use `getOptionLabel` by default.
   *
   * @param {T} option The option to render.
   * @param {object} state The state of the component.
   * @returns {ReactNode}
   */
  renderOption: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * Render the selected value.
   *
   * @param {T[]} value The `value` provided to the component.
   * @param {function} getTagProps A tag props getter.
   * @returns {ReactNode}
   */
  renderTags: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * If `true`, the input's text will be selected on focus.
   * It helps the user clear the selected value.
   */
  selectOnFocus: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * The size of the autocomplete.
   */
  size: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOf(['medium', 'small']),

  /**
   * The value of the autocomplete.
   *
   * The value must have reference equality with the option in order to be selected.
   * You can customize the equality behavior with the `getOptionSelected` prop.
   */
  value: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.any, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.array])
} : undefined;
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__["withStyles"])(styles, {
  name: 'MuiAutocomplete'
})(Autocomplete));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/Autocomplete/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/Autocomplete/index.js ***!
  \*****************************************************************/
/*! exports provided: default, createFilterOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Autocomplete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Autocomplete */ "./node_modules/@material-ui/lab/esm/Autocomplete/Autocomplete.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _Autocomplete__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createFilterOptions", function() { return _Autocomplete__WEBPACK_IMPORTED_MODULE_0__["createFilterOptions"]; });



/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/AvatarGroup/AvatarGroup.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/AvatarGroup/AvatarGroup.js ***!
  \**********************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_is__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Avatar */ "./node_modules/@material-ui/core/esm/Avatar/index.js");








var SPACINGS = {
  small: -16,
  medium: null
};
var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'flex'
    },

    /* Styles applied to the avatar elements. */
    avatar: {
      border: "2px solid ".concat(theme.palette.background.default),
      marginLeft: -8
    }
  };
};
var AvatarGroup = react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function AvatarGroup(props, ref) {
  var childrenProp = props.children,
      classes = props.classes,
      className = props.className,
      _props$spacing = props.spacing,
      spacing = _props$spacing === void 0 ? 'medium' : _props$spacing,
      _props$max = props.max,
      max = _props$max === void 0 ? 5 : _props$max,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(props, ["children", "classes", "className", "spacing", "max"]);

  var children = react__WEBPACK_IMPORTED_MODULE_2__["Children"].toArray(childrenProp).filter(function (child) {
    if (true) {
      if (Object(react_is__WEBPACK_IMPORTED_MODULE_4__["isFragment"])(child)) {
        console.error(["Material-UI: the AvatarGroup component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    return react__WEBPACK_IMPORTED_MODULE_2__["isValidElement"](child);
  });
  var extraAvatars = children.length > max ? children.length - max : 0;
  return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__["default"])(classes.root, className),
    ref: ref
  }, other), children.slice(0, children.length - extraAvatars).map(function (child, index) {
    return react__WEBPACK_IMPORTED_MODULE_2__["cloneElement"](child, {
      className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__["default"])(child.props.className, classes.avatar),
      style: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        zIndex: children.length - index,
        marginLeft: spacing && SPACINGS[spacing] !== undefined ? SPACINGS[spacing] : -spacing
      }, child.props.style)
    });
  }), extraAvatars ? react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: classes.avatar,
    style: {
      zIndex: 0,
      marginLeft: spacing && SPACINGS[spacing] !== undefined ? SPACINGS[spacing] : -spacing
    }
  }, "+", extraAvatars) : null);
});
 true ? AvatarGroup.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The avatars to stack.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * Max avatars to show before +x.
   */
  max: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,

  /**
   * Spacing between avatars.
   */
  spacing: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['medium', 'small']), prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number])
} : undefined;
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__["withStyles"])(styles, {
  name: 'MuiAvatarGroup'
})(AvatarGroup));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/AvatarGroup/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/AvatarGroup/index.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AvatarGroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AvatarGroup */ "./node_modules/@material-ui/lab/esm/AvatarGroup/AvatarGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _AvatarGroup__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/Pagination/Pagination.js":
/*!********************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/Pagination/Pagination.js ***!
  \********************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _usePagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./usePagination */ "./node_modules/@material-ui/lab/esm/Pagination/usePagination.js");
/* harmony import */ var _PaginationItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../PaginationItem */ "./node_modules/@material-ui/lab/esm/PaginationItem/index.js");








var styles = {
  /* Styles applied to the root element. */
  root: {},

  /* Styles applied to the ul element. */
  ul: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    listStyle: 'none'
  }
};

function defaultGetAriaLabel(type, page, selected) {
  if (type === 'page') {
    return "".concat(selected ? '' : 'Go to ', "page ").concat(page);
  }

  return "Go to ".concat(type, " page");
}

var Pagination = react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function Pagination(props, ref) {
  var boundaryCount = props.boundaryCount,
      classes = props.classes,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'standard' : _props$color,
      count = props.count,
      defaultPage = props.defaultPage,
      disabled = props.disabled,
      _props$getItemAriaLab = props.getItemAriaLabel,
      getAriaLabel = _props$getItemAriaLab === void 0 ? defaultGetAriaLabel : _props$getItemAriaLab,
      hideNextButton = props.hideNextButton,
      hidePrevButton = props.hidePrevButton,
      onChange = props.onChange,
      page = props.page,
      _props$renderItem = props.renderItem,
      renderItem = _props$renderItem === void 0 ? function (item) {
    return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_PaginationItem__WEBPACK_IMPORTED_MODULE_7__["default"], item);
  } : _props$renderItem,
      _props$shape = props.shape,
      shape = _props$shape === void 0 ? 'round' : _props$shape,
      showFirstButton = props.showFirstButton,
      showLastButton = props.showLastButton,
      siblingCount = props.siblingCount,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'text' : _props$variant,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(props, ["boundaryCount", "classes", "className", "color", "count", "defaultPage", "disabled", "getItemAriaLabel", "hideNextButton", "hidePrevButton", "onChange", "page", "renderItem", "shape", "showFirstButton", "showLastButton", "siblingCount", "size", "variant"]);

  var _usePagination = Object(_usePagination__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    componentName: 'Pagination'
  })),
      items = _usePagination.items;

  return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("nav", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    "aria-label": "pagination navigation",
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.root, className),
    ref: ref
  }, other), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("ul", {
    className: classes.ul
  }, items.map(function (item, index) {
    return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("li", {
      key: index
    }, renderItem(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, item, {
      color: color,
      'aria-label': getAriaLabel(item.type, item.page, item.selected),
      shape: shape,
      size: size,
      variant: variant
    })));
  })));
}); // @default tags synced with default values from usePagination

 true ? Pagination.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * The active color.
   */
  color: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['default', 'primary', 'secondary']),

  /**
   * The total number of pages.
   * @default 1
   */
  count: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,

  /**
   * The page selected by default when the component is uncontrolled.
   * @default 1
   */
  defaultPage: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,

  /**
   * If `true`, the pagination component will be disabled.
   * @default false
   */
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @param {bool} selected If true, the current page is selected.
   * @returns {string}
   */
  getItemAriaLabel: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * If `true`, hide the next-page button.
   * @default false
   */
  hideNextButton: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * If `true`, hide the previous-page button.
   * @default false
   */
  hidePrevButton: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * The current page.
   */
  page: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,

  /**
   * Render the item.
   *
   * @param {object} params The props to spread on a PaginationItem.
   * @returns {ReactNode}
   */
  renderItem: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * The shape of the pagination items.
   */
  shape: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['round', 'rounded']),

  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,

  /**
   * The size of the pagination component.
   */
  size: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['large', 'medium', 'small']),

  /**
   * The variant to use.
   */
  variant: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['outlined', 'text'])
} : undefined;
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["withStyles"])(styles, {
  name: 'MuiPagination'
})(Pagination));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/Pagination/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/Pagination/index.js ***!
  \***************************************************************/
/*! exports provided: default, usePagination */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Pagination__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pagination */ "./node_modules/@material-ui/lab/esm/Pagination/Pagination.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _Pagination__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _usePagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./usePagination */ "./node_modules/@material-ui/lab/esm/Pagination/usePagination.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePagination", function() { return _usePagination__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/Pagination/usePagination.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/Pagination/usePagination.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return usePagination; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");





function usePagination() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // keep default values in sync with @default tags in Pagination.propTypes
  var _props$boundaryCount = props.boundaryCount,
      boundaryCountProp = _props$boundaryCount === void 0 ? 1 : _props$boundaryCount,
      _props$componentName = props.componentName,
      componentName = _props$componentName === void 0 ? 'usePagination' : _props$componentName,
      _props$count = props.count,
      count = _props$count === void 0 ? 1 : _props$count,
      _props$defaultPage = props.defaultPage,
      defaultPage = _props$defaultPage === void 0 ? 1 : _props$defaultPage,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$hideNextButton = props.hideNextButton,
      hideNextButton = _props$hideNextButton === void 0 ? false : _props$hideNextButton,
      _props$hidePrevButton = props.hidePrevButton,
      hidePrevButton = _props$hidePrevButton === void 0 ? false : _props$hidePrevButton,
      handleChange = props.onChange,
      pageProp = props.page,
      _props$showFirstButto = props.showFirstButton,
      showFirstButton = _props$showFirstButto === void 0 ? false : _props$showFirstButto,
      _props$showLastButton = props.showLastButton,
      showLastButton = _props$showLastButton === void 0 ? false : _props$showLastButton,
      _props$siblingCount = props.siblingCount,
      siblingCount = _props$siblingCount === void 0 ? 1 : _props$siblingCount,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__["default"])(props, ["boundaryCount", "componentName", "count", "defaultPage", "disabled", "hideNextButton", "hidePrevButton", "onChange", "page", "showFirstButton", "showLastButton", "siblingCount"]); // TODO: Update all formulae to remove this adjustment


  var boundaryCount = boundaryCountProp - 1;

  var _useControlled = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_4__["useControlled"])({
    controlled: pageProp,
    default: defaultPage,
    name: componentName
  }),
      _useControlled2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useControlled, 2),
      page = _useControlled2[0],
      setPageState = _useControlled2[1];

  var handleClick = function handleClick(event, value) {
    if (!pageProp) {
      setPageState(value);
    }

    if (handleChange) {
      handleChange(event, value);
    }
  }; // https://dev.to/namirsab/comment/2050


  var range = function range(start, end) {
    var length = end - start + 1;
    return Array.from({
      length: length
    }, function (_, i) {
      return start + i;
    });
  };

  var startPages = range(1, Math.min(boundaryCount + 1, count));
  var endPages = range(Math.max(count - boundaryCount, boundaryCount + 2), count);
  var siblingsStart = Math.max(Math.min( // Natural start
  page - siblingCount, // Lower boundary when page is high
  count - boundaryCount - siblingCount * 2 - 2), // Greater than startPages
  boundaryCount + 3);
  var siblingsEnd = Math.min(Math.max( // Natural end
  page + siblingCount, // Upper boundary when page is low
  boundaryCount + siblingCount * 2 + 3), // Less than endPages
  endPages[0] - 2); // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']

  var itemList = [].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(showFirstButton ? ['first'] : []), Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(hidePrevButton ? [] : ['previous']), Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(startPages), Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(siblingsStart > boundaryCount + 3 ? ['start-ellipsis'] : 2 + boundaryCount < count - boundaryCount - 1 ? [2 + boundaryCount] : []), Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(range(siblingsStart, siblingsEnd)), Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(siblingsEnd < count - boundaryCount - 2 ? ['end-ellipsis'] : count - boundaryCount - 1 > boundaryCount + 1 ? [count - boundaryCount - 1] : []), Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(endPages), Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(hideNextButton ? [] : ['next']), Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(showLastButton ? ['last'] : [])); // Map the button type to its page number

  var buttonPage = function buttonPage(type) {
    switch (type) {
      case 'first':
        return 1;

      case 'previous':
        return page - 1;

      case 'next':
        return page + 1;

      case 'last':
        return count;

      default:
        return null;
    }
  }; // Convert the basic item list to PaginationItem props objects


  var items = itemList.map(function (item) {
    return typeof item === 'number' ? {
      onClick: function onClick(event) {
        handleClick(event, item);
      },
      type: 'page',
      page: item,
      selected: item === page,
      disabled: disabled,
      'aria-current': item === page ? 'true' : undefined
    } : {
      onClick: function onClick(event) {
        handleClick(event, buttonPage(item));
      },
      type: item,
      page: buttonPage(item),
      selected: false,
      disabled: disabled || item.indexOf('ellipsis') === -1 && (item === 'next' || item === 'last' ? page >= count : page <= 1)
    };
  });
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    items: items
  }, other);
}

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/PaginationItem/PaginationItem.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/PaginationItem/PaginationItem.js ***!
  \****************************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_ButtonBase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/ButtonBase */ "./node_modules/@material-ui/core/esm/ButtonBase/index.js");
/* harmony import */ var _internal_svg_icons_FirstPage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../internal/svg-icons/FirstPage */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/FirstPage.js");
/* harmony import */ var _internal_svg_icons_LastPage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../internal/svg-icons/LastPage */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/LastPage.js");
/* harmony import */ var _internal_svg_icons_NavigateBefore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../internal/svg-icons/NavigateBefore */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/NavigateBefore.js");
/* harmony import */ var _internal_svg_icons_NavigateNext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../internal/svg-icons/NavigateNext */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/NavigateNext.js");
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");












var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, theme.typography.body2, {
      borderRadius: 32 / 2,
      textAlign: 'center',
      boxSizing: 'border-box',
      minWidth: 32,
      height: 32,
      padding: '0 6px',
      margin: '0 3px',
      color: theme.palette.text.primary
    }),

    /* Styles applied to the root element if `type="page"`. */
    page: {
      transition: theme.transitions.create(['color', 'background-color'], {
        duration: theme.transitions.duration.short
      }),
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      },
      '&$focusVisible': {
        backgroundColor: theme.palette.action.focus
      },
      '&$selected': {
        backgroundColor: theme.palette.action.selected,
        '&:hover, &$focusVisible': {
          backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["fade"])(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        },
        '&$disabled': {
          opacity: 1,
          color: theme.palette.action.disabled,
          backgroundColor: theme.palette.action.selected
        }
      },
      '&$disabled': {
        opacity: theme.palette.action.disabledOpacity
      }
    },

    /* Styles applied applied to the root element if `size="small"`. */
    sizeSmall: {
      minWidth: 26,
      height: 26,
      borderRadius: 26 / 2,
      margin: '0 1px',
      padding: '0 4px',
      '& $icon': {
        fontSize: theme.typography.pxToRem(18)
      }
    },

    /* Styles applied applied to the root element if `size="large"`. */
    sizeLarge: {
      minWidth: 40,
      height: 40,
      borderRadius: 40 / 2,
      padding: '0 10px',
      fontSize: theme.typography.pxToRem(15),
      '& $icon': {
        fontSize: theme.typography.pxToRem(22)
      }
    },

    /* Styles applied to the root element if `variant="text"` and `color="primary"`. */
    textPrimary: {
      '&$selected': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        '&:hover, &$focusVisible': {
          backgroundColor: theme.palette.primary.dark,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: theme.palette.primary.main
          }
        },
        '&$disabled': {
          color: theme.palette.action.disabled
        }
      }
    },

    /* Styles applied to the root element if `variant="text"` and `color="secondary"`. */
    textSecondary: {
      '&$selected': {
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
        '&:hover, &$focusVisible': {
          backgroundColor: theme.palette.secondary.dark,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: theme.palette.secondary.main
          }
        },
        '&$disabled': {
          color: theme.palette.action.disabled
        }
      }
    },

    /* Styles applied to the root element if `outlined="true"`. */
    outlined: {
      border: "1px solid ".concat(theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'),
      '&$selected': {
        '&$disabled': {
          border: "1px solid ".concat(theme.palette.action.disabledBackground)
        }
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
    outlinedPrimary: {
      '&$selected': {
        color: theme.palette.primary.main,
        border: "1px solid ".concat(Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["fade"])(theme.palette.primary.main, 0.5)),
        backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["fade"])(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        '&:hover, &$focusVisible': {
          backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["fade"])(theme.palette.primary.main, theme.palette.action.activatedOpacity + theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        },
        '&$disabled': {
          color: theme.palette.action.disabled
        }
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
    outlinedSecondary: {
      '&$selected': {
        color: theme.palette.secondary.main,
        border: "1px solid ".concat(Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["fade"])(theme.palette.secondary.main, 0.5)),
        backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["fade"])(theme.palette.secondary.main, theme.palette.action.activatedOpacity),
        '&:hover, &$focusVisible': {
          backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["fade"])(theme.palette.secondary.main, theme.palette.action.activatedOpacity + theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        },
        '&$disabled': {
          color: theme.palette.action.disabled
        }
      }
    },

    /* Styles applied to the root element if `rounded="true"`. */
    rounded: {
      borderRadius: theme.shape.borderRadius
    },

    /* Styles applied to the root element if `type="start-ellipsis"` or `type="end-ellipsis"`. */
    ellipsis: {
      height: 'auto',
      '&$disabled': {
        opacity: theme.palette.action.disabledOpacity
      }
    },

    /* Pseudo-class applied to the root element if keyboard focused. */
    focusVisible: {},

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Pseudo-class applied to the root element if `selected={true}`. */
    selected: {},

    /* Styles applied to the icon element. */
    icon: {
      fontSize: theme.typography.pxToRem(20),
      margin: '0 -8px'
    }
  };
};
var PaginationItem = react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function PaginationItem(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'standard' : _props$color,
      component = props.component,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      page = props.page,
      _props$selected = props.selected,
      selected = _props$selected === void 0 ? false : _props$selected,
      _props$shape = props.shape,
      shape = _props$shape === void 0 ? 'round' : _props$shape,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$type = props.type,
      type = _props$type === void 0 ? 'page' : _props$type,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'text' : _props$variant,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(props, ["classes", "className", "color", "component", "disabled", "page", "selected", "shape", "size", "type", "variant"]);

  return type === 'start-ellipsis' || type === 'end-ellipsis' ? react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    ref: ref,
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.root, classes.ellipsis, disabled && classes.disabled, size !== 'medium' && classes["size".concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_11__["capitalize"])(size))])
  }, "\u2026") : react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_ButtonBase__WEBPACK_IMPORTED_MODULE_6__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    ref: ref,
    component: component,
    disabled: disabled,
    focusVisibleClassName: classes.focusVisible,
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.root, classes.page, classes[variant], classes[shape], className, color !== 'standard' && classes["".concat(variant).concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_11__["capitalize"])(color))], disabled && classes.disabled, selected && classes.selected, size !== 'medium' && classes["size".concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_11__["capitalize"])(size))])
  }, other), type === 'page' && page, type === 'previous' && react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_NavigateBefore__WEBPACK_IMPORTED_MODULE_9__["default"], {
    className: classes.icon
  }), type === 'next' && react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_NavigateNext__WEBPACK_IMPORTED_MODULE_10__["default"], {
    className: classes.icon
  }), type === 'first' && react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_FirstPage__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: classes.icon
  }), type === 'last' && react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_LastPage__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: classes.icon
  }));
});
 true ? PaginationItem.propTypes = {
  /**
   * @ignore
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * The active color.
   */
  color: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['standard', 'primary', 'secondary']),

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.elementType,

  /**
   * If `true`, the item will be disabled.
   */
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * The current page number.
   */
  page: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,

  /**
   * If `true` the pagination item is selected.
   */
  selected: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * The shape of the pagination item.
   */
  shape: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['round', 'rounded']),

  /**
   * The size of the pagination item.
   */
  size: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['small', 'medium', 'large']),

  /**
   * The type of pagination item.
   */
  type: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['page', 'first', 'last', 'next', 'previous', 'start-ellipsis', 'end-ellipsis']),

  /**
   * The pagination item variant.
   */
  variant: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['text', 'outlined'])
} : undefined;
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["withStyles"])(styles, {
  name: 'MuiPaginationItem'
})(PaginationItem));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/PaginationItem/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/PaginationItem/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PaginationItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PaginationItem */ "./node_modules/@material-ui/lab/esm/PaginationItem/PaginationItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _PaginationItem__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/Rating/Rating.js":
/*!************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/Rating/Rating.js ***!
  \************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _material_ui_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/utils */ "./node_modules/@material-ui/utils/esm/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");
/* harmony import */ var _internal_svg_icons_Star__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../internal/svg-icons/Star */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/Star.js");










function clamp(value, min, max) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

function getDecimalPrecision(num) {
  var decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToPrecision(value, precision) {
  if (value == null) {
    return value;
  }

  var nearest = Math.round(value / precision) * precision;
  return Number(nearest.toFixed(getDecimalPrecision(precision)));
}

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'inline-flex',
      position: 'relative',
      fontSize: theme.typography.pxToRem(24),
      color: '#ffb400',
      cursor: 'pointer',
      textAlign: 'left',
      WebkitTapHighlightColor: 'transparent',
      '&$disabled': {
        opacity: 0.5,
        pointerEvents: 'none'
      },
      '&$focusVisible $iconActive': {
        outline: '1px solid #999'
      }
    },

    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      fontSize: theme.typography.pxToRem(18)
    },

    /* Styles applied to the root element if `size="large"`. */
    sizeLarge: {
      fontSize: theme.typography.pxToRem(30)
    },

    /* Styles applied to the root element if `readOnly={true}`. */
    readOnly: {
      pointerEvents: 'none'
    },

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Pseudo-class applied to the root element if keyboard focused. */
    focusVisible: {},

    /* Visually hide an element. */
    visuallyhidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      color: '#000',
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1
    },

    /* Styles applied to the pristine label. */
    pristine: {
      'input:focus + &': {
        top: 0,
        bottom: 0,
        position: 'absolute',
        outline: '1px solid #999',
        width: '100%'
      }
    },

    /* Styles applied to the label elements. */
    label: {
      cursor: 'inherit'
    },

    /* Styles applied to the icon wrapping elements. */
    icon: {
      display: 'flex',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      }),
      // Fix mouseLeave issue.
      // https://github.com/facebook/react/issues/4492
      pointerEvents: 'none'
    },

    /* Styles applied to the icon wrapping elements when empty. */
    iconEmpty: {
      color: theme.palette.action.disabled
    },

    /* Styles applied to the icon wrapping elements when filled. */
    iconFilled: {},

    /* Styles applied to the icon wrapping elements when hover. */
    iconHover: {},

    /* Styles applied to the icon wrapping elements when focus. */
    iconFocus: {},

    /* Styles applied to the icon wrapping elements when active. */
    iconActive: {
      transform: 'scale(1.2)'
    },

    /* Styles applied to the icon wrapping elements when decimals are necessary. */
    decimal: {
      position: 'relative'
    }
  };
};

function IconContainer(props) {
  var value = props.value,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(props, ["value"]);

  return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", other);
}

 true ? IconContainer.propTypes = {
  value: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number.isRequired
} : undefined;
var defaultIcon = react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_Star__WEBPACK_IMPORTED_MODULE_8__["default"], {
  fontSize: "inherit"
});

function defaultLabelText(value) {
  return "".concat(value, " Star").concat(value !== 1 ? 's' : '');
}

var Rating = react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function Rating(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$defaultValue = props.defaultValue,
      defaultValue = _props$defaultValue === void 0 ? null : _props$defaultValue,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      emptyIcon = props.emptyIcon,
      _props$emptyLabelText = props.emptyLabelText,
      emptyLabelText = _props$emptyLabelText === void 0 ? 'Empty' : _props$emptyLabelText,
      _props$getLabelText = props.getLabelText,
      getLabelText = _props$getLabelText === void 0 ? defaultLabelText : _props$getLabelText,
      _props$icon = props.icon,
      icon = _props$icon === void 0 ? defaultIcon : _props$icon,
      _props$IconContainerC = props.IconContainerComponent,
      IconContainerComponent = _props$IconContainerC === void 0 ? IconContainer : _props$IconContainerC,
      _props$max = props.max,
      max = _props$max === void 0 ? 5 : _props$max,
      nameProp = props.name,
      onChange = props.onChange,
      onChangeActive = props.onChangeActive,
      onMouseLeave = props.onMouseLeave,
      onMouseMove = props.onMouseMove,
      _props$precision = props.precision,
      precision = _props$precision === void 0 ? 1 : _props$precision,
      _props$readOnly = props.readOnly,
      readOnly = _props$readOnly === void 0 ? false : _props$readOnly,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      valueProp = props.value,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(props, ["classes", "className", "defaultValue", "disabled", "emptyIcon", "emptyLabelText", "getLabelText", "icon", "IconContainerComponent", "max", "name", "onChange", "onChangeActive", "onMouseLeave", "onMouseMove", "precision", "readOnly", "size", "value"]);

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2__["useState"](),
      defaultName = _React$useState[0],
      setDefaultName = _React$useState[1];

  var name = nameProp || defaultName;
  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](function () {
    // Fallback to this default id when possible.
    // Use the random value for client-side rendering only.
    // We can't use it server-side.
    setDefaultName("mui-rating-".concat(Math.round(Math.random() * 1e5)));
  }, []);

  var _React$useRef = react__WEBPACK_IMPORTED_MODULE_2__["useRef"](valueProp !== undefined),
      isControlled = _React$useRef.current;

  var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_2__["useState"](defaultValue),
      valueState = _React$useState2[0],
      setValueState = _React$useState2[1];

  var valueDerived = isControlled ? valueProp : valueState;

  if (true) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](function () {
      if (isControlled !== (valueProp !== undefined)) {
        console.error(["Material-UI: A component is changing ".concat(isControlled ? 'a ' : 'an un', "controlled Rating to be ").concat(isControlled ? 'un' : '', "controlled."), 'Elements should not switch from uncontrolled to controlled (or vice versa).', 'Decide between using a controlled or uncontrolled Rating ' + 'element for the lifetime of the component.', 'More info: https://fb.me/react-controlled-components'].join('\n'));
      }
    }, [valueProp, isControlled]);
  }

  var valueRounded = roundValueToPrecision(valueDerived, precision);
  var theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__["useTheme"])();

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_2__["useState"]({
    hover: -1,
    focus: -1
  }),
      _React$useState3$ = _React$useState3[0],
      hover = _React$useState3$.hover,
      focus = _React$useState3$.focus,
      setState = _React$useState3[1];

  var value = valueRounded;

  if (hover !== -1) {
    value = hover;
  }

  if (focus !== -1) {
    value = focus;
  }

  var _useIsFocusVisible = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_7__["useIsFocusVisible"])(),
      isFocusVisible = _useIsFocusVisible.isFocusVisible,
      onBlurVisible = _useIsFocusVisible.onBlurVisible,
      focusVisibleRef = _useIsFocusVisible.ref;

  var _React$useState4 = react__WEBPACK_IMPORTED_MODULE_2__["useState"](false),
      focusVisible = _React$useState4[0],
      setFocusVisible = _React$useState4[1];

  var rootRef = react__WEBPACK_IMPORTED_MODULE_2__["useRef"]();
  var handleFocusRef = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_7__["useForkRef"])(focusVisibleRef, rootRef);
  var handleRef = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_7__["useForkRef"])(handleFocusRef, ref);

  var handleMouseMove = function handleMouseMove(event) {
    if (onMouseMove) {
      onMouseMove(event);
    }

    var rootNode = rootRef.current;

    var _rootNode$getBounding = rootNode.getBoundingClientRect(),
        right = _rootNode$getBounding.right,
        left = _rootNode$getBounding.left;

    var _rootNode$firstChild$ = rootNode.firstChild.getBoundingClientRect(),
        width = _rootNode$firstChild$.width;

    var percent;

    if (theme.direction === 'rtl') {
      percent = (right - event.clientX) / (width * max);
    } else {
      percent = (event.clientX - left) / (width * max);
    }

    var newHover = roundValueToPrecision(max * percent + precision / 2, precision);
    newHover = clamp(newHover, precision, max);
    setState(function (prev) {
      return prev.hover === newHover && prev.focus === newHover ? prev : {
        hover: newHover,
        focus: newHover
      };
    });
    setFocusVisible(false);

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  var handleMouseLeave = function handleMouseLeave(event) {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    var newHover = -1;
    setState({
      hover: newHover,
      focus: newHover
    });

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  var handleChange = function handleChange(event) {
    var newValue = parseFloat(event.target.value);

    if (!isControlled) {
      setValueState(newValue);
    }

    if (onChange) {
      onChange(event, newValue);
    }
  };

  var handleClear = function handleClear(event) {
    // Ignore keyboard events
    // https://github.com/facebook/react/issues/7407
    if (event.clientX === 0 && event.clientY === 0) {
      return;
    }

    setState({
      hover: -1,
      focus: -1
    });

    if (!isControlled) {
      setValueState(null);
    }

    if (onChange && parseFloat(event.target.value) === valueRounded) {
      onChange(event, null);
    }
  };

  var handleFocus = function handleFocus(event) {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }

    var newFocus = parseFloat(event.target.value);
    setState(function (prev) {
      return {
        hover: prev.hover,
        focus: newFocus
      };
    });

    if (onChangeActive && focus !== newFocus) {
      onChangeActive(event, newFocus);
    }
  };

  var handleBlur = function handleBlur(event) {
    if (hover !== -1) {
      return;
    }

    if (focusVisible !== false) {
      setFocusVisible(false);
      onBlurVisible();
    }

    var newFocus = -1;
    setState(function (prev) {
      return {
        hover: prev.hover,
        focus: newFocus
      };
    });

    if (onChangeActive && focus !== newFocus) {
      onChangeActive(event, newFocus);
    }
  };

  var item = function item(state, labelProps) {
    var id = "".concat(name, "-").concat(String(state.value).replace('.', '-'));
    var container = react__WEBPACK_IMPORTED_MODULE_2__["createElement"](IconContainerComponent, {
      value: state.value,
      className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.icon, state.filled ? classes.iconFilled : classes.iconEmpty, state.hover && classes.iconHover, state.focus && classes.iconFocus, state.active && classes.iconActive)
    }, emptyIcon && !state.filled ? emptyIcon : icon);

    if (readOnly) {
      return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        key: state.value
      }, labelProps), container);
    }

    return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], {
      key: state.value
    }, react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("label", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      className: classes.label,
      htmlFor: id
    }, labelProps), container, react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", {
      className: classes.visuallyhidden
    }, getLabelText(state.value))), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("input", {
      onFocus: handleFocus,
      onBlur: handleBlur,
      onChange: handleChange,
      onClick: handleClear,
      disabled: disabled,
      value: state.value,
      id: id,
      type: "radio",
      name: name,
      checked: state.checked,
      className: classes.visuallyhidden
    }));
  };

  return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: handleRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.root, className, size !== 'medium' && classes["size".concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_7__["capitalize"])(size))], disabled && classes.disabled, focusVisible && classes.focusVisible, readOnly && classes.readOnly),
    role: readOnly ? 'img' : null,
    "aria-label": readOnly ? getLabelText(value) : null
  }, other), Array.from(new Array(max)).map(function (_, index) {
    var itemValue = index + 1;

    if (precision < 1) {
      var items = Array.from(new Array(1 / precision));
      return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", {
        key: itemValue,
        className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.decimal, itemValue === Math.ceil(value) && (hover !== -1 || focus !== -1) && classes.iconActive)
      }, items.map(function ($, indexDecimal) {
        var itemDecimalValue = roundValueToPrecision(itemValue - 1 + (indexDecimal + 1) * precision, precision);
        return item({
          value: itemDecimalValue,
          filled: itemDecimalValue <= value,
          hover: itemDecimalValue <= hover,
          focus: itemDecimalValue <= focus,
          checked: itemDecimalValue === valueRounded
        }, {
          style: items.length - 1 === indexDecimal ? {} : {
            width: itemDecimalValue === value ? "".concat((indexDecimal + 1) * precision * 100, "%") : '0%',
            overflow: 'hidden',
            zIndex: 1,
            position: 'absolute'
          }
        });
      }));
    }

    return item({
      value: itemValue,
      active: itemValue === value && (hover !== -1 || focus !== -1),
      filled: itemValue <= value,
      hover: itemValue <= hover,
      focus: itemValue <= focus,
      checked: itemValue === valueRounded
    });
  }), !readOnly && !disabled && valueRounded == null && react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("input", {
    value: "",
    id: "".concat(name, "-empty"),
    type: "radio",
    name: name,
    defaultChecked: true,
    className: classes.visuallyhidden
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("label", {
    className: classes.pristine,
    htmlFor: "".concat(name, "-empty")
  }, react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", {
    className: classes.visuallyhidden
  }, emptyLabelText))));
});
 true ? Rating.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,

  /**
   * If `true`, the rating will be disabled.
   */
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * The icon to display when empty.
   */
  emptyIcon: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,

  /**
   * The label read when the rating input is empty.
   */
  emptyLabelText: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
   * @param {number} value The rating label's value to format.
   * @returns {string}
   */
  getLabelText: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * The icon to display.
   */
  icon: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,

  /**
   * The component containing the icon.
   */
  IconContainerComponent: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.elementType,

  /**
   * Maximum rating.
   */
  max: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,

  /**
   * The name attribute of the radio `input` elements.
   * If `readOnly` is false, the prop is required,
   * this input name`should be unique within the parent form.
   */
  name: Object(_material_ui_utils__WEBPACK_IMPORTED_MODULE_5__["chainPropTypes"])(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string, function (props) {
    if (!props.readOnly && !props.name) {
      return new Error(['Material-UI: the prop `name` is required (when `readOnly` is false).', 'Additionally, the input name should be unique within the parent form.'].join('\n'));
    }

    return null;
  }),

  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * Callback function that is fired when the hover state changes.
   *
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChangeActive: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * @ignore
   */
  onMouseLeave: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * @ignore
   */
  onMouseMove: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * The minimum increment value change allowed.
   */
  precision: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,

  /**
   * Removes all hover effects and pointer events.
   */
  readOnly: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * The size of the rating.
   */
  size: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['small', 'medium', 'large']),

  /**
   * The rating value.
   */
  value: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number
} : undefined;
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__["withStyles"])(styles, {
  name: 'MuiRating'
})(Rating));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/Rating/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/Rating/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Rating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rating */ "./node_modules/@material-ui/lab/esm/Rating/Rating.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _Rating__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/Skeleton/Skeleton.js":
/*!****************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/Skeleton/Skeleton.js ***!
  \****************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");






var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'block',
      backgroundColor: theme.palette.action.hover,
      height: '1.2em'
    },

    /* Styles applied to the root element if `variant="text"`. */
    text: {
      marginTop: 0,
      marginBottom: 0,
      height: 'auto',
      transformOrigin: '0 60%',
      transform: 'scale(1, 0.60)',
      borderRadius: theme.shape.borderRadius,
      '&:empty:before': {
        content: '"\\00a0"'
      }
    },

    /* Styles applied to the root element if `variant="rect"`. */
    rect: {},

    /* Styles applied to the root element if `variant="circle"`. */
    circle: {
      borderRadius: '50%'
    },

    /* Styles applied to the root element if `animation="pulse"`. */
    pulse: {
      animation: '$pulse 1.5s ease-in-out 0.5s infinite'
    },
    '@keyframes pulse': {
      '0%': {
        opacity: 1
      },
      '50%': {
        opacity: 0.4
      },
      '100%': {
        opacity: 1
      }
    },

    /* Styles applied to the root element if `animation="wave"`. */
    wave: {
      position: 'relative',
      overflow: 'hidden',
      '&::after': {
        animation: '$wave 1.6s linear 0.5s infinite',
        background: "linear-gradient(90deg, transparent, ".concat(theme.palette.action.hover, ", transparent)"),
        content: '""',
        position: 'absolute',
        transform: 'translateX(-100%)',
        // Avoid flash during server-side hydration
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 1
      }
    },
    '@keyframes wave': {
      '0%': {
        transform: 'translateX(-100%)'
      },
      '60%': {
        // +0.5s of delay between each loop
        transform: 'translateX(100%)'
      },
      '100%': {
        transform: 'translateX(100%)'
      }
    }
  };
};
var Skeleton = react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function Skeleton(props, ref) {
  var _props$animation = props.animation,
      animation = _props$animation === void 0 ? 'pulse' : _props$animation,
      classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'span' : _props$component,
      height = props.height,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'text' : _props$variant,
      width = props.width,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(props, ["animation", "classes", "className", "component", "height", "variant", "width"]);

  return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(classes.root, classes[variant], className, animation !== false && classes[animation])
  }, other, {
    style: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      width: width,
      height: height
    }, other.style)
  }));
});
 true ? Skeleton.propTypes = {
  /**
   * The animation.
   * If `false` the animation effect is disabled.
   */
  animation: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOf(['pulse', 'wave', false]),

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object.isRequired,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.elementType,

  /**
   * Height of the skeleton.
   * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
   */
  height: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string]),

  /**
   * The type of content that will be rendered.
   */
  variant: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOf(['text', 'rect', 'circle']),

  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element with no width of its own.
   */
  width: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string])
} : undefined;
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["withStyles"])(styles, {
  name: 'MuiSkeleton'
})(Skeleton));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/Skeleton/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/Skeleton/index.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Skeleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Skeleton */ "./node_modules/@material-ui/lab/esm/Skeleton/Skeleton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _Skeleton__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/SpeedDial/SpeedDial.js":
/*!******************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/SpeedDial/SpeedDial.js ***!
  \******************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_is__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_Zoom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Zoom */ "./node_modules/@material-ui/core/esm/Zoom/index.js");
/* harmony import */ var _material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Fab */ "./node_modules/@material-ui/core/esm/Fab/index.js");
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");











function getOrientation(direction) {
  if (direction === 'up' || direction === 'down') {
    return 'vertical';
  }

  if (direction === 'right' || direction === 'left') {
    return 'horizontal';
  }

  return undefined;
}

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

var dialRadius = 32;
var spacingActions = 16;
var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      zIndex: theme.zIndex.speedDial,
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none'
    },

    /* Styles applied to the Fab component. */
    fab: {
      pointerEvents: 'auto'
    },

    /* Styles applied to the root if direction="up" */
    directionUp: {
      flexDirection: 'column-reverse',
      '& $actions': {
        flexDirection: 'column-reverse',
        marginBottom: -dialRadius,
        paddingBottom: spacingActions + dialRadius
      }
    },

    /* Styles applied to the root if direction="down" */
    directionDown: {
      flexDirection: 'column',
      '& $actions': {
        flexDirection: 'column',
        marginTop: -dialRadius,
        paddingTop: spacingActions + dialRadius
      }
    },

    /* Styles applied to the root if direction="left" */
    directionLeft: {
      flexDirection: 'row-reverse',
      '& $actions': {
        flexDirection: 'row-reverse',
        marginRight: -dialRadius,
        paddingRight: spacingActions + dialRadius
      }
    },

    /* Styles applied to the root if direction="right" */
    directionRight: {
      flexDirection: 'row',
      '& $actions': {
        flexDirection: 'row',
        marginLeft: -dialRadius,
        paddingLeft: spacingActions + dialRadius
      }
    },

    /* Styles applied to the actions (`children` wrapper) element. */
    actions: {
      display: 'flex',
      pointerEvents: 'auto'
    },

    /* Styles applied to the actions (`children` wrapper) element if `open={false}`. */
    actionsClosed: {
      transition: 'top 0s linear 0.2s',
      pointerEvents: 'none'
    }
  };
};
var SpeedDial = react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function SpeedDial(props, ref) {
  var ariaLabel = props.ariaLabel,
      _props$FabProps = props.FabProps;
  _props$FabProps = _props$FabProps === void 0 ? {} : _props$FabProps;

  var origDialButtonRef = _props$FabProps.ref,
      FabProps = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_props$FabProps, ["ref"]),
      childrenProp = props.children,
      classes = props.classes,
      className = props.className,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'up' : _props$direction,
      _props$hidden = props.hidden,
      hidden = _props$hidden === void 0 ? false : _props$hidden,
      icon = props.icon,
      onBlur = props.onBlur,
      onClose = props.onClose,
      onFocus = props.onFocus,
      onKeyDown = props.onKeyDown,
      onMouseEnter = props.onMouseEnter,
      onMouseLeave = props.onMouseLeave,
      onOpen = props.onOpen,
      open = props.open,
      openIcon = props.openIcon,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? _material_ui_core_Zoom__WEBPACK_IMPORTED_MODULE_7__["default"] : _props$TransitionComp,
      _props$transitionDura = props.transitionDuration,
      transitionDuration = _props$transitionDura === void 0 ? {
    enter: _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__["duration"].enteringScreen,
    exit: _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__["duration"].leavingScreen
  } : _props$transitionDura,
      TransitionProps = props.TransitionProps,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(props, ["ariaLabel", "FabProps", "children", "classes", "className", "direction", "hidden", "icon", "onBlur", "onClose", "onFocus", "onKeyDown", "onMouseEnter", "onMouseLeave", "onOpen", "open", "openIcon", "TransitionComponent", "transitionDuration", "TransitionProps"]);

  var eventTimer = react__WEBPACK_IMPORTED_MODULE_2__["useRef"]();
  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](function () {
    return function () {
      clearTimeout(eventTimer.current);
    };
  }, []);
  /**
   * an index in actions.current
   */

  var focusedAction = react__WEBPACK_IMPORTED_MODULE_2__["useRef"](0);
  /**
   * pressing this key while the focus is on a child SpeedDialAction focuses
   * the next SpeedDialAction.
   * It is equal to the first arrow key pressed while focus is on the SpeedDial
   * that is not orthogonal to the direction.
   * @type {utils.ArrowKey?}
   */

  var nextItemArrowKey = react__WEBPACK_IMPORTED_MODULE_2__["useRef"]();
  /**
   * refs to the Button that have an action associated to them in this SpeedDial
   * [Fab, ...(SpeedDialActions > Button)]
   * @type {HTMLButtonElement[]}
   */

  var actions = react__WEBPACK_IMPORTED_MODULE_2__["useRef"]([]);
  actions.current = [actions.current[0]];
  var handleOwnFabRef = react__WEBPACK_IMPORTED_MODULE_2__["useCallback"](function (fabFef) {
    actions.current[0] = fabFef;
  }, []);
  var handleFabRef = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_9__["useForkRef"])(origDialButtonRef, handleOwnFabRef);
  /**
   * creates a ref callback for the Button in a SpeedDialAction
   * Is called before the original ref callback for Button that was set in buttonProps
   *
   * @param dialActionIndex {number}
   * @param origButtonRef {React.RefObject?}
   */

  var createHandleSpeedDialActionButtonRef = function createHandleSpeedDialActionButtonRef(dialActionIndex, origButtonRef) {
    return function (buttonRef) {
      actions.current[dialActionIndex + 1] = buttonRef;

      if (origButtonRef) {
        origButtonRef(buttonRef);
      }
    };
  };

  var handleKeyDown = function handleKeyDown(event) {
    if (onKeyDown) {
      onKeyDown(event);
    }

    var key = event.key.replace('Arrow', '').toLowerCase();
    var _nextItemArrowKey$cur = nextItemArrowKey.current,
        nextItemArrowKeyCurrent = _nextItemArrowKey$cur === void 0 ? key : _nextItemArrowKey$cur;

    if (event.key === 'Escape') {
      if (onClose) {
        actions.current[0].focus();
        onClose(event, 'escapeKeyDown');
      }

      return;
    }

    if (getOrientation(key) === getOrientation(nextItemArrowKeyCurrent) && getOrientation(key) !== undefined) {
      event.preventDefault();
      var actionStep = key === nextItemArrowKeyCurrent ? 1 : -1; // stay within array indices

      var nextAction = clamp(focusedAction.current + actionStep, 0, actions.current.length - 1);
      actions.current[nextAction].focus();
      focusedAction.current = nextAction;
      nextItemArrowKey.current = nextItemArrowKeyCurrent;
    }
  };

  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](function () {
    // actions were closed while navigation state was not reset
    if (!open) {
      focusedAction.current = 0;
      nextItemArrowKey.current = undefined;
    }
  }, [open]);

  var handleClose = function handleClose(event) {
    if (event.type === 'mouseleave' && onMouseLeave) {
      onMouseLeave(event);
    }

    if (event.type === 'blur' && onBlur) {
      onBlur(event);
    }

    clearTimeout(eventTimer.current);

    if (onClose) {
      if (event.type === 'blur') {
        event.persist();
        eventTimer.current = setTimeout(function () {
          onClose(event, 'blur');
        });
      } else {
        onClose(event, 'mouseLeave');
      }
    }
  };

  var handleClick = function handleClick(event) {
    if (FabProps.onClick) {
      FabProps.onClick(event);
    }

    clearTimeout(eventTimer.current);

    if (open) {
      if (onClose) {
        onClose(event, 'toggle');
      }
    } else if (onOpen) {
      onOpen(event, 'toggle');
    }
  };

  var handleOpen = function handleOpen(event) {
    if (event.type === 'mouseenter' && onMouseEnter) {
      onMouseEnter(event);
    }

    if (event.type === 'focus' && onFocus) {
      onFocus(event);
    } // When moving the focus between two items,
    // a chain if blur and focus event is triggered.
    // We only handle the last event.


    clearTimeout(eventTimer.current);

    if (onOpen && !open) {
      event.persist(); // Wait for a future focus or click event

      eventTimer.current = setTimeout(function () {
        var eventMap = {
          focus: 'focus',
          mouseenter: 'mouseEnter'
        };
        onOpen(event, eventMap[event.type]);
      });
    }
  }; // Filter the label for valid id characters.


  var id = ariaLabel.replace(/^[^a-z]+|[^\w:.-]+/gi, '');
  var allItems = react__WEBPACK_IMPORTED_MODULE_2__["Children"].toArray(childrenProp).filter(function (child) {
    if (true) {
      if (Object(react_is__WEBPACK_IMPORTED_MODULE_3__["isFragment"])(child)) {
        console.error(["Material-UI: the SpeedDial component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    return react__WEBPACK_IMPORTED_MODULE_2__["isValidElement"](child);
  });
  var children = allItems.map(function (child, index) {
    var _child$props$FabProps = child.props.FabProps;
    _child$props$FabProps = _child$props$FabProps === void 0 ? {} : _child$props$FabProps;

    var origButtonRef = _child$props$FabProps.ref,
        ChildFabProps = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_child$props$FabProps, ["ref"]);

    return react__WEBPACK_IMPORTED_MODULE_2__["cloneElement"](child, {
      FabProps: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, ChildFabProps, {
        ref: createHandleSpeedDialActionButtonRef(index, origButtonRef)
      }),
      delay: 30 * (open ? index : allItems.length - index),
      open: open,
      id: "".concat(id, "-action-").concat(index)
    });
  });
  return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__["default"])(classes.root, classes["direction".concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_9__["capitalize"])(direction))], className),
    ref: ref,
    role: "presentation",
    onKeyDown: handleKeyDown,
    onBlur: handleClose,
    onFocus: handleOpen,
    onMouseEnter: handleOpen,
    onMouseLeave: handleClose
  }, other), react__WEBPACK_IMPORTED_MODULE_2__["createElement"](TransitionComponent, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    in: !hidden,
    timeout: transitionDuration,
    unmountOnExit: true
  }, TransitionProps), react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_8__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    color: "primary",
    "aria-label": ariaLabel,
    "aria-haspopup": "true",
    "aria-expanded": open,
    "aria-controls": "".concat(id, "-actions")
  }, FabProps, {
    onClick: handleClick,
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__["default"])(classes.fab, FabProps.className),
    ref: handleFabRef
  }), react__WEBPACK_IMPORTED_MODULE_2__["isValidElement"](icon) && Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_9__["isMuiElement"])(icon, ['SpeedDialIcon']) ? react__WEBPACK_IMPORTED_MODULE_2__["cloneElement"](icon, {
    open: open
  }) : icon)), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    id: "".concat(id, "-actions"),
    role: "menu",
    "aria-orientation": getOrientation(direction),
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__["default"])(classes.actions, !open && classes.actionsClosed)
  }, children));
});
 true ? SpeedDial.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The aria-label of the button element.
   * Also used to provide the `id` for the `SpeedDial` element and its children.
   */
  ariaLabel: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string.isRequired,

  /**
   * SpeedDialActions to display when the SpeedDial is `open`.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,

  /**
   * The direction the actions open relative to the floating action button.
   */
  direction: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOf(['down', 'left', 'right', 'up']),

  /**
   * Props applied to the [`Fab`](/api/fab/) element.
   */
  FabProps: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,

  /**
   * If `true`, the SpeedDial will be hidden.
   */
  hidden: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * The icon to display in the SpeedDial Fab. The `SpeedDialIcon` component
   * provides a default Icon with animation.
   */
  icon: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,

  /**
   * @ignore
   */
  onBlur: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggle"`, `"blur"`, `"mouseLeave"`, `"escapeKeyDown"`.
   */
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * @ignore
   */
  onFocus: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * @ignore
   */
  onKeyDown: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * @ignore
   */
  onMouseEnter: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * @ignore
   */
  onMouseLeave: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * Callback fired when the component requests to be open.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggle"`, `"focus"`, `"mouseEnter"`.
   */
  onOpen: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * If `true`, the SpeedDial is open.
   */
  open: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool.isRequired,

  /**
   * The icon to display in the SpeedDial Fab when the SpeedDial is open.
   */
  openIcon: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.elementType,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.shape({
    appear: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,
    enter: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,
    exit: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number
  })]),

  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object
} : undefined;
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__["withStyles"])(styles, {
  name: 'MuiSpeedDial'
})(SpeedDial));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/SpeedDial/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/SpeedDial/index.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SpeedDial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpeedDial */ "./node_modules/@material-ui/lab/esm/SpeedDial/SpeedDial.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _SpeedDial__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/SpeedDialAction/SpeedDialAction.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/SpeedDialAction/SpeedDialAction.js ***!
  \******************************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Fab */ "./node_modules/@material-ui/core/esm/Fab/index.js");
/* harmony import */ var _material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Tooltip */ "./node_modules/@material-ui/core/esm/Tooltip/index.js");
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");


// @inheritedComponent Tooltip







var styles = function styles(theme) {
  return {
    /* Styles applied to the Fab component. */
    fab: {
      margin: 8,
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.paper,
      '&:hover': {
        backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["emphasize"])(theme.palette.background.paper, 0.15)
      },
      transition: "".concat(theme.transitions.create('transform', {
        duration: theme.transitions.duration.shorter
      }), ", opacity 0.8s"),
      opacity: 1
    },

    /* Styles applied to the Fab component if `open={false}`. */
    fabClosed: {
      opacity: 0,
      transform: 'scale(0)'
    },

    /* Styles applied to the root element if `tooltipOpen={true}`. */
    staticTooltip: {
      position: 'relative',
      display: 'flex',
      '& $staticTooltipLabel': {
        transition: theme.transitions.create(['transform', 'opacity'], {
          duration: theme.transitions.duration.shorter
        }),
        opacity: 1
      }
    },

    /* Styles applied to the root element if `tooltipOpen={true}` and `open={false}`. */
    staticTooltipClosed: {
      '& $staticTooltipLabel': {
        opacity: 0,
        transform: 'scale(0.5)'
      }
    },

    /* Styles applied to the static tooltip label if `tooltipOpen={true}`. */
    staticTooltipLabel: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      position: 'absolute'
    }, theme.typography.body1, {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[1],
      color: theme.palette.text.secondary,
      padding: '4px 16px'
    }),

    /* Styles applied to the root if `tooltipOpen={true}` and `tooltipPlacement="left"`` */
    tooltipPlacementLeft: {
      alignItems: 'center',
      '& $staticTooltipLabel': {
        transformOrigin: '100% 50%',
        right: '100%',
        marginRight: 8
      }
    },

    /* Styles applied to the root if `tooltipOpen={true}` and `tooltipPlacement="right"`` */
    tooltipPlacementRight: {
      alignItems: 'center',
      '& $staticTooltipLabel': {
        transformOrigin: '0% 50%',
        left: '100%',
        marginLeft: 8
      }
    }
  };
};
var SpeedDialAction = react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function SpeedDialAction(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$delay = props.delay,
      delay = _props$delay === void 0 ? 0 : _props$delay,
      _props$FabProps = props.FabProps,
      FabProps = _props$FabProps === void 0 ? {} : _props$FabProps,
      icon = props.icon,
      id = props.id,
      open = props.open,
      TooltipClasses = props.TooltipClasses,
      _props$tooltipOpen = props.tooltipOpen,
      tooltipOpenProp = _props$tooltipOpen === void 0 ? false : _props$tooltipOpen,
      _props$tooltipPlaceme = props.tooltipPlacement,
      tooltipPlacement = _props$tooltipPlaceme === void 0 ? 'left' : _props$tooltipPlaceme,
      tooltipTitle = props.tooltipTitle,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(props, ["classes", "className", "delay", "FabProps", "icon", "id", "open", "TooltipClasses", "tooltipOpen", "tooltipPlacement", "tooltipTitle"]);

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2__["useState"](tooltipOpenProp),
      tooltipOpen = _React$useState[0],
      setTooltipOpen = _React$useState[1];

  var handleTooltipClose = function handleTooltipClose() {
    setTooltipOpen(false);
  };

  var handleTooltipOpen = function handleTooltipOpen() {
    setTooltipOpen(true);
  };

  var transitionStyle = {
    transitionDelay: "".concat(delay, "ms")
  };
  var fab = react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_6__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    size: "small",
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.fab, className, !open && classes.fabClosed),
    tabIndex: -1,
    role: "menuitem",
    "aria-describedby": "".concat(id, "-label")
  }, FabProps, {
    style: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, transitionStyle, {}, FabProps.style)
  }), icon);

  if (tooltipOpenProp) {
    return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      id: id,
      ref: ref,
      className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.staticTooltip, classes["tooltipPlacement".concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_8__["capitalize"])(tooltipPlacement))], !open && classes.staticTooltipClosed)
    }, other), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", {
      style: transitionStyle,
      id: "".concat(id, "-label"),
      className: classes.staticTooltipLabel
    }, tooltipTitle), fab);
  }

  return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_7__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    id: id,
    ref: ref,
    title: tooltipTitle,
    placement: tooltipPlacement,
    onClose: handleTooltipClose,
    onOpen: handleTooltipOpen,
    open: open && tooltipOpen,
    classes: TooltipClasses
  }, other), fab);
});
 true ? SpeedDialAction.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   */
  delay: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,

  /**
   * Props applied to the [`Fab`](/api/fab/) component.
   */
  FabProps: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,

  /**
   * The Icon to display in the SpeedDial Fab.
   */
  icon: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,

  /**
   * @ignore
   */
  id: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * @ignore
   */
  open: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * Classes applied to the [`Tooltip`](/api/tooltip/) element.
   */
  TooltipClasses: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,

  /**
   * Make the tooltip always visible when the SpeedDial is open.
   */
  tooltipOpen: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * Placement of the tooltip.
   */
  tooltipPlacement: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),

  /**
   * Label to display in the tooltip.
   */
  tooltipTitle: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node
} : undefined;
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["withStyles"])(styles, {
  name: 'MuiSpeedDialAction'
})(SpeedDialAction));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/SpeedDialAction/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/SpeedDialAction/index.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SpeedDialAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpeedDialAction */ "./node_modules/@material-ui/lab/esm/SpeedDialAction/SpeedDialAction.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _SpeedDialAction__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/SpeedDialIcon/SpeedDialIcon.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/SpeedDialIcon/SpeedDialIcon.js ***!
  \**************************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _internal_svg_icons_Add__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../internal/svg-icons/Add */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/Add.js");







var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      height: 24
    },

    /* Styles applied to the icon component. */
    icon: {
      transition: theme.transitions.create(['transform', 'opacity'], {
        duration: theme.transitions.duration.short
      })
    },

    /* Styles applied to the icon component if `open={true}`. */
    iconOpen: {
      transform: 'rotate(45deg)'
    },

    /* Styles applied to the icon when and `openIcon` is provided and if `open={true}`. */
    iconWithOpenIconOpen: {
      opacity: 0
    },

    /* Styles applied to the `openIcon` if provided. */
    openIcon: {
      position: 'absolute',
      transition: theme.transitions.create(['transform', 'opacity'], {
        duration: theme.transitions.duration.short
      }),
      opacity: 0,
      transform: 'rotate(-45deg)'
    },

    /* Styles applied to the `openIcon` if provided and if `open={true}`. */
    openIconOpen: {
      transform: 'rotate(0deg)',
      opacity: 1
    }
  };
};
var SpeedDialIcon = react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function SpeedDialIcon(props, ref) {
  var className = props.className,
      classes = props.classes,
      iconProp = props.icon,
      open = props.open,
      openIconProp = props.openIcon,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(props, ["className", "classes", "icon", "open", "openIcon"]);

  var iconClassName = Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.icon, open && [classes.iconOpen, openIconProp && classes.iconWithOpenIconOpen]);
  var openIconClassName = Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.openIcon, open && classes.openIconOpen);

  function formatIcon(icon, newClassName) {
    if (react__WEBPACK_IMPORTED_MODULE_2__["isValidElement"](icon)) {
      return react__WEBPACK_IMPORTED_MODULE_2__["cloneElement"](icon, {
        className: newClassName
      });
    }

    return icon;
  }

  return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.root, className),
    ref: ref
  }, other), openIconProp ? formatIcon(openIconProp, openIconClassName) : null, iconProp ? formatIcon(iconProp, iconClassName) : react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_Add__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: iconClassName
  }));
});
 true ? SpeedDialIcon.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * The icon to display in the SpeedDial Floating Action Button.
   */
  icon: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,

  /**
   * @ignore
   * If `true`, the SpeedDial is open.
   */
  open: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node
} : undefined;
SpeedDialIcon.muiName = 'SpeedDialIcon';
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["withStyles"])(styles, {
  name: 'MuiSpeedDialIcon'
})(SpeedDialIcon));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/SpeedDialIcon/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/SpeedDialIcon/index.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SpeedDialIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpeedDialIcon */ "./node_modules/@material-ui/lab/esm/SpeedDialIcon/SpeedDialIcon.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _SpeedDialIcon__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/ToggleButton/ToggleButton.js":
/*!************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/ToggleButton/ToggleButton.js ***!
  \************************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_ButtonBase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/ButtonBase */ "./node_modules/@material-ui/core/esm/ButtonBase/index.js");
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");


// @inheritedComponent ButtonBase






var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, theme.typography.button, {
      boxSizing: 'border-box',
      borderRadius: theme.shape.borderRadius,
      height: 48,
      padding: '0px 12px',
      border: "1px solid ".concat(Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["fade"])(theme.palette.action.active, 0.12)),
      color: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["fade"])(theme.palette.action.active, 0.38),
      '&$selected': {
        color: theme.palette.action.active,
        backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["fade"])(theme.palette.action.active, 0.12),
        '&:hover': {
          backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["fade"])(theme.palette.action.active, 0.15)
        },
        '& + &': {
          borderLeft: 0,
          marginLeft: 0
        }
      },
      '&$disabled': {
        color: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["fade"])(theme.palette.action.disabled, 0.12)
      },
      '&:hover': {
        textDecoration: 'none',
        // Reset on mouse devices
        backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["fade"])(theme.palette.text.primary, 0.05),
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        },
        '&$disabled': {
          backgroundColor: 'transparent'
        }
      }
    }),

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Pseudo-class applied to the root element if `selected={true}`. */
    selected: {},

    /* Styles applied to the `label` wrapper element. */
    label: {
      width: '100%',
      // Ensure the correct width for iOS Safari
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit'
    },

    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      height: 40,
      padding: '0px 8px',
      fontSize: theme.typography.pxToRem(13)
    },

    /* Styles applied to the root element if `size="large"`. */
    sizeLarge: {
      height: 56,
      padding: '0px 16px',
      fontSize: theme.typography.pxToRem(15)
    }
  };
};
var ToggleButton = react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function ToggleButton(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableFocusRi = props.disableFocusRipple,
      disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
      _props$disableRipple = props.disableRipple,
      disableRipple = _props$disableRipple === void 0 ? false : _props$disableRipple,
      onChange = props.onChange,
      onClick = props.onClick,
      selected = props.selected,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      value = props.value,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(props, ["children", "classes", "className", "disabled", "disableFocusRipple", "disableRipple", "onChange", "onClick", "selected", "size", "value"]);

  var handleChange = function handleChange(event) {
    if (onClick) {
      onClick(event, value);

      if (event.isDefaultPrevented()) {
        return;
      }
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_ButtonBase__WEBPACK_IMPORTED_MODULE_6__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.root, className, disabled && classes.disabled, selected && classes.selected, size !== 'medium' && classes["size".concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_7__["capitalize"])(size))]),
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    ref: ref,
    onClick: handleChange,
    onChange: onChange,
    value: value,
    disableRipple: disableRipple,
    "aria-pressed": selected
  }, other), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", {
    className: classes.label
  }, children));
});
 true ? ToggleButton.propTypes = {
  /**
   * The content of the button.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node.isRequired,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * If `true`, the button will be disabled.
   */
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * If `true`, the  keyboard focus ripple will be disabled.
   * `disableRipple` must also be true.
   */
  disableFocusRipple: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * @ignore
   */
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * @ignore
   */
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * If `true`, the button will be rendered in an active state.
   */
  selected: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * @ignore
   */
  size: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['small', 'medium', 'large']),

  /**
   * The value to associate with the button when selected in a
   * ToggleButtonGroup.
   */
  value: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.any.isRequired
} : undefined;
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["withStyles"])(styles, {
  name: 'MuiToggleButton'
})(ToggleButton));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/ToggleButton/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/ToggleButton/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToggleButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToggleButton */ "./node_modules/@material-ui/lab/esm/ToggleButton/ToggleButton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ToggleButton__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/ToggleButtonGroup/ToggleButtonGroup.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/ToggleButtonGroup/ToggleButtonGroup.js ***!
  \**********************************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_is__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _isValueSelected__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./isValueSelected */ "./node_modules/@material-ui/lab/esm/ToggleButtonGroup/isValueSelected.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");










var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      display: 'inline-flex'
    },

    /* Styles applied to the children. */
    grouped: {
      padding: '0px 11px 0px 12px',
      '&:not(:first-child)': {
        marginLeft: -1,
        borderLeft: '1px solid transparent',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      },
      '&:not(:last-child)': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      }
    },

    /* Styles applied to the children if `size="small"`. */
    groupedSizeSmall: {
      padding: '0px 7px 0px 8px'
    },

    /* Styles applied to the children if `size="large"`. */
    groupedSizeLarge: {
      padding: '0px 15px 0px 16px'
    }
  };
};
var ToggleButtonGroup = react__WEBPACK_IMPORTED_MODULE_3__["forwardRef"](function ToggleButton(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$exclusive = props.exclusive,
      exclusive = _props$exclusive === void 0 ? false : _props$exclusive,
      onChange = props.onChange,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      value = props.value,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(props, ["children", "classes", "className", "exclusive", "onChange", "size", "value"]);

  var handleChange = function handleChange(event, buttonValue) {
    if (!onChange) {
      return;
    }

    var index = value && value.indexOf(buttonValue);
    var newValue;

    if (value && index >= 0) {
      newValue = Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(value);
      newValue.splice(index, 1);
    } else {
      newValue = value ? [].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(value), [buttonValue]) : [buttonValue];
    }

    onChange(event, newValue);
  };

  var handleExclusiveChange = function handleExclusiveChange(event, buttonValue) {
    if (!onChange) {
      return;
    }

    onChange(event, value === buttonValue ? null : buttonValue);
  };

  return react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_6__["default"])(classes.root, className),
    ref: ref,
    role: "group"
  }, other), react__WEBPACK_IMPORTED_MODULE_3__["Children"].map(children, function (child) {
    if (!react__WEBPACK_IMPORTED_MODULE_3__["isValidElement"](child)) {
      return null;
    }

    if (true) {
      if (Object(react_is__WEBPACK_IMPORTED_MODULE_4__["isFragment"])(child)) {
        console.error(["Material-UI: the ToggleButtonGroup component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    var _child$props = child.props,
        buttonSelected = _child$props.selected,
        buttonValue = _child$props.value;
    var selected = buttonSelected === undefined ? Object(_isValueSelected__WEBPACK_IMPORTED_MODULE_7__["default"])(buttonValue, value) : buttonSelected;
    return react__WEBPACK_IMPORTED_MODULE_3__["cloneElement"](child, {
      className: Object(clsx__WEBPACK_IMPORTED_MODULE_6__["default"])(classes.grouped, child.props.className, size !== 'medium' && classes["groupedSize".concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_9__["capitalize"])(size))]),
      selected: selected,
      onChange: exclusive ? handleExclusiveChange : handleChange,
      size: size
    });
  }));
});
 true ? ToggleButtonGroup.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the button.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,

  /**
   * If `true`, only allow one of the child ToggleButton values to be selected.
   */
  exclusive: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {any} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,

  /**
   * The size of the buttons.
   */
  size: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.oneOf(['large', 'medium', 'small']),

  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   */
  value: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.any
} : undefined;
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__["withStyles"])(styles, {
  name: 'MuiToggleButtonGroup'
})(ToggleButtonGroup));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/ToggleButtonGroup/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/ToggleButtonGroup/index.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToggleButtonGroup */ "./node_modules/@material-ui/lab/esm/ToggleButtonGroup/ToggleButtonGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/ToggleButtonGroup/isValueSelected.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/ToggleButtonGroup/isValueSelected.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isValueSelected; });
// Determine if the toggle button value matches, or is contained in, the
// candidate group value.
function isValueSelected(value, candidate) {
  if (candidate === undefined || value === undefined) {
    return false;
  }

  if (Array.isArray(candidate)) {
    return candidate.indexOf(value) >= 0;
  }

  return value === candidate;
}

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/TreeItem/TreeItem.js":
/*!****************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/TreeItem/TreeItem.js ***!
  \****************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Collapse */ "./node_modules/@material-ui/core/esm/Collapse/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");
/* harmony import */ var _TreeView_TreeViewContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../TreeView/TreeViewContext */ "./node_modules/@material-ui/lab/esm/TreeView/TreeViewContext.js");



/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions  */








var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      outline: 0,
      WebkitTapHighlightColor: 'transparent',
      '&:focus > $content $label': {
        backgroundColor: theme.palette.action.hover
      },
      '&$selected > $content $label': {
        backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__["fade"])(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      },
      '&$selected > $content $label:hover, &$selected:focus > $content $label': {
        backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__["fade"])(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    },

    /* Pseudo-class applied to the root element when expanded. */
    expanded: {},

    /* Pseudo-class applied to the root element when selected. */
    selected: {},

    /* Styles applied to the `role="group"` element. */
    group: {
      margin: 0,
      padding: 0,
      marginLeft: 17
    },

    /* Styles applied to the tree node content. */
    content: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer'
    },

    /* Styles applied to the tree node icon and collapse/expand icon. */
    iconContainer: {
      marginRight: 4,
      width: 15,
      display: 'flex',
      flexShrink: 0,
      justifyContent: 'center',
      '& svg': {
        fontSize: 18
      }
    },

    /* Styles applied to the label element. */
    label: {
      width: '100%',
      paddingLeft: 4,
      position: 'relative',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    }
  };
};

var isPrintableCharacter = function isPrintableCharacter(str) {
  return str && str.length === 1 && str.match(/\S/);
};

var TreeItem = react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function TreeItem(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      collapseIcon = props.collapseIcon,
      endIcon = props.endIcon,
      expandIcon = props.expandIcon,
      iconProp = props.icon,
      label = props.label,
      nodeId = props.nodeId,
      onClick = props.onClick,
      onFocus = props.onFocus,
      onKeyDown = props.onKeyDown,
      onMouseDown = props.onMouseDown,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? _material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_6__["default"] : _props$TransitionComp,
      TransitionProps = props.TransitionProps,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(props, ["children", "classes", "className", "collapseIcon", "endIcon", "expandIcon", "icon", "label", "nodeId", "onClick", "onFocus", "onKeyDown", "onMouseDown", "TransitionComponent", "TransitionProps"]);

  var _React$useContext = react__WEBPACK_IMPORTED_MODULE_2__["useContext"](_TreeView_TreeViewContext__WEBPACK_IMPORTED_MODULE_9__["default"]),
      contextIcons = _React$useContext.icons,
      focus = _React$useContext.focus,
      focusFirstNode = _React$useContext.focusFirstNode,
      focusLastNode = _React$useContext.focusLastNode,
      focusNextNode = _React$useContext.focusNextNode,
      focusPreviousNode = _React$useContext.focusPreviousNode,
      focusByFirstCharacter = _React$useContext.focusByFirstCharacter,
      selectNode = _React$useContext.selectNode,
      selectRange = _React$useContext.selectRange,
      selectNextNode = _React$useContext.selectNextNode,
      selectPreviousNode = _React$useContext.selectPreviousNode,
      rangeSelectToFirst = _React$useContext.rangeSelectToFirst,
      rangeSelectToLast = _React$useContext.rangeSelectToLast,
      selectAllNodes = _React$useContext.selectAllNodes,
      expandAllSiblings = _React$useContext.expandAllSiblings,
      toggleExpansion = _React$useContext.toggleExpansion,
      isExpanded = _React$useContext.isExpanded,
      isFocused = _React$useContext.isFocused,
      isSelected = _React$useContext.isSelected,
      isTabbable = _React$useContext.isTabbable,
      multiSelect = _React$useContext.multiSelect,
      selectionDisabled = _React$useContext.selectionDisabled,
      getParent = _React$useContext.getParent,
      mapFirstChar = _React$useContext.mapFirstChar,
      addNodeToNodeMap = _React$useContext.addNodeToNodeMap,
      removeNodeFromNodeMap = _React$useContext.removeNodeFromNodeMap;

  var nodeRef = react__WEBPACK_IMPORTED_MODULE_2__["useRef"](null);
  var contentRef = react__WEBPACK_IMPORTED_MODULE_2__["useRef"](null);
  var handleRef = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_8__["useForkRef"])(nodeRef, ref);
  var icon = iconProp;
  var expandable = Boolean(Array.isArray(children) ? children.length : children);
  var expanded = isExpanded ? isExpanded(nodeId) : false;
  var focused = isFocused ? isFocused(nodeId) : false;
  var tabbable = isTabbable ? isTabbable(nodeId) : false;
  var selected = isSelected ? isSelected(nodeId) : false;
  var icons = contextIcons || {};
  var theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__["useTheme"])();

  if (!icon) {
    if (expandable) {
      if (!expanded) {
        icon = expandIcon || icons.defaultExpandIcon;
      } else {
        icon = collapseIcon || icons.defaultCollapseIcon;
      }

      if (!icon) {
        icon = icons.defaultParentIcon;
      }
    } else {
      icon = endIcon || icons.defaultEndIcon;
    }
  }

  var handleClick = function handleClick(event) {
    if (!focused) {
      focus(nodeId);
    }

    var multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey); // If already expanded and trying to toggle selection don't close

    if (expandable && !(multiple && isExpanded(nodeId))) {
      toggleExpansion(event, nodeId);
    }

    if (!selectionDisabled) {
      if (multiple) {
        if (event.shiftKey) {
          selectRange(event, {
            end: nodeId
          });
        } else {
          selectNode(event, nodeId, true);
        }
      } else {
        selectNode(event, nodeId);
      }
    }

    if (onClick) {
      onClick(event);
    }
  };

  var handleMouseDown = function handleMouseDown(event) {
    if (event.shiftKey || event.ctrlKey || event.metaKey) {
      event.preventDefault();
    }

    if (onMouseDown) {
      onMouseDown(event);
    }
  };

  var printableCharacter = function printableCharacter(event, key) {
    if (isPrintableCharacter(key)) {
      focusByFirstCharacter(nodeId, key);
      return true;
    }

    return false;
  };

  var handleNextArrow = function handleNextArrow(event) {
    if (expandable) {
      if (expanded) {
        focusNextNode(nodeId);
      } else {
        toggleExpansion(event);
      }
    }

    return true;
  };

  var handlePreviousArrow = function handlePreviousArrow(event) {
    if (expanded) {
      toggleExpansion(event, nodeId);
      return true;
    }

    var parent = getParent(nodeId);

    if (parent) {
      focus(parent);
      return true;
    }

    return false;
  };

  var handleKeyDown = function handleKeyDown(event) {
    var flag = false;
    var key = event.key;

    if (event.altKey || event.currentTarget !== event.target) {
      return;
    }

    var ctrlPressed = event.ctrlKey || event.metaKey;

    switch (key) {
      case ' ':
        if (nodeRef.current === event.currentTarget) {
          if (multiSelect && event.shiftKey) {
            selectRange(event, {
              end: nodeId
            });
          } else if (multiSelect) {
            selectNode(event, nodeId, true);
          } else {
            selectNode(event, nodeId);
          }

          flag = true;
        }

        event.stopPropagation();
        break;

      case 'Enter':
        if (nodeRef.current === event.currentTarget && expandable) {
          toggleExpansion(event);
          flag = true;
        }

        event.stopPropagation();
        break;

      case 'ArrowDown':
        if (multiSelect && event.shiftKey) {
          selectNextNode(event, nodeId);
        }

        focusNextNode(nodeId);
        flag = true;
        break;

      case 'ArrowUp':
        if (multiSelect && event.shiftKey) {
          selectPreviousNode(event, nodeId);
        }

        focusPreviousNode(nodeId);
        flag = true;
        break;

      case 'ArrowRight':
        if (theme.direction === 'rtl') {
          flag = handlePreviousArrow(event);
        } else {
          flag = handleNextArrow(event);
        }

        break;

      case 'ArrowLeft':
        if (theme.direction === 'rtl') {
          flag = handleNextArrow(event);
        } else {
          flag = handlePreviousArrow(event);
        }

        break;

      case 'Home':
        if (multiSelect && ctrlPressed && event.shiftKey) {
          rangeSelectToFirst(event, nodeId);
        }

        focusFirstNode();
        flag = true;
        break;

      case 'End':
        if (multiSelect && ctrlPressed && event.shiftKey) {
          rangeSelectToLast(event, nodeId);
        }

        focusLastNode();
        flag = true;
        break;

      default:
        if (key === '*') {
          expandAllSiblings(event, nodeId);
          flag = true;
        } else if (multiSelect && ctrlPressed && key.toLowerCase() === 'a') {
          selectAllNodes(event);
          flag = true;
        } else if (isPrintableCharacter(key)) {
          flag = printableCharacter(event, key);
        }

    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  var handleFocus = function handleFocus(event) {
    if (!focused && tabbable) {
      focus(nodeId);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](function () {
    var childIds = react__WEBPACK_IMPORTED_MODULE_2__["Children"].map(children, function (child) {
      return child.props.nodeId;
    }) || [];

    if (addNodeToNodeMap) {
      addNodeToNodeMap(nodeId, childIds);
    }
  }, [children, nodeId, addNodeToNodeMap]);
  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](function () {
    if (removeNodeFromNodeMap) {
      return function () {
        removeNodeFromNodeMap(nodeId);
      };
    }

    return undefined;
  }, [nodeId, removeNodeFromNodeMap]);
  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](function () {
    if (mapFirstChar && label) {
      mapFirstChar(nodeId, contentRef.current.textContent.substring(0, 1).toLowerCase());
    }
  }, [mapFirstChar, nodeId, label]);
  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](function () {
    if (focused) {
      nodeRef.current.focus();
    }
  }, [focused]);
  return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("li", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(classes.root, className, expanded && classes.expanded, selected && classes.selected),
    role: "treeitem",
    onKeyDown: handleKeyDown,
    onFocus: handleFocus,
    "aria-expanded": expandable ? expanded : null,
    "aria-selected": !selectionDisabled && isSelected ? isSelected(nodeId) : undefined,
    ref: handleRef,
    tabIndex: tabbable ? 0 : -1
  }, other), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: classes.content,
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    ref: contentRef
  }, react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: classes.iconContainer
  }, icon), react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__["default"], {
    component: "div",
    className: classes.label
  }, label)), children && react__WEBPACK_IMPORTED_MODULE_2__["createElement"](TransitionComponent, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    unmountOnExit: true,
    className: classes.group,
    in: expanded,
    component: "ul",
    role: "group"
  }, TransitionProps), children));
});
 true ? TreeItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,

  /**
   * The icon used to collapse the node.
   */
  collapseIcon: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,

  /**
   * The icon displayed next to a end node.
   */
  endIcon: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,

  /**
   * The icon used to expand the node.
   */
  expandIcon: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,

  /**
   * The icon to display next to the tree node's label.
   */
  icon: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,

  /**
   * The tree node label.
   */
  label: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,

  /**
   * The id of the node.
   */
  nodeId: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string.isRequired,

  /**
   * @ignore
   */
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * @ignore
   */
  onFocus: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * @ignore
   */
  onKeyDown: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * @ignore
   */
  onMouseDown: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.elementType,

  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object
} : undefined;
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__["withStyles"])(styles, {
  name: 'MuiTreeItem'
})(TreeItem));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/TreeItem/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/TreeItem/index.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TreeItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TreeItem */ "./node_modules/@material-ui/lab/esm/TreeItem/TreeItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _TreeItem__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/TreeView/TreeView.js":
/*!****************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/TreeView/TreeView.js ***!
  \****************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _TreeViewContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TreeViewContext */ "./node_modules/@material-ui/lab/esm/TreeView/TreeViewContext.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");










var styles = {
  /* Styles applied to the root element. */
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none'
  }
};

function arrayDiff(arr1, arr2) {
  if (arr1.length !== arr2.length) return true;

  for (var i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) return true;
  }

  return false;
}

var findNextFirstChar = function findNextFirstChar(firstChars, startIndex, char) {
  for (var i = startIndex; i < firstChars.length; i += 1) {
    if (char === firstChars[i]) {
      return i;
    }
  }

  return -1;
};

var defaultExpandedDefault = [];
var defaultSelectedDefault = [];
var TreeView = react__WEBPACK_IMPORTED_MODULE_4__["forwardRef"](function TreeView(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      defaultCollapseIcon = props.defaultCollapseIcon,
      defaultEndIcon = props.defaultEndIcon,
      _props$defaultExpande = props.defaultExpanded,
      defaultExpanded = _props$defaultExpande === void 0 ? defaultExpandedDefault : _props$defaultExpande,
      defaultExpandIcon = props.defaultExpandIcon,
      defaultParentIcon = props.defaultParentIcon,
      _props$defaultSelecte = props.defaultSelected,
      defaultSelected = _props$defaultSelecte === void 0 ? defaultSelectedDefault : _props$defaultSelecte,
      _props$disableSelecti = props.disableSelection,
      disableSelection = _props$disableSelecti === void 0 ? false : _props$disableSelecti,
      _props$multiSelect = props.multiSelect,
      multiSelect = _props$multiSelect === void 0 ? false : _props$multiSelect,
      expandedProp = props.expanded,
      onNodeSelect = props.onNodeSelect,
      onNodeToggle = props.onNodeToggle,
      selectedProp = props.selected,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__["default"])(props, ["children", "classes", "className", "defaultCollapseIcon", "defaultEndIcon", "defaultExpanded", "defaultExpandIcon", "defaultParentIcon", "defaultSelected", "disableSelection", "multiSelect", "expanded", "onNodeSelect", "onNodeToggle", "selected"]);

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_4__["useState"](null),
      tabbable = _React$useState[0],
      setTabbable = _React$useState[1];

  var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_4__["useState"](null),
      focused = _React$useState2[0],
      setFocused = _React$useState2[1];

  var nodeMap = react__WEBPACK_IMPORTED_MODULE_4__["useRef"]({});
  var firstCharMap = react__WEBPACK_IMPORTED_MODULE_4__["useRef"]({});
  var visibleNodes = react__WEBPACK_IMPORTED_MODULE_4__["useRef"]([]);

  var _useControlled = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_9__["useControlled"])({
    controlled: expandedProp,
    default: defaultExpanded,
    name: 'TreeView'
  }),
      _useControlled2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useControlled, 2),
      expanded = _useControlled2[0],
      setExpandedState = _useControlled2[1];

  var _useControlled3 = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_9__["useControlled"])({
    controlled: selectedProp,
    default: defaultSelected,
    name: 'TreeView'
  }),
      _useControlled4 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useControlled3, 2),
      selected = _useControlled4[0],
      setSelectedState = _useControlled4[1];
  /*
   * Status Helpers
   */


  var isExpanded = react__WEBPACK_IMPORTED_MODULE_4__["useCallback"](function (id) {
    return Array.isArray(expanded) ? expanded.indexOf(id) !== -1 : false;
  }, [expanded]);
  var isSelected = react__WEBPACK_IMPORTED_MODULE_4__["useCallback"](function (id) {
    return Array.isArray(selected) ? selected.indexOf(id) !== -1 : selected === id;
  }, [selected]);

  var isTabbable = function isTabbable(id) {
    return tabbable === id;
  };

  var isFocused = function isFocused(id) {
    return focused === id;
  };
  /*
   * Node Helpers
   */


  var getNextNode = function getNextNode(id) {
    var nodeIndex = visibleNodes.current.indexOf(id);

    if (nodeIndex !== -1 && nodeIndex + 1 < visibleNodes.current.length) {
      return visibleNodes.current[nodeIndex + 1];
    }

    return null;
  };

  var getPreviousNode = function getPreviousNode(id) {
    var nodeIndex = visibleNodes.current.indexOf(id);

    if (nodeIndex !== -1 && nodeIndex - 1 >= 0) {
      return visibleNodes.current[nodeIndex - 1];
    }

    return null;
  };

  var getLastNode = function getLastNode() {
    return visibleNodes.current[visibleNodes.current.length - 1];
  };

  var getFirstNode = function getFirstNode() {
    return visibleNodes.current[0];
  };

  var getParent = function getParent(id) {
    return nodeMap.current[id].parent;
  };

  var getNodesInRange = function getNodesInRange(a, b) {
    var aIndex = visibleNodes.current.indexOf(a);
    var bIndex = visibleNodes.current.indexOf(b);
    var start = Math.min(aIndex, bIndex);
    var end = Math.max(aIndex, bIndex);
    return visibleNodes.current.slice(start, end + 1);
  };
  /*
   * Focus Helpers
   */


  var focus = function focus(id) {
    if (id) {
      setTabbable(id);
      setFocused(id);
    }
  };

  var focusNextNode = function focusNextNode(id) {
    return focus(getNextNode(id));
  };

  var focusPreviousNode = function focusPreviousNode(id) {
    return focus(getPreviousNode(id));
  };

  var focusFirstNode = function focusFirstNode() {
    return focus(getFirstNode());
  };

  var focusLastNode = function focusLastNode() {
    return focus(getLastNode());
  };

  var focusByFirstCharacter = function focusByFirstCharacter(id, char) {
    var start;
    var index;
    var lowercaseChar = char.toLowerCase();
    var firstCharIds = [];
    var firstChars = []; // This really only works since the ids are strings

    Object.keys(firstCharMap.current).forEach(function (nodeId) {
      var firstChar = firstCharMap.current[nodeId];
      var map = nodeMap.current[nodeId];
      var visible = map.parent ? isExpanded(map.parent) : true;

      if (visible) {
        firstCharIds.push(nodeId);
        firstChars.push(firstChar);
      }
    }); // Get start index for search based on position of currentItem

    start = firstCharIds.indexOf(id) + 1;

    if (start === nodeMap.current.length) {
      start = 0;
    } // Check remaining slots in the menu


    index = findNextFirstChar(firstChars, start, lowercaseChar); // If not found in remaining slots, check from beginning

    if (index === -1) {
      index = findNextFirstChar(firstChars, 0, lowercaseChar);
    } // If match was found...


    if (index > -1) {
      focus(firstCharIds[index]);
    }
  };
  /*
   * Expansion Helpers
   */


  var toggleExpansion = function toggleExpansion(event) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : focused;
    var newExpanded;

    if (expanded.indexOf(value) !== -1) {
      newExpanded = expanded.filter(function (id) {
        return id !== value;
      });
      setTabbable(function (oldTabbable) {
        var map = nodeMap.current[oldTabbable];

        if (oldTabbable && (map && map.parent ? map.parent.id : null) === value) {
          return value;
        }

        return oldTabbable;
      });
    } else {
      newExpanded = [value].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(expanded));
    }

    if (onNodeToggle) {
      onNodeToggle(event, newExpanded);
    }

    setExpandedState(newExpanded);
  };

  var expandAllSiblings = function expandAllSiblings(event, id) {
    var map = nodeMap.current[id];
    var parent = nodeMap.current[map.parent];
    var diff;

    if (parent) {
      diff = parent.children.filter(function (child) {
        return !isExpanded(child);
      });
    } else {
      var topLevelNodes = nodeMap.current[-1].children;
      diff = topLevelNodes.filter(function (node) {
        return !isExpanded(node);
      });
    }

    var newExpanded = [].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(expanded), Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(diff));
    setExpandedState(newExpanded);

    if (onNodeToggle) {
      onNodeToggle(event, newExpanded);
    }
  };
  /*
   * Selection Helpers
   */


  var lastSelectedNode = react__WEBPACK_IMPORTED_MODULE_4__["useRef"](null);
  var lastSelectionWasRange = react__WEBPACK_IMPORTED_MODULE_4__["useRef"](false);
  var currentRangeSelection = react__WEBPACK_IMPORTED_MODULE_4__["useRef"]([]);

  var handleRangeArrowSelect = function handleRangeArrowSelect(event, nodes) {
    var base = selected;
    var start = nodes.start,
        next = nodes.next,
        current = nodes.current;

    if (!next || !current) {
      return;
    }

    if (currentRangeSelection.current.indexOf(current) === -1) {
      currentRangeSelection.current = [];
    }

    if (lastSelectionWasRange.current) {
      if (currentRangeSelection.current.indexOf(next) !== -1) {
        base = base.filter(function (id) {
          return id === start || id !== current;
        });
        currentRangeSelection.current = currentRangeSelection.current.filter(function (id) {
          return id === start || id !== current;
        });
      } else {
        base.push(next);
        currentRangeSelection.current.push(next);
      }
    } else {
      base.push(next);
      currentRangeSelection.current.push(current, next);
    }

    if (onNodeSelect) {
      onNodeSelect(event, base);
    }

    setSelectedState(base);
  };

  var handleRangeSelect = function handleRangeSelect(event, nodes) {
    var base = selected;
    var start = nodes.start,
        end = nodes.end; // If last selection was a range selection ignore nodes that were selected.

    if (lastSelectionWasRange.current) {
      base = selected.filter(function (id) {
        return currentRangeSelection.current.indexOf(id) === -1;
      });
    }

    var range = getNodesInRange(start, end);
    currentRangeSelection.current = range;
    var newSelected = base.concat(range);
    newSelected = newSelected.filter(function (id, i) {
      return newSelected.indexOf(id) === i;
    });

    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }

    setSelectedState(newSelected);
  };

  var handleMultipleSelect = function handleMultipleSelect(event, value) {
    var newSelected = [];

    if (selected.indexOf(value) !== -1) {
      newSelected = selected.filter(function (id) {
        return id !== value;
      });
    } else {
      newSelected = [value].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(selected));
    }

    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }

    setSelectedState(newSelected);
  };

  var handleSingleSelect = function handleSingleSelect(event, value) {
    var newSelected = multiSelect ? [value] : value;

    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }

    setSelectedState(newSelected);
  };

  var selectNode = function selectNode(event, id) {
    var multiple = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (id) {
      if (multiple) {
        handleMultipleSelect(event, id);
      } else {
        handleSingleSelect(event, id);
      }

      lastSelectedNode.current = id;
      lastSelectionWasRange.current = false;
      currentRangeSelection.current = [];
    }
  };

  var selectRange = function selectRange(event, nodes) {
    var stacked = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var _nodes$start = nodes.start,
        start = _nodes$start === void 0 ? lastSelectedNode.current : _nodes$start,
        end = nodes.end,
        current = nodes.current;

    if (stacked) {
      handleRangeArrowSelect(event, {
        start: start,
        next: end,
        current: current
      });
    } else {
      handleRangeSelect(event, {
        start: start,
        end: end
      });
    }

    lastSelectionWasRange.current = true;
  };

  var rangeSelectToFirst = function rangeSelectToFirst(event, id) {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }

    var start = lastSelectionWasRange.current ? lastSelectedNode.current : id;
    selectRange(event, {
      start: start,
      end: getFirstNode()
    });
  };

  var rangeSelectToLast = function rangeSelectToLast(event, id) {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }

    var start = lastSelectionWasRange.current ? lastSelectedNode.current : id;
    selectRange(event, {
      start: start,
      end: getLastNode()
    });
  };

  var selectNextNode = function selectNextNode(event, id) {
    return selectRange(event, {
      end: getNextNode(id),
      current: id
    }, true);
  };

  var selectPreviousNode = function selectPreviousNode(event, id) {
    return selectRange(event, {
      end: getPreviousNode(id),
      current: id
    }, true);
  };

  var selectAllNodes = function selectAllNodes(event) {
    return selectRange(event, {
      start: getFirstNode(),
      end: getLastNode()
    });
  };
  /*
   * Mapping Helpers
   */


  var addNodeToNodeMap = function addNodeToNodeMap(id, childrenIds) {
    var currentMap = nodeMap.current[id];
    nodeMap.current[id] = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, currentMap, {
      children: childrenIds,
      id: id
    });
    childrenIds.forEach(function (childId) {
      var currentChildMap = nodeMap.current[childId];
      nodeMap.current[childId] = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, currentChildMap, {
        parent: id,
        id: childId
      });
    });
  };

  var getNodesToRemove = react__WEBPACK_IMPORTED_MODULE_4__["useCallback"](function (id) {
    var map = nodeMap.current[id];
    var nodes = [];

    if (map) {
      nodes.push(id);

      if (map.children) {
        nodes.push.apply(nodes, Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(map.children));
        map.children.forEach(function (node) {
          nodes.push.apply(nodes, Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(getNodesToRemove(node)));
        });
      }
    }

    return nodes;
  }, []);
  var removeNodeFromNodeMap = react__WEBPACK_IMPORTED_MODULE_4__["useCallback"](function (id) {
    var nodes = getNodesToRemove(id);

    var newMap = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, nodeMap.current);

    nodes.forEach(function (node) {
      var map = newMap[node];

      if (map) {
        if (map.parent) {
          var parentMap = newMap[map.parent];

          if (parentMap && parentMap.children) {
            var parentChildren = parentMap.children.filter(function (c) {
              return c !== node;
            });
            newMap[map.parent] = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, parentMap, {
              children: parentChildren
            });
          }
        }

        delete newMap[node];
      }
    });
    nodeMap.current = newMap;
  }, [getNodesToRemove]);

  var mapFirstChar = function mapFirstChar(id, firstChar) {
    firstCharMap.current[id] = firstChar;
  };

  var prevChildIds = react__WEBPACK_IMPORTED_MODULE_4__["useRef"]([]);

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_4__["useState"](false),
      childrenCalculated = _React$useState3[0],
      setChildrenCalculated = _React$useState3[1];

  react__WEBPACK_IMPORTED_MODULE_4__["useEffect"](function () {
    var childIds = [];
    react__WEBPACK_IMPORTED_MODULE_4__["Children"].forEach(children, function (child) {
      if (react__WEBPACK_IMPORTED_MODULE_4__["isValidElement"](child) && child.props.nodeId) {
        childIds.push(child.props.nodeId);
      }
    });

    if (arrayDiff(prevChildIds.current, childIds)) {
      nodeMap.current[-1] = {
        parent: null,
        children: childIds
      };
      childIds.forEach(function (id, index) {
        if (index === 0) {
          setTabbable(id);
        }

        nodeMap.current[id] = {
          parent: null
        };
      });
      visibleNodes.current = nodeMap.current[-1].children;
      prevChildIds.current = childIds;
      setChildrenCalculated(true);
    }
  }, [children]);
  react__WEBPACK_IMPORTED_MODULE_4__["useEffect"](function () {
    var buildVisible = function buildVisible(nodes) {
      var list = [];

      for (var i = 0; i < nodes.length; i += 1) {
        var item = nodes[i];
        list.push(item);
        var childs = nodeMap.current[item].children;

        if (isExpanded(item) && childs) {
          list = list.concat(buildVisible(childs));
        }
      }

      return list;
    };

    if (childrenCalculated) {
      visibleNodes.current = buildVisible(nodeMap.current[-1].children);
    }
  }, [expanded, childrenCalculated, isExpanded]);
  return react__WEBPACK_IMPORTED_MODULE_4__["createElement"](_TreeViewContext__WEBPACK_IMPORTED_MODULE_7__["default"].Provider, {
    value: {
      icons: {
        defaultCollapseIcon: defaultCollapseIcon,
        defaultExpandIcon: defaultExpandIcon,
        defaultParentIcon: defaultParentIcon,
        defaultEndIcon: defaultEndIcon
      },
      focus: focus,
      focusFirstNode: focusFirstNode,
      focusLastNode: focusLastNode,
      focusNextNode: focusNextNode,
      focusPreviousNode: focusPreviousNode,
      focusByFirstCharacter: focusByFirstCharacter,
      expandAllSiblings: expandAllSiblings,
      toggleExpansion: toggleExpansion,
      isExpanded: isExpanded,
      isFocused: isFocused,
      isSelected: isSelected,
      selectNode: selectNode,
      selectRange: selectRange,
      selectNextNode: selectNextNode,
      selectPreviousNode: selectPreviousNode,
      rangeSelectToFirst: rangeSelectToFirst,
      rangeSelectToLast: rangeSelectToLast,
      selectAllNodes: selectAllNodes,
      isTabbable: isTabbable,
      multiSelect: multiSelect,
      selectionDisabled: disableSelection,
      getParent: getParent,
      mapFirstChar: mapFirstChar,
      addNodeToNodeMap: addNodeToNodeMap,
      removeNodeFromNodeMap: removeNodeFromNodeMap
    }
  }, react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("ul", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    role: "tree",
    "aria-multiselectable": multiSelect,
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__["default"])(classes.root, className),
    ref: ref
  }, other), children));
});
 true ? TreeView.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,

  /**
   * The default icon used to collapse the node.
   */
  defaultCollapseIcon: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.node,

  /**
   * The default icon displayed next to a end node. This is applied to all
   * tree nodes and can be overridden by the TreeItem `icon` prop.
   */
  defaultEndIcon: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.node,

  /**
   * Expanded node ids. (Uncontrolled)
   */
  defaultExpanded: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string),

  /**
   * The default icon used to expand the node.
   */
  defaultExpandIcon: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.node,

  /**
   * The default icon displayed next to a parent node. This is applied to all
   * parent nodes and can be overridden by the TreeItem `icon` prop.
   */
  defaultParentIcon: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.node,

  /**
   * Selected node ids. (Uncontrolled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  defaultSelected: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string), prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string]),

  /**
   * If `true` selection is disabled.
   */
  disableSelection: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,

  /**
   * Expanded node ids. (Controlled)
   */
  expanded: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string),

  /**
   * If true `ctrl` and `shift` will trigger multiselect.
   */
  multiSelect: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,

  /**
   * Callback fired when tree items are selected/unselected.
   *
   * @param {object} event The event source of the callback
   * @param {(array|string)} value of the selected nodes. When `multiSelect` is true
   * this is an array of strings; when false (default) a string.
   */
  onNodeSelect: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func,

  /**
   * Callback fired when tree items are expanded/collapsed.
   *
   * @param {object} event The event source of the callback.
   * @param {array} nodeIds The ids of the expanded nodes.
   */
  onNodeToggle: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func,

  /**
   * Selected node ids. (Controlled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  selected: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string), prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string])
} : undefined;
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__["withStyles"])(styles, {
  name: 'MuiTreeView'
})(TreeView));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/TreeView/TreeViewContext.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/TreeView/TreeViewContext.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * @ignore - internal component.
 */

var TreeViewContext = react__WEBPACK_IMPORTED_MODULE_0__["createContext"]({});

if (true) {
  TreeViewContext.displayName = 'TreeViewContext';
}

/* harmony default export */ __webpack_exports__["default"] = (TreeViewContext);

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/TreeView/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/TreeView/index.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TreeView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TreeView */ "./node_modules/@material-ui/lab/esm/TreeView/TreeView.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _TreeView__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/index.js ***!
  \****************************************************/
/*! exports provided: Alert, AlertTitle, Autocomplete, AvatarGroup, Pagination, PaginationItem, Rating, Skeleton, SpeedDial, SpeedDialAction, SpeedDialIcon, ToggleButton, ToggleButtonGroup, TreeItem, TreeView, useAutocomplete, createFilterOptions, usePagination */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Alert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Alert */ "./node_modules/@material-ui/lab/esm/Alert/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Alert", function() { return _Alert__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* empty/unused harmony star reexport *//* harmony import */ var _AlertTitle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AlertTitle */ "./node_modules/@material-ui/lab/esm/AlertTitle/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AlertTitle", function() { return _AlertTitle__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* empty/unused harmony star reexport *//* harmony import */ var _Autocomplete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Autocomplete */ "./node_modules/@material-ui/lab/esm/Autocomplete/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Autocomplete", function() { return _Autocomplete__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createFilterOptions", function() { return _Autocomplete__WEBPACK_IMPORTED_MODULE_2__["createFilterOptions"]; });

/* harmony import */ var _AvatarGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AvatarGroup */ "./node_modules/@material-ui/lab/esm/AvatarGroup/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AvatarGroup", function() { return _AvatarGroup__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* empty/unused harmony star reexport *//* harmony import */ var _Pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Pagination */ "./node_modules/@material-ui/lab/esm/Pagination/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pagination", function() { return _Pagination__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePagination", function() { return _Pagination__WEBPACK_IMPORTED_MODULE_4__["usePagination"]; });

/* harmony import */ var _PaginationItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PaginationItem */ "./node_modules/@material-ui/lab/esm/PaginationItem/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PaginationItem", function() { return _PaginationItem__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* empty/unused harmony star reexport *//* harmony import */ var _Rating__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Rating */ "./node_modules/@material-ui/lab/esm/Rating/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rating", function() { return _Rating__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* empty/unused harmony star reexport *//* harmony import */ var _Skeleton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Skeleton */ "./node_modules/@material-ui/lab/esm/Skeleton/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Skeleton", function() { return _Skeleton__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* empty/unused harmony star reexport *//* harmony import */ var _SpeedDial__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SpeedDial */ "./node_modules/@material-ui/lab/esm/SpeedDial/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SpeedDial", function() { return _SpeedDial__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* empty/unused harmony star reexport *//* harmony import */ var _SpeedDialAction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SpeedDialAction */ "./node_modules/@material-ui/lab/esm/SpeedDialAction/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SpeedDialAction", function() { return _SpeedDialAction__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* empty/unused harmony star reexport *//* harmony import */ var _SpeedDialIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SpeedDialIcon */ "./node_modules/@material-ui/lab/esm/SpeedDialIcon/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SpeedDialIcon", function() { return _SpeedDialIcon__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* empty/unused harmony star reexport *//* harmony import */ var _ToggleButton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ToggleButton */ "./node_modules/@material-ui/lab/esm/ToggleButton/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToggleButton", function() { return _ToggleButton__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* empty/unused harmony star reexport *//* harmony import */ var _ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ToggleButtonGroup */ "./node_modules/@material-ui/lab/esm/ToggleButtonGroup/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToggleButtonGroup", function() { return _ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* empty/unused harmony star reexport *//* harmony import */ var _TreeItem__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./TreeItem */ "./node_modules/@material-ui/lab/esm/TreeItem/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TreeItem", function() { return _TreeItem__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* empty/unused harmony star reexport *//* harmony import */ var _TreeView__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./TreeView */ "./node_modules/@material-ui/lab/esm/TreeView/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TreeView", function() { return _TreeView__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* empty/unused harmony star reexport *//* harmony import */ var _useAutocomplete__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./useAutocomplete */ "./node_modules/@material-ui/lab/esm/useAutocomplete/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useAutocomplete", function() { return _useAutocomplete__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/** @license Material-UI v4.0.0-alpha.46
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable import/export */





























 // createFilterOptions is exported from Autocomplete



/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/internal/svg-icons/Add.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/internal/svg-icons/Add.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createSvgIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSvgIcon */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/createSvgIcon.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_createSvgIcon__WEBPACK_IMPORTED_MODULE_1__["default"])(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
}), 'Add'));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/internal/svg-icons/ArrowDropDown.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/internal/svg-icons/ArrowDropDown.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createSvgIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSvgIcon */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/createSvgIcon.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_createSvgIcon__WEBPACK_IMPORTED_MODULE_1__["default"])(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M7 10l5 5 5-5z"
}), 'ArrowDropDown'));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/internal/svg-icons/Close.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/internal/svg-icons/Close.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createSvgIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSvgIcon */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/createSvgIcon.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_createSvgIcon__WEBPACK_IMPORTED_MODULE_1__["default"])(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), 'Close'));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/internal/svg-icons/ErrorOutline.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/internal/svg-icons/ErrorOutline.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createSvgIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSvgIcon */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/createSvgIcon.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_createSvgIcon__WEBPACK_IMPORTED_MODULE_1__["default"])(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), 'ErrorOutline'));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/internal/svg-icons/FirstPage.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/internal/svg-icons/FirstPage.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createSvgIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSvgIcon */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/createSvgIcon.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_createSvgIcon__WEBPACK_IMPORTED_MODULE_1__["default"])(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"
}), 'FirstPage'));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/internal/svg-icons/InfoOutlined.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/internal/svg-icons/InfoOutlined.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createSvgIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSvgIcon */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/createSvgIcon.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_createSvgIcon__WEBPACK_IMPORTED_MODULE_1__["default"])(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
}), 'InfoOutlined'));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/internal/svg-icons/LastPage.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/internal/svg-icons/LastPage.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createSvgIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSvgIcon */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/createSvgIcon.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_createSvgIcon__WEBPACK_IMPORTED_MODULE_1__["default"])(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"
}), 'LastPage'));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/internal/svg-icons/NavigateBefore.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/internal/svg-icons/NavigateBefore.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createSvgIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSvgIcon */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/createSvgIcon.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_createSvgIcon__WEBPACK_IMPORTED_MODULE_1__["default"])(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
}), 'NavigateBefore'));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/internal/svg-icons/NavigateNext.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/internal/svg-icons/NavigateNext.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createSvgIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSvgIcon */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/createSvgIcon.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_createSvgIcon__WEBPACK_IMPORTED_MODULE_1__["default"])(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
}), 'NavigateNext'));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/internal/svg-icons/ReportProblemOutlined.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/internal/svg-icons/ReportProblemOutlined.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createSvgIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSvgIcon */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/createSvgIcon.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_createSvgIcon__WEBPACK_IMPORTED_MODULE_1__["default"])(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
}), 'ReportProblemOutlined'));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/internal/svg-icons/Star.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/internal/svg-icons/Star.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createSvgIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSvgIcon */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/createSvgIcon.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_createSvgIcon__WEBPACK_IMPORTED_MODULE_1__["default"])(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
}), 'Star'));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/internal/svg-icons/SuccessOutlined.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/internal/svg-icons/SuccessOutlined.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createSvgIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSvgIcon */ "./node_modules/@material-ui/lab/esm/internal/svg-icons/createSvgIcon.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_createSvgIcon__WEBPACK_IMPORTED_MODULE_1__["default"])(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
}), 'SuccessOutlined'));

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/internal/svg-icons/createSvgIcon.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/internal/svg-icons/createSvgIcon.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createSvgIcon; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_SvgIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/SvgIcon */ "./node_modules/@material-ui/core/esm/SvgIcon/index.js");



function createSvgIcon(path, displayName) {
  var Component = react__WEBPACK_IMPORTED_MODULE_1__["memo"](react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"](function (props, ref) {
    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_material_ui_core_SvgIcon__WEBPACK_IMPORTED_MODULE_2__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      ref: ref
    }, props), path);
  }));

  if (true) {
    Component.displayName = "".concat(displayName, "Icon");
  }

  Component.muiName = _material_ui_core_SvgIcon__WEBPACK_IMPORTED_MODULE_2__["default"].muiName;
  return Component;
}

/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/useAutocomplete/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/useAutocomplete/index.js ***!
  \********************************************************************/
/*! exports provided: default, createFilterOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _useAutocomplete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useAutocomplete */ "./node_modules/@material-ui/lab/esm/useAutocomplete/useAutocomplete.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _useAutocomplete__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createFilterOptions", function() { return _useAutocomplete__WEBPACK_IMPORTED_MODULE_0__["createFilterOptions"]; });



/***/ }),

/***/ "./node_modules/@material-ui/lab/esm/useAutocomplete/useAutocomplete.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@material-ui/lab/esm/useAutocomplete/useAutocomplete.js ***!
  \******************************************************************************/
/*! exports provided: createFilterOptions, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilterOptions", function() { return createFilterOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useAutocomplete; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");





/* eslint-disable no-constant-condition */


 // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
// Give up on IE 11 support for this feature

function stripDiacritics(string) {
  return typeof string.normalize !== 'undefined' ? string.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : string;
}

function createFilterOptions() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _config$ignoreAccents = config.ignoreAccents,
      ignoreAccents = _config$ignoreAccents === void 0 ? true : _config$ignoreAccents,
      _config$ignoreCase = config.ignoreCase,
      ignoreCase = _config$ignoreCase === void 0 ? true : _config$ignoreCase,
      _config$matchFrom = config.matchFrom,
      matchFrom = _config$matchFrom === void 0 ? 'any' : _config$matchFrom,
      stringify = config.stringify,
      _config$trim = config.trim,
      trim = _config$trim === void 0 ? false : _config$trim,
      limit = config.limit;
  return function (options, _ref) {
    var inputValue = _ref.inputValue,
        getOptionLabel = _ref.getOptionLabel;
    var input = trim ? inputValue.trim() : inputValue;

    if (ignoreCase) {
      input = input.toLowerCase();
    }

    if (ignoreAccents) {
      input = stripDiacritics(input);
    }

    var filteredOptions = options.filter(function (option) {
      var candidate = (stringify || getOptionLabel)(option);

      if (ignoreCase) {
        candidate = candidate.toLowerCase();
      }

      if (ignoreAccents) {
        candidate = stripDiacritics(candidate);
      }

      return matchFrom === 'start' ? candidate.indexOf(input) === 0 : candidate.indexOf(input) > -1;
    });
    return typeof limit === 'number' ? filteredOptions.slice(0, limit) : filteredOptions;
  };
} // To replace with .findIndex() once we stop IE 11 support.

function findIndex(array, comp) {
  for (var i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }

  return -1;
}

var defaultFilterOptions = createFilterOptions(); // Number of options to jump in list box when pageup and pagedown keys are used.

var pageSize = 5;
function useAutocomplete(props) {
  var _props$autoComplete = props.autoComplete,
      autoComplete = _props$autoComplete === void 0 ? false : _props$autoComplete,
      _props$autoHighlight = props.autoHighlight,
      autoHighlight = _props$autoHighlight === void 0 ? false : _props$autoHighlight,
      _props$autoSelect = props.autoSelect,
      autoSelect = _props$autoSelect === void 0 ? false : _props$autoSelect,
      _props$blurOnSelect = props.blurOnSelect,
      blurOnSelect = _props$blurOnSelect === void 0 ? false : _props$blurOnSelect,
      _props$clearOnEscape = props.clearOnEscape,
      clearOnEscape = _props$clearOnEscape === void 0 ? false : _props$clearOnEscape,
      _props$componentName = props.componentName,
      componentName = _props$componentName === void 0 ? 'useAutocomplete' : _props$componentName,
      _props$debug = props.debug,
      debug = _props$debug === void 0 ? false : _props$debug,
      _props$defaultValue = props.defaultValue,
      defaultValue = _props$defaultValue === void 0 ? props.multiple ? [] : null : _props$defaultValue,
      _props$disableClearab = props.disableClearable,
      disableClearable = _props$disableClearab === void 0 ? false : _props$disableClearab,
      _props$disableCloseOn = props.disableCloseOnSelect,
      disableCloseOnSelect = _props$disableCloseOn === void 0 ? false : _props$disableCloseOn,
      _props$disableListWra = props.disableListWrap,
      disableListWrap = _props$disableListWra === void 0 ? false : _props$disableListWra,
      _props$filterOptions = props.filterOptions,
      filterOptions = _props$filterOptions === void 0 ? defaultFilterOptions : _props$filterOptions,
      _props$filterSelected = props.filterSelectedOptions,
      filterSelectedOptions = _props$filterSelected === void 0 ? false : _props$filterSelected,
      _props$freeSolo = props.freeSolo,
      freeSolo = _props$freeSolo === void 0 ? false : _props$freeSolo,
      getOptionDisabled = props.getOptionDisabled,
      _props$getOptionLabel = props.getOptionLabel,
      getOptionLabel = _props$getOptionLabel === void 0 ? function (x) {
    return x;
  } : _props$getOptionLabel,
      _props$getOptionSelec = props.getOptionSelected,
      getOptionSelected = _props$getOptionSelec === void 0 ? function (option, value) {
    return option === value;
  } : _props$getOptionSelec,
      groupBy = props.groupBy,
      idProp = props.id,
      _props$includeInputIn = props.includeInputInList,
      includeInputInList = _props$includeInputIn === void 0 ? false : _props$includeInputIn,
      inputValueProp = props.inputValue,
      _props$multiple = props.multiple,
      multiple = _props$multiple === void 0 ? false : _props$multiple,
      onChange = props.onChange,
      onClose = props.onClose,
      onInputChange = props.onInputChange,
      onOpen = props.onOpen,
      openProp = props.open,
      _props$openOnFocus = props.openOnFocus,
      openOnFocus = _props$openOnFocus === void 0 ? false : _props$openOnFocus,
      options = props.options,
      _props$selectOnFocus = props.selectOnFocus,
      selectOnFocus = _props$selectOnFocus === void 0 ? !props.freeSolo : _props$selectOnFocus,
      valueProp = props.value;

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_4__["useState"](),
      defaultId = _React$useState[0],
      setDefaultId = _React$useState[1];

  var id = idProp || defaultId;
  react__WEBPACK_IMPORTED_MODULE_4__["useEffect"](function () {
    // Fallback to this default id when possible.
    // Use the random value for client-side rendering only.
    // We can't use it server-side.
    setDefaultId("mui-autocomplete-".concat(Math.round(Math.random() * 1e5)));
  }, []);
  var ignoreFocus = react__WEBPACK_IMPORTED_MODULE_4__["useRef"](false);
  var firstFocus = react__WEBPACK_IMPORTED_MODULE_4__["useRef"](true);
  var inputRef = react__WEBPACK_IMPORTED_MODULE_4__["useRef"](null);
  var listboxRef = react__WEBPACK_IMPORTED_MODULE_4__["useRef"](null);

  var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_4__["useState"](null),
      anchorEl = _React$useState2[0],
      setAnchorEl = _React$useState2[1];

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_4__["useState"](-1),
      focusedTag = _React$useState3[0],
      setFocusedTag = _React$useState3[1];

  var defaultHighlighted = autoHighlight ? 0 : -1;
  var highlightedIndexRef = react__WEBPACK_IMPORTED_MODULE_4__["useRef"](defaultHighlighted);
  var setHighlightedIndex = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_6__["useEventCallback"])(function (index) {
    var mouse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    highlightedIndexRef.current = index; // does the index exist?

    if (index === -1) {
      inputRef.current.removeAttribute('aria-activedescendant');
    } else {
      inputRef.current.setAttribute('aria-activedescendant', "".concat(id, "-option-").concat(index));
    }

    if (!listboxRef.current) {
      return;
    }

    var prev = listboxRef.current.querySelector('[data-focus]');

    if (prev) {
      prev.removeAttribute('data-focus');
    }

    var listboxNode = listboxRef.current.parentElement.querySelector('[role="listbox"]'); // "No results"

    if (!listboxNode) {
      return;
    }

    if (index === -1) {
      listboxNode.scrollTop = 0;
      return;
    }

    var option = listboxRef.current.querySelector("[data-option-index=\"".concat(index, "\"]"));

    if (!option) {
      return;
    }

    option.setAttribute('data-focus', 'true'); // Scroll active descendant into view.
    // Logic copied from https://www.w3.org/TR/wai-aria-practices/examples/listbox/js/listbox.js
    //
    // Consider this API instead once it has a better browser support:
    // .scrollIntoView({ scrollMode: 'if-needed', block: 'nearest' });

    if (listboxNode.scrollHeight > listboxNode.clientHeight && !mouse) {
      var element = option;
      var scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
      var elementBottom = element.offsetTop + element.offsetHeight;

      if (elementBottom > scrollBottom) {
        listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
      } else if (element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0) < listboxNode.scrollTop) {
        listboxNode.scrollTop = element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0);
      }
    }
  });

  var _useControlled = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_6__["useControlled"])({
    controlled: valueProp,
    default: defaultValue,
    name: componentName
  }),
      _useControlled2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useControlled, 2),
      value = _useControlled2[0],
      setValue = _useControlled2[1];

  var _React$useRef = react__WEBPACK_IMPORTED_MODULE_4__["useRef"](inputValueProp != null),
      isInputValueControlled = _React$useRef.current;

  var _React$useState4 = react__WEBPACK_IMPORTED_MODULE_4__["useState"](''),
      inputValueState = _React$useState4[0],
      setInputValue = _React$useState4[1];

  var inputValue = isInputValueControlled ? inputValueProp : inputValueState;

  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_4__["useState"](false),
      focused = _React$useState5[0],
      setFocused = _React$useState5[1];

  var resetInputValue = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_6__["useEventCallback"])(function (event, newValue) {
    var newInputValue;

    if (multiple) {
      newInputValue = '';
    } else if (newValue == null) {
      newInputValue = '';
    } else {
      var optionLabel = getOptionLabel(newValue);

      if (true) {
        if (typeof optionLabel !== 'string') {
          var erroneousReturn = optionLabel === undefined ? 'undefined' : "".concat(Object(_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(optionLabel), " (").concat(optionLabel, ")");
          console.error(["Material-UI: the `getOptionLabel` method of ".concat(componentName, " returned ").concat(erroneousReturn, " instead of a string for"), JSON.stringify(newValue)].join('\n'));
        }
      }

      newInputValue = typeof optionLabel === 'string' ? optionLabel : '';
    }

    if (inputValue === newInputValue) {
      return;
    }

    setInputValue(newInputValue);

    if (onInputChange) {
      onInputChange(event, newInputValue, 'reset');
    }
  });
  react__WEBPACK_IMPORTED_MODULE_4__["useEffect"](function () {
    resetInputValue(null, value);
  }, [value, resetInputValue]);

  var _React$useRef2 = react__WEBPACK_IMPORTED_MODULE_4__["useRef"](openProp != null),
      isOpenControlled = _React$useRef2.current;

  var _React$useState6 = react__WEBPACK_IMPORTED_MODULE_4__["useState"](false),
      openState = _React$useState6[0],
      setOpenState = _React$useState6[1];

  var open = isOpenControlled ? openProp : openState;
  var inputValueIsSelectedValue = !multiple && value != null && inputValue === getOptionLabel(value);
  var popupOpen = open;
  var filteredOptions = popupOpen ? filterOptions(options.filter(function (option) {
    if (filterSelectedOptions && (multiple ? value : [value]).some(function (value2) {
      return value2 !== null && getOptionSelected(option, value2);
    })) {
      return false;
    }

    return true;
  }), // we use the empty string to manipulate `filterOptions` to not filter any options
  // i.e. the filter predicate always returns true
  {
    inputValue: inputValueIsSelectedValue ? '' : inputValue,
    getOptionLabel: getOptionLabel
  }) : [];
  popupOpen = freeSolo && filteredOptions.length === 0 ? false : popupOpen;
  var focusTag = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_6__["useEventCallback"])(function (tagToFocus) {
    if (tagToFocus === -1) {
      inputRef.current.focus();
    } else {
      anchorEl.querySelector("[data-tag-index=\"".concat(tagToFocus, "\"]")).focus();
    }
  }); // Ensure the focusedTag is never inconsistent

  react__WEBPACK_IMPORTED_MODULE_4__["useEffect"](function () {
    if (multiple && focusedTag > value.length - 1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
  }, [value, multiple, focusedTag, focusTag]);

  function validOptionIndex(index, direction) {
    if (!listboxRef.current || index === -1) {
      return -1;
    }

    var nextFocus = index;

    while (true) {
      // Out of range
      if (direction === 'next' && nextFocus === filteredOptions.length || direction === 'previous' && nextFocus === -1) {
        return -1;
      }

      var option = listboxRef.current.querySelector("[data-option-index=\"".concat(nextFocus, "\"]")); // Same logic as MenuList.js

      if (option && (!option.hasAttribute('tabindex') || option.disabled || option.getAttribute('aria-disabled') === 'true')) {
        nextFocus += direction === 'next' ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }

  var changeHighlightedIndex = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_6__["useEventCallback"])(function (diff, direction) {
    if (!popupOpen) {
      return;
    }

    var getNextIndex = function getNextIndex() {
      var maxIndex = filteredOptions.length - 1;

      if (diff === 'reset') {
        return defaultHighlighted;
      }

      if (diff === 'start') {
        return 0;
      }

      if (diff === 'end') {
        return maxIndex;
      }

      var newIndex = highlightedIndexRef.current + diff;

      if (newIndex < 0) {
        if (newIndex === -1 && includeInputInList) {
          return -1;
        }

        if (disableListWrap && highlightedIndexRef.current !== -1 || Math.abs(diff) > 1) {
          return 0;
        }

        return maxIndex;
      }

      if (newIndex > maxIndex) {
        if (newIndex === maxIndex + 1 && includeInputInList) {
          return -1;
        }

        if (disableListWrap || Math.abs(diff) > 1) {
          return maxIndex;
        }

        return 0;
      }

      return newIndex;
    };

    var nextIndex = validOptionIndex(getNextIndex(), direction);
    setHighlightedIndex(nextIndex);

    if (autoComplete && diff !== 'reset') {
      if (nextIndex === -1) {
        inputRef.current.value = inputValue;
      } else {
        var option = getOptionLabel(filteredOptions[nextIndex]);
        inputRef.current.value = option; // The portion of the selected suggestion that has not been typed by the user,
        // a completion string, appears inline after the input cursor in the textbox.

        var index = option.toLowerCase().indexOf(inputValue.toLowerCase());

        if (index === 0 && inputValue.length > 0) {
          inputRef.current.setSelectionRange(inputValue.length, option.length);
        }
      }
    }
  });
  react__WEBPACK_IMPORTED_MODULE_4__["useEffect"](function () {
    if (!open) {
      return;
    }

    var valueItem = multiple ? value[0] : value; // The popup is empty

    if (filteredOptions.length === 0 || valueItem == null) {
      changeHighlightedIndex('reset', 'next');
      return;
    } // Synchronize the value with the highlighted index


    if (!filterSelectedOptions && valueItem != null) {
      var itemIndex = findIndex(filteredOptions, function (optionItem) {
        return getOptionSelected(optionItem, valueItem);
      });
      setHighlightedIndex(itemIndex);
      return;
    } // Keep the index in the boundaries


    if (highlightedIndexRef.current >= filteredOptions.length - 1) {
      setHighlightedIndex(filteredOptions.length - 1);
    } // Ignore filterOptions => options, getOptionSelected, getOptionLabel)
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [value, open, filterSelectedOptions, changeHighlightedIndex, setHighlightedIndex, inputValue, multiple]);

  var handleOpen = function handleOpen(event) {
    if (open) {
      return;
    }

    if (onOpen) {
      onOpen(event);
    }

    if (!isOpenControlled) {
      setOpenState(true);
    }
  };

  var handleClose = function handleClose(event, reason) {
    if (!open) {
      return;
    }

    if (onClose) {
      onClose(event, reason);
    }

    if (!isOpenControlled) {
      setOpenState(false);
    }
  };

  var handleValue = function handleValue(event, newValue, reason, details) {
    if (value === newValue) {
      return;
    }

    if (onChange) {
      onChange(event, newValue, reason, details);
    }

    setValue(newValue);
  };

  var selectNewValue = function selectNewValue(event, option) {
    var reasonProp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'select-option';
    var origin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'options';
    var reason = reasonProp;
    var newValue = option;

    if (multiple) {
      newValue = Array.isArray(value) ? Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(value) : [];

      if (true) {
        var matches = newValue.filter(function (val) {
          return getOptionSelected(option, val);
        });

        if (matches.length > 1) {
          console.error(["Material-UI: the `getOptionSelected` method of ".concat(componentName, " do not handle the arguments correctly."), "The component expects a single value to match a given option but found ".concat(matches.length, " matches.")].join('\n'));
        }
      }

      var itemIndex = findIndex(newValue, function (valueItem) {
        return getOptionSelected(option, valueItem);
      });

      if (itemIndex === -1) {
        newValue.push(option);
      } else if (origin !== 'freeSolo') {
        newValue.splice(itemIndex, 1);
        reason = 'remove-option';
      }
    }

    resetInputValue(event, newValue);
    handleValue(event, newValue, reason, {
      option: option
    });

    if (!disableCloseOnSelect) {
      handleClose(event, reason);
    }
  };

  function validTagIndex(index, direction) {
    if (index === -1) {
      return -1;
    }

    var nextFocus = index;

    while (true) {
      // Out of range
      if (direction === 'next' && nextFocus === value.length || direction === 'previous' && nextFocus === -1) {
        return -1;
      }

      var option = anchorEl.querySelector("[data-tag-index=\"".concat(nextFocus, "\"]")); // Same logic as MenuList.js

      if (option && (!option.hasAttribute('tabindex') || option.disabled || option.getAttribute('aria-disabled') === 'true')) {
        nextFocus += direction === 'next' ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }

  var handleFocusTag = function handleFocusTag(event, direction) {
    if (!multiple) {
      return;
    }

    handleClose(event, 'toggleInput');
    var nextTag = focusedTag;

    if (focusedTag === -1) {
      if (inputValue === '' && direction === 'previous') {
        nextTag = value.length - 1;
      }
    } else {
      nextTag += direction === 'next' ? 1 : -1;

      if (nextTag < 0) {
        nextTag = 0;
      }

      if (nextTag === value.length) {
        nextTag = -1;
      }
    }

    nextTag = validTagIndex(nextTag, direction);
    setFocusedTag(nextTag);
    focusTag(nextTag);
  };

  var handleClear = function handleClear(event) {
    ignoreFocus.current = true;
    setInputValue('');

    if (onInputChange) {
      onInputChange(event, '', 'clear');
    }

    handleValue(event, multiple ? [] : null, 'clear');
  };

  var handleKeyDown = function handleKeyDown(other) {
    return function (event) {
      if (focusedTag !== -1 && ['ArrowLeft', 'ArrowRight'].indexOf(event.key) === -1) {
        setFocusedTag(-1);
        focusTag(-1);
      }

      switch (event.key) {
        case 'Home':
          if (popupOpen) {
            // Prevent scroll of the page
            event.preventDefault();
            changeHighlightedIndex('start', 'next');
          }

          break;

        case 'End':
          if (popupOpen) {
            // Prevent scroll of the page
            event.preventDefault();
            changeHighlightedIndex('end', 'previous');
          }

          break;

        case 'PageUp':
          // Prevent scroll of the page
          event.preventDefault();
          changeHighlightedIndex(-pageSize, 'previous');
          handleOpen(event);
          break;

        case 'PageDown':
          // Prevent scroll of the page
          event.preventDefault();
          changeHighlightedIndex(pageSize, 'next');
          handleOpen(event);
          break;

        case 'ArrowDown':
          // Prevent cursor move
          event.preventDefault();
          changeHighlightedIndex(1, 'next');
          handleOpen(event);
          break;

        case 'ArrowUp':
          // Prevent cursor move
          event.preventDefault();
          changeHighlightedIndex(-1, 'previous');
          handleOpen(event);
          break;

        case 'ArrowLeft':
          handleFocusTag(event, 'previous');
          break;

        case 'ArrowRight':
          handleFocusTag(event, 'next');
          break;

        case 'Enter':
          // Wait until IME is settled.
          if (event.which === 229) {
            break;
          }

          if (highlightedIndexRef.current !== -1 && popupOpen) {
            // We don't want to validate the form.
            event.preventDefault();
            selectNewValue(event, filteredOptions[highlightedIndexRef.current], 'select-option'); // Move the selection to the end.

            if (autoComplete) {
              inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
            }
          } else if (freeSolo && inputValue !== '' && inputValueIsSelectedValue === false) {
            if (multiple) {
              // Allow people to add new values before they submit the form.
              event.preventDefault();
            }

            selectNewValue(event, inputValue, 'create-option', 'freeSolo');
          }

          break;

        case 'Escape':
          if (popupOpen) {
            // Avoid Opera to exit fullscreen mode.
            event.preventDefault(); // Avoid the Modal to handle the event.

            event.stopPropagation();
            handleClose(event, 'escape');
          } else if (clearOnEscape && (inputValue !== '' || multiple && value.length > 0)) {
            // Avoid Opera to exit fullscreen mode.
            event.preventDefault(); // Avoid the Modal to handle the event.

            event.stopPropagation();
            handleClear(event);
          }

          break;

        case 'Backspace':
          if (multiple && inputValue === '' && value.length > 0) {
            var index = focusedTag === -1 ? value.length - 1 : focusedTag;

            var newValue = Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(value);

            newValue.splice(index, 1);
            handleValue(event, newValue, 'remove-option', {
              option: value[index]
            });
          }

          break;

        default:
      }

      if (other.onKeyDown) {
        other.onKeyDown(event);
      }
    };
  };

  var handleFocus = function handleFocus(event) {
    setFocused(true);

    if (openOnFocus && !ignoreFocus.current) {
      handleOpen(event);
    }
  };

  var handleBlur = function handleBlur(event) {
    // Ignore the event when using the scrollbar with IE 11
    if (listboxRef.current !== null && document.activeElement === listboxRef.current.parentElement) {
      inputRef.current.focus();
      return;
    }

    setFocused(false);
    firstFocus.current = true;
    ignoreFocus.current = false;

    if (debug && inputValue !== '') {
      return;
    }

    if (autoSelect && highlightedIndexRef.current !== -1 && popupOpen) {
      selectNewValue(event, filteredOptions[highlightedIndexRef.current], 'blur');
    } else if (autoSelect && freeSolo && inputValue !== '') {
      selectNewValue(event, inputValue, 'blur', 'freeSolo');
    } else if (!freeSolo) {
      resetInputValue(event, value);
    }

    handleClose(event, 'blur');
  };

  var handleInputChange = function handleInputChange(event) {
    var newValue = event.target.value;

    if (inputValue !== newValue) {
      setInputValue(newValue);

      if (onInputChange) {
        onInputChange(event, newValue, 'input');
      }
    }

    if (newValue === '') {
      if (!disableClearable && !multiple) {
        handleValue(event, null, 'clear');
      }
    } else {
      handleOpen(event);
    }
  };

  var handleOptionMouseOver = function handleOptionMouseOver(event) {
    var index = Number(event.currentTarget.getAttribute('data-option-index'));
    setHighlightedIndex(index, 'mouse');
  };

  var isTouch = react__WEBPACK_IMPORTED_MODULE_4__["useRef"](false);

  var handleOptionTouchStart = function handleOptionTouchStart() {
    isTouch.current = true;
  };

  var handleOptionClick = function handleOptionClick(event) {
    var index = Number(event.currentTarget.getAttribute('data-option-index'));
    selectNewValue(event, filteredOptions[index], 'select-option');

    if (blurOnSelect === true || blurOnSelect === 'touch' && isTouch.current || blurOnSelect === 'mouse' && !isTouch.current) {
      inputRef.current.blur();
    }

    isTouch.current = false;
  };

  var handleTagDelete = function handleTagDelete(index) {
    return function (event) {
      var newValue = Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(value);

      newValue.splice(index, 1);
      handleValue(event, newValue, 'remove-option', {
        option: value[index]
      });
    };
  };

  var handleListboxRef = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_6__["useEventCallback"])(function (node) {
    Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_6__["setRef"])(listboxRef, node);

    if (!node) {
      return;
    } // Automatically select the first option as the listbox become visible.


    if (highlightedIndexRef.current === -1 && autoHighlight) {
      changeHighlightedIndex('reset', 'next');
    } else {
      // Restore the focus to the correct option.
      setHighlightedIndex(highlightedIndexRef.current);
    }
  });

  var handlePopupIndicator = function handlePopupIndicator(event) {
    if (open) {
      handleClose(event, 'toggleInput');
    } else {
      handleOpen(event);
    }
  }; // Prevent input blur when interacting with the combobox


  var handleMouseDown = function handleMouseDown(event) {
    if (event.target.getAttribute('id') !== id) {
      event.preventDefault();
    }
  }; // Focus the input when interacting with the combobox


  var handleClick = function handleClick() {
    inputRef.current.focus();

    if (selectOnFocus && firstFocus.current && inputRef.current.selectionEnd - inputRef.current.selectionStart === 0) {
      inputRef.current.select();
    }

    firstFocus.current = false;
  };

  var handleInputMouseDown = function handleInputMouseDown(event) {
    if (inputValue === '') {
      handlePopupIndicator(event);
    }
  };

  var dirty = freeSolo && inputValue.length > 0;
  dirty = dirty || (multiple ? value.length > 0 : value !== null);
  var groupedOptions = filteredOptions;

  if (groupBy) {
    var result = []; // used to keep track of key and indexes in the result array

    var indexByKey = new Map();
    var currentResultIndex = 0;
    filteredOptions.forEach(function (option) {
      var key = groupBy(option);

      if (indexByKey.get(key) === undefined) {
        indexByKey.set(key, currentResultIndex);
        result.push({
          key: key,
          options: []
        });
        currentResultIndex += 1;
      }

      result[indexByKey.get(key)].options.push(option);
    }); // now we can add the `index` property based on the options length

    var indexCounter = 0;
    result.forEach(function (option) {
      option.index = indexCounter;
      indexCounter += option.options.length;
    });
    groupedOptions = result;
  }

  return {
    getRootProps: function getRootProps() {
      var other = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        'aria-owns': popupOpen ? "".concat(id, "-popup") : null,
        role: 'combobox',
        'aria-expanded': popupOpen
      }, other, {
        onKeyDown: handleKeyDown(other),
        onMouseDown: handleMouseDown,
        onClick: handleClick
      });
    },
    getInputLabelProps: function getInputLabelProps() {
      return {
        id: "".concat(id, "-label"),
        htmlFor: id
      };
    },
    getInputProps: function getInputProps() {
      return {
        id: id,
        value: inputValue,
        onBlur: handleBlur,
        onFocus: handleFocus,
        onChange: handleInputChange,
        onMouseDown: handleInputMouseDown,
        // if open then this is handled imperativeley so don't let react override
        // only have an opinion about this when closed
        'aria-activedescendant': popupOpen ? '' : null,
        'aria-autocomplete': autoComplete ? 'both' : 'list',
        'aria-controls': popupOpen ? "".concat(id, "-popup") : null,
        // Disable browser's suggestion that might overlap with the popup.
        // Handle autocomplete but not autofill.
        autoComplete: 'off',
        ref: inputRef,
        autoCapitalize: 'none',
        spellCheck: 'false'
      };
    },
    getClearProps: function getClearProps() {
      return {
        tabIndex: -1,
        onClick: handleClear
      };
    },
    getPopupIndicatorProps: function getPopupIndicatorProps() {
      return {
        tabIndex: -1,
        onClick: handlePopupIndicator
      };
    },
    getTagProps: function getTagProps(_ref2) {
      var index = _ref2.index;
      return {
        key: index,
        'data-tag-index': index,
        tabIndex: -1,
        onDelete: handleTagDelete(index)
      };
    },
    getListboxProps: function getListboxProps() {
      return {
        role: 'listbox',
        id: "".concat(id, "-popup"),
        'aria-labelledby': "".concat(id, "-label"),
        ref: handleListboxRef,
        onMouseDown: function onMouseDown(event) {
          // Prevent blur
          event.preventDefault();
        }
      };
    },
    getOptionProps: function getOptionProps(_ref3) {
      var index = _ref3.index,
          option = _ref3.option;
      var selected = (multiple ? value : [value]).some(function (value2) {
        return value2 != null && getOptionSelected(option, value2);
      });
      var disabled = getOptionDisabled ? getOptionDisabled(option) : false;
      return {
        key: index,
        tabIndex: -1,
        role: 'option',
        id: "".concat(id, "-option-").concat(index),
        onMouseOver: handleOptionMouseOver,
        onClick: handleOptionClick,
        onTouchStart: handleOptionTouchStart,
        'data-option-index': index,
        'aria-disabled': disabled,
        'aria-selected': selected
      };
    },
    id: id,
    inputValue: inputValue,
    value: value,
    dirty: dirty,
    popupOpen: popupOpen,
    focused: focused || focusedTag !== -1,
    anchorEl: anchorEl,
    setAnchorEl: setAnchorEl,
    focusedTag: focusedTag,
    groupedOptions: groupedOptions
  };
}
useAutocomplete.propTypes = {
  /**
   * If `true`, the portion of the selected suggestion that has not been typed by the user,
   * known as the completion string, appears inline after the input cursor in the textbox.
   * The inline completion string is visually highlighted and has a selected state.
   */
  autoComplete: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

  /**
   * If `true`, the first option is automatically highlighted.
   */
  autoHighlight: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

  /**
   * If `true`, the selected option becomes the value of the input
   * when the Autocomplete loses focus unless the user chooses
   * a different option or changes the character string in the input.
   */
  autoSelect: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,

  /**
   * If `true`, clear all values when the user presses escape and the popup is closed.
   */
  clearOnEscape: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

  /**
   * The component name that is using this hook. Used for warnings.
   */
  componentName: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,

  /**
   * If `true`, the popup will ignore the blur event if the input is filled.
   * You can inspect the popup markup with your browser tools.
   * Consider this option when you need to customize the component.
   */
  debug: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

  /**
   * The default input value. Use when the component is not controlled.
   */
  defaultValue: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.any,

  /**
   * If `true`, the input can't be cleared.
   */
  disableClearable: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

  /**
   * If `true`, the popup won't close when a value is selected.
   */
  disableCloseOnSelect: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

  /**
   * If `true`, the list box in the popup will not wrap focus.
   */
  disableListWrap: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

  /**
   * A filter function that determins the options that are eligible.
   *
   * @param {any} options The options to render.
   * @param {object} state The state of the component.
   * @returns {boolean}
   */
  filterOptions: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,

  /**
   * If `true`, hide the selected options from the list box.
   */
  filterSelectedOptions: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

  /**
   * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
   */
  freeSolo: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

  /**
   * Used to determine the disabled state for a given option.
   */
  getOptionDisabled: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,

  /**
   * Used to determine the string value for a given option.
   * It's used to fill the input (and the list box options if `renderOption` is not provided).
   */
  getOptionLabel: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,

  /**
   * If provided, the options will be grouped under the returned string.
   * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
   *
   * @param {any} options The option to group.
   * @returns {string}
   */
  groupBy: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,

  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,

  /**
   * If `true`, the highlight can move to the input.
   */
  includeInputInList: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   */
  multiple: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {any} value
   * @param {string} reason One of "create-option", "select-option", "remove-option", "blur" or "clear".
   */
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,

  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,

  /**
   * Callback fired when the text input value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {string} value The new value of the text input.
   * @param {string} reason One of "input" (user input) or "reset" (programmatic change).
   */
  onInputChange: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,

  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,

  /**
   * Control the popup` open state.
   */
  open: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

  /**
   * If `true`, the popup will open on input focus.
   */
  openOnFocus: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

  /**
   * Array of options.
   */
  options: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array,

  /**
   * The input value.
   */
  value: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.any
};

/***/ })

}]);