"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[1948],{19840:function(e,t,n){n.d(t,{c:function(){return s}});var r=n(1413),a=n(45987),o=n(48550),i=n(61134),l=n(80184),u=["name","control","rules","defaultValue","helperText"],d=["ref"];function s(e){var t=e.name,n=e.control,s=e.rules,c=void 0===s?null:s,f=e.defaultValue,p=void 0===f?"":f,h=e.helperText,v=void 0===h?"":h,m=(0,a.Z)(e,u),g=(0,i.bc)({name:t,control:n,rules:c,defaultValue:p}),x=g.field,Z=x.ref,b=(0,a.Z)(x,d),j=g.fieldState,_=j.invalid,S=j.error;return(0,l.jsx)(o.Z,(0,r.Z)((0,r.Z)((0,r.Z)({inputRef:Z},b),m),{},{error:_,helperText:S?S.message:v}))}},18493:function(e,t,n){n.d(t,{Q:function(){return m}});var r=n(1413),a=n(29439),o=n(45987),i=n(72791),l=n(48550),u=n(63466),d=n(13400),s=n(3746),c=n(20165),f=n(61134),p=n(80184),h=["name","control","rules","defaultValue","helperText"],v=["ref"];function m(e){var t=e.name,n=e.control,m=e.rules,g=void 0===m?null:m,x=e.defaultValue,Z=void 0===x?"":x,b=e.helperText,j=void 0===b?"":b,_=(0,o.Z)(e,h),S=(0,i.useState)(!1),V=(0,a.Z)(S,2),w=V[0],T=V[1],C=(0,f.bc)({name:t,control:n,rules:g,defaultValue:Z}),O=C.field,q=O.ref,A=(0,o.Z)(O,v),I=C.fieldState,L=I.invalid,P=I.error;return(0,p.jsx)(l.Z,(0,r.Z)((0,r.Z)((0,r.Z)({inputRef:q},A),_),{},{error:L,helperText:P?P.message:j,type:w?"text":"password",InputProps:{endAdornment:(0,p.jsx)(u.Z,{position:"end",children:(0,p.jsx)(d.Z,{onClick:function(){T(!w)},size:null===_||void 0===_?void 0:_.size,children:w?(0,p.jsx)(c.Z,{}):(0,p.jsx)(s.Z,{})})})}}))}},99507:function(e,t,n){n.d(t,{yh:function(){return w},mX:function(){return x},cl:function(){return r.c},gT:function(){return f},Q:function(){return p.Q}});var r=n(19840),a=n(1413),o=n(45987),i=n(48550),l=n(61134),u=n(30948),d=n(80184),s=["name","control","rules","defaultValue","helperText"],c=["ref","onChange"];function f(e){var t=e.name,n=e.control,r=e.rules,f=void 0===r?null:r,p=e.defaultValue,h=void 0===p?"":p,v=e.helperText,m=void 0===v?"":v,g=(0,o.Z)(e,s),x=(0,l.bc)({name:t,control:n,rules:f,defaultValue:h}),Z=x.field,b=(Z.ref,Z.onChange),j=(0,o.Z)(Z,c),_=x.fieldState,S=_.invalid,V=_.error;return(0,d.jsx)(u.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},j),g),{},{customInput:i.Z,error:S,onValueChange:function(e){b((null===e||void 0===e?void 0:e.value)||"")},helperText:V?V.message:m,mask:"_"}))}var p=n(18493),h=n(92343),v=n(72791),m=["multiple","options","name","control","defaultValue","rules","isOptionEqualToValue","getOptionLabel","helperText","disabled"],g=["ref","onChange"];function x(e){var t=e.multiple,n=e.options,r=e.name,u=e.control,s=e.defaultValue,c=e.rules,f=void 0===c?{required:"* Campo requerido"}:c,p=e.isOptionEqualToValue,v=e.getOptionLabel,x=e.helperText,Z=e.disabled,b=(0,o.Z)(e,m),j=(0,l.bc)({name:r,control:u,rules:f,defaultValue:s}),_=j.field,S=_.ref,V=_.onChange,w=(0,o.Z)(_,g),T=j.fieldState,C=T.invalid,O=T.error;return(0,d.jsx)(h.Z,(0,a.Z)((0,a.Z)({},w),{},{onChange:function(e,t){V(t)},multiple:t,options:n,noOptionsText:"No hay resultados",getOptionLabel:v,isOptionEqualToValue:p,disabled:Z,renderInput:function(e){return(0,d.jsx)(i.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},e),b),{},{inputRef:S,error:C,helperText:O?O.message:x}))}}))}var Z=n(74165),b=n(15861),j=n(29439),_=n(13239);var S=["name","control","rules","data","defaultValue","helperText","getOptionLabel","isOptionEqualToValue","multiple","handleRequest","disabled","renderOption"],V=["ref","onChange"];function w(e){var t=e.name,n=e.control,r=e.rules,u=void 0===r?null:r,s=e.data,c=void 0===s?[]:s,f=e.defaultValue,p=void 0===f?"":f,m=e.helperText,g=void 0===m?"":m,x=e.getOptionLabel,w=e.isOptionEqualToValue,T=e.multiple,C=e.handleRequest,O=e.disabled,q=e.renderOption,A=(0,o.Z)(e,S),I=(0,v.useState)(!1),L=(0,j.Z)(I,2),P=L[0],N=L[1],R=(0,v.useState)([]),y=(0,j.Z)(R,2),E=y[0],k=y[1],D=(0,v.useState)(""),z=(0,j.Z)(D,2),W=z[0],B=z[1],F=(0,v.useState)(!0),M=(0,j.Z)(F,2),Q=M[0],U=M[1],X=Q&&P&&0===E.length,Y=(0,l.bc)({name:t,control:n,rules:u,defaultValue:p}),G=Y.field,H=G.ref,J=G.onChange,K=(0,o.Z)(G,V),$=Y.fieldState.error;(0,v.useEffect)((function(){var e=!0,t=function(){var e=(0,b.Z)((0,Z.Z)().mark((function e(){return(0,Z.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C(W);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(X)return e&&t(),function(){e=!1}}),[X]),(0,v.useEffect)((function(){P||(k([]),U(!0))}),[P]),(0,v.useEffect)((function(){null!==c&&(k(c),U(!1))}),[c]);var ee=(0,v.useCallback)(function(e,t){var n;return function(){for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];clearTimeout(n),n=setTimeout((function(){return e.apply(void 0,a)}),t)}}((function(){k([]),U(!0)}),500),[]);return(0,d.jsx)(h.Z,{multiple:T,id:"autocomplete-".concat(t),options:E,open:P,onOpen:function(){N(!0),U(!0)},onClose:function(){N(!1)},onChange:function(e,t){J(t)},inputValue:W,onInputChange:function(e,t){B(t),"change"===(null===e||void 0===e?void 0:e.type)&&ee()},getOptionLabel:x,isOptionEqualToValue:w,loading:X,loadingText:"Cargando...",noOptionsText:"No hay resultados",disabled:O,renderOption:q,renderInput:function(e){return(0,d.jsx)(i.Z,(0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)({},e),K),A),{},{inputRef:H,error:Boolean($),helperText:$?$.message:g,InputProps:(0,a.Z)((0,a.Z)({},e.InputProps),{},{endAdornment:(0,d.jsxs)(v.Fragment,{children:[X?(0,d.jsx)(_.Z,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})})}))}})}},6122:function(e,t,n){n.d(t,{V:function(){return c}});var r=n(1413),a=(n(72791),n(68096)),o=n(17133),i=n(10765),l=n(85523),u=n(61419),d=n(61134),s=n(80184);function c(e){var t=e.disabled,n=e.label,c=e.name,f=e.control,p=e.defaultValue,h=e.row,v=e.radioList,m=e.rules,g=void 0===m?{required:"* Campo requerido"}:m,x=(0,d.bc)({name:c,control:f,rules:g,defaultValue:p}),Z=Object.assign({},x.field),b=x.fieldState.invalid;return(0,s.jsxs)(a.Z,{error:b,component:"fieldset",disabled:t,children:[(0,s.jsx)(o.Z,{component:"legend",children:n}),(0,s.jsx)(i.Z,(0,r.Z)((0,r.Z)({},Z),{},{"aria-label":n,row:h,children:v.map((function(e,t){return(0,s.jsx)(l.Z,{value:e.value,control:(0,s.jsx)(u.Z,{}),label:e.label},t)}))}))]})}},51948:function(e,t,n){n.r(t),n.d(t,{POtrosForm:function(){return v},default:function(){return m}});n(72791);var r=n(16871),a=n(61889),o=n(20890),i=n(68870),l=n(94721),u=n(39709),d=n(61134),s=n(99507),c=n(6122),f=n(16030),p=n(84955),h=n(80184);function v(e){var t=e.control,n=e.loading,r=e.user,f=e.handleSubmit,p=e.buttonDisable,v=(0,d.qo)({control:t,name:"personal_data.estudi_otros_alojado",defaultValue:r.personal_data.estudi_otros_alojado});return(0,h.jsxs)(a.ZP,{container:!0,spacing:2,children:[(0,h.jsxs)(a.ZP,{item:!0,xs:12,children:[(0,h.jsx)(o.Z,{variant:"h6",component:"span",className:"text__bold--semi",children:"Otros datos del estudiante"}),(0,h.jsx)(i.Z,{mt:1,children:(0,h.jsx)(l.Z,{})})]}),(0,h.jsx)(a.ZP,{item:!0,xs:12,children:(0,h.jsx)(c.V,{control:t,defaultValue:r.personal_data.estudi_otros_canaima||"No",disabled:n,label:"\xbfTiene canaima?",name:"personal_data.estudi_otros_canaima",row:!0,radioList:[{value:"Si",label:"Si"},{value:"No",label:"No"}]})}),(0,h.jsx)(a.ZP,{item:!0,xs:12,children:(0,h.jsx)(c.V,{control:t,defaultValue:r.personal_data.estudi_otros_beca||"No",disabled:n,label:"\xbfTiene beca?",name:"personal_data.estudi_otros_beca",row:!0,radioList:[{value:"Si",label:"Si"},{value:"No",label:"No"}]})}),(0,h.jsx)(a.ZP,{item:!0,xs:12,children:(0,h.jsx)(c.V,{control:t,defaultValue:r.personal_data.estudi_otros_alojado||"Si",disabled:n,label:"\xbfVive con el representante?",name:"personal_data.estudi_otros_alojado",row:!0,radioList:[{value:"Si",label:"Si"},{value:"No",label:"No"}]})}),"No"===v&&(0,h.jsx)(a.ZP,{item:!0,xs:12,children:(0,h.jsx)(s.cl,{control:t,rules:{required:"* Campo requerido",minLength:{value:10,message:"Error: Demaciado corto"},maxLength:{value:40,message:"Error: Demaciado largo"}},defaultValue:r.personal_data.estudi_otros_direccion||"",name:"personal_data.estudi_otros_direccion",label:"Direccion",variant:"outlined",size:"small",fullWidth:!0,disabled:n})}),!p&&(0,h.jsx)(a.ZP,{container:!0,justifyContent:"flex-end",item:!0,xs:12,children:(0,h.jsx)(u.Z,{variant:"contained",loading:n,disableElevation:!0,onClick:f,children:"Actualizar"})})]})}function m(){var e=(0,r.UO)().id,t=(0,f.v9)((function(e){return{userSelected:e.requestStatus.userShow.userSelected,loading:e.requestStatus.personalData.loadingPO}})),n=t.userSelected,a=t.loading,o=(0,f.I0)(),l=(0,d.cI)({shouldUnregister:!0}),u=l.handleSubmit,s=l.control;return(0,h.jsx)(i.Z,{mb:4,children:(0,h.jsx)(v,{control:s,user:n,handleSubmit:u((function(t){"Si"===t.personal_data.estudi_otros_alojado&&(t.personal_data.estudi_otros_direccion=null),t._method="PUT",o((0,p.V)({submitData:t,id:e,loading:"loadingPO"}))})),loading:a})})}},94721:function(e,t,n){var r=n(63366),a=n(87462),o=n(72791),i=n(28182),l=n(94419),u=n(12065),d=n(66934),s=n(31402),c=n(90133),f=n(80184),p=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],h=(0,d.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,n.absolute&&t.absolute,t[n.variant],n.light&&t.light,"vertical"===n.orientation&&t.vertical,n.flexItem&&t.flexItem,n.children&&t.withChildren,n.children&&"vertical"===n.orientation&&t.withChildrenVertical,"right"===n.textAlign&&"vertical"!==n.orientation&&t.textAlignRight,"left"===n.textAlign&&"vertical"!==n.orientation&&t.textAlignLeft]}})((function(e){var t=e.theme,n=e.ownerState;return(0,a.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},n.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},n.light&&{borderColor:t.vars?"rgba(".concat(t.vars.palette.dividerChannel," / 0.08)"):(0,u.Fq)(t.palette.divider,.08)},"inset"===n.variant&&{marginLeft:72},"middle"===n.variant&&"horizontal"===n.orientation&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},"middle"===n.variant&&"vertical"===n.orientation&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},"vertical"===n.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},n.flexItem&&{alignSelf:"stretch",height:"auto"})}),(function(e){var t=e.theme,n=e.ownerState;return(0,a.Z)({},n.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{position:"relative",width:"100%",borderTop:"thin solid ".concat((t.vars||t).palette.divider),top:"50%",content:'""',transform:"translateY(50%)"}})}),(function(e){var t=e.theme,n=e.ownerState;return(0,a.Z)({},n.children&&"vertical"===n.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",top:"0%",left:"50%",borderTop:0,borderLeft:"thin solid ".concat((t.vars||t).palette.divider),transform:"translateX(0%)"}})}),(function(e){var t=e.ownerState;return(0,a.Z)({},"right"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})})),v=(0,d.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:function(e,t){var n=e.ownerState;return[t.wrapper,"vertical"===n.orientation&&t.wrapperVertical]}})((function(e){var t=e.theme,n=e.ownerState;return(0,a.Z)({display:"inline-block",paddingLeft:"calc(".concat(t.spacing(1)," * 1.2)"),paddingRight:"calc(".concat(t.spacing(1)," * 1.2)")},"vertical"===n.orientation&&{paddingTop:"calc(".concat(t.spacing(1)," * 1.2)"),paddingBottom:"calc(".concat(t.spacing(1)," * 1.2)")})})),m=o.forwardRef((function(e,t){var n=(0,s.Z)({props:e,name:"MuiDivider"}),o=n.absolute,u=void 0!==o&&o,d=n.children,m=n.className,g=n.component,x=void 0===g?d?"div":"hr":g,Z=n.flexItem,b=void 0!==Z&&Z,j=n.light,_=void 0!==j&&j,S=n.orientation,V=void 0===S?"horizontal":S,w=n.role,T=void 0===w?"hr"!==x?"separator":void 0:w,C=n.textAlign,O=void 0===C?"center":C,q=n.variant,A=void 0===q?"fullWidth":q,I=(0,r.Z)(n,p),L=(0,a.Z)({},n,{absolute:u,component:x,flexItem:b,light:_,orientation:V,role:T,textAlign:O,variant:A}),P=function(e){var t=e.absolute,n=e.children,r=e.classes,a=e.flexItem,o=e.light,i=e.orientation,u=e.textAlign,d={root:["root",t&&"absolute",e.variant,o&&"light","vertical"===i&&"vertical",a&&"flexItem",n&&"withChildren",n&&"vertical"===i&&"withChildrenVertical","right"===u&&"vertical"!==i&&"textAlignRight","left"===u&&"vertical"!==i&&"textAlignLeft"],wrapper:["wrapper","vertical"===i&&"wrapperVertical"]};return(0,l.Z)(d,c.V,r)}(L);return(0,f.jsx)(h,(0,a.Z)({as:x,className:(0,i.Z)(P.root,m),role:T,ref:t,ownerState:L},I,{children:d?(0,f.jsx)(v,{className:P.wrapper,ownerState:L,children:d}):null}))}));t.Z=m}}]);
//# sourceMappingURL=1948.87d01bcf.chunk.js.map