"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[7078],{96364:function(e,n,t){t.d(n,{t:function(){return f}});var i=t(39281),r=t(10703),a=t(79836),s=t(53994),o=t(35855),c=t(53382),l=t(56890),d=t(20890),u=t(23060),h=t(94454),m=t(80184),x={separer:{marginBottom:2}};function g(e){return(0,m.jsx)(s.Z,{children:e.children})}var j=function(e){var n,t=Object.assign({},e);switch(t.level){case 1:n="h5";break;case 2:default:n="h6";break;case 3:n="subtitle1";break;case 4:n="subtitle2"}return(0,m.jsx)(d.Z,{gutterBottom:!0,variant:n,className:"text__bold--big",children:t.children})};var f={h1:j,h2:j,h3:j,h4:j,h5:j,h6:j,a:function(e){return(0,m.jsx)(u.Z,{target:"_blank",href:e.href,children:e.children})},p:function(e){return(0,m.jsx)(d.Z,{sx:x.separer,children:e.children})},table:function(e){return(0,m.jsx)(i.Z,{component:r.Z,sx:x.separer,children:(0,m.jsx)(a.Z,{size:"small","aria-label":"a dense table",children:e.children})})},thead:function(e){return(0,m.jsx)(l.Z,{children:e.children})},tbody:function(e){return(0,m.jsx)(c.Z,{children:e.children})},tr:function(e){return(0,m.jsx)(o.Z,{children:e.children})},td:g,th:g,li:function(e){var n=Object.assign({},e);return(0,m.jsx)("li",{children:(0,m.jsx)(d.Z,{component:"span",children:n.children})})},input:function(e){return(0,m.jsx)(h.Z,{color:"primary",checked:e.checked})}}},68859:function(e,n,t){t.d(n,{Z:function(){return d}});var i=t(68870),r=t(26445),a=t(61889),s=t(20890),o=t(23060),c=t(40046),l=t(80184);function d(){return(0,l.jsx)(i.Z,{bgcolor:"primary.main",color:"primary.contrastText",component:"footer",py:3,children:(0,l.jsx)(r.Z,{children:(0,l.jsxs)(a.ZP,{container:!0,alignItems:"center",children:[(0,l.jsx)(a.ZP,{item:!0,xs:12,sm:!0,children:(0,l.jsx)(s.Z,{children:'\xa9 U.E.P A.P.E.P "La Candelaria" | 2022'})}),(0,l.jsxs)(a.ZP,{container:!0,direction:"column",item:!0,xs:12,sm:!0,alignItems:"flex-end",children:[(0,l.jsx)(s.Z,{variant:"h6",className:"text__opacity--semi text__bold--semi",children:"Powered by"}),(0,l.jsx)(o.Z,{target:"_blank",href:"",children:(0,l.jsx)("img",{src:c.Z,alt:"Logo de gedure",height:"30",style:{opacity:.99}})})]})]})})})}},81075:function(e,n,t){t.d(n,{Z:function(){return c}});var i=t(72791),r=t(86951),a=t(16030),s=t(80064),o=t(5016);function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.messageTo200,t=void 0===n||n,c=e.messageTo400,l=void 0===c||c,d=e.message400,u=void 0!==d&&d,h=e.messageTo404,m=void 0===h||h,x=e.message404,g=void 0===x?"Ruta URL no encontrada":x,j=e.messageTo422,f=void 0===j||j,v=e.message422,p=void 0===v?"Error al verificar los datos":v,Z=(0,r.Ds)(),_=Z.enqueueSnackbar,b=(0,a.v9)((function(e){return e.notistack})),y=b.notiText,w=b.notiStatus,C=b.notiVariant,k=(0,a.I0)();(0,i.useEffect)((function(){return 200===w||201===w?t&&_(y,{variant:C}):400===w?l&&_(u||y,{variant:"warning"}):401===w?(_("Sesi\xf3n expirada",{variant:"info"}),k((0,o.Rg)())):403===w?_("No tienes permisos para esta acci\xf3n",{variant:"error"}):404===w?m&&_(y||g,{variant:"warning"}):422===w?f&&_(p,{variant:"error"}):429===w?(_("Demasiadas peticiones",{variant:"info"}),k((0,o.Rg)())):500===w?_("No se ha podido conectar con la base de datos",{variant:"error"}):"offline"===w&&_("Imposible conectarse con el servidor",{variant:"error"}),function(){k((0,s.ZN)())}}),[y,w,C,k,_,t,l,u,m,g,f,p])}},57078:function(e,n,t){t.r(n),t.d(n,{default:function(){return O}});var i=t(1413),r=t(72791),a=t(16871),s=t(68870),o=t(26445),c=t(61889),l=t(20068),d=t(13400),u=t(13239),h=t(20890),m=t(67394),x=t(94721),g=t(63352),j=t(18096),f=t(96364),v=t(16030),p=t(29439),Z=t(45987),_=t(57483),b=t(47047),y=t(80184),w=["srcRequest","alt","width","height","style","loading"];function C(e){var n=e.srcRequest,t=e.alt,r=e.width,a=void 0===r?"auto":r,s=e.height,o=void 0===s?"auto":s,c=e.style,l=e.loading,d=void 0===l?(0,y.jsx)(b.Z,{width:a,height:o}):l,u=(0,Z.Z)(e,w),h=(0,_.dd)({selector:"img"}),m=h.register,x=h.isReady,g={display:x?"block":"none"};return c&&(g=c),(0,y.jsxs)("div",{ref:m(),children:[!x&&d,(0,y.jsx)("img",(0,i.Z)({style:g,src:n,alt:t,width:a,height:o},u))]})}var k=t(31009),N=t(38996),R=t(29823),I=t(99657),P=t(71968),S=t.n(P),V=t(3915);var E=function(e){var n=e.src,t=e.onClose,i=e.currentImg,a=e.setCurrentImg,s=0===i&&!0,o=i===n.length-1&&!0,c=(0,r.useCallback)((function(){var e=i+1;n[e]&&a(e)}),[i,n,a]),l=(0,r.useCallback)((function(){var e=i-1;n[e]&&a(e)}),[i,n,a]),u=(0,r.useCallback)((function(e){"Escape"===e.key&&t(),["ArrowLeft","d"].includes(e.key)&&document.getElementById("VisorImgReactComponent__left").click(),["ArrowRight","a"].includes(e.key)&&document.getElementById("VisorImgReactComponent__right").click()}),[t]),h=(0,r.useCallback)((function(){(0,V.R)(n[i])}),[i,n]);return(0,r.useEffect)((function(){return document.addEventListener("keydown",u),function(){document.removeEventListener("keydown",u)}}),[i,u]),document.body.style.overflow="hidden",(0,y.jsxs)("div",{className:"VisorImgReactComponent",children:[(0,y.jsxs)("div",{className:"VisorImgReactComponent__controlls",children:[(0,y.jsx)("span",{onClick:l,className:"VisorImgReactComponent__left",id:"VisorImgReactComponent__left",children:s?(0,y.jsx)(d.Z,{"aria-label":"prev img",onClick:l,children:(0,y.jsx)(k.Z,{style:{fontSize:"40px",opacity:.5,color:"white"}})}):(0,y.jsx)(d.Z,{"aria-label":"prev img",onClick:l,children:(0,y.jsx)(k.Z,{style:{fontSize:"40px",color:"white"}})})}),(0,y.jsx)("span",{onClick:c,className:"VisorImgReactComponent__right",id:"VisorImgReactComponent__right",children:o?(0,y.jsx)(d.Z,{"aria-label":"next img",onClick:c,children:(0,y.jsx)(N.Z,{style:{fontSize:"40px",opacity:.5,color:"white"}})}):(0,y.jsx)(d.Z,{"aria-label":"next img",onClick:c,children:(0,y.jsx)(N.Z,{style:{fontSize:"40px",color:"white"}})})})]}),(0,y.jsxs)("div",{className:"VisorImgReactComponent__visor",children:[(0,y.jsxs)("div",{className:"VisorImgReactComponent__options",children:[(0,y.jsx)("span",{onClick:h,className:"VisorImgReactComponent__download",children:(0,y.jsx)(d.Z,{"aria-label":"download img",children:(0,y.jsx)(I.Z,{style:{color:"white"}})})}),(0,y.jsx)("span",{onClick:t,className:"VisorImgReactComponent__close",children:(0,y.jsx)(d.Z,{"aria-label":"close viwer",children:(0,y.jsx)(R.Z,{style:{color:"white"}})})})]}),n.map((function(e,n){return i===n?(0,y.jsx)(C,{alt:"imagen selected",className:"imgShow",srcRequest:e,loading:(0,y.jsx)(S(),{type:"bubbles",width:150,height:100})},n):(0,y.jsx)(C,{alt:"imagen selected",className:"imgShow",srcRequest:e,style:{display:"none"},loading:null},n)}))]})]})};function T(e){var n=e.imgs,t=(0,r.useState)(!1),i=(0,p.Z)(t,2),a=i[0],s=i[1],o=(0,r.useState)(0),l=(0,p.Z)(o,2),d=l[0],u=l[1],h=n.length-6,m=n.map((function(e,n){return 6===n?(0,y.jsx)(c.ZP,{container:!0,justifyContent:"center",item:!0,xs:6,sm:4,md:3,children:(0,y.jsxs)("span",{className:"imagePreview__More",onClick:function(){s(!0),u(6)},children:["+",h]},n)},n):n<6?(0,y.jsx)(c.ZP,{container:!0,justifyContent:"center",item:!0,xs:6,sm:4,md:3,children:(0,y.jsx)(C,{src:e,alt:"imagen".concat(n+1),width:110,height:100,className:"imagePreview",onClick:function(){s(!0),u(n)}})},n):null}));return(0,y.jsxs)(c.ZP,{container:!0,justifyContent:"center",spacing:2,item:!0,xs:12,children:[m,a&&(0,y.jsx)(E,{src:n,onClose:function(){document.body.style.overflow="auto",u(0),s(!1)},currentImg:d,setCurrentImg:u})]})}var L={divider:{marginTop:3,marginBottom:3},portada:{marginBottom:16,objectFit:"cover"}};function B(e){var n=e.title,t=e.content,i=e.fecha_humano,a=e.fecha_humano_modify,s=e.user,l=e.url_imgs,d=e.url_portada,u=e.only_users,m=e.created_at,p=e.updated_at,Z=(0,v.v9)((function(e){return{auth:e.auth.auth,userRedux:e.auth.user}})),_=Z.auth,b=Z.userRedux;function w(){return(0,y.jsxs)(o.Z,{children:[(0,y.jsx)(h.Z,{className:"text__bold--big",variant:"h4",children:n}),(0,y.jsxs)(h.Z,{className:"text__bold--big text__opacity--semi",variant:"h6",children:["Publicado ",-1===i.search("-")?i:"el ".concat(i),(0,y.jsx)(h.Z,{className:"text__bold--big",variant:"h6",component:"span",color:"primary",children:(null===s||void 0===s?void 0:s.name)&&" - ".concat(s.name)}),m!==p&&(0,y.jsxs)(h.Z,{className:"text__opacity--semi",variant:"h6",component:"span",children:[" (Editado ",a,")"]})]})]})}var C=function(){return(0,y.jsxs)(r.Fragment,{children:[d?(0,y.jsx)("img",{style:L.portada,src:d,alt:"portada de la publicaci\xf3n",width:"100%",height:250}):null,(0,y.jsx)(g.D,{remarkPlugins:[j.Z],children:t,components:f.t})]})};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(w,{}),(0,y.jsx)(x.Z,{sx:L.divider}),(0,y.jsxs)(o.Z,{children:[(0,y.jsx)(c.ZP,{container:!0,spacing:2,children:(0,y.jsx)(c.ZP,{item:!0,xs:12,children:(0,y.jsx)(C,{})})}),(null===l||void 0===l?void 0:l.length)&&(0,y.jsx)(T,{imgs:l}),_&&b.privilegio&&(0,y.jsxs)(h.Z,{variant:"body2",align:"right",className:"text__opacity--semi",sx:{mt:2},children:["Noticia solo para usuarios: ",u?"Si":"No"]})]})]})}var q=t(68859),z=t(81075),F=t(18658),A=t(33524),D={container:{flexGrow:1,paddingBottom:10,marginTop:{xs:"80px",sm:12}}};function O(){var e=(0,a.UO)().slug;(0,z.Z)({messageTo200:!1,messageTo404:!1});var n=(0,v.v9)((function(e){return{news:e.requestStatus.newsShow,auth:e.auth.auth}})),t=n.news,x=t.loading,g=t.data,j=n.auth;console.log(x);var f=(0,v.I0)();document.title=g.title?"".concat(g.title," - La Candelaria"):"La Candelaria";var p=(0,a.s0)();return(0,r.useEffect)((function(){var n=null;return x&&(n=f((0,F.a)(e))),function(){n&&n.abort(),f((0,A.u2)({select:"newsShow"}))}}),[f,e]),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(s.Z,{componet:"main",sx:D.container,children:[(0,y.jsx)(o.Z,{children:(0,y.jsx)(s.Z,{mb:3,children:(0,y.jsx)(c.ZP,{container:!0,justifyContent:"space-between",children:(0,y.jsx)(l.Z,{title:"Volver",arrow:!0,children:(0,y.jsx)(d.Z,{onClick:function(){window.history.state&&window.history.state.idx>0?p(-1):p("/noticias")},"aria-label":"return",children:(0,y.jsx)(m.Z,{})})})})})}),(null===g||void 0===g?void 0:g.slug)&&(0,y.jsx)(B,(0,i.Z)({},g)),x&&(0,y.jsx)(c.ZP,{container:!0,justifyContent:"center",children:(0,y.jsx)(u.Z,{})}),!(null!==g&&void 0!==g&&g.slug)&&!x&&(0,y.jsx)(c.ZP,{container:!0,justifyContent:"center",children:(0,y.jsx)(h.Z,{children:"No se pudo encontrar esta noticia."})})]}),!j&&(0,y.jsx)(q.Z,{})]})}}}]);
//# sourceMappingURL=7078.6f6d68d3.chunk.js.map