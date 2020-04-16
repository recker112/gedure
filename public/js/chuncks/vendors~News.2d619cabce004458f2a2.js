(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~News"],{

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
      padding: '8px 0'
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
  success: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_SuccessOutlined__WEBPACK_IMPORTED_MODULE_7__["default"], {
    fontSize: "inherit"
  }),
  warning: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_ReportProblemOutlined__WEBPACK_IMPORTED_MODULE_8__["default"], {
    fontSize: "inherit"
  }),
  error: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_ErrorOutline__WEBPACK_IMPORTED_MODULE_9__["default"], {
    fontSize: "inherit"
  }),
  info: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_InfoOutlined__WEBPACK_IMPORTED_MODULE_10__["default"], {
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

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    role: role,
    square: true,
    elevation: 0,
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.root, classes["".concat(variant).concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_13__["capitalize"])(color || severity))], className),
    ref: ref
  }, other), icon !== false ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: classes.icon
  }, icon || iconMapping[severity] || defaultIconMapping[severity]) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: classes.message
  }, children), action != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: classes.action
  }, action) : null, action == null && onClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: classes.action
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_12__["default"], {
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

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Typography"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
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
  }), extraAvatars ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_7__["default"], {
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_PaginationItem__WEBPACK_IMPORTED_MODULE_7__["default"], item);
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

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("nav", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    "aria-label": "pagination navigation",
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.root, className),
    ref: ref
  }, other), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("ul", {
    className: classes.ul
  }, items.map(function (item, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("li", {
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
    name: componentName,
    state: 'page'
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

  var theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["useTheme"])();
  var normalizedIcons = theme.direction === 'rtl' ? {
    previous: _internal_svg_icons_NavigateNext__WEBPACK_IMPORTED_MODULE_10__["default"],
    next: _internal_svg_icons_NavigateBefore__WEBPACK_IMPORTED_MODULE_9__["default"],
    last: _internal_svg_icons_FirstPage__WEBPACK_IMPORTED_MODULE_7__["default"],
    first: _internal_svg_icons_LastPage__WEBPACK_IMPORTED_MODULE_8__["default"]
  } : {
    previous: _internal_svg_icons_NavigateBefore__WEBPACK_IMPORTED_MODULE_9__["default"],
    next: _internal_svg_icons_NavigateNext__WEBPACK_IMPORTED_MODULE_10__["default"],
    first: _internal_svg_icons_FirstPage__WEBPACK_IMPORTED_MODULE_7__["default"],
    last: _internal_svg_icons_LastPage__WEBPACK_IMPORTED_MODULE_8__["default"]
  };
  var Icon = normalizedIcons[type];
  return type === 'start-ellipsis' || type === 'end-ellipsis' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    ref: ref,
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.root, classes.ellipsis, disabled && classes.disabled, size !== 'medium' && classes["size".concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_11__["capitalize"])(size))])
  }, "\u2026") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_ButtonBase__WEBPACK_IMPORTED_MODULE_6__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    ref: ref,
    component: component,
    disabled: disabled,
    focusVisibleClassName: classes.focusVisible,
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.root, classes.page, classes[variant], classes[shape], className, color !== 'standard' && classes["".concat(variant).concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_11__["capitalize"])(color))], disabled && classes.disabled, selected && classes.selected, size !== 'medium' && classes["size".concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_11__["capitalize"])(size))])
  }, other), type === 'page' && page, Icon ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](Icon, {
    className: classes.icon
  }) : null);
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

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", other);
}

 true ? IconContainer.propTypes = {
  value: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number.isRequired
} : undefined;
var defaultIcon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_Star__WEBPACK_IMPORTED_MODULE_8__["default"], {
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

  var name = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_7__["unstable_useId"])(nameProp);

  var _React$useRef = react__WEBPACK_IMPORTED_MODULE_2__["useRef"](valueProp !== undefined),
      isControlled = _React$useRef.current;

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2__["useState"](defaultValue),
      valueState = _React$useState[0],
      setValueState = _React$useState[1];

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

  var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_2__["useState"]({
    hover: -1,
    focus: -1
  }),
      _React$useState2$ = _React$useState2[0],
      hover = _React$useState2$.hover,
      focus = _React$useState2$.focus,
      setState = _React$useState2[1];

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

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_2__["useState"](false),
      focusVisible = _React$useState3[0],
      setFocusVisible = _React$useState3[1];

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
    var container = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](IconContainerComponent, {
      value: state.value,
      className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.icon, state.filled ? classes.iconFilled : classes.iconEmpty, state.hover && classes.iconHover, state.focus && classes.iconFocus, state.active && classes.iconActive)
    }, emptyIcon && !state.filled ? emptyIcon : icon);

    if (readOnly) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        key: state.value
      }, labelProps), container);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], {
      key: state.value
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("label", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      className: classes.label,
      htmlFor: id
    }, labelProps), container, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", {
      className: classes.visuallyhidden
    }, getLabelText(state.value))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("input", {
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

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", {
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
  }), !readOnly && !disabled && valueRounded == null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("input", {
    value: "",
    id: "".concat(name, "-empty"),
    type: "radio",
    name: name,
    defaultChecked: true,
    className: classes.visuallyhidden
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("label", {
    className: classes.pristine,
    htmlFor: "".concat(name, "-empty")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", {
    className: classes.visuallyhidden
  }, emptyLabelText))));
});
 true ? Rating.propTypes = {
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
  precision: Object(_material_ui_utils__WEBPACK_IMPORTED_MODULE_5__["chainPropTypes"])(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number, function (props) {
    if (props.precision < 0.1) {
      return new Error(['Material-UI: the prop `precision` should be above 0.1.', 'A value below this limit has an imperceptible impact.'].join('\n'));
    }

    return null;
  }),

  /**
   * Removes all hover effects and pointer events.
   */
  readOnly: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * The size of the rating.
   */
  size: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['large', 'medium', 'small']),

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

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__["default"])(classes.root, classes["direction".concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_9__["capitalize"])(direction))], className),
    ref: ref,
    role: "presentation",
    onKeyDown: handleKeyDown,
    onBlur: handleClose,
    onFocus: handleOpen,
    onMouseEnter: handleOpen,
    onMouseLeave: handleClose
  }, other), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](TransitionComponent, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    in: !hidden,
    timeout: transitionDuration,
    unmountOnExit: true
  }, TransitionProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_8__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
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
  }) : icon)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
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
  var fab = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_6__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    size: "small",
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.fab, className, !open && classes.fabClosed),
    tabIndex: -1,
    role: "menuitem",
    "aria-describedby": "".concat(id, "-label")
  }, FabProps, {
    style: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, transitionStyle, {}, FabProps.style)
  }), icon);

  if (tooltipOpenProp) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      id: id,
      ref: ref,
      className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.staticTooltip, classes["tooltipPlacement".concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_8__["capitalize"])(tooltipPlacement))], !open && classes.staticTooltipClosed)
    }, other), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", {
      style: transitionStyle,
      id: "".concat(id, "-label"),
      className: classes.staticTooltipLabel
    }, tooltipTitle), fab);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_7__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
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
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * If `true`, the tooltip is shown.
   */
  open: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * `classes` prop applied to the [`Tooltip`](/api/tooltip/) element.
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

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.root, className),
    ref: ref
  }, other), openIconProp ? formatIcon(openIconProp, openIconClassName) : null, iconProp ? formatIcon(iconProp, iconClassName) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_internal_svg_icons_Add__WEBPACK_IMPORTED_MODULE_6__["default"], {
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
      onChange = props.onChange,
      onClick = props.onClick,
      selected = props.selected,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      value = props.value,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(props, ["children", "classes", "className", "disabled", "disableFocusRipple", "onChange", "onClick", "selected", "size", "value"]);

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

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_ButtonBase__WEBPACK_IMPORTED_MODULE_6__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__["default"])(classes.root, className, disabled && classes.disabled, selected && classes.selected, size !== 'medium' && classes["size".concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_7__["capitalize"])(size))]),
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    ref: ref,
    onClick: handleChange,
    onChange: onChange,
    value: value,
    "aria-pressed": selected
  }, other), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", {
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

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
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
            flag = selectRange(event, {
              end: nodeId
            });
          } else if (multiSelect) {
            flag = selectNode(event, nodeId, true);
          } else {
            flag = selectNode(event, nodeId);
          }
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
          flag = selectAllNodes(event);
        } else if (!ctrlPressed && !event.shiftKey && isPrintableCharacter(key)) {
          focusByFirstCharacter(nodeId, key);
          flag = true;
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
    if (!focused && event.currentTarget === event.target) {
      focus(nodeId);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](function () {
    if (addNodeToNodeMap) {
      var childIds = [];
      react__WEBPACK_IMPORTED_MODULE_2__["Children"].forEach(children, function (child) {
        if (react__WEBPACK_IMPORTED_MODULE_2__["isValidElement"](child) && child.props.nodeId) {
          childIds.push(child.props.nodeId);
        }
      });
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
  var ariaSelected;

  if (multiSelect) {
    ariaSelected = selected;
  } else if (selected) {
    // single-selection trees unset aria-selected
    ariaSelected = true;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("li", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(classes.root, className, expanded && classes.expanded, selected && classes.selected),
    role: "treeitem",
    onKeyDown: handleKeyDown,
    onFocus: handleFocus,
    "aria-expanded": expandable ? expanded : null,
    "aria-selected": ariaSelected,
    ref: handleRef,
    tabIndex: tabbable ? 0 : -1
  }, other), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: classes.content,
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    ref: contentRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: classes.iconContainer
  }, icon), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__["default"], {
    component: "div",
    className: classes.label
  }, label)), children && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](TransitionComponent, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
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
      focusedNodeId = _React$useState2[0],
      setFocusedNodeId = _React$useState2[1];

  var nodeMap = react__WEBPACK_IMPORTED_MODULE_4__["useRef"]({});
  var firstCharMap = react__WEBPACK_IMPORTED_MODULE_4__["useRef"]({});
  var visibleNodes = react__WEBPACK_IMPORTED_MODULE_4__["useRef"]([]);

  var _useControlled = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_9__["useControlled"])({
    controlled: expandedProp,
    default: defaultExpanded,
    name: 'TreeView',
    state: 'expanded'
  }),
      _useControlled2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useControlled, 2),
      expanded = _useControlled2[0],
      setExpandedState = _useControlled2[1];

  var _useControlled3 = Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_9__["useControlled"])({
    controlled: selectedProp,
    default: defaultSelected,
    name: 'TreeView',
    state: 'selected'
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
    return focusedNodeId === id;
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
      setFocusedNodeId(id);
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
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : focusedNodeId;
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
      return true;
    }

    return false;
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
    return true;
  };

  var rangeSelectToFirst = function rangeSelectToFirst(event, id) {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }

    var start = lastSelectionWasRange.current ? lastSelectedNode.current : id;
    return selectRange(event, {
      start: start,
      end: getFirstNode()
    });
  };

  var rangeSelectToLast = function rangeSelectToLast(event, id) {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }

    var start = lastSelectionWasRange.current ? lastSelectedNode.current : id;
    return selectRange(event, {
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
    setFocusedNodeId(function (oldFocusedNodeId) {
      if (oldFocusedNodeId === id) {
        return null;
      }

      return oldFocusedNodeId;
    });
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
  }, [expanded, childrenCalculated, isExpanded, children]);

  var noopSelection = function noopSelection() {
    return false;
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__["createElement"](_TreeViewContext__WEBPACK_IMPORTED_MODULE_7__["default"].Provider, {
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
      selectNode: disableSelection ? noopSelection : selectNode,
      selectRange: disableSelection ? noopSelection : selectRange,
      selectNextNode: disableSelection ? noopSelection : selectNextNode,
      selectPreviousNode: disableSelection ? noopSelection : selectPreviousNode,
      rangeSelectToFirst: disableSelection ? noopSelection : rangeSelectToFirst,
      rangeSelectToLast: disableSelection ? noopSelection : rangeSelectToLast,
      selectAllNodes: disableSelection ? noopSelection : selectAllNodes,
      isTabbable: isTabbable,
      multiSelect: multiSelect,
      getParent: getParent,
      mapFirstChar: mapFirstChar,
      addNodeToNodeMap: addNodeToNodeMap,
      removeNodeFromNodeMap: removeNodeFromNodeMap
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("ul", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
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

/** @license Material-UI v4.0.0-alpha.49
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
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__["createSvgIcon"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
}), 'Add'));

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
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__["createSvgIcon"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
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
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__["createSvgIcon"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
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
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__["createSvgIcon"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
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
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__["createSvgIcon"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
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
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__["createSvgIcon"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
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
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__["createSvgIcon"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
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
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__["createSvgIcon"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
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
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__["createSvgIcon"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
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
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/utils */ "./node_modules/@material-ui/core/esm/utils/index.js");


/**
 * @ignore - internal component.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_1__["createSvgIcon"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
}), 'SuccessOutlined'));

/***/ }),

/***/ "./node_modules/invariant/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/invariant/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (true) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ "./node_modules/react-infinite-scroll-component/dist/index.es.js":
/*!***********************************************************************!*\
  !*** ./node_modules/react-infinite-scroll-component/dist/index.es.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   [noTrailing]   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   [debounceMode] If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
function throttle (delay, noTrailing, callback, debounceMode) {
  /*
   * After wrapper has stopped being called, this timeout ensures that
   * `callback` is executed at the proper times in `throttle` and `end`
   * debounce modes.
   */
  var timeoutID;
  var cancelled = false; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  } // Function to cancel next exec


  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  } // `noTrailing` defaults to falsy.


  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  /*
   * The `wrapper` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which `callback`
   * is executed.
   */


  function wrapper() {
    var self = this;
    var elapsed = Date.now() - lastExec;
    var args = arguments;

    if (cancelled) {
      return;
    } // Execute `callback` and update the `lastExec` timestamp.


    function exec() {
      lastExec = Date.now();
      callback.apply(self, args);
    }
    /*
     * If `debounceMode` is true (at begin) this is used to clear the flag
     * to allow future `callback` executions.
     */


    function clear() {
      timeoutID = undefined;
    }

    if (debounceMode && !timeoutID) {
      /*
       * Since `wrapper` is being called for the first time and
       * `debounceMode` is true (at begin), execute `callback`.
       */
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      /*
       * In throttle mode, if `delay` time has been exceeded, execute
       * `callback`.
       */
      exec();
    } else if (noTrailing !== true) {
      /*
       * In trailing throttle mode, since `delay` time has not been
       * exceeded, schedule `callback` to execute `delay` ms after most
       * recent execution.
       *
       * If `debounceMode` is true (at begin), schedule `clear` to execute
       * after `delay` ms.
       *
       * If `debounceMode` is false (at end), schedule `callback` to
       * execute after `delay` ms.
       */
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  }

  wrapper.cancel = cancel; // Return the wrapper function.

  return wrapper;
}

