"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[842],{19840:function(e,a,n){n.d(a,{c:function(){return u}});var t=n(1413),r=n(45987),o=n(48550),l=n(61134),i=n(80184),d=["name","control","rules","defaultValue","helperText"],s=["ref"];function u(e){var a=e.name,n=e.control,u=e.rules,c=void 0===u?null:u,p=e.defaultValue,m=void 0===p?"":p,f=e.helperText,v=void 0===f?"":f,Z=(0,r.Z)(e,d),g=(0,l.bc)({name:a,control:n,rules:c,defaultValue:m}),h=g.field,b=h.ref,x=(0,r.Z)(h,s),j=g.fieldState,C=j.invalid,T=j.error;return(0,i.jsx)(o.Z,(0,t.Z)((0,t.Z)((0,t.Z)({inputRef:b},x),Z),{},{error:C,helperText:T?T.message:v}))}},18493:function(e,a,n){n.d(a,{Q:function(){return Z}});var t=n(1413),r=n(29439),o=n(45987),l=n(72791),i=n(48550),d=n(63466),s=n(13400),u=n(3746),c=n(20165),p=n(61134),m=n(80184),f=["name","control","rules","defaultValue","helperText"],v=["ref"];function Z(e){var a=e.name,n=e.control,Z=e.rules,g=void 0===Z?null:Z,h=e.defaultValue,b=void 0===h?"":h,x=e.helperText,j=void 0===x?"":x,C=(0,o.Z)(e,f),T=(0,l.useState)(!1),V=(0,r.Z)(T,2),y=V[0],O=V[1],_=(0,p.bc)({name:a,control:n,rules:g,defaultValue:b}),S=_.field,q=S.ref,P=(0,o.Z)(S,v),E=_.fieldState,I=E.invalid,k=E.error;return(0,m.jsx)(i.Z,(0,t.Z)((0,t.Z)((0,t.Z)({inputRef:q},P),C),{},{error:I,helperText:k?k.message:j,type:y?"text":"password",InputProps:{endAdornment:(0,m.jsx)(d.Z,{position:"end",children:(0,m.jsx)(s.Z,{onClick:function(){O(!y)},size:null===C||void 0===C?void 0:C.size,children:y?(0,m.jsx)(c.Z,{}):(0,m.jsx)(u.Z,{})})})}}))}},99507:function(e,a,n){n.d(a,{yh:function(){return y},mX:function(){return h},cl:function(){return t.c},gT:function(){return p},Q:function(){return m.Q}});var t=n(19840),r=n(1413),o=n(45987),l=n(48550),i=n(61134),d=n(30948),s=n(80184),u=["name","control","rules","defaultValue","helperText"],c=["ref","onChange","value"];function p(e){var a=e.name,n=e.control,t=e.rules,p=void 0===t?null:t,m=e.defaultValue,f=void 0===m?"":m,v=e.helperText,Z=void 0===v?"":v,g=(0,o.Z)(e,u),h=(0,i.bc)({name:a,control:n,rules:p,defaultValue:f}),b=h.field,x=(b.ref,b.onChange),j=b.value,C=(0,o.Z)(b,c),T=h.fieldState,V=T.invalid,y=T.error;return(0,s.jsx)(d.Z,(0,r.Z)((0,r.Z)((0,r.Z)({},g),C),{},{value:Number(j)||"",customInput:l.Z,error:V,onValueChange:function(e){x((null===e||void 0===e?void 0:e.value)||"")},helperText:y?y.message:Z,mask:"_"}))}var m=n(18493),f=n(92343),v=n(72791),Z=["multiple","options","name","control","defaultValue","rules","isOptionEqualToValue","getOptionLabel","helperText","disabled"],g=["ref","onChange"];function h(e){var a=e.multiple,n=e.options,t=e.name,d=e.control,u=e.defaultValue,c=e.rules,p=void 0===c?{required:"* Campo requerido"}:c,m=e.isOptionEqualToValue,v=e.getOptionLabel,h=e.helperText,b=e.disabled,x=(0,o.Z)(e,Z),j=(0,i.bc)({name:t,control:d,rules:p,defaultValue:u}),C=j.field,T=C.ref,V=C.onChange,y=(0,o.Z)(C,g),O=j.fieldState,_=O.invalid,S=O.error;return(0,s.jsx)(f.Z,(0,r.Z)((0,r.Z)({},y),{},{onChange:function(e,a){V(a)},multiple:a,options:n,noOptionsText:"No hay resultados",getOptionLabel:v,isOptionEqualToValue:m,disabled:b,renderInput:function(e){return(0,s.jsx)(l.Z,(0,r.Z)((0,r.Z)((0,r.Z)({},e),x),{},{inputRef:T,error:_,helperText:S?S.message:h}))}}))}var b=n(74165),x=n(15861),j=n(29439),C=n(13239);var T=["name","control","rules","data","defaultValue","helperText","getOptionLabel","isOptionEqualToValue","multiple","handleRequest","disabled","renderOption","renderTags","limitTags"],V=["ref","onChange"];function y(e){var a=e.name,n=e.control,t=e.rules,d=void 0===t?null:t,u=e.data,c=void 0===u?[]:u,p=e.defaultValue,m=void 0===p?"":p,Z=e.helperText,g=void 0===Z?"":Z,h=e.getOptionLabel,y=e.isOptionEqualToValue,O=e.multiple,_=e.handleRequest,S=e.disabled,q=e.renderOption,P=e.renderTags,E=e.limitTags,I=(0,o.Z)(e,T),k=(0,v.useState)(!1),D=(0,j.Z)(k,2),L=D[0],w=D[1],z=(0,v.useState)([]),N=(0,j.Z)(z,2),R=N[0],F=N[1],M=(0,v.useState)(""),G=(0,j.Z)(M,2),B=G[0],W=G[1],A=(0,v.useState)(!0),H=(0,j.Z)(A,2),Q=H[0],U=H[1],X=Q&&L&&0===R.length,$=(0,i.bc)({name:a,control:n,rules:d,defaultValue:m}),J=$.field,K=J.ref,Y=J.onChange,ee=(0,o.Z)(J,V),ae=$.fieldState.error;(0,v.useEffect)((function(){var e=!0,a=function(){var e=(0,x.Z)((0,b.Z)().mark((function e(){return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_(B);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(X)return e&&a(),function(){e=!1}}),[X]),(0,v.useEffect)((function(){L||(F([]),U(!0))}),[L]),(0,v.useEffect)((function(){null!==c&&(F(c),U(!1))}),[c]);var ne=(0,v.useCallback)(function(e,a){var n;return function(){for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];clearTimeout(n),n=setTimeout((function(){return e.apply(void 0,r)}),a)}}((function(){F([]),U(!0)}),500),[]);return(0,s.jsx)(f.Z,{multiple:O,id:"autocomplete-".concat(a),options:R,open:L,onOpen:function(){w(!0),U(!0)},onClose:function(){w(!1)},onChange:function(e,a){Y(a)},inputValue:B,onInputChange:function(e,a){W(a),"change"===(null===e||void 0===e?void 0:e.type)&&ne()},getOptionLabel:h,isOptionEqualToValue:y,loading:X,loadingText:"Cargando...",noOptionsText:"No hay resultados",renderTags:P,disabled:S,renderOption:q,limitTags:E,renderInput:function(e){return(0,s.jsx)(l.Z,(0,r.Z)((0,r.Z)((0,r.Z)((0,r.Z)({},e),ee),I),{},{inputRef:K,error:Boolean(ae),helperText:ae?ae.message:g,InputProps:(0,r.Z)((0,r.Z)({},e.InputProps),{},{endAdornment:(0,s.jsxs)(v.Fragment,{children:[X?(0,s.jsx)(C.Z,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})})}))}})}},20310:function(e,a,n){n.d(a,{g:function(){return m}});var t=n(1413),r=n(45987),o=(n(72791),n(68096)),l=n(30829),i=n(12674),d=n(47071),s=n(61134),u=n(80184),c=["name","label","control","helperText","defaultValue","rules","children"],p=["ref"];function m(e){var a=e.name,n=e.label,m=e.control,f=e.helperText,v=void 0===f?"":f,Z=e.defaultValue,g=void 0===Z?"":Z,h=e.rules,b=void 0===h?{required:"* Campo requerido"}:h,x=e.children,j=(0,r.Z)(e,c),C=(0,s.bc)({name:a,control:m,rules:b,defaultValue:g}),T=C.field,V=(T.ref,(0,r.Z)(T,p)),y=C.fieldState,O=y.invalid,_=y.error;return(0,u.jsxs)(o.Z,(0,t.Z)((0,t.Z)({},j),{},{error:O,children:[(0,u.jsx)(l.Z,{id:a+"-label",children:n}),(0,u.jsx)(i.Z,(0,t.Z)((0,t.Z)({labelId:a+"-label",label:n,id:a},V),{},{children:x})),(0,u.jsx)(d.Z,{children:_?_.message:v})]}))}},80842:function(e,a,n){n.r(a),n.d(a,{PDPadreForm:function(){return Z},default:function(){return g}});n(72791);var t=n(16871),r=n(61889),o=n(20890),l=n(68870),i=n(94721),d=n(23786),s=n(39709),u=n(61134),c=n(20310),p=n(99507),m=n(16030),f=n(84955),v=n(80184);function Z(e){var a=e.control,n=e.loading,t=e.user,u=e.handleSubmit,m=e.buttonDisable;return(0,v.jsxs)(r.ZP,{container:!0,spacing:2,children:[(0,v.jsxs)(r.ZP,{item:!0,xs:12,children:[(0,v.jsx)(o.Z,{variant:"h6",component:"span",className:"text__bold--semi",children:"Datos del padre"}),(0,v.jsx)(l.Z,{mt:1,children:(0,v.jsx)(i.Z,{})})]}),(0,v.jsx)(r.ZP,{item:!0,xs:12,children:(0,v.jsxs)(c.g,{name:"personal_data.padre_nacionalidad",label:"Nacionalidad",defaultValue:t.personal_data.padre_nacionalidad||"",control:a,disabled:n,size:"small",fullWidth:!0,children:[(0,v.jsx)(d.Z,{value:"",children:(0,v.jsx)("em",{children:"Ninguno"})}),(0,v.jsx)(d.Z,{value:"V",children:"Venezolano"}),(0,v.jsx)(d.Z,{value:"E",children:"Extranjero"})]})}),(0,v.jsx)(r.ZP,{item:!0,xs:12,children:(0,v.jsx)(p.cl,{control:a,rules:{required:"* Campo requerido",minLength:{value:7,message:"Error: Demaciado corto"},maxLength:{value:14,message:"Error: Demaciado largo"},pattern:{value:/^[0-9]*$/,message:"Error: Solo n\xfameros"}},defaultValue:t.personal_data.padre_cedula||"",name:"personal_data.padre_cedula",label:"C\xe9dula",size:"small",variant:"outlined",fullWidth:!0,disabled:n})}),(0,v.jsx)(r.ZP,{item:!0,xs:12,children:(0,v.jsx)(p.cl,{control:a,rules:{required:"* Campo requerido",minLength:{value:8,message:"Error: Demaciado corto"},maxLength:{value:90,message:"Error: Demaciado largo"}},defaultValue:t.personal_data.padre_nombre||"",name:"personal_data.padre_nombre",label:"Nombre y apellido",size:"small",variant:"outlined",fullWidth:!0,disabled:n})}),(0,v.jsx)(r.ZP,{item:!0,xs:12,children:(0,v.jsx)(p.gT,{control:a,rules:{required:"* Campo requerido",minLength:{value:12,message:"Error: No v\xe1lido"}},defaultValue:t.personal_data.padre_telefono||"58",name:"personal_data.padre_telefono",label:"Tel\xe9fono",variant:"outlined",size:"small",format:"+## (###) ###-####",fullWidth:!0,disabled:n})}),(0,v.jsx)(r.ZP,{item:!0,xs:12,children:(0,v.jsx)(p.cl,{control:a,rules:{required:"* Campo requerido",minLength:{value:10,message:"Error: Demaciado corto"},maxLength:{value:100,message:"Error: Demaciado largo"}},defaultValue:t.personal_data.padre_direccion||"",name:"personal_data.padre_direccion",label:"Direcci\xf3n de domicilio",size:"small",variant:"outlined",fullWidth:!0,disabled:n})}),!m&&(0,v.jsx)(r.ZP,{container:!0,justifyContent:"flex-end",item:!0,xs:12,children:(0,v.jsx)(s.Z,{variant:"contained",loading:n,disableElevation:!0,onClick:u,children:"Actualizar"})})]})}function g(){var e=(0,t.UO)().id,a=(0,m.v9)((function(e){return{userSelected:e.requestStatus.userShow.userSelected,loading:e.requestStatus.personalData.loadingPDP}})),n=a.userSelected,r=a.loading,o=(0,m.I0)(),l=(0,u.cI)({shouldUnregister:!0}),i=l.handleSubmit,d=l.control;return(0,v.jsx)(Z,{control:d,user:n,handleSubmit:i((function(a){a._method="PUT",o((0,f.V)({submitData:a,id:e,loading:"loadingPDP"}))})),loading:r})}},23786:function(e,a,n){n.d(a,{Z:function(){return y}});var t=n(4942),r=n(63366),o=n(87462),l=n(72791),i=n(28182),d=n(94419),s=n(12065),u=n(66934),c=n(31402),p=n(66199),m=n(95080),f=n(40162),v=n(42071),Z=n(90133),g=n(96014),h=n(29849),b=n(21217);function x(e){return(0,b.Z)("MuiMenuItem",e)}var j=(0,n(75878).Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),C=n(80184),T=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],V=(0,u.ZP)(m.Z,{shouldForwardProp:function(e){return(0,u.FO)(e)||"classes"===e},name:"MuiMenuItem",slot:"Root",overridesResolver:function(e,a){var n=e.ownerState;return[a.root,n.dense&&a.dense,n.divider&&a.divider,!n.disableGutters&&a.gutters]}})((function(e){var a,n=e.theme,r=e.ownerState;return(0,o.Z)({},n.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!r.disableGutters&&{paddingLeft:16,paddingRight:16},r.divider&&{borderBottom:"1px solid ".concat((n.vars||n).palette.divider),backgroundClip:"padding-box"},(a={"&:hover":{textDecoration:"none",backgroundColor:(n.vars||n).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},(0,t.Z)(a,"&.".concat(j.selected),(0,t.Z)({backgroundColor:n.vars?"rgba(".concat(n.vars.palette.primary.mainChannel," / ").concat(n.vars.palette.action.selectedOpacity,")"):(0,s.Fq)(n.palette.primary.main,n.palette.action.selectedOpacity)},"&.".concat(j.focusVisible),{backgroundColor:n.vars?"rgba(".concat(n.vars.palette.primary.mainChannel," / calc(").concat(n.vars.palette.action.selectedOpacity," + ").concat(n.vars.palette.action.focusOpacity,"))"):(0,s.Fq)(n.palette.primary.main,n.palette.action.selectedOpacity+n.palette.action.focusOpacity)})),(0,t.Z)(a,"&.".concat(j.selected,":hover"),{backgroundColor:n.vars?"rgba(".concat(n.vars.palette.primary.mainChannel," / calc(").concat(n.vars.palette.action.selectedOpacity," + ").concat(n.vars.palette.action.hoverOpacity,"))"):(0,s.Fq)(n.palette.primary.main,n.palette.action.selectedOpacity+n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:n.vars?"rgba(".concat(n.vars.palette.primary.mainChannel," / ").concat(n.vars.palette.action.selectedOpacity,")"):(0,s.Fq)(n.palette.primary.main,n.palette.action.selectedOpacity)}}),(0,t.Z)(a,"&.".concat(j.focusVisible),{backgroundColor:(n.vars||n).palette.action.focus}),(0,t.Z)(a,"&.".concat(j.disabled),{opacity:(n.vars||n).palette.action.disabledOpacity}),(0,t.Z)(a,"& + .".concat(Z.Z.root),{marginTop:n.spacing(1),marginBottom:n.spacing(1)}),(0,t.Z)(a,"& + .".concat(Z.Z.inset),{marginLeft:52}),(0,t.Z)(a,"& .".concat(h.Z.root),{marginTop:0,marginBottom:0}),(0,t.Z)(a,"& .".concat(h.Z.inset),{paddingLeft:36}),(0,t.Z)(a,"& .".concat(g.Z.root),{minWidth:36}),a),!r.dense&&(0,t.Z)({},n.breakpoints.up("sm"),{minHeight:"auto"}),r.dense&&(0,o.Z)({minHeight:32,paddingTop:4,paddingBottom:4},n.typography.body2,(0,t.Z)({},"& .".concat(g.Z.root," svg"),{fontSize:"1.25rem"})))})),y=l.forwardRef((function(e,a){var n=(0,c.Z)({props:e,name:"MuiMenuItem"}),t=n.autoFocus,s=void 0!==t&&t,u=n.component,m=void 0===u?"li":u,Z=n.dense,g=void 0!==Z&&Z,h=n.divider,b=void 0!==h&&h,j=n.disableGutters,y=void 0!==j&&j,O=n.focusVisibleClassName,_=n.role,S=void 0===_?"menuitem":_,q=n.tabIndex,P=(0,r.Z)(n,T),E=l.useContext(p.Z),I={dense:g||E.dense||!1,disableGutters:y},k=l.useRef(null);(0,f.Z)((function(){s&&k.current&&k.current.focus()}),[s]);var D,L=(0,o.Z)({},n,{dense:I.dense,divider:b,disableGutters:y}),w=function(e){var a=e.disabled,n=e.dense,t=e.divider,r=e.disableGutters,l=e.selected,i=e.classes,s={root:["root",n&&"dense",a&&"disabled",!r&&"gutters",t&&"divider",l&&"selected"]},u=(0,d.Z)(s,x,i);return(0,o.Z)({},i,u)}(n),z=(0,v.Z)(k,a);return n.disabled||(D=void 0!==q?q:-1),(0,C.jsx)(p.Z.Provider,{value:I,children:(0,C.jsx)(V,(0,o.Z)({ref:z,role:S,tabIndex:D,component:m,focusVisibleClassName:(0,i.Z)(w.focusVisible,O)},P,{ownerState:L,classes:w}))})}))}}]);
//# sourceMappingURL=842.6ff2a8a5.chunk.js.map