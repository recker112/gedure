"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[5088],{91526:function(e,n,r){r(72791);var t=r(4837),o=r(61091),a=r(59434),s=r(57048),i=r(80184);n.Z=function(e){var n=e.steps,r=e.select,c=e.version,u=void 0===c?"v1":c,d=(0,a.v9)((function(e){return{tourOpen:e.configs.tour[r]}})).tourOpen,l=(0,a.I0)();return(0,i.jsx)(t.ZP,{steps:n,isOpen:!d,disableInteraction:!0,onAfterOpen:function(){document.body.style.overflowY="hidden"},onBeforeClose:function(){document.body.style.overflowY="auto"},showNavigationNumber:!1,showCloseButton:!1,rounded:5,lastStepNextButton:(0,i.jsx)(o.Z,{component:"span",size:"small",color:"primary",onClick:function(){l((0,s.Mn)({open:!0,tour:r,version:u}))},children:"Terminar gu\xeda"})})}},81075:function(e,n,r){r.d(n,{Z:function(){return c}});var t=r(72791),o=r(86951),a=r(59434),s=r(80064),i=r(5016);function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.messageTo200,r=void 0===n||n,c=e.messageTo400,u=void 0===c||c,d=e.message400,l=void 0!==d&&d,p=e.message403,h=void 0===p?"No tienes permisos para esta acci\xf3n":p,x=e.messageTo404,m=void 0===x||x,v=e.message404,f=void 0===v?"Ruta URL no encontrada":v,g=e.messageTo422,j=void 0===g||g,b=e.message422,Z=void 0===b?"Error al verificar los datos":b,_=(0,o.Ds)(),S=_.enqueueSnackbar,k=(0,a.v9)((function(e){return e.notistack})),y=k.notiText,w=k.notiStatus,C=k.notiVariant,U=(0,a.I0)();(0,t.useEffect)((function(){return 200===w||201===w?r&&S(y,{variant:C}):400===w?u&&S(l||y,{variant:"warning"}):401===w?(S("Sesi\xf3n expirada",{variant:"info"}),U((0,i.Rg)())):403===w?S(h,{variant:"error"}):404===w?m&&S(y||f,{variant:"warning"}):422===w?j&&S(Z,{variant:"error"}):429===w?(S("Demasiadas peticiones",{variant:"info"}),U((0,i.Rg)())):500===w?S("No se ha podido conectar con la base de datos",{variant:"error"}):"offline"===w&&S("Revise su conexi\xf3n a internet",{variant:"error"}),function(){U((0,s.ZN)())}}),[y,w,C,U,S,r,u,l,h,m,f,j,Z])}},10530:function(e,n,r){r.d(n,{Z:function(){return l}});r(72791);var t=r(57689),o=r(33888),a=r(50228),s=r(73978),i=r(4565),c=r(59434),u=r(80184),d={avatar:function(e){return{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText}}};function l(e){var n=e.userName,r=e.userAvatar,l=(0,c.v9)((function(e){return{name:e.requestStatus.userShow.userSelected.name,avatar:e.requestStatus.userShow.userSelected.avatar}})),p=l.name,h=l.avatar,x=(0,t.TH)().pathname.split("/").splice(5);return(0,u.jsxs)(o.Z,{sx:{userSelect:"none"},"aria-label":"breadcrumb",children:[(0,u.jsxs)(a.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,u.jsx)(s.Z,{src:r||h,sx:d.avatar,alt:"Avatar de ".concat(n||p),children:(n||p).substring(0,1).toUpperCase()}),(0,u.jsx)(i.Z,{sx:{ml:1},component:"span",variant:"h6",className:"text__bold--semi",children:n||p})]}),x.length?x.map((function(e,n){return(0,u.jsx)(i.Z,{component:"span",variant:"h6",className:"text__bold--semi",children:e[0].toUpperCase()+e.slice(1)},n)})):(0,u.jsx)(i.Z,{component:"span",variant:"h6",className:"text__bold--semi",children:"Perfil"})]})}},54873:function(e,n,r){r.d(n,{Z:function(){return m}});var t=r(29439),o=r(1413),a=r(45987),s=r(72791),i=r(57689),c=r(50228),u=r(45953),d=r(74244),l=r(80184),p=["children","url","onClick","nested"],h={button:{cursor:"pointer",userSelect:"none"},buttonNested:function(e){return{cursor:"pointer",ml:e.spacing(2),userSelect:"none"}}};function x(e){var n=e.children,r=e.url,t=void 0===r?"":r,s=e.onClick,u=e.nested,d=(0,a.Z)(e,p),x=(0,i.bS)({path:t,exact:!Boolean(s)}),m=(0,i.s0)();return(0,l.jsx)(c.Z,(0,o.Z)((0,o.Z)({sx:h[u?"buttonNested":"button"],component:"span",fontSize:"body1.fontSize",color:x?null:"text.secondary",onClick:s||function(){return m(t,{replace:!0})}},d),{},{children:n}))}function m(e){var n=e.user,r=e.path,o=e.permissions,a=void 0===o||o,p=e.toBack,h=void 0===p||p,m=e.toBackURL,v=void 0===m?"/gedure/usuarios":m,f=e.curso,g=void 0===f||f,j=e.children,b=void 0===j?function(){}:j,Z=(0,s.useState)(!1),_=(0,t.Z)(Z,2),S=_[0],k=_[1],y=(0,i.UO)().id,w=(0,i.s0)(),C=r||"/gedure/usuarios/ver/".concat(y);return(0,l.jsxs)(u.ZP,{item:!0,xs:12,sm:3,children:[(0,l.jsx)(c.Z,{mb:1,children:(0,l.jsx)(x,{"data-tour":"gdShowU__perfil",url:"".concat(C),children:"Perfil"})}),(0,l.jsx)(c.Z,{mb:1,children:(0,l.jsx)(x,{"data-tour":"gdShowU__personal",url:"".concat(C,"/personal"),onClick:function(){return k((function(e){return!e}))},children:"Datos personales"})}),(0,l.jsxs)(d.Z,{in:S,timeout:"auto",unmountOnExit:!0,children:["V-"===n.privilegio&&(0,l.jsxs)(s.Fragment,{children:[(0,l.jsx)(c.Z,{mb:1,children:(0,l.jsx)(x,{url:"".concat(C,"/personal/estudiante"),nested:!0,children:"Estudiante"})}),(0,l.jsx)(c.Z,{mb:1,children:(0,l.jsx)(x,{url:"".concat(C,"/personal/representante"),nested:!0,children:"Representante"})}),(0,l.jsx)(c.Z,{mb:1,children:(0,l.jsx)(x,{url:"".concat(C,"/personal/padres"),nested:!0,children:"Padres"})})]}),"A-"===n.privilegio&&(0,l.jsx)(c.Z,{mb:1,children:(0,l.jsx)(x,{url:"".concat(C,"/personal/usuario"),nested:!0,children:"Usuario"})})]}),"V-"===n.privilegio&&g&&(0,l.jsx)(c.Z,{mb:1,children:(0,l.jsx)(x,{url:"".concat(C,"/curso"),children:"Curso"})}),(0,l.jsx)(c.Z,{mb:1,"data-tour":"gdShowU__contrase\xf1a",children:(0,l.jsx)(x,{url:"".concat(C,"/credenciales"),children:"Credenciales"})}),a&&(0,l.jsx)(c.Z,{mb:1,"data-tour":"gdShowU__permisos",children:(0,l.jsx)(x,{url:"".concat(C,"/permisos"),children:"Permisos"})}),(0,l.jsx)(c.Z,{mb:1,"data-tour":"gdShowU__opciones",children:(0,l.jsx)(x,{url:"".concat(C,"/opciones"),children:"Opciones"})}),h&&(0,l.jsx)(c.Z,{mb:1,"data-tour":"gdShowU__regresar",children:(0,l.jsx)(x,{onClick:function(){return w(v)},children:"Regresar"})}),b(x)]})}},65088:function(e,n,r){r.r(n),r.d(n,{default:function(){return y}});var t=r(72791),o=r(57689),a=r(50228),s=r(20803),i=r(96580),c=r(45953),u=r(28029),d=r(36571),l=r(13830),p=r(81075),h=r(10530),x=r(54873),m=r(4565),v=r(61091),f=r(74142),g=r(91526),j=r(80184);function b(){var e=(0,f.Z)(),n=[{selector:"",content:function(e){var n=e.goTo;return(0,j.jsxs)("div",{children:[(0,j.jsx)(m.Z,{color:"primary",className:"text__bold--big",variant:"h5",children:"Ver usuario"}),(0,j.jsx)(m.Z,{variant:"body1",children:"En esta secci\xf3n podr\xe1 ver todos los datos de un usuario en espec\xedfico, adem\xe1s, podr\xe1 modificar los datos y realizar diversas acciones referentes al mismo."}),(0,j.jsx)(v.Z,{size:"small",color:"primary",onClick:function(){n(7)},children:"Saltar tour"})]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdShowU__perfil"]',content:function(){return(0,j.jsxs)(m.Z,{variant:"body1",children:["Esta secci\xf3n agrupa los diferentes ",(0,j.jsx)("strong",{children:"datos visibles"})," del usuario."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdShowU__personal"]',content:function(){return(0,j.jsxs)(m.Z,{variant:"body1",children:["Esta secci\xf3n agrupa todos los ",(0,j.jsx)("strong",{children:"datos personales"})," del usuario."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdShowU__contrase\xf1a"]',content:function(){return(0,j.jsxs)(m.Z,{variant:"body1",children:["Esta secci\xf3n le permite ",(0,j.jsx)("strong",{children:"cambiar la contrase\xf1a"})," del usuario, use esta opci\xf3n con cautela."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdShowU__permisos"]',content:function(){return(0,j.jsxs)(m.Z,{variant:"body1",children:["En esta secci\xf3n puede ",(0,j.jsx)("strong",{children:"conceder o quitar permisos"})," a una cuenta, activando o desactivando ",(0,j.jsx)("strong",{children:"funcionalidades del sistema"})," para ese usuario."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdShowU__opciones"]',content:function(){return(0,j.jsxs)(m.Z,{variant:"body1",children:["En esta secci\xf3n puede realizar ",(0,j.jsx)("strong",{children:"diversas acciones"})," para el usuario."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdShowU__regresar"]',content:function(){return(0,j.jsxs)(m.Z,{variant:"body1",children:["Aqu\xed puede ",(0,j.jsx)("strong",{children:"regresar a la pesta\xf1a anterior"}),"."]})},style:{backgroundColor:e.palette.background.paper}},{selector:"",content:function(){return(0,j.jsx)(m.Z,{variant:"body1",children:"Con esto finaliza esta gu\xeda, navegue entre otras partes del sistema para encontrar m\xe1s gu\xedas."})},style:{backgroundColor:e.palette.background.paper}}];return(0,j.jsx)(g.Z,{select:"ver_usuarios",steps:n})}var Z=r(59434),_=r(68110),S=r(6728),k={container:{flexGrow:1,paddingBottom:6,marginTop:{xs:"80px",sm:12}}};function y(){var e=(0,o.UO)().id;(0,p.Z)({message404:"Usuario no encontrado"});var n=(0,Z.v9)((function(e){return{userShow:e.requestStatus.userShow,count_notify:e.auth.notify.count}})),r=n.userShow,m=r.userSelected,v=r.loading,f=n.count_notify,g=(0,Z.I0)();return document.title=f>0?"(".concat(f,") Ver usuario - La Candelaria"):"Ver usuario - La Candelaria",(0,t.useEffect)((function(){return v&&g((0,_.P)(e)),function(){g((0,S.u2)({select:"userShow"}))}}),[]),(0,j.jsxs)(a.Z,{component:"main",sx:k.container,children:[(0,j.jsxs)(s.Z,{maxWidth:"md",children:[v&&(0,j.jsx)(a.Z,{textAlign:"center",children:(0,j.jsx)(i.Z,{})}),!v&&!m.username&&(0,j.jsxs)(a.Z,{fontSize:"body1.fontSize",textAlign:"center",children:["No se ha podido encontrar al usuario #",e,", es posible que este usuario se encuentre desactivado o eliminado."]}),!v&&m.username&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(a.Z,{mb:4,children:(0,j.jsx)(h.Z,{})}),(0,j.jsxs)(c.ZP,{container:!0,spacing:2,children:[(0,j.jsx)(x.Z,{user:m}),(0,j.jsx)(c.ZP,{item:!0,xs:12,sm:9,children:(0,j.jsx)(t.Suspense,{fallback:(0,j.jsx)(a.Z,{textAlign:"center",children:(0,j.jsx)(i.Z,{})}),children:(0,j.jsx)(d._,{dateAdapter:u.H,adapterLocale:l.Z,children:(0,j.jsx)(o.j3,{})})})})]})]})]}),(0,j.jsx)(b,{})]})}}}]);
//# sourceMappingURL=5088.900c330b.chunk.js.map