var ThresholdUnits = {
    Pixel: 'Pixel',
    Percent: 'Percent',
};
var defaultThreshold = {
    unit: ThresholdUnits.Percent,
    value: 0.8,
};
function parseThreshold(scrollThreshold) {
    if (typeof scrollThreshold === 'number') {
        return {
            unit: ThresholdUnits.Percent,
            value: scrollThreshold * 100,
        };
    }
    if (typeof scrollThreshold === 'string') {
        if (scrollThreshold.match(/^(\d*(\.\d+)?)px$/)) {
            return {
                unit: ThresholdUnits.Pixel,
                value: parseFloat(scrollThreshold),
            };
        }
        if (scrollThreshold.match(/^(\d*(\.\d+)?)%$/)) {
            return {
                unit: ThresholdUnits.Percent,
                value: parseFloat(scrollThreshold),
            };
        }
        console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...');
        return defaultThreshold;
    }
    console.warn('scrollThreshold should be string or number');
    return defaultThreshold;
}

var InfiniteScroll = /** @class */ (function (_super) {
    __extends(InfiniteScroll, _super);
    function InfiniteScroll(props) {
        var _this = _super.call(this, props) || this;
        _this.lastScrollTop = 0;
        _this.actionTriggered = false;
        // variables to keep track of pull down behaviour
        _this.startY = 0;
        _this.currentY = 0;
        _this.dragging = false;
        // will be populated in componentDidMount
        // based on the height of the pull down element
        _this.maxPullDownDistance = 0;
        _this.getScrollableTarget = function () {
            if (_this.props.scrollableTarget instanceof HTMLElement)
                return _this.props.scrollableTarget;
            if (typeof _this.props.scrollableTarget === 'string') {
                return document.getElementById(_this.props.scrollableTarget);
            }
            if (_this.props.scrollableTarget === null) {
                console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      ");
            }
            return null;
        };
        _this.onStart = function (evt) {
            if (_this.lastScrollTop)
                return;
            _this.dragging = true;
            if (evt instanceof MouseEvent) {
                _this.startY = evt.pageY;
            }
            else if (evt instanceof TouchEvent) {
                _this.startY = evt.touches[0].pageY;
            }
            _this.currentY = _this.startY;
            if (_this._infScroll) {
                _this._infScroll.style.willChange = 'transform';
                _this._infScroll.style.transition = "transform 0.2s cubic-bezier(0,0,0.31,1)";
            }
        };
        _this.onMove = function (evt) {
            if (!_this.dragging)
                return;
            if (evt instanceof MouseEvent) {
                _this.currentY = evt.pageY;
            }
            else if (evt instanceof TouchEvent) {
                _this.currentY = evt.touches[0].pageY;
            }
            // user is scrolling down to up
            if (_this.currentY < _this.startY)
                return;
            if (_this.currentY - _this.startY >=
                Number(_this.props.pullDownToRefreshThreshold)) {
                _this.setState({
                    pullToRefreshThresholdBreached: true,
                });
            }
            // so you can drag upto 1.5 times of the maxPullDownDistance
            if (_this.currentY - _this.startY > _this.maxPullDownDistance * 1.5)
                return;
            if (_this._infScroll) {
                _this._infScroll.style.overflow = 'visible';
                _this._infScroll.style.transform = "translate3d(0px, " + (_this.currentY -
                    _this.startY) + "px, 0px)";
            }
        };
        _this.onEnd = function () {
            _this.startY = 0;
            _this.currentY = 0;
            _this.dragging = false;
            if (_this.state.pullToRefreshThresholdBreached) {
                _this.props.refreshFunction && _this.props.refreshFunction();
            }
            requestAnimationFrame(function () {
                // this._infScroll
                if (_this._infScroll) {
                    _this._infScroll.style.overflow = 'auto';
                    _this._infScroll.style.transform = 'none';
                    _this._infScroll.style.willChange = 'none';
                }
            });
        };
        _this.onScrollListener = function (event) {
            if (typeof _this.props.onScroll === 'function') {
                // Execute this callback in next tick so that it does not affect the
                // functionality of the library.
                setTimeout(function () { return _this.props.onScroll && _this.props.onScroll(event); }, 0);
            }
            var target = _this.props.height || _this._scrollableNode
                ? event.target
                : document.documentElement.scrollTop
                    ? document.documentElement
                    : document.body;
            // return immediately if the action has already been triggered,
            // prevents multiple triggers.
            if (_this.actionTriggered)
                return;
            var atBottom = _this.isElementAtBottom(target, _this.props.scrollThreshold);
            // call the `next` function in the props to trigger the next data fetch
            if (atBottom && _this.props.hasMore) {
                _this.actionTriggered = true;
                _this.setState({ showLoader: true });
                _this.props.next && _this.props.next();
            }
            _this.lastScrollTop = target.scrollTop;
        };
        _this.state = {
            showLoader: false,
            pullToRefreshThresholdBreached: false,
        };
        _this.throttledOnScrollListener = throttle(150, _this.onScrollListener).bind(_this);
        _this.onStart = _this.onStart.bind(_this);
        _this.onMove = _this.onMove.bind(_this);
        _this.onEnd = _this.onEnd.bind(_this);
        return _this;
    }
    InfiniteScroll.prototype.componentDidMount = function () {
        if (typeof this.props.dataLength === 'undefined') {
            throw new Error("mandatory prop \"dataLength\" is missing. The prop is needed" +
                " when loading more content. Check README.md for usage");
        }
        this._scrollableNode = this.getScrollableTarget();
        this.el = this.props.height
            ? this._infScroll
            : this._scrollableNode || window;
        if (this.el) {
            this.el.addEventListener('scroll', this
                .throttledOnScrollListener);
        }
        if (typeof this.props.initialScrollY === 'number' &&
            this.el &&
            this.el instanceof HTMLElement &&
            this.el.scrollHeight > this.props.initialScrollY) {
            this.el.scrollTo(0, this.props.initialScrollY);
        }
        if (this.props.pullDownToRefresh && this.el) {
            this.el.addEventListener('touchstart', this.onStart);
            this.el.addEventListener('touchmove', this.onMove);
            this.el.addEventListener('touchend', this.onEnd);
            this.el.addEventListener('mousedown', this.onStart);
            this.el.addEventListener('mousemove', this.onMove);
            this.el.addEventListener('mouseup', this.onEnd);
            // get BCR of pullDown element to position it above
            this.maxPullDownDistance =
                (this._pullDown &&
                    this._pullDown.firstChild &&
                    this._pullDown.firstChild.getBoundingClientRect()
                        .height) ||
                    0;
            this.forceUpdate();
            if (typeof this.props.refreshFunction !== 'function') {
                throw new Error("Mandatory prop \"refreshFunction\" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage'");
            }
        }
    };
    InfiniteScroll.prototype.componentWillUnmount = function () {
        if (this.el) {
            this.el.removeEventListener('scroll', this
                .throttledOnScrollListener);
            if (this.props.pullDownToRefresh) {
                this.el.removeEventListener('touchstart', this.onStart);
                this.el.removeEventListener('touchmove', this.onMove);
                this.el.removeEventListener('touchend', this.onEnd);
                this.el.removeEventListener('mousedown', this.onStart);
                this.el.removeEventListener('mousemove', this.onMove);
                this.el.removeEventListener('mouseup', this.onEnd);
            }
        }
    };
    InfiniteScroll.prototype.UNSAFE_componentWillReceiveProps = function (props) {
        // do nothing when dataLength and key are unchanged
        if (this.props.key === props.key &&
            this.props.dataLength === props.dataLength)
            return;
        this.actionTriggered = false;
        // update state when new data was sent in
        this.setState({
            showLoader: false,
            pullToRefreshThresholdBreached: false,
        });
    };
    InfiniteScroll.prototype.isElementAtBottom = function (target, scrollThreshold) {
        if (scrollThreshold === void 0) { scrollThreshold = 0.8; }
        var clientHeight = target === document.body || target === document.documentElement
            ? window.screen.availHeight
            : target.clientHeight;
        var threshold = parseThreshold(scrollThreshold);
        if (threshold.unit === ThresholdUnits.Pixel) {
            return (target.scrollTop + clientHeight >= target.scrollHeight - threshold.value);
        }
        return (target.scrollTop + clientHeight >=
            (threshold.value / 100) * target.scrollHeight);
    };
    InfiniteScroll.prototype.render = function () {
        var _this = this;
        var style = __assign({ height: this.props.height || 'auto', overflow: 'auto', WebkitOverflowScrolling: 'touch' }, this.props.style);
        var hasChildren = this.props.hasChildren ||
            !!(this.props.children &&
                this.props.children instanceof Array &&
                this.props.children.length);
        // because heighted infiniteScroll visualy breaks
        // on drag down as overflow becomes visible
        var outerDivStyle = this.props.pullDownToRefresh && this.props.height
            ? { overflow: 'auto' }
            : {};
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { style: outerDivStyle, className: "infinite-scroll-component__outerdiv" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "infinite-scroll-component " + (this.props.className || ''), ref: function (infScroll) { return (_this._infScroll = infScroll); }, style: style },
                this.props.pullDownToRefresh && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { style: { position: 'relative' }, ref: function (pullDown) { return (_this._pullDown = pullDown); } },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { style: {
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: -1 * this.maxPullDownDistance,
                        } }, this.state.pullToRefreshThresholdBreached
                        ? this.props.releaseToRefreshContent
                        : this.props.pullDownToRefreshContent))),
                this.props.children,
                !this.state.showLoader &&
                    !hasChildren &&
                    this.props.hasMore &&
                    this.props.loader,
                this.state.showLoader && this.props.hasMore && this.props.loader,
                !this.props.hasMore && this.props.endMessage)));
    };
    return InfiniteScroll;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

