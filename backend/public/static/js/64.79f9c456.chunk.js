(this["webpackJsonpfrontend-la-candelaria"]=this["webpackJsonpfrontend-la-candelaria"]||[]).push([[64],{1313:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return y}));var n=a(0),i=a.n(n),r=a(241),o=a(227),c=a(348),s=a(54),l=a.n(s),d=a(68),j=a(233),u=a(108),b=a(294),f=a(14),h=a(295),x=a(85),v=a(1);function O(){var e=Object(f.d)((function(e){return{loading:e.forms.logoutAll.loading}})).loading,t=Object(f.c)(),a=Object(u.a)().fetchData,n=function(){var e=Object(d.a)(l.a.mark((function e(){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(Object(h.a)("logoutAll",!0)),n={url:"v1/logoutAll",type:"post",variant:"info"},e.next=4,a(n);case 4:e.sent&&t(Object(x.a)()),t(Object(h.a)("logoutAll",!1));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(v.jsxs)(i.a.Fragment,{children:[Object(v.jsxs)(r.a,{item:!0,xs:12,sm:8,children:[Object(v.jsx)(o.a,{fontSize:"h5.fontSize",className:"text__bold--semi",children:"Salir en todos los dispositivos"}),Object(v.jsx)(o.a,{fontSize:"body1.fontSize",color:"text.secondary",children:"Cerrar sesi\xf3n en todos los dispositivos activos"})]}),Object(v.jsx)(r.a,{container:!0,justify:"flex-end",alignItems:"center",item:!0,xs:12,sm:4,children:Object(v.jsx)(b.a,{loading:e,children:Object(v.jsx)(j.a,{variant:"contained",color:"primary",disableElevation:!0,onClick:n,children:"Salir"})})})]})}var p=a(84),m=function(){return{type:"RESET_TOURS"}};function g(){var e=Object(f.c)(),t=Object(p.b)().enqueueSnackbar,a=function(){var a=Object(d.a)(l.a.mark((function a(){return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:e(m()),t("Todas las guias reactivadas");case 2:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}();return Object(v.jsxs)(i.a.Fragment,{children:[Object(v.jsxs)(r.a,{item:!0,xs:12,sm:8,children:[Object(v.jsx)(o.a,{fontSize:"h5.fontSize",className:"text__bold--semi",children:"Reactivar todos las guias"}),Object(v.jsx)(o.a,{fontSize:"body1.fontSize",color:"text.secondary",children:"Reactive todas la guias que ya haya realizado"})]}),Object(v.jsx)(r.a,{container:!0,justify:"flex-end",alignItems:"center",item:!0,xs:12,sm:4,children:Object(v.jsx)(j.a,{variant:"contained",color:"primary",disableElevation:!0,onClick:a,children:"Reactivar"})})]})}function y(){return Object(v.jsxs)(r.a,{container:!0,spacing:4,children:[Object(v.jsxs)(r.a,{item:!0,xs:12,children:[Object(v.jsx)(o.a,{mb:1,fontSize:"h6.fontSize",className:"text__bold--semi",children:"Opciones de la cuenta"}),Object(v.jsx)(c.a,{})]}),Object(v.jsx)(O,{}),Object(v.jsx)(g,{})]})}},294:function(e,t,a){"use strict";var n=a(7),i=(a(0),a(227)),r=a(365),o=a(62),c=a(241),s=a(204),l=a(165),d=a(1),j=Object(l.a)((function(e){return{progressLabel:{marginTop:5}}}));t.a=function(e){var t=e.loading,a=e.backDrop,l=void 0!==a&&a,u=e.children,b=function(e){var t=e.color,a=void 0===t?"primary":t,n=e.progressLabel,s=e.progressLoading,l=e.progress,u=j();return s&&l<=99?Object(d.jsxs)(i.a,{children:[Object(d.jsxs)(i.a,{position:"relative",display:"inline-flex",children:[Object(d.jsx)(r.a,{color:a,variant:"static",value:l}),Object(d.jsx)(i.a,{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center",children:Object(d.jsxs)(o.a,{variant:"caption",component:"div",color:"textSecondary",children:[l,"%"]})})]}),n&&Object(d.jsx)(c.a,{container:!0,justify:"center",children:Object(d.jsx)("span",{className:u.progressLabel,children:n})})]}):Object(d.jsx)(r.a,{color:a,size:e.size})};return t&&!l?Object(d.jsx)(b,Object(n.a)({},e)):t&&l?Object(d.jsx)(s.a,{open:!0,style:{zIndex:200},children:Object(d.jsx)(b,Object(n.a)({},e))}):u}},348:function(e,t,a){"use strict";var n=a(2),i=a(3),r=a(0),o=(a(4),a(6)),c=a(8),s=a(17),l=r.forwardRef((function(e,t){var a=e.absolute,c=void 0!==a&&a,s=e.classes,l=e.className,d=e.component,j=void 0===d?"hr":d,u=e.flexItem,b=void 0!==u&&u,f=e.light,h=void 0!==f&&f,x=e.orientation,v=void 0===x?"horizontal":x,O=e.role,p=void 0===O?"hr"!==j?"separator":void 0:O,m=e.variant,g=void 0===m?"fullWidth":m,y=Object(i.a)(e,["absolute","classes","className","component","flexItem","light","orientation","role","variant"]);return r.createElement(j,Object(n.a)({className:Object(o.a)(s.root,l,"fullWidth"!==g&&s[g],c&&s.absolute,b&&s.flexItem,h&&s.light,"vertical"===v&&s.vertical),role:p,ref:t},y))}));t.a=Object(c.a)((function(e){return{root:{height:1,margin:0,border:"none",flexShrink:0,backgroundColor:e.palette.divider},absolute:{position:"absolute",bottom:0,left:0,width:"100%"},inset:{marginLeft:72},light:{backgroundColor:Object(s.d)(e.palette.divider,.08)},middle:{marginLeft:e.spacing(2),marginRight:e.spacing(2)},vertical:{height:"100%",width:1},flexItem:{alignSelf:"stretch",height:"auto"}}}),{name:"MuiDivider"})(l)}}]);
//# sourceMappingURL=64.79f9c456.chunk.js.map