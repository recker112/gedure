"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[7308],{68859:function(e,n,t){t.d(n,{Z:function(){return c}});var r=t(50228),a=t(20803),o=t(45953),i=t(4565),l=t(46283),s=t(40046),u=t(80184);function c(){return(0,u.jsx)(r.Z,{bgcolor:"primary.main",color:"primary.contrastText",component:"footer",py:3,children:(0,u.jsx)(a.Z,{children:(0,u.jsxs)(o.ZP,{container:!0,alignItems:"center",children:[(0,u.jsx)(o.ZP,{item:!0,xs:12,sm:!0,children:(0,u.jsx)(i.Z,{children:'\xa9 U.E.P A.P.E.P "La Candelaria" | 2022'})}),(0,u.jsxs)(o.ZP,{container:!0,direction:"column",item:!0,xs:12,sm:!0,alignItems:"flex-end",children:[(0,u.jsx)(i.Z,{variant:"h6",className:"text__opacity--semi text__bold--semi",children:"Powered by"}),(0,u.jsx)(l.Z,{target:"_blank",href:"https://github.com/recker112/gedure",children:(0,u.jsx)("img",{src:s.Z,alt:"Logo de gedure",height:"30",style:{opacity:.99}})})]})]})})})}},19840:function(e,n,t){t.d(n,{c:function(){return c}});var r=t(1413),a=t(45987),o=t(59911),i=t(61134),l=t(80184),s=["name","control","rules","defaultValue","helperText"],u=["ref"];function c(e){var n=e.name,t=e.control,c=e.rules,d=void 0===c?null:c,f=e.defaultValue,h=void 0===f?"":f,p=e.helperText,x=void 0===p?"":p,m=(0,a.Z)(e,s),Z=(0,i.bc)({name:n,control:t,rules:d,defaultValue:h}),g=Z.field,v=g.ref,j=(0,a.Z)(g,u),b=Z.fieldState,T=b.invalid,y=b.error;return(0,l.jsx)(o.Z,(0,r.Z)((0,r.Z)((0,r.Z)({inputRef:v},j),m),{},{error:T,helperText:y?y.message:x}))}},18493:function(e,n,t){t.d(n,{Q:function(){return m}});var r=t(1413),a=t(29439),o=t(45987),i=t(72791),l=t(59911),s=t(38254),u=t(13811),c=t(3746),d=t(20165),f=t(61134),h=t(80184),p=["name","control","rules","defaultValue","helperText"],x=["ref"];function m(e){var n=e.name,t=e.control,m=e.rules,Z=void 0===m?null:m,g=e.defaultValue,v=void 0===g?"":g,j=e.helperText,b=void 0===j?"":j,T=(0,o.Z)(e,p),y=(0,i.useState)(!1),P=(0,a.Z)(y,2),C=P[0],w=P[1],V=(0,f.bc)({name:n,control:t,rules:Z,defaultValue:v}),S=V.field,I=S.ref,O=(0,o.Z)(S,x),_=V.fieldState,k=_.invalid,L=_.error;return(0,h.jsx)(l.Z,(0,r.Z)((0,r.Z)((0,r.Z)({inputRef:I},O),T),{},{error:k,helperText:L?L.message:b,type:C?"text":"password",InputProps:{endAdornment:(0,h.jsx)(s.Z,{position:"end",children:(0,h.jsx)(u.Z,{onClick:function(){w(!C)},size:null===T||void 0===T?void 0:T.size,children:C?(0,h.jsx)(d.Z,{}):(0,h.jsx)(c.Z,{})})})}}))}},99507:function(e,n,t){t.d(n,{yh:function(){return C},mX:function(){return g},cl:function(){return r.c},gT:function(){return f},Q:function(){return h.Q}});var r=t(19840),a=t(1413),o=t(45987),i=t(59911),l=t(61134),s=t(30948),u=t(80184),c=["name","control","rules","defaultValue","helperText"],d=["ref","onChange","value"];function f(e){var n=e.name,t=e.control,r=e.rules,f=void 0===r?null:r,h=e.defaultValue,p=void 0===h?"":h,x=e.helperText,m=void 0===x?"":x,Z=(0,o.Z)(e,c),g=(0,l.bc)({name:n,control:t,rules:f,defaultValue:p}),v=g.field,j=(v.ref,v.onChange),b=v.value,T=(0,o.Z)(v,d),y=g.fieldState,P=y.invalid,C=y.error;return(0,u.jsx)(s.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},Z),T),{},{value:(Z.format?b:parseFloat(b))||"",customInput:i.Z,error:P,onValueChange:function(e){j((null===e||void 0===e?void 0:e.value)||"")},helperText:C?C.message:m,mask:"_"}))}var h=t(18493),p=t(97008),x=t(72791),m=["multiple","options","name","control","defaultValue","rules","isOptionEqualToValue","getOptionLabel","helperText","disabled"],Z=["ref","onChange"];function g(e){var n=e.multiple,t=e.options,r=e.name,s=e.control,c=e.defaultValue,d=e.rules,f=void 0===d?{required:"* Campo requerido"}:d,h=e.isOptionEqualToValue,x=e.getOptionLabel,g=e.helperText,v=e.disabled,j=(0,o.Z)(e,m),b=(0,l.bc)({name:r,control:s,rules:f,defaultValue:c}),T=b.field,y=T.ref,P=T.onChange,C=(0,o.Z)(T,Z),w=b.fieldState,V=w.invalid,S=w.error;return(0,u.jsx)(p.Z,(0,a.Z)((0,a.Z)({},C),{},{onChange:function(e,n){P(n)},multiple:n,options:t,noOptionsText:"No hay resultados",getOptionLabel:x,isOptionEqualToValue:h,disabled:v,renderInput:function(e){return(0,u.jsx)(i.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},e),j),{},{inputRef:y,error:V,helperText:S?S.message:g}))}}))}var v=t(74165),j=t(15861),b=t(29439),T=t(96580);var y=["name","control","rules","data","defaultValue","helperText","getOptionLabel","isOptionEqualToValue","multiple","handleRequest","disabled","renderOption","renderTags","limitTags"],P=["ref","onChange"];function C(e){var n=e.name,t=e.control,r=e.rules,s=void 0===r?null:r,c=e.data,d=void 0===c?[]:c,f=e.defaultValue,h=void 0===f?"":f,m=e.helperText,Z=void 0===m?"":m,g=e.getOptionLabel,C=e.isOptionEqualToValue,w=e.multiple,V=e.handleRequest,S=e.disabled,I=e.renderOption,O=e.renderTags,_=e.limitTags,k=(0,o.Z)(e,y),L=(0,x.useState)(!1),E=(0,b.Z)(L,2),N=E[0],R=E[1],q=(0,x.useState)([]),z=(0,b.Z)(q,2),A=z[0],F=z[1],B=(0,x.useState)(""),M=(0,b.Z)(B,2),Q=M[0],U=M[1],D=(0,x.useState)(!0),G=(0,b.Z)(D,2),H=G[0],W=G[1],X=H&&N&&0===A.length,J=(0,l.bc)({name:n,control:t,rules:s,defaultValue:h}),K=J.field,Y=K.ref,$=K.onChange,ee=(0,o.Z)(K,P),ne=J.fieldState.error;(0,x.useEffect)((function(){var e=!0,n=function(){var e=(0,j.Z)((0,v.Z)().mark((function e(){return(0,v.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V(Q);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(X)return e&&n(),function(){e=!1}}),[X]),(0,x.useEffect)((function(){N||(F([]),W(!0))}),[N]),(0,x.useEffect)((function(){null!==d&&(F(d),W(!1))}),[d]);var te=(0,x.useCallback)(function(e,n){var t;return function(){for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];clearTimeout(t),t=setTimeout((function(){return e.apply(void 0,a)}),n)}}((function(){F([]),W(!0)}),500),[]);return(0,u.jsx)(p.Z,{multiple:w,id:"autocomplete-".concat(n),options:A,open:N,onOpen:function(){R(!0),W(!0)},onClose:function(){R(!1)},onChange:function(e,n){$(n)},inputValue:Q,onInputChange:function(e,n){U(n),"change"===(null===e||void 0===e?void 0:e.type)&&te()},getOptionLabel:g,isOptionEqualToValue:C,loading:X,loadingText:"Cargando...",noOptionsText:"No hay resultados",renderTags:O,disabled:S,renderOption:I,limitTags:_,renderInput:function(e){return(0,u.jsx)(i.Z,(0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)({},e),ee),k),{},{inputRef:Y,error:Boolean(ne),helperText:ne?ne.message:Z,InputProps:(0,a.Z)((0,a.Z)({},e.InputProps),{},{endAdornment:(0,u.jsxs)(u.Fragment,{children:[X?(0,u.jsx)(T.Z,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})})}))}})}},81075:function(e,n,t){t.d(n,{Z:function(){return s}});var r=t(72791),a=t(86951),o=t(59434),i=t(80064),l=t(5016);function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.messageTo200,t=void 0===n||n,s=e.messageTo400,u=void 0===s||s,c=e.message400,d=void 0!==c&&c,f=e.messageTo404,h=void 0===f||f,p=e.message404,x=void 0===p?"Ruta URL no encontrada":p,m=e.messageTo422,Z=void 0===m||m,g=e.message422,v=void 0===g?"Error al verificar los datos":g,j=(0,a.Ds)(),b=j.enqueueSnackbar,T=(0,o.v9)((function(e){return e.notistack})),y=T.notiText,P=T.notiStatus,C=T.notiVariant,w=(0,o.I0)();(0,r.useEffect)((function(){return 200===P||201===P?t&&b(y,{variant:C}):400===P?u&&b(d||y,{variant:"warning"}):401===P?(b("Sesi\xf3n expirada",{variant:"info"}),w((0,l.Rg)())):403===P?b("No tienes permisos para esta acci\xf3n",{variant:"error"}):404===P?h&&b(y||x,{variant:"warning"}):422===P?Z&&b(v,{variant:"error"}):429===P?(b("Demasiadas peticiones",{variant:"info"}),w((0,l.Rg)())):500===P?b("No se ha podido conectar con la base de datos",{variant:"error"}):"offline"===P&&b("Revise su conexi\xf3n a internet",{variant:"error"}),function(){w((0,i.ZN)())}}),[y,P,C,w,b,t,u,d,h,x,Z,v])}},27308:function(e,n,t){t.r(n),t.d(n,{default:function(){return I}});var r=t(74165),a=t(15861),o=t(72791),i=t(50228),l=t(20803),s=t(45953),u=t(4565),c=t(38254),d=t(13811),f=t(96580),h=t(5403),p=t(61134),x=t(99507),m=t(30286),Z=t(88264),g=t(11087),v=t(80184),j={colorsito:function(e){return{backgroundColor:e.palette.secondary.main,height:200,color:e.palette.secondary.contrastText}},withImg:function(e){return{backgroundColor:e.palette.secondary.main+"A9",height:200,color:e.palette.secondary.contrastText}},button:function(e){return{color:e.palette.secondary.contrastText}}};function b(e){var n=e.data,t=n.title,r=n.slug,a=n.fecha_humano,o=n.url_portada;return(0,v.jsx)(s.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,v.jsx)(m.Z,{style:{background:o?'url("'.concat(o,'")'):"",backgroundSize:"cover"},children:(0,v.jsxs)(s.ZP,{container:!0,sx:o?j.withImg:j.colorsito,className:"paper--padding",children:[(0,v.jsxs)(s.ZP,{item:!0,xs:12,children:[(0,v.jsx)(u.Z,{children:t.length>100?"".concat(t.substring(0,100),"..."):t}),(0,v.jsxs)(u.Z,{className:"text__opacity--semi",children:["Publicado ",-1===a.search("-")?a:"el ".concat(a)]})]}),(0,v.jsx)(s.ZP,{container:!0,justifyContent:"flex-end",alignItems:"flex-end",item:!0,xs:12,children:(0,v.jsx)(d.Z,{component:g.rU,to:"".concat(r),sx:j.button,children:(0,v.jsx)(Z.Z,{})})})]})})})}var T=t(14771),y=t(81075),P=t(68859),C=t(59434),w=t(6728),V=t(14380),S={container:{flexGrow:1,paddingBottom:10,marginTop:{xs:"80px",sm:12}}};function I(){(0,y.Z)();var e=(0,C.v9)((function(e){return{news:e.requestStatus.newsPreview,auth:e.auth.auth,count_notify:e.auth.notify.count}})),n=e.news,t=n.loading,m=n.data,Z=n.error,g=n.hasFinish,j=n.search,I=e.auth,O=e.count_notify,_=(0,C.I0)();document.title=O>0?"(".concat(O,") Registros - La Candelaria"):"Registros - La Candelaria";var k=(0,p.cI)(),L=k.control,E=k.handleSubmit;(0,o.useEffect)((function(){var e=_((0,V.F)());return function(){e.abort(),_((0,w.u2)({select:"newsPreview"}))}}),[_]);var N=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_((0,w.v2)({select:"newsPreview",input:"search",value:n.search}));case 2:return e.next=4,_((0,V.F)());case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(i.Z,{component:"main",sx:S.container,children:(0,v.jsx)(l.Z,{children:(0,v.jsxs)(s.ZP,{container:!0,spacing:2,children:[(0,v.jsx)(s.ZP,{item:!0,xs:12,sm:6,md:8,children:(0,v.jsx)(u.Z,{variant:"h4",className:"text__bold--big",children:"Noticias"})}),(0,v.jsx)(s.ZP,{item:!0,xs:!0,sm:!0,children:(0,v.jsx)("form",{onSubmit:E(N),autoComplete:"off",children:(0,v.jsx)(x.cl,{control:L,name:"search",size:"small",label:"Buscar noticia",defaultValue:j,fullWidth:!0,InputProps:{endAdornment:(0,v.jsx)(c.Z,{position:"end",children:(0,v.jsx)(d.Z,{size:"small",type:"submit",children:(0,v.jsx)(h.Z,{})})})}})})}),t&&0===m.length&&(0,v.jsx)(s.ZP,{container:!0,justifyContent:"center",item:!0,xs:12,children:(0,v.jsx)(f.Z,{})}),m.length>0&&(0,v.jsx)(s.ZP,{item:!0,xs:12,children:(0,v.jsx)(T.Z,{dataLength:m.length,hasMore:!g,next:function(){_((0,V.F)())},scrollThreshold:.8,loader:(0,v.jsx)(s.ZP,{sx:{marginTop:2,overflow:"hidden"},container:!0,justifyContent:"center",children:(0,v.jsx)(f.Z,{})}),endMessage:(0,v.jsx)(u.Z,{sx:{marginTop:2},align:"center",children:"No hay m\xe1s noticias publicadas."}),children:(0,v.jsx)(s.ZP,{container:!0,spacing:2,justifyContent:"center",children:m.map((function(e,n){return(0,v.jsx)(b,{data:e},n)}))})})}),Z&&(0,v.jsx)(s.ZP,{item:!0,xs:12,children:(0,v.jsx)(u.Z,{align:"center",children:"Se ha producido un error al intentar obtener los datos, intente recargar la p\xe1gina."})}),0===m.length&&g&&0!==j.length&&(0,v.jsx)(s.ZP,{item:!0,xs:12,children:(0,v.jsxs)(u.Z,{align:"center",children:['No se ha encontrado nada relacionado con "',j,'".',(0,v.jsx)("br",{}),"Intente probar con otras palabras."]})}),0===m.length&&g&&0===j.length&&(0,v.jsx)(s.ZP,{item:!0,xs:12,children:(0,v.jsx)(u.Z,{align:"center",children:"No hay noticias publicadas."})})]})})}),!I&&(0,v.jsx)(P.Z,{})]})}},88264:function(e,n,t){var r=t(64836);n.Z=void 0;var a=r(t(45649)),o=t(80184),i=(0,a.default)((0,o.jsx)("path",{d:"m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"}),"ArrowForward");n.Z=i},5403:function(e,n,t){var r=t(64836);n.Z=void 0;var a=r(t(45649)),o=t(80184),i=(0,a.default)((0,o.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");n.Z=i}}]);
//# sourceMappingURL=7308.0ce2b172.chunk.js.map