/* harmony default export */ __webpack_exports__["default"] = (InfiniteScroll);
//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/react-intersection-observer/dist/react-intersection-observer.esm.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/react-intersection-observer/dist/react-intersection-observer.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default, InView, useInView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InView", function() { return InView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useInView", function() { return useInView; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_6__);








var INSTANCE_MAP = new Map();
var OBSERVER_MAP = new Map();
/**
 * Monitor element, and trigger callback when element becomes visible
 * @param element {HTMLElement}
 * @param callback {Function} Called with inView
 * @param options {Object} InterSection observer options
 * @param options.threshold {Number} Number between 0 and 1, indicating how much of the element should be visible before triggering
 * @param options.root {HTMLElement} It should have a unique id or data-intersection-id in order for the Observer to reused.
 * @param options.rootMargin {String} The CSS margin to apply to the root element.
 * @param rootId {String} Unique identifier for the root element, to enable reusing the IntersectionObserver
 */

function observe(element, callback, options, rootId) {
  if (options === void 0) {
    options = {};
  }

  // Validate that the element is not being used in another <Observer />
  invariant__WEBPACK_IMPORTED_MODULE_6___default()(!INSTANCE_MAP.has(element), "react-intersection-observer: Trying to observe %s, but it's already being observed by another instance.\nMake sure the `ref` is only used by a single <Observer /> instance.\n\n%s", element); // IntersectionObserver needs a threshold to trigger, so set it to 0 if it's not defined.
  // Modify the options object, since it's used in the onChange handler.

  if (!options.threshold) options.threshold = 0;
  var _options = options,
      root = _options.root,
      rootMargin = _options.rootMargin,
      threshold = _options.threshold;
  if (!element || !callback) return;
  var observerId = rootMargin ? threshold.toString() + "_" + rootMargin : threshold.toString();

  if (root) {
    observerId = rootId ? rootId + "_" + observerId : null;
  }

  var observerInstance = observerId ? OBSERVER_MAP.get(observerId) : null;

  if (!observerInstance) {
    observerInstance = new IntersectionObserver(onChange, options);
    if (observerId) OBSERVER_MAP.set(observerId, observerInstance);
  }

  var instance = {
    callback: callback,
    visible: false,
    options: options,
    observerId: observerId,
    observer: !observerId ? observerInstance : undefined
  };
  INSTANCE_MAP.set(element, instance);
  observerInstance.observe(element);
  return instance;
}
/**
 * Stop observing an element. If an element is removed from the DOM or otherwise destroyed,
 * make sure to call this method.
 * @param element {HTMLElement}
 */

