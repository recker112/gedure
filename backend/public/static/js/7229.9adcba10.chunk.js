"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[7229],{19840:function(e,n,t){t.d(n,{c:function(){return c}});var r=t(1413),a=t(45987),i=t(59911),o=t(61134),l=t(80184),s=["name","control","rules","defaultValue","helperText"],u=["ref"];function c(e){var n=e.name,t=e.control,c=e.rules,d=void 0===c?null:c,f=e.defaultValue,m=void 0===f?"":f,p=e.helperText,x=void 0===p?"":p,h=(0,a.Z)(e,s),v=(0,o.bc)({name:n,control:t,rules:d,defaultValue:m}),Z=v.field,g=Z.ref,j=(0,a.Z)(Z,u),b=v.fieldState,T=b.invalid,C=b.error;return(0,l.jsx)(i.Z,(0,r.Z)((0,r.Z)((0,r.Z)({inputRef:g},j),h),{},{error:T,helperText:C?C.message:x}))}},18493:function(e,n,t){t.d(n,{Q:function(){return h}});var r=t(1413),a=t(29439),i=t(45987),o=t(72791),l=t(59911),s=t(38254),u=t(13811),c=t(3746),d=t(20165),f=t(61134),m=t(80184),p=["name","control","rules","defaultValue","helperText"],x=["ref"];function h(e){var n=e.name,t=e.control,h=e.rules,v=void 0===h?null:h,Z=e.defaultValue,g=void 0===Z?"":Z,j=e.helperText,b=void 0===j?"":j,T=(0,i.Z)(e,p),C=(0,o.useState)(!1),V=(0,a.Z)(C,2),y=V[0],P=V[1],E=(0,f.bc)({name:n,control:t,rules:v,defaultValue:g}),O=E.field,_=O.ref,k=(0,i.Z)(O,x),q=E.fieldState,S=q.invalid,I=q.error;return(0,m.jsx)(l.Z,(0,r.Z)((0,r.Z)((0,r.Z)({inputRef:_},k),T),{},{error:S,helperText:I?I.message:b,type:y?"text":"password",InputProps:{endAdornment:(0,m.jsx)(s.Z,{position:"end",children:(0,m.jsx)(u.Z,{onClick:function(){P(!y)},size:null===T||void 0===T?void 0:T.size,children:y?(0,m.jsx)(d.Z,{}):(0,m.jsx)(c.Z,{})})})}}))}},99507:function(e,n,t){t.d(n,{yh:function(){return y},mX:function(){return Z},cl:function(){return r.c},gT:function(){return f},Q:function(){return m.Q}});var r=t(19840),a=t(1413),i=t(45987),o=t(59911),l=t(61134),s=t(30948),u=t(80184),c=["name","control","rules","defaultValue","helperText"],d=["ref","onChange","value"];function f(e){var n=e.name,t=e.control,r=e.rules,f=void 0===r?null:r,m=e.defaultValue,p=void 0===m?"":m,x=e.helperText,h=void 0===x?"":x,v=(0,i.Z)(e,c),Z=(0,l.bc)({name:n,control:t,rules:f,defaultValue:p}),g=Z.field,j=(g.ref,g.onChange),b=g.value,T=(0,i.Z)(g,d),C=Z.fieldState,V=C.invalid,y=C.error;return(0,u.jsx)(s.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},v),T),{},{value:(v.format?b:parseFloat(b))||"",customInput:o.Z,error:V,onValueChange:function(e){j((null===e||void 0===e?void 0:e.value)||"")},helperText:y?y.message:h,mask:"_"}))}var m=t(18493),p=t(97008),x=t(72791),h=["multiple","options","name","control","defaultValue","rules","isOptionEqualToValue","getOptionLabel","helperText","disabled"],v=["ref","onChange"];function Z(e){var n=e.multiple,t=e.options,r=e.name,s=e.control,c=e.defaultValue,d=e.rules,f=void 0===d?{required:"* Campo requerido"}:d,m=e.isOptionEqualToValue,x=e.getOptionLabel,Z=e.helperText,g=e.disabled,j=(0,i.Z)(e,h),b=(0,l.bc)({name:r,control:s,rules:f,defaultValue:c}),T=b.field,C=T.ref,V=T.onChange,y=(0,i.Z)(T,v),P=b.fieldState,E=P.invalid,O=P.error;return(0,u.jsx)(p.Z,(0,a.Z)((0,a.Z)({},y),{},{onChange:function(e,n){V(n)},multiple:n,options:t,noOptionsText:"No hay resultados",getOptionLabel:x,isOptionEqualToValue:m,disabled:g,renderInput:function(e){return(0,u.jsx)(o.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},e),j),{},{inputRef:C,error:E,helperText:O?O.message:Z}))}}))}var g=t(74165),j=t(15861),b=t(29439),T=t(96580);var C=["name","control","rules","data","defaultValue","helperText","getOptionLabel","isOptionEqualToValue","multiple","handleRequest","disabled","renderOption","renderTags","limitTags"],V=["ref","onChange"];function y(e){var n=e.name,t=e.control,r=e.rules,s=void 0===r?null:r,c=e.data,d=void 0===c?[]:c,f=e.defaultValue,m=void 0===f?"":f,h=e.helperText,v=void 0===h?"":h,Z=e.getOptionLabel,y=e.isOptionEqualToValue,P=e.multiple,E=e.handleRequest,O=e.disabled,_=e.renderOption,k=e.renderTags,q=e.limitTags,S=(0,i.Z)(e,C),I=(0,x.useState)(!1),N=(0,b.Z)(I,2),w=N[0],L=N[1],R=(0,x.useState)([]),z=(0,b.Z)(R,2),A=z[0],Q=z[1],U=(0,x.useState)(""),D=(0,b.Z)(U,2),W=D[0],B=D[1],F=(0,x.useState)(!0),G=(0,b.Z)(F,2),M=G[0],X=G[1],Y=M&&w&&0===A.length,H=(0,l.bc)({name:n,control:t,rules:s,defaultValue:m}),J=H.field,K=J.ref,$=J.onChange,ee=(0,i.Z)(J,V),ne=H.fieldState.error;(0,x.useEffect)((function(){var e=!0,n=function(){var e=(0,j.Z)((0,g.Z)().mark((function e(){return(0,g.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E(W);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(Y)return e&&n(),function(){e=!1}}),[Y]),(0,x.useEffect)((function(){w||(Q([]),X(!0))}),[w]),(0,x.useEffect)((function(){null!==d&&(Q(d),X(!1))}),[d]);var te=(0,x.useCallback)(function(e,n){var t;return function(){for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];clearTimeout(t),t=setTimeout((function(){return e.apply(void 0,a)}),n)}}((function(){Q([]),X(!0)}),500),[]);return(0,u.jsx)(p.Z,{multiple:P,id:"autocomplete-".concat(n),options:A,open:w,onOpen:function(){L(!0),X(!0)},onClose:function(){L(!1)},onChange:function(e,n){$(n)},inputValue:W,onInputChange:function(e,n){B(n),"change"===(null===e||void 0===e?void 0:e.type)&&te()},getOptionLabel:Z,isOptionEqualToValue:y,loading:Y,loadingText:"Cargando...",noOptionsText:"No hay resultados",renderTags:k,disabled:O,renderOption:_,limitTags:q,renderInput:function(e){return(0,u.jsx)(o.Z,(0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)({},e),ee),S),{},{inputRef:K,error:Boolean(ne),helperText:ne?ne.message:v,InputProps:(0,a.Z)((0,a.Z)({},e.InputProps),{},{endAdornment:(0,u.jsxs)(u.Fragment,{children:[Y?(0,u.jsx)(T.Z,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})})}))}})}},81075:function(e,n,t){t.d(n,{Z:function(){return s}});var r=t(72791),a=t(86951),i=t(59434),o=t(80064),l=t(5016);function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.messageTo200,t=void 0===n||n,s=e.messageTo400,u=void 0===s||s,c=e.message400,d=void 0!==c&&c,f=e.messageTo404,m=void 0===f||f,p=e.message404,x=void 0===p?"Ruta URL no encontrada":p,h=e.messageTo422,v=void 0===h||h,Z=e.message422,g=void 0===Z?"Error al verificar los datos":Z,j=(0,a.Ds)(),b=j.enqueueSnackbar,T=(0,i.v9)((function(e){return e.notistack})),C=T.notiText,V=T.notiStatus,y=T.notiVariant,P=(0,i.I0)();(0,r.useEffect)((function(){return 200===V||201===V?t&&b(C,{variant:y}):400===V?u&&b(d||C,{variant:"warning"}):401===V?(b("Sesi\xf3n expirada",{variant:"info"}),P((0,l.Rg)())):403===V?b("No tienes permisos para esta acci\xf3n",{variant:"error"}):404===V?m&&b(C||x,{variant:"warning"}):422===V?v&&b(g,{variant:"error"}):429===V?(b("Demasiadas peticiones",{variant:"info"}),P((0,l.Rg)())):500===V?b("No se ha podido conectar con la base de datos",{variant:"error"}):"offline"===V&&b("Revise su conexi\xf3n a internet",{variant:"error"}),function(){P((0,o.ZN)())}}),[C,V,y,P,b,t,u,d,m,x,v,g])}},47229:function(e,n,t){t.r(n),t.d(n,{default:function(){return S}});var r=t(50228),a=t(45953),i=t(32232),o=t(20803),l=t(4565),s=t(46283),u=t(40046),c=t(21353),d=t(80184),f={aside:function(e){return{background:e.palette.primary.main+"c7",width:"100%",userSelect:"none",position:"relative"}},container:{py:2,color:"primary.contrastText",height:"100%",position:"relative",zIndex:10},footerText:{display:"inline-block",color:"primary.contrastText",mr:1}};function m(){return(0,d.jsx)(r.Z,{sx:f.aside,children:(0,d.jsx)(o.Z,{sx:f.container,children:(0,d.jsxs)(a.ZP,{container:!0,direction:"column",justifyContent:"space-between",sx:{height:"100%"},children:[(0,d.jsx)(a.ZP,{item:!0,children:(0,d.jsx)("img",{src:c,alt:"Logo del instituto",height:60})}),(0,d.jsxs)(a.ZP,{container:!0,spacing:2,item:!0,children:[(0,d.jsx)(a.ZP,{item:!0,xs:12,children:(0,d.jsx)(l.Z,{align:"center",className:"text__bold--big",variant:"h4",children:"BIENVENIDO"})}),(0,d.jsx)(a.ZP,{item:!0,xs:12,children:(0,d.jsxs)(l.Z,{align:"center",className:"text__bold--big text__opacity--semi",variant:"h6",children:["Al iniciar sesi\xf3n usted podr\xe1:",(0,d.jsx)("br",{}),"* Ver noticias privadas",(0,d.jsx)("br",{}),"* Ver boletas",(0,d.jsx)("br",{}),"Y mas..."]})})]}),(0,d.jsxs)(a.ZP,{container:!0,justifyContent:"center",alignItems:"center",item:!0,children:[(0,d.jsx)(l.Z,{variant:"h6",className:"text__bold--big text__opacity--semi",sx:f.footerText,children:"Powered by"}),(0,d.jsx)(s.Z,{style:{display:"inherit"},href:"https://github.com/recker112/gedure",children:(0,d.jsx)("img",{src:u.Z,alt:"Logo de Gedure",height:25})})]})]})})})}var p=t(93153),x=(t(72791),t(39709)),h=t(61134),v=t(11087),Z=t(99507),g=t(1413),j=t(45987),b=t(72900),T=t(45473),C=["control","name","label","labelPlacement","defaultValue"],V=["ref","onChange"];function y(e){var n=e.control,t=e.name,r=e.label,a=e.labelPlacement,i=void 0===a?"end":a,o=e.defaultValue,l=void 0!==o&&o,s=(0,j.Z)(e,C),u=(0,h.bc)({name:t,control:n,defaultValue:l}).field,c=u.ref,f=u.onChange,m=(0,j.Z)(u,V);return(0,d.jsx)(b.Z,{control:(0,d.jsx)(T.Z,(0,g.Z)((0,g.Z)((0,g.Z)({},m),s),{},{onChange:function(e){f(e.target.checked)},inputRef:c})),label:r,labelPlacement:i})}var P=t(59434),E=t(70016),O={button:{width:160}};function _(){var e=(0,P.v9)((function(e){return e.requestStatus.login.loading})),n=(0,P.I0)(),t=(0,h.cI)({mode:"onTouched"}),r=t.handleSubmit,i=t.control;return(0,d.jsx)(o.Z,{maxWidth:"sm",className:"container--margin",children:(0,d.jsx)("form",{onSubmit:r((function(e){n((0,E.x)(e))})),autoComplete:"off",children:(0,d.jsxs)(a.ZP,{container:!0,spacing:2,children:[(0,d.jsx)(a.ZP,{item:!0,xs:12,children:(0,d.jsx)(l.Z,{className:"text__bold--semi",sx:{typography:{xs:"h4",sm:"h3"}},children:"Ingrese sus datos"})}),(0,d.jsx)(a.ZP,{item:!0,xs:12,children:(0,d.jsx)(Z.cl,{variant:"filled",control:i,rules:{required:"* Campo requerido",minLength:{value:3,message:"Error: No v\xe1lido"},maxLength:{value:30,message:"Error: No v\xe1lida"}},name:"username",label:"Usuario o c\xe9dula",helperText:"* Campo requerido",fullWidth:!0,disabled:e})}),(0,d.jsx)(a.ZP,{item:!0,xs:12,children:(0,d.jsx)(Z.Q,{variant:"filled",control:i,rules:{required:"* Campo requerido",minLength:{value:4,message:"Error: No v\xe1lido"},maxLength:{value:25,message:"Error: No v\xe1lida"}},name:"password",label:"Contrase\xf1a",helperText:"* Campo requerido",fullWidth:!0,disabled:e})}),(0,d.jsx)(a.ZP,{item:!0,xs:12,children:(0,d.jsx)(y,{control:i,name:"checkbox",label:"Mantener abierto",color:"primary",disabled:e})}),(0,d.jsx)(a.ZP,{container:!0,item:!0,xs:12,children:(0,d.jsx)(s.Z,{component:v.rU,to:"/recuperar",underline:"hover",children:(0,d.jsx)(l.Z,{children:"Recuperar contrase\xf1a"})})}),(0,d.jsx)(a.ZP,{container:!0,justifyContent:"center",item:!0,xs:12,children:(0,d.jsx)(x.Z,{type:"submit",color:"primary",variant:"contained",sx:O.button,loading:e,children:"Entrar"})}),(0,d.jsx)(a.ZP,{container:!0,justifyContent:"center",item:!0,xs:12,children:(0,d.jsx)(s.Z,{color:"inherit",component:v.rU,to:"/",underline:"hover",children:(0,d.jsx)(l.Z,{className:"text__bold--semi",children:"Volver al incio"})})})]})})})}var k=t(81075),q={container:{flexGrow:1},aside:function(e){return{background:e.palette.primary.main+"c7"}},fondo:{background:"url(".concat(p,") no-repeat"),backgroundSize:"cover",width:"100%"}};function S(){return document.title="Entrar - La Candelaria",(0,k.Z)(),(0,d.jsx)(r.Z,{component:"main",sx:q.container,children:(0,d.jsxs)(a.ZP,{container:!0,sx:{height:"100%"},children:[(0,d.jsx)(i.Z,{direction:"right",in:!0,children:(0,d.jsx)(a.ZP,{container:!0,item:!0,sm:!0,md:!0,sx:q.fondo,children:(0,d.jsx)(m,{})})}),(0,d.jsx)(i.Z,{direction:"left",in:!0,children:(0,d.jsx)(a.ZP,{container:!0,alignItems:"center",item:!0,sm:12,md:8,children:(0,d.jsx)(_,{})})})]})})}},93153:function(e,n,t){e.exports=t.p+"static/media/instituto.03452a455ee7e1e9836c.jpg"}}]);
//# sourceMappingURL=7229.9adcba10.chunk.js.map