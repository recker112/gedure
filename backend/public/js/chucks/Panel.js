(window.webpackJsonp=window.webpackJsonp||[]).push([[9,7],{175:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(93),c=n(251),i=n(282),o=n(231),u=n(121),s=n.n(u),m=n(7),d=n(58);var f={toggleDrawer:d.a},E=Object(m.b)(null,f)((function(e){var t=e.toggleDrawer;return r.a.createElement(i.a,{title:"Cerrar menú",arrow:!0,enterDelay:1e3},r.a.createElement(o.a,{onClick:function(){t(!1)}},r.a.createElement(s.a,null)))})),p=n(232),v=n(248),g=n(249),h=n(69),b=n(88);var N={updatePanelContent:h.a,toggleDrawer:d.a,updateIndexDrawer:b.a},y=Object(m.b)((function(e){return{index:e.panelSettings.drawer.index}}),N)((function(e){var t=e.options,n=e.children,a=e.updatePanelContent,l=e.toggleDrawer,c=e.indexPass,i=e.index,o=e.updateIndexDrawer,u=t.redirect,s=t.text;return r.a.createElement(p.a,{button:!0,key:s,onClick:function(){a(u),l(),o(c)},selected:i===c,className:i===c?"drawerItemSelected":"drawerItem"},r.a.createElement(v.a,null,n),r.a.createElement(g.a,{primary:s}))})),w=n(286),x=n(250),O=n(122),S=n.n(O),A=n(123),j=n.n(A),C=n(91),k=n.n(C),I=n(124),P=n.n(I),D=n(125),T=n.n(D),B=n(126),L=n.n(B),R=n(127),H=n.n(R),M=n(110),_=n.n(M),J=n(129),U=n.n(J),F=n(130),q=n.n(F),G=n(128),W=n.n(G),V=Object(m.b)((function(e){return{privilegio:e.userData.privilegio}}))((function(e){var t=e.privilegio,n=[{redirect:"home",text:"Dashboard",icon:r.a.createElement(_.a,null)},{redirect:"reg",text:"Registros",icon:r.a.createElement(S.a,null)},{redirect:"co/mo",text:"Consultar/Modificar",icon:r.a.createElement(j.a,null)},{redirect:"upload",text:"Cargar",icon:r.a.createElement(k.a,null)},{redirect:"options",text:"Opciones",icon:r.a.createElement(P.a,null)},{redirect:"delete",text:"Borrar",icon:r.a.createElement(T.a,null)},{redirect:"notice",text:"Publicar",icon:r.a.createElement(L.a,null)},{redirect:"deleteNotices",text:"Borrar publicación",icon:r.a.createElement(H.a,null)}],a=[{redirect:"home",text:"Dashboard",icon:r.a.createElement(_.a,null)},{redirect:"boleta",text:"Boleta",icon:r.a.createElement(W.a,null)},{redirect:"horario",text:"Horario",icon:r.a.createElement(U.a,null)},{redirect:"constancias",text:"Constancias",icon:r.a.createElement(q.a,null)}];return r.a.createElement("div",{role:"presentation"},r.a.createElement("div",{className:"drawerMenu"},r.a.createElement("span",{className:"TextHead"},"Menú"),r.a.createElement(E,null)),r.a.createElement(w.a,{style:{width:"250px"},dense:!0},"A-"===t&&n.map((function(e,t){return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement(y,{options:{redirect:e.redirect,text:e.text},indexPass:t},e.icon),0===t||5===t?r.a.createElement(x.a,null):null)})),"V-"===t&&a.map((function(e,t){return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement(y,{options:{redirect:e.redirect,text:e.text},indexPass:t},e.icon),0===t||5===t?r.a.createElement(x.a,null):null)}))))}));var z={toggleDrawer:d.a},$=Object(m.b)((function(e){return{open:e.panelSettings.drawer.open}}),z)((function(e){var t=e.open,n=e.toggleDrawer;return r.a.createElement(c.a,{open:t,onClose:function(){n(!1)}},r.a.createElement(V,null))})),K=n(64),Q=n(85),X=Object(K.a)((function(){return n.e(4).then(n.bind(null,263))})),Y=Object(K.a)((function(){return n.e(11).then(n.bind(null,259))})),Z=Object(K.a)((function(){return Promise.all([n.e(12),n.e(6)]).then(n.bind(null,261))})),ee=Object(K.a)((function(){return n.e(3).then(n.bind(null,253))})),te=Object(K.a)((function(){return n.e(8).then(n.bind(null,254))})),ne=Object(K.a)((function(){return n.e(2).then(n.bind(null,255))})),ae=Object(K.a)((function(){return n.e(10).then(n.bind(null,256))}));function re(e){var t=e.content;return"home"===t?r.a.createElement("main",null,"USER"):"news"===t?r.a.createElement(Q.RenderNews,null):r.a.createElement("main",null,"ERROR")}function le(e){var t=e.content;return"home"===t?r.a.createElement("main",null,r.a.createElement(X,null)):"news"===t?r.a.createElement(Q.RenderNews,null):"reg"===t?r.a.createElement("main",null,r.a.createElement(Y,null)):"co/mo"===t?r.a.createElement("main",null,r.a.createElement(Z,null)):"upload"===t?r.a.createElement("main",null,r.a.createElement(ee,null)):"options"===t?r.a.createElement("main",null,r.a.createElement(te,null)):"delete"===t?r.a.createElement("main",null,r.a.createElement(ne,null)):"notice"===t?r.a.createElement("main",null,r.a.createElement(ae,null)):r.a.createElement("main",null,r.a.createElement("h1",null,"Error"))}var ce=Object(m.b)((function(e){return{content:e.panelSettings.content,privilegio:e.userData.privilegio}}))((function(e){var t=e.content,n=e.privilegio;return"A-"===n?r.a.createElement(le,{content:t}):"V-"===n?r.a.createElement(re,{content:t}):r.a.createElement("main",null,"ERROR")})),ie=n(111),oe=n(291),ue=n(292),se=n(293),me=n(294),de=n(295),fe=n(163),Ee=function(){return{type:"UPDATE_INFO_DIALOG"}};function pe(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function ve(){return(ve=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var ge=r.a.forwardRef((function(e,t){return r.a.createElement(ie.a,ve({direction:"up",ref:t},e))}));var he={updateInfoDialog:Ee},be=Object(m.b)((function(e){return{infoDialog:e.panelSettings.infoDialog,content:e.panelSettings.content}}),he)((function(e){var t=e.infoDialog,n=e.updateInfoDialog,a=e.content,l="",c="";[{id:"reg",title:"Registros",content:"Muestra todos los movimientos realizados en toda la app, desde inicios de sesión hasta movimientos en la matrícula."},{id:"co/mo",title:"Consultar y Modificar",content:"Permite modificar a los estudiantes de una sección, y muestra una lista de los estudantes existentes en una sección."},{id:"upload",title:"Cargar",content:"Permite cargar boletas o matricula en el servidor, modificando las ya existentes."},{id:"options",title:"Opciones",content:"Configurar algunas opciones del estudiante o una sección completa."},{id:"files",title:"Archivos",content:"Cargar o eliminar los archivos los descargables por el estudiante."},{id:"delete",title:"Eliminar",content:"Elimina boletas, o secciones del sistema."},{id:"notice",title:"Publicar",content:"Publica un auncio o una noticia nueva."},{id:"deleteNotices",title:"Borrar publicación",content:"Permite eliminar una noticia o anuncio publicado"}].map((function(e){return a===e.id&&(l=e.title,c=e.content),null}));var i=function(e){var t=e.target.dataset.content;if(void 0!==t){var a=localStorage.getItem("noListStorage");if(null===a||0===a.length)localStorage.setItem("noListStorage",JSON.stringify([t]));else{var r=JSON.parse(localStorage.getItem("noListStorage")),l=!1;if(r.map((function(e){return t!==e||l||(l=!0),null})),!l){var c=JSON.stringify([].concat(pe(r),[t]));localStorage.setItem("noListStorage",c)}}n()}else n()};return r.a.createElement(oe.a,{open:t,onClose:i,scroll:"paper",TransitionComponent:ge,"aria-labelledby":"info-title-dialog","aria-describedby":"info-description-dialog"},r.a.createElement(ue.a,{id:"info-title-dialog"},l),r.a.createElement(se.a,null,r.a.createElement(me.a,{id:"info-description-dialog"},c)),r.a.createElement(de.a,null,r.a.createElement(fe.a,{color:"secondary",onClick:i},r.a.createElement("span",{"data-content":a},"No mostrar más")),r.a.createElement(fe.a,{color:"primary",onClick:i},"Entendido")))}));function Ne(){return r.a.createElement(l.b,null,r.a.createElement("div",{className:"BoxPagePanel"},r.a.createElement($,null),r.a.createElement(ce,null),r.a.createElement(be,null)))}n.d(t,"default",(function(){return Ne}))},77:function(e,t,n){"use strict";var a=n(0),r=n.n(a),l=n(33),c=n(7);var i={reloginSuccess:n(84).a};t.a=Object(c.b)((function(e){return{redirect:e.loginStatus.redirect}}),i)((function(e){var t=e.redirect,n=e.reloginSuccess,c=e.children;return Object(a.useEffect)((function(){var e=!1;if(!e){var t=JSON.parse(localStorage.getItem("key")),a=JSON.parse(sessionStorage.getItem("key"));"string"!=typeof t&&"string"!=typeof a||n(!0)}return function(){e=!0}})),t?r.a.createElement(l.a,{to:{pathname:"/panel"}}):r.a.createElement("div",null,c)}))},85:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(262),c=n(226),i=n(49),o=n(7);var u={changeContentNews:function(e){return{type:"CHANGE_CONTENT_NEWS",payload:e}}},s=Object(o.b)(null,u)((function(e){var t=e.changeContentNews,n=function(e){"SONnoticias"===e.target.id?(document.getElementById("SONnoticias").classList.add("active"),document.getElementById("SONanuncios").classList.remove("active"),t("noticias")):(document.getElementById("SONnoticias").classList.remove("active"),document.getElementById("SONanuncios").classList.add("active"),t("anuncios"))};return r.a.createElement("div",{className:"SwitchOptionNews"},r.a.createElement(c.a,{in:!0},r.a.createElement(i.a,{variant:"outlined"},r.a.createElement("span",{id:"SONnoticias",className:"ItemSwitchNews active",onClick:n},"Noticias"),r.a.createElement("span",{id:"SONanuncios",className:"ItemSwitchNews",onClick:n},"Anuncios"))))})),m=n(290),d=n(16),f=n(32),E=n.n(f),p=n(14),v=n(247),g=n(117);function h(){return(h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function b(e){var t=e.options;if(Array.isArray(t)&&0!==t.length){var n=t.length-3,a=t.map((function(e,t){return 3===t?r.a.createElement("span",{key:t,className:"more"},"+",n):t<4?r.a.createElement(g.a,{alt:"imagen".concat(t+1),src:e,placeholder:function(e){e.imageProps;var n=e.ref;return r.a.createElement(v.a,{ref:n,key:t,variant:"rect",height:100,width:110})},actual:function(e){var n=e.imageProps;return r.a.createElement("img",h({key:t},n))},error:function(){return r.a.createElement("div",{style:{width:"110px",height:"100px",background:"rgb(252, 72, 80)"}},r.a.createElement("p",null,"Error al obtener imagen"))}}):r.a.createElement("img",{key:t,src:e,alt:"imagen".concat(t+1),style:{display:"none"}})}));return r.a.createElement("footer",null,r.a.createElement(p.a,{container:!0,spacing:2,justify:"space-evenly",wrap:"wrap",className:"fixGrid"},a))}if("loading"===t){var l=[1,2,3,4].map((function(e,t){return r.a.createElement(v.a,{key:t,variant:"rect",height:100,width:110})}));return r.a.createElement("footer",null,r.a.createElement(p.a,{container:!0,spacing:2,justify:"space-evenly",wrap:"wrap",className:"fixGrid"},l))}return r.a.createElement(r.a.Fragment,null)}var N=n(298),y=n(23),w=n(79);function x(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function O(e,t,n,a,r,l,c){try{var i=e[l](c),o=i.value}catch(e){return void n(e)}i.done?t(o):Promise.resolve(o).then(a,r)}function S(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e))&&"[object Arguments]"!==Object.prototype.toString.call(e))return;var n=[],a=!0,r=!1,l=void 0;try{for(var c,i=e[Symbol.iterator]();!(a=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);a=!0);}catch(e){r=!0,l=e}finally{try{a||null==i.return||i.return()}finally{if(r)throw l}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function A(){return r.a.createElement(i.a,{variant:"outlined"},r.a.createElement("section",{className:"Noticia"},r.a.createElement("div",{className:"NHead"},r.a.createElement(v.a,{variant:"circle",className:"NHeadImg"}),r.a.createElement(v.a,{variant:"text",className:"NHeadName",width:150}),r.a.createElement(v.a,{variant:"text",className:"NHeadName",width:35})),r.a.createElement("hr",null),r.a.createElement("div",{className:"NContent"},r.a.createElement(v.a,{variant:"text",className:"NContentTitle",width:200}),r.a.createElement("p",{className:"NContentP"},r.a.createElement(v.a,{variant:"text",width:"100%"}),r.a.createElement(v.a,{variant:"text",width:"100%"}),r.a.createElement(v.a,{variant:"text",width:"100%"}),r.a.createElement(v.a,{variant:"text",width:"100%"}))),r.a.createElement(b,{options:"loading"})))}function j(e){return e.options.map((function(e){var t,n;return"A-"===e.privilegio?(t=e.nameA,n=e.avatarA):(t=e.nameC,n=e.avatarC),r.a.createElement("div",{key:e.id},r.a.createElement(i.a,{variant:"outlined"},r.a.createElement("section",{className:"Noticia"},r.a.createElement("div",{className:"NHead"},r.a.createElement(N.a,{src:n,alt:"Usuario",className:"NHeadImg",style:{backgroundColor:"#B46BD6"}},t.substring(0,1).toUpperCase()),r.a.createElement("span",{className:"NHeadName"},t),r.a.createElement("small",null,r.a.createElement("i",null,"#",e.id))),r.a.createElement("hr",null),r.a.createElement("div",{className:"NContent"},r.a.createElement("span",{className:"NContentTitle"},e.title),r.a.createElement("p",{className:"NContentP"},e.content)),r.a.createElement(b,{options:JSON.parse(e.imgList)}),r.a.createElement("i",{className:"NFecha"},"Publicado ",e.fecha))))}))}var C={updateNewsNoticias:function(e){return{type:"UPDATE_NEWS_NOTICIAS",payload:e}}},k=Object(o.b)((function(e){return{list:e.news.dataN}}),C)((function(e){var t=e.list,n=e.updateNewsNoticias,l=Object(y.useSnackbar)().enqueueSnackbar,c=S(Object(a.useState)(!1),2),i=c[0],o=c[1],u=!1,s=function(){var e,a=(e=E.a.mark((function e(a,r){var c,i,s,m;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,axios.get("api/news?offset=".concat(a,"&limit=").concat(r));case 3:if(200===(c=e.sent).status){e.next=6;break}throw new Error("server_error");case 6:u||(i=c.data,s=i.data,m=i.finish,n([].concat(x(t),x(s))),o(m)),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),l("No se han podido obtener las noticias",{variant:"error"}),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})),function(){var t=this,n=arguments;return new Promise((function(a,r){var l=e.apply(t,n);function c(e){O(l,a,r,c,i,"next",e)}function i(e){O(l,a,r,c,i,"throw",e)}c(void 0)}))});return function(e,t){return a.apply(this,arguments)}}(),m=function(){var e=t.length;s(e,5)};return Object(a.useEffect)((function(){return 0===t.length&&m(),function(){u=!0}}),[t,u]),Object(a.useEffect)((function(){return function(){u=!0,n([])}}),[n,u]),r.a.createElement("article",{className:"BoxNoticias"},0!==t.length?r.a.createElement(w.a,{dataLength:t.length,hasMore:!i,next:m,scrollThreshold:.5,loader:r.a.createElement(A,null),endMessage:r.a.createElement("p",{style:{textAlign:"center"}},r.a.createElement("b",null,"No hay mรกs noticias que cargar."))},r.a.createElement(j,{options:t})):r.a.createElement(A,null))}));function I(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function P(e,t,n,a,r,l,c){try{var i=e[l](c),o=i.value}catch(e){return void n(e)}i.done?t(o):Promise.resolve(o).then(a,r)}function D(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e))&&"[object Arguments]"!==Object.prototype.toString.call(e))return;var n=[],a=!0,r=!1,l=void 0;try{for(var c,i=e[Symbol.iterator]();!(a=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);a=!0);}catch(e){r=!0,l=e}finally{try{a||null==i.return||i.return()}finally{if(r)throw l}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function T(){return r.a.createElement(i.a,{variant:"outlined"},r.a.createElement("section",{className:"Anuncio"},r.a.createElement(v.a,{variant:"text",className:"ATitle",width:200}),r.a.createElement("p",{className:"AContent"},r.a.createElement(v.a,{variant:"text",width:"100%"}),r.a.createElement(v.a,{variant:"text",width:"100%"}),r.a.createElement(v.a,{variant:"text",width:"100%"}),r.a.createElement(v.a,{variant:"text",width:"100%"})),r.a.createElement("hr",null),r.a.createElement("footer",null,r.a.createElement(v.a,{variant:"text",width:150})),r.a.createElement("div",{className:"AId"})))}function B(e){return e.option.map((function(e){var t;return t="A-"===e.privilegio?e.nameA:e.nameC,r.a.createElement(i.a,{variant:"outlined",key:e.id,className:"AnuncioPaper"},r.a.createElement("section",{className:"Anuncio"},r.a.createElement("span",{className:"ATitle"},e.title),r.a.createElement("p",{className:"AContent"},e.content),r.a.createElement("hr",null),r.a.createElement("footer",null,"Escrito por ",t," ",e.fecha),r.a.createElement("div",{className:"AId"},r.a.createElement("small",null,r.a.createElement("i",null,"$",e.id)))))}))}var L={updateNewsAnuncios:function(e){return{type:"UPDATE_NEWS_ANUNCIOS",payload:e}}},R=Object(o.b)((function(e){return{list:e.news.dataA}}),L)((function(e){var t=e.list,n=e.updateNewsAnuncios,l=Object(y.useSnackbar)().enqueueSnackbar,c=D(Object(a.useState)(!1),2),o=c[0],u=c[1],s=!1,m=function(){var e,a=(e=E.a.mark((function e(a,r){var c,i,o,m;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,axios.get("api/anuncios?offset=".concat(a,"&limit=").concat(r));case 3:if(200===(c=e.sent).status){e.next=6;break}throw new Error("server_error");case 6:s||(i=c.data,o=i.data,m=i.finish,n([].concat(I(t),I(o))),u(m)),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),l("No se han podido obtener los anuncios",{variant:"error"}),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})),function(){var t=this,n=arguments;return new Promise((function(a,r){var l=e.apply(t,n);function c(e){P(l,a,r,c,i,"next",e)}function i(e){P(l,a,r,c,i,"throw",e)}c(void 0)}))});return function(e,t){return a.apply(this,arguments)}}(),d=function(){var e=t.length;m(e,7)};return Object(a.useEffect)((function(){return 0===t.length&&d(),function(){s=!0}}),[t,s]),Object(a.useEffect)((function(){return function(){s=!0,n([])}}),[n,s]),r.a.createElement("aside",{id:"test",className:"BoxAnuncios"},r.a.createElement(i.a,{variant:"outlined",className:"PaperMargin"},r.a.createElement("div",{className:"AHead"},r.a.createElement("span",null,"Anuncios"))),0!==t.length?r.a.createElement(w.a,{dataLength:t.length,hasMore:!o,next:d,scrollThreshold:.2,loader:r.a.createElement(T,null),endMessage:r.a.createElement("p",{style:{textAlign:"center"}},r.a.createElement("b",null,"No hay mรกs anuncios que cargar."))},r.a.createElement(B,{option:t})):r.a.createElement(T,null))}));var H=Object(o.b)((function(e){return{content:e.news.content}}))((function(e){var t=e.content,n=Object(d.a)(),a=Object(m.a)(n.breakpoints.up("md"));return r.a.createElement("div",{className:"container"},a?r.a.createElement(r.a.Fragment,null,r.a.createElement(k,null),r.a.createElement(R,null)):"noticias"===t?r.a.createElement(k,{styles:{marginTop:"0px"}}):r.a.createElement(R,null))})),M=n(77);function _(){return r.a.createElement("div",{className:"BoxPageNews"},r.a.createElement("main",null,r.a.createElement(l.a,{mdUp:!0},r.a.createElement(s,null)),r.a.createElement(H,null)))}n.d(t,"RenderNews",(function(){return _}));t.default=function(){return document.title="La Candelaria - News",r.a.createElement(M.a,null,r.a.createElement(_,null))}}}]);