function unobserve(element) {
  if (!element) return;
  var instance = INSTANCE_MAP.get(element);

  if (instance) {
    var observerId = instance.observerId,
        observer = instance.observer;
    var observerInstance = observerId ? OBSERVER_MAP.get(observerId) : observer;

    if (observerInstance) {
      observerInstance.unobserve(element);
    } // Check if we are still observing any elements with the same threshold.


    var itemsLeft = false;

    if (observerId) {
      INSTANCE_MAP.forEach(function (item, key) {
        if (item && item.observerId === observerId && key !== element) {
          itemsLeft = true;
        }
      });
    }

    if (observerInstance && !itemsLeft) {
      // No more elements to observe for threshold, disconnect observer
      observerInstance.disconnect();
      OBSERVER_MAP.delete(observerId);
    } // Remove reference to element


    INSTANCE_MAP.delete(element);
  }
}

function onChange(changes) {
  changes.forEach(function (intersection) {
    var isIntersecting = intersection.isIntersecting,
        intersectionRatio = intersection.intersectionRatio,
        target = intersection.target;
    var instance = INSTANCE_MAP.get(target); // Firefox can report a negative intersectionRatio when scrolling.

    if (instance && intersectionRatio >= 0) {
      var options = instance.options;
      var _inView = false;

      if (Array.isArray(options.threshold)) {
        // If threshold is an array, check if any of them intersects. This just triggers the onChange event multiple times.
        _inView = options.threshold.some(function (threshold) {
          return instance.visible ? intersectionRatio > threshold : intersectionRatio >= threshold;
        });
      } else if (options.threshold !== undefined) {
        // Trigger on 0 ratio only when not visible. This is fallback for browsers without isIntersecting support
        _inView = instance.visible ? intersectionRatio > options.threshold : intersectionRatio >= options.threshold;
      }

      if (isIntersecting !== undefined) {
        // If isIntersecting is defined, ensure that the element is actually intersecting.
        // Otherwise it reports a threshold of 0
        _inView = _inView && isIntersecting;
      }

      instance.visible = _inView;
      instance.callback(_inView, intersectionRatio);
    }
  });
}

