(window.webpackJsonp=window.webpackJsonp||[]).push([[9,7],{103:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(259),c=n(223),i=n(48),o=n(7);var u={changeContentNews:function(e){return{type:"CHANGE_CONTENT_NEWS",payload:e}}},s=Object(o.b)(null,u)((function(e){var t=e.changeContentNews,n=function(e){"SONnoticias"===e.target.id?(document.getElementById("SONnoticias").classList.add("active"),document.getElementById("SONanuncios").classList.remove("active"),t("noticias")):(document.getElementById("SONnoticias").classList.remove("active"),document.getElementById("SONanuncios").classList.add("active"),t("anuncios"))};return r.a.createElement("div",{className:"SwitchOptionNews"},r.a.createElement(c.a,{in:!0},r.a.createElement(i.a,{variant:"outlined"},r.a.createElement("span",{id:"SONnoticias",className:"ItemSwitchNews active",onClick:n},"Noticias"),r.a.createElement("span",{id:"SONanuncios",className:"ItemSwitchNews",onClick:n},"Anuncios"))))})),m=n(287),d=n(16),E=n(31),p=n.n(E),f=n(244),v=n(115);function g(e){var t=e.options;if(Array.isArray(t)&&0!==t.length){var n=t.length-3,a=t.map((function(e,t){return 3===t?r.a.createElement("span",{key:t,className:"more"},"+",n):t<4?r.a.createElement(v.LazyLoadImage,{key:t,alt:"imagen".concat(t+1),src:e,placeholder:r.a.createElement(f.a,{key:t,variant:"rect",height:100,width:110})}):r.a.createElement("img",{key:t,src:e,alt:"imagen".concat(t+1),style:{display:"none"}})}));return r.a.createElement("footer",null,a)}if("loading"===t){var l=[1,2,3,4].map((function(e,t){return r.a.createElement(f.a,{key:t,variant:"rect",height:100,width:110})}));return r.a.createElement("footer",null,l)}return r.a.createElement(r.a.Fragment,null)}function N(e,t,n,a,r,l,c){try{var i=e[l](c),o=i.value}catch(e){return void n(e)}i.done?t(o):Promise.resolve(o).then(a,r)}function h(){return r.a.createElement(i.a,{variant:"outlined"},r.a.createElement("section",{className:"Noticia"},r.a.createElement("div",{className:"NHead"},r.a.createElement(f.a,{variant:"circle",className:"NHeadImg"}),r.a.createElement(f.a,{variant:"text",className:"NHeadName",width:150})),r.a.createElement("hr",null),r.a.createElement("div",{className:"NContent"},r.a.createElement(f.a,{variant:"text",className:"NContentTitle",width:200}),r.a.createElement("p",{className:"NContentP"},r.a.createElement(f.a,{variant:"text",width:"100%"}),r.a.createElement(f.a,{variant:"text",width:"100%"}),r.a.createElement(f.a,{variant:"text",width:"100%"}),r.a.createElement(f.a,{variant:"text",width:"100%"}))),r.a.createElement(g,{options:"loading"})))}function b(e){return e.options.map((function(e){var t;return"A-"===e.privilegio?(t=e.nameA,e.avatarA):(t=e.nameC,e.avatarC),r.a.createElement("div",{key:e.id},r.a.createElement(i.a,{variant:"outlined"},r.a.createElement("section",{className:"Noticia"},r.a.createElement("div",{className:"NHead"},r.a.createElement("span",{className:"NHeadImg"},"Logo"),r.a.createElement("span",{className:"NHeadName"},t)),r.a.createElement("hr",null),r.a.createElement("div",{className:"NContent"},r.a.createElement("span",{className:"NContentTitle"},e.title),r.a.createElement("p",{className:"NContentP"},e.content)),r.a.createElement(g,{options:JSON.parse(e.imgList)}))))}))}var w={updateNewsNoticias:function(e){return{type:"UPDATE_NEWS_NOTICIAS",payload:e}}},y=Object(o.b)((function(e){return{list:e.news.dataN}}),w)((function(e){var t=e.list,n=e.updateNewsNoticias;return Object(a.useEffect)((function(){var e=!1;return e||function(){var e,t=(e=p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,axios.get("api/news");case 3:if(200===(t=e.sent).status){e.next=6;break}throw"server_error";case 6:n(t.data),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})),function(){var t=this,n=arguments;return new Promise((function(a,r){var l=e.apply(t,n);function c(e){N(l,a,r,c,i,"next",e)}function i(e){N(l,a,r,c,i,"throw",e)}c(void 0)}))});return function(){return t.apply(this,arguments)}}()(),function(){e=!0,n(null)}}),[n]),r.a.createElement("article",{className:"BoxNoticias"},null!==t?r.a.createElement(b,{options:t}):r.a.createElement(h,null))}));function x(e,t,n,a,r,l,c){try{var i=e[l](c),o=i.value}catch(e){return void n(e)}i.done?t(o):Promise.resolve(o).then(a,r)}function O(){return r.a.createElement(i.a,{variant:"outlined"},r.a.createElement("section",{className:"Anuncio"},r.a.createElement(f.a,{variant:"text",className:"ATitle",width:200}),r.a.createElement("p",{className:"AContent"},r.a.createElement(f.a,{variant:"text",width:"100%"}),r.a.createElement(f.a,{variant:"text",width:"100%"}),r.a.createElement(f.a,{variant:"text",width:"100%"}),r.a.createElement(f.a,{variant:"text",width:"100%"})),r.a.createElement("hr",null),r.a.createElement("footer",null,r.a.createElement(f.a,{variant:"text",width:150}))))}function S(e){return e.option.map((function(e,t){return r.a.createElement(c.a,{in:!0,key:t},r.a.createElement(i.a,{variant:"outlined"},r.a.createElement("section",{className:"Anuncio"},r.a.createElement("span",{className:"ATitle"},e.title),r.a.createElement("p",{className:"AContent"},e.content),r.a.createElement("hr",null),r.a.createElement("footer",null,"Escrito por: ",e.by))))}))}var C={updateNewsAnuncios:function(e){return{type:"UPDATE_NEWS_ANUNCIOS",payload:e}}},A=Object(o.b)((function(e){return{list:e.news.dataA}}),C)((function(e){var t=e.list,n=e.updateNewsAnuncios;return Object(a.useEffect)((function(){var e=!1;return e||function(){var e,t=(e=p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://my-json-server.typicode.com/recker112/candelariaweb/anuncios").then((function(e){return e.json()})).then((function(e){return e}));case 2:t=e.sent,n(t);case 5:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(a,r){var l=e.apply(t,n);function c(e){x(l,a,r,c,i,"next",e)}function i(e){x(l,a,r,c,i,"throw",e)}c(void 0)}))});return function(){return t.apply(this,arguments)}}()(),function(){e=!0,n(null)}}),[n]),r.a.createElement("aside",{id:"test",className:"BoxAnuncios"},r.a.createElement(c.a,{in:!0},r.a.createElement(i.a,{variant:"outlined"},r.a.createElement("div",{className:"AHead"},r.a.createElement("span",null,"Anuncios")))),null!==t?r.a.createElement(S,{option:t}):r.a.createElement(O,null))}));var j=Object(o.b)((function(e){return{content:e.news.content}}))((function(e){var t=e.content,n=Object(d.a)(),a=Object(m.a)(n.breakpoints.up("md"));return r.a.createElement("div",{className:"container"},a?r.a.createElement(r.a.Fragment,null,r.a.createElement(y,null),r.a.createElement(A,null)):"noticias"===t?r.a.createElement(y,{styles:{marginTop:"0px"}}):r.a.createElement(A,null))})),I=n(76);function k(){return r.a.createElement("div",{className:"BoxPageNews"},r.a.createElement("main",null,r.a.createElement(l.a,{mdUp:!0},r.a.createElement(s,null)),r.a.createElement(j,null)))}n.d(t,"RenderNews",(function(){return k}));t.default=function(){return document.title="La Candelaria - News",r.a.createElement(I.a,null,r.a.createElement(k,null))}},172:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(90),c=n(248),i=n(279),o=n(228),u=n(118),s=n.n(u),m=n(7),d=n(58);var E={toggleDrawer:d.a},p=Object(m.b)(null,E)((function(e){var t=e.toggleDrawer;return r.a.createElement(i.a,{title:"Cerrar menú",arrow:!0,enterDelay:1e3},r.a.createElement(o.a,{onClick:function(){t(!1)}},r.a.createElement(s.a,null)))})),f=n(229),v=n(245),g=n(246),N=n(69),h=n(85);var b={updatePanelContent:N.a,toggleDrawer:d.a,updateIndexDrawer:h.a},w=Object(m.b)((function(e){return{index:e.panelSettings.drawer.index}}),b)((function(e){var t=e.options,n=e.children,a=e.updatePanelContent,l=e.toggleDrawer,c=e.indexPass,i=e.index,o=e.updateIndexDrawer,u=t.redirect,s=t.text;return r.a.createElement(f.a,{button:!0,key:s,onClick:function(){a(u),l(),o(c)},selected:i===c,className:i===c?"drawerItemSelected":"drawerItem"},r.a.createElement(v.a,null,n),r.a.createElement(g.a,{primary:s}))})),y=n(283),x=n(247),O=n(119),S=n.n(O),C=n(120),A=n.n(C),j=n(88),I=n.n(j),k=n(121),P=n.n(k),D=n(122),L=n.n(D),T=n(123),B=n.n(T),H=n(124),R=n.n(H),_=n(108),J=n.n(_),U=n(126),F=n.n(U),M=n(127),W=n.n(M),z=n(125),G=n.n(z),V=Object(m.b)((function(e){return{privilegio:e.userData.privilegio}}))((function(e){var t=e.privilegio,n=[{redirect:"home",text:"Dashboard",icon:r.a.createElement(J.a,null)},{redirect:"reg",text:"Registros",icon:r.a.createElement(S.a,null)},{redirect:"co/mo",text:"Consultar/Modificar",icon:r.a.createElement(A.a,null)},{redirect:"upload",text:"Cargar",icon:r.a.createElement(I.a,null)},{redirect:"options",text:"Opciones",icon:r.a.createElement(P.a,null)},{redirect:"delete",text:"Borrar",icon:r.a.createElement(L.a,null)},{redirect:"notice",text:"Publicar",icon:r.a.createElement(B.a,null)},{redirect:"deleteNotices",text:"Borrar publicación",icon:r.a.createElement(R.a,null)}],a=[{redirect:"home",text:"Dashboard",icon:r.a.createElement(J.a,null)},{redirect:"boleta",text:"Boleta",icon:r.a.createElement(G.a,null)},{redirect:"horario",text:"Horario",icon:r.a.createElement(F.a,null)},{redirect:"constancias",text:"Constancias",icon:r.a.createElement(W.a,null)}];return r.a.createElement("div",{role:"presentation"},r.a.createElement("div",{className:"drawerMenu"},r.a.createElement("span",{className:"TextHead"},"Menú"),r.a.createElement(p,null)),r.a.createElement(y.a,{style:{width:"250px"},dense:!0},"A-"===t&&n.map((function(e,t){return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement(w,{options:{redirect:e.redirect,text:e.text},indexPass:t},e.icon),0===t||5===t?r.a.createElement(x.a,null):null)})),"V-"===t&&a.map((function(e,t){return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement(w,{options:{redirect:e.redirect,text:e.text},indexPass:t},e.icon),0===t||5===t?r.a.createElement(x.a,null):null)}))))}));var q={toggleDrawer:d.a},K=Object(m.b)((function(e){return{open:e.panelSettings.drawer.open}}),q)((function(e){var t=e.open,n=e.toggleDrawer;return r.a.createElement(c.a,{open:t,onClose:function(){n(!1)}},r.a.createElement(V,null))})),Q=n(64),X=n(103),Y=Object(Q.a)((function(){return n.e(4).then(n.bind(null,260))})),Z=Object(Q.a)((function(){return n.e(11).then(n.bind(null,256))})),$=Object(Q.a)((function(){return Promise.all([n.e(12),n.e(6)]).then(n.bind(null,258))})),ee=Object(Q.a)((function(){return n.e(3).then(n.bind(null,250))})),te=Object(Q.a)((function(){return n.e(8).then(n.bind(null,251))})),ne=Object(Q.a)((function(){return n.e(2).then(n.bind(null,252))})),ae=Object(Q.a)((function(){return n.e(10).then(n.bind(null,253))}));function re(e){var t=e.content;return"home"===t?r.a.createElement("main",null,r.a.createElement(Y,null)):"news"===t?r.a.createElement(X.RenderNews,null):"reg"===t?r.a.createElement("main",null,r.a.createElement(Z,null)):"co/mo"===t?r.a.createElement("main",null,r.a.createElement($,null)):"upload"===t?r.a.createElement("main",null,r.a.createElement(ee,null)):"options"===t?r.a.createElement("main",null,r.a.createElement(te,null)):"delete"===t?r.a.createElement("main",null,r.a.createElement(ne,null)):"notice"===t?r.a.createElement("main",null,r.a.createElement(ae,null)):r.a.createElement("main",null,r.a.createElement("h1",null,"Error"))}var le=Object(m.b)((function(e){return{content:e.panelSettings.content,privilegio:e.userData.privilegio}}))((function(e){var t=e.content,n=e.privilegio;return"A-"===n?r.a.createElement(re,{content:t}):"V-"===n?r.a.createElement("main",null,"USER"):r.a.createElement("main",null,"ERROR")})),ce=n(109),ie=n(288),oe=n(289),ue=n(290),se=n(291),me=n(292),de=n(162),Ee=function(){return{type:"UPDATE_INFO_DIALOG"}};function pe(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function fe(){return(fe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var ve=r.a.forwardRef((function(e,t){return r.a.createElement(ce.a,fe({direction:"up",ref:t},e))}));var ge={updateInfoDialog:Ee},Ne=Object(m.b)((function(e){return{infoDialog:e.panelSettings.infoDialog,content:e.panelSettings.content}}),ge)((function(e){var t=e.infoDialog,n=e.updateInfoDialog,a=e.content,l="",c="";[{id:"reg",title:"Registros",content:"Muestra todos los movimientos realizados en toda la app, desde inicios de sesión hasta movimientos en la matrícula."},{id:"co/mo",title:"Consultar y Modificar",content:"Permite modificar a los estudiantes de una sección, y muestra una lista de los estudantes existentes en una sección."},{id:"upload",title:"Cargar",content:"Permite cargar boletas o matricula en el servidor, modificando las ya existentes."},{id:"options",title:"Opciones",content:"Configurar algunas opciones del estudiante o una sección completa."},{id:"files",title:"Archivos",content:"Cargar o eliminar los archivos los descargables por el estudiante."},{id:"delete",title:"Eliminar",content:"Elimina boletas, o secciones del sistema."},{id:"notice",title:"Publicar",content:"Publica un auncio o una noticia nueva."},{id:"deleteNotices",title:"Borrar publicación",content:"Permite eliminar una noticia o anuncio publicado"}].map((function(e){return a===e.id&&(l=e.title,c=e.content),null}));var i=function(e){var t=e.target.dataset.content;if(void 0!==t){var a=localStorage.getItem("noListStorage");if(null===a||0===a.length)localStorage.setItem("noListStorage",JSON.stringify([t]));else{var r=JSON.parse(localStorage.getItem("noListStorage")),l=!1;if(r.map((function(e){return t!==e||l||(l=!0),null})),!l){var c=JSON.stringify([].concat(pe(r),[t]));localStorage.setItem("noListStorage",c)}}n()}else n()};return r.a.createElement(ie.a,{open:t,onClose:i,scroll:"paper",TransitionComponent:ve,"aria-labelledby":"info-title-dialog","aria-describedby":"info-description-dialog"},r.a.createElement(oe.a,{id:"info-title-dialog"},l),r.a.createElement(ue.a,null,r.a.createElement(se.a,{id:"info-description-dialog"},c)),r.a.createElement(me.a,null,r.a.createElement(de.a,{color:"secondary",onClick:i},r.a.createElement("span",{"data-content":a},"No mostrar más")),r.a.createElement(de.a,{color:"primary",onClick:i},"Entendido")))}));function he(){return r.a.createElement(l.b,null,r.a.createElement("div",{className:"BoxPagePanel"},r.a.createElement(K,null),r.a.createElement(le,null),r.a.createElement(Ne,null)))}n.d(t,"default",(function(){return he}))},76:function(e,t,n){"use strict";var a=n(0),r=n.n(a),l=n(32),c=n(7);var i={reloginSuccess:n(82).a};t.a=Object(c.b)((function(e){return{redirect:e.loginStatus.redirect}}),i)((function(e){var t=e.redirect,n=e.reloginSuccess,c=e.children;return Object(a.useEffect)((function(){var e=!1;if(!e){var t=JSON.parse(localStorage.getItem("key")),a=JSON.parse(sessionStorage.getItem("key"));"string"!=typeof t&&"string"!=typeof a||n(!0)}return function(){e=!0}})),t?r.a.createElement(l.a,{to:{pathname:"/panel"}}):r.a.createElement("div",null,c)}))}}]);