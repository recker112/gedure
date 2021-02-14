(this.webpackJsonpGedure=this.webpackJsonpGedure||[]).push([[56,64],{6120:function(e,t,a){"use strict";t.a=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return{type:"UPDATE_FORM_DATA",payload:{form:e,loading:t,data:a}}}},6322:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(6365),c=a(6354),o=a(13),u=function(e,t){return{type:"UPDATE_TOUR",payload:{open:e,tour:t}}};t.a=function(e){var t=e.steps,a=e.select,n=Object(o.d)((function(e){return{tourOpen:e.settings.tour[a]}})).tourOpen,s=Object(o.c)();return r.a.createElement(l.a,{steps:t,isOpen:n,disableInteraction:!0,onAfterOpen:function(){document.body.style.overflowY="hidden"},onBeforeClose:function(){document.body.style.overflowY="auto"},showCloseButton:!1,rounded:5,lastStepNextButton:r.a.createElement(c.a,{size:"small",color:"primary",onClick:function(){s(u(!1,a))}},"Terminar gu\xeda")})}},6664:function(e,t,a){"use strict";a.d(t,"a",(function(){return m}));var n=a(0),r=a.n(n),l=a(11),c=a(6040),o=a(6102),u=a(57),s=a(108),i=Object(s.a)((function(e){return{avatar:{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText}}}));function m(e){var t=e.user,a=i(),n=Object(l.h)().pathname.split("/"),s=(n.splice(0,1),n[n.length-1].toString().replace("-"," "));return r.a.createElement(c.a,{container:!0,alignItems:"center",spacing:2},r.a.createElement(c.a,{item:!0},r.a.createElement(o.a,{src:null===t||void 0===t?void 0:t.avatar,className:a.avatar,alt:"Avatar de ".concat(null===t||void 0===t?void 0:t.name)},null===t||void 0===t?void 0:t.name.substring(0,1).toUpperCase())),r.a.createElement(c.a,{item:!0},r.a.createElement(u.a,{variant:"h6",className:"text__bold--semi"},null===t||void 0===t?void 0:t.name)),r.a.createElement(c.a,{item:!0},r.a.createElement(u.a,{variant:"h6",className:"text__bold--semi"},"/")),r.a.createElement(c.a,{item:!0},r.a.createElement(u.a,{variant:"h6",className:"text__bold--semi"},n.length-1!==4||""===s?"Perfil":s[0].toUpperCase()+s.slice(1))))}},6725:function(e,t,a){"use strict";a.r(t);var n=a(46),r=a.n(n),l=a(63),c=a(34),o=a(41),u=a(0),s=a.n(u),i=a(11),m=a(6215),d=a(6040),p=a(6044),b=a(6193),E=a(6092),f=a(108),g=a(98),v=a(6648),y=a(6650),h=a(6166),O=a(6664),j=a(57),k=a(6354),x=a(15),z=a(6322);function C(){var e=Object(x.a)(),t=[{selector:"",content:function(e){var t=e.goTo;return s.a.createElement("div",null,s.a.createElement(j.a,{color:"primary",className:"text__bold--big",variant:"h5"},"Ver usuario"),s.a.createElement(j.a,{variant:"body1"},"En esta secci\xf3n podr\xe1 ver todos los datos de un usuario en espec\xedfico, adem\xe1s, podr\xe1 modificar los datos y realizar diversas acciones referentes al mismo."),s.a.createElement(k.a,{size:"small",color:"primary",onClick:function(){t(7)}},"Saltar tour"))},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="perfil"]',content:function(){return s.a.createElement(j.a,{variant:"body1"},"Esta secci\xf3n agrupa los diferentes ",s.a.createElement("strong",null,"datos visibles")," del usuario.")},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="personal"]',content:function(){return s.a.createElement(j.a,{variant:"body1"},"Esta secci\xf3n agrupa todos los ",s.a.createElement("strong",null,"datos personales")," del usuario.")},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="contrase\xf1a"]',content:function(){return s.a.createElement(j.a,{variant:"body1"},"Esta secci\xf3n le permite ",s.a.createElement("strong",null,"cambiar la contrase\xf1a")," del usuario, use esta opci\xf3n con cautela.")},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="permisos"]',content:function(){return s.a.createElement(j.a,{variant:"body1"},"En esta secci\xf3n puede ",s.a.createElement("strong",null,"conceder o quitar permisos")," a una cuenta, activando o desactivando ",s.a.createElement("strong",null,"funcionalidades del sistema")," para ese usuario.")},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="opciones"]',content:function(){return s.a.createElement(j.a,{variant:"body1"},"En esta secci\xf3n puede realizar ",s.a.createElement("strong",null,"diversas acciones")," para el usuario.")},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="regresar"]',content:function(){return s.a.createElement(j.a,{variant:"body1"},"Aqu\xed puede regresar a ",s.a.createElement("strong",null,"Usuarios"),".")},style:{backgroundColor:e.palette.background.paper}},{selector:"",content:function(){return s.a.createElement(j.a,{variant:"body1"},"Con esto finaliza esta gu\xeda, navege entre otras partes del sistema para encontrar m\xe1s gu\xedas.")},style:{backgroundColor:e.palette.background.paper}}];return s.a.createElement(z.a,{select:"ver_usuarios",steps:t})}var P=a(13),S=a(6120);a.d(t,"ReturnSelected",(function(){return J})),a.d(t,"default",(function(){return H}));var _=Object(u.lazy)((function(){return a.e(61).then(a.bind(null,6780))})),w=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(62)]).then(a.bind(null,7092))})),N=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(49)]).then(a.bind(null,6781))})),R=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(40)]).then(a.bind(null,7093))})),U=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(4),a.e(8),a.e(51)]).then(a.bind(null,6654))})),T=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(4),a.e(30)]).then(a.bind(null,6655))})),A=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(41)]).then(a.bind(null,6676))})),D=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(32)]).then(a.bind(null,6656))})),B=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(42)]).then(a.bind(null,6660))})),F=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(43)]).then(a.bind(null,6661))})),M=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(4),a.e(44)]).then(a.bind(null,6657))})),V=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(7),a.e(53)]).then(a.bind(null,6658))})),G=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(33)]).then(a.bind(null,6659))})),q=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(34)]).then(a.bind(null,7094))})),L=Object(u.lazy)((function(){return a.e(68).then(a.bind(null,7099))})),I=Object(f.a)((function(e){var t;return{containerMain:(t={flexGrow:1,paddingBottom:e.spacing(3)},Object(o.a)(t,e.breakpoints.up("xs"),{marginTop:"80px"}),Object(o.a)(t,e.breakpoints.up("sm"),{marginTop:e.spacing(12)}),t),button:{cursor:"pointer"},buttonNested:{cursor:"pointer",marginLeft:e.spacing(2)}}}));function J(e){var t=e.children,a=e.url,n=e.onClick,r=e.nested,l=I(),c=Object(i.j)({path:a,exact:!Boolean(n)}),o=Object(i.g)();return s.a.createElement(m.a,{className:l[r?"buttonNested":"button"],component:"span",fontSize:"body1.fontSize",color:c?null:"text.secondary",onClick:n||function(){return o.push(a)}},t)}function W(){var e,t,a,n=Object(i.j)().url,r=Object(u.useState)(!1),l=Object(c.a)(r,2),o=l[0],b=l[1],E=Object(P.d)((function(e){return{data:e.forms.showUser.data}})).data,f=Object(i.g)();return s.a.createElement(d.a,{item:!0,xs:12,sm:3},s.a.createElement(m.a,{mb:1,"data-tour":"perfil"},s.a.createElement(J,{url:"".concat(n)},"Perfil")),s.a.createElement(m.a,{mb:1,"data-tour":"personal"},s.a.createElement(J,{url:"".concat(n,"/personal"),onClick:function(){return b(!o)}},"Datos personales")),s.a.createElement(p.a,{in:o,timeout:"auto",unmountOnExit:!0},"V-"===(null===(e=E.user)||void 0===e?void 0:e.privilegio)&&s.a.createElement(s.a.Fragment,null,s.a.createElement(m.a,{mb:1},s.a.createElement(J,{url:"".concat(n,"/personal-estudiante"),nested:!0},"Estudiante")),s.a.createElement(m.a,{mb:1},s.a.createElement(J,{url:"".concat(n,"/personal-representante"),nested:!0},"Representante")),s.a.createElement(m.a,{mb:1},s.a.createElement(J,{url:"".concat(n,"/personal-padres"),nested:!0},"Padres"))),"A-"===(null===(t=E.user)||void 0===t?void 0:t.privilegio)&&s.a.createElement(m.a,{mb:1},s.a.createElement(J,{url:"".concat(n,"/personal-usuario"),nested:!0},"Usuario"))),"V-"===(null===(a=E.user)||void 0===a?void 0:a.privilegio)&&s.a.createElement(m.a,{mb:1},s.a.createElement(J,{url:"".concat(n,"/curso")},"Curso")),s.a.createElement(m.a,{mb:1,"data-tour":"contrase\xf1a"},s.a.createElement(J,{url:"".concat(n,"/contrase\xf1a")},"Contrase\xf1a")),s.a.createElement(m.a,{mb:1,"data-tour":"permisos"},s.a.createElement(J,{url:"".concat(n,"/permisos")},"Permisos")),s.a.createElement(m.a,{mb:1,"data-tour":"opciones"},s.a.createElement(J,{url:"".concat(n,"/opciones")},"Opciones")),s.a.createElement(m.a,{mb:1,"data-tour":"regresar"},s.a.createElement(J,{onClick:function(){return f.push("/gedure/usuarios")}},"Regresar")))}var Y=function(){return s.a.createElement(d.a,{container:!0,justify:"center",item:!0,xs:12,sm:9},s.a.createElement(b.a,null))};function H(){document.title="La Candelaria - Ver usuario";var e=Object(i.i)().id,t=Object(i.j)().url,a=Object(P.d)((function(e){return{loading:e.forms.showUser.loading,data:e.forms.showUser.data}})),n=a.loading,c=a.data,o=Object(P.c)(),p=Object(g.a)().fetchData,f=I();return Object(u.useEffect)((function(){return function(){var t=Object(l.a)(r.a.mark((function t(){var a,n;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={url:"v1/user/".concat(e),type:"get",message404:"No se pudo encontrar al usuario",messageToFinish:!1},t.next=3,p(a);case 3:n=t.sent,o(n?Object(S.a)("showUser",!1,n):Object(S.a)("showUser",!1));case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()(),function(){o(Object(S.a)("showUser",!0,{}))}}),[]),s.a.createElement("main",{className:f.containerMain},s.a.createElement(E.a,{maxWidth:"md"},n&&s.a.createElement(m.a,{align:"center"},s.a.createElement(b.a,null)),!n&&c.user&&s.a.createElement(s.a.Fragment,null,s.a.createElement(m.a,{mb:4},s.a.createElement(O.a,{user:c.user})),s.a.createElement(d.a,{container:!0,spacing:2},s.a.createElement(W,null),s.a.createElement(d.a,{item:!0,xs:12,sm:9},s.a.createElement(h.a,{utils:v.a,locale:y.a},s.a.createElement(u.Suspense,{fallback:s.a.createElement(Y,null)},s.a.createElement(i.d,null,s.a.createElement(i.b,{path:"".concat(t),exact:!0},s.a.createElement(_,{id:e}),s.a.createElement(w,{id:e})),s.a.createElement(i.b,{path:"".concat(t,"/personal-usuario"),exact:!0},s.a.createElement(U,{id:e})),s.a.createElement(i.b,{path:"".concat(t,"/personal-estudiante"),exact:!0},s.a.createElement(T,{id:e}),s.a.createElement(A,{id:e}),s.a.createElement(D,{id:e})),s.a.createElement(i.b,{path:"".concat(t,"/personal-representante"),exact:!0},s.a.createElement(M,{id:e}),"E"!==c.user.personal_data.repre_nacionalidad&&s.a.createElement(V,{id:e}),s.a.createElement(G,{id:e})),s.a.createElement(i.b,{path:"".concat(t,"/personal-padres"),exact:!0},s.a.createElement(B,{id:e}),s.a.createElement(F,{id:e})),s.a.createElement(i.b,{path:"".concat(t,"/curso"),exact:!0},s.a.createElement(q,{id:e})),s.a.createElement(i.b,{path:"".concat(t,"/contrase\xf1a"),exact:!0},s.a.createElement(N,{id:e})),s.a.createElement(i.b,{path:"".concat(t,"/permisos"),exact:!0},s.a.createElement(R,{id:e})),s.a.createElement(i.b,{path:"".concat(t,"/opciones"),exact:!0},s.a.createElement(L,{id:e})),s.a.createElement(i.b,null,s.a.createElement(i.a,{to:"".concat(t)})))))))),!n&&!c.user&&s.a.createElement(m.a,{fontSize:"body1.fontSize",align:"center"},"No se ha podido encontrar al usuario #",e,", es posible que este usuario se encuentre desactivado.")),s.a.createElement(C,null))}},7070:function(e,t,a){"use strict";a.r(t);var n=a(34),r=a(41),l=a(0),c=a.n(l),o=a(11),u=a(6040),s=a(6215),i=a(6044),m=a(6193),d=a(6092),p=a(108),b=a(6648),E=a(6650),f=a(6166),g=a(6725),v=a(6664),y=a(57),h=a(6354),O=a(15),j=a(6322);function k(){var e=Object(O.a)(),t=[{selector:"",content:function(e){var t=e.goTo;return c.a.createElement("div",null,c.a.createElement(y.a,{color:"primary",className:"text__bold--big",variant:"h5"},"Cuenta"),c.a.createElement(y.a,{variant:"body1"},"En esta secci\xf3n podr\xe1 ",c.a.createElement("strong",null,"actualizar sus datos")," y realizar diversas acciones de su cuenta."),c.a.createElement(h.a,{size:"small",color:"primary",onClick:function(){t(5)}},"Saltar tour"))},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="perfil"]',content:function(){return c.a.createElement(y.a,{variant:"body1"},"Esta secci\xf3n se agrupa los diferentes ",c.a.createElement("strong",null,"datos visibles")," su cuenta.")},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="personal"]',content:function(){return c.a.createElement(y.a,{variant:"body1"},"Esta secci\xf3n agrupa todos sus ",c.a.createElement("strong",null,"datos personales"),".")},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="contrase\xf1a"]',content:function(){return c.a.createElement(y.a,{variant:"body1"},"En esta secci\xf3n podr\xe1 ",c.a.createElement("strong",null,"cambiar su contrase\xf1a"),".")},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="opciones"]',content:function(){return c.a.createElement(y.a,{variant:"body1"},"En esta secci\xf3n podr\xe1 realizar diversas ",c.a.createElement("strong",null,"acciones en su cuenta"),".")},style:{backgroundColor:e.palette.background.paper}},{selector:"",content:function(){return c.a.createElement(y.a,{variant:"body1"},"Con esto finaliza esta gu\xeda, navege entre otras partes del sistema para encontrar m\xe1s gu\xedas.")},style:{backgroundColor:e.palette.background.paper}}];return c.a.createElement(j.a,{select:"cuenta",steps:t})}var x=a(13);a.d(t,"default",(function(){return G}));var z=Object(l.lazy)((function(){return a.e(54).then(a.bind(null,7080))})),C=Object(l.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(58)]).then(a.bind(null,7081))})),P=Object(l.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(4),a.e(8),a.e(47)]).then(a.bind(null,7082))})),S=Object(l.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(4),a.e(28)]).then(a.bind(null,7083))})),_=Object(l.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(36)]).then(a.bind(null,7084))})),w=Object(l.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(45),a.e(59)]).then(a.bind(null,7085))})),N=Object(l.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(4),a.e(39)]).then(a.bind(null,7086))})),R=Object(l.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(7),a.e(50)]).then(a.bind(null,7087))})),U=Object(l.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(46),a.e(60)]).then(a.bind(null,7088))})),T=Object(l.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(37)]).then(a.bind(null,7089))})),A=Object(l.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(38)]).then(a.bind(null,7090))})),D=Object(l.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(35)]).then(a.bind(null,7091))})),B=Object(l.lazy)((function(){return a.e(67).then(a.bind(null,7095))})),F=Object(p.a)((function(e){var t;return{containerMain:(t={flexGrow:1,paddingBottom:e.spacing(3)},Object(r.a)(t,e.breakpoints.up("xs"),{marginTop:"80px"}),Object(r.a)(t,e.breakpoints.up("sm"),{marginTop:e.spacing(12)}),t)}}));function M(){var e=Object(o.j)().url,t=Object(l.useState)(!1),a=Object(n.a)(t,2),r=a[0],m=a[1],d=Object(x.d)((function(e){return{user:e.userData.user}})).user;return c.a.createElement(u.a,{item:!0,xs:12,sm:3},c.a.createElement(s.a,{mb:1,"data-tour":"perfil"},c.a.createElement(g.ReturnSelected,{url:"".concat(e)},"Perfil")),c.a.createElement(s.a,{mb:1,"data-tour":"personal"},c.a.createElement(g.ReturnSelected,{url:"".concat(e,"/personal"),onClick:function(){return m(!r)}},"Datos personales")),c.a.createElement(i.a,{in:r,timeout:"auto",unmountOnExit:!0},"V-"===d.privilegio&&c.a.createElement(c.a.Fragment,null,c.a.createElement(s.a,{mb:1},c.a.createElement(g.ReturnSelected,{url:"".concat(e,"/personal-estudiante"),nested:!0},"Estudiante")),c.a.createElement(s.a,{mb:1},c.a.createElement(g.ReturnSelected,{url:"".concat(e,"/personal-representante"),nested:!0},"Representante")),c.a.createElement(s.a,{mb:1},c.a.createElement(g.ReturnSelected,{url:"".concat(e,"/personal-padres"),nested:!0},"Padres"))),"A-"===d.privilegio&&c.a.createElement(s.a,{mb:1},c.a.createElement(g.ReturnSelected,{url:"".concat(e,"/personal-usuario"),nested:!0},"Usuario"))),c.a.createElement(s.a,{mb:1,"data-tour":"contrase\xf1a"},c.a.createElement(g.ReturnSelected,{url:"".concat(e,"/contrase\xf1a")},"Contrase\xf1a")),c.a.createElement(s.a,{mb:1,"data-tour":"opciones"},c.a.createElement(g.ReturnSelected,{url:"".concat(e,"/opciones")},"Opciones")))}var V=function(){return c.a.createElement(u.a,{container:!0,justify:"center",item:!0,xs:12,sm:9},c.a.createElement(m.a,null))};function G(){document.title="La Candelaria - Cuenta";var e=Object(o.j)().url,t=Object(x.d)((function(e){return{user:e.userData.user}})).user,a=F();return c.a.createElement("main",{className:a.containerMain},c.a.createElement(d.a,{maxWidth:"md"},c.a.createElement(s.a,{mb:4},c.a.createElement(v.a,{user:t})),c.a.createElement(u.a,{container:!0,spacing:2},c.a.createElement(M,null),c.a.createElement(u.a,{item:!0,xs:12,sm:9},c.a.createElement(f.a,{utils:b.a,locale:E.a},c.a.createElement(l.Suspense,{fallback:c.a.createElement(V,null)},c.a.createElement(o.d,null,c.a.createElement(o.b,{path:"".concat(e),exact:!0},c.a.createElement(z,null),c.a.createElement(C,null)),c.a.createElement(o.b,{path:"".concat(e,"/personal-usuario"),exact:!0},c.a.createElement(P,null)),c.a.createElement(o.b,{path:"".concat(e,"/personal-estudiante"),exact:!0},c.a.createElement(S,null),c.a.createElement(_,null),c.a.createElement(w,null)),c.a.createElement(o.b,{path:"".concat(e,"/personal-representante"),exact:!0},c.a.createElement(N,null),"E"!==t.personal_data.repre_nacionalidad&&c.a.createElement(R,null),c.a.createElement(U,null)),c.a.createElement(o.b,{path:"".concat(e,"/personal-padres"),exact:!0},c.a.createElement(T,null),c.a.createElement(A,null)),c.a.createElement(o.b,{path:"".concat(e,"/contrase\xf1a"),exact:!0},c.a.createElement(D,null)),c.a.createElement(o.b,{path:"".concat(e,"/opciones"),exact:!0},c.a.createElement(B,null)),c.a.createElement(o.b,null,c.a.createElement(o.a,{to:"".concat(e)})))))))),c.a.createElement(k,null))}}}]);
//# sourceMappingURL=56.87d433f0.chunk.js.map