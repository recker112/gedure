(this["webpackJsonpfrontend-la-candelaria"]=this["webpackJsonpfrontend-la-candelaria"]||[]).push([[41],{1290:function(e,a,t){"use strict";var r;Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=(0,((r=t(39))&&r.__esModule?r:{default:r}).default)("M14,3L12,1H4A2,2 0 0,0 2,3V15A2,2 0 0,0 4,17H11V19L15,16L11,13V15H4V3H14M21,10V21A2,2 0 0,1 19,23H8A2,2 0 0,1 6,21V19H8V21H19V12H14V7H8V13H6V7A2,2 0 0,1 8,5H16L21,10Z");a.default=i},333:function(e,a,t){"use strict";var r=t(2),i=t(3),o=t(0),n=(t(4),t(5)),c=t(7),s=t(10),l=44,d=o.forwardRef((function(e,a){var t=e.classes,c=e.className,d=e.color,p=void 0===d?"primary":d,m=e.disableShrink,u=void 0!==m&&m,f=e.size,b=void 0===f?40:f,h=e.style,v=e.thickness,x=void 0===v?3.6:v,g=e.value,k=void 0===g?0:g,y=e.variant,j=void 0===y?"indeterminate":y,O=Object(i.a)(e,["classes","className","color","disableShrink","size","style","thickness","value","variant"]),E={},w={},D={};if("determinate"===j||"static"===j){var S=2*Math.PI*((l-x)/2);E.strokeDasharray=S.toFixed(3),D["aria-valuenow"]=Math.round(k),E.strokeDashoffset="".concat(((100-k)/100*S).toFixed(3),"px"),w.transform="rotate(-90deg)"}return o.createElement("div",Object(r.a)({className:Object(n.a)(t.root,c,"inherit"!==p&&t["color".concat(Object(s.a)(p))],{determinate:t.determinate,indeterminate:t.indeterminate,static:t.static}[j]),style:Object(r.a)({width:b,height:b},w,h),ref:a,role:"progressbar"},D,O),o.createElement("svg",{className:t.svg,viewBox:"".concat(22," ").concat(22," ").concat(l," ").concat(l)},o.createElement("circle",{className:Object(n.a)(t.circle,u&&t.circleDisableShrink,{determinate:t.circleDeterminate,indeterminate:t.circleIndeterminate,static:t.circleStatic}[j]),style:E,cx:l,cy:l,r:(l-x)/2,fill:"none",strokeWidth:x})))}));a.a=Object(c.a)((function(e){return{root:{display:"inline-block"},static:{transition:e.transitions.create("transform")},indeterminate:{animation:"$circular-rotate 1.4s linear infinite"},determinate:{transition:e.transitions.create("transform")},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},svg:{display:"block"},circle:{stroke:"currentColor"},circleStatic:{transition:e.transitions.create("stroke-dashoffset")},circleIndeterminate:{animation:"$circular-dash 1.4s ease-in-out infinite",strokeDasharray:"80px, 200px",strokeDashoffset:"0px"},circleDeterminate:{transition:e.transitions.create("stroke-dashoffset")},"@keyframes circular-rotate":{"0%":{transformOrigin:"50% 50%"},"100%":{transform:"rotate(360deg)"}},"@keyframes circular-dash":{"0%":{strokeDasharray:"1px, 200px",strokeDashoffset:"0px"},"50%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-15px"},"100%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-125px"}},circleDisableShrink:{animation:"none"}}}),{name:"MuiCircularProgress",flip:!1})(d)},478:function(e,a,t){"use strict";var r=t(25),i=t(26);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o=i(t(0)),n=(0,r(t(27)).default)(o.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");a.default=n},603:function(e,a,t){"use strict";var r=t(2),i=t(3),o=t(0),n=(t(4),t(5)),c=t(7),s=t(60),l=o.forwardRef((function(e,a){var t=e.children,c=e.classes,l=e.className,d=e.disableTypography,p=void 0!==d&&d,m=Object(i.a)(e,["children","classes","className","disableTypography"]);return o.createElement("div",Object(r.a)({className:Object(n.a)(c.root,l),ref:a},m),p?t:o.createElement(s.a,{component:"h2",variant:"h6"},t))}));a.a=Object(c.a)({root:{margin:0,padding:"16px 24px",flex:"0 0 auto"}},{name:"MuiDialogTitle"})(l)},608:function(e,a,t){"use strict";var r=t(2),i=t(0),o=(t(4),t(7)),n=t(60),c=i.forwardRef((function(e,a){return i.createElement(n.a,Object(r.a)({component:"p",variant:"body1",color:"textSecondary",ref:a},e))}));a.a=Object(o.a)({root:{marginBottom:12}},{name:"MuiDialogContentText"})(c)},638:function(e,a,t){"use strict";var r=t(2),i=t(3),o=t(13),n=t(0),c=(t(4),t(5)),s=t(7),l=t(10),d=t(115),p=t(188),m=t(189),u=t(20),f=t(93),b={enter:u.b.enteringScreen,exit:u.b.leavingScreen},h=n.forwardRef((function(e,a){var t=e.BackdropProps,o=e.children,s=e.classes,u=e.className,h=e.disableBackdropClick,v=void 0!==h&&h,x=e.disableEscapeKeyDown,g=void 0!==x&&x,k=e.fullScreen,y=void 0!==k&&k,j=e.fullWidth,O=void 0!==j&&j,E=e.maxWidth,w=void 0===E?"sm":E,D=e.onBackdropClick,S=e.onClose,W=e.onEnter,M=e.onEntered,B=e.onEntering,C=e.onEscapeKeyDown,N=e.onExit,P=e.onExited,H=e.onExiting,V=e.open,A=e.PaperComponent,T=void 0===A?f.a:A,R=e.PaperProps,$=void 0===R?{}:R,_=e.scroll,F=void 0===_?"paper":_,z=e.TransitionComponent,K=void 0===z?m.a:z,L=e.transitionDuration,I=void 0===L?b:L,Y=e.TransitionProps,X=e["aria-describedby"],J=e["aria-labelledby"],G=Object(i.a)(e,["BackdropProps","children","classes","className","disableBackdropClick","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","onEnter","onEntered","onEntering","onEscapeKeyDown","onExit","onExited","onExiting","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps","aria-describedby","aria-labelledby"]),U=n.useRef();return n.createElement(d.a,Object(r.a)({className:Object(c.a)(s.root,u),BackdropComponent:p.a,BackdropProps:Object(r.a)({transitionDuration:I},t),closeAfterTransition:!0,disableBackdropClick:v,disableEscapeKeyDown:g,onEscapeKeyDown:C,onClose:S,open:V,ref:a},G),n.createElement(K,Object(r.a)({appear:!0,in:V,timeout:I,onEnter:W,onEntering:B,onEntered:M,onExit:N,onExiting:H,onExited:P,role:"none presentation"},Y),n.createElement("div",{className:Object(c.a)(s.container,s["scroll".concat(Object(l.a)(F))]),onMouseUp:function(e){e.target===e.currentTarget&&e.target===U.current&&(U.current=null,D&&D(e),!v&&S&&S(e,"backdropClick"))},onMouseDown:function(e){U.current=e.target}},n.createElement(T,Object(r.a)({elevation:24,role:"dialog","aria-describedby":X,"aria-labelledby":J},$,{className:Object(c.a)(s.paper,s["paperScroll".concat(Object(l.a)(F))],s["paperWidth".concat(Object(l.a)(String(w)))],$.className,y&&s.paperFullScreen,O&&s.paperFullWidth)}),o))))}));a.a=Object(s.a)((function(e){return{root:{"@media print":{position:"absolute !important"}},scrollPaper:{display:"flex",justifyContent:"center",alignItems:"center"},scrollBody:{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}},container:{height:"100%","@media print":{height:"auto"},outline:0},paper:{margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},paperScrollPaper:{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},paperScrollBody:{display:"inline-block",verticalAlign:"middle",textAlign:"left"},paperWidthFalse:{maxWidth:"calc(100% - 64px)"},paperWidthXs:{maxWidth:Math.max(e.breakpoints.values.xs,444),"&$paperScrollBody":Object(o.a)({},e.breakpoints.down(Math.max(e.breakpoints.values.xs,444)+64),{maxWidth:"calc(100% - 64px)"})},paperWidthSm:{maxWidth:e.breakpoints.values.sm,"&$paperScrollBody":Object(o.a)({},e.breakpoints.down(e.breakpoints.values.sm+64),{maxWidth:"calc(100% - 64px)"})},paperWidthMd:{maxWidth:e.breakpoints.values.md,"&$paperScrollBody":Object(o.a)({},e.breakpoints.down(e.breakpoints.values.md+64),{maxWidth:"calc(100% - 64px)"})},paperWidthLg:{maxWidth:e.breakpoints.values.lg,"&$paperScrollBody":Object(o.a)({},e.breakpoints.down(e.breakpoints.values.lg+64),{maxWidth:"calc(100% - 64px)"})},paperWidthXl:{maxWidth:e.breakpoints.values.xl,"&$paperScrollBody":Object(o.a)({},e.breakpoints.down(e.breakpoints.values.xl+64),{maxWidth:"calc(100% - 64px)"})},paperFullWidth:{width:"calc(100% - 64px)"},paperFullScreen:{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,"&$paperScrollBody":{margin:0,maxWidth:"100%"}}}}),{name:"MuiDialog"})(h)},639:function(e,a,t){"use strict";var r=t(2),i=t(3),o=t(0),n=(t(4),t(5)),c=t(7),s=o.forwardRef((function(e,a){var t=e.classes,c=e.className,s=e.dividers,l=void 0!==s&&s,d=Object(i.a)(e,["classes","className","dividers"]);return o.createElement("div",Object(r.a)({className:Object(n.a)(t.root,c,l&&t.dividers),ref:a},d))}));a.a=Object(c.a)((function(e){return{root:{flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"8px 24px","&:first-child":{paddingTop:20}},dividers:{padding:"16px 24px",borderTop:"1px solid ".concat(e.palette.divider),borderBottom:"1px solid ".concat(e.palette.divider)}}}),{name:"MuiDialogContent"})(s)},640:function(e,a,t){"use strict";var r=t(2),i=t(3),o=t(0),n=(t(4),t(5)),c=t(7),s=o.forwardRef((function(e,a){var t=e.disableSpacing,c=void 0!==t&&t,s=e.classes,l=e.className,d=Object(i.a)(e,["disableSpacing","classes","className"]);return o.createElement("div",Object(r.a)({className:Object(n.a)(s.root,l,!c&&s.spacing),ref:a},d))}));a.a=Object(c.a)({root:{display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiDialogActions"})(s)},676:function(e,a,t){"use strict";var r=t(25),i=t(26);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o=i(t(0)),n=(0,r(t(27)).default)(o.createElement("path",{d:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"}),"GetApp");a.default=n}}]);
//# sourceMappingURL=41.9c760b29.chunk.js.map