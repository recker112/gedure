(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{bJq7:function(e,n,t){"use strict";t.r(n);var a=t("o0o1"),r=t.n(a),o=t("q1tI"),i=t.n(o),c=t("tRbT"),u=t("kKAo"),l=t("r9w1"),s=t("7SZd"),d=t("iae6"),m=t("bSwy"),p=t.n(m),f=t("+bXu"),v=t("4fo9"),b=t("LrKO"),E=t("/MKj"),h=t("nXu+"),g=t("Bnya"),x=t("HXb3");function y(){return(y=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}function w(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if(!(Symbol.iterator in Object(e))&&"[object Arguments]"!==Object.prototype.toString.call(e))return;var t=[],a=!0,r=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(a=(i=c.next()).done)&&(t.push(i.value),!n||t.length!==n);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==c.return||c.return()}finally{if(r)throw o}}return t}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function O(e,n,t,a,r,o,i){try{var c=e[o](i),u=c.value}catch(e){return void t(e)}c.done?n(u):Promise.resolve(u).then(a,r)}function S(e){return function(){var n=this,t=arguments;return new Promise((function(a,r){var o=e.apply(n,t);function i(e){O(o,a,r,i,c,"next",e)}function c(e){O(o,a,r,i,c,"throw",e)}i(void 0)}))}}function j(e){var n=e.action,t=e.value;return i.a.createElement("div",{className:"Box"},i.a.createElement("span",{className:"title"},"Eliminar publicación"),i.a.createElement("div",{className:"content"},i.a.createElement(v.c,{action:n,val:t,data:{name:"option",values:[{value:"noticia",name:"Noticia"},{value:"anuncio",name:"Anuncio"}]},classNameSet:"select",customWidth:"auto",empty:!1})))}function k(e){var n=e.option,t=e.enqueueSnackbar,a=e.handleChange,c=w(Object(o.useState)(!1),2),u=c[0],m=c[1],v=w(Object(o.useState)([]),2),b=v[0],E=v[1],h=u&&0===b.length,g="noticia"===n?"noticias":"anuncios",x="noticia"===n?"Noticia":"Anuncio";Object(o.useEffect)((function(){var e,a=axios.CancelToken;return h&&function(){var o=S(r.a.mark((function o(){var i,c,u,l;return r.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(r.prev=0,"noticia"!==n){r.next=7;break}return r.next=4,axios.get("api/news/search",{cancelToken:new a((function(n){e=n}))});case 4:i=r.sent,r.next=10;break;case 7:return r.next=9,axios.get("api/anuncios/search",{cancelToken:new a((function(n){e=n}))});case 9:i=r.sent;case 10:E(i.data),r.next=16;break;case 13:r.prev=13,r.t0=r.catch(0),axios.isCancel(r.t0)||(r.t0.response?(c=r.t0.response,u=c.status,l=c.data,403===u&&t(l.description,{variant:"error"}),t(401===u?"No estás autorizado":500===u?"No se ha podido conectar con la base de datos":"Error interno en el servidor",{variant:"error"})):t("Error interno en el servidor",{variant:"error"}));case 16:case"end":return r.stop()}}),o,null,[[0,13]])})));return function(){return o.apply(this,arguments)}}()(),function(){e&&e()}}),[h]),Object(o.useEffect)((function(){return function(){E([])}}),[n]);return i.a.createElement("div",{className:"autoComplete"},i.a.createElement(f.a,{loading:h,multiple:!0,loadingText:"Cargando...",noOptionsText:"Sin resultados",options:b,onChange:function(e,n){!function(e){a({target:{name:"id",value:e}})}(n)},getOptionLabel:function(e){return"".concat(x," #").concat(e.id)},renderOption:function(e){return"".concat(x," #").concat(e.id)},open:u,onOpen:function(){m(!0)},onClose:function(){m(!1)},renderInput:function(e){return i.a.createElement(l.a,y({},e,{variant:"outlined",label:"Seleccionar ".concat(g),startAdornment:i.a.createElement(s.a,{position:"start"},i.a.createElement(p.a,null)),endAdornment:i.a.createElement(s.a,{position:"end"},h?i.a.createElement(d.a,{color:"inherit",size:30}):i.a.createElement("div",null))}))}}))}var N={updateLoading:g.a,updateInputValue:h.a};n.default=Object(E.b)((function(e){return{data:e.panelSettings.delPostingSection}}),N)((function(e){var n=e.data,t=e.updateInputValue,a=(e.updateLoading,n.option),r=(n.id,n.loading),o=Object(x.useSnackbar)().enqueueSnackbar,l=function(e){t(e,"DEL_POSTING")};return i.a.createElement(c.a,{container:!0,spacing:2,justify:"center"},i.a.createElement(c.a,{item:!0,xs:12,sm:5,md:3},i.a.createElement(u.a,{variant:"outlined"},i.a.createElement(j,{action:l,value:a}))),i.a.createElement(c.a,{item:!0,xs:12,sm:10},i.a.createElement(u.a,{variant:"outlined"},i.a.createElement("div",{className:"Box"},i.a.createElement("div",{className:"content"},i.a.createElement(c.a,{container:!0,spacing:2,justify:"center"},i.a.createElement(c.a,{item:!0,xs:12},i.a.createElement(k,{option:a,enqueueSnackbar:o,handleChange:l})),i.a.createElement(c.a,{item:!0,xs:12,style:{textAlign:"center"}},i.a.createElement(b.a,{estilo:"outlined",colorsito:"inherit",text:"Eliminar",loading:r}))))))))}))}}]);