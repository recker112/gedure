"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[3254],{76429:function(e,n,o){var t=o(1413),r=o(72791),a=o(55931),i=o(80184),s=r.forwardRef((function(e,n){return(0,i.jsx)(a.Z,(0,t.Z)({direction:"up",ref:n},e))}));n.Z=s},39481:function(e,n,o){o.d(n,{Z:function(){return h}});o(72791);var t=o(5574),r=o(65661),a=o(39157),i=o(51691),s=o(97123),l=o(24518),c=o(76429),d=o(16030),u=o(39709),f=o(80184);function h(e){var n=e.rdx1,o=e.rdx2,h=e.close,x=e.request,Z=e.children,p=(0,d.v9)((function(e){return e[n][o]})),v=p.open,g=p.loading,j=p.data,m=(0,d.I0)();return(0,f.jsxs)(t.Z,{open:v,TransitionComponent:c.Z,"aria-labelledby":"confirm-dialog-title","aria-describedby":"confirm-dialog-description",children:[(0,f.jsx)(r.Z,{children:"\xbfEst\xe1 seguro?"}),(0,f.jsx)(a.Z,{children:(0,f.jsx)(i.Z,{id:"confirm-dialog-description",children:Z(j)})}),(0,f.jsxs)(s.Z,{children:[(0,f.jsx)(l.Z,{disabled:g,onClick:function(){m(h)},color:"inherit",children:"Cancelar"}),(0,f.jsx)(u.Z,{onClick:function(){m(x(j))},loading:g,color:"inherit",children:"Confirmar"})]})]})}},22604:function(e,n,o){function t(e){if("string"===typeof e){var n=e.substring(1,2),o=e.substring(0,1);return"".concat(o,"G"===n?" grado":" a\xf1o")}}o.d(n,{Z:function(){return t}})},81075:function(e,n,o){o.d(n,{Z:function(){return l}});var t=o(72791),r=o(86951),a=o(16030),i=o(80064),s=o(5016);function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.messageTo200,o=void 0===n||n,l=e.messageTo400,c=void 0===l||l,d=e.message400,u=void 0!==d&&d,f=e.messageTo404,h=void 0===f||f,x=e.message404,Z=void 0===x?"Ruta URL no encontrada":x,p=e.messageTo422,v=void 0===p||p,g=e.message422,j=void 0===g?"Error al verificar los datos":g,m=(0,r.Ds)(),b=m.enqueueSnackbar,C=(0,a.v9)((function(e){return e.notistack})),w=C.notiText,S=C.notiStatus,y=C.notiVariant,z=(0,a.I0)();(0,t.useEffect)((function(){return 200===S||201===S?o&&b(w,{variant:y}):400===S?c&&b(u||w,{variant:"warning"}):401===S?(b("Sesi\xf3n expirada",{variant:"info"}),z((0,s.Rg)())):403===S?b("No tienes permisos para esta acci\xf3n",{variant:"error"}):404===S?h&&b(w||Z,{variant:"warning"}):422===S?v&&b(j,{variant:"error"}):429===S?(b("Demasiadas peticiones",{variant:"info"}),z((0,s.Rg)())):500===S?b("No se ha podido conectar con la base de datos",{variant:"error"}):"offline"===S&&b("Revise su conexi\xf3n a internet",{variant:"error"}),function(){z((0,i.ZN)())}}),[w,S,y,z,b,o,c,u,h,Z,v,j])}},63254:function(e,n,o){o.r(n),o.d(n,{default:function(){return U}});var t=o(1413),r=o(72791),a=o(16871),i=o(68870),s=o(91614),l=o(61889),c=o(20068),d=o(13400),u=o(13239),f=o(67394),h=o(43950),x=o(29439),Z=o(10703),p=o(39709),v=o(89885),g=o(73518),j=o(60383),m=o(31770),b=o(22604),C=o(16030),w=o(6728),S=o(86416),y=o(80184),z=["#2f80ED","#219653","#f2994A","#9B51E0","#EB5757","#c1c1c1"];function B(e){var n,o=e.id,t=e.lapso,a=e.fecha_humano,s=e.fecha_humano_modify,d=e.curso,u=e.created_at,f=e.updated_at,h=(0,r.useState)((n=z.length-1,Math.floor(Math.random()*Math.floor(n+1)))),B=(0,x.Z)(h,1)[0],M=(0,r.useState)(!1),H=(0,x.Z)(M,2),L=H[0],T=H[1],V=(0,C.v9)((function(e){return{progress:e.requestStatus.verBoletas.progress}})).progress,I=(0,C.I0)();return(0,y.jsx)(l.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,y.jsx)(Z.Z,{elevation:0,className:"paper--padding",children:(0,y.jsxs)(l.ZP,{container:!0,spacing:2,children:[(0,y.jsxs)(l.ZP,{container:!0,item:!0,xs:12,children:[(0,y.jsx)(l.ZP,{item:!0,xs:2,sm:3,md:3,children:(0,y.jsx)(v.Z,{style:{fontSize:60,color:z[B]}})}),(0,y.jsx)(l.ZP,{item:!0,xs:!0,children:(0,y.jsxs)(i.Z,{component:"span",style:{color:z[B]},fontSize:"h6.fontSize",fontWeight:600,children:[(0,b.Z)(d.curso)," ",d.seccion," - ",t,"\xb0 Lapso"]})}),(0,y.jsx)(l.ZP,{item:!0,xs:12,children:(0,y.jsx)(i.Z,{fontSize:"body1.fontSize",color:"text.disabled",fontWeight:600,children:u===f?"Subido ".concat(a):"Modificado ".concat(s)})})]}),(0,y.jsxs)(l.ZP,{container:!0,justifyContent:"flex-end",alignItems:"center",item:!0,xs:12,children:[(0,y.jsx)(c.Z,{title:"Eliminar",arrow:!0,children:(0,y.jsx)(p.Z,{onClick:function(){I((0,w.CI)({open:!0,data:{curso:d,lapso:t,id:o},select:"deleteBoleta"}))},color:"inherit",children:(0,y.jsx)(j.Z,{})})}),(0,y.jsx)(c.Z,{title:"Reemplazar",arrow:!0,children:(0,y.jsx)(p.Z,{onClick:function(){I((0,w.CI)({open:!0,data:{curso:d.curso,seccion:d.seccion,lapso:t,id:o},select:"replaceBoleta"}))},color:"inherit",children:(0,y.jsx)(m.Z,{})})}),(0,y.jsx)(c.Z,{title:"Descargar",arrow:!0,children:(0,y.jsx)(p.Z,{loading:L,loadingIndicator:L&&V<99?"".concat(V,"%"):null,onClick:function(){T(!0),I((0,S.b)({id:o,curso:d,lapso:t,setLoading:T}))},color:"inherit",children:(0,y.jsx)(g.Z,{})})})]})]})})})}var M=o(81075),H=o(39481),L=o(5574),T=o(65661),V=o(39157),I=o(51691),R=o(24518),k=o(20890),D=o(97123),P=o(61134),_=o(76429),q=o(17621);function E(){var e,n=(0,C.v9)((function(e){return e.requestStatus.replaceBoleta})),o=n.open,r=n.loading,a=n.progress,s=n.data,c=(0,C.I0)(),d=(0,P.cI)({mode:"onTouched",shouldUnregister:!0}),u=d.handleSubmit,f=d.register,h=d.watch,x=d.formState.errors;return(0,y.jsxs)(L.Z,{open:o,TransitionComponent:_.Z,children:[(0,y.jsx)(T.Z,{children:"Reemplazar boleta"}),(0,y.jsx)(V.Z,{children:(0,y.jsxs)(l.ZP,{container:!0,spacing:2,children:[(0,y.jsx)(l.ZP,{item:!0,xs:12,children:(0,y.jsxs)(I.Z,{children:["Est\xe1 a punto de reemplazar la boleta ",(0,y.jsxs)("strong",{children:[s.curso," ",s.seccion," ",s.lapso,"\xb0 Lapso"]}),". Tenga en cuenta que al reemplazar la boleta se borrar\xe1 la anterior."]})}),(0,y.jsxs)(l.ZP,{container:!0,alignItems:"center",item:!0,xs:12,children:[(0,y.jsx)("input",(0,t.Z)((0,t.Z)({id:"boleta-upload-file"},f("boleta",{required:"* Debe subir un archivo"})),{},{defaultValue:null,style:{display:"none"},accept:"application/pdf",type:"file"})),(0,y.jsx)("label",{htmlFor:"boleta-upload-file",children:(0,y.jsx)(R.Z,{variant:"contained",color:Boolean(x.boleta)?"error":"secondary",component:"span",children:"Cargar archivo"})}),Boolean(x.boleta)&&(0,y.jsx)(i.Z,{ml:2,color:"#f44336",children:(0,y.jsx)(k.Z,{children:x.boleta.message})}),0!==((null===(e=h("boleta"))||void 0===e?void 0:e.length)||[]).length&&(0,y.jsx)(i.Z,{ml:2,children:(0,y.jsx)(k.Z,{children:"Archivo cargado"})})]})]})}),(0,y.jsxs)(D.Z,{children:[(0,y.jsx)(R.Z,{disabled:r,onClick:function(){c((0,w.CI)({open:!1,data:{},select:"replaceBoleta"}))},color:"inherit",children:"Cancelar"}),(0,y.jsx)(p.Z,{onClick:u((function(e){var n=new FormData;n.append("boleta",e.boleta[0]),n.append("_method","PUT"),c((0,q.s)({id:s.id,submitData:n}))})),loading:r,loadingIndicator:r&&a<99?"".concat(a,"%"):null,variant:"text",color:"inherit",children:"Cargar"})]})]})}var A=o(3005),N=o(75151),F={container:{flexGrow:1,paddingBottom:6,marginTop:{xs:"80px",sm:12}}};function U(){var e,n,o=(0,a.UO)().id;(0,M.Z)();var x=(0,C.v9)((function(e){return{loading:e.requestStatus.verBoletas.loading,data:e.requestStatus.verBoletas.data,count_notify:e.auth.notify.count}})),Z=x.loading,p=x.data,v=x.count_notify,g=(0,C.I0)();document.title=v>0?"(".concat(v,") Boletas - La Candelaria"):"Boletas - La Candelaria";var j=(0,a.s0)(),m=function(){g((0,w.CI)({loading:!0,select:"verBoletas"}))};return(0,r.useEffect)((function(){Z&&g((0,N.z)(o))}),[Z]),(0,r.useEffect)((function(){return function(){g((0,w.CI)({loading:!0,select:"verBoletas"}))}}),[]),(0,y.jsx)(i.Z,{component:"main",sx:F.container,children:(0,y.jsxs)(s.Z,{children:[(0,y.jsx)(i.Z,{mb:3,children:(0,y.jsxs)(l.ZP,{container:!0,justifyContent:"space-between",children:[(0,y.jsx)(c.Z,{title:"Volver",arrow:!0,children:(0,y.jsx)(d.Z,{disabled:Z,onClick:function(){window.history.state&&window.history.state.idx>0?j(-1):j("/gedure/publicaciones")},"aria-label":"return",component:"span",children:(0,y.jsx)(f.Z,{})})}),(0,y.jsx)(c.Z,{title:"Recargar",arrow:!0,children:(0,y.jsx)(d.Z,{disabled:Z,onClick:m,"aria-label":"return",component:"span",children:(0,y.jsx)(h.Z,{})})})]})}),Z&&(0,y.jsx)(i.Z,{textAlign:"center",children:(0,y.jsx)(u.Z,{})}),!Z&&null!==(e=p.boletas)&&void 0!==e&&e.length?(0,y.jsxs)(r.Fragment,{children:[(0,y.jsxs)(i.Z,{fontSize:"h4.fontSize",mb:3,className:"text__bold--big",children:["Boletas subidas de ",p.user]}),(0,y.jsx)(l.ZP,{container:!0,spacing:2,children:p.boletas.map((function(e,n){return(0,y.jsx)(B,(0,t.Z)({},e),n)}))})]}):null,!Z&&!(null!==(n=p.boletas)&&void 0!==n&&n.length)&&(0,y.jsx)(i.Z,{textAlign:"center",fontSize:"body1.fontSize",children:"No hay boletas cargadas para este estudiante."}),(0,y.jsx)(H.Z,{rdx1:"requestStatus",rdx2:"deleteBoleta",close:(0,w.CI)({open:!1,data:{},select:"deleteBoleta"}),request:function(e){return(0,A.Y)({submitData:e,refresh:m})},children:function(e){var n,o;return(0,y.jsxs)("span",{children:["Est\xe1 a punto de eliminar la boleta ",(0,y.jsxs)("strong",{children:[(0,b.Z)(null===(n=e.curso)||void 0===n?void 0:n.curso)," ",null===(o=e.curso)||void 0===o?void 0:o.seccion," - ",e.lapso,"\xb0 Lapso"]})," de ",(0,y.jsx)("strong",{children:p.user}),". Tenga en cuenta que esta acci\xf3n no se puede deshacer."]})}}),(0,y.jsx)(E,{})]})})}},67394:function(e,n,o){var t=o(64836);n.Z=void 0;var r=t(o(45649)),a=o(80184),i=(0,r.default)((0,a.jsx)("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}),"ArrowBack");n.Z=i},60383:function(e,n,o){var t=o(64836);n.Z=void 0;var r=t(o(45649)),a=o(80184),i=(0,r.default)((0,a.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"}),"DeleteForever");n.Z=i},73518:function(e,n,o){var t=o(64836);n.Z=void 0;var r=t(o(45649)),a=o(80184),i=(0,r.default)((0,a.jsx)("path",{d:"M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"}),"Download");n.Z=i},43950:function(e,n,o){var t=o(64836);n.Z=void 0;var r=t(o(45649)),a=o(80184),i=(0,r.default)((0,a.jsx)("path",{d:"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}),"Refresh");n.Z=i},51691:function(e,n,o){o.d(n,{Z:function(){return Z}});var t=o(63366),r=o(87462),a=o(72791),i=o(94419),s=o(66934),l=o(31402),c=o(20890),d=o(21217);function u(e){return(0,d.Z)("MuiDialogContentText",e)}(0,o(75878).Z)("MuiDialogContentText",["root"]);var f=o(80184),h=["children"],x=(0,s.ZP)(c.Z,{shouldForwardProp:function(e){return(0,s.FO)(e)||"classes"===e},name:"MuiDialogContentText",slot:"Root",overridesResolver:function(e,n){return n.root}})({}),Z=a.forwardRef((function(e,n){var o=(0,l.Z)({props:e,name:"MuiDialogContentText"}),a=(0,t.Z)(o,h),s=function(e){var n=e.classes,o=(0,i.Z)({root:["root"]},u,n);return(0,r.Z)({},n,o)}(a);return(0,f.jsx)(x,(0,r.Z)({component:"p",variant:"body1",color:"text.secondary",ref:n,ownerState:a},o,{classes:s}))}))},65661:function(e,n,o){var t=o(87462),r=o(63366),a=o(72791),i=o(28182),s=o(94419),l=o(20890),c=o(66934),d=o(31402),u=o(17673),f=o(85090),h=o(80184),x=["className","id"],Z=(0,c.ZP)(l.Z,{name:"MuiDialogTitle",slot:"Root",overridesResolver:function(e,n){return n.root}})({padding:"16px 24px",flex:"0 0 auto"}),p=a.forwardRef((function(e,n){var o=(0,d.Z)({props:e,name:"MuiDialogTitle"}),l=o.className,c=o.id,p=(0,r.Z)(o,x),v=o,g=function(e){var n=e.classes;return(0,s.Z)({root:["root"]},u.a,n)}(v),j=a.useContext(f.Z).titleId,m=void 0===j?c:j;return(0,h.jsx)(Z,(0,t.Z)({component:"h2",className:(0,i.Z)(g.root,l),ownerState:v,ref:n,variant:"h6",id:m},p))}));n.Z=p},31770:function(e,n,o){var t;n.Z=void 0;var r=(0,((t=o(71669))&&t.__esModule?t:{default:t}).default)("M14,3L12,1H4A2,2 0 0,0 2,3V15A2,2 0 0,0 4,17H11V19L15,16L11,13V15H4V3H14M21,10V21A2,2 0 0,1 19,23H8A2,2 0 0,1 6,21V19H8V21H19V12H14V7H8V13H6V7A2,2 0 0,1 8,5H16L21,10Z","FileReplaceOutline");n.Z=r}}]);
//# sourceMappingURL=3254.ef7e8cb3.chunk.js.map