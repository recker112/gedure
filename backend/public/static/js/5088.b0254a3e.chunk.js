"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[5088],{91526:function(e,n,r){r(72791);var t=r(53088),a=r(24518),o=r(16030),s=r(57048),i=r(80184);n.Z=function(e){var n=e.steps,r=e.select,c=e.version,u=void 0===c?"v1":c,d=(0,o.v9)((function(e){return{tourOpen:e.configs.tour[r]}})).tourOpen,l=(0,o.I0)();return(0,i.jsx)(t.ZP,{steps:n,isOpen:!d,disableInteraction:!0,onAfterOpen:function(){document.body.style.overflowY="hidden"},onBeforeClose:function(){document.body.style.overflowY="auto"},showCloseButton:!1,rounded:5,lastStepNextButton:(0,i.jsx)(a.Z,{component:"span",size:"small",color:"primary",onClick:function(){l((0,s.Mn)({open:!0,tour:r,version:u}))},children:"Terminar gu\xeda"})})}},81075:function(e,n,r){r.d(n,{Z:function(){return c}});var t=r(72791),a=r(86951),o=r(16030),s=r(80064),i=r(5016);function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.messageTo200,r=void 0===n||n,c=e.messageTo400,u=void 0===c||c,d=e.message400,l=void 0!==d&&d,p=e.messageTo404,h=void 0===p||p,x=e.message404,m=void 0===x?"Ruta URL no encontrada":x,v=e.messageTo422,f=void 0===v||v,g=e.message422,j=void 0===g?"Error al verificar los datos":g,b=(0,a.Ds)(),Z=b.enqueueSnackbar,_=(0,o.v9)((function(e){return e.notistack})),S=_.notiText,k=_.notiStatus,y=_.notiVariant,C=(0,o.I0)();(0,t.useEffect)((function(){return 200===k||201===k?r&&Z(S,{variant:y}):400===k?u&&Z(l||S,{variant:"warning"}):401===k?(Z("Sesi\xf3n expirada",{variant:"info"}),C((0,i.Rg)())):403===k?Z("No tienes permisos para esta acci\xf3n",{variant:"error"}):404===k?h&&Z(S||m,{variant:"warning"}):422===k?f&&Z(j,{variant:"error"}):429===k?(Z("Demasiadas peticiones",{variant:"info"}),C((0,i.Rg)())):500===k?Z("No se ha podido conectar con la base de datos",{variant:"error"}):"offline"===k&&Z("Revise su conexi\xf3n a internet",{variant:"error"}),function(){C((0,s.ZN)())}}),[S,k,y,C,Z,r,u,l,h,m,f,j])}},10530:function(e,n,r){r.d(n,{Z:function(){return l}});r(72791);var t=r(16871),a=r(93517),o=r(68870),s=r(93044),i=r(20890),c=r(16030),u=r(80184),d={avatar:function(e){return{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText}}};function l(e){var n=e.userName,r=e.userAvatar,l=(0,c.v9)((function(e){return{name:e.requestStatus.userShow.userSelected.name,avatar:e.requestStatus.userShow.userSelected.avatar}})),p=l.name,h=l.avatar,x=(0,t.TH)().pathname.split("/").splice(5);return(0,u.jsxs)(a.Z,{sx:{userSelect:"none"},"aria-label":"breadcrumb",children:[(0,u.jsxs)(o.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,u.jsx)(s.Z,{src:r||h,sx:d.avatar,alt:"Avatar de ".concat(n||p),children:(n||p).substring(0,1).toUpperCase()}),(0,u.jsx)(i.Z,{sx:{ml:1},component:"span",variant:"h6",className:"text__bold--semi",children:n||p})]}),x.length?x.map((function(e,n){return(0,u.jsx)(i.Z,{component:"span",variant:"h6",className:"text__bold--semi",children:e[0].toUpperCase()+e.slice(1)},n)})):(0,u.jsx)(i.Z,{component:"span",variant:"h6",className:"text__bold--semi",children:"Perfil"})]})}},54873:function(e,n,r){r.d(n,{Z:function(){return m}});var t=r(29439),a=r(1413),o=r(45987),s=r(72791),i=r(16871),c=r(68870),u=r(61889),d=r(56125),l=r(80184),p=["children","url","onClick","nested"],h={button:{cursor:"pointer",userSelect:"none"},buttonNested:function(e){return{cursor:"pointer",ml:e.spacing(2),userSelect:"none"}}};function x(e){var n=e.children,r=e.url,t=void 0===r?"":r,s=e.onClick,u=e.nested,d=(0,o.Z)(e,p),x=(0,i.bS)({path:t,exact:!Boolean(s)}),m=(0,i.s0)();return(0,l.jsx)(c.Z,(0,a.Z)((0,a.Z)({sx:h[u?"buttonNested":"button"],component:"span",fontSize:"body1.fontSize",color:x?null:"text.secondary",onClick:s||function(){return m(t,{replace:!0})}},d),{},{children:n}))}function m(e){var n=e.user,r=e.path,a=e.permissions,o=void 0===a||a,p=e.toBack,h=void 0===p||p,m=e.toBackURL,v=void 0===m?"/gedure/usuarios":m,f=e.curso,g=void 0===f||f,j=e.children,b=void 0===j?function(){}:j,Z=(0,s.useState)(!1),_=(0,t.Z)(Z,2),S=_[0],k=_[1],y=(0,i.UO)().id,C=(0,i.s0)(),w=r||"/gedure/usuarios/ver/".concat(y);return(0,l.jsxs)(u.ZP,{item:!0,xs:12,sm:3,children:[(0,l.jsx)(c.Z,{mb:1,children:(0,l.jsx)(x,{"data-tour":"gdShowU__perfil",url:"".concat(w),children:"Perfil"})}),(0,l.jsx)(c.Z,{mb:1,children:(0,l.jsx)(x,{"data-tour":"gdShowU__personal",url:"".concat(w,"/personal"),onClick:function(){return k((function(e){return!e}))},children:"Datos personales"})}),(0,l.jsxs)(d.Z,{in:S,timeout:"auto",unmountOnExit:!0,children:["V-"===n.privilegio&&(0,l.jsxs)(s.Fragment,{children:[(0,l.jsx)(c.Z,{mb:1,children:(0,l.jsx)(x,{url:"".concat(w,"/personal/estudiante"),nested:!0,children:"Estudiante"})}),(0,l.jsx)(c.Z,{mb:1,children:(0,l.jsx)(x,{url:"".concat(w,"/personal/representante"),nested:!0,children:"Representante"})}),(0,l.jsx)(c.Z,{mb:1,children:(0,l.jsx)(x,{url:"".concat(w,"/personal/padres"),nested:!0,children:"Padres"})})]}),"A-"===n.privilegio&&(0,l.jsx)(c.Z,{mb:1,children:(0,l.jsx)(x,{url:"".concat(w,"/personal/usuario"),nested:!0,children:"Usuario"})})]}),"V-"===n.privilegio&&g&&(0,l.jsx)(c.Z,{mb:1,children:(0,l.jsx)(x,{url:"".concat(w,"/curso"),children:"Curso"})}),(0,l.jsx)(c.Z,{mb:1,"data-tour":"gdShowU__contrase\xf1a",children:(0,l.jsx)(x,{url:"".concat(w,"/credenciales"),children:"Credenciales"})}),o&&(0,l.jsx)(c.Z,{mb:1,"data-tour":"gdShowU__permisos",children:(0,l.jsx)(x,{url:"".concat(w,"/permisos"),children:"Permisos"})}),(0,l.jsx)(c.Z,{mb:1,"data-tour":"gdShowU__opciones",children:(0,l.jsx)(x,{url:"".concat(w,"/opciones"),children:"Opciones"})}),h&&(0,l.jsx)(c.Z,{mb:1,"data-tour":"gdShowU__regresar",children:(0,l.jsx)(x,{onClick:function(){return C(v)},children:"Regresar"})}),b(x)]})}},65088:function(e,n,r){r.r(n),r.d(n,{default:function(){return y}});var t=r(72791),a=r(16871),o=r(68870),s=r(91614),i=r(13239),c=r(61889),u=r(16336),d=r(71652),l=r(13830),p=r(81075),h=r(10530),x=r(54873),m=r(20890),v=r(24518),f=r(13967),g=r(91526),j=r(80184);function b(){var e=(0,f.Z)(),n=[{selector:"",content:function(e){var n=e.goTo;return(0,j.jsxs)("div",{children:[(0,j.jsx)(m.Z,{color:"primary",className:"text__bold--big",variant:"h5",children:"Ver usuario"}),(0,j.jsx)(m.Z,{variant:"body1",children:"En esta secci\xf3n podr\xe1 ver todos los datos de un usuario en espec\xedfico, adem\xe1s, podr\xe1 modificar los datos y realizar diversas acciones referentes al mismo."}),(0,j.jsx)(v.Z,{size:"small",color:"primary",onClick:function(){n(7)},children:"Saltar tour"})]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdShowU__perfil"]',content:function(){return(0,j.jsxs)(m.Z,{variant:"body1",children:["Esta secci\xf3n agrupa los diferentes ",(0,j.jsx)("strong",{children:"datos visibles"})," del usuario."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdShowU__personal"]',content:function(){return(0,j.jsxs)(m.Z,{variant:"body1",children:["Esta secci\xf3n agrupa todos los ",(0,j.jsx)("strong",{children:"datos personales"})," del usuario."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdShowU__contrase\xf1a"]',content:function(){return(0,j.jsxs)(m.Z,{variant:"body1",children:["Esta secci\xf3n le permite ",(0,j.jsx)("strong",{children:"cambiar la contrase\xf1a"})," del usuario, use esta opci\xf3n con cautela."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdShowU__permisos"]',content:function(){return(0,j.jsxs)(m.Z,{variant:"body1",children:["En esta secci\xf3n puede ",(0,j.jsx)("strong",{children:"conceder o quitar permisos"})," a una cuenta, activando o desactivando ",(0,j.jsx)("strong",{children:"funcionalidades del sistema"})," para ese usuario."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdShowU__opciones"]',content:function(){return(0,j.jsxs)(m.Z,{variant:"body1",children:["En esta secci\xf3n puede realizar ",(0,j.jsx)("strong",{children:"diversas acciones"})," para el usuario."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdShowU__regresar"]',content:function(){return(0,j.jsxs)(m.Z,{variant:"body1",children:["Aqu\xed puede ",(0,j.jsx)("strong",{children:"regresar a la pesta\xf1a anterior"}),"."]})},style:{backgroundColor:e.palette.background.paper}},{selector:"",content:function(){return(0,j.jsx)(m.Z,{variant:"body1",children:"Con esto finaliza esta gu\xeda, navegue entre otras partes del sistema para encontrar m\xe1s gu\xedas."})},style:{backgroundColor:e.palette.background.paper}}];return(0,j.jsx)(g.Z,{select:"ver_usuarios",steps:n})}var Z=r(16030),_=r(68110),S=r(33524),k={container:{flexGrow:1,paddingBottom:6,marginTop:{xs:"80px",sm:12}}};function y(){document.title="Ver usuario - La Candelaria";var e=(0,a.UO)().id;(0,p.Z)({message404:"Usuario no encontrado"});var n=(0,Z.v9)((function(e){return e.requestStatus.userShow})),r=n.userSelected,m=n.loading,v=(0,Z.I0)();return(0,t.useEffect)((function(){return m&&v((0,_.P)(e)),function(){v((0,S.u2)({select:"userShow"}))}}),[]),(0,j.jsxs)(o.Z,{component:"main",sx:k.container,children:[(0,j.jsxs)(s.Z,{maxWidth:"md",children:[m&&(0,j.jsx)(o.Z,{textAlign:"center",children:(0,j.jsx)(i.Z,{})}),!m&&!r.username&&(0,j.jsxs)(o.Z,{fontSize:"body1.fontSize",textAlign:"center",children:["No se ha podido encontrar al usuario #",e,", es posible que este usuario se encuentre desactivado o eliminado."]}),!m&&r.username&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(o.Z,{mb:4,children:(0,j.jsx)(h.Z,{})}),(0,j.jsxs)(c.ZP,{container:!0,spacing:2,children:[(0,j.jsx)(x.Z,{user:r}),(0,j.jsx)(c.ZP,{item:!0,xs:12,sm:9,children:(0,j.jsx)(t.Suspense,{fallback:(0,j.jsx)(o.Z,{textAlign:"center",children:(0,j.jsx)(i.Z,{})}),children:(0,j.jsx)(d._,{dateAdapter:u.Z,adapterLocale:l.Z,children:(0,j.jsx)(a.j3,{})})})})]})]})]}),(0,j.jsx)(b,{})]})}}}]);
//# sourceMappingURL=5088.b0254a3e.chunk.js.map