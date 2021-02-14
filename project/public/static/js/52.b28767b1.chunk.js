(this.webpackJsonpGedure=this.webpackJsonpGedure||[]).push([[52],{6120:function(e,t,a){"use strict";t.a=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return{type:"UPDATE_FORM_DATA",payload:{form:e,loading:t,data:a}}}},6169:function(e,t,a){"use strict";var n=a(1),r=a(2),o=a(0),i=(a(3),a(4)),c=a(5),l=a(22),s=o.forwardRef((function(e,t){var a=e.absolute,c=void 0!==a&&a,l=e.classes,s=e.className,u=e.component,d=void 0===u?"hr":u,m=e.flexItem,f=void 0!==m&&m,p=e.light,b=void 0!==p&&p,g=e.orientation,v=void 0===g?"horizontal":g,E=e.role,y=void 0===E?"hr"!==d?"separator":void 0:E,h=e.variant,x=void 0===h?"fullWidth":h,O=Object(r.a)(e,["absolute","classes","className","component","flexItem","light","orientation","role","variant"]);return o.createElement(d,Object(n.a)({className:Object(i.a)(l.root,s,"fullWidth"!==x&&l[x],c&&l.absolute,f&&l.flexItem,b&&l.light,"vertical"===v&&l.vertical),role:y,ref:t},O))}));t.a=Object(c.a)((function(e){return{root:{height:1,margin:0,border:"none",flexShrink:0,backgroundColor:e.palette.divider},absolute:{position:"absolute",bottom:0,left:0,width:"100%"},inset:{marginLeft:72},light:{backgroundColor:Object(l.d)(e.palette.divider,.08)},middle:{marginLeft:e.spacing(2),marginRight:e.spacing(2)},vertical:{height:"100%",width:1},flexItem:{alignSelf:"stretch",height:"auto"}}}),{name:"MuiDivider"})(s)},6322:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(6365),i=a(6354),c=a(13),l=function(e,t){return{type:"UPDATE_TOUR",payload:{open:e,tour:t}}};t.a=function(e){var t=e.steps,a=e.select,n=Object(c.d)((function(e){return{tourOpen:e.settings.tour[a]}})).tourOpen,s=Object(c.c)();return r.a.createElement(o.a,{steps:t,isOpen:n,disableInteraction:!0,onAfterOpen:function(){document.body.style.overflowY="hidden"},onBeforeClose:function(){document.body.style.overflowY="auto"},showCloseButton:!1,rounded:5,lastStepNextButton:r.a.createElement(i.a,{size:"small",color:"primary",onClick:function(){s(l(!1,a))}},"Terminar gu\xeda")})}},6453:function(e,t,a){"use strict";function n(e){if("string"===typeof e){var t=e.substring(1,2),a=e.substring(0,1);return"".concat(a,"G"===t?" grado":" a\xf1o")}}a.d(t,"a",(function(){return n}))},6535:function(e,t,a){"use strict";var n=a(89);var r=a(116);function o(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(r.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}a.d(t,"a",(function(){return o}))},7062:function(e,t,a){"use strict";a.r(t);var n=a(46),r=a.n(n),o=a(63),i=a(0),c=a.n(i),l=a(6092),s=a(6040),u=a(6215),d=a(150),m=a(6039),f=a(108),p=a(98),b=a(75),g=a(57),v=a(6169),E=a(6193);function y(e){var t=e.title,a=e.data,n=void 0===a?null:a,r=e.loading;return c.a.createElement(s.a,{item:!0,xs:12,sm:6,md:4},c.a.createElement(b.a,{className:"paper--padding",elevation:3},c.a.createElement(u.a,{mb:3,fontSize:"h6.fontSize",className:"text__bold--semi"},t),!r&&(null===n||void 0===n?void 0:n.map((function(e,t){return c.a.createElement(c.a.Fragment,{key:t},c.a.createElement(g.a,{className:"text__bold--semi",noWrap:!0},e.textPrimary),c.a.createElement(u.a,{fontSize:"body1.fontSize",color:"text.secondary"},e.textSecondary),n.length!==t+1&&c.a.createElement(u.a,{my:2},c.a.createElement(v.a,null)))}))),0===(null===n||void 0===n?void 0:n.length)&&!r&&c.a.createElement(g.a,{className:"text__bold--semi"},"Nada que mostrar"),r&&c.a.createElement(u.a,{align:"center"},c.a.createElement(E.a,null))))}var h=a(6453),x=a(6535),O=a(6354),S=a(15),_=a(6322),j=a(13);function k(){var e=Object(j.d)((function(e){return{id:e.userData.user.id}})).id,t=Object(S.a)(),a=[{selector:"",content:function(e){var t=e.goTo;return c.a.createElement("div",null,c.a.createElement(g.a,{color:"primary",className:"text__bold--big",variant:"h5"},"Gedure v5.0.0-beta.0"),c.a.createElement(g.a,{variant:"body1"},"Bienvenido a la Beta de Gedure, durante estas guias podr\xe1 enterarse de las funcionalidades las cuales tiene disponible. Si lo desea puede saltarse esta guia usando el boton."),c.a.createElement(O.a,{size:"small",color:"primary",onClick:function(){t(5)}},"Saltar tour"))},style:{backgroundColor:t.palette.background.paper}},{selector:'[data-tour="avatar__menu"]',content:function(){return c.a.createElement(g.a,{variant:"body1"},"Este boton permite desplegar el Avatar Men\xfa el cual contiene un peque\xf1o men\xfa con acciones relacionadas a la cuenta.")},style:{backgroundColor:t.palette.background.paper}},{selector:'[data-tour="theme__button"]',content:function(){return c.a.createElement(g.a,{variant:"body1"},"Este boton le permite cambiar entre el Modo Oscuro y el Modo Claro.")},style:{backgroundColor:t.palette.background.paper}},{selector:'[data-tour="drawer__button"]',content:function(){return c.a.createElement(g.a,{variant:"body1"},"Este boton abre el men\xfa del sistema, desde aqu\xed podr\xe1 navegar por todo el sistema.")},style:{backgroundColor:t.palette.background.paper}},{selector:'[data-tour="infoBox"]',content:function(){return c.a.createElement(g.a,{variant:"body1"},"En esta zona podr\xe1 encontrar informaci\xf3n r\xe1pida del sistema.")},style:{backgroundColor:t.palette.background.paper}},{selector:"",content:function(){return c.a.createElement(g.a,{variant:"body1"},"Con esto finaliza esta gu\xeda, navege entre otras partes del sistema para encontrar m\xe1s gu\xedas.")},style:{backgroundColor:t.palette.background.paper}}];return 1===e&&(a=[].concat(Object(x.a)(a),[{selector:"",content:function(){return c.a.createElement("div",null,c.a.createElement(g.a,{color:"primary",className:"text__bold--big",variant:"h5"},"Una \xfaltima cosa..."),c.a.createElement(g.a,{variant:"body1"},"Parece que acabas de iniciar gedure por primera vez, en ese caso le recomendamos que vaya a ",c.a.createElement("strong",null,"Configurar Gedure")," en el men\xfa y configure el sistema a sus necesidades."))},style:{backgroundColor:t.palette.background.paper}}])),c.a.createElement(_.a,{select:"index",steps:a})}var z=a(6120);a.d(t,"default",(function(){return w}));var N=Object(f.a)((function(e){return{containerMain:{flexGrow:1},header:{background:e.palette.primary.main,height:400,borderRadius:"0px 0px 15px 15px"},content:{position:"relative",top:-80}}}));function C(){var e=Object(j.d)((function(e){return{name:e.userData.user.name}})).name;return c.a.createElement(l.a,null,c.a.createElement(s.a,{container:!0,justify:"space-between"},c.a.createElement(s.a,{item:!0,xs:!0},c.a.createElement(u.a,{color:"primary.contrastText",fontSize:{xs:"h6.fontSize",sm:"h5.fontSize",md:"h4.fontSize"},className:"text__bold--semi"},c.a.createElement(u.a,{color:"secondary.main",component:"span"},"Hola")," ",e,","),c.a.createElement(u.a,{color:"primary.contrastText",fontSize:{xs:"h6.fontSize",sm:"h5.fontSize"},className:"text__bold--semi"},"Bienveido a ",c.a.createElement(u.a,{color:"secondary.main",component:"span"},"Gedure"))),c.a.createElement(s.a,{item:!0,xs:!0},c.a.createElement(u.a,{color:"primary.contrastText",fontSize:{xs:"h6.fontSize",sm:"h5.fontSize",md:"h4.fontSize"},className:"text__bold--semi",align:"right"},"Versi\xf3n del sistema"),c.a.createElement(u.a,{color:"secondary.main",fontSize:{xs:"h6.fontSize",sm:"h5.fontSize"},className:"text__bold--semi",align:"right"},"v5.0.0-Alpha.1"))))}function w(){document.title="La Candelaria - Gedure";var e=Object(j.d)((function(e){return{privilegio:e.userData.user.privilegio,loading:e.forms.pageIndex.loading,data:e.forms.pageIndex.data}})),t=e.privilegio,a=e.loading,n=e.data,u=Object(j.c)(),f=Object(p.a)().fetchData,b=N();return Object(i.useEffect)((function(){return function(){var e=Object(o.a)(r.a.mark((function e(){var t,a,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={url:"v1/info-box",type:"get",messageToFinish:!1},e.next=3,f(t);case 3:a=e.sent,n=a,a&&a.boletas&&a.boletas.forEach((function(e,t){n.boletas[t].textPrimary="".concat(Object(h.a)(e.curso)," ").concat(e.seccion," - ").concat(e.lapso,"\xb0 Lapso")})),u(Object(z.a)("pageIndex",!1,n));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()(),function(){u(Object(z.a)("pageIndex",!0,{}))}}),[]),c.a.createElement("main",{className:b.containerMain},c.a.createElement(d.a,{direction:"down",in:!0,timeout:1e3,mountOnEnter:!0,unmountOnExit:!0},c.a.createElement(s.a,{container:!0},c.a.createElement(s.a,{container:!0,alignItems:"center",item:!0,xs:12,className:b.header},c.a.createElement(C,null)))),c.a.createElement(m.a,{in:!0,style:{transitionDelay:"1000ms"}},c.a.createElement(l.a,null,c.a.createElement(s.a,{container:!0,justify:"center",spacing:2,item:!0,xs:12,className:b.content,"data-tour":"infoBox"},c.a.createElement(y,{title:"\xdaltimas noticias",data:null===n||void 0===n?void 0:n.posts,loading:a}),"V-"===t&&c.a.createElement(c.a.Fragment,null,c.a.createElement(y,{title:"\xdaltimas boletas cargadas",data:null===n||void 0===n?void 0:n.boletas,loading:a}))))),c.a.createElement(k,null))}}}]);
//# sourceMappingURL=52.b28767b1.chunk.js.map