function useInView(ref, options) {
  if (options === void 0) {
    options = {};
  }

  // $FlowFixMe - useState is not exposed in React Flow lib yet
  var _React$useState = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      isInView = _React$useState[0],
      setInView = _React$useState[1]; // $FlowFixMe - useEffect is not exposed in React Flow lib yet


  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    if (ref.current) {
      observe(ref.current, function (inView) {
        setInView(inView);

        if (inView && options.triggerOnce) {
          // If it should only trigger once, unobserve the element after it's inView
          unobserve(ref.current);
        }
      }, {
        threshold: options.threshold,
        root: options.root,
        rootMargin: options.rootMargin
      }, options.rootId);
    }

    return function () {
      unobserve(ref.current);
    };
  }, [options.threshold, options.root, options.rootMargin, options.rootId]);
  return isInView;
}

/**
 * Monitors scroll, and triggers the children function with updated props
 *
 <InView>
 {({inView, ref}) => (
   <h1 ref={ref}>{`${inView}`}</h1>
 )}
 </InView>
 */
var InView =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(InView, _React$Component);

  function InView() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this)), "state", {
      inView: false,
      intersectionRatio: 0
    });

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this)), "node", null);

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this)), "handleNode", function (node) {
      if (_this.node) unobserve(_this.node);
      _this.node = node;

      _this.observeNode();
    });

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this)), "handleChange", function (inView, intersectionRatio) {
      _this.setState({
        inView: inView,
        intersectionRatio: intersectionRatio
      });

      if (_this.props.onChange) {
        _this.props.onChange(inView, intersectionRatio);
      }
    });

    return _this;
  }

  var _proto = InView.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (true) {
      if (this.props.hasOwnProperty('render')) {
        console.warn("react-intersection-observer: \"render\" is deprecated, and should be replaced with \"children\"", this.node);
      }

      invariant__WEBPACK_IMPORTED_MODULE_6___default()(this.node, "react-intersection-observer: No DOM node found. Make sure you forward \"ref\" to the root DOM element you want to observe.");
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // If a IntersectionObserver option changed, reinit the observer
    if (prevProps.rootMargin !== this.props.rootMargin || prevProps.root !== this.props.root || prevProps.threshold !== this.props.threshold) {
      unobserve(this.node);
      this.observeNode();
    }

    if (prevState.inView !== this.state.inView) {
      if (this.state.inView && this.props.triggerOnce) {
        unobserve(this.node);
        this.node = null;
      }
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.node) {
      unobserve(this.node);
      this.node = null;
    }
  };

  _proto.observeNode = function observeNode() {
    if (!this.node) return;
    var _this$props = this.props,
        threshold = _this$props.threshold,
        root = _this$props.root,
        rootMargin = _this$props.rootMargin,
        rootId = _this$props.rootId;
    observe(this.node, this.handleChange, {
      threshold: threshold,
      root: root,
      rootMargin: rootMargin
    }, rootId);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        render = _this$props2.render,
        tag = _this$props2.tag,
        triggerOnce = _this$props2.triggerOnce,
        threshold = _this$props2.threshold,
        root = _this$props2.root,
        rootId = _this$props2.rootId,
        rootMargin = _this$props2.rootMargin,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props2, ["children", "render", "tag", "triggerOnce", "threshold", "root", "rootId", "rootMargin"]);

    var _this$state = this.state,
        inView = _this$state.inView,
        intersectionRatio = _this$state.intersectionRatio;
    var renderMethod = children || render;

    if (typeof renderMethod === 'function') {
      return renderMethod({
        inView: inView,
        intersectionRatio: intersectionRatio,
        ref: this.handleNode
      });
    }

    return Object(react__WEBPACK_IMPORTED_MODULE_5__["createElement"])(tag || 'div', Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      ref: this.handleNode
    }, props), children);
  };

  return InView;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__["default"])(InView, "defaultProps", {
  threshold: 0,
  triggerOnce: false
});

