(this.webpackJsonpGedure=this.webpackJsonpGedure||[]).push([[69],{6322:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(6365),c=t(6354),l=t(13),s=function(e,a){return{type:"UPDATE_TOUR",payload:{open:e,tour:a}}};a.a=function(e){var a=e.steps,t=e.select,n=Object(l.d)((function(e){return{tourOpen:e.settings.tour[t]}})).tourOpen,i=Object(l.c)();return r.a.createElement(o.a,{steps:a,isOpen:n,disableInteraction:!0,onAfterOpen:function(){document.body.style.overflowY="hidden"},onBeforeClose:function(){document.body.style.overflowY="auto"},showCloseButton:!1,rounded:5,lastStepNextButton:r.a.createElement(c.a,{size:"small",color:"primary",onClick:function(){i(s(!1,t))}},"Terminar gu\xeda")})}},7069:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(30),c=t(11),l=t(6663),s=t(6215),i=t(6193),u=t(6092),m=t(150),d=t(6040),p=t(6675),b=t(6039),f=t(57),E=t(108),g=t(6354),v=t(15),y=t(6322);function h(){var e=Object(v.a)(),a=[{selector:"",content:function(e){var a=e.goTo;return r.a.createElement("div",null,r.a.createElement(f.a,{color:"primary",className:"text__bold--big",variant:"h5"},"Configurar Gedure"),r.a.createElement(f.a,{variant:"body1"},"En esta secci\xf3n podr\xe1 configurar Gedure, adapte el sistema a sus necesidades."),r.a.createElement(g.a,{size:"small",color:"primary",onClick:function(){a(4)}},"Saltar tour"))},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="general"]',content:function(){return r.a.createElement(f.a,{variant:"body1"},"Aqu\xed podr\xe1 ver cosas generales del sistema.")},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="cursos"]',content:function(){return r.a.createElement(f.a,{variant:"body1"},"Aqu\xed podr\xe1 ",r.a.createElement("strong",null,"crear y eliminar")," cursos en el sistema.")},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="usuarios"]',content:function(){return r.a.createElement(f.a,{variant:"body1"},"Aqu\xed podr\xe1 ",r.a.createElement("strong",null,"reactivar y eliminar definitivamente")," usuarios del sistema.")},style:{backgroundColor:e.palette.background.paper}},{selector:"",content:function(){return r.a.createElement(f.a,{variant:"body1"},"Con esto finaliza esta gu\xeda, navege entre otras partes del sistema para encontrar m\xe1s gu\xedas.")},style:{backgroundColor:e.palette.background.paper}}];return r.a.createElement(y.a,{select:"gedure",steps:a})}var x=t(13);t.d(a,"default",(function(){return w}));var O=Object(n.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(4),t.e(17)]).then(t.bind(null,7096))})),C=Object(n.lazy)((function(){return Promise.all([t.e(0),t.e(2),t.e(4),t.e(20),t.e(55)]).then(t.bind(null,7098))})),k=Object(E.a)((function(e){return{containerMain:{flexGrow:1,paddingBottom:e.spacing(5)},header:{background:e.palette.primary.main,height:300,borderRadius:"0px 0px 15px 15px"},content:{marginTop:e.spacing(3)}}}));function j(e){return{id:"nav-tab-".concat(e),"aria-controls":"nav-tabpanel-".concat(e)}}function S(e){return r.a.createElement(l.a,Object.assign({component:o.b,to:e.value},e))}function z(){return r.a.createElement(s.a,{align:"center"},r.a.createElement(i.a,null))}function _(){return r.a.createElement(u.a,null,r.a.createElement(s.a,{color:"primary.contrastText",fontSize:{xs:"h6.fontSize",sm:"h5.fontSize",md:"h4.fontSize"},className:"text__bold--semi"},"Configuraci\xf3n del sistema,"),r.a.createElement(s.a,{color:"primary.contrastText",fontSize:{xs:"h6.fontSize",sm:"h5.fontSize"},className:"text__bold--semi"},"adapte ",r.a.createElement(s.a,{color:"secondary.main",component:"span"},"Gedure")," a su gusto."))}function w(){var e,a;document.title="La Candelaria - Configuraci\xf3n del sistema";var t=Object(x.d)((function(e){return{permissions:e.userData.permissions}})).permissions,o=Object(c.j)().url,l=Object(c.h)(),s=k(),i=[{path:"".concat(o,"/cursos"),component:r.a.createElement(O,null),exact:!0,iCanSee:Boolean(null===t||void 0===t||null===(e=t.gedure)||void 0===e?void 0:e.cursos_index)},{path:"".concat(o,"/usuarios-desactivados"),component:r.a.createElement(C,null),exact:!0,iCanSee:Boolean(null===t||void 0===t||null===(a=t.gedure)||void 0===a?void 0:a.users_disabled_index)}];return r.a.createElement("main",{className:s.containerMain},r.a.createElement(m.a,{direction:"down",in:!0,timeout:1e3,mountOnEnter:!0,unmountOnExit:!0},r.a.createElement(d.a,{container:!0,direction:"column",className:s.header},r.a.createElement(d.a,{container:!0,alignItems:"center",item:!0,style:{flexGrow:1}},r.a.createElement(_,null)),r.a.createElement(d.a,{item:!0},r.a.createElement(p.a,{value:l.pathname,centered:!0},r.a.createElement(S,Object.assign({label:"General",value:"".concat(o),"data-tour":"general"},j(0))),r.a.createElement(S,Object.assign({label:"Cursos",value:"".concat(o,"/cursos"),"data-tour":"cursos"},j(1))),r.a.createElement(S,Object.assign({label:"Usuarios desactivados",value:"".concat(o,"/usuarios-desactivados"),"data-tour":"usuarios"},j(2))))))),r.a.createElement(b.a,{in:!0,style:{transitionDelay:"1000ms"}},r.a.createElement(u.a,{className:s.content},r.a.createElement(n.Suspense,{fallback:r.a.createElement(z,null)},r.a.createElement(c.d,null,i.map((function(e,a){return e.iCanSee?r.a.createElement(c.b,{key:a,path:e.path,exact:e.exact},e.component):null})),r.a.createElement(c.b,null,r.a.createElement(f.a,{align:"center"},"No hay nada disponible")))))),r.a.createElement(h,null))}}}]);
//# sourceMappingURL=69.b831361f.chunk.js.map