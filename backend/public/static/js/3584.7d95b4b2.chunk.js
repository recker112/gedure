"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[3584,9257],{19840:function(e,t,r){r.d(t,{c:function(){return s}});var n=r(1413),a=r(45987),o=r(48550),l=r(61134),i=r(80184),u=["name","control","rules","defaultValue","helperText"],d=["ref"];function s(e){var t=e.name,r=e.control,s=e.rules,c=void 0===s?null:s,p=e.defaultValue,f=void 0===p?"":p,m=e.helperText,h=void 0===m?"":m,v=(0,a.Z)(e,u),g=(0,l.bc)({name:t,control:r,rules:c,defaultValue:f}),x=g.field,Z=x.ref,b=(0,a.Z)(x,d),_=g.fieldState,j=_.invalid,w=_.error;return(0,i.jsx)(o.Z,(0,n.Z)((0,n.Z)((0,n.Z)({inputRef:Z},b),v),{},{error:j,helperText:w?w.message:h}))}},18493:function(e,t,r){r.d(t,{Q:function(){return v}});var n=r(1413),a=r(29439),o=r(45987),l=r(72791),i=r(48550),u=r(63466),d=r(13400),s=r(3746),c=r(20165),p=r(61134),f=r(80184),m=["name","control","rules","defaultValue","helperText"],h=["ref"];function v(e){var t=e.name,r=e.control,v=e.rules,g=void 0===v?null:v,x=e.defaultValue,Z=void 0===x?"":x,b=e.helperText,_=void 0===b?"":b,j=(0,o.Z)(e,m),w=(0,l.useState)(!1),S=(0,a.Z)(w,2),V=S[0],T=S[1],C=(0,p.bc)({name:t,control:r,rules:g,defaultValue:Z}),A=C.field,E=A.ref,R=(0,o.Z)(A,h),q=C.fieldState,I=q.invalid,O=q.error;return(0,f.jsx)(i.Z,(0,n.Z)((0,n.Z)((0,n.Z)({inputRef:E},R),j),{},{error:I,helperText:O?O.message:_,type:V?"text":"password",InputProps:{endAdornment:(0,f.jsx)(u.Z,{position:"end",children:(0,f.jsx)(d.Z,{onClick:function(){T(!V)},size:null===j||void 0===j?void 0:j.size,children:V?(0,f.jsx)(c.Z,{}):(0,f.jsx)(s.Z,{})})})}}))}},99507:function(e,t,r){r.d(t,{yh:function(){return T},mX:function(){return x},cl:function(){return n.c},gT:function(){return p},Q:function(){return f.Q}});var n=r(19840),a=r(1413),o=r(45987),l=r(48550),i=r(61134),u=r(30948),d=r(80184),s=["name","control","rules","defaultValue","helperText"],c=["ref","onChange"];function p(e){var t=e.name,r=e.control,n=e.rules,p=void 0===n?null:n,f=e.defaultValue,m=void 0===f?"":f,h=e.helperText,v=void 0===h?"":h,g=(0,o.Z)(e,s),x=(0,i.bc)({name:t,control:r,rules:p,defaultValue:m}),Z=x.field,b=(Z.ref,Z.onChange),_=(0,o.Z)(Z,c),j=x.fieldState,w=j.invalid,S=j.error;return(0,d.jsx)(u.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},_),g),{},{customInput:l.Z,error:w,onValueChange:function(e){b((null===e||void 0===e?void 0:e.value)||"")},helperText:S?S.message:v,mask:"_"}))}var f=r(18493),m=r(92343),h=r(72791),v=["multiple","options","name","control","defaultValue","rules","isOptionEqualToValue","getOptionLabel","helperText","disabled"],g=["ref","onChange"];function x(e){var t=e.multiple,r=e.options,n=e.name,u=e.control,s=e.defaultValue,c=e.rules,p=void 0===c?{required:"* Campo requerido"}:c,f=e.isOptionEqualToValue,h=e.getOptionLabel,x=e.helperText,Z=e.disabled,b=(0,o.Z)(e,v),_=(0,i.bc)({name:n,control:u,rules:p,defaultValue:s}),j=_.field,w=j.ref,S=j.onChange,V=(0,o.Z)(j,g),T=_.fieldState,C=T.invalid,A=T.error;return(0,d.jsx)(m.Z,(0,a.Z)((0,a.Z)({},V),{},{onChange:function(e,t){S(t)},multiple:t,options:r,noOptionsText:"No hay resultados",getOptionLabel:h,isOptionEqualToValue:f,disabled:Z,renderInput:function(e){return(0,d.jsx)(l.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},e),b),{},{inputRef:w,error:C,helperText:A?A.message:x}))}}))}var Z=r(15861),b=r(29439),_=r(87757),j=r.n(_),w=r(13239);var S=["name","control","rules","data","defaultValue","helperText","getOptionLabel","isOptionEqualToValue","multiple","handleRequest","disabled","renderOption"],V=["ref","onChange"];function T(e){var t=e.name,r=e.control,n=e.rules,u=void 0===n?null:n,s=e.data,c=void 0===s?[]:s,p=e.defaultValue,f=void 0===p?"":p,v=e.helperText,g=void 0===v?"":v,x=e.getOptionLabel,_=e.isOptionEqualToValue,T=e.multiple,C=e.handleRequest,A=e.disabled,E=e.renderOption,R=(0,o.Z)(e,S),q=(0,h.useState)(!1),I=(0,b.Z)(q,2),O=I[0],L=I[1],P=(0,h.useState)([]),D=(0,b.Z)(P,2),y=D[0],N=D[1],k=(0,h.useState)(""),z=(0,b.Z)(k,2),W=z[0],U=z[1],B=(0,h.useState)(!0),F=(0,b.Z)(B,2),M=F[0],Q=F[1],X=M&&O&&0===y.length,Y=(0,i.bc)({name:t,control:r,rules:u,defaultValue:f}),G=Y.field,H=G.ref,J=G.onChange,K=(0,o.Z)(G,V),$=Y.fieldState.error;(0,h.useEffect)((function(){var e=!0,t=function(){var e=(0,Z.Z)(j().mark((function e(){return j().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C(W);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(X)return e&&t(),function(){e=!1}}),[X]),(0,h.useEffect)((function(){O||(N([]),Q(!0))}),[O]),(0,h.useEffect)((function(){null!==c&&(N(c),Q(!1))}),[c]);var ee=(0,h.useCallback)(function(e,t){var r;return function(){for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];clearTimeout(r),r=setTimeout((function(){return e.apply(void 0,a)}),t)}}((function(){N([]),Q(!0)}),500),[]);return(0,d.jsx)(m.Z,{multiple:T,id:"autocomplete-".concat(t),options:y,open:O,onOpen:function(){L(!0),Q(!0)},onClose:function(){L(!1)},onChange:function(e,t){J(t)},inputValue:W,onInputChange:function(e,t){U(t),"change"===(null===e||void 0===e?void 0:e.type)&&ee()},getOptionLabel:x,isOptionEqualToValue:_,loading:X,loadingText:"Cargando...",noOptionsText:"No hay resultados",disabled:A,renderOption:E,renderInput:function(e){return(0,d.jsx)(l.Z,(0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)({},e),K),R),{},{inputRef:H,error:Boolean($),helperText:$?$.message:g,InputProps:(0,a.Z)((0,a.Z)({},e.InputProps),{},{endAdornment:(0,d.jsxs)(h.Fragment,{children:[X?(0,d.jsx)(w.Z,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})})}))}})}},6122:function(e,t,r){r.d(t,{V:function(){return c}});var n=r(1413),a=(r(72791),r(68096)),o=r(17133),l=r(10765),i=r(85523),u=r(61419),d=r(61134),s=r(80184);function c(e){var t=e.disabled,r=e.label,c=e.name,p=e.control,f=e.defaultValue,m=e.row,h=e.radioList,v=e.rules,g=void 0===v?{required:"* Campo requerido"}:v,x=(0,d.bc)({name:c,control:p,rules:g,defaultValue:f}),Z=Object.assign({},x.field),b=x.fieldState.invalid;return(0,s.jsxs)(a.Z,{error:b,component:"fieldset",disabled:t,children:[(0,s.jsx)(o.Z,{component:"legend",children:r}),(0,s.jsx)(l.Z,(0,n.Z)((0,n.Z)({},Z),{},{"aria-label":r,row:m,children:h.map((function(e,t){return(0,s.jsx)(i.Z,{value:e.value,control:(0,s.jsx)(u.Z,{}),label:e.label},t)}))}))]})}},13584:function(e,t,r){r.r(t),r.d(t,{default:function(){return d}});r(72791);var n=r(61134),a=r(9257),o=r(16030),l=r(5016),i=r(19215),u=r(80184);function d(){var e=(0,o.v9)((function(e){return{user:e.auth.user,loading:e.gdUPD.loadingRE}})),t=e.user,r=e.loading,d=(0,o.I0)(),s=(0,n.cI)({shouldUnregister:!0}),c=s.handleSubmit,p=s.control,f=function(e){var t=e.user;d((0,l.Al)({user:t}))};return(0,u.jsx)(a.REmpleoForm,{control:p,user:t,handleSubmit:c((function(e){"No"===e.personal_data.repre_empleo&&(e.personal_data.repre_empleo_profesion=null,e.personal_data.repre_empleo_lugar=null),e._method="PUT",d((0,i.VA)({submitData:e,loading:"loadingRE",personal:!0,handleUpdate:f}))})),loading:r})}},9257:function(e,t,r){r.r(t),r.d(t,{REmpleoForm:function(){return h},default:function(){return v}});r(72791);var n=r(16871),a=r(61889),o=r(20890),l=r(68870),i=r(94721),u=r(39709),d=r(61134),s=r(99507),c=r(6122),p=r(16030),f=r(19215),m=r(80184);function h(e){var t=e.control,r=e.user,n=e.loading,p=e.handleSubmit,f=e.buttonDisable,h=(0,d.qo)({name:"personal_data.repre_empleo",control:t,defaultValue:r.personal_data.repre_empleo});return(0,m.jsxs)(a.ZP,{container:!0,spacing:2,children:[(0,m.jsxs)(a.ZP,{item:!0,xs:12,children:[(0,m.jsx)(o.Z,{variant:"h6",component:"span",className:"text__bold--semi",children:"Empleo del representante"}),(0,m.jsx)(l.Z,{mt:1,children:(0,m.jsx)(i.Z,{})})]}),(0,m.jsx)(a.ZP,{item:!0,xs:12,children:(0,m.jsx)(c.V,{control:t,defaultValue:r.personal_data.repre_empleo||"No",disabled:n,label:"\xbfTiene empleo?",name:"personal_data.repre_empleo",row:!0,radioList:[{value:"Si",label:"Si"},{value:"No",label:"No"}]})}),"Si"===h&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(a.ZP,{item:!0,xs:12,children:(0,m.jsx)(s.cl,{control:t,rules:{required:"* Campo requerido",minLength:{value:3,message:"Error: Demaciado corto"},maxLength:{value:30,message:"Error: Demaciado largo"}},defaultValue:r.personal_data.repre_empleo_profesion||"",name:"personal_data.repre_empleo_profesion",label:"Profesi\xf3n",size:"small",variant:"outlined",fullWidth:!0,disabled:n})}),(0,m.jsx)(a.ZP,{item:!0,xs:12,children:(0,m.jsx)(s.cl,{control:t,rules:{required:"* Campo requerido",minLength:{value:3,message:"Error: Demaciado corto"},maxLength:{value:30,message:"Error: Demaciado largo"}},defaultValue:r.personal_data.repre_empleo_lugar||"",name:"personal_data.repre_empleo_lugar",label:"Lugar donde trabaja",size:"small",variant:"outlined",fullWidth:!0,disabled:n})})]}),!f&&(0,m.jsx)(a.ZP,{container:!0,justifyContent:"flex-end",item:!0,xs:12,children:(0,m.jsx)(u.Z,{variant:"contained",loading:n,disableElevation:!0,onClick:p,children:"Actualizar"})})]})}function v(){var e=(0,n.UO)().id,t=(0,p.v9)((function(e){return{userSelected:e.requestStatus.userShow.userSelected,loading:e.requestStatus.personalData.loadingRE}})),r=t.userSelected,a=t.loading,o=(0,p.I0)(),l=(0,d.cI)({shouldUnregister:!0}),i=l.handleSubmit,u=l.control;return(0,m.jsx)(h,{control:u,user:r,handleSubmit:i((function(t){"No"===t.personal_data.repre_empleo&&(t.personal_data.repre_empleo_profesion=null,t.personal_data.repre_empleo_lugar=null),t._method="PUT",o((0,f.VA)({submitData:t,id:e,loading:"loadingRE"}))})),loading:a})}},94721:function(e,t,r){var n=r(63366),a=r(87462),o=r(72791),l=r(28182),i=r(12039),u=r(12065),d=r(47630),s=r(93736),c=r(90133),p=r(80184),f=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],m=(0,d.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState;return[t.root,r.absolute&&t.absolute,t[r.variant],r.light&&t.light,"vertical"===r.orientation&&t.vertical,r.flexItem&&t.flexItem,r.children&&t.withChildren,r.children&&"vertical"===r.orientation&&t.withChildrenVertical,"right"===r.textAlign&&"vertical"!==r.orientation&&t.textAlignRight,"left"===r.textAlign&&"vertical"!==r.orientation&&t.textAlignLeft]}})((function(e){var t=e.theme,r=e.ownerState;return(0,a.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},r.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},r.light&&{borderColor:t.vars?"rgba(".concat(t.vars.palette.dividerChannel," / 0.08)"):(0,u.Fq)(t.palette.divider,.08)},"inset"===r.variant&&{marginLeft:72},"middle"===r.variant&&"horizontal"===r.orientation&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},"middle"===r.variant&&"vertical"===r.orientation&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},"vertical"===r.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},r.flexItem&&{alignSelf:"stretch",height:"auto"})}),(function(e){var t=e.theme,r=e.ownerState;return(0,a.Z)({},r.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{position:"relative",width:"100%",borderTop:"thin solid ".concat((t.vars||t).palette.divider),top:"50%",content:'""',transform:"translateY(50%)"}})}),(function(e){var t=e.theme,r=e.ownerState;return(0,a.Z)({},r.children&&"vertical"===r.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",top:"0%",left:"50%",borderTop:0,borderLeft:"thin solid ".concat((t.vars||t).palette.divider),transform:"translateX(0%)"}})}),(function(e){var t=e.ownerState;return(0,a.Z)({},"right"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})})),h=(0,d.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:function(e,t){var r=e.ownerState;return[t.wrapper,"vertical"===r.orientation&&t.wrapperVertical]}})((function(e){var t=e.theme,r=e.ownerState;return(0,a.Z)({display:"inline-block",paddingLeft:"calc(".concat(t.spacing(1)," * 1.2)"),paddingRight:"calc(".concat(t.spacing(1)," * 1.2)")},"vertical"===r.orientation&&{paddingTop:"calc(".concat(t.spacing(1)," * 1.2)"),paddingBottom:"calc(".concat(t.spacing(1)," * 1.2)")})})),v=o.forwardRef((function(e,t){var r=(0,s.Z)({props:e,name:"MuiDivider"}),o=r.absolute,u=void 0!==o&&o,d=r.children,v=r.className,g=r.component,x=void 0===g?d?"div":"hr":g,Z=r.flexItem,b=void 0!==Z&&Z,_=r.light,j=void 0!==_&&_,w=r.orientation,S=void 0===w?"horizontal":w,V=r.role,T=void 0===V?"hr"!==x?"separator":void 0:V,C=r.textAlign,A=void 0===C?"center":C,E=r.variant,R=void 0===E?"fullWidth":E,q=(0,n.Z)(r,f),I=(0,a.Z)({},r,{absolute:u,component:x,flexItem:b,light:j,orientation:S,role:T,textAlign:A,variant:R}),O=function(e){var t=e.absolute,r=e.children,n=e.classes,a=e.flexItem,o=e.light,l=e.orientation,u=e.textAlign,d={root:["root",t&&"absolute",e.variant,o&&"light","vertical"===l&&"vertical",a&&"flexItem",r&&"withChildren",r&&"vertical"===l&&"withChildrenVertical","right"===u&&"vertical"!==l&&"textAlignRight","left"===u&&"vertical"!==l&&"textAlignLeft"],wrapper:["wrapper","vertical"===l&&"wrapperVertical"]};return(0,i.Z)(d,c.V,n)}(I);return(0,p.jsx)(m,(0,a.Z)({as:x,className:(0,l.Z)(O.root,v),role:T,ref:t,ownerState:I},q,{children:d?(0,p.jsx)(h,{className:O.wrapper,ownerState:I,children:d}):null}))}));t.Z=v}}]);
//# sourceMappingURL=3584.7d95b4b2.chunk.js.map