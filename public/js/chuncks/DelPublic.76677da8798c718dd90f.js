(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{NUoh:function(e,t,n){"use strict";t.a=function(e,t,n){var a=!1;return e.map((function(e){return 0===e.value.length?(t(e.name,"Campo obligatorio",n),a=!0):e.minValue&&e.value.length<e.minValue&&(t(e.name,"No válido",n),a=!0),null})),a}},bJq7:function(e,t,n){"use strict";n.r(t);n("o0o1");var a=n("q1tI"),r=n.n(a),o=n("tRbT"),i=n("kKAo"),c=n("MjS+"),u=n("7SZd"),l=n("iae6"),s=n("bSwy"),p=n.n(s),m=n("+bXu"),f=n("4fo9"),b=(n("LrKO"),n("g6jR"),n("NUoh"),n("/MKj")),d=n("HXb3");function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(Object(n),!0).forEach((function(t){g(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e))&&"[object Arguments]"!==Object.prototype.toString.call(e))return;var n=[],a=!0,r=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(a=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==c.return||c.return()}finally{if(r)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function j(e){var t=e.action,n=e.value;return r.a.createElement("div",{className:"Box"},r.a.createElement("span",{className:"title"},"Eliminar"),r.a.createElement("div",{className:"content"},r.a.createElement(f.c,{action:t,val:n,data:{name:"option",values:[{value:"noticia",name:"Noticia"},{value:"anuncio",name:"Anuncio"}]},classNameSet:"select",customWidth:"auto",empty:!1})))}function h(){var e=y(Object(a.useState)(!1),2),t=e[0],n=e[1],o=y(Object(a.useState)([]),2),i=o[0],s=(o[1],t&&0===i.length);return r.a.createElement("div",{className:"autoComplete"},r.a.createElement(m.a,{loading:s,multiple:!0,loadingText:"Cargando...",noOptionsText:"Sin resultados",options:i,onChange:function(e,t){handleClick(t)},getOptionSelected:function(e,t){return e.privilegio+e.cedula===t},getOptionLabel:function(e){return"".concat(e.privilegio).concat(e.cedula)},renderOption:function(e){return"".concat("Noticia"," #").concat(e.id)},open:t,onOpen:function(){n(!0)},onClose:function(){n(!1)},renderInput:function(e){return r.a.createElement(c.a,{style:{padding:"10px",width:"100%"},placeholder:"Buscar ".concat("noticias","..."),inputProps:O({},e.inputProps,{type:"search","aria-label":"buscar usuario"}),startAdornment:r.a.createElement(u.a,{position:"start"},r.a.createElement(p.a,null)),endAdornment:r.a.createElement(u.a,{position:"end"},s?r.a.createElement(l.a,{color:"inherit",size:30}):r.a.createElement("div",null)),ref:e.InputProps.ref})}}))}t.default=Object(b.b)((function(e){return{data:e.panelSettings.delPostingSection}}),{})((function(){return Object(d.useSnackbar)().enqueueSnackbar,r.a.createElement(o.a,{container:!0,spacing:2,justify:"center"},r.a.createElement(o.a,{item:!0,xs:12,sm:5,md:3},r.a.createElement(i.a,{variant:"outlined"},r.a.createElement(j,{action:function(e){updateInputValue(e,"PUBLICAR")},value:"noticia"}))),r.a.createElement(o.a,{item:!0,xs:12,sm:10},r.a.createElement(h,null)))}))}}]);