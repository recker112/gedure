(this["webpackJsonpfrontend-la-candelaria"]=this["webpackJsonpfrontend-la-candelaria"]||[]).push([[61],{299:function(e,t,n){"use strict";t.a=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return{type:"UPDATE_FORM_DATA",payload:{form:e,loading:t,data:n}}}},505:function(e,t,n){"use strict";n(0);var a=n(627),r=n(235),c=n(14),s=function(e,t){return{type:"UPDATE_TOUR",payload:{open:e,tour:t}}},o=n(1);t.a=function(e){var t=e.steps,n=e.select,i=Object(c.d)((function(e){return{tourOpen:e.settings.tour[n]}})).tourOpen,l=Object(c.c)();return Object(o.jsx)(a.a,{steps:t,isOpen:!i,disableInteraction:!0,onAfterOpen:function(){document.body.style.overflowY="hidden"},onBeforeClose:function(){document.body.style.overflowY="auto"},showCloseButton:!1,rounded:5,lastStepNextButton:Object(o.jsx)(r.a,{size:"small",color:"primary",onClick:function(){l(s(!0,n))},children:"Terminar gu\xeda"})})}},887:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));n(0);var a=n(16),r=n(243),c=n(266),s=n(62),o=n(166),i=n(1),l=Object(o.a)((function(e){return{avatar:{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText}}}));function u(e){var t=e.user,n=e.maxLengthPath,o=l(),u=Object(a.h)().pathname.split("/"),d=(u.splice(0,1),u[u.length-1].toString().replace("-"," "));return Object(i.jsxs)(r.a,{container:!0,alignItems:"center",spacing:2,children:[Object(i.jsx)(r.a,{item:!0,children:Object(i.jsx)(c.a,{src:null===t||void 0===t?void 0:t.avatar,className:o.avatar,alt:"Avatar de ".concat(null===t||void 0===t?void 0:t.name),children:null===t||void 0===t?void 0:t.name.substring(0,1).toUpperCase()})}),Object(i.jsx)(r.a,{item:!0,children:Object(i.jsx)(s.a,{variant:"h6",className:"text__bold--semi",children:null===t||void 0===t?void 0:t.name})}),Object(i.jsx)(r.a,{item:!0,children:Object(i.jsx)(s.a,{variant:"h6",className:"text__bold--semi",children:"/"})}),Object(i.jsx)(r.a,{item:!0,children:Object(i.jsx)(s.a,{variant:"h6",className:"text__bold--semi",children:u.length-1!==n||""===d?"Perfil":d[0].toUpperCase()+d.slice(1)})})]})}},984:function(e,t,n){"use strict";n.r(t),n.d(t,"ReturnSelected",(function(){return W})),n.d(t,"default",(function(){return Q}));var a=n(55),r=n.n(a),c=n(69),s=n(36),o=n(38),i=n(0),l=n.n(i),u=n(16),d=n(229),j=n(243),b=n(212),O=n(369),p=n(244),h=n(166),x=n(110),m=n(852),f=n(855),g=n.n(f),v=n(274),y=n(887),k=n(62),z=n(235),C=n(18),P=n(505),w=n(1);function _(){var e=Object(C.a)(),t=[{selector:"",content:function(e){var t=e.goTo;return Object(w.jsxs)("div",{children:[Object(w.jsx)(k.a,{color:"primary",className:"text__bold--big",variant:"h5",children:"Ver usuario"}),Object(w.jsx)(k.a,{variant:"body1",children:"En esta secci\xf3n podr\xe1 ver todos los datos de un usuario en espec\xedfico, adem\xe1s, podr\xe1 modificar los datos y realizar diversas acciones referentes al mismo."}),Object(w.jsx)(z.a,{size:"small",color:"primary",onClick:function(){t(7)},children:"Saltar tour"})]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="perfil"]',content:function(){return Object(w.jsxs)(k.a,{variant:"body1",children:["Esta secci\xf3n agrupa los diferentes ",Object(w.jsx)("strong",{children:"datos visibles"})," del usuario."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="personal"]',content:function(){return Object(w.jsxs)(k.a,{variant:"body1",children:["Esta secci\xf3n agrupa todos los ",Object(w.jsx)("strong",{children:"datos personales"})," del usuario."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="contrase\xf1a"]',content:function(){return Object(w.jsxs)(k.a,{variant:"body1",children:["Esta secci\xf3n le permite ",Object(w.jsx)("strong",{children:"cambiar la contrase\xf1a"})," del usuario, use esta opci\xf3n con cautela."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="permisos"]',content:function(){return Object(w.jsxs)(k.a,{variant:"body1",children:["En esta secci\xf3n puede ",Object(w.jsx)("strong",{children:"conceder o quitar permisos"})," a una cuenta, activando o desactivando ",Object(w.jsx)("strong",{children:"funcionalidades del sistema"})," para ese usuario."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="opciones"]',content:function(){return Object(w.jsxs)(k.a,{variant:"body1",children:["En esta secci\xf3n puede realizar ",Object(w.jsx)("strong",{children:"diversas acciones"})," para el usuario."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="regresar"]',content:function(){return Object(w.jsxs)(k.a,{variant:"body1",children:["Aqu\xed puede regresar a ",Object(w.jsx)("strong",{children:"Usuarios"}),"."]})},style:{backgroundColor:e.palette.background.paper}},{selector:"",content:function(){return Object(w.jsx)(k.a,{variant:"body1",children:"Con esto finaliza esta gu\xeda, navege entre otras partes del sistema para encontrar m\xe1s gu\xedas."})},style:{backgroundColor:e.palette.background.paper}}];return Object(w.jsx)(P.a,{select:"ver_usuarios",steps:t})}var U=n(14),E=n(299),N=Object(i.lazy)((function(){return n.e(60).then(n.bind(null,1040))})),S=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(50)]).then(n.bind(null,1360))})),T=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(55)]).then(n.bind(null,1041))})),A=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(38)]).then(n.bind(null,1361))})),B=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(53)]).then(n.bind(null,878))})),D=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(32)]).then(n.bind(null,879))})),R=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(43)]).then(n.bind(null,880))})),F=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(51)]).then(n.bind(null,881))})),L=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(44)]).then(n.bind(null,885))})),V=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(45)]).then(n.bind(null,886))})),q=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(46)]).then(n.bind(null,882))})),M=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(33)]).then(n.bind(null,883))})),I=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(52)]).then(n.bind(null,884))})),J=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(30)]).then(n.bind(null,1362))})),Y=Object(i.lazy)((function(){return n.e(64).then(n.bind(null,1377))})),G=Object(h.a)((function(e){var t;return{containerMain:(t={flexGrow:1,paddingBottom:e.spacing(3)},Object(o.a)(t,e.breakpoints.up("xs"),{marginTop:"80px"}),Object(o.a)(t,e.breakpoints.up("sm"),{marginTop:e.spacing(12)}),t),button:{cursor:"pointer"},buttonNested:{cursor:"pointer",marginLeft:e.spacing(2)}}}));function W(e){var t=e.children,n=e.url,a=e.onClick,r=e.nested,c=G(),s=Object(u.j)({path:n,exact:!Boolean(a)}),o=Object(u.g)();return Object(w.jsx)(d.a,{className:c[r?"buttonNested":"button"],component:"span",fontSize:"body1.fontSize",color:s?null:"text.secondary",onClick:a||function(){return o.push(n)},children:t})}function H(){var e,t,n,a=Object(u.j)().url,r=Object(i.useState)(!1),c=Object(s.a)(r,2),o=c[0],O=c[1],p=Object(U.d)((function(e){return{data:e.forms.showUser.data}})).data,h=Object(u.g)();return Object(w.jsxs)(j.a,{item:!0,xs:12,sm:3,children:[Object(w.jsx)(d.a,{mb:1,"data-tour":"perfil",children:Object(w.jsx)(W,{url:"".concat(a),children:"Perfil"})}),Object(w.jsx)(d.a,{mb:1,"data-tour":"personal",children:Object(w.jsx)(W,{url:"".concat(a,"/personal"),onClick:function(){return O(!o)},children:"Datos personales"})}),Object(w.jsxs)(b.a,{in:o,timeout:"auto",unmountOnExit:!0,children:["V-"===(null===(e=p.user)||void 0===e?void 0:e.privilegio)&&Object(w.jsxs)(l.a.Fragment,{children:[Object(w.jsx)(d.a,{mb:1,children:Object(w.jsx)(W,{url:"".concat(a,"/personal-estudiante"),nested:!0,children:"Estudiante"})}),Object(w.jsx)(d.a,{mb:1,children:Object(w.jsx)(W,{url:"".concat(a,"/personal-representante"),nested:!0,children:"Representante"})}),Object(w.jsx)(d.a,{mb:1,children:Object(w.jsx)(W,{url:"".concat(a,"/personal-padres"),nested:!0,children:"Padres"})})]}),"A-"===(null===(t=p.user)||void 0===t?void 0:t.privilegio)&&Object(w.jsx)(d.a,{mb:1,children:Object(w.jsx)(W,{url:"".concat(a,"/personal-usuario"),nested:!0,children:"Usuario"})})]}),"V-"===(null===(n=p.user)||void 0===n?void 0:n.privilegio)&&Object(w.jsx)(d.a,{mb:1,children:Object(w.jsx)(W,{url:"".concat(a,"/curso"),children:"Curso"})}),Object(w.jsx)(d.a,{mb:1,"data-tour":"contrase\xf1a",children:Object(w.jsx)(W,{url:"".concat(a,"/contrase\xf1a"),children:"Contrase\xf1a"})}),Object(w.jsx)(d.a,{mb:1,"data-tour":"permisos",children:Object(w.jsx)(W,{url:"".concat(a,"/permisos"),children:"Permisos"})}),Object(w.jsx)(d.a,{mb:1,"data-tour":"opciones",children:Object(w.jsx)(W,{url:"".concat(a,"/opciones"),children:"Opciones"})}),Object(w.jsx)(d.a,{mb:1,"data-tour":"regresar",children:Object(w.jsx)(W,{onClick:function(){return h.push("/gedure/usuarios")},children:"Regresar"})})]})}var K=function(){return Object(w.jsx)(j.a,{container:!0,justify:"center",item:!0,xs:12,sm:9,children:Object(w.jsx)(O.a,{})})};function Q(){document.title="La Candelaria - Ver usuario";var e=Object(u.i)().id,t=Object(u.j)().url,n=Object(U.d)((function(e){return{loading:e.forms.showUser.loading,data:e.forms.showUser.data}})),a=n.loading,s=n.data,o=Object(U.c)(),b=Object(x.a)().fetchData,h=G();return Object(i.useEffect)((function(){return function(){var t=Object(c.a)(r.a.mark((function t(){var n,a;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={url:"v1/user/".concat(e),type:"get",message404:"No se pudo encontrar al usuario",messageToFinish:!1},t.next=3,b(n);case 3:a=t.sent,o(a?Object(E.a)("showUser",!1,a):Object(E.a)("showUser",!1));case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()(),function(){o(Object(E.a)("showUser",!0,{}))}}),[]),Object(w.jsxs)("main",{className:h.containerMain,children:[Object(w.jsxs)(p.a,{maxWidth:"md",children:[a&&Object(w.jsx)(d.a,{align:"center",children:Object(w.jsx)(O.a,{})}),!a&&s.user&&Object(w.jsxs)(l.a.Fragment,{children:[Object(w.jsx)(d.a,{mb:4,children:Object(w.jsx)(y.a,{user:s.user,maxLengthPath:4})}),Object(w.jsxs)(j.a,{container:!0,spacing:2,children:[Object(w.jsx)(H,{}),Object(w.jsx)(j.a,{item:!0,xs:12,sm:9,children:Object(w.jsx)(v.a,{utils:m.a,locale:g.a,children:Object(w.jsx)(i.Suspense,{fallback:Object(w.jsx)(K,{}),children:Object(w.jsxs)(u.d,{children:[Object(w.jsxs)(u.b,{path:"".concat(t),exact:!0,children:[Object(w.jsx)(N,{id:e}),Object(w.jsx)(S,{id:e})]}),Object(w.jsx)(u.b,{path:"".concat(t,"/personal-usuario"),exact:!0,children:Object(w.jsx)(B,{id:e})}),Object(w.jsxs)(u.b,{path:"".concat(t,"/personal-estudiante"),exact:!0,children:[Object(w.jsx)(D,{id:e}),Object(w.jsx)(R,{id:e}),Object(w.jsx)(F,{id:e})]}),Object(w.jsxs)(u.b,{path:"".concat(t,"/personal-representante"),exact:!0,children:[Object(w.jsx)(q,{id:e}),"E"!==s.user.personal_data.repre_nacionalidad&&Object(w.jsx)(M,{id:e}),Object(w.jsx)(I,{id:e})]}),Object(w.jsxs)(u.b,{path:"".concat(t,"/personal-padres"),exact:!0,children:[Object(w.jsx)(L,{id:e}),Object(w.jsx)(V,{id:e})]}),Object(w.jsx)(u.b,{path:"".concat(t,"/curso"),exact:!0,children:Object(w.jsx)(J,{id:e})}),Object(w.jsx)(u.b,{path:"".concat(t,"/contrase\xf1a"),exact:!0,children:Object(w.jsx)(T,{id:e})}),Object(w.jsx)(u.b,{path:"".concat(t,"/permisos"),exact:!0,children:Object(w.jsx)(A,{id:e})}),Object(w.jsx)(u.b,{path:"".concat(t,"/opciones"),exact:!0,children:Object(w.jsx)(Y,{id:e})}),Object(w.jsx)(u.b,{children:Object(w.jsx)(u.a,{to:"".concat(t)})})]})})})})]})]}),!a&&!s.user&&Object(w.jsxs)(d.a,{fontSize:"body1.fontSize",align:"center",children:["No se ha podido encontrar al usuario #",e,", es posible que este usuario se encuentre desactivado o eliminado."]})]}),Object(w.jsx)(_,{})]})}}}]);
//# sourceMappingURL=61.09daa9a0.chunk.js.map