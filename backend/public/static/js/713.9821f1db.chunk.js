"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[713,842],{19840:function(e,a,t){t.d(a,{c:function(){return u}});var n=t(1413),r=t(45987),o=t(59911),l=t(61134),i=t(80184),d=["name","control","rules","defaultValue","helperText"],s=["ref"];function u(e){var a=e.name,t=e.control,u=e.rules,c=void 0===u?null:u,p=e.defaultValue,m=void 0===p?"":p,f=e.helperText,v=void 0===f?"":f,g=(0,r.Z)(e,d),Z=(0,l.bc)({name:a,control:t,rules:c,defaultValue:m}),h=Z.field,b=h.ref,x=(0,r.Z)(h,s),j=Z.fieldState,C=j.invalid,T=j.error;return(0,i.jsx)(o.Z,(0,n.Z)((0,n.Z)((0,n.Z)({inputRef:b},x),g),{},{error:C,helperText:T?T.message:v}))}},18493:function(e,a,t){t.d(a,{Q:function(){return g}});var n=t(1413),r=t(29439),o=t(45987),l=t(72791),i=t(59911),d=t(38254),s=t(13811),u=t(3746),c=t(20165),p=t(61134),m=t(80184),f=["name","control","rules","defaultValue","helperText"],v=["ref"];function g(e){var a=e.name,t=e.control,g=e.rules,Z=void 0===g?null:g,h=e.defaultValue,b=void 0===h?"":h,x=e.helperText,j=void 0===x?"":x,C=(0,o.Z)(e,f),T=(0,l.useState)(!1),V=(0,r.Z)(T,2),y=V[0],O=V[1],P=(0,p.bc)({name:a,control:t,rules:Z,defaultValue:b}),S=P.field,_=S.ref,q=(0,o.Z)(S,v),D=P.fieldState,I=D.invalid,E=D.error;return(0,m.jsx)(i.Z,(0,n.Z)((0,n.Z)((0,n.Z)({inputRef:_},q),C),{},{error:I,helperText:E?E.message:j,type:y?"text":"password",InputProps:{endAdornment:(0,m.jsx)(d.Z,{position:"end",children:(0,m.jsx)(s.Z,{onClick:function(){O(!y)},size:null===C||void 0===C?void 0:C.size,children:y?(0,m.jsx)(c.Z,{}):(0,m.jsx)(u.Z,{})})})}}))}},99507:function(e,a,t){t.d(a,{yh:function(){return y},mX:function(){return h},cl:function(){return n.c},gT:function(){return p},Q:function(){return m.Q}});var n=t(19840),r=t(1413),o=t(45987),l=t(59911),i=t(61134),d=t(30948),s=t(80184),u=["name","control","rules","defaultValue","helperText"],c=["ref","onChange","value"];function p(e){var a=e.name,t=e.control,n=e.rules,p=void 0===n?null:n,m=e.defaultValue,f=void 0===m?"":m,v=e.helperText,g=void 0===v?"":v,Z=(0,o.Z)(e,u),h=(0,i.bc)({name:a,control:t,rules:p,defaultValue:f}),b=h.field,x=(b.ref,b.onChange),j=b.value,C=(0,o.Z)(b,c),T=h.fieldState,V=T.invalid,y=T.error;return(0,s.jsx)(d.Z,(0,r.Z)((0,r.Z)((0,r.Z)({},Z),C),{},{value:(Z.format?j:parseFloat(j))||"",customInput:l.Z,error:V,onValueChange:function(e){x((null===e||void 0===e?void 0:e.value)||"")},helperText:y?y.message:g,mask:"_"}))}var m=t(18493),f=t(97008),v=t(72791),g=["multiple","options","name","control","defaultValue","rules","isOptionEqualToValue","getOptionLabel","helperText","disabled"],Z=["ref","onChange"];function h(e){var a=e.multiple,t=e.options,n=e.name,d=e.control,u=e.defaultValue,c=e.rules,p=void 0===c?{required:"* Campo requerido"}:c,m=e.isOptionEqualToValue,v=e.getOptionLabel,h=e.helperText,b=e.disabled,x=(0,o.Z)(e,g),j=(0,i.bc)({name:n,control:d,rules:p,defaultValue:u}),C=j.field,T=C.ref,V=C.onChange,y=(0,o.Z)(C,Z),O=j.fieldState,P=O.invalid,S=O.error;return(0,s.jsx)(f.Z,(0,r.Z)((0,r.Z)({},y),{},{onChange:function(e,a){V(a)},multiple:a,options:t,noOptionsText:"No hay resultados",getOptionLabel:v,isOptionEqualToValue:m,disabled:b,renderInput:function(e){return(0,s.jsx)(l.Z,(0,r.Z)((0,r.Z)((0,r.Z)({},e),x),{},{inputRef:T,error:P,helperText:S?S.message:h}))}}))}var b=t(74165),x=t(15861),j=t(29439),C=t(96580);var T=["name","control","rules","data","defaultValue","helperText","getOptionLabel","isOptionEqualToValue","multiple","handleRequest","disabled","renderOption","renderTags","limitTags"],V=["ref","onChange"];function y(e){var a=e.name,t=e.control,n=e.rules,d=void 0===n?null:n,u=e.data,c=void 0===u?[]:u,p=e.defaultValue,m=void 0===p?"":p,g=e.helperText,Z=void 0===g?"":g,h=e.getOptionLabel,y=e.isOptionEqualToValue,O=e.multiple,P=e.handleRequest,S=e.disabled,_=e.renderOption,q=e.renderTags,D=e.limitTags,I=(0,o.Z)(e,T),E=(0,v.useState)(!1),k=(0,j.Z)(E,2),L=k[0],w=k[1],N=(0,v.useState)([]),z=(0,j.Z)(N,2),F=z[0],R=z[1],M=(0,v.useState)(""),G=(0,j.Z)(M,2),A=G[0],B=G[1],W=(0,v.useState)(!0),U=(0,j.Z)(W,2),H=U[0],Q=U[1],X=H&&L&&0===F.length,$=(0,i.bc)({name:a,control:t,rules:d,defaultValue:m}),J=$.field,K=J.ref,Y=J.onChange,ee=(0,o.Z)(J,V),ae=$.fieldState.error;(0,v.useEffect)((function(){var e=!0,a=function(){var e=(0,x.Z)((0,b.Z)().mark((function e(){return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P(A);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(X)return e&&a(),function(){e=!1}}),[X]),(0,v.useEffect)((function(){L||(R([]),Q(!0))}),[L]),(0,v.useEffect)((function(){null!==c&&(R(c),Q(!1))}),[c]);var te=(0,v.useCallback)(function(e,a){var t;return function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];clearTimeout(t),t=setTimeout((function(){return e.apply(void 0,r)}),a)}}((function(){R([]),Q(!0)}),500),[]);return(0,s.jsx)(f.Z,{multiple:O,id:"autocomplete-".concat(a),options:F,open:L,onOpen:function(){w(!0),Q(!0)},onClose:function(){w(!1)},onChange:function(e,a){Y(a)},inputValue:A,onInputChange:function(e,a){B(a),"change"===(null===e||void 0===e?void 0:e.type)&&te()},getOptionLabel:h,isOptionEqualToValue:y,loading:X,loadingText:"Cargando...",noOptionsText:"No hay resultados",renderTags:q,disabled:S,renderOption:_,limitTags:D,renderInput:function(e){return(0,s.jsx)(l.Z,(0,r.Z)((0,r.Z)((0,r.Z)((0,r.Z)({},e),ee),I),{},{inputRef:K,error:Boolean(ae),helperText:ae?ae.message:Z,InputProps:(0,r.Z)((0,r.Z)({},e.InputProps),{},{endAdornment:(0,s.jsxs)(s.Fragment,{children:[X?(0,s.jsx)(C.Z,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})})}))}})}},20310:function(e,a,t){t.d(a,{g:function(){return m}});var n=t(1413),r=t(45987),o=(t(72791),t(81898)),l=t(40508),i=t(37168),d=t(37924),s=t(61134),u=t(80184),c=["name","label","control","helperText","defaultValue","rules","children"],p=["ref"];function m(e){var a=e.name,t=e.label,m=e.control,f=e.helperText,v=void 0===f?"":f,g=e.defaultValue,Z=void 0===g?"":g,h=e.rules,b=void 0===h?{required:"* Campo requerido"}:h,x=e.children,j=(0,r.Z)(e,c),C=(0,s.bc)({name:a,control:m,rules:b,defaultValue:Z}),T=C.field,V=(T.ref,(0,r.Z)(T,p)),y=C.fieldState,O=y.invalid,P=y.error;return(0,u.jsxs)(o.Z,(0,n.Z)((0,n.Z)({},j),{},{error:O,children:[(0,u.jsx)(l.Z,{id:a+"-label",children:t}),(0,u.jsx)(i.Z,(0,n.Z)((0,n.Z)({labelId:a+"-label",label:t,id:a},V),{},{children:x})),(0,u.jsx)(d.Z,{children:P?P.message:v})]}))}},70713:function(e,a,t){t.r(a),t.d(a,{default:function(){return s}});t(72791);var n=t(61134),r=t(80842),o=t(59434),l=t(5016),i=t(84955),d=t(80184);function s(){var e=(0,o.v9)((function(e){return{user:e.auth.user,loading:e.requestStatus.personalData.loadingPDP}})),a=e.user,t=e.loading,s=(0,o.I0)(),u=(0,n.cI)(),c=u.handleSubmit,p=u.control,m=function(e){var a=e.user;s((0,l.Al)({user:a}))};return(0,d.jsx)("form",{autoComplete:"off",onSubmit:c((function(e){e._method="PUT",s((0,i.V)({submitData:e,loading:"loadingPDP",personal:!0,handleUpdate:m}))})),children:(0,d.jsx)(r.PDPadreForm,{control:p,user:a,loading:t})})}},80842:function(e,a,t){t.r(a),t.d(a,{PDPadreForm:function(){return g},default:function(){return Z}});t(72791);var n=t(57689),r=t(45953),o=t(4565),l=t(50228),i=t(81872),d=t(35702),s=t(39709),u=t(61134),c=t(20310),p=t(99507),m=t(59434),f=t(84955),v=t(80184);function g(e){var a=e.control,t=e.loading,n=e.user,u=e.buttonDisable;return(0,v.jsxs)(r.ZP,{container:!0,spacing:2,children:[(0,v.jsxs)(r.ZP,{item:!0,xs:12,children:[(0,v.jsx)(o.Z,{variant:"h6",component:"span",className:"text__bold--semi",children:"Datos del padre"}),(0,v.jsx)(l.Z,{mt:1,children:(0,v.jsx)(i.Z,{})})]}),(0,v.jsx)(r.ZP,{item:!0,xs:12,children:(0,v.jsxs)(c.g,{name:"personal_data.padre_nacionalidad",label:"Nacionalidad",defaultValue:n.personal_data.padre_nacionalidad||"",control:a,disabled:t,size:"small",fullWidth:!0,children:[(0,v.jsx)(d.Z,{value:"",children:(0,v.jsx)("em",{children:"Ninguno"})}),(0,v.jsx)(d.Z,{value:"V",children:"Venezolano"}),(0,v.jsx)(d.Z,{value:"E",children:"Extranjero"})]})}),(0,v.jsx)(r.ZP,{item:!0,xs:12,children:(0,v.jsx)(p.cl,{control:a,rules:{required:"* Campo requerido",minLength:{value:7,message:"Error: Demaciado corto"},maxLength:{value:14,message:"Error: Demaciado largo"},pattern:{value:/^[0-9]*$/,message:"Error: Solo n\xfameros"}},defaultValue:n.personal_data.padre_cedula||"",name:"personal_data.padre_cedula",label:"C\xe9dula",size:"small",variant:"outlined",fullWidth:!0,disabled:t})}),(0,v.jsx)(r.ZP,{item:!0,xs:12,children:(0,v.jsx)(p.cl,{control:a,rules:{required:"* Campo requerido",minLength:{value:8,message:"Error: Demaciado corto"},maxLength:{value:90,message:"Error: Demaciado largo"}},defaultValue:n.personal_data.padre_nombre||"",name:"personal_data.padre_nombre",label:"Nombre y apellido",size:"small",variant:"outlined",fullWidth:!0,disabled:t})}),(0,v.jsx)(r.ZP,{item:!0,xs:12,children:(0,v.jsx)(p.gT,{control:a,rules:{required:"* Campo requerido",minLength:{value:12,message:"Error: No v\xe1lido"}},defaultValue:n.personal_data.padre_telefono||"58",name:"personal_data.padre_telefono",label:"Tel\xe9fono",variant:"outlined",size:"small",format:"+## (###) ###-####",fullWidth:!0,disabled:t})}),(0,v.jsx)(r.ZP,{item:!0,xs:12,children:(0,v.jsx)(p.cl,{control:a,rules:{required:"* Campo requerido",minLength:{value:10,message:"Error: Demaciado corto"},maxLength:{value:100,message:"Error: Demaciado largo"}},defaultValue:n.personal_data.padre_direccion||"",name:"personal_data.padre_direccion",label:"Direcci\xf3n de domicilio",size:"small",variant:"outlined",fullWidth:!0,disabled:t})}),!u&&(0,v.jsx)(r.ZP,{container:!0,justifyContent:"flex-end",item:!0,xs:12,children:(0,v.jsx)(s.Z,{variant:"contained",loading:t,disableElevation:!0,type:"submit",children:"Actualizar"})})]})}function Z(){var e=(0,n.UO)().id,a=(0,m.v9)((function(e){return{userSelected:e.requestStatus.userShow.userSelected,loading:e.requestStatus.personalData.loadingPDP}})),t=a.userSelected,r=a.loading,o=(0,m.I0)(),l=(0,u.cI)({shouldUnregister:!0}),i=l.handleSubmit,d=l.control;return(0,v.jsx)("form",{autoComplete:"off",onSubmit:i((function(a){a._method="PUT",o((0,f.V)({submitData:a,id:e,loading:"loadingPDP"}))})),children:(0,v.jsx)(g,{control:d,user:t,loading:r})})}},35702:function(e,a,t){t.d(a,{Z:function(){return O}});var n=t(4942),r=t(63366),o=t(87462),l=t(72791),i=t(28182),d=t(94419),s=t(12065),u=t(60277),c=t(85513),p=t(98826),m=t(92842),f=t(93026),v=t(57933),g=t(87164),Z=t(39343),h=t(29282),b=t(75878),x=t(21217);function j(e){return(0,x.Z)("MuiMenuItem",e)}var C=(0,b.Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),T=t(80184),V=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],y=(0,u.ZP)(m.Z,{shouldForwardProp:function(e){return(0,u.FO)(e)||"classes"===e},name:"MuiMenuItem",slot:"Root",overridesResolver:function(e,a){var t=e.ownerState;return[a.root,t.dense&&a.dense,t.divider&&a.divider,!t.disableGutters&&a.gutters]}})((function(e){var a,t=e.theme,r=e.ownerState;return(0,o.Z)({},t.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!r.disableGutters&&{paddingLeft:16,paddingRight:16},r.divider&&{borderBottom:"1px solid ".concat((t.vars||t).palette.divider),backgroundClip:"padding-box"},(a={"&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},(0,n.Z)(a,"&.".concat(C.selected),(0,n.Z)({backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / ").concat(t.vars.palette.action.selectedOpacity,")"):(0,s.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity)},"&.".concat(C.focusVisible),{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / calc(").concat(t.vars.palette.action.selectedOpacity," + ").concat(t.vars.palette.action.focusOpacity,"))"):(0,s.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)})),(0,n.Z)(a,"&.".concat(C.selected,":hover"),{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / calc(").concat(t.vars.palette.action.selectedOpacity," + ").concat(t.vars.palette.action.hoverOpacity,"))"):(0,s.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / ").concat(t.vars.palette.action.selectedOpacity,")"):(0,s.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity)}}),(0,n.Z)(a,"&.".concat(C.focusVisible),{backgroundColor:(t.vars||t).palette.action.focus}),(0,n.Z)(a,"&.".concat(C.disabled),{opacity:(t.vars||t).palette.action.disabledOpacity}),(0,n.Z)(a,"& + .".concat(g.Z.root),{marginTop:t.spacing(1),marginBottom:t.spacing(1)}),(0,n.Z)(a,"& + .".concat(g.Z.inset),{marginLeft:52}),(0,n.Z)(a,"& .".concat(h.Z.root),{marginTop:0,marginBottom:0}),(0,n.Z)(a,"& .".concat(h.Z.inset),{paddingLeft:36}),(0,n.Z)(a,"& .".concat(Z.Z.root),{minWidth:36}),a),!r.dense&&(0,n.Z)({},t.breakpoints.up("sm"),{minHeight:"auto"}),r.dense&&(0,o.Z)({minHeight:32,paddingTop:4,paddingBottom:4},t.typography.body2,(0,n.Z)({},"& .".concat(Z.Z.root," svg"),{fontSize:"1.25rem"})))})),O=l.forwardRef((function(e,a){var t=(0,c.Z)({props:e,name:"MuiMenuItem"}),n=t.autoFocus,s=void 0!==n&&n,u=t.component,m=void 0===u?"li":u,g=t.dense,Z=void 0!==g&&g,h=t.divider,b=void 0!==h&&h,x=t.disableGutters,C=void 0!==x&&x,O=t.focusVisibleClassName,P=t.role,S=void 0===P?"menuitem":P,_=t.tabIndex,q=t.className,D=(0,r.Z)(t,V),I=l.useContext(p.Z),E=l.useMemo((function(){return{dense:Z||I.dense||!1,disableGutters:C}}),[I.dense,Z,C]),k=l.useRef(null);(0,f.Z)((function(){s&&k.current&&k.current.focus()}),[s]);var L,w=(0,o.Z)({},t,{dense:E.dense,divider:b,disableGutters:C}),N=function(e){var a=e.disabled,t=e.dense,n=e.divider,r=e.disableGutters,l=e.selected,i=e.classes,s={root:["root",t&&"dense",a&&"disabled",!r&&"gutters",n&&"divider",l&&"selected"]},u=(0,d.Z)(s,j,i);return(0,o.Z)({},i,u)}(t),z=(0,v.Z)(k,a);return t.disabled||(L=void 0!==_?_:-1),(0,T.jsx)(p.Z.Provider,{value:E,children:(0,T.jsx)(y,(0,o.Z)({ref:z,role:S,tabIndex:L,component:m,focusVisibleClassName:(0,i.Z)(N.focusVisible,O),className:(0,i.Z)(N.root,q)},D,{ownerState:w,classes:N}))})}))}}]);
//# sourceMappingURL=713.9821f1db.chunk.js.map