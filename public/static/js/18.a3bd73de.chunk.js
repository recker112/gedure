(this["webpackJsonpla-candelaria-web"]=this["webpackJsonpla-candelaria-web"]||[]).push([[18],{215:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(108),l=t.n(o),c=t(399),i=t(431),s=t(27),u=t(233),m=t.n(u),d=t(2),p=t(234),v=t(12),g=t(231),E=t(235),f=t(252),b=t(368),h=function(e){return{type:"AUTH_UPDATE",payload:e}},y=t(83),x=t(427),k=t(393),O=t(236),S=t(237);var L=Object(v.b)((function(e){return{dataLogin:e.dataLogin,validating:e.loginStatus.validating,error:e.dataLogin.error}}))((function(e){var a=e.options,t=e.dataLogin,n=e.validating,o=e.error,l=a.handleChange,c=a.handleSubmit;return r.a.createElement(y.a,{in:!0},r.a.createElement("form",{onSubmit:c,className:"LoginForm"},r.a.createElement("div",{className:"LoginForm__Divider",style:{width:278}},r.a.createElement(S.a,{data:{val:t.user,name:"user",label:"Usuario"},accion:l,error:o.user,focus:!0})),r.a.createElement("div",{className:"LoginForm__Divider"},r.a.createElement(S.a,{data:{val:t.pass,name:"pass",label:"Contrase\xf1a"},accion:l,error:o.pass,visibleToggle:!0,maxWidth:"278px"})),r.a.createElement("div",{className:"LoginForm__Divider"},r.a.createElement(x.a,{value:t.checkbox,onChange:l,control:r.a.createElement(k.a,{name:"checkbox",color:"primary"}),label:"Recordar en este equipo",labelPlacement:"end"})),r.a.createElement("div",{className:"LoginForm__Divider"},r.a.createElement(O.a,{estilo:"contained",colorsito:"primary",text:"Acceder",loading:n})),r.a.createElement("div",{className:"LoginForm__Copyright"},r.a.createElement("span",null,'\xa9 UEP APEP "La Candelaria" - 2020'),r.a.createElement("span",null,"Desarollado por Recker"),r.a.createElement("span",null,"v4.1.2"))))})),N=t(253),_=t(51);var w={updateValue:g.a,updateLoading:E.a,updateDataUser:b.a,authUpdate:h,errorInfo:f.a},j=Object(v.b)((function(e){return{auth:e.loginStatus.auth,dataLogin:e.dataLogin}}),w)((function(e){var a=e.updateValue,t=e.updateLoading,n=(e.auth,e.updateDataUser),o=e.authUpdate,l=e.dataLogin,c=e.errorInfo,i=window.axios;document.title="La Candelaria - Login";var s=l.user,u=l.pass,v=l.checkbox,g=Object(_.b)().enqueueSnackbar,E=function(){var e=Object(p.a)(m.a.mark((function e(){var a,r,l,c,p;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.post("api/login",{user:s,pass:u,checkbox:v});case 3:a=e.sent,n(Object(d.a)({},a.data)),r=a.data.access_key,v?(localStorage.setItem("key",JSON.stringify(r)),sessionStorage.setItem("key",JSON.stringify(r))):sessionStorage.setItem("key",JSON.stringify(r)),o(!0),g("Login exitoso",{variant:"success"}),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(0),l=e.t0.response,c=l.status,p=l.data,400===c?g(p.description,{variant:"warning"}):g(422===c?p.description:500===c?"No se ha podido conectar con la base de datos":"Error interno en el sistema",{variant:"error"});case 15:t(!1,"LOGIN");case 16:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(L,{options:{handleChange:function(e){a(e,"LOGIN")},handleSubmit:function(e){e.preventDefault();var a=[{value:s,name:"user",minValue:3},{value:u,name:"pass",minValue:4}];if(!0===Object(N.a)(a,c,"LOGIN"))return null;t(!0,"LOGIN"),E()}}})})),I=t(86),U=t(107),C=t(10),D=t(97);var A={updateDataUser:b.a,authUpdate:h,logout:U.a},P=Object(v.b)((function(e){return{auth:e.loginStatus.auth,checkbox:e.dataLogin.checkbox}}),A)((function(e){var a=e.children,t=e.auth,o=(e.checkbox,e.updateDataUser),l=e.authUpdate,c=e.logout,i=window.axios,s=Object(_.b)().enqueueSnackbar,u=Object(n.useState)(!0),d=Object(I.a)(u,2),v=d[0],g=d[1],E=Object(n.useState)(!1),f=Object(I.a)(E,2),b=f[0],h=f[1],y=Object(C.g)(),x=(Object(C.h)().state||{from:{pathname:"/"}}).from;return Object(n.useEffect)((function(){var e=!1,a=function(){var a=Object(p.a)(m.a.mark((function a(t){var n,r,u,d,p=arguments;return m.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n=p.length>1&&void 0!==p[1]&&p[1],a.prev=1,a.next=4,i.get("api/relogin",{headers:{Authorization:"Bearer ".concat(t)}});case 4:r=a.sent,o(r.data),n?(localStorage.setItem("key",JSON.stringify(r.data.access_key)),sessionStorage.setItem("key",JSON.stringify(r.data.access_key))):sessionStorage.setItem("key",JSON.stringify(r.data.access_key)),h(!0),l(!0),"/"!==x.pathname?y.replace(x):y.replace("/panel"),a.next=17;break;case 12:a.prev=12,a.t0=a.catch(1),u=a.t0.response||{status:"error"},d=u.status,s(401===d?"Sesi\xf3n expirada":500===d?"Error interno del servidor":"Error interno en el sistema",{variant:"error"}),c();case 17:e||g(!1);case 18:case"end":return a.stop()}}),a,null,[[1,12]])})));return function(e){return a.apply(this,arguments)}}(),n=JSON.parse(localStorage.getItem("key")),r=JSON.parse(sessionStorage.getItem("key"));return!t&&"string"===typeof n&&n.length>0?a(n,!0):!t&&"string"===typeof r&&r.length>0?a(r,!1):g(!1),function(){e=!0}}),[v,t,l,s,x,y,c,o,i]),v?r.a.createElement(D.a,null):(t&&!b&&y.replace("/panel"),a)}));a.default=function(e){e.auth,e.reloginSuccess;var a=Object(s.a)(),t=Object(c.a)(a.breakpoints.down("xs"))?"Container--Mobile":"";return r.a.createElement(P,null,r.a.createElement("main",{className:"Container ".concat(t)},r.a.createElement(i.a,{in:!0,timeout:600},r.a.createElement("div",{className:"HeadBox"},r.a.createElement("span",{className:"HeadBox__Icon"},r.a.createElement(l.a,{style:{fontSize:40}})),r.a.createElement("h1",{className:"HeadBox__Title"},"U.E.P A.P.E.P La Candelaria"),r.a.createElement("h2",{className:"HeadBox__SubTitle"},"Turmero - Estado Aragua"))),r.a.createElement(j,null)))}},231:function(e,a,t){"use strict";a.a=function(e,a){return{type:"UPDATE_VALUE_".concat(a),payload:e}}},235:function(e,a,t){"use strict";a.a=function(e,a){return{type:"UPDATE_LOADING_".concat(a),payload:e}}},236:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(420),l=t(185),c=t(369);function i(e){var a=e.color,t=e.progress,n=e.label;return r.a.createElement(r.a.Fragment,null,r.a.createElement(o.a,{color:a,variant:"static",value:t}),r.a.createElement("span",{style:{position:"relative",top:"-30px"}},t,"%"),n&&r.a.createElement("span",{style:{position:"relative",top:"-10px"}},n))}function s(e){var a=e.loading,t=e.progress,n=e.progressBar,c=e.colorsito,s=e.progressLabel;return a&&n&&100!==t?r.a.createElement(l.a,{open:!0,style:{zIndex:200}},r.a.createElement(i,{color:c,progress:t,label:s})):r.a.createElement(l.a,{open:!0,style:{zIndex:200}},r.a.createElement(o.a,{color:c}))}a.a=function(e){var a=e.estilo,t=e.colorsito,n=e.loading,l=e.text,u=e.onClick,m=void 0===u?function(){}:u,d=e.progressBar,p=void 0!==d&&d,v=e.progress,g=void 0===v?0:v,E=e.progressLabel,f=void 0!==E&&E,b=e.backDrop;return n&&!(void 0!==b&&b)?p&&100!==g?r.a.createElement(i,{color:t,progress:g,label:f}):r.a.createElement(o.a,{color:t}):r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a,{onClick:m,variant:a,type:"submit",color:t},l),n&&r.a.createElement(s,{loading:!0,progress:g,progressBar:p,colorsito:t,progressLabel:f}))}},237:function(e,a,t){"use strict";t.d(a,"c",(function(){return x})),t.d(a,"b",(function(){return k})),t.d(a,"a",(function(){return O}));var n=t(86),r=t(0),o=t.n(r),l=t(378),c=t(461),i=t(210),s=t(424),u=t(565),m=t(380),d=t(427),p=t(579),v=t(428),g=t(430),E=t(209),f=t(238),b=t.n(f),h=t(239),y=t.n(h);function x(e){var a=e.val,t=e.action,n=e.data,r=e.error,u=void 0!==r&&r,m=e.empty,d=void 0===m||m,p=e.classNameSet,v=void 0!==p&&p,g=e.customWidth,E=void 0!==g&&g;return o.a.createElement(l.a,{error:u&&u.status,style:{width:E||"100%"}},o.a.createElement(c.a,{displayEmpty:!0,name:n.name,value:a,onChange:t,className:v||null},n.values.map((function(e,a){return 0===a&&d?o.a.createElement(i.a,{key:a,value:e.value},o.a.createElement("em",null,e.name)):o.a.createElement(i.a,{key:a,value:e.value},e.name)}))),u&&o.a.createElement(s.a,null,u.message))}function k(e){var a=e.val,t=e.accion,n=e.data;return o.a.createElement(l.a,{component:"fieldset"},o.a.createElement(u.a,{color:n.color,component:"legend"},n.title),o.a.createElement(m.a,{"aria-label":n.name,name:n.name,value:a,onChange:t,row:!0},n.values.map((function(e,a){return o.a.createElement(d.a,{key:a,value:e.value,control:o.a.createElement(p.a,{color:n.color}),label:e.name,labelPlacement:"end"})}))))}function O(e){var a=e.data,t=e.accion,l=e.error,c=e.variant,i=void 0===c?"outlined":c,s=e.textarea,u=void 0!==s&&s,m=e.maxRows,d=void 0===m?6:m,p=e.maxWidth,f=void 0!==p&&p,h=e.size,x=void 0===h?"medium":h,k=e.visibleToggle,O=void 0!==k&&k,S=e.focus,L=void 0!==S&&S,N=a.val,_=a.name,w=a.label,j=l.status,I=l.message,U=Object(r.useState)(!1),C=Object(n.a)(U,2),D=C[0],A=C[1],P={rows:4,rowsMax:d};return o.a.createElement(v.a,Object.assign({type:O?D?"text":"password":"text",name:_,value:N,label:w,size:x,autoFocus:L,style:{width:"100%",maxWidth:f||"none"},variant:i,onChange:t,multiline:u,InputProps:{endAdornment:O?o.a.createElement(g.a,{position:"end"},o.a.createElement(E.a,{onClick:function(){A(!D)},size:x},D?o.a.createElement(b.a,null):o.a.createElement(y.a,null))):null}},P,{error:j,helperText:j&&I}))}},252:function(e,a,t){"use strict";a.a=function(e,a,t){return{type:"ERROR_INFO_".concat(t),payload:{input:e,message:a}}}},253:function(e,a,t){"use strict";a.a=function(e,a,t){var n=!1;return e.map((function(e){return 0===e.value.length?(a(e.name,"Campo obligatorio",t),n=!0):e.minValue&&e.value.length<e.minValue&&(a(e.name,"No v\xe1lido",t),n=!0),null})),n}},368:function(e,a,t){"use strict";a.a=function(e){return{type:"UPDATE_DATA_USER",payload:e}}}}]);
//# sourceMappingURL=18.a3bd73de.chunk.js.map