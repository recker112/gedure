"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[3175],{33888:function(e,t,o){o.d(t,{Z:function(){return B}});var a=o(93433),n=o(29439),r=o(4942),i=o(87462),l=o(63366),c=o(72791),s=(o(57441),o(28182)),d=o(94419),u=o(60277),p=o(85513),v=o(4565),m=o(12065),h=o(40233),f=o(80184),b=(0,h.Z)((0,f.jsx)("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),x=o(92842),g=(0,u.ZP)(x.Z)((function(e){var t=e.theme;return(0,i.Z)({display:"flex",marginLeft:"calc(".concat(t.spacing(1)," * 0.5)"),marginRight:"calc(".concat(t.spacing(1)," * 0.5)")},"light"===t.palette.mode?{backgroundColor:t.palette.grey[100],color:t.palette.grey[700]}:{backgroundColor:t.palette.grey[700],color:t.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":(0,i.Z)({},"light"===t.palette.mode?{backgroundColor:t.palette.grey[200]}:{backgroundColor:t.palette.grey[600]}),"&:active":(0,i.Z)({boxShadow:t.shadows[0]},"light"===t.palette.mode?{backgroundColor:(0,m._4)(t.palette.grey[200],.12)}:{backgroundColor:(0,m._4)(t.palette.grey[600],.12)})})})),S=(0,u.ZP)(b)({width:24,height:16});var Z=function(e){var t=e;return(0,f.jsx)("li",{children:(0,f.jsx)(g,(0,i.Z)({focusRipple:!0},e,{ownerState:t,children:(0,f.jsx)(S,{ownerState:t})}))})},y=o(75878),w=o(21217);function z(e){return(0,w.Z)("MuiBreadcrumbs",e)}var C=(0,y.Z)("MuiBreadcrumbs",["root","ol","li","separator"]),k=["children","className","component","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],T=(0,u.ZP)(v.Z,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:function(e,t){return[(0,r.Z)({},"& .".concat(C.li),t.li),t.root]}})({}),R=(0,u.ZP)("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:function(e,t){return t.ol}})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),I=(0,u.ZP)("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:function(e,t){return t.separator}})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function M(e,t,o,a){return e.reduce((function(n,r,i){return i<e.length-1?n=n.concat(r,(0,f.jsx)(I,{"aria-hidden":!0,className:t,ownerState:a,children:o},"separator-".concat(i))):n.push(r),n}),[])}var B=c.forwardRef((function(e,t){var o=(0,p.Z)({props:e,name:"MuiBreadcrumbs"}),r=o.children,u=o.className,v=o.component,m=void 0===v?"nav":v,h=o.expandText,b=void 0===h?"Show path":h,x=o.itemsAfterCollapse,g=void 0===x?1:x,S=o.itemsBeforeCollapse,y=void 0===S?1:S,w=o.maxItems,C=void 0===w?8:w,I=o.separator,B=void 0===I?"/":I,L=(0,l.Z)(o,k),P=c.useState(!1),N=(0,n.Z)(P,2),E=N[0],W=N[1],j=(0,i.Z)({},o,{component:m,expanded:E,expandText:b,itemsAfterCollapse:g,itemsBeforeCollapse:y,maxItems:C,separator:B}),V=function(e){var t=e.classes;return(0,d.Z)({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},z,t)}(j),D=c.useRef(null),F=c.Children.toArray(r).filter((function(e){return c.isValidElement(e)})).map((function(e,t){return(0,f.jsx)("li",{className:V.li,children:e},"child-".concat(t))}));return(0,f.jsx)(T,(0,i.Z)({ref:t,component:m,color:"text.secondary",className:(0,s.Z)(V.root,u),ownerState:j},L,{children:(0,f.jsx)(R,{className:V.ol,ref:D,ownerState:j,children:M(E||C&&F.length<=C?F:function(e){return y+g>=e.length?e:[].concat((0,a.Z)(e.slice(0,y)),[(0,f.jsx)(Z,{"aria-label":b,onClick:function(){W(!0);var e=D.current.querySelector("a[href],button,[tabindex]");e&&e.focus()}},"ellipsis")],(0,a.Z)(e.slice(e.length-g,e.length)))}(F),V.separator,B,j)})}))}))},61091:function(e,t,o){o.d(t,{Z:function(){return k}});var a=o(4942),n=o(63366),r=o(87462),i=o(72791),l=o(28182),c=o(35735),s=o(94419),d=o(12065),u=o(60277),p=o(85513),v=o(92842),m=o(49853),h=o(75878),f=o(21217);function b(e){return(0,f.Z)("MuiButton",e)}var x=(0,h.Z)("MuiButton",["root","text","textInherit","textPrimary","textSecondary","textSuccess","textError","textInfo","textWarning","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","outlinedSuccess","outlinedError","outlinedInfo","outlinedWarning","contained","containedInherit","containedPrimary","containedSecondary","containedSuccess","containedError","containedInfo","containedWarning","disableElevation","focusVisible","disabled","colorInherit","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","iconSizeSmall","iconSizeMedium","iconSizeLarge"]),g=o(71656),S=o(80184),Z=["children","color","component","className","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"],y=function(e){return(0,r.Z)({},"small"===e.size&&{"& > *:nth-of-type(1)":{fontSize:18}},"medium"===e.size&&{"& > *:nth-of-type(1)":{fontSize:20}},"large"===e.size&&{"& > *:nth-of-type(1)":{fontSize:22}})},w=(0,u.ZP)(v.Z,{shouldForwardProp:function(e){return(0,u.FO)(e)||"classes"===e},name:"MuiButton",slot:"Root",overridesResolver:function(e,t){var o=e.ownerState;return[t.root,t[o.variant],t["".concat(o.variant).concat((0,m.Z)(o.color))],t["size".concat((0,m.Z)(o.size))],t["".concat(o.variant,"Size").concat((0,m.Z)(o.size))],"inherit"===o.color&&t.colorInherit,o.disableElevation&&t.disableElevation,o.fullWidth&&t.fullWidth]}})((function(e){var t,o,n,i=e.theme,l=e.ownerState;return(0,r.Z)({},i.typography.button,(t={minWidth:64,padding:"6px 16px",borderRadius:(i.vars||i).shape.borderRadius,transition:i.transitions.create(["background-color","box-shadow","border-color","color"],{duration:i.transitions.duration.short}),"&:hover":(0,r.Z)({textDecoration:"none",backgroundColor:i.vars?"rgba(".concat(i.vars.palette.text.primaryChannel," / ").concat(i.vars.palette.action.hoverOpacity,")"):(0,d.Fq)(i.palette.text.primary,i.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"text"===l.variant&&"inherit"!==l.color&&{backgroundColor:i.vars?"rgba(".concat(i.vars.palette[l.color].mainChannel," / ").concat(i.vars.palette.action.hoverOpacity,")"):(0,d.Fq)(i.palette[l.color].main,i.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"outlined"===l.variant&&"inherit"!==l.color&&{border:"1px solid ".concat((i.vars||i).palette[l.color].main),backgroundColor:i.vars?"rgba(".concat(i.vars.palette[l.color].mainChannel," / ").concat(i.vars.palette.action.hoverOpacity,")"):(0,d.Fq)(i.palette[l.color].main,i.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"contained"===l.variant&&{backgroundColor:(i.vars||i).palette.grey.A100,boxShadow:(i.vars||i).shadows[4],"@media (hover: none)":{boxShadow:(i.vars||i).shadows[2],backgroundColor:(i.vars||i).palette.grey[300]}},"contained"===l.variant&&"inherit"!==l.color&&{backgroundColor:(i.vars||i).palette[l.color].dark,"@media (hover: none)":{backgroundColor:(i.vars||i).palette[l.color].main}}),"&:active":(0,r.Z)({},"contained"===l.variant&&{boxShadow:(i.vars||i).shadows[8]})},(0,a.Z)(t,"&.".concat(x.focusVisible),(0,r.Z)({},"contained"===l.variant&&{boxShadow:(i.vars||i).shadows[6]})),(0,a.Z)(t,"&.".concat(x.disabled),(0,r.Z)({color:(i.vars||i).palette.action.disabled},"outlined"===l.variant&&{border:"1px solid ".concat((i.vars||i).palette.action.disabledBackground)},"outlined"===l.variant&&"secondary"===l.color&&{border:"1px solid ".concat((i.vars||i).palette.action.disabled)},"contained"===l.variant&&{color:(i.vars||i).palette.action.disabled,boxShadow:(i.vars||i).shadows[0],backgroundColor:(i.vars||i).palette.action.disabledBackground})),t),"text"===l.variant&&{padding:"6px 8px"},"text"===l.variant&&"inherit"!==l.color&&{color:(i.vars||i).palette[l.color].main},"outlined"===l.variant&&{padding:"5px 15px",border:"1px solid currentColor"},"outlined"===l.variant&&"inherit"!==l.color&&{color:(i.vars||i).palette[l.color].main,border:i.vars?"1px solid rgba(".concat(i.vars.palette[l.color].mainChannel," / 0.5)"):"1px solid ".concat((0,d.Fq)(i.palette[l.color].main,.5))},"contained"===l.variant&&{color:i.vars?i.vars.palette.text.primary:null==(o=(n=i.palette).getContrastText)?void 0:o.call(n,i.palette.grey[300]),backgroundColor:(i.vars||i).palette.grey[300],boxShadow:(i.vars||i).shadows[2]},"contained"===l.variant&&"inherit"!==l.color&&{color:(i.vars||i).palette[l.color].contrastText,backgroundColor:(i.vars||i).palette[l.color].main},"inherit"===l.color&&{color:"inherit",borderColor:"currentColor"},"small"===l.size&&"text"===l.variant&&{padding:"4px 5px",fontSize:i.typography.pxToRem(13)},"large"===l.size&&"text"===l.variant&&{padding:"8px 11px",fontSize:i.typography.pxToRem(15)},"small"===l.size&&"outlined"===l.variant&&{padding:"3px 9px",fontSize:i.typography.pxToRem(13)},"large"===l.size&&"outlined"===l.variant&&{padding:"7px 21px",fontSize:i.typography.pxToRem(15)},"small"===l.size&&"contained"===l.variant&&{padding:"4px 10px",fontSize:i.typography.pxToRem(13)},"large"===l.size&&"contained"===l.variant&&{padding:"8px 22px",fontSize:i.typography.pxToRem(15)},l.fullWidth&&{width:"100%"})}),(function(e){var t;return e.ownerState.disableElevation&&(t={boxShadow:"none","&:hover":{boxShadow:"none"}},(0,a.Z)(t,"&.".concat(x.focusVisible),{boxShadow:"none"}),(0,a.Z)(t,"&:active",{boxShadow:"none"}),(0,a.Z)(t,"&.".concat(x.disabled),{boxShadow:"none"}),t)})),z=(0,u.ZP)("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:function(e,t){var o=e.ownerState;return[t.startIcon,t["iconSize".concat((0,m.Z)(o.size))]]}})((function(e){var t=e.ownerState;return(0,r.Z)({display:"inherit",marginRight:8,marginLeft:-4},"small"===t.size&&{marginLeft:-2},y(t))})),C=(0,u.ZP)("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:function(e,t){var o=e.ownerState;return[t.endIcon,t["iconSize".concat((0,m.Z)(o.size))]]}})((function(e){var t=e.ownerState;return(0,r.Z)({display:"inherit",marginRight:-4,marginLeft:8},"small"===t.size&&{marginRight:-2},y(t))})),k=i.forwardRef((function(e,t){var o=i.useContext(g.Z),a=(0,c.Z)(o,e),d=(0,p.Z)({props:a,name:"MuiButton"}),u=d.children,v=d.color,h=void 0===v?"primary":v,f=d.component,x=void 0===f?"button":f,y=d.className,k=d.disabled,T=void 0!==k&&k,R=d.disableElevation,I=void 0!==R&&R,M=d.disableFocusRipple,B=void 0!==M&&M,L=d.endIcon,P=d.focusVisibleClassName,N=d.fullWidth,E=void 0!==N&&N,W=d.size,j=void 0===W?"medium":W,V=d.startIcon,D=d.type,F=d.variant,O=void 0===F?"text":F,A=(0,n.Z)(d,Z),_=(0,r.Z)({},d,{color:h,component:x,disabled:T,disableElevation:I,disableFocusRipple:B,fullWidth:E,size:j,type:D,variant:O}),q=function(e){var t=e.color,o=e.disableElevation,a=e.fullWidth,n=e.size,i=e.variant,l=e.classes,c={root:["root",i,"".concat(i).concat((0,m.Z)(t)),"size".concat((0,m.Z)(n)),"".concat(i,"Size").concat((0,m.Z)(n)),"inherit"===t&&"colorInherit",o&&"disableElevation",a&&"fullWidth"],label:["label"],startIcon:["startIcon","iconSize".concat((0,m.Z)(n))],endIcon:["endIcon","iconSize".concat((0,m.Z)(n))]},d=(0,s.Z)(c,b,l);return(0,r.Z)({},l,d)}(_),H=V&&(0,S.jsx)(z,{className:q.startIcon,ownerState:_,children:V}),K=L&&(0,S.jsx)(C,{className:q.endIcon,ownerState:_,children:L});return(0,S.jsxs)(w,(0,r.Z)({ownerState:_,className:(0,l.Z)(o.className,q.root,y),component:x,disabled:T,focusRipple:!B,focusVisibleClassName:(0,l.Z)(q.focusVisible,P),ref:t,type:D},A,{classes:q,children:[H,u,K]}))}))},71656:function(e,t,o){var a=o(72791).createContext({});t.Z=a},36571:function(e,t,o){o.d(t,{_:function(){return u},y:function(){return d}});var a,n=o(87462),r=o(72791),i=o(85513),l={previousMonth:"Previous month",nextMonth:"Next month",openPreviousView:"open previous view",openNextView:"open next view",calendarViewSwitchingButtonAriaLabel:function(e){return"year"===e?"year view is open, switch to calendar view":"calendar view is open, switch to year view"},inputModeToggleButtonAriaLabel:function(e,t){return e?"text input view is open, go to ".concat(t," view"):"".concat(t," view is open, go to text input view")},start:"Start",end:"End",cancelButtonLabel:"Cancel",clearButtonLabel:"Clear",okButtonLabel:"OK",todayButtonLabel:"Today",datePickerDefaultToolbarTitle:"Select date",dateTimePickerDefaultToolbarTitle:"Select date & time",timePickerDefaultToolbarTitle:"Select time",dateRangePickerDefaultToolbarTitle:"Select date range",clockLabelText:function(e,t,o){return"Select ".concat(e,". ").concat(null===t?"No time selected":"Selected time is ".concat(o.format(t,"fullTime")))},hoursClockNumberText:function(e){return"".concat(e," hours")},minutesClockNumberText:function(e){return"".concat(e," minutes")},secondsClockNumberText:function(e){return"".concat(e," seconds")},openDatePickerDialogue:function(e,t){return e&&t.isValid(t.date(e))?"Choose date, selected date is ".concat(t.format(t.date(e),"fullDate")):"Choose date"},openTimePickerDialogue:function(e,t){return e&&t.isValid(t.date(e))?"Choose time, selected time is ".concat(t.format(t.date(e),"fullTime")):"Choose time"},timeTableLabel:"pick time",dateTableLabel:"pick date"},c=l,s=(a=l,(0,n.Z)({},a),o(80184)),d=r.createContext(null);function u(e){var t=(0,i.Z)({props:e,name:"MuiLocalizationProvider"}),o=t.children,a=t.dateAdapter,l=t.dateFormats,u=t.dateLibInstance,p=t.locale,v=t.adapterLocale,m=t.localeText;var h=r.useMemo((function(){return new a({locale:null!=v?v:p,formats:l,instance:u})}),[a,p,v,l,u]),f=r.useMemo((function(){return{minDate:h.date("1900-01-01T00:00:00.000"),maxDate:h.date("2099-12-31T00:00:00.000")}}),[h]),b=r.useMemo((function(){return{utils:h,defaultDates:f,localeText:(0,n.Z)({},c,null!=m?m:{})}}),[f,h,m]);return(0,s.jsx)(d.Provider,{value:b,children:o})}}}]);
//# sourceMappingURL=3175.449b0746.chunk.js.map