/* harmony default export */ __webpack_exports__["default"] = (InView);



/***/ }),

/***/ "./node_modules/react-lazy-images/dist/react-lazy-images.es.js":
/*!*********************************************************************!*\
  !*** ./node_modules/react-lazy-images/dist/react-lazy-images.es.js ***!
  \*********************************************************************/
/*! exports provided: LazyImage, ImageState, LazyImageFull */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyImage", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageState", function() { return a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyImageFull", function() { return p; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_intersection_observer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-intersection-observer */ "./node_modules/react-intersection-observer/dist/react-intersection-observer.esm.js");
/* harmony import */ var unionize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! unionize */ "./node_modules/unionize/lib/index.js");
/* harmony import */ var unionize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(unionize__WEBPACK_IMPORTED_MODULE_2__);
var o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};var a,i=function(){return(i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function c(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&(n[r[o]]=e[r[o]])}return n}!function(e){e.NotAsked="NotAsked",e.Loading="Loading",e.LoadSuccess="LoadSuccess",e.LoadError="LoadError"}(a||(a={}));var u=Object(unionize__WEBPACK_IMPORTED_MODULE_2__["unionize"])({NotAsked:{},Buffering:{},Loading:{},LoadSuccess:{},LoadError:Object(unionize__WEBPACK_IMPORTED_MODULE_2__["ofType"])()}),s=Object(unionize__WEBPACK_IMPORTED_MODULE_2__["unionize"])({ViewChanged:Object(unionize__WEBPACK_IMPORTED_MODULE_2__["ofType"])(),BufferingEnded:{},LoadSuccess:{},LoadError:Object(unionize__WEBPACK_IMPORTED_MODULE_2__["ofType"])()}),d=function(e,t){return function(n){var r=g(l(e,t));r.promise.then(function(e){return n.update(s.LoadSuccess({}))}).catch(function(e){e.isCanceled||n.update(s.LoadError({msg:"Failed to load"}))}),n.promiseCache.loading=r}},f=function(e){e.promiseCache.buffering.cancel()},p=function(n){function r(e){var t=n.call(this,e)||this;return t.promiseCache={},t.initialState=u.NotAsked(),t.state=t.initialState,t.update=t.update.bind(t),t}return function(e,t){function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}(r,n),r.reducer=function(e,t,n){return s.match(e,{ViewChanged:function(e){return!0===e.inView?n.src?u.match(t,{NotAsked:function(){return n.debounceDurationMs?{nextState:u.Buffering(),cmd:(e=n.debounceDurationMs,function(t){var n=g(m(e));n.promise.then(function(){return t.update(s.BufferingEnded())}).catch(function(e){}),t.promiseCache.buffering=n})}:{nextState:u.Loading(),cmd:d(n,n.experimentalDecode)};var e},default:function(){return{nextState:t}}}):{nextState:u.LoadSuccess()}:u.match(t,{Buffering:function(){return{nextState:u.NotAsked(),cmd:f}},default:function(){return{nextState:t}}})},BufferingEnded:function(){return{nextState:u.Loading(),cmd:d(n,n.experimentalDecode)}},LoadSuccess:function(){return{nextState:u.LoadSuccess()}},LoadError:function(e){return{nextState:u.LoadError(e)}}})},r.prototype.update=function(e){var t=this,n=r.reducer(e,this.state,this.props),o=n.nextState,a=n.cmd;this.props.debugActions&&( false&&false,console.log({action:e,prevState:this.state,nextState:o})),this.setState(o,function(){return a&&a(t)})},r.prototype.componentWillUnmount=function(){this.promiseCache.loading&&this.promiseCache.loading.cancel(),this.promiseCache.buffering&&this.promiseCache.buffering.cancel(),this.promiseCache={}},r.prototype.render=function(){var n=this,r=this.props,o=r.children,d=r.loadEagerly,f=r.observerProps,p=c(r,["children","loadEagerly","observerProps","experimentalDecode","debounceDurationMs","debugActions"]);return d?o({imageState:u.LoadSuccess().tag,imageProps:p}):react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intersection_observer__WEBPACK_IMPORTED_MODULE_1__["default"],i({rootMargin:"50px 0px",threshold:.01},f,{onChange:function(e){return n.update(s.ViewChanged({inView:e}))}}),function(e){return o({imageState:"Buffering"===n.state.tag?a.Loading:n.state.tag,imageProps:p,ref:e.ref})})},r.displayName="LazyImageFull",r}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component),l=function(e,t){var n=e.src,r=e.srcSet,o=e.alt,a=e.sizes;return void 0===t&&(t=!1),new Promise(function(e,i){var c=new Image;if(r&&(c.srcset=r),o&&(c.alt=o),a&&(c.sizes=a),c.src=n,t&&"decode"in c)return c.decode().then(function(t){return e(t)}).catch(function(e){return i(e)});c.onload=e,c.onerror=i})},m=function(e){return new Promise(function(t){return setTimeout(t,e)})},g=function(e){var t=!1;return{promise:new Promise(function(n,r){e.then(function(e){return t?r({isCanceled:!0}):n(e)}),e.catch(function(e){return r(t?{isCanceled:!0}:e)})}),cancel:function(){t=!0}}},h=function(t){var n=t.actual,r=t.placeholder,o=t.loading,u=t.error,s=c(t,["actual","placeholder","loading","error"]);return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(p,i({},s),function(e){var t=e.imageProps,i=e.ref;switch(e.imageState){case a.NotAsked:return!!r&&r({imageProps:t,ref:i});case a.Loading:return o?o():!!r&&r({imageProps:t,ref:i});case a.LoadSuccess:return n({imageProps:t});case a.LoadError:return u?u():n({imageProps:t})}})};h.displayName="LazyImage";
//# sourceMappingURL=react-lazy-images.es.js.map


