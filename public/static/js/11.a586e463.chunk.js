(this.webpackJsonpGedure=this.webpackJsonpGedure||[]).push([[11],{246:function(e,a,t){"use strict";t.r(a);var n=t(48),r=t.n(n),o=t(61),c=t(39),i=t(0),l=t.n(i),s=t(115),u=t(12),m=t(284),d=t(296),p=t(113),g=t.n(p),f=t(47),E=t(112),b=t(104),h=t(23),v=function(e){return{type:"UPDATE_DATA_USER",payload:e}},y=function(e){return{type:"AUTH_UPDATE",payload:e}};var _={updateDataUser:v,updateAuth:y,logoutApp:t(74).a},x=Object(h.b)((function(e){return{auth:e.userData.auth,theme:e.settings.tema,access_key:e.userData.access_key}}),_)((function(e){var a=e.children,t=e.auth,n=e.theme,c=e.updateDataUser,s=e.updateAuth,m=e.access_key,d=e.logoutApp,p=Object(i.useState)(!0),g=Object(f.a)(p,2),h=g[0],v=g[1],y=Object(b.a)().fetchData,_=Object(u.g)(),x=(Object(u.h)().state||{from:{pathname:"/"}}).from;return Object(i.useEffect)((function(){var e=!1,a=function(){var e=Object(o.a)(r.a.mark((function e(a){var t,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={url:"v1/relogin",data:{headers:{Authorization:"Bearer ".concat(a)}},successText:"Login exitoso",type:"get"},e.next=3,y(t);case 3:n=e.sent,v(!1),n?(n.access_key=a,c(n),s(!0)):(s(!1),d());case 6:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),n=JSON.parse(localStorage.getItem("access_key")),i=JSON.parse(sessionStorage.getItem("access_key"));return!t&&h&&"string"===typeof i&&i.length>30?a(i):!t&&h&&"string"===typeof n&&n.length>30?a(n):e||v(!1),function(){e=!0}}),[t,m,y,c,s,h,d]),h?l.a.createElement(E.a,{theme:n}):(t&&"/"===x.pathname?_.push("/panel"):t&&"/"!==x.pathname&&_.replace(x),a)})),O=t(283),j=t(378),w=t(146),k=t(163),N=t(206),A=t(82),I=t(80),D=t(460),L=t(487),S=t(233),R=t(253),C=Object(s.a)((function(e){var a,t;return{root:{flexGrow:1},margin:{marginTop:e.spacing(4),marginBottom:e.spacing(4)},login__welcome:(a={background:e.palette.primary.main,width:"100%",padding:e.spacing(2)},Object(c.a)(a,e.breakpoints.down("sm"),{borderRadius:"5px 5px 0px 0px"}),Object(c.a)(a,e.breakpoints.up("md"),{height:500,borderRadius:5}),a),login__box:(t={width:"100%",height:470},Object(c.a)(t,e.breakpoints.down("xs"),{padding:"".concat(e.spacing(2),"px ").concat(e.spacing(4),"px")}),Object(c.a)(t,e.breakpoints.up("sm"),{padding:"".concat(e.spacing(2),"px ").concat(e.spacing(8),"px")}),t),button:{width:170,height:45},login__recovery:{color:e.palette.primary.main,cursor:"pointer"}}}));function V(){var e=C();return l.a.createElement(w.a,{in:!0,direction:"right",mountOnEnter:!0,unmountOnExit:!0},l.a.createElement(k.a,{className:e.login__welcome+" "+e.padding+" MuiPaper-elevation1"},l.a.createElement(N.a,{container:!0,direction:"column",spacing:2,style:{height:"100%"}},l.a.createElement(N.a,{container:!0,item:!0},l.a.createElement("img",{src:g.a,alt:"Logo del instituo",className:"login__logo"})),l.a.createElement(N.a,{container:!0,direction:"column",justify:"center",alignItems:"center",spacing:2,item:!0,className:e.root},l.a.createElement(N.a,{item:!0},l.a.createElement(A.a,{className:"login__welcome login__welcome--white"},"Bienvenido")),l.a.createElement(N.a,{item:!0},l.a.createElement(A.a,{className:"login__text"},"Al iniciar sesi\xf3n usted podr\xe1:"),l.a.createElement(A.a,{className:"login__text login__text--list"},"- Ver noticias privadas",l.a.createElement("br",null),"- Registrar pagos",l.a.createElement("br",null),"- Recibir y enviar tareas",l.a.createElement("br",null),"- Ver boletas",l.a.createElement("br",null),"- y m\xe1s.."))),l.a.createElement(N.a,{container:!0,justify:"center",item:!0},l.a.createElement(k.a,{textAlign:"center",className:"login__footer"},"\xa9 2020 - Desarrollado por Recker",l.a.createElement("br",null),"Powered by Gedure")))))}function U(e){var a=e.state,t=a.loading,n=a.updateForms,c=a.updateDataUser,s=a.updateAuth,p=Object(b.a)().fetchData,g=Object(O.c)(),f=g.register,E=g.handleSubmit,h=g.errors,v=Object(u.g)(),y=C(),_=Object(i.useCallback)(function(){var e=Object(o.a)(r.a.mark((function e(a){var t,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n("login",!0),t={url:"v1/login",data:a,successText:"Login exitoso"},e.next=4,p(t);case 4:(o=e.sent)&&(c(o),a.checkbox?(localStorage.setItem("access_key",JSON.stringify(o.access_key)),sessionStorage.setItem("access_key",JSON.stringify(o.access_key))):sessionStorage.setItem("access_key",JSON.stringify(o.access_key)),s(!0)),n("login",!1);case 7:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),[p,s,c,n]);return l.a.createElement(w.a,{in:!0,direction:"left",mountOnEnter:!0,unmountOnExit:!0},l.a.createElement("form",{onSubmit:E(_)},l.a.createElement(I.a,{className:y.login__box},l.a.createElement(N.a,{container:!0,direction:"column",justify:"space-between",spacing:2,style:{height:"100%"}},l.a.createElement(N.a,{container:!0,item:!0,justify:"center"},l.a.createElement(A.a,{className:"login__titleForm login__welcome--italic"},"Rellene los campos")),l.a.createElement(N.a,{container:!0,item:!0},l.a.createElement(m.a,{name:"user",label:"C\xe9dula o usuario",defaultValue:"",errors:h.user,registerInput:f({required:{value:!0,message:"Campo requerido."},minLength:{value:3,message:"Campo no v\xe1lido."}}),disabledOnLoading:t,focus:!0})),l.a.createElement(N.a,{container:!0,item:!0},l.a.createElement(m.a,{passwordMode:!0,name:"password",label:"Contrase\xf1a",defaultValue:"",errors:h.password,registerInput:f({required:{value:!0,message:"Campo requerido."},minLength:{value:4,message:"Campo no v\xe1lido."}}),disabledOnLoading:t})),l.a.createElement(N.a,{container:!0,item:!0},l.a.createElement(D.a,{control:l.a.createElement(L.a,{color:"primary",name:"checkbox",inputRef:f}),label:"Mantener abierto"})),l.a.createElement(N.a,{container:!0,justify:"center",item:!0},l.a.createElement(d.a,{loading:t},l.a.createElement(S.a,{color:"primary",variant:"contained",type:"submit",className:y.button},"Entrar"))),l.a.createElement(N.a,{container:!0,justify:"center",item:!0},l.a.createElement(k.a,{component:"span",className:y.login__recovery,onClick:function(){t||v.push("/recovery")}},"Recuperar contrase\xf1a"))))))}var T={updateForms:j.a,updateDataUser:v,updateAuth:y};a.default=Object(h.b)((function(e){return{loading:e.forms.login.loading}}),T)((function(e){var a=e.updateForms,t=e.updateDataUser,n=e.updateAuth,r=e.loading,o=e.inputs,c=Object(u.g)(),i=C();return l.a.createElement(x,null,l.a.createElement("main",{className:"".concat(i.root," ").concat(i.margin),ref:function(){document.title="La Candelaria - Login"}},l.a.createElement(R.a,{maxWidth:"md",style:{height:"100%",display:"flex",alignItems:"center"}},l.a.createElement(N.a,{container:!0,spacing:2},l.a.createElement(N.a,{container:!0,alignItems:"center",item:!0},l.a.createElement(N.a,{item:!0,xs:12,sm:12,md:4},l.a.createElement(V,null)),l.a.createElement(N.a,{item:!0,xs:12,sm:12,md:8},l.a.createElement(U,{state:{loading:r,inputs:o,updateForms:a,updateDataUser:t,updateAuth:n}}))),l.a.createElement(N.a,{container:!0,justify:"center",item:!0,xs:12},l.a.createElement(k.a,{component:"span",className:"login__return",onClick:function(){r||c.push("/")}},"Volver al inicio"))))))}))},284:function(e,a,t){"use strict";t.d(a,"c",(function(){return O})),t.d(a,"b",(function(){return j})),t.d(a,"a",(function(){return w}));t(13),t(48),t(61);var n=t(47),r=t(88),o=t(0),c=t.n(o),i=t(451),l=t(452),s=t(489),u=t(456),m=t(578),d=t(457),p=t(460),g=t(600),f=t(461),E=t(462),b=t(234),h=(t(463),t(320)),v=t.n(h),y=t(345),_=t.n(y),x=(t(601),t(283));function O(e){var a=e.id,t=e.name,n=e.nameLabel,o=e.control,m=e.defaultValue,d=e.children,p=e.errors,g=e.customWidth,f=void 0!==g&&g,E=Object(r.a)(e,["id","name","nameLabel","control","defaultValue","children","errors","customWidth"]);return c.a.createElement(i.a,Object.assign({},E,{style:{width:f||"100%"},error:Boolean(p)}),c.a.createElement(l.a,{id:a+"-label"},n),c.a.createElement(x.a,{as:c.a.createElement(s.a,{labelId:a+"-label",id:a},d),name:t,control:o,defaultValue:m,rules:{required:{value:!0,message:"Campo requerido."}}}),c.a.createElement(u.a,null,null===p||void 0===p?void 0:p.message))}function j(e){var a=e.registerInput,t=e.data,n=e.defaultValue,r=void 0===n?null:n;return c.a.createElement(i.a,{component:"fieldset"},c.a.createElement(m.a,{color:t.color,component:"legend"},t.title),c.a.createElement(d.a,{defaultValue:r,"aria-label":t.name,name:t.name,row:!0},t.values.map((function(e,n){return c.a.createElement(p.a,{key:n,value:e.value,inputRef:a,control:c.a.createElement(g.a,{color:t.color}),label:e.name,labelPlacement:"end"})}))))}function w(e){var a=e.type,t=void 0===a?"text":a,r=e.name,i=e.registerInput,l=e.errors,s=e.defaultValue,u=e.label,m=e.variant,d=void 0===m?"outlined":m,p=e.textarea,g=void 0!==p&&p,h=e.maxRows,y=void 0===h?6:h,x=e.maxWidth,O=void 0!==x&&x,j=e.size,w=void 0===j?"medium":j,k=e.passwordMode,N=void 0!==k&&k,A=e.focus,I=void 0!==A&&A,D=e.disabledOnLoading,L=void 0===D?null:D,S=Object(o.useState)(!1),R=Object(n.a)(S,2),C=R[0],V=R[1],U={rows:4,rowsMax:y};return c.a.createElement(f.a,Object.assign({inputRef:i,type:N?C?"text":"password":t,name:r,defaultValue:s,label:u,size:w,disabled:null!==L&&L,error:Boolean(l),helperText:null===l||void 0===l?void 0:l.message,autoFocus:I,style:{width:"100%",maxWidth:O||"none"},variant:d,multiline:g,InputProps:{endAdornment:N?c.a.createElement(E.a,{position:"end"},c.a.createElement(b.a,{onClick:function(){V(!C)},size:w},C?c.a.createElement(_.a,null):c.a.createElement(v.a,null))):null}},U))}},296:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(206),c=t(463),i=t(204),l=t(115),s=Object(l.a)((function(e){return{progress:{position:"absolute"},progressLabel:{marginTop:5}}}));a.a=function(e){var a=e.loading,t=e.backDrop,n=void 0!==t&&t,l=e.children,u=function(e){var a=e.color,t=void 0===a?"primary":a,n=e.progressLabel,i=e.progressLoading,l=e.progress,u=s();return i&&l<=99?r.a.createElement(o.a,{container:!0,justify:"center",alignItems:"center"},r.a.createElement(o.a,{container:!0,justify:"center",alignItems:"center",item:!0,xs:12},r.a.createElement(c.a,{color:t,variant:"static",value:l})),r.a.createElement("span",{className:u.progress},l,"%"),n&&r.a.createElement(o.a,{item:!0,xs:!0},r.a.createElement("span",{className:u.progressLabel},n))):r.a.createElement(c.a,{color:t})};return a&&!n?r.a.createElement(u,e):a&&n?r.a.createElement(i.a,{open:!0,style:{zIndex:200}},r.a.createElement(u,e)):l}},378:function(e,a,t){"use strict";a.a=function(e,a){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return{type:"UPDATE_FORM",payload:{form:e,loading:a,inputs:t}}}}}]);
//# sourceMappingURL=11.a586e463.chunk.js.map