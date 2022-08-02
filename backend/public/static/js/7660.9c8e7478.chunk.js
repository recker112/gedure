"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[7660],{94721:function(e,t,i){var a=i(63366),r=i(87462),n=i(72791),o=i(28182),l=i(94419),c=i(12065),d=i(66934),s=i(31402),p=i(90133),v=i(80184),u=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],h=(0,d.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:function(e,t){var i=e.ownerState;return[t.root,i.absolute&&t.absolute,t[i.variant],i.light&&t.light,"vertical"===i.orientation&&t.vertical,i.flexItem&&t.flexItem,i.children&&t.withChildren,i.children&&"vertical"===i.orientation&&t.withChildrenVertical,"right"===i.textAlign&&"vertical"!==i.orientation&&t.textAlignRight,"left"===i.textAlign&&"vertical"!==i.orientation&&t.textAlignLeft]}})((function(e){var t=e.theme,i=e.ownerState;return(0,r.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},i.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},i.light&&{borderColor:t.vars?"rgba(".concat(t.vars.palette.dividerChannel," / 0.08)"):(0,c.Fq)(t.palette.divider,.08)},"inset"===i.variant&&{marginLeft:72},"middle"===i.variant&&"horizontal"===i.orientation&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},"middle"===i.variant&&"vertical"===i.orientation&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},"vertical"===i.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},i.flexItem&&{alignSelf:"stretch",height:"auto"})}),(function(e){var t=e.theme,i=e.ownerState;return(0,r.Z)({},i.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{position:"relative",width:"100%",borderTop:"thin solid ".concat((t.vars||t).palette.divider),top:"50%",content:'""',transform:"translateY(50%)"}})}),(function(e){var t=e.theme,i=e.ownerState;return(0,r.Z)({},i.children&&"vertical"===i.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",top:"0%",left:"50%",borderTop:0,borderLeft:"thin solid ".concat((t.vars||t).palette.divider),transform:"translateX(0%)"}})}),(function(e){var t=e.ownerState;return(0,r.Z)({},"right"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})})),g=(0,d.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:function(e,t){var i=e.ownerState;return[t.wrapper,"vertical"===i.orientation&&t.wrapperVertical]}})((function(e){var t=e.theme,i=e.ownerState;return(0,r.Z)({display:"inline-block",paddingLeft:"calc(".concat(t.spacing(1)," * 1.2)"),paddingRight:"calc(".concat(t.spacing(1)," * 1.2)")},"vertical"===i.orientation&&{paddingTop:"calc(".concat(t.spacing(1)," * 1.2)"),paddingBottom:"calc(".concat(t.spacing(1)," * 1.2)")})})),m=n.forwardRef((function(e,t){var i=(0,s.Z)({props:e,name:"MuiDivider"}),n=i.absolute,c=void 0!==n&&n,d=i.children,m=i.className,f=i.component,b=void 0===f?d?"div":"hr":f,Z=i.flexItem,x=void 0!==Z&&Z,w=i.light,y=void 0!==w&&w,C=i.orientation,S=void 0===C?"horizontal":C,I=i.role,k=void 0===I?"hr"!==b?"separator":void 0:I,A=i.textAlign,R=void 0===A?"center":A,V=i.variant,O=void 0===V?"fullWidth":V,M=(0,a.Z)(i,u),L=(0,r.Z)({},i,{absolute:c,component:b,flexItem:x,light:y,orientation:S,role:k,textAlign:R,variant:O}),B=function(e){var t=e.absolute,i=e.children,a=e.classes,r=e.flexItem,n=e.light,o=e.orientation,c=e.textAlign,d={root:["root",t&&"absolute",e.variant,n&&"light","vertical"===o&&"vertical",r&&"flexItem",i&&"withChildren",i&&"vertical"===o&&"withChildrenVertical","right"===c&&"vertical"!==o&&"textAlignRight","left"===c&&"vertical"!==o&&"textAlignLeft"],wrapper:["wrapper","vertical"===o&&"wrapperVertical"]};return(0,l.Z)(d,p.V,a)}(L);return(0,v.jsx)(h,(0,r.Z)({as:b,className:(0,o.Z)(B.root,m),role:k,ref:t,ownerState:L},M,{children:d?(0,v.jsx)(g,{className:B.wrapper,ownerState:L,children:d}):null}))}));t.Z=m},90133:function(e,t,i){i.d(t,{V:function(){return r}});var a=i(21217);function r(e){return(0,a.Z)("MuiDivider",e)}var n=(0,i(75878).Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);t.Z=n},23786:function(e,t,i){i.d(t,{Z:function(){return I}});var a=i(4942),r=i(63366),n=i(87462),o=i(72791),l=i(28182),c=i(94419),d=i(12065),s=i(66934),p=i(31402),v=i(66199),u=i(95080),h=i(40162),g=i(42071),m=i(90133),f=i(96014),b=i(29849),Z=i(21217);function x(e){return(0,Z.Z)("MuiMenuItem",e)}var w=(0,i(75878).Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),y=i(80184),C=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],S=(0,s.ZP)(u.Z,{shouldForwardProp:function(e){return(0,s.FO)(e)||"classes"===e},name:"MuiMenuItem",slot:"Root",overridesResolver:function(e,t){var i=e.ownerState;return[t.root,i.dense&&t.dense,i.divider&&t.divider,!i.disableGutters&&t.gutters]}})((function(e){var t,i=e.theme,r=e.ownerState;return(0,n.Z)({},i.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!r.disableGutters&&{paddingLeft:16,paddingRight:16},r.divider&&{borderBottom:"1px solid ".concat((i.vars||i).palette.divider),backgroundClip:"padding-box"},(t={"&:hover":{textDecoration:"none",backgroundColor:(i.vars||i).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},(0,a.Z)(t,"&.".concat(w.selected),(0,a.Z)({backgroundColor:i.vars?"rgba(".concat(i.vars.palette.primary.mainChannel," / ").concat(i.vars.palette.action.selectedOpacity,")"):(0,d.Fq)(i.palette.primary.main,i.palette.action.selectedOpacity)},"&.".concat(w.focusVisible),{backgroundColor:i.vars?"rgba(".concat(i.vars.palette.primary.mainChannel," / calc(").concat(i.vars.palette.action.selectedOpacity," + ").concat(i.vars.palette.action.focusOpacity,"))"):(0,d.Fq)(i.palette.primary.main,i.palette.action.selectedOpacity+i.palette.action.focusOpacity)})),(0,a.Z)(t,"&.".concat(w.selected,":hover"),{backgroundColor:i.vars?"rgba(".concat(i.vars.palette.primary.mainChannel," / calc(").concat(i.vars.palette.action.selectedOpacity," + ").concat(i.vars.palette.action.hoverOpacity,"))"):(0,d.Fq)(i.palette.primary.main,i.palette.action.selectedOpacity+i.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:i.vars?"rgba(".concat(i.vars.palette.primary.mainChannel," / ").concat(i.vars.palette.action.selectedOpacity,")"):(0,d.Fq)(i.palette.primary.main,i.palette.action.selectedOpacity)}}),(0,a.Z)(t,"&.".concat(w.focusVisible),{backgroundColor:(i.vars||i).palette.action.focus}),(0,a.Z)(t,"&.".concat(w.disabled),{opacity:(i.vars||i).palette.action.disabledOpacity}),(0,a.Z)(t,"& + .".concat(m.Z.root),{marginTop:i.spacing(1),marginBottom:i.spacing(1)}),(0,a.Z)(t,"& + .".concat(m.Z.inset),{marginLeft:52}),(0,a.Z)(t,"& .".concat(b.Z.root),{marginTop:0,marginBottom:0}),(0,a.Z)(t,"& .".concat(b.Z.inset),{paddingLeft:36}),(0,a.Z)(t,"& .".concat(f.Z.root),{minWidth:36}),t),!r.dense&&(0,a.Z)({},i.breakpoints.up("sm"),{minHeight:"auto"}),r.dense&&(0,n.Z)({minHeight:32,paddingTop:4,paddingBottom:4},i.typography.body2,(0,a.Z)({},"& .".concat(f.Z.root," svg"),{fontSize:"1.25rem"})))})),I=o.forwardRef((function(e,t){var i=(0,p.Z)({props:e,name:"MuiMenuItem"}),a=i.autoFocus,d=void 0!==a&&a,s=i.component,u=void 0===s?"li":s,m=i.dense,f=void 0!==m&&m,b=i.divider,Z=void 0!==b&&b,w=i.disableGutters,I=void 0!==w&&w,k=i.focusVisibleClassName,A=i.role,R=void 0===A?"menuitem":A,V=i.tabIndex,O=(0,r.Z)(i,C),M=o.useContext(v.Z),L={dense:f||M.dense||!1,disableGutters:I},B=o.useRef(null);(0,h.Z)((function(){d&&B.current&&B.current.focus()}),[d]);var F,D=(0,n.Z)({},i,{dense:L.dense,divider:Z,disableGutters:I}),T=function(e){var t=e.disabled,i=e.dense,a=e.divider,r=e.disableGutters,o=e.selected,l=e.classes,d={root:["root",i&&"dense",t&&"disabled",!r&&"gutters",a&&"divider",o&&"selected"]},s=(0,c.Z)(d,x,l);return(0,n.Z)({},l,s)}(i),W=(0,g.Z)(B,t);return i.disabled||(F=void 0!==V?V:-1),(0,y.jsx)(v.Z.Provider,{value:L,children:(0,y.jsx)(S,(0,n.Z)({ref:W,role:R,tabIndex:F,component:u,focusVisibleClassName:(0,l.Z)(T.focusVisible,k)},O,{ownerState:D,classes:T}))})}))}}]);
//# sourceMappingURL=7660.9c8e7478.chunk.js.map