/***/ }),

/***/ "./node_modules/unionize/lib/index.js":
/*!********************************************!*\
  !*** ./node_modules/unionize/lib/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function unionize(record, config) {
    var _a = config || {}, _b = _a.value, valProp = _b === void 0 ? undefined : _b, _c = _a.tag, tagProp = _c === void 0 ? 'tag' : _c;
    var creators = {};
    var _loop_1 = function (tag) {
        creators[tag] = (function (value) {
            var _a, _b;
            if (value === void 0) { value = {}; }
            return valProp ? (_a = {}, _a[tagProp] = tag, _a[valProp] = value, _a) : __assign({}, value, (_b = {}, _b[tagProp] = tag, _b));
        });
    };
    for (var tag in record) {
        _loop_1(tag);
    }
    var is = {};
    var _loop_2 = function (tag) {
        is[tag] = (function (variant) { return variant[tagProp] === tag; });
    };
    for (var tag in record) {
        _loop_2(tag);
    }
    function evalMatch(variant, cases, defaultCase) {
        if (defaultCase === void 0) { defaultCase = cases.default; }
        var handler = cases[variant[tagProp]];
        return handler ? handler(valProp ? variant[valProp] : variant) : defaultCase(variant);
    }
    var match = function (first, second) {
        return second ? evalMatch(first, second) : function (variant) { return evalMatch(variant, first); };
    };
    var identity = function (x) { return x; };
    var transform = function (first, second) {
        return second
            ? evalMatch(first, second, identity)
            : function (variant) { return evalMatch(variant, first, identity); };
    };
    var as = {};
    var _loop_3 = function (expectedTag) {
        var _a;
        as[expectedTag] = match((_a = {},
            _a[expectedTag] = function (x) { return x; },
            _a.default = function (val) {
                throw new Error("Attempted to cast " + val[tagProp] + " as " + expectedTag);
            },
            _a));
    };
    for (var expectedTag in record) {
        _loop_3(expectedTag);
    }
    return Object.assign({
        is: is,
        as: as,
        match: match,
        transform: transform,
        _Record: record,
    }, creators);
}
exports.unionize = unionize;
/**
 * Creates a pseudo-witness of a given type. That is, it pretends to return a value of
 * type `T` for any `T`, but it's really just returning `undefined`. This white lie
 * allows convenient expression of the value types in the record you pass to `unionize`.
 */
exports.ofType = function () { return undefined; };
exports.default = unionize;
//# sourceMappingURL=index.js.map

/***/ })

}]);