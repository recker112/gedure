"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[9329,7660],{59329:function(e,t,a){a.r(t),a.d(t,{RUbicacionForm:function(){return f},default:function(){return g}});a(72791);var i=a(16871),r=a(61889),n=a(20890),o=a(68870),l=a(94721),d=a(23786),c=a(39709),s=a(61134),u=a(99507),p=a(20310),v=a(45455),h=a(16030),m=a(84955),b=a(80184);function f(e){var t=e.loading,a=e.control,i=e.handleSubmit,h=e.user,m=e.buttonDisable,f=(0,s.qo)({name:"personal_data.repre_ubi_estado",control:a,defaultValue:h.personal_data.repre_ubi_estado}),g=(0,s.qo)({name:"personal_data.repre_ubi_municipio",control:a,defaultValue:h.personal_data.repre_ubi_municipio});return(0,b.jsxs)(r.ZP,{container:!0,spacing:2,children:[(0,b.jsxs)(r.ZP,{item:!0,xs:12,children:[(0,b.jsx)(n.Z,{variant:"h6",component:"span",className:"text__bold--semi",children:"Datos del representante"}),(0,b.jsx)(o.Z,{mt:1,children:(0,b.jsx)(l.Z,{})})]}),(0,b.jsx)(r.ZP,{item:!0,xs:12,children:(0,b.jsx)(u.mX,{name:"personal_data.repre_ubi_estado",label:"Estado",size:"small",options:v.xV,control:a,defaultValue:h.personal_data.repre_ubi_estado||"",isOptionEqualToValue:function(e,t){return e===t},disabled:t})}),(0,b.jsx)(r.ZP,{item:!0,xs:12,children:(0,b.jsx)(u.mX,{name:"personal_data.repre_ubi_municipio",label:"Municipio",size:"small",options:f?(0,v.Xb)(f):[],control:a,defaultValue:h.personal_data.repre_ubi_municipio||"",isOptionEqualToValue:function(e,t){return e===t},disabled:t||!Boolean(f)})}),(0,b.jsx)(r.ZP,{item:!0,xs:12,children:(0,b.jsx)(u.mX,{name:"personal_data.repre_ubi_parroquia",label:"Parroquia",size:"small",options:f&&g?(0,v.d9)(f,g):[],control:a,defaultValue:h.personal_data.repre_ubi_parroquia||"",isOptionEqualToValue:function(e,t){return e===t},disabled:t||!Boolean(f)||!Boolean(g)})}),(0,b.jsx)(r.ZP,{item:!0,xs:12,children:(0,b.jsxs)(p.g,{name:"personal_data.repre_ubi_via",label:"Tipo de via",defaultValue:h.personal_data.repre_ubi_via||"",control:a,disabled:t,size:"small",fullWidth:!0,children:[(0,b.jsx)(d.Z,{value:"",children:(0,b.jsx)("em",{children:"Ninguno"})}),(0,b.jsx)(d.Z,{value:"Aut",children:"Aut"}),(0,b.jsx)(d.Z,{value:"Av",children:"Av"}),(0,b.jsx)(d.Z,{value:"Blvr",children:"Blvr"}),(0,b.jsx)(d.Z,{value:"Calle",children:"Calle"}),(0,b.jsx)(d.Z,{value:"Callej\xf3n",children:"Callej\xf3n"}),(0,b.jsx)(d.Z,{value:"Carretera",children:"Carretera"}),(0,b.jsx)(d.Z,{value:"Manzana",children:"Manzana"}),(0,b.jsx)(d.Z,{value:"Prolongaci\xf3n",children:"Prolongaci\xf3n"}),(0,b.jsx)(d.Z,{value:"Transversal",children:"Transversal"}),(0,b.jsx)(d.Z,{value:"Vereda",children:"Vereda"})]})}),!m&&(0,b.jsx)(r.ZP,{container:!0,justifyContent:"flex-end",item:!0,xs:12,children:(0,b.jsx)(c.Z,{variant:"contained",loading:t,disableElevation:!0,onClick:i,children:"Actualizar"})})]})}function g(){var e=(0,i.UO)().id,t=(0,h.v9)((function(e){return{userSelected:e.requestStatus.userShow.userSelected,loading:e.requestStatus.personalData.loadingRU}})),a=t.userSelected,r=t.loading,n=(0,h.I0)(),l=(0,s.cI)(),d=l.handleSubmit,c=l.control;return"V"!==a.personal_data.repre_nacionalidad?null:(0,b.jsx)(o.Z,{mb:4,children:(0,b.jsx)(f,{control:c,user:a,handleSubmit:d((function(t){"E"===a.personal_data.repre_nacionalidad&&(t.personal_data.repre_ubi_estado=null,t.personal_data.repre_ubi_municipio=null,t.personal_data.repre_ubi_parroquia=null,t.personal_data.repre_ubi_via=null),t._method="PUT",n((0,m.V)({submitData:t,id:e,loading:"loadingRU"}))})),loading:r})})}},94721:function(e,t,a){var i=a(63366),r=a(87462),n=a(72791),o=a(28182),l=a(12039),d=a(12065),c=a(47630),s=a(93736),u=a(90133),p=a(80184),v=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],h=(0,c.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.absolute&&t.absolute,t[a.variant],a.light&&t.light,"vertical"===a.orientation&&t.vertical,a.flexItem&&t.flexItem,a.children&&t.withChildren,a.children&&"vertical"===a.orientation&&t.withChildrenVertical,"right"===a.textAlign&&"vertical"!==a.orientation&&t.textAlignRight,"left"===a.textAlign&&"vertical"!==a.orientation&&t.textAlignLeft]}})((function(e){var t=e.theme,a=e.ownerState;return(0,r.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},a.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},a.light&&{borderColor:t.vars?"rgba(".concat(t.vars.palette.dividerChannel," / 0.08)"):(0,d.Fq)(t.palette.divider,.08)},"inset"===a.variant&&{marginLeft:72},"middle"===a.variant&&"horizontal"===a.orientation&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},"middle"===a.variant&&"vertical"===a.orientation&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},"vertical"===a.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},a.flexItem&&{alignSelf:"stretch",height:"auto"})}),(function(e){var t=e.theme,a=e.ownerState;return(0,r.Z)({},a.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{position:"relative",width:"100%",borderTop:"thin solid ".concat((t.vars||t).palette.divider),top:"50%",content:'""',transform:"translateY(50%)"}})}),(function(e){var t=e.theme,a=e.ownerState;return(0,r.Z)({},a.children&&"vertical"===a.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",top:"0%",left:"50%",borderTop:0,borderLeft:"thin solid ".concat((t.vars||t).palette.divider),transform:"translateX(0%)"}})}),(function(e){var t=e.ownerState;return(0,r.Z)({},"right"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})})),m=(0,c.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:function(e,t){var a=e.ownerState;return[t.wrapper,"vertical"===a.orientation&&t.wrapperVertical]}})((function(e){var t=e.theme,a=e.ownerState;return(0,r.Z)({display:"inline-block",paddingLeft:"calc(".concat(t.spacing(1)," * 1.2)"),paddingRight:"calc(".concat(t.spacing(1)," * 1.2)")},"vertical"===a.orientation&&{paddingTop:"calc(".concat(t.spacing(1)," * 1.2)"),paddingBottom:"calc(".concat(t.spacing(1)," * 1.2)")})})),b=n.forwardRef((function(e,t){var a=(0,s.Z)({props:e,name:"MuiDivider"}),n=a.absolute,d=void 0!==n&&n,c=a.children,b=a.className,f=a.component,g=void 0===f?c?"div":"hr":f,x=a.flexItem,Z=void 0!==x&&x,_=a.light,w=void 0!==_&&_,j=a.orientation,C=void 0===j?"horizontal":j,y=a.role,V=void 0===y?"hr"!==g?"separator":void 0:y,S=a.textAlign,A=void 0===S?"center":S,I=a.variant,O=void 0===I?"fullWidth":I,R=(0,i.Z)(a,v),k=(0,r.Z)({},a,{absolute:d,component:g,flexItem:Z,light:w,orientation:C,role:V,textAlign:A,variant:O}),q=function(e){var t=e.absolute,a=e.children,i=e.classes,r=e.flexItem,n=e.light,o=e.orientation,d=e.textAlign,c={root:["root",t&&"absolute",e.variant,n&&"light","vertical"===o&&"vertical",r&&"flexItem",a&&"withChildren",a&&"vertical"===o&&"withChildrenVertical","right"===d&&"vertical"!==o&&"textAlignRight","left"===d&&"vertical"!==o&&"textAlignLeft"],wrapper:["wrapper","vertical"===o&&"wrapperVertical"]};return(0,l.Z)(c,u.V,i)}(k);return(0,p.jsx)(h,(0,r.Z)({as:g,className:(0,o.Z)(q.root,b),role:V,ref:t,ownerState:k},R,{children:c?(0,p.jsx)(m,{className:q.wrapper,ownerState:k,children:c}):null}))}));t.Z=b},90133:function(e,t,a){a.d(t,{V:function(){return r}});var i=a(19818);function r(e){return(0,i.Z)("MuiDivider",e)}var n=(0,a(22152).Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);t.Z=n},23786:function(e,t,a){a.d(t,{Z:function(){return y}});var i=a(4942),r=a(63366),n=a(87462),o=a(72791),l=a(28182),d=a(12039),c=a(12065),s=a(47630),u=a(93736),p=a(66199),v=a(95080),h=a(40162),m=a(42071),b=a(90133),f=a(96014),g=a(29849),x=a(19818);function Z(e){return(0,x.Z)("MuiMenuItem",e)}var _=(0,a(22152).Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),w=a(80184),j=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],C=(0,s.ZP)(v.Z,{shouldForwardProp:function(e){return(0,s.FO)(e)||"classes"===e},name:"MuiMenuItem",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.dense&&t.dense,a.divider&&t.divider,!a.disableGutters&&t.gutters]}})((function(e){var t,a=e.theme,r=e.ownerState;return(0,n.Z)({},a.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!r.disableGutters&&{paddingLeft:16,paddingRight:16},r.divider&&{borderBottom:"1px solid ".concat((a.vars||a).palette.divider),backgroundClip:"padding-box"},(t={"&:hover":{textDecoration:"none",backgroundColor:(a.vars||a).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},(0,i.Z)(t,"&.".concat(_.selected),(0,i.Z)({backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / ").concat(a.vars.palette.action.selectedOpacity,")"):(0,c.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity)},"&.".concat(_.focusVisible),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / calc(").concat(a.vars.palette.action.selectedOpacity," + ").concat(a.vars.palette.action.focusOpacity,"))"):(0,c.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)})),(0,i.Z)(t,"&.".concat(_.selected,":hover"),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / calc(").concat(a.vars.palette.action.selectedOpacity," + ").concat(a.vars.palette.action.hoverOpacity,"))"):(0,c.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / ").concat(a.vars.palette.action.selectedOpacity,")"):(0,c.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity)}}),(0,i.Z)(t,"&.".concat(_.focusVisible),{backgroundColor:(a.vars||a).palette.action.focus}),(0,i.Z)(t,"&.".concat(_.disabled),{opacity:(a.vars||a).palette.action.disabledOpacity}),(0,i.Z)(t,"& + .".concat(b.Z.root),{marginTop:a.spacing(1),marginBottom:a.spacing(1)}),(0,i.Z)(t,"& + .".concat(b.Z.inset),{marginLeft:52}),(0,i.Z)(t,"& .".concat(g.Z.root),{marginTop:0,marginBottom:0}),(0,i.Z)(t,"& .".concat(g.Z.inset),{paddingLeft:36}),(0,i.Z)(t,"& .".concat(f.Z.root),{minWidth:36}),t),!r.dense&&(0,i.Z)({},a.breakpoints.up("sm"),{minHeight:"auto"}),r.dense&&(0,n.Z)({minHeight:32,paddingTop:4,paddingBottom:4},a.typography.body2,(0,i.Z)({},"& .".concat(f.Z.root," svg"),{fontSize:"1.25rem"})))})),y=o.forwardRef((function(e,t){var a=(0,u.Z)({props:e,name:"MuiMenuItem"}),i=a.autoFocus,c=void 0!==i&&i,s=a.component,v=void 0===s?"li":s,b=a.dense,f=void 0!==b&&b,g=a.divider,x=void 0!==g&&g,_=a.disableGutters,y=void 0!==_&&_,V=a.focusVisibleClassName,S=a.role,A=void 0===S?"menuitem":S,I=a.tabIndex,O=(0,r.Z)(a,j),R=o.useContext(p.Z),k={dense:f||R.dense||!1,disableGutters:y},q=o.useRef(null);(0,h.Z)((function(){c&&q.current&&q.current.focus()}),[c]);var M,P=(0,n.Z)({},a,{dense:k.dense,divider:x,disableGutters:y}),T=function(e){var t=e.disabled,a=e.dense,i=e.divider,r=e.disableGutters,o=e.selected,l=e.classes,c={root:["root",a&&"dense",t&&"disabled",!r&&"gutters",i&&"divider",o&&"selected"]},s=(0,d.Z)(c,Z,l);return(0,n.Z)({},l,s)}(a),B=(0,m.Z)(q,t);return a.disabled||(M=void 0!==I?I:-1),(0,w.jsx)(p.Z.Provider,{value:k,children:(0,w.jsx)(C,(0,n.Z)({ref:B,role:A,tabIndex:M,component:v,focusVisibleClassName:(0,l.Z)(T.focusVisible,V)},O,{ownerState:P,classes:T}))})}))}}]);
//# sourceMappingURL=9329.e1a71dd0.chunk.js.map