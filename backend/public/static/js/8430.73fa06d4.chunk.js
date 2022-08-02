"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[8430],{48430:function(e,n,r){r.r(n),r.d(n,{default:function(){return Y}});var a=r(29439),s=r(72791),t=r(91614),o=r(61889),i=r(68870),d=r(55931),c=r(60627),l=r(84506),u=r(4942),p=r(63366),x=r(87462),h=(r(57441),r(28182)),m=r(94419),g=r(66934),f=r(31402),b=r(56125),Z=r(10703);var j=s.createContext({}),v=r(98278),y=r(21217),C=r(75878);function R(e){return(0,y.Z)("MuiAccordion",e)}var S=(0,C.Z)("MuiAccordion",["root","rounded","expanded","disabled","gutters","region"]),q=r(80184),G=["children","className","defaultExpanded","disabled","disableGutters","expanded","onChange","square","TransitionComponent","TransitionProps"],A=(0,g.ZP)(Z.Z,{name:"MuiAccordion",slot:"Root",overridesResolver:function(e,n){var r=e.ownerState;return[(0,u.Z)({},"& .".concat(S.region),n.region),n.root,!r.square&&n.rounded,!r.disableGutters&&n.gutters]}})((function(e){var n,r=e.theme,a={duration:r.transitions.duration.shortest};return n={position:"relative",transition:r.transitions.create(["margin"],a),overflowAnchor:"none","&:before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(r.vars||r).palette.divider,transition:r.transitions.create(["opacity","background-color"],a)},"&:first-of-type":{"&:before":{display:"none"}}},(0,u.Z)(n,"&.".concat(S.expanded),{"&:before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&:before":{display:"none"}}}),(0,u.Z)(n,"&.".concat(S.disabled),{backgroundColor:(r.vars||r).palette.action.disabledBackground}),n}),(function(e){var n=e.theme,r=e.ownerState;return(0,x.Z)({},!r.square&&{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(n.vars||n).shape.borderRadius,borderTopRightRadius:(n.vars||n).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(n.vars||n).shape.borderRadius,borderBottomRightRadius:(n.vars||n).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}},!r.disableGutters&&(0,u.Z)({},"&.".concat(S.expanded),{margin:"16px 0"}))})),w=s.forwardRef((function(e,n){var r=(0,f.Z)({props:e,name:"MuiAccordion"}),t=r.children,o=r.className,i=r.defaultExpanded,d=void 0!==i&&i,c=r.disabled,u=void 0!==c&&c,g=r.disableGutters,Z=void 0!==g&&g,y=r.expanded,C=r.onChange,S=r.square,w=void 0!==S&&S,N=r.TransitionComponent,P=void 0===N?b.Z:N,k=r.TransitionProps,M=(0,p.Z)(r,G),I=(0,v.Z)({controlled:y,default:d,name:"Accordion",state:"expanded"}),T=(0,a.Z)(I,2),z=T[0],H=T[1],V=s.useCallback((function(e){H(!z),C&&C(e,!z)}),[z,C,H]),D=s.Children.toArray(t),_=(0,l.Z)(D),B=_[0],F=_.slice(1),E=s.useMemo((function(){return{expanded:z,disabled:u,disableGutters:Z,toggle:V}}),[z,u,Z,V]),W=(0,x.Z)({},r,{square:w,disabled:u,disableGutters:Z,expanded:z}),L=function(e){var n=e.classes,r={root:["root",!e.square&&"rounded",e.expanded&&"expanded",e.disabled&&"disabled",!e.disableGutters&&"gutters"],region:["region"]};return(0,m.Z)(r,R,n)}(W);return(0,q.jsxs)(A,(0,x.Z)({className:(0,h.Z)(L.root,o),ref:n,ownerState:W,square:w},M,{children:[(0,q.jsx)(j.Provider,{value:E,children:B}),(0,q.jsx)(P,(0,x.Z)({in:z,timeout:"auto"},k,{children:(0,q.jsx)("div",{"aria-labelledby":B.props.id,id:B.props["aria-controls"],role:"region",className:L.region,children:F})}))]}))})),N=w,P=r(95080);function k(e){return(0,y.Z)("MuiAccordionSummary",e)}var M=(0,C.Z)("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]),I=["children","className","expandIcon","focusVisibleClassName","onClick"],T=(0,g.ZP)(P.Z,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:function(e,n){return n.root}})((function(e){var n,r=e.theme,a=e.ownerState,s={duration:r.transitions.duration.shortest};return(0,x.Z)((n={display:"flex",minHeight:48,padding:r.spacing(0,2),transition:r.transitions.create(["min-height","background-color"],s)},(0,u.Z)(n,"&.".concat(M.focusVisible),{backgroundColor:(r.vars||r).palette.action.focus}),(0,u.Z)(n,"&.".concat(M.disabled),{opacity:(r.vars||r).palette.action.disabledOpacity}),(0,u.Z)(n,"&:hover:not(.".concat(M.disabled,")"),{cursor:"pointer"}),n),!a.disableGutters&&(0,u.Z)({},"&.".concat(M.expanded),{minHeight:64}))})),z=(0,g.ZP)("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:function(e,n){return n.content}})((function(e){var n=e.theme,r=e.ownerState;return(0,x.Z)({display:"flex",flexGrow:1,margin:"12px 0"},!r.disableGutters&&(0,u.Z)({transition:n.transitions.create(["margin"],{duration:n.transitions.duration.shortest})},"&.".concat(M.expanded),{margin:"20px 0"}))})),H=(0,g.ZP)("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:function(e,n){return n.expandIconWrapper}})((function(e){var n=e.theme;return(0,u.Z)({display:"flex",color:(n.vars||n).palette.action.active,transform:"rotate(0deg)",transition:n.transitions.create("transform",{duration:n.transitions.duration.shortest})},"&.".concat(M.expanded),{transform:"rotate(180deg)"})})),V=s.forwardRef((function(e,n){var r=(0,f.Z)({props:e,name:"MuiAccordionSummary"}),a=r.children,t=r.className,o=r.expandIcon,i=r.focusVisibleClassName,d=r.onClick,c=(0,p.Z)(r,I),l=s.useContext(j),u=l.disabled,g=void 0!==u&&u,b=l.disableGutters,Z=l.expanded,v=l.toggle,y=(0,x.Z)({},r,{expanded:Z,disabled:g,disableGutters:b}),C=function(e){var n=e.classes,r=e.expanded,a=e.disabled,s=e.disableGutters,t={root:["root",r&&"expanded",a&&"disabled",!s&&"gutters"],focusVisible:["focusVisible"],content:["content",r&&"expanded",!s&&"contentGutters"],expandIconWrapper:["expandIconWrapper",r&&"expanded"]};return(0,m.Z)(t,k,n)}(y);return(0,q.jsxs)(T,(0,x.Z)({focusRipple:!1,disableRipple:!0,disabled:g,component:"div","aria-expanded":Z,className:(0,h.Z)(C.root,t),focusVisibleClassName:(0,h.Z)(C.focusVisible,i),onClick:function(e){v&&v(e),d&&d(e)},ref:n,ownerState:y},c,{children:[(0,q.jsx)(z,{className:C.content,ownerState:y,children:a}),o&&(0,q.jsx)(H,{className:C.expandIconWrapper,ownerState:y,children:o})]}))})),D=V,_=r(20890);function B(e){return(0,y.Z)("MuiAccordionDetails",e)}(0,C.Z)("MuiAccordionDetails",["root"]);var F=["className"],E=(0,g.ZP)("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:function(e,n){return n.root}})((function(e){return{padding:e.theme.spacing(1,2,2)}})),W=s.forwardRef((function(e,n){var r=(0,f.Z)({props:e,name:"MuiAccordionDetails"}),a=r.className,s=(0,p.Z)(r,F),t=r,o=function(e){var n=e.classes;return(0,m.Z)({root:["root"]},B,n)}(t);return(0,q.jsx)(E,(0,x.Z)({className:(0,h.Z)(o.root,a),ref:n,ownerState:t},s))})),L=W,O=r(81131);function J(e){var n=e.expand,r=e.handleChange,a=e.classes;return(0,q.jsxs)(q.Fragment,{children:[(0,q.jsxs)(N,{expanded:"cargar-estudiantes"===n,onChange:r("cargar-estudiantes"),children:[(0,q.jsxs)(D,{expandIcon:(0,q.jsx)(O.Z,{}),"aria-controls":"cargar-estudiantes-content",id:"cargar-estudiantes-header",children:[(0,q.jsx)(_.Z,{sx:a.heading,children:"\xbfC\xf3mo puedo cargar estudiantes?"}),(0,q.jsx)(_.Z,{sx:a.secondaryHeading,children:"Formato e instrucciones"})]}),(0,q.jsx)(L,{children:(0,q.jsxs)(_.Z,{children:["Para poder cargar estudiantes dentro de ",(0,q.jsx)("strong",{children:"Gedure"})," ust\xe9d necesita tener una ",(0,q.jsx)("strong",{children:"n\xf3mina en excel"}),", esta debe contener el ",(0,q.jsx)("strong",{children:"formato de SACE"}),", lo \xfanico que debe tener en cuenta es que ",(0,q.jsx)("strong",{children:"cada secci\xf3n debe estar separada en una hoja"}),", y el nombre de las hoja debe contener el ",(0,q.jsx)("strong",{children:"c\xf3digo del curso"})," al que se desean cargar ",(0,q.jsx)(i.Z,{component:"span",sx:a.secondaryHeading,children:"(los c\xf3digos de los cursos los puede ver en la Configurar Gedure)"}),". Tenga en cuenta que si un estudiante ",(0,q.jsx)("strong",{children:"no posee correo electr\xf3nico"})," en esa n\xf3mina, no se le podr\xe1 enviar la invitaci\xf3n, pero el usuario ",(0,q.jsx)("strong",{children:"se crear\xe1 de todas maneras"}),".",(0,q.jsx)("br",{}),(0,q.jsx)("br",{}),"Si un usuario ",(0,q.jsx)("strong",{children:"ya est\xe1 creado"})," en el sistema, simplemente se le mover\xe1 de secci\xf3n y se le actualizar\xe1 el nombre ",(0,q.jsx)(i.Z,{component:"span",sx:a.secondaryHeading,children:"(si es que se ha cambiado)"}),"."]})})]}),(0,q.jsxs)(N,{expanded:"cargar-boletas"===n,onChange:r("cargar-boletas"),children:[(0,q.jsxs)(D,{expandIcon:(0,q.jsx)(O.Z,{}),"aria-controls":"cargar-boletas-content",id:"cargar-boletas-header",children:[(0,q.jsx)(_.Z,{sx:a.heading,children:"\xbfC\xf3mo puedo cargar boletas?"}),(0,q.jsx)(_.Z,{sx:a.secondaryHeading,children:"Formato e instrucciones"})]}),(0,q.jsx)(L,{children:(0,q.jsxs)(_.Z,{children:[(0,q.jsx)("strong",{children:"Gedure busca autom\xe1ticamente"})," al estudiante despu\xe9s de ",(0,q.jsx)("strong",{children:"encontrar una c\xe9dula"})," en el archivo ",(0,q.jsx)("strong",{children:"PDF"}),", esto le permite ",(0,q.jsx)("strong",{children:"usar cualquier formato en la boleta"})," ya que el sistema se encargar\xe1 de adaptarse al formato dado. Debe de tener en cuenta que ",(0,q.jsx)("strong",{children:"cada boleta"})," debe estar ",(0,q.jsx)("strong",{children:"separada"})," y debe de tener el ",(0,q.jsx)("strong",{children:"formato PDF"}),", una vez cumpla esto requisitos simplemente ",(0,q.jsx)("strong",{children:"comprima"})," todas las boletas en el ",(0,q.jsx)("strong",{children:"orden que quiera"})," en un ",(0,q.jsx)("strong",{children:"archivo ZIP"})," y s\xfabalo al servidor, el sistema se encargar\xe1 de distribuirlas a los estudiantes existentes.",(0,q.jsx)("br",{}),(0,q.jsx)("br",{}),"Cabe destacar que ",(0,q.jsx)("strong",{children:"solo puede subir boletas del curso actual"})," donde est\xe9 el estudiante, si desea modificar boletas anteriores tendr\xe1 que hacerlo manualmente."]})})]})]})}function K(e){var n=e.expand,r=e.handleChange,a=e.classes;return(0,q.jsx)(q.Fragment,{children:(0,q.jsxs)(N,{expanded:"descargar-boletas"===n,onChange:r("descargar-boletas"),children:[(0,q.jsxs)(D,{expandIcon:(0,q.jsx)(O.Z,{}),"aria-controls":"descargar-boletas-content",id:"descargar-boletas-header",children:[(0,q.jsx)(_.Z,{sx:a.heading,children:"\xbfPor qu\xe9 no puedo descargar boletas?"}),(0,q.jsx)(_.Z,{sx:a.secondaryHeading,children:"Causas y soluciones"})]}),(0,q.jsx)(L,{children:(0,q.jsxs)(_.Z,{children:["Si recibe el ",(0,q.jsx)("strong",{children:'error "No tienes permisos para esta acci\xf3n"'})," al intentar ",(0,q.jsx)("strong",{children:"descargar"})," sus boletas es posible que tenga las boletas desactivadas, para poder solucionar este problema ",(0,q.jsx)("strong",{children:"contacte directamente con un directivo"})," del instituto ",(0,q.jsx)(i.Z,{component:"span",sx:a.secondaryHeading,children:"(preferiblemente control de estudio)"})," para poder solventar este inconveniente."]})})]})})}var Q=r(16030),U={container:{flexGrow:1},header:function(e){return{background:e.palette.primary.main,height:300,borderRadius:"0px 0px 15px 15px"}},content:{position:"relative",top:-60},heading:function(e){return{fontSize:e.typography.pxToRem(15),flexBasis:"33.33%",flexShrink:0}},secondaryHeading:function(e){return{fontSize:e.typography.pxToRem(15),color:e.palette.text.secondary}}};function X(){return(0,q.jsx)(t.Z,{sx:{height:"100%"},children:(0,q.jsx)(o.ZP,{container:!0,justifyContent:"flex-start",alignItems:"center",sx:{height:"100%"},children:(0,q.jsxs)(o.ZP,{item:!0,xs:!0,children:[(0,q.jsxs)(i.Z,{color:"primary.contrastText",fontSize:{xs:"h5.fontSize",sm:"h4.fontSize",md:"h3.fontSize"},className:"text__bold--semi",children:[(0,q.jsx)(i.Z,{color:"secondary.main",component:"span",children:"Preguntas"})," frecuentes,"]}),(0,q.jsxs)(i.Z,{color:"primary.contrastText",fontSize:{xs:"h6.fontSize",sm:"h5.fontSize"},className:"text__bold--semi",children:["resuelva sus dudas sobre ",(0,q.jsx)(i.Z,{color:"secondary.main",component:"span",children:"Gedure"})]})]})})})}function Y(){document.title="La Candelaria - Preguntas Frecuentes";var e=(0,s.useState)(!1),n=(0,a.Z)(e,2),r=n[0],o=n[1],l=function(e){return function(n,r){o(!!r&&e)}},u=(0,Q.v9)((function(e){return e.auth.user.privilegio}));return(0,q.jsxs)(i.Z,{component:"main",sx:U.container,children:[(0,q.jsx)(d.Z,{direction:"down",in:!0,timeout:1e3,mountOnEnter:!0,unmountOnExit:!0,children:(0,q.jsx)(i.Z,{sx:U.header,children:(0,q.jsx)(X,{})})}),(0,q.jsx)(c.Z,{in:!0,style:{transitionDelay:"1000ms"},children:(0,q.jsxs)(t.Z,{sx:U.content,children:["A-"===u&&(0,q.jsx)(J,{expand:r,handleChange:l,classes:U}),"V-"===u&&(0,q.jsx)(K,{expand:r,handleChange:l,classes:U})]})})]})}},84506:function(e,n,r){r.d(n,{Z:function(){return i}});var a=r(83878),s=r(59199),t=r(40181),o=r(25267);function i(e){return(0,a.Z)(e)||(0,s.Z)(e)||(0,t.Z)(e)||(0,o.Z)()}}}]);
//# sourceMappingURL=8430.73fa06d4.chunk.js.map