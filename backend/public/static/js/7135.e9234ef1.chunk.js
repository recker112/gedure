"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[7135],{76429:function(e,n,t){var a=t(1413),r=t(72791),o=t(55931),i=t(80184),s=r.forwardRef((function(e,n){return(0,i.jsx)(o.Z,(0,a.Z)({direction:"up",ref:n},e))}));n.Z=s},39481:function(e,n,t){t.d(n,{Z:function(){return p}});t(72791);var a=t(5574),r=t(65661),o=t(39157),i=t(51691),s=t(97123),l=t(24518),c=t(76429),d=t(16030),u=t(39709),f=t(80184);function p(e){var n=e.rdx1,t=e.rdx2,p=e.close,h=e.request,x=e.children,Z=(0,d.v9)((function(e){return e[n][t]})),v=Z.open,g=Z.loading,m=Z.data,j=(0,d.I0)();return(0,f.jsxs)(a.Z,{open:v,TransitionComponent:c.Z,"aria-labelledby":"confirm-dialog-title","aria-describedby":"confirm-dialog-description",children:[(0,f.jsx)(r.Z,{children:"\xbfEst\xe1 seguro?"}),(0,f.jsx)(o.Z,{children:(0,f.jsx)(i.Z,{id:"confirm-dialog-description",children:x(m)})}),(0,f.jsxs)(s.Z,{children:[(0,f.jsx)(l.Z,{disabled:g,onClick:function(){j(p)},color:"inherit",children:"Cancelar"}),(0,f.jsx)(u.Z,{onClick:function(){j(h(m))},loading:g,color:"inherit",children:"Confirmar"})]})]})}},22604:function(e,n,t){function a(e){if("string"===typeof e){var n=e.substring(1,2),t=e.substring(0,1);return"".concat(t,"G"===n?" grado":" a\xf1o")}}t.d(n,{Z:function(){return a}})},81075:function(e,n,t){t.d(n,{Z:function(){return l}});var a=t(72791),r=t(86951),o=t(16030),i=t(80064),s=t(5016);function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.messageTo200,t=void 0===n||n,l=e.messageTo400,c=void 0===l||l,d=e.message400,u=void 0!==d&&d,f=e.messageTo404,p=void 0===f||f,h=e.message404,x=void 0===h?"Ruta URL no encontrada":h,Z=e.messageTo422,v=void 0===Z||Z,g=e.message422,m=void 0===g?"Error al verificar los datos":g,j=(0,r.Ds)(),b=j.enqueueSnackbar,C=(0,o.v9)((function(e){return e.notistack})),w=C.notiText,B=C.notiStatus,S=C.notiVariant,y=(0,o.I0)();(0,a.useEffect)((function(){return 200===B||201===B?t&&b(w,{variant:S}):400===B?c&&b(u||w,{variant:"warning"}):401===B?(b("Sesi\xf3n expirada",{variant:"info"}),y((0,s.Rg)())):403===B?b("No tienes permisos para esta acci\xf3n",{variant:"error"}):404===B?p&&b(w||x,{variant:"warning"}):422===B?v&&b(m,{variant:"error"}):429===B?(b("Demasiadas peticiones",{variant:"info"}),y((0,s.Rg)())):500===B?b("No se ha podido conectar con la base de datos",{variant:"error"}):"offline"===B&&b("Revise su conexi\xf3n a internet",{variant:"error"}),function(){y((0,i.ZN)())}}),[w,B,S,y,b,t,c,u,p,x,v,m])}},77135:function(e,n,t){t.r(n),t.d(n,{default:function(){return K}});var a=t(1413),r=t(72791),o=t(16871),i=t(68870),s=t(91614),l=t(61889),c=t(20068),d=t(13400),u=t(13239),f=t(67394),p=t(43950),h=t(29439),x=t(10703),Z=t(39709),v=t(89885),g=t(73518),m=t(60383),j=t(31770),b=t(22604),C=t(16030),w=t(6728),B=t(86416),S=t(80184),y=["#2f80ED","#219653","#f2994A","#9B51E0","#EB5757","#c1c1c1"];function z(e){var n,t=e.id,a=e.lapso,o=e.fecha_humano,s=e.fecha_humano_modify,d=e.curso,u=e.created_at,f=e.updated_at,p=(0,r.useState)((n=y.length-1,Math.floor(Math.random()*Math.floor(n+1)))),z=(0,h.Z)(p,1)[0],M=(0,C.v9)((function(e){return{progress:e.requestStatus.verBoletas.progress,loading:e.requestStatus.verBoletas.loadingDownload}})),T=M.progress,D=M.loading,H=(0,C.I0)();return(0,S.jsx)(l.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,S.jsx)(x.Z,{elevation:0,className:"paper--padding",children:(0,S.jsxs)(l.ZP,{container:!0,spacing:2,children:[(0,S.jsxs)(l.ZP,{container:!0,item:!0,xs:12,children:[(0,S.jsx)(l.ZP,{item:!0,xs:2,sm:3,md:3,children:(0,S.jsx)(v.Z,{style:{fontSize:60,color:y[z]}})}),(0,S.jsx)(l.ZP,{item:!0,xs:!0,children:(0,S.jsxs)(i.Z,{component:"span",style:{color:y[z]},fontSize:"h6.fontSize",fontWeight:600,children:[(0,b.Z)(d.curso)," ",d.seccion," - ",a,"\xb0 Lapso"]})}),(0,S.jsx)(l.ZP,{item:!0,xs:12,children:(0,S.jsx)(i.Z,{fontSize:"body1.fontSize",color:"text.disabled",fontWeight:600,children:u===f?"Subido ".concat(o):"Modificado ".concat(s)})})]}),(0,S.jsxs)(l.ZP,{container:!0,justifyContent:"flex-end",alignItems:"center",item:!0,xs:12,children:[(0,S.jsx)(c.Z,{title:"Eliminar",arrow:!0,children:(0,S.jsx)(Z.Z,{onClick:function(){H((0,w.CI)({open:!0,data:{curso:d,lapso:a,id:t},select:"deleteBoleta"}))},color:"inherit",children:(0,S.jsx)(m.Z,{})})}),(0,S.jsx)(c.Z,{title:"Reemplazar",arrow:!0,children:(0,S.jsx)(Z.Z,{onClick:function(){H((0,w.CI)({open:!0,data:{curso:d.curso,seccion:d.seccion,lapso:a,id:t},select:"replaceBoleta"}))},color:"inherit",children:(0,S.jsx)(j.Z,{})})}),(0,S.jsx)(c.Z,{title:"Descargar",arrow:!0,children:(0,S.jsx)(Z.Z,{loading:D,loadingIndicator:D&&T<99?"".concat(T,"%"):null,onClick:function(){H((0,B.b)({id:t,curso:d,lapso:a}))},color:"inherit",children:(0,S.jsx)(g.Z,{})})})]})]})})})}var M,T=t(81075),D=t(39481),H=t(5574),V=t(65661),k=t(39157),I=t(51691),P=t(24518),R=t(20890),L=t(97123),_=t(61134),q=t(76429),E=t(4942),A=t(74165),N=t(15861),F=t(69829),U=t(80064),J=(0,F.hg)("requestStatus/boletas/replace",function(){var e=(0,N.Z)((0,A.Z)().mark((function e(n,t){var a,r,o,i,s,l,c,d,u,f,p;return(0,A.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.id,r=n.submitData,t.getState,o=t.signal,i=t.dispatch,s=window.axios,l="v1/boleta/".concat(a),c=function(e){var n=Math.round(100*e.loaded/e.total);i((0,w.eE)({select:"replaceBoleta",percentCompleted:n}))},e.prev=5,e.next=8,s.post(l,r,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:c,signal:o});case 8:return d=e.sent,i((0,U.cJ)({status:d.status,variant:"success",text:d.data.msg})),e.abrupt("return",d.data);case 13:throw e.prev=13,e.t0=e.catch(5),s.isCancel(e.t0)||(e.t0.response?(u=e.t0.response,f=u.data,p=u.status,i((0,U.cJ)({status:p,text:f.msg}))):i((0,U.cJ)({status:"offline"}))),e.t0;case 17:case"end":return e.stop()}}),e,null,[[5,13]])})));return function(n,t){return e.apply(this,arguments)}}());M={},(0,E.Z)(M,J.pending,(function(e){e.replaceBoleta.loading=!0})),(0,E.Z)(M,J.rejected,(function(e,n){e.replaceBoleta.loading=!1})),(0,E.Z)(M,J.fulfilled,(function(e,n){e.replaceBoleta.loading=!1,e.replaceBoleta.progress=0,e.replaceBoleta.data={},e.replaceBoleta.open=!1}));function O(){var e,n=(0,C.v9)((function(e){return e.requestStatus.replaceBoleta})),t=n.open,r=n.loading,o=n.progress,s=n.data,c=(0,C.I0)(),d=(0,_.cI)({mode:"onTouched",shouldUnregister:!0}),u=d.handleSubmit,f=d.register,p=d.watch,h=d.formState.errors;return(0,S.jsxs)(H.Z,{open:t,TransitionComponent:q.Z,children:[(0,S.jsx)(V.Z,{children:"Reemplazar boleta"}),(0,S.jsx)(k.Z,{children:(0,S.jsxs)(l.ZP,{container:!0,spacing:2,children:[(0,S.jsx)(l.ZP,{item:!0,xs:12,children:(0,S.jsxs)(I.Z,{children:["Est\xe1 a punto de reemplazar la boleta ",(0,S.jsxs)("strong",{children:[s.curso," ",s.seccion," ",s.lapso,"\xb0 Lapso"]}),". Tenga en cuenta que al reemplazar la boleta se borrar\xe1 la anterior."]})}),(0,S.jsxs)(l.ZP,{container:!0,alignItems:"center",item:!0,xs:12,children:[(0,S.jsx)("input",(0,a.Z)((0,a.Z)({id:"boleta-upload-file"},f("boleta",{required:"* Debe subir un archivo"})),{},{defaultValue:null,style:{display:"none"},accept:"application/pdf",type:"file"})),(0,S.jsx)("label",{htmlFor:"boleta-upload-file",children:(0,S.jsx)(P.Z,{variant:"contained",color:Boolean(h.boleta)?"error":"secondary",component:"span",children:"Cargar archivo"})}),Boolean(h.boleta)&&(0,S.jsx)(i.Z,{ml:2,color:"#f44336",children:(0,S.jsx)(R.Z,{children:h.boleta.message})}),0!==((null===(e=p("boleta"))||void 0===e?void 0:e.length)||[]).length&&(0,S.jsx)(i.Z,{ml:2,children:(0,S.jsx)(R.Z,{children:"Archivo cargado"})})]})]})}),(0,S.jsxs)(L.Z,{children:[(0,S.jsx)(P.Z,{disabled:r,onClick:function(){c((0,w.CI)({open:!1,data:{},select:"replaceBoleta"}))},color:"inherit",children:"Cancelar"}),(0,S.jsx)(Z.Z,{onClick:u((function(e){var n=new FormData;n.append("boleta",e.boleta[0]),n.append("_method","PUT"),c(J({id:s.id,submitData:n}))})),loading:r,loadingIndicator:r&&o<99?"".concat(o,"%"):null,variant:"text",color:"inherit",children:"Cargar"})]})]})}var G=t(3005),W=t(75151),Y={container:{flexGrow:1,paddingBottom:6,marginTop:{xs:"80px",sm:12}}};function K(){var e,n;document.title="Boletas - La Candelaria";var t=(0,o.UO)().id;(0,T.Z)();var h=(0,C.v9)((function(e){return e.requestStatus.verBoletas})),x=h.loading,Z=h.data,v=(0,C.I0)(),g=(0,o.s0)(),m=function(){v((0,w.CI)({loading:!0,select:"verBoletas"}))};return(0,r.useEffect)((function(){x&&v((0,W.z)(t))}),[x]),(0,r.useEffect)((function(){return function(){v((0,w.CI)({loading:!0,select:"verBoletas"}))}}),[]),(0,S.jsx)(i.Z,{component:"main",sx:Y.container,children:(0,S.jsxs)(s.Z,{children:[(0,S.jsx)(i.Z,{mb:3,children:(0,S.jsxs)(l.ZP,{container:!0,justifyContent:"space-between",children:[(0,S.jsx)(c.Z,{title:"Volver",arrow:!0,children:(0,S.jsx)(d.Z,{disabled:x,onClick:function(){window.history.state&&window.history.state.idx>0?g(-1):g("/gedure/publicaciones")},"aria-label":"return",component:"span",children:(0,S.jsx)(f.Z,{})})}),(0,S.jsx)(c.Z,{title:"Recargar",arrow:!0,children:(0,S.jsx)(d.Z,{disabled:x,onClick:m,"aria-label":"return",component:"span",children:(0,S.jsx)(p.Z,{})})})]})}),x&&(0,S.jsx)(i.Z,{textAlign:"center",children:(0,S.jsx)(u.Z,{})}),!x&&null!==(e=Z.boletas)&&void 0!==e&&e.length?(0,S.jsxs)(r.Fragment,{children:[(0,S.jsxs)(i.Z,{fontSize:"h4.fontSize",mb:3,className:"text__bold--big",children:["Boletas subidas de ",Z.user]}),(0,S.jsx)(l.ZP,{container:!0,spacing:2,children:Z.boletas.map((function(e,n){return(0,S.jsx)(z,(0,a.Z)({},e),n)}))})]}):null,!x&&!(null!==(n=Z.boletas)&&void 0!==n&&n.length)&&(0,S.jsx)(i.Z,{textAlign:"center",fontSize:"body1.fontSize",children:"No hay boletas cargadas para este estudiante."}),(0,S.jsx)(D.Z,{rdx1:"requestStatus",rdx2:"deleteBoleta",close:(0,w.CI)({open:!1,data:{},select:"deleteBoleta"}),request:function(e){return(0,G.Y)({submitData:e,refresh:m})},children:function(e){var n,t;return(0,S.jsxs)("span",{children:["Est\xe1 a punto de eliminar la boleta ",(0,S.jsxs)("strong",{children:[(0,b.Z)(null===(n=e.curso)||void 0===n?void 0:n.curso)," ",null===(t=e.curso)||void 0===t?void 0:t.seccion," - ",e.lapso,"\xb0 Lapso"]})," de ",(0,S.jsx)("strong",{children:Z.user}),". Tenga en cuenta que esta acci\xf3n no se puede deshacer."]})}}),(0,S.jsx)(O,{})]})})}},67394:function(e,n,t){var a=t(64836);n.Z=void 0;var r=a(t(45649)),o=t(80184),i=(0,r.default)((0,o.jsx)("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}),"ArrowBack");n.Z=i},60383:function(e,n,t){var a=t(64836);n.Z=void 0;var r=a(t(45649)),o=t(80184),i=(0,r.default)((0,o.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"}),"DeleteForever");n.Z=i},73518:function(e,n,t){var a=t(64836);n.Z=void 0;var r=a(t(45649)),o=t(80184),i=(0,r.default)((0,o.jsx)("path",{d:"M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"}),"Download");n.Z=i},43950:function(e,n,t){var a=t(64836);n.Z=void 0;var r=a(t(45649)),o=t(80184),i=(0,r.default)((0,o.jsx)("path",{d:"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}),"Refresh");n.Z=i},51691:function(e,n,t){t.d(n,{Z:function(){return x}});var a=t(63366),r=t(87462),o=t(72791),i=t(94419),s=t(66934),l=t(31402),c=t(20890),d=t(21217);function u(e){return(0,d.Z)("MuiDialogContentText",e)}(0,t(75878).Z)("MuiDialogContentText",["root"]);var f=t(80184),p=["children"],h=(0,s.ZP)(c.Z,{shouldForwardProp:function(e){return(0,s.FO)(e)||"classes"===e},name:"MuiDialogContentText",slot:"Root",overridesResolver:function(e,n){return n.root}})({}),x=o.forwardRef((function(e,n){var t=(0,l.Z)({props:e,name:"MuiDialogContentText"}),o=(0,a.Z)(t,p),s=function(e){var n=e.classes,t=(0,i.Z)({root:["root"]},u,n);return(0,r.Z)({},n,t)}(o);return(0,f.jsx)(h,(0,r.Z)({component:"p",variant:"body1",color:"text.secondary",ref:n,ownerState:o},t,{classes:s}))}))},65661:function(e,n,t){var a=t(87462),r=t(63366),o=t(72791),i=t(28182),s=t(94419),l=t(20890),c=t(66934),d=t(31402),u=t(17673),f=t(85090),p=t(80184),h=["className","id"],x=(0,c.ZP)(l.Z,{name:"MuiDialogTitle",slot:"Root",overridesResolver:function(e,n){return n.root}})({padding:"16px 24px",flex:"0 0 auto"}),Z=o.forwardRef((function(e,n){var t=(0,d.Z)({props:e,name:"MuiDialogTitle"}),l=t.className,c=t.id,Z=(0,r.Z)(t,h),v=t,g=function(e){var n=e.classes;return(0,s.Z)({root:["root"]},u.a,n)}(v),m=o.useContext(f.Z).titleId,j=void 0===m?c:m;return(0,p.jsx)(x,(0,a.Z)({component:"h2",className:(0,i.Z)(g.root,l),ownerState:v,ref:n,variant:"h6",id:j},Z))}));n.Z=Z},31770:function(e,n,t){var a;n.Z=void 0;var r=(0,((a=t(71669))&&a.__esModule?a:{default:a}).default)("M14,3L12,1H4A2,2 0 0,0 2,3V15A2,2 0 0,0 4,17H11V19L15,16L11,13V15H4V3H14M21,10V21A2,2 0 0,1 19,23H8A2,2 0 0,1 6,21V19H8V21H19V12H14V7H8V13H6V7A2,2 0 0,1 8,5H16L21,10Z","FileReplaceOutline");n.Z=r}}]);
//# sourceMappingURL=7135.e9234ef1.chunk.js.map