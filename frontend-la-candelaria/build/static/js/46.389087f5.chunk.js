(this["webpackJsonpfrontend-la-candelaria"]=this["webpackJsonpfrontend-la-candelaria"]||[]).push([[46],{1274:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return Q}));var n=t(6),c=t(48),o=t.n(c),r=t(67),i=t(35),s=t(42),l=t(0),d=t.n(l),j=t(15),b=t(227),u=t(355),p=t(333),f=t(226),O=t(152),h=t(105),x=t(93),m=t(217),g=t(213),v=t(676),y=t.n(v),w=t(478),C=t.n(w),B=t(234),k=t.n(B),_=t(1290),S=t.n(_),D=t(611),T=t(887),z=t(12),L=t(305),E=t(1);function A(e){var a,t,n,c=e.id,s=e.lapso,d=e.fecha_humano,j=e.fecha_humano_modify,b=e.curso_boleta,p=e.created_at,O=e.updated_at,v=e.handleRefresh,w=Object(z.d)((function(e){return{permissions:e.userData.permissions}})).permissions,B=Object(z.c)(),_=Object(h.a)().fetchData,A=["#2f80ED","#0F3F6A","#219653","#f2994A","#9B51E0","#EB5757","#333333"],R=Object(l.useState)((n=A.length-1,Math.floor(Math.random()*Math.floor(n)))),F=Object(i.a)(R,1)[0],M=function(){var e=Object(r.a)(o.a.mark((function e(){var a,t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={url:"v1/download/boleta/".concat(c),type:"get",messageToFinish:!1,data:{responseType:"blob"}},e.next=3,_(a);case 3:(t=e.sent)?Object(T.a)(t,"Boleta_".concat(b.curso,"_").concat(b.seccion,"_").concat(s,"_lapso.pdf")):v();case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(E.jsx)(f.a,{item:!0,xs:12,sm:6,md:4,children:Object(E.jsxs)(x.a,{elevation:0,className:"paper--padding",children:[Object(E.jsxs)(u.a,{display:"flex",children:[Object(E.jsx)(u.a,{mr:1,component:"span",children:Object(E.jsx)(k.a,{style:{fontSize:60,color:A[F]}})}),Object(E.jsxs)(u.a,{component:"span",style:{color:A[F]},fontSize:"h6.fontSize",fontWeight:600,children:[Object(D.a)(b.curso)," ",b.seccion," - ",s,"\xb0 Lapso",Object(E.jsx)(u.a,{fontSize:"body1.fontSize",color:"text.disabled",fontWeight:600,children:p===O?"Subido ".concat(d):"Modificado ".concat(j)})]})]}),Object(E.jsxs)(u.a,{align:"right",children:[Object(E.jsx)(m.a,{title:"Eliminar",arrow:!0,children:Object(E.jsx)(g.a,{onClick:function(){var e={id:c,lapso:s,curso:Object(D.a)(b.curso),seccion:b.seccion};B(Object(L.a)("deleteConfirmation",!0,!1,e))},component:"span",disabled:!(null===w||void 0===w||null===(a=w.administrar)||void 0===a?void 0:a.boletas_destroy),children:Object(E.jsx)(C.a,{})})}),Object(E.jsx)(m.a,{title:"Reemplazar",arrow:!0,children:Object(E.jsx)(g.a,{onClick:function(){var e={id:c,lapso:s,curso:Object(D.a)(b.curso),seccion:b.seccion};B(Object(L.a)("replaceBoleta",!0,!1,e))},component:"span",disabled:!(null===w||void 0===w||null===(t=w.administrar)||void 0===t?void 0:t.boletas_edit),children:Object(E.jsx)(S.a,{})})}),Object(E.jsx)(m.a,{title:"Descargar",arrow:!0,children:Object(E.jsx)(g.a,{onClick:M,component:"span",children:Object(E.jsx)(y.a,{})})})]})]})})}var R=t(509),F=t(638),M=t(603),U=t(639),N=t(608),I=t(488),P=t(60),q=t(640),G=t(262),J=t(359),W=t(263);function V(e){var a=e.handleRefresh,t=e.name,n=Object(l.useState)(0),c=Object(i.a)(n,2),s=c[0],d=c[1],j=Object(z.d)((function(e){return{open:e.dialogs.replaceBoleta.open,loading:e.dialogs.replaceBoleta.loading,data:e.dialogs.replaceBoleta.data}})),b=j.open,p=j.loading,O=j.data,x=Object(z.c)(),m=Object(G.c)(),g=m.handleSubmit,v=m.register,y=m.errors,w=Object(h.a)().fetchData,C=function(){p||x(Object(L.a)("replaceBoleta",!1,!1))},B=Object(l.useCallback)((function(e){var a=Math.round(100*e.loaded/e.total);d(a)}),[]),k=function(){var e=Object(r.a)(o.a.mark((function e(t){var n,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x(Object(L.a)("replaceBoleta",!0,!0)),(n=new FormData).append("boleta",t.boleta[0]),n.append("_method","PUT"),c={url:"v1/boleta/".concat(O.id),type:"post",data:n,otherData:{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:B}},e.next=7,w(c);case 7:e.sent?(x(Object(L.a)("replaceBoleta",!1,!1)),a()):x(Object(L.a)("replaceBoleta",!0,!1)),d(0);case 10:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return Object(E.jsxs)(F.a,{open:b,onClose:C,TransitionComponent:J.a,children:[Object(E.jsx)(M.a,{children:"\xbfSeguro?"}),Object(E.jsx)(U.a,{children:Object(E.jsxs)(f.a,{container:!0,spacing:2,children:[Object(E.jsx)(f.a,{item:!0,xs:12,children:Object(E.jsxs)(N.a,{children:["Est\xe1\u0e01 a punto de reemplazar la boleta ",Object(E.jsxs)("strong",{children:[O.curso," ",O.seccion," ",O.lapso,"\xb0 Lapso"]})," de ",Object(E.jsx)("strong",{children:t}),". Tenga en cuenta que al reemplazar la boleta se borrar\xe1 la anterior."]})}),Object(E.jsxs)(f.a,{container:!0,alignItems:"center",item:!0,xs:12,children:[Object(E.jsx)("input",{id:"boleta-upload-file",ref:v({required:{value:!0,message:"* Debe subir un archivo"}}),defaultValue:null,style:{display:"none"},accept:"application/pdf",name:"boleta",type:"file"}),Object(E.jsx)("label",{htmlFor:"boleta-upload-file",children:Object(E.jsx)(I.a,{variant:"contained",color:"secondary",component:"span",children:"Cargar archivo"})}),Boolean(y.boleta)&&Object(E.jsx)(u.a,{ml:2,color:"#f44336",children:Object(E.jsx)(P.a,{children:y.boleta.message})})]})]})}),Object(E.jsxs)(q.a,{children:[Object(E.jsx)(I.a,{onClick:C,disabled:p,children:"Cancelar"}),Object(E.jsx)(W.a,{loading:p,progressLoading:!0,progress:s,color:"inherit",children:Object(E.jsx)(I.a,{onClick:g(k),children:"Cambiar"})})]})]})}var H=t(264),K=Object(O.a)((function(e){var a;return{containerMain:(a={flexGrow:1,paddingBottom:e.spacing(5)},Object(s.a)(a,e.breakpoints.up("xs"),{marginTop:"80px"}),Object(s.a)(a,e.breakpoints.up("sm"),{marginTop:e.spacing(12)}),a)}}));function Q(){document.title="La Candelaria - Boletas";var e=Object(j.i)().id,a=Object(l.useState)(""),t=Object(i.a)(a,2),c=t[0],s=t[1],O=Object(z.d)((function(e){return{loading:e.forms.showBoletas.loading,data:e.forms.showBoletas.data,dataDelete:e.dialogs.deleteConfirmation.data}})),x=O.loading,m=O.data,g=O.dataDelete,v=Object(z.c)(),y=K(),w=Object(h.a)().fetchData,C=function(){var a=Object(r.a)(o.a.mark((function a(){var t,n;return o.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return v(Object(H.a)("showBoletas",!0)),t={url:"v1/boleta/".concat(e),type:"get",messageToFinish:!1},a.next=4,w(t);case 4:(n=a.sent)?(v(Object(H.a)("showBoletas",!1,n.boletas)),s(n.user.name)):v(Object(H.a)("showBoletas",!1,[]));case 6:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}();Object(l.useEffect)((function(){return C(),function(){v(Object(H.a)("showBoletas",!1,[]))}}),[]);var B=function(){var e=Object(r.a)(o.a.mark((function e(a){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={url:"v1/boleta/".concat(g.id),type:"delete",message404:"El usuario ya no existe"},e.next=3,w(t);case 3:n=e.sent,v(Object(L.a)("deleteConfirmation",!1,!1)),n&&C(),a(),C();case 8:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return Object(E.jsx)("main",{className:y.containerMain,children:Object(E.jsxs)(b.a,{children:[x&&Object(E.jsx)(u.a,{align:"center",children:Object(E.jsx)(p.a,{})}),!x&&m.length?Object(E.jsxs)(d.a.Fragment,{children:[Object(E.jsxs)(u.a,{fontSize:"h4.fontSize",mb:3,className:"text__bold--big",children:["Boletas subidas de ",c]}),Object(E.jsx)(f.a,{container:!0,spacing:2,children:m.map((function(e,a){return Object(E.jsx)(A,Object(n.a)(Object(n.a)({},e),{},{handleRefresh:C}),a)}))})]}):null,!x&&!m.length&&Object(E.jsx)(u.a,{align:"center",fontSize:"body1.fontSize",children:"No hay boletas cargadas para este estudiante."}),Object(E.jsxs)(R.a,{callback:B,children:["Est\xe1\u0e01 a punto de eliminar la boleta ",Object(E.jsxs)("strong",{children:[g.curso," ",g.seccion," ",g.lapso,"\xb0 Lapso"]})," de ",Object(E.jsx)("strong",{children:c}),". Tenga en cuenta que esta acci\xf3n no se puede deshacer."]}),Object(E.jsx)(V,{handleRefresh:C,name:c})]})})}},263:function(e,a,t){"use strict";var n=t(6),c=(t(0),t(355)),o=t(333),r=t(60),i=t(226),s=t(188),l=t(152),d=t(1),j=Object(l.a)((function(e){return{progressLabel:{marginTop:5}}}));a.a=function(e){var a=e.loading,t=e.backDrop,l=void 0!==t&&t,b=e.children,u=function(e){var a=e.color,t=void 0===a?"primary":a,n=e.progressLabel,s=e.progressLoading,l=e.progress,b=j();return s&&l<=99?Object(d.jsxs)(c.a,{children:[Object(d.jsxs)(c.a,{position:"relative",display:"inline-flex",children:[Object(d.jsx)(o.a,{color:t,variant:"static",value:l}),Object(d.jsx)(c.a,{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center",children:Object(d.jsxs)(r.a,{variant:"caption",component:"div",color:"textSecondary",children:[l,"%"]})})]}),n&&Object(d.jsx)(i.a,{container:!0,justify:"center",children:Object(d.jsx)("span",{className:b.progressLabel,children:n})})]}):Object(d.jsx)(o.a,{color:t})};return a&&!l?Object(d.jsx)(u,Object(n.a)({},e)):a&&l?Object(d.jsx)(s.a,{open:!0,style:{zIndex:200},children:Object(d.jsx)(u,Object(n.a)({},e))}):b}},264:function(e,a,t){"use strict";a.a=function(e,a){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return{type:"UPDATE_FORM_DATA",payload:{form:e,loading:a,data:t}}}},305:function(e,a,t){"use strict";a.a=function(e,a,t){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return{type:"UPDATE_DIALOGS_DATA",payload:{dialog:e,open:a,loading:t,data:n}}}},359:function(e,a,t){"use strict";var n=t(6),c=t(0),o=t.n(c),r=t(142),i=t(1),s=o.a.forwardRef((function(e,a){return Object(i.jsx)(r.a,Object(n.a)({direction:"up",ref:a},e))}));a.a=s},509:function(e,a,t){"use strict";t.d(a,"a",(function(){return u}));t(0);var n=t(638),c=t(603),o=t(639),r=t(608),i=t(640),s=t(488),l=t(359),d=t(12),j=t(305),b=t(1);function u(e){var a=e.callback,t=e.children,u=Object(d.d)((function(e){return{open:e.dialogs.deleteConfirmation.open,loading:e.dialogs.deleteConfirmation.loading}})),p=u.open,f=u.loading,O=Object(d.c)(),h=function(){O(Object(j.a)("deleteConfirmation",!1,!1))};return Object(b.jsxs)(n.a,{open:p,TransitionComponent:l.a,"aria-labelledby":"confirm-dialog-title","aria-describedby":"confirm-dialog-description",children:[Object(b.jsx)(c.a,{id:"confirm-dialog-title",children:"\xbfSeguro?"}),Object(b.jsx)(o.a,{children:Object(b.jsx)(r.a,{id:"confirm-dialog-description",children:t})}),Object(b.jsxs)(i.a,{children:[Object(b.jsx)(s.a,{disabled:f,onClick:h,children:"Cancelar"}),Object(b.jsx)(s.a,{disabled:f,onClick:function(){O(Object(j.a)("deleteConfirmation",!0,!0)),a(h)},children:"Confirmar"})]})]})}},611:function(e,a,t){"use strict";function n(e){if("string"===typeof e){var a=e.substring(1,2),t=e.substring(0,1);return"".concat(t,"G"===a?" grado":" a\xf1o")}}t.d(a,"a",(function(){return n}))},887:function(e,a,t){"use strict";a.a=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"archivo",t=window.URL.createObjectURL(new Blob([e])),n=document.createElement("a");n.href=t,n.setAttribute("download",a),document.body.appendChild(n),n.click()}}}]);
//# sourceMappingURL=46.389087f5.chunk.js.map