(this["webpackJsonpfrontend-la-candelaria"]=this["webpackJsonpfrontend-la-candelaria"]||[]).push([[7],{108:function(e,t,a){"use strict";var n=a(54),r=a.n(n),c=a(68),i=a(84),o=a(14),s=a(85);t.a=function(e){var t=window.axios,a=Object(o.c)(),n=Object(i.b)().enqueueSnackbar;return{fetchData:function(){var i=Object(c.a)(r.a.mark((function c(i){var o,l,d,j,u,b,O,h,g,x,p,m,v,f,y,S,_,w,C,E,k,N,I,P,T,A,D,B,U,L,F,R,z,M;return r.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=i.url,l=i.data,d=void 0===l?null:l,j=i.otherData,u=void 0===j?null:j,b=i.messageToFinish,O=void 0===b||b,h=i.messageTo422,g=void 0===h||h,x=i.message422,p=void 0===x?"Error al verificar los datos":x,m=i.messageTo400,v=void 0===m||m,f=i.message400,y=void 0!==f&&f,S=i.return400,_=void 0!==S&&S,w=i.message404,C=void 0===w?"No encontrado":w,E=i.messageTo404,k=void 0===E||E,N=i.message404Server,I=void 0!==N&&N,P=i.successText,T=void 0!==P&&P,A=i.type,D=void 0===A?"post":A,B=i.variant,U=void 0===B?"success":B,r.prev=1,r.next=4,t[D](o,d,u);case 4:return L=r.sent,O&&n(T||L.data.msg,{variant:U}),r.abrupt("return",L.data);case 9:if(r.prev=9,r.t0=r.catch(1),!t.isCancel(r.t0)){r.next=14;break}r.next=26;break;case 14:if(!r.t0.response){r.next=25;break}if(F=r.t0.response,R=F.status,z=F.data,400!==R){r.next=22;break}if(v&&n(y||z.msg,{variant:"warning"}),!_){r.next=20;break}return r.abrupt("return",z);case 20:r.next=23;break;case 22:if(401===R)n("Sesi\xf3n expirada",{variant:"info"}),a(Object(s.a)());else if(403===R)n("No tienes permisos para esta acci\xf3n",{variant:"error"});else if(404===R)I?n(z.msg,{variant:"warning"}):k&&n(C,{variant:"warning"});else if(422===R)for(M in g&&n(p,{variant:"error"}),z.errors)e&&e(M,{type:"useFetch",message:"Error: "+z.errors[M][0]});else n(500===R?"No se ha podido conectar con la base de datos":"Error interno en el servidor",{variant:"error"});case 23:r.next=26;break;case 25:n("Imposible conectarse con el servidor",{variant:"error"});case 26:return r.abrupt("return",!1);case 27:case"end":return r.stop()}}),c,null,[[1,9]])})));return function(e){return i.apply(this,arguments)}}()}}},122:function(e,t,a){"use strict";a.d(t,"a",(function(){return A})),a.d(t,"b",(function(){return D})),a.d(t,"c",(function(){return B}));var n=a(7),r=a(50),c=a(29),i=a(0),o=a.n(i),s=a(16),l=a(227),d=a(233),j=a(241),u=a(165),b=a(101),O=a.n(b),h=a(145),g=a.p+"static/media/Farvicon_no_fondo.1f187348.png",x=a(125),p=a(14),m=a(1),v=Object(i.lazy)((function(){return a.e(63).then(a.bind(null,1281))})),f=Object(i.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(26)]).then(a.bind(null,1316))})),y=Object(i.lazy)((function(){return Promise.all([a.e(0),a.e(2),a.e(3),a.e(5),a.e(17)]).then(a.bind(null,1309))})),S=Object(i.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(22)]).then(a.bind(null,1307))})),_=Object(i.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(24)]).then(a.bind(null,1318))})),w=Object(i.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(25)]).then(a.bind(null,1310))})),C=Object(i.lazy)((function(){return a.e(67).then(a.bind(null,1289))})),E=Object(i.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(27)]).then(a.bind(null,1319))})),k=Object(i.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(23)]).then(a.bind(null,1311))})),N=Object(u.a)((function(e){var t;return{loading:{flexGrow:1},containerErrorBoundary:(t={flexGrow:1,paddingBottom:e.spacing(5)},Object(c.a)(t,e.breakpoints.up("xs"),{marginTop:"80px"}),Object(c.a)(t,e.breakpoints.up("sm"),{marginTop:e.spacing(12)}),t)}}));function I(e){e.error;var t=e.resetErrorBoundary,a=N();return Object(m.jsxs)("div",{className:a.containerErrorBoundary,children:[Object(m.jsx)(l.a,{mb:2,align:"center",fontSize:"h4.fontSize",children:"\xa1Se ha producido un error!"}),Object(m.jsx)(l.a,{mb:2,align:"center",fontSize:"body1.fontSize",children:"Revisa tu conexi\xf3n a Internet, es posible que no te encuentres conectado."}),Object(m.jsx)(l.a,{align:"center",children:Object(m.jsx)(d.a,{variant:"outlined",onClick:t,children:"Reintentar"})})]})}function P(e){var t=e.children,a=e.notSeeBeforeAuth,c=void 0!==a&&a,i=Object(r.a)(e,["children","notSeeBeforeAuth"]),o=Object(p.d)((function(e){return{auth:e.userData.auth,actived_at:e.userData.user.actived_at}})),l=o.auth,d=o.actived_at,j=JSON.parse(localStorage.getItem("access_key")),u=JSON.parse(sessionStorage.getItem("access_key"));return Object(m.jsx)(s.b,Object(n.a)(Object(n.a)({},i),{},{render:function(e){var a=e.location;return l&&!c?d||"/setup"===a.pathname?t:Object(m.jsx)(s.a,{to:"/setup"}):l&&c?Object(m.jsx)(s.a,{to:"/gedure"}):(j||u)&&"/entrar"!==a.pathname?Object(m.jsx)(s.a,{to:{pathname:"/entrar",state:{from:a,protect:!1}}}):t}}))}function T(e){var t=e.children,a=Object(r.a)(e,["children"]),c=Object(p.d)((function(e){return{auth:e.userData.auth,actived_at:e.userData.user.actived_at}})),i=c.auth,o=c.actived_at;return Object(m.jsx)(s.b,Object(n.a)(Object(n.a)({},a),{},{render:function(e){var a=e.location;return i?o||"/setup"===a.pathname?t:Object(m.jsx)(s.a,{to:"/setup"}):Object(m.jsx)(s.a,{to:{pathname:"/entrar",state:{from:a,protect:!0}}})}}))}function A(e){var t=Object(p.d)((function(e){return{theme:e.settings.tema}})).theme,a=N();return Object(m.jsx)(j.a,{container:!0,direction:"column",justify:"center",alignItems:"center",className:a.loading,children:"light"===t?Object(m.jsxs)(o.a.Fragment,{children:[Object(m.jsx)("img",{src:g,alt:"Logo de la instituci\xf3n",className:"loading__img"}),Object(m.jsx)(O.a,{type:"bars",color:"#00000080",width:150,height:100})]}):Object(m.jsxs)(o.a.Fragment,{children:[Object(m.jsx)("img",{src:x.a,alt:"Logo de la instituci\u0e23\u0e13n",className:"loading__img"}),Object(m.jsx)(O.a,{type:"bars",color:"#FFFFFF80",width:150,height:100})]})})}function D(){var e=N();return Object(m.jsx)(l.a,{className:e.containerErrorBoundary,fontSize:"body1.fontSize",align:"center",children:"La direcci\xf3n que est\xe1 solicitando no se encuentra disponible actualmente."})}function B(){return Object(m.jsx)(h.ErrorBoundary,{FallbackComponent:I,children:Object(m.jsx)(i.Suspense,{fallback:Object(m.jsx)(A,{}),children:Object(m.jsxs)(s.d,{children:[Object(m.jsx)(P,{path:"/",exact:!0,notSeeBeforeAuth:!0,children:Object(m.jsx)(v,{})}),Object(m.jsx)(P,{path:"/noticias",exact:!0,children:Object(m.jsx)(f,{})}),Object(m.jsx)(P,{path:"/noticias/:slug",exact:!0,children:Object(m.jsx)(y,{})}),Object(m.jsx)(P,{path:"/contactanos",exact:!0,children:Object(m.jsx)(S,{})}),Object(m.jsx)(P,{path:"/entrar",exact:!0,children:Object(m.jsx)(_,{})}),Object(m.jsx)(P,{path:"/recuperar",exact:!0,children:Object(m.jsx)(w,{})}),Object(m.jsx)(T,{path:"/gedure",children:Object(m.jsx)(C,{})}),Object(m.jsx)(T,{path:"/setup",children:Object(m.jsx)(k,{})}),Object(m.jsx)(P,{path:"/invitacion/:key",exact:!0,children:Object(m.jsx)(E,{})}),Object(m.jsx)(P,{children:Object(m.jsx)(D,{})})]})})})}},125:function(e,t,a){"use strict";t.a=a.p+"static/media/Farvicon_no_fondo_white.b12f4329.png"},181:function(e,t,a){},200:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(11),i=a.n(c),o=a(36),s=a(16),l=a(245),d=a(146),j=a(257),u=a(258),b=a(165),O=a(144),h=a.n(O),g=a(38),x=a(7),p=a(50),m=a(238),v=a(228),f=a(229),y=a(240),S=a(230),_=a(241),w=a(242),C=a(243),E=a(244),k=a(231),N=a(234),I=a(246),P=a(89),T=a.n(P),A=a(90),D=a.n(A),B=a(136),U=a.n(B),L=a(91),F=a.n(L),R=a(137),z=a.n(R),M=a(138),J=a.n(M),G=a(83),V=a(1),W=Object(b.a)((function(e){return{toolBar:{justifyContent:"flex-end"},item:{marginRight:15,textDecoration:"none"},itemOld:{marginRight:15,textDecoration:"none","&:hover":{textDecoration:"underline"}},button:{opacity:.9,transition:"0.5s",borderRadius:"5px","&:hover":{opacity:1},"&.Mui-selected":{background:"linear-gradient(270deg, #2F80ED 0%, #0BA6E0 100%)",opacity:.8,color:"white","&:hover":{opacity:1}},"&.Mui-selected .MuiListItemIcon-root":{color:"white !important"}},nested:{opacity:.9,transition:"0.5s",borderRadius:"5px",paddingLeft:e.spacing(4),"&:hover":{opacity:1},"&.Mui-selected":{background:"linear-gradient(270deg, #2F80ED 0%, #0BA6E0 100%)",opacity:.8,color:"white","&:hover":{opacity:1}},"&.Mui-selected .MuiListItemIcon-root":{color:"white !important"}}}}));function q(e){var t=e.url,a=void 0===t?null:t,n=e.handle,r=e.nested,c=e.children,i=e.component,l=void 0===i?o.b:i,d=e.noExact,j=Object(p.a)(e,["url","handle","nested","children","component","noExact"]),u=W(),b=Object(s.j)({path:a,exact:!d});return Object(V.jsx)(m.a,Object(x.a)(Object(x.a)({},j),{},{button:!0,dense:!0,selected:Boolean(b),className:r?u.nested:u.button,onClick:n,component:null!==a?l:null,to:a,children:c}))}function H(){var e=Object(n.useState)(!1),t=Object(g.a)(e,2),a=t[0],c=t[1],i=function(){c(!1)};return Object(V.jsxs)(r.a.Fragment,{children:[Object(V.jsx)(v.a,{onClick:function(){c(!0)},children:Object(V.jsx)(T.a,{style:{color:"white"}})}),Object(V.jsx)(f.a,{open:a,onClose:i,children:Object(V.jsxs)("div",{role:"presentation",className:"drawer",children:[Object(V.jsx)(y.a,{color:"transparent",position:"static",elevation:0,children:Object(V.jsx)(S.a,{children:Object(V.jsx)(_.a,{container:!0,justify:"center",alignItems:"center",children:Object(V.jsx)("img",{src:G.a,alt:"logo de Gedure",height:"35"})})})}),Object(V.jsx)(w.a,{children:Object(V.jsxs)(C.a,{component:"nav",children:[Object(V.jsxs)(q,{url:"/",handle:i,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(D.a,{})}),Object(V.jsx)(k.a,{primary:"Inicio"})]}),Object(V.jsxs)(q,{url:"/noticias",handle:i,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(U.a,{})}),Object(V.jsx)(k.a,{primary:"Noticias"})]}),Object(V.jsxs)(q,{url:"/contactanos",handle:i,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(F.a,{})}),Object(V.jsx)(k.a,{primary:"Cont\xe1ctanos"})]}),Object(V.jsxs)(q,{url:"/entrar",handle:i,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(z.a,{})}),Object(V.jsx)(k.a,{primary:"Entrar"})]}),Object(V.jsxs)(q,{url:"https://old.lacandelaria.com.ve",component:"a",href:"https://old.lacandelaria.com.ve",handle:i,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(J.a,{})}),Object(V.jsx)(k.a,{primary:"Volver al sistema anterior"})]})]})})]})})]})}var X=function(){var e=W(),t=Object(l.a)({disableHysteresis:!0,threshold:350}),a=Object(s.j)({path:"/",exact:!0});return Object(V.jsx)(Ye,{children:Object(V.jsxs)(y.a,{color:!t&&a?"transparent":"primary",elevation:0,children:[Object(V.jsx)(N.a,{smUp:!0,children:Object(V.jsx)(S.a,{children:Object(V.jsx)(H,{})})}),Object(V.jsx)(N.a,{xsDown:!0,children:Object(V.jsxs)(S.a,{className:e.toolBar,children:[Object(V.jsx)(I.a,{color:"initial",className:e.item,component:o.b,to:"/",children:"Inicio"}),Object(V.jsx)(I.a,{color:"initial",className:e.item,component:o.b,to:"/noticias",children:"Noticias"}),Object(V.jsx)(I.a,{color:"initial",className:e.item,component:o.b,to:"/contactanos",children:"Cont\xe1ctanos"}),Object(V.jsx)(I.a,{color:"initial",className:e.item,component:o.b,to:"/entrar",children:"Entrar"}),Object(V.jsx)("a",{className:e.itemOld,href:"https://old.lacandelaria.com.ve",children:"Volver al sistema anterior"})]})})]})})},Z=a(232),K=a(143),Q=a.n(K),Y=a(14),$=function(e){return{type:"UPDATE_DRAWER",payload:e}};var ee=function(e){var t=Object.assign({},e),a=Object(Y.c)();return Object(V.jsx)("div",Object(x.a)(Object(x.a)({},t),{},{children:Object(V.jsx)(Z.a,{title:"Men\xfa",arrow:!0,children:Object(V.jsx)(v.a,{"data-tour":"drawer__button",onClick:function(){a($(!0))},children:Object(V.jsx)(T.a,{style:{color:"white"}})})})}))},te=a(54),ae=a.n(te),ne=a(68),re=a(261),ce=a(247),ie=a(96),oe=a(62),se=a(140),le=a.n(se),de=a(141),je=a.n(de),ue=a(108),be=a(85),Oe=Object(b.a)((function(e){return{padding:{padding:e.spacing(2)},button:{opacity:.9,transition:"0.5s",borderRadius:"5px","&:hover":{opacity:1,background:"linear-gradient(270deg, #2F80ED 0%, #0BA6E0 100%)",color:"white !important","& .MuiListItemIcon-root":{color:"white !important"}}},avatarColor:{color:e.palette.getContrastText(e.palette.secondary.main),backgroundColor:e.palette.secondary.main},avatarMenu:{color:e.palette.getContrastText(e.palette.secondary.main),backgroundColor:e.palette.secondary.main,height:70,width:70,marginBottom:e.spacing(1)}}}));var he=function(e){var t=Object.assign({},e),a=Object(n.useState)(null),c=Object(g.a)(a,2),i=c[0],o=c[1],l=Object(Y.d)((function(e){return{user:e.userData.user}})).user,d=Object(Y.c)(),j=Object(ue.a)().fetchData,u=Object(s.g)(),b=Oe(),O=function(){o(null)},h=function(){var e=Object(ne.a)(ae.a.mark((function e(){var t;return ae.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return O(),t={url:"v1/logout",variant:"info"},e.next=4,j(t);case 4:e.sent&&d(Object(be.a)());case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(V.jsxs)(r.a.Fragment,{children:[Object(V.jsx)(Z.a,{title:"Opciones",arrow:!0,children:Object(V.jsx)(v.a,Object(x.a)(Object(x.a)({"aria-controls":"AvatarButton","aria-haspopup":"true",size:"small","data-tour":"avatar__menu",onClick:function(e){o(e.currentTarget)}},t),{},{children:Object(V.jsx)(re.a,{alt:"Avatar User",src:l.avatar,className:b.avatarColor,children:l.name.substring(0,1).toUpperCase()})}))}),Object(V.jsx)(ce.a,{id:"AvatarButton",anchorEl:i,keepMounted:!0,open:Boolean(i),onClose:O,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:Object(V.jsxs)(ie.a,{style:{minWidth:200},children:[Object(V.jsxs)(_.a,{container:!0,direction:"column",className:b.padding,children:[Object(V.jsx)(_.a,{container:!0,justify:"center",item:!0,children:Object(V.jsx)(re.a,{alt:"Avatar User",src:l.avatar,className:b.avatarMenu,children:l.name.substring(0,1).toUpperCase()})}),Object(V.jsx)(_.a,{style:{maxWidth:200},container:!0,justify:"center",item:!0,children:Object(V.jsx)(oe.a,{align:"center",className:"text__bold--semi",children:l.name})}),Object(V.jsx)(_.a,{container:!0,justify:"center",item:!0,children:Object(V.jsxs)(oe.a,{variant:"body2",className:"text__opacity--semi",children:["V-"===l.privilegio&&"Estudiante #".concat(l.id),"A-"===l.privilegio&&"Administrador #".concat(l.id)]})})]}),Object(V.jsxs)(C.a,{className:b.padding,children:[Object(V.jsxs)(m.a,{button:!0,dense:!0,className:b.button,onClick:function(){O(),u.push("/gedure/cuenta")},children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(le.a,{})}),Object(V.jsx)(k.a,{children:"Cuenta"})]}),Object(V.jsxs)(m.a,{button:!0,dense:!0,className:b.button,onClick:h,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(je.a,{})}),Object(V.jsx)(k.a,{children:"Salir"})]})]})]})})]})},ge=a(210),xe=a(227),pe=a(142),me=a.n(pe),ve=a(58),fe=a.n(ve),ye=a(57),Se=a.n(ye),_e=a(254),we=a.n(_e),Ce=a(255),Ee=a.n(Ce),ke=a(256),Ne=a.n(ke),Ie=a(248),Pe=a.n(Ie),Te=a(249),Ae=a.n(Te);var De=function(e){var t=e.handleClose,a=Object(n.useState)(!1),c=Object(g.a)(a,2),i=c[0],o=c[1];return Object(V.jsxs)(r.a.Fragment,{children:[Object(V.jsxs)(q,{handle:function(){o(!i)},children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(Pe.a,{})}),Object(V.jsx)(k.a,{primary:"Control de estudio"}),i?Object(V.jsx)(fe.a,{}):Object(V.jsx)(Se.a,{})]}),Object(V.jsx)(ge.a,{in:i,timeout:"auto",unmountOnExit:!0,children:Object(V.jsx)(C.a,{component:"div",disablePadding:!0,children:Object(V.jsxs)(q,{url:"/gedure/boletas",handle:t,nested:!0,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(Ae.a,{})}),Object(V.jsx)(k.a,{primary:"Boletas"})]})})})]})},Be=a(49),Ue=a(250),Le=a.n(Ue),Fe=a(251),Re=a.n(Fe),ze=a(252),Me=a.n(ze),Je=a(253),Ge=a.n(Je);function Ve(e){return Object(V.jsx)(Be.a,Object(x.a)(Object(x.a)({},e),{},{viewBox:"200.082 335.055 89.655 109.545",children:Object(V.jsx)("path",{d:"M 289.593 386.16 L 289.593 429.96 C 285.64 434.353 279.853 437.893 272.233 440.58 C 264.62 443.26 256.27 444.6 247.183 444.6 C 233.223 444.6 222.066 440.33 213.713 431.79 C 205.366 423.243 200.9 411.353 200.313 396.12 L 200.082 391.077 L 226.796 405.655 C 226.829 408.333 228.133 411.463 231.773 416.81 C 235.406 422.157 241.13 424.83 248.943 424.83 C 255.636 424.83 260.616 423.34 263.883 420.36 L 263.883 403.81 L 246.013 403.81 L 246.013 386.16 Z M 226.982 399.182 L 200.457 385.15 C 200.457 374.65 202.31 367.318 206.017 359.485 C 209.73 351.645 215.04 345.615 221.947 341.395 C 228.86 337.168 236.857 335.055 245.937 335.055 C 259.217 335.055 269.53 338.095 276.877 344.175 C 284.23 350.255 288.517 359.325 289.737 371.385 L 264.977 371.385 C 264.097 365.425 262.194 361.178 259.267 358.645 C 256.334 356.105 252.184 354.835 246.817 354.835 C 240.37 354.835 235.39 357.568 231.877 363.035 C 228.357 368.502 226.574 376.315 226.527 386.475 L 226.527 392.915 C 226.527 395.99 226.982 399.182 226.982 399.182 Z"})}))}var We=function(e){var t,a,c,i,o,s=e.handleClose,l=Object(n.useState)(!1),d=Object(g.a)(l,2),j=d[0],u=d[1],b=Object(Y.d)((function(e){return{permissions:e.userData.permissions}})).permissions;return Object(V.jsxs)(r.a.Fragment,{children:[(null===b||void 0===b||null===(t=b.sin_asignar)||void 0===t?void 0:t.registros_index)&&Object(V.jsxs)(q,{url:"/gedure/registros",handle:s,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(Le.a,{})}),Object(V.jsx)(k.a,{primary:"Registros"})]}),0!==Object.keys(b.administrar).length&&Object(V.jsxs)(r.a.Fragment,{children:[Object(V.jsxs)(q,{handle:function(){u(!j)},children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(Re.a,{})}),Object(V.jsx)(k.a,{primary:"Sistema principal"}),j?Object(V.jsx)(fe.a,{}):Object(V.jsx)(Se.a,{})]}),Object(V.jsx)(ge.a,{in:j,timeout:"auto",unmountOnExit:!0,children:Object(V.jsxs)(C.a,{component:"div",disablePadding:!0,children:[(null===b||void 0===b||null===(a=b.administrar)||void 0===a?void 0:a.users_index)&&Object(V.jsxs)(q,{url:"/gedure/usuarios",handle:s,nested:!0,noExact:!0,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(Me.a,{})}),Object(V.jsx)(k.a,{primary:"Usuarios"})]}),(null===b||void 0===b||null===(c=b.administrar)||void 0===c?void 0:c.posts_index)&&Object(V.jsxs)(q,{url:"/gedure/publicaciones",handle:s,nested:!0,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(Ge.a,{})}),Object(V.jsx)(k.a,{primary:"Publicaciones"})]}),(null===b||void 0===b||null===(i=b.administrar)||void 0===i?void 0:i.boletas_index)&&Object(V.jsxs)(q,{url:"/gedure/boletas",handle:s,nested:!0,noExact:!0,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(Ae.a,{})}),Object(V.jsx)(k.a,{primary:"Boletas"})]}),(null===b||void 0===b||null===(o=b.administrar)||void 0===o?void 0:o.contact_index)&&Object(V.jsxs)(q,{url:"/gedure/soli-contacto",handle:s,nested:!0,noExact:!0,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(F.a,{})}),Object(V.jsx)(k.a,{primary:"Solicit\xfad de cont\xe1cto"})]})]})})]}),0!==Object.keys(b.gedure).length&&Object(V.jsxs)(q,{url:"/gedure/configuracion",handle:s,noExact:!0,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(Ve,{})}),Object(V.jsx)(k.a,{primary:"Configurar Gedure"})]})]})};var qe=function(){var e=Object(n.useState)(!1),t=Object(g.a)(e,2),a=t[0],r=t[1],c=Object(Y.d)((function(e){return{open:e.settings.drawer,privilegio:e.userData.user.privilegio}})),i=c.open,o=c.privilegio,s=Object(Y.c)(),l=function(){s($(!1)),r(!1)};return Object(V.jsx)(f.a,{open:i,onClose:l,children:Object(V.jsxs)("div",{role:"presentation",className:"drawer",children:[Object(V.jsx)(y.a,{color:"transparent",position:"static",elevation:0,children:Object(V.jsx)(S.a,{children:Object(V.jsx)(_.a,{container:!0,justify:"center",alignItems:"center",children:Object(V.jsx)("img",{src:G.a,alt:"logo de Gedure",height:"35"})})})}),Object(V.jsx)(w.a,{children:Object(V.jsxs)(C.a,{component:"nav",children:[Object(V.jsxs)(q,{url:"/gedure",handle:l,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(D.a,{})}),Object(V.jsx)(k.a,{primary:"Inicio"})]}),Object(V.jsxs)(q,{url:"/noticias",handle:l,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(we.a,{})}),Object(V.jsx)(k.a,{primary:"Noticias"})]}),"V-"===o&&Object(V.jsx)(De,{handleClose:l}),"A-"===o&&Object(V.jsx)(We,{handleClose:l}),Object(V.jsxs)(q,{handle:function(){r(!a)},children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(Ee.a,{})}),Object(V.jsx)(k.a,{primary:"Ayuda"}),a?Object(V.jsx)(fe.a,{}):Object(V.jsx)(Se.a,{})]}),Object(V.jsx)(ge.a,{in:a,timeout:"auto",unmountOnExit:!0,children:Object(V.jsxs)(C.a,{component:"div",disablePadding:!0,children:[Object(V.jsxs)(q,{url:"/gedure/preguntas-frecuentes",handle:l,nested:!0,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(Ne.a,{})}),Object(V.jsx)(k.a,{primary:"Preguntas frecuentes"})]}),Object(V.jsxs)(q,{url:"/contactanos",handle:l,nested:!0,children:[Object(V.jsx)(E.a,{children:Object(V.jsx)(me.a,{})}),Object(V.jsx)(k.a,{primary:"Ub\xedcanos"})]})]})})]})}),Object(V.jsx)(xe.a,{mt:"auto",mb:4,position:"relative",top:16,color:"text.secondary",fontSize:"body2.fontSize",align:"center",children:"Ver. 5.0.0-Beta.1"})]})})},He=function(){return{type:"UPDATE_THEME"}},Xe=Object(b.a)((function(e){return{menuButtom:{marginLeft:e.spacing(1)},drawerButton:{flexGrow:1}}}));function Ze(e){var t=e.children,a=Object(p.a)(e,["children"]),n=Object(Y.c)();return Object(V.jsx)("div",Object(x.a)(Object(x.a)({},a),{},{onClick:function(){n(He())},children:t}))}var Ke=function(){var e=Object(Y.d)((function(e){return{tema:e.settings.tema}})).tema,t=Xe(),a="light"===e?"Modo Oscuro":"Modo Claro";return Object(V.jsx)(Ye,{children:Object(V.jsx)(y.a,{color:"primary",elevation:0,children:Object(V.jsxs)(S.a,{children:[Object(V.jsx)(ee,{className:t.drawerButton}),Object(V.jsx)(Ze,{className:t.menuButtom,children:Object(V.jsx)(Z.a,{title:a,arrow:!0,children:Object(V.jsx)(v.a,{"data-tour":"theme__button",children:Object(V.jsx)(Q.a,{style:{color:"white"}})})})}),Object(V.jsx)(he,{className:t.menuButtom}),Object(V.jsx)(qe,{})]})})})},Qe=Object(b.a)((function(e){return{root:{position:"fixed",bottom:e.spacing(2),right:e.spacing(2)}}}));function Ye(e){var t=e.children,a=Object(l.a)();return Object(V.jsx)(d.a,{appear:!1,direction:"down",in:!a,children:t})}function $e(e){var t=e.children,a=Object(l.a)({disableHysteresis:!0,threshold:800}),r=Qe(),c=Object(n.useCallback)((function(e){var t=(e.target.ownerDocument||document).querySelector("#top-anchor");t&&t.scrollIntoView({behavior:"smooth",block:"center"})}),[]);return Object(V.jsx)(j.a,{in:a,children:Object(V.jsx)("div",{onClick:c,className:r.root,children:t})})}var et=function(){var e=Object(Y.d)((function(e){return{auth:e.userData.auth}})).auth,t=Object(s.j)({path:"/entrar",exact:!0}),a=Object(s.j)({path:"/recuperar",exact:!0}),n=Object(s.j)({path:"/solicitud",exact:!0}),c=Object(s.j)({path:"/gedure/monedero/verificar-pago",exact:!0});return Object(V.jsxs)(r.a.Fragment,{children:[!e&&!t&&!a&&!n&&Object(V.jsx)(X,{}),e&&!c&&Object(V.jsx)(Ke,{}),Object(V.jsx)($e,{children:Object(V.jsx)(u.a,{color:"secondary",size:"small",children:Object(V.jsx)(h.a,{})})})]})},tt=a(122),at=a(260),nt=a(111),rt=a(259),ct=a(84);var it=function(){var e=Object(Y.d)((function(e){return{tema:e.settings.tema,access_key:e.userData.access_key}})),t=e.tema,a=e.access_key;window.axios.defaults.headers.common.Authorization="Bearer ".concat(a);var n=r.a.useMemo((function(){return Object(nt.a)({palette:{type:t,primary:{main:"#1976d2"},secondary:{main:"#173753"},background:{default:"light"===t?"#efefef":"#1c2025",paper:"light"===t?"#fff":"#282C34"}}})}),[t]);return Object(V.jsx)(ct.a,{maxSnack:3,anchorOrigin:{vertical:"bottom",horizontal:"left"},children:Object(V.jsxs)(rt.a,{theme:n,children:[Object(V.jsx)(at.a,{}),Object(V.jsx)(et,{}),Object(V.jsx)("span",{id:"top-anchor"}),Object(V.jsx)(tt.c,{})]})})},ot=a(97),st=a(29);localStorage.getItem("gd-theme")||localStorage.setItem("gd-theme","light"),localStorage.getItem("gd-tour")||localStorage.setItem("gd-tour",JSON.stringify({}));var lt={tema:localStorage.getItem("gd-theme"),drawer:!1,tour:{index:JSON.parse(localStorage.getItem("gd-tour")).index_v1,registros:JSON.parse(localStorage.getItem("gd-tour")).registros_v1,usuarios:JSON.parse(localStorage.getItem("gd-tour")).usuarios_v1,ver_usuarios:JSON.parse(localStorage.getItem("gd-tour")).ver_usuarios_v1,publicaciones:JSON.parse(localStorage.getItem("gd-tour")).publicaciones_v1,boletas_admin:JSON.parse(localStorage.getItem("gd-tour")).boletas_admin_v1,gedure:JSON.parse(localStorage.getItem("gd-tour")).gedure_v1,cuenta:JSON.parse(localStorage.getItem("gd-tour")).cuenta_v1,soli_contacto:JSON.parse(localStorage.getItem("gd-tour")).soli_contacto_v1,monedero:JSON.parse(localStorage.getItem("gd-tour")).monedero_v1,verify_pay:JSON.parse(localStorage.getItem("gd-tour")).verify_pay_v1}},dt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:lt,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"UPDATE_THEME":var r=e.tema,c="light"===r?"dark":"light";return localStorage.setItem("gd-theme",c),Object(x.a)(Object(x.a)({},e),{},{tema:c});case"UPDATE_DRAWER":return Object(x.a)(Object(x.a)({},e),{},{drawer:n});case"UPDATE_TOUR":var i=n.open,o=n.tour,s=n.version,l="".concat(o,"_").concat(s),d=JSON.parse(localStorage.getItem("gd-tour"));return d[l]=i,localStorage.setItem("gd-tour",JSON.stringify(d)),Object(x.a)(Object(x.a)({},e),{},{tour:Object(x.a)(Object(x.a)({},e.tour),{},Object(st.a)({},o,i))});case"RESET_TOURS":localStorage.setItem("gd-tour",JSON.stringify({}));var j=e.tour,u={};for(var b in j)u[b]=!1;return Object(x.a)(Object(x.a)({},e),{},{tour:Object(x.a)({},u)});default:return e}},jt={auth:!1,access_key:"",user:{personal_data:{},wallet:{}},permissions:{}},ut=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:jt,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"UPDATE_DATA_USER":return Object(x.a)(Object(x.a)({},e),n);case"UPDATE_WALLET_USER":var r=n.balance;return Object(x.a)(Object(x.a)({},e),{},{user:Object(x.a)(Object(x.a)({},e.user),{},{wallet:Object(x.a)(Object(x.a)({},e.user.wallet),{},{balance:r})})});case"AUTH_UPDATE":return Object(x.a)(Object(x.a)({},e),{},{auth:n});case"LOGOUT":return sessionStorage.removeItem("access_key"),localStorage.removeItem("access_key"),Object(x.a)({},jt);default:return e}},bt={contacto:{loading:!1,data:{}},noticia:{loading:!0,data:{}},solicitudCupo:{loading:!1,data:{}},login:{loading:!1,data:{}},recuperar:{loading:!1,data:{}},invitation:{loading:!0,data:{}},pageIndex:{loading:!0,data:{}},registerPassword:{loading:!1,data:{}},registros:{loading:!1},usersIndex:{loading:!1,data:{}},crearUser:{loading:!1,data:{}},crearPost:{loading:!1,data:{}},editPost:{loading:!1,data:{}},showUser:{loading:!0,data:{}},updatePerfil:{loading:!1,data:{}},updateAvatar:{loading:!1,data:{}},updatePassword:{loading:!1,data:{}},updatePermissions:{loading:!1,data:{}},updatePersonalUser:{loading:!1,data:{}},updatePersonalStudiend:{loading:!1,data:{}},updatePersonalStudiendUbi:{loading:!1,data:{}},updatePersonalStudiendOtros:{loading:!1,data:{}},updatePersonalMadre:{loading:!1,data:{}},updatePersonalPadre:{loading:!1,data:{}},updatePersonalRepre:{loading:!1,data:{}},updatePersonalRepreUbi:{loading:!1,data:{}},updatePersonalRepreEmpleo:{loading:!1,data:{}},updateCurso:{loading:!1,data:{}},resendEmail:{loading:!1,data:{}},logoutAll:{loading:!1,data:{}},boletasIndex:{loading:!1,data:{}},showBoletas:{loading:!1,data:[]},crearCurso:{loading:!1,data:{}},pageShowLoteDeuda:{loading:!0,data:{}},createBankAccount:{loading:!1,data:{}},uploadBankTransaction:{loading:!1,data:{}},showTransaction:{loading:!0,data:{}}},Ot=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:bt,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"UPDATE_FORM_DATA":var r,c=n.form,i=n.loading,o=n.data;return r=o||e[c].data,Object(x.a)(Object(x.a)({},e),{},Object(st.a)({},c,Object(x.a)(Object(x.a)({},e[c]),{},{loading:i,data:r})));case"LOGOUT":return Object(x.a)({},bt);default:return e}},ht={showRegistros:{open:!1,loading:!1,data:{}},crearUser:{open:!1,loading:!1,data:{}},uploadMatricula:{open:!1,loading:!1,data:{}},deleteConfirmation:{open:!1,loading:!1,data:{}},updateSeccion:{open:!1,loading:!1,data:{}},uploadBoletas:{open:!1,loading:!1,data:{}},replaceBoleta:{open:!1,loading:!1,data:{}},showSoliContact:{open:!1,loading:!1,data:{}},crearLoteDeuda:{open:!1,loading:!1,data:{}},editLoteDeuda:{open:!1,loading:!1,data:{}},editBankAccount:{open:!1,loading:!1,data:{}},assignBankTransaction:{open:!1,loading:!1,data:{}},deleteBankTransaction:{open:!1,loading:!1,data:{}},editWallet:{open:!1,loading:!1,data:{}}},gt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ht,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"UPDATE_DIALOGS_DATA":var r,c=n.dialog,i=n.open,o=n.loading,s=n.data;return r=s||e[c].data,Object(x.a)(Object(x.a)({},e),{},Object(st.a)({},c,Object(x.a)(Object(x.a)({},e[c]),{},{open:i,loading:o,data:r})));default:return e}},xt={verifyPay:{active:0,skipped:new Set,loading:!1,data:{}},setup:{active:0,skipped:new Set,loading:!1,data:{personal_data:{}}}},pt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:xt,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"UPDATE_STEPPER_ACTIVE":var r=n.stepper,c=n.active,i=n.loading,o=n.data,s=e[r].data;o&&(s=o);var l=e[r].active;return null!==c&&(l=c),Object(x.a)(Object(x.a)({},e),{},Object(st.a)({},r,Object(x.a)(Object(x.a)({},e[r]),{},{active:l,loading:i,data:s})));case"LOGOUT":return Object(x.a)({},xt);default:return e}},mt=Object(ot.c)({settings:dt,userData:ut,forms:Ot,dialogs:gt,steppers:pt}),vt=Object(ot.e)(mt),ft=function(e){e&&e instanceof Function&&a.e(73).then(a.bind(null,1290)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;a(e),n(e),r(e),c(e),i(e)}))};a(181);window.axios=a(182),window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",window.axios.defaults.baseURL=window.location.protocol+"//"+window.location.host+"/api",i.a.render(Object(V.jsx)(r.a.StrictMode,{children:Object(V.jsx)(Y.a,{store:vt,children:Object(V.jsx)(o.a,{getUserConfirmation:function(e,t){t(window.confirm(e))},children:Object(V.jsx)(it,{})})})}),document.getElementById("root")),ft()},83:function(e,t,a){"use strict";t.a=a.p+"static/media/gedure-logo-recto.264eba53.svg"},85:function(e,t,a){"use strict";t.a=function(){return{type:"LOGOUT"}}}},[[200,8,14]]]);
//# sourceMappingURL=main.4fbb6c17.chunk.js.map