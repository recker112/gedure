(this.webpackJsonpGedure=this.webpackJsonpGedure||[]).push([[5],{102:function(e,t,a){"use strict";var n=a(47),r=a.n(n),l=a(64),c=a(78),o=a(14),i=a(77);t.a=function(){var e=window.axios,t=Object(o.c)(),a=Object(c.b)().enqueueSnackbar;return{fetchData:function(){var n=Object(l.a)(r.a.mark((function n(l){var c,o,u,s,m,d,E,p,g,h,b,f,v,O,j,y,w,x,S,_,k,C,N,I,A,D,T,P,U,B,F;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return c=l.url,o=l.data,u=void 0===o?null:o,s=l.otherData,m=void 0===s?null:s,d=l.messageToFinish,E=void 0===d||d,p=l.messageTo422,g=void 0===p||p,h=l.message422,b=void 0===h?"Error al verificar los datos":h,f=l.messageTo400,v=void 0===f||f,O=l.message400,j=void 0!==O&&O,y=l.return400,w=void 0!==y&&y,x=l.message404,S=void 0===x?"No encontrado":x,_=l.message404Server,k=void 0!==_&&_,C=l.successText,N=void 0!==C&&C,I=l.type,A=void 0===I?"post":I,D=l.variant,T=void 0===D?"success":D,n.prev=1,n.next=4,e[A](c,u,m);case 4:return P=n.sent,E&&a(N||P.data.msg,{variant:T}),n.abrupt("return",P.data);case 9:if(n.prev=9,n.t0=n.catch(1),!e.isCancel(n.t0)){n.next=14;break}n.next=26;break;case 14:if(!n.t0.response){n.next=25;break}if(U=n.t0.response,B=U.status,F=U.data,400!==B){n.next=22;break}if(v&&a(j||F.msg,{variant:"warning"}),!w){n.next=20;break}return n.abrupt("return",F);case 20:n.next=23;break;case 22:401===B?(a("Sesi\xf3n expirada",{variant:"info"}),t(Object(i.a)())):403===B?a("No tienes permisos para esta acci\xf3n",{variant:"error"}):404===B?a(k?F.msg:S,{variant:"warning"}):422===B?g&&a(b,{variant:"error"}):a(500===B?"No se ha podido conectar con la base de datos":"Error interno en el servidor",{variant:"error"});case 23:n.next=26;break;case 25:a("Error interno en la app",{variant:"error"});case 26:return console.log(n.t0.response),n.abrupt("return",!1);case 28:case"end":return n.stop()}}),n,null,[[1,9]])})));return function(e){return n.apply(this,arguments)}}()}}},119:function(e,t,a){"use strict";a.d(t,"a",(function(){return k}));var n=a(54),r=a(0),l=a.n(r),c=a(13),o=a(188),i=a(109),u=a(91),s=a.n(u),m=a(143),d=a.n(m),E=a(120),p=a.n(E),g=a(14),h=Object(r.lazy)((function(){return Promise.all([a.e(21),a.e(27)]).then(a.bind(null,226))})),b=Object(r.lazy)((function(){return Promise.all([a.e(0),a.e(2),a.e(17),a.e(26)]).then(a.bind(null,232))})),f=Object(r.lazy)((function(){return Promise.all([a.e(0),a.e(2),a.e(1),a.e(3),a.e(11)]).then(a.bind(null,229))})),v=Object(r.lazy)((function(){return Promise.all([a.e(0),a.e(2),a.e(1),a.e(3),a.e(12)]).then(a.bind(null,228))})),O=Object(r.lazy)((function(){return Promise.all([a.e(0),a.e(2),a.e(13),a.e(24)]).then(a.bind(null,231))})),j=Object(r.lazy)((function(){return Promise.all([a.e(0),a.e(2),a.e(1),a.e(18),a.e(22)]).then(a.bind(null,233))})),y=Object(r.lazy)((function(){return Promise.all([a.e(0),a.e(2),a.e(1),a.e(15)]).then(a.bind(null,230))})),w=Object(r.lazy)((function(){return a.e(32).then(a.bind(null,227))})),x=Object(i.a)((function(e){return{loading:{flexGrow:1}}}));function S(e){var t=e.children,a=e.auth,r=e.notSeeBeforeAuth,o=void 0!==r&&r,i=Object(n.a)(e,["children","auth","notSeeBeforeAuth"]),u=JSON.parse(localStorage.getItem("access_key")),s=JSON.parse(sessionStorage.getItem("access_key"));return l.a.createElement(c.b,Object.assign({},i,{render:function(e){var n=e.location;return a&&!o?t:a&&o?l.a.createElement(c.a,{to:"/gedure"}):(u||s)&&"/entrar"!==n.pathname?l.a.createElement(c.a,{to:{pathname:"/entrar",state:{from:n,protect:!1}}}):t}}))}function _(e){var t=e.children,a=e.auth,r=Object(n.a)(e,["children","auth"]);return l.a.createElement(c.b,Object.assign({},r,{render:function(e){var n=e.location;return a?t:l.a.createElement(c.a,{to:{pathname:"/entrar",state:{from:n,protect:!0}}})}}))}function k(e){var t=Object(g.d)((function(e){return{theme:e.settings.tema}})).theme,a=x();return l.a.createElement(o.a,{container:!0,direction:"column",justify:"center",alignItems:"center",className:a.loading},"light"===t?l.a.createElement(l.a.Fragment,null,l.a.createElement("img",{src:d.a,alt:"Logo de la instituci\xf3n",className:"loading__img"}),l.a.createElement(s.a,{type:"bars",color:"#00000080",width:150,height:100})):l.a.createElement(l.a.Fragment,null,l.a.createElement("img",{src:p.a,alt:"Logo de la instituci\xf3n",className:"loading__img"}),l.a.createElement(s.a,{type:"bars",color:"#FFFFFF80",width:150,height:100})))}t.b=function(){var e=Object(g.d)((function(e){return{auth:e.userData.auth}})).auth;return l.a.createElement(r.Suspense,{fallback:l.a.createElement(k,null)},l.a.createElement(c.d,null,l.a.createElement(S,{auth:e,path:"/",exact:!0,notSeeBeforeAuth:!0},l.a.createElement(h,null)),l.a.createElement(S,{auth:e,path:"/noticias",exact:!0},l.a.createElement(b,null)),l.a.createElement(S,{auth:e,path:"/noticias/:slug",exact:!0},l.a.createElement(f,null)),l.a.createElement(S,{auth:e,path:"/solicitud",exact:!0},l.a.createElement(v,null)),l.a.createElement(S,{auth:e,path:"/contactanos",exact:!0},l.a.createElement(O,null)),l.a.createElement(S,{auth:e,path:"/entrar",exact:!0},l.a.createElement(j,null)),l.a.createElement(S,{auth:e,path:"/recuperar",exact:!0},l.a.createElement(y,null)),l.a.createElement(_,{auth:e,path:"/gedure"},l.a.createElement(w,null)),l.a.createElement(S,{auth:e},"No encontrado")))}},120:function(e,t,a){e.exports=a.p+"static/media/Farvicon_no_fondo_white.23e12471.png"},143:function(e,t,a){e.exports=a.p+"static/media/Farvicon_no_fondo.64908fd9.png"},154:function(e,t,a){e.exports=a(182)},164:function(e,t,a){},182:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(9),c=a.n(l),o=a(29),i=a(13),u=a(242),s=a(144),m=a(245),d=a(246),E=a(109),p=a(142),g=a.n(p),h=a(31),b=a(236),f=a(219),v=a(220),O=a(238),j=a(221),y=a(188),w=a(239),x=a(240),S=a(241),_=a(222),k=a(224),C=a(243),N=a(82),I=a.n(N),A=a(83),D=a.n(A),T=a(131),P=a.n(T),U=a(132),B=a.n(U),F=a(133),M=a.n(F),R=a(134),z=a.n(R),L=a(66),J=a.n(L),G=Object(E.a)((function(e){return{toolBar:{justifyContent:"flex-end"},item:{marginRight:15,textDecoration:"none"},button:{opacity:.9,transition:"0.5s",borderRadius:"5px","&:hover":{opacity:1},"&.Mui-selected":{background:"linear-gradient(270deg, #2F80ED 0%, #0BA6E0 100%)",opacity:.8,color:"white","&:hover":{opacity:1}},"&.Mui-selected .MuiListItemIcon-root":{color:"white !important"}},nested:{opacity:.9,transition:"0.5s",borderRadius:"5px",paddingLeft:e.spacing(4),"&:hover":{opacity:1},"&.Mui-selected":{background:"linear-gradient(270deg, #2F80ED 0%, #0BA6E0 100%)",opacity:.8,color:"white","&:hover":{opacity:1}},"&.Mui-selected .MuiListItemIcon-root":{color:"white !important"}}}}));function H(e){var t=e.url,a=void 0===t?null:t,n=e.handle,l=e.nested,c=e.children,u=e.noExact,s=G(),m=Object(i.j)({path:a,exact:!u});return r.a.createElement(b.a,{button:!0,dense:!0,selected:Boolean(m),className:l?s.nested:s.button,onClick:n,component:null!==a&&o.b,to:a},c)}function W(){var e=Object(n.useState)(!1),t=Object(h.a)(e,2),a=t[0],l=t[1],c=function(){l(!1)};return r.a.createElement(r.a.Fragment,null,r.a.createElement(f.a,{onClick:function(){l(!0)}},r.a.createElement(I.a,{style:{color:"white"}})),r.a.createElement(v.a,{open:a,onClose:c},r.a.createElement("div",{role:"presentation",className:"drawer"},r.a.createElement(O.a,{color:"transparent",position:"static",elevation:0},r.a.createElement(j.a,null,r.a.createElement(y.a,{container:!0,justify:"center",alignItems:"center"},r.a.createElement("img",{src:J.a,alt:"logo de Gedure",height:"25"})))),r.a.createElement(w.a,null,r.a.createElement(x.a,{component:"nav"},r.a.createElement(H,{url:"/",handle:c},r.a.createElement(S.a,null,r.a.createElement(D.a,null)),r.a.createElement(_.a,{primary:"Inicio"})),r.a.createElement(H,{url:"/noticias",handle:c},r.a.createElement(S.a,null,r.a.createElement(P.a,null)),r.a.createElement(_.a,{primary:"Noticias"})),r.a.createElement(H,{url:"/solicitud",handle:c},r.a.createElement(S.a,null,r.a.createElement(B.a,null)),r.a.createElement(_.a,{primary:"Solicitud de cupo"})),r.a.createElement(H,{url:"/contactanos",handle:c},r.a.createElement(S.a,null,r.a.createElement(M.a,null)),r.a.createElement(_.a,{primary:"Cont\u0e23\u0e01ctanos"})),r.a.createElement(H,{url:"/entrar",handle:c},r.a.createElement(S.a,null,r.a.createElement(z.a,null)),r.a.createElement(_.a,{primary:"Entrar"})))))))}var q=function(){var e=G(),t=Object(u.a)({disableHysteresis:!0,threshold:350}),a=Object(i.j)({path:"/",exact:!0});return r.a.createElement(Ye,null,r.a.createElement(O.a,{color:!t&&a?"transparent":"primary",elevation:0},r.a.createElement(k.a,{smUp:!0},r.a.createElement(j.a,null,r.a.createElement(W,null))),r.a.createElement(k.a,{xsDown:!0},r.a.createElement(j.a,{className:e.toolBar},r.a.createElement(C.a,{color:"initial",className:e.item,component:o.b,to:"/"},"Inicio"),r.a.createElement(C.a,{color:"initial",className:e.item,component:o.b,to:"/noticias"},"Noticias"),r.a.createElement(C.a,{color:"initial",className:e.item,component:o.b,to:"/solicitud"},"Solicitud de cupo"),r.a.createElement(C.a,{color:"initial",className:e.item,component:o.b,to:"/contactanos"},"Cont\u0e23\u0e01ctanos"),r.a.createElement(C.a,{color:"initial",className:e.item,component:o.b,to:"/entrar"},"Entrar")))))},V=a(54),X=a(223),K=a(141),$=a.n(K),Q=a(14),Y=function(e){return{type:"UPDATE_DRAWER",payload:e}};var Z=function(e){var t=Object.assign({},e),a=Object(Q.c)();return r.a.createElement("div",t,r.a.createElement(X.a,{title:"Men\xfa",arrow:!0},r.a.createElement(f.a,{"data-tour":"drawer__button",onClick:function(){a(Y(!0))}},r.a.createElement(I.a,{style:{color:"white"}}))))},ee=a(47),te=a.n(ee),ae=a(64),ne=a(249),re=a(244),le=a(76),ce=a(57),oe=a(137),ie=a.n(oe),ue=a(138),se=a.n(ue),me=a(102),de=a(77),Ee=Object(E.a)((function(e){return{padding:{padding:e.spacing(2)},button:{opacity:.9,borderRadius:"5px","&:hover":{opacity:1,background:"linear-gradient(270deg, #2F80ED 0%, #0BA6E0 100%)",color:"white !important","& .MuiListItemIcon-root":{color:"white !important"}}},avatarColor:{color:e.palette.getContrastText(e.palette.secondary.main),backgroundColor:e.palette.secondary.main},avatarMenu:{color:e.palette.getContrastText(e.palette.secondary.main),backgroundColor:e.palette.secondary.main,height:70,width:70,marginBottom:e.spacing(1)}}}));var pe=function(e){var t=Object.assign({},e),a=Object(n.useState)(null),l=Object(h.a)(a,2),c=l[0],o=l[1],u=Object(Q.d)((function(e){return{user:e.userData.user}})).user,s=Object(Q.c)(),m=Object(me.a)().fetchData,d=Object(i.g)(),E=Ee(),p=function(){o(null)},g=function(){var e=Object(ae.a)(te.a.mark((function e(){var t;return te.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return p(),t={url:"v1/logout",variant:"info"},e.next=4,m(t);case 4:e.sent&&s(Object(de.a)());case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(X.a,{title:"Opciones",arrow:!0},r.a.createElement(f.a,Object.assign({"aria-controls":"AvatarButton","aria-haspopup":"true",size:"small","data-tour":"avatar__menu",onClick:function(e){o(e.currentTarget)}},t),r.a.createElement(ne.a,{alt:"Avatar User",src:u.avatar,className:E.avatarColor},u.name.substring(0,1).toUpperCase()))),r.a.createElement(re.a,{id:"AvatarButton",anchorEl:c,keepMounted:!0,open:Boolean(c),onClose:p,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"}},r.a.createElement(le.a,{style:{minWidth:200},"data-tour":"avatar__menu--despliegue"},r.a.createElement(y.a,{container:!0,direction:"column",className:E.padding},r.a.createElement(y.a,{container:!0,justify:"center",item:!0},r.a.createElement(ne.a,{alt:"Avatar User",src:u.avatar,className:E.avatarMenu},u.name.substring(0,1).toUpperCase())),r.a.createElement(y.a,{style:{maxWidth:200},container:!0,justify:"center",item:!0},r.a.createElement(ce.a,{align:"center",className:"text__bold--semi"},u.name)),r.a.createElement(y.a,{container:!0,justify:"center",item:!0},r.a.createElement(ce.a,{variant:"body2",className:"text__opacity--semi"},"Estudiante #",u.id))),r.a.createElement(x.a,{className:E.padding},r.a.createElement(b.a,{button:!0,dense:!0,className:E.button,onClick:function(){p(),d.push("/cuenta")}},r.a.createElement(S.a,null,r.a.createElement(ie.a,null)),r.a.createElement(_.a,null,"Cuenta")),r.a.createElement(b.a,{button:!0,dense:!0,className:E.button,onClick:g},r.a.createElement(S.a,null,r.a.createElement(se.a,null)),r.a.createElement(_.a,null,"Salir"))))))},ge=a(41),he=a(192),be=a(140),fe=a.n(be),ve=a(43),Oe=a.n(ve),je=a(44),ye=a.n(je),we=a(11),xe=a(139),Se=a.n(xe),_e=a(84),ke=a.n(_e),Ce=a(85),Ne=a.n(Ce);function Ie(e){return r.a.createElement(ge.a,e,r.a.createElement("path",{d:we.l}))}function Ae(e){return r.a.createElement(ge.a,e,r.a.createElement("path",{d:we.f}))}function De(e){return r.a.createElement(ge.a,e,r.a.createElement("path",{d:we.g}))}function Te(e){return r.a.createElement(ge.a,e,r.a.createElement("path",{d:we.i}))}function Pe(e){return r.a.createElement(ge.a,e,r.a.createElement("path",{d:we.b}))}var Ue=function(e){var t=e.handleClose,a=Object(n.useState)(!1),l=Object(h.a)(a,2),c=l[0],o=l[1],i=Object(n.useState)(!1),u=Object(h.a)(i,2),s=u[0],m=u[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(H,{handle:function(){o(!c)}},r.a.createElement(S.a,null,r.a.createElement(Ie,null)),r.a.createElement(_.a,{primary:"Control de estudio"}),c?r.a.createElement(Oe.a,null):r.a.createElement(ye.a,null)),r.a.createElement(he.a,{in:c,timeout:"auto",unmountOnExit:!0},r.a.createElement(x.a,{component:"div",disablePadding:!0},r.a.createElement(H,{url:"/gedure/boletas",handle:t,nested:!0},r.a.createElement(S.a,null,r.a.createElement(Ae,null)),r.a.createElement(_.a,{primary:"Boletas"})),r.a.createElement(H,{url:"/gedure/horario",handle:t,nested:!0},r.a.createElement(S.a,null,r.a.createElement(Se.a,null)),r.a.createElement(_.a,{primary:"Horario"})),r.a.createElement(H,{url:"/gedure/constancias",handle:t,nested:!0},r.a.createElement(S.a,null,r.a.createElement(De,null)),r.a.createElement(_.a,{primary:"Constancias"})))),r.a.createElement(H,{handle:function(){m(!s)}},r.a.createElement(S.a,null,r.a.createElement(Te,null)),r.a.createElement(_.a,{primary:"Administraci\u0e23\u0e13n"}),s?r.a.createElement(Oe.a,null):r.a.createElement(ye.a,null)),r.a.createElement(he.a,{in:s,timeout:"auto",unmountOnExit:!0},r.a.createElement(x.a,{component:"div",disablePadding:!0},r.a.createElement(H,{url:"/gedure/saldo",handle:t,nested:!0},r.a.createElement(S.a,null,r.a.createElement(ke.a,null)),r.a.createElement(_.a,{primary:"Saldo"})),r.a.createElement(H,{url:"/gedure/deudas",handle:t,nested:!0},r.a.createElement(S.a,null,r.a.createElement(Pe,null)),r.a.createElement(_.a,{primary:"Deudas"})))),r.a.createElement(H,{url:"/gedure/tienda",handle:t},r.a.createElement(S.a,null,r.a.createElement(Ne.a,null)),r.a.createElement(_.a,{primary:"Tienda"})))};function Be(e){return r.a.createElement(ge.a,e,r.a.createElement("path",{d:we.d}))}function Fe(e){return r.a.createElement(ge.a,e,r.a.createElement("path",{d:we.a}))}function Me(e){return r.a.createElement(ge.a,e,r.a.createElement("path",{d:we.k}))}function Re(e){return r.a.createElement(ge.a,e,r.a.createElement("path",{d:we.f}))}function ze(e){return r.a.createElement(ge.a,e,r.a.createElement("path",{d:we.i}))}var Le=function(e){var t,a,l=e.handleClose,c=Object(n.useState)(!1),o=Object(h.a)(c,2),i=o[0],u=o[1],s=Object(Q.d)((function(e){return{permissions:e.userData.permissions}})).permissions;return r.a.createElement(r.a.Fragment,null,(null===s||void 0===s||null===(t=s.sin_asignar)||void 0===t?void 0:t.registros_index)&&r.a.createElement(H,{url:"/gedure/registros",handle:l},r.a.createElement(S.a,null,r.a.createElement(Be,null)),r.a.createElement(_.a,{primary:"Registros"})),r.a.createElement(H,{handle:function(){u(!i)}},r.a.createElement(S.a,null,r.a.createElement(ze,null)),r.a.createElement(_.a,{primary:"Controlar sistema"}),i?r.a.createElement(Oe.a,null):r.a.createElement(ye.a,null)),r.a.createElement(he.a,{in:i,timeout:"auto",unmountOnExit:!0},r.a.createElement(x.a,{component:"div",disablePadding:!0},(null===s||void 0===s||null===(a=s.administrar)||void 0===a?void 0:a.users_index)&&r.a.createElement(H,{url:"/gedure/usuarios",handle:l,nested:!0,noExact:!0},r.a.createElement(S.a,null,r.a.createElement(Fe,null)),r.a.createElement(_.a,{primary:"Usuarios"})),r.a.createElement(H,{url:"/gedure/publicaciones",handle:l,nested:!0},r.a.createElement(S.a,null,r.a.createElement(Me,null)),r.a.createElement(_.a,{primary:"Publicaciones"})),r.a.createElement(H,{url:"/gedure/boletas",handle:l,nested:!0},r.a.createElement(S.a,null,r.a.createElement(Re,null)),r.a.createElement(_.a,{primary:"Boletas"})))),r.a.createElement(H,{url:"/gedure/saldo",handle:l},r.a.createElement(S.a,null,r.a.createElement(ke.a,null)),r.a.createElement(_.a,{primary:"Saldo"})),r.a.createElement(H,{url:"/gedure/tienda",handle:l},r.a.createElement(S.a,null,r.a.createElement(Ne.a,null)),r.a.createElement(_.a,{primary:"Tienda"})),r.a.createElement(H,{url:"/gedure/configuracion",handle:l},r.a.createElement(S.a,null),r.a.createElement(_.a,{primary:"Configurar Gedure"})))};function Je(e){return r.a.createElement(ge.a,e,r.a.createElement("path",{d:we.c}))}function Ge(e){return r.a.createElement(ge.a,e,r.a.createElement("path",{d:we.j}))}function He(e){return r.a.createElement(ge.a,e,r.a.createElement("path",{d:we.h}))}function We(e){return r.a.createElement(ge.a,e,r.a.createElement("path",{d:we.e}))}var qe=function(){var e=Object(n.useState)(!1),t=Object(h.a)(e,2),a=t[0],l=t[1],c=Object(Q.d)((function(e){return{open:e.settings.drawer,privilegio:e.userData.user.privilegio}})),o=c.open,i=c.privilegio,u=Object(Q.c)(),s=function(){u(Y(!1))};return r.a.createElement(v.a,{open:o,onClose:s},r.a.createElement("div",{role:"presentation",className:"drawer"},r.a.createElement(O.a,{color:"transparent",position:"static",elevation:0},r.a.createElement(j.a,null,r.a.createElement(y.a,{container:!0,justify:"center",alignItems:"center"},r.a.createElement("img",{src:J.a,alt:"logo de Gedure",height:"25"})))),r.a.createElement(w.a,null,r.a.createElement(x.a,{component:"nav"},r.a.createElement(H,{url:"/gedure",handle:s},r.a.createElement(S.a,null,r.a.createElement(D.a,null)),r.a.createElement(_.a,{primary:"Inicio"})),r.a.createElement(H,{url:"/noticias",handle:s},r.a.createElement(S.a,null,r.a.createElement(Je,null)),r.a.createElement(_.a,{primary:"Noticias"})),"V-"===i&&r.a.createElement(Ue,{handleClose:s}),"A-"===i&&r.a.createElement(Le,{handleClose:s}),r.a.createElement(H,{handle:function(){l(!a)}},r.a.createElement(S.a,null,r.a.createElement(Ge,null)),r.a.createElement(_.a,{primary:"Ayuda"}),a?r.a.createElement(Oe.a,null):r.a.createElement(ye.a,null)),r.a.createElement(he.a,{in:a,timeout:"auto",unmountOnExit:!0},r.a.createElement(x.a,{component:"div",disablePadding:!0},r.a.createElement(H,{url:"/gedure/preguntas-frecuentes",handle:s,nested:!0},r.a.createElement(S.a,null,r.a.createElement(He,null)),r.a.createElement(_.a,{primary:"Preguntas frecuentes"})),r.a.createElement(H,{url:"/soporte",handle:s,nested:!0},r.a.createElement(S.a,null,r.a.createElement(We,null)),r.a.createElement(_.a,{primary:"Soporte"})),r.a.createElement(H,{url:"/contactanos",handle:s,nested:!0},r.a.createElement(S.a,null,r.a.createElement(fe.a,null)),r.a.createElement(_.a,{primary:"Ub\xedcanos"}))))))))},Ve=function(){return{type:"UPDATE_THEME"}},Xe=Object(E.a)((function(e){return{menuButtom:{marginLeft:e.spacing(1)},drawerButton:{flexGrow:1}}}));function Ke(e){var t=e.children,a=Object(V.a)(e,["children"]),n=Object(Q.c)();return r.a.createElement("div",Object.assign({},a,{onClick:function(){n(Ve())}}),t)}var $e=function(){var e=Object(Q.d)((function(e){return{tema:e.settings.tema}})).tema,t=Xe(),a="light"===e?"Modo Oscuro":"Modo Claro";return r.a.createElement(Ye,null,r.a.createElement(O.a,{color:"primary",elevation:0},r.a.createElement(j.a,null,r.a.createElement(Z,{className:t.drawerButton}),r.a.createElement(Ke,{className:t.menuButtom},r.a.createElement(X.a,{title:a,arrow:!0},r.a.createElement(f.a,{"data-tour":"theme__button"},r.a.createElement($.a,{style:{color:"white"}})))),r.a.createElement(pe,{className:t.menuButtom}),r.a.createElement(qe,null))))},Qe=Object(E.a)((function(e){return{root:{position:"fixed",bottom:e.spacing(2),right:e.spacing(2)}}}));function Ye(e){var t=e.children,a=Object(u.a)();return r.a.createElement(s.a,{appear:!1,direction:"down",in:!a},t)}function Ze(e){var t=e.children,a=Object(u.a)({disableHysteresis:!0,threshold:800}),l=Qe(),c=Object(n.useCallback)((function(e){var t=(e.target.ownerDocument||document).querySelector("#top-anchor");t&&t.scrollIntoView({behavior:"smooth",block:"center"})}),[]);return r.a.createElement(m.a,{in:a},r.a.createElement("div",{onClick:c,className:l.root},t))}var et=function(){var e=Object(Q.d)((function(e){return{auth:e.userData.auth}})).auth,t=Object(i.j)({path:"/entrar",exact:!0}),a=Object(i.j)({path:"/recuperar",exact:!0}),n=Object(i.j)({path:"/solicitud",exact:!0}),l=Object(i.j)({path:"/panel/usuarios/cargar",exact:!0});return r.a.createElement(r.a.Fragment,null,!e&&!t&&!a&&!n&&r.a.createElement(q,null),e&&!l&&r.a.createElement($e,null),r.a.createElement(Ze,null,r.a.createElement(d.a,{color:"secondary",size:"small"},r.a.createElement(g.a,null))))},tt=a(119),at=a(248),nt=a(108),rt=a(247),lt=a(121),ct=a.n(lt),ot=a(78);var it=function(){var e=Object(Q.d)((function(e){return{tema:e.settings.tema,access_key:e.userData.access_key}})),t=e.tema,a=e.access_key;window.axios.defaults.headers.common.Authorization="Bearer ".concat(a);var n=r.a.useMemo((function(){return Object(nt.a)({palette:{type:t,primary:{main:"#1976d2"},secondary:{main:"#173753"},background:{default:"light"===t?"#efefef":"#1c2025",paper:"light"===t?"#fff":"#282C34"}}})}),[t]),l=r.a.createRef(),c=function(e){return function(){l.current.closeSnackbar(e)}};return r.a.createElement(rt.a,{theme:n},r.a.createElement(at.a,null),r.a.createElement(ot.a,{maxSnack:3,action:function(e){return r.a.createElement(f.a,{size:"small",onClick:c(e)},r.a.createElement(ct.a,{style:{color:"white"}}))},anchorOrigin:{vertical:"bottom",horizontal:"left"},ref:l},r.a.createElement(et,null),r.a.createElement("span",{id:"top-anchor"}),r.a.createElement(tt.b,null)))},ut=a(58),st=a(40),mt=a(7);localStorage.getItem("theme")||localStorage.setItem("theme","light"),localStorage.getItem("tour-index-v1")||localStorage.setItem("tour-index-v1",JSON.stringify(!0)),localStorage.getItem("tour-registros-v1")||localStorage.setItem("tour-registros-v1",JSON.stringify(!0)),localStorage.getItem("tour-noticias-v1")||localStorage.setItem("tour-noticias-v1",JSON.stringify(!0)),localStorage.getItem("tour-solicitudContacto-v1")||localStorage.setItem("tour-solicitudContacto-v1",JSON.stringify(!0));var dt={tema:localStorage.getItem("theme"),drawer:!1,steppers:{active:0,skipped:new Set},tour:{index:JSON.parse(localStorage.getItem("tour-index-v1")),registros:JSON.parse(localStorage.getItem("tour-registros-v1")),noticias:JSON.parse(localStorage.getItem("tour-noticias-v1")),solicitudContacto:JSON.parse(localStorage.getItem("tour-solicitudContacto-v1"))}},Et={auth:!1,access_key:"",user:{},permissions:{}},pt={contacto:{loading:!1,data:{}},noticia:{loading:!0,data:{}},solicitudCupo:{loading:!1,data:{}},login:{loading:!1,data:{}},recuperar:{loading:!1,data:{}},registros:{loading:!1},usersIndex:{loading:!1,data:{}},crearUser:{loading:!1,data:{}},crearPost:{loading:!1,data:{}}},gt={showRegistros:{open:!1,loading:!1,data:{}},crearUser:{open:!1,loading:!1,data:{}},uploadMatricula:{open:!1,loading:!1,data:{}},deleteConfirmation:{open:!1,loading:!1,data:{}}},ht=Object(ut.c)({settings:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:dt,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"UPDATE_THEME":var r=e.tema,l="light"===r?"dark":"light";return localStorage.setItem("theme",l),Object(mt.a)(Object(mt.a)({},e),{},{tema:l});case"UPDATE_DRAWER":return Object(mt.a)(Object(mt.a)({},e),{},{drawer:n});case"UPDATE_STEPPER_ACTIVE":return Object(mt.a)(Object(mt.a)({},e),{},{steppers:Object(mt.a)(Object(mt.a)({},e.steppers),{},{active:n})});case"UPDATE_STEPPER_SKIPPED":return Object(mt.a)(Object(mt.a)({},e),{},{steppers:Object(mt.a)(Object(mt.a)({},e.steppers),{},{skipped:n})});case"UPDATE_TOUR":var c=n.open,o=n.tour;return localStorage.setItem("tour-".concat(o,"-v1"),JSON.stringify(c)),Object(mt.a)(Object(mt.a)({},e),{},{tour:Object(mt.a)(Object(mt.a)({},e.tour),{},Object(st.a)({},o,c))});default:return e}},userData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Et,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"UPDATE_DATA_USER":return Object(mt.a)(Object(mt.a)({},e),n);case"AUTH_UPDATE":return Object(mt.a)(Object(mt.a)({},e),{},{auth:n});case"LOGOUT":return sessionStorage.removeItem("access_key"),localStorage.removeItem("access_key"),Object(mt.a)({},Et);default:return e}},forms:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:pt,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"UPDATE_FORM_DATA":var r,l=n.form,c=n.loading,o=n.data,i=n.status;return r=o||e[l].data,Object(mt.a)(Object(mt.a)({},e),{},Object(st.a)({},l,Object(mt.a)(Object(mt.a)({},e[l]),{},{loading:c,status:i,data:r})));case"LOGOUT":return Object(mt.a)({},pt);default:return e}},dialogs:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:gt,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"UPDATE_DIALOGS_DATA":var r,l=n.dialog,c=n.open,o=n.loading,i=n.data;return r=i||e[l].data,Object(mt.a)(Object(mt.a)({},e),{},Object(st.a)({},l,Object(mt.a)(Object(mt.a)({},e[l]),{},{open:c,loading:o,data:r})));default:return e}}}),bt=Object(ut.e)(ht);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(164);window.axios=a(165),window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",window.axios.defaults.baseURL=window.location.protocol+"//cande8000.run-us-west2.goorm.io/api",c.a.render(r.a.createElement(Q.a,{store:bt},r.a.createElement(o.a,{getUserConfirmation:function(e,t){t(window.confirm(e))}},r.a.createElement(it,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},66:function(e,t,a){e.exports=a.p+"static/media/Gedure-Logo.a0d591e0.png"},77:function(e,t,a){"use strict";t.a=function(){return{type:"LOGOUT"}}}},[[154,6,9]]]);
//# sourceMappingURL=main.f7046cb8.chunk.js.map