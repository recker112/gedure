(this["webpackJsonpfrontend-la-candelaria"]=this["webpackJsonpfrontend-la-candelaria"]||[]).push([[50],{1314:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return C}));var r=t(48),n=t.n(r),i=t(67),c=t(42),s=t(0),o=t(15),l=t(227),d=t(355),u=t(333),j=t(152),b=t(105),f=t(93),m=t(226),p=t(60),h=t(488),v=t(262),O=t(274),x=t(263),g=t(12),y=t(264),k=t(1);function w(e){var a,t,r=e.invitationKey,c=Object(g.d)((function(e){return{data:e.forms.invitation.data,loading:e.forms.registerPassword.loading}})),s=c.data,l=c.loading,d=Object(g.c)(),u=Object(o.g)(),j=Object(v.c)({mode:"onTouched"}),w=j.register,D=j.handleSubmit,C=j.errors,z=j.setError,M=j.watch,E=Object(b.a)(z).fetchData,S=function(){var e=Object(i.a)(n.a.mark((function e(a){var t;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(Object(y.a)("registerPassword",!0)),t={url:"v1/invitation/register",type:"post",data:{key:r,password:a.password},message404:"Invitaci\xf3n inv\xe1lida"},e.next=4,E(t);case 4:e.sent&&u.push("/entrar"),d(Object(y.a)("registerPassword",!1));case 7:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return Object(k.jsx)("form",{onSubmit:D(S),autoComplete:"off",children:Object(k.jsx)(f.a,{className:"paper--padding",children:Object(k.jsxs)(m.a,{container:!0,spacing:2,children:[Object(k.jsx)(m.a,{item:!0,xs:12,children:Object(k.jsxs)(p.a,{children:["Hola ",Object(k.jsx)("strong",{children:s.name}),", antes de poder entrar al sistema es necesario que ",Object(k.jsx)("strong",{children:"cree una contrase\xf1a"}),", use una contrase\xf1a que sea ",Object(k.jsx)("strong",{children:"f\xe1cil de recordar para usted"}),". Si pierde su contrase\xf1a es posible recuperarla mediante el correo electr\xf3nico."]})}),Object(k.jsx)(m.a,{item:!0,xs:12,children:Object(k.jsx)(O.a,{inputRef:w({required:{value:!0,message:"* Campo requerido"},minLength:{value:4,message:"Error: Demaciado corto"}}),name:"password",variant:"standard",size:"small",error:Boolean(null===C||void 0===C?void 0:C.password),helperText:(null===C||void 0===C||null===(a=C.password)||void 0===a?void 0:a.message)?C.password.message:"* Campo requerido",label:"Contrase\xf1a",disabled:l})}),Object(k.jsx)(m.a,{item:!0,xs:12,children:Object(k.jsx)(O.a,{inputRef:w({required:{value:!0,message:"* Campo requerido"},minLength:{value:4,message:"Error: Demaciado corto"},validate:function(e){return e===M("password","")||"Error: Las contrase\xf1as no coinciden"}}),name:"repear_password",variant:"standard",size:"small",error:Boolean(null===C||void 0===C?void 0:C.repear_password),helperText:(null===C||void 0===C||null===(t=C.repear_password)||void 0===t?void 0:t.message)?C.repear_password.message:"* Campo requerido",label:"Repetir contrase\xf1a",disabled:l})}),Object(k.jsx)(m.a,{container:!0,justify:"flex-end",item:!0,xs:12,children:Object(k.jsx)(x.a,{loading:l,children:Object(k.jsx)(h.a,{color:"primary",type:"submit",variant:"contained",disableElevation:!0,children:"Crear"})})})]})})})}var D=Object(j.a)((function(e){var a;return{containerMain:(a={flexGrow:1,paddingBottom:e.spacing(5)},Object(c.a)(a,e.breakpoints.up("xs"),{marginTop:"80px"}),Object(c.a)(a,e.breakpoints.up("sm"),{marginTop:e.spacing(12)}),a)}}));function C(){document.title="La Candelaria - Invitaci\xf3n";var e=Object(g.d)((function(e){return{loading:e.forms.invitation.loading,data:e.forms.invitation.data}})),a=e.loading,t=e.data,r=Object(g.c)(),c=Object(o.i)().key,j=Object(b.a)().fetchData,f=D();return Object(s.useEffect)((function(){(function(){var e=Object(i.a)(n.a.mark((function e(){var a,t;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={url:"v1/invitation/user/".concat(c),type:"get",message404:"Invitaci\xf3n inv\xe1lida",messageToFinish:!1},e.next=3,j(a);case 3:t=e.sent,r(Object(y.a)("invitation",!1,t));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(k.jsx)("main",{className:f.containerMain,children:Object(k.jsxs)(l.a,{maxWidth:"md",children:[a&&Object(k.jsx)(d.a,{align:"center",children:Object(k.jsx)(u.a,{})}),!a&&t.name&&Object(k.jsx)(w,{invitationKey:c})]})})}},263:function(e,a,t){"use strict";var r=t(6),n=(t(0),t(355)),i=t(333),c=t(60),s=t(226),o=t(188),l=t(152),d=t(1),u=Object(l.a)((function(e){return{progressLabel:{marginTop:5}}}));a.a=function(e){var a=e.loading,t=e.backDrop,l=void 0!==t&&t,j=e.children,b=function(e){var a=e.color,t=void 0===a?"primary":a,r=e.progressLabel,o=e.progressLoading,l=e.progress,j=u();return o&&l<=99?Object(d.jsxs)(n.a,{children:[Object(d.jsxs)(n.a,{position:"relative",display:"inline-flex",children:[Object(d.jsx)(i.a,{color:t,variant:"static",value:l}),Object(d.jsx)(n.a,{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center",children:Object(d.jsxs)(c.a,{variant:"caption",component:"div",color:"textSecondary",children:[l,"%"]})})]}),r&&Object(d.jsx)(s.a,{container:!0,justify:"center",children:Object(d.jsx)("span",{className:j.progressLabel,children:r})})]}):Object(d.jsx)(i.a,{color:t})};return a&&!l?Object(d.jsx)(b,Object(r.a)({},e)):a&&l?Object(d.jsx)(o.a,{open:!0,style:{zIndex:200},children:Object(d.jsx)(b,Object(r.a)({},e))}):j}},264:function(e,a,t){"use strict";a.a=function(e,a){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return{type:"UPDATE_FORM_DATA",payload:{form:e,loading:a,data:t}}}},274:function(e,a,t){"use strict";t.d(a,"c",(function(){return L})),t.d(a,"b",(function(){return _})),t.d(a,"a",(function(){return q})),t.d(a,"d",(function(){return B}));var r=t(35),n=t(6),i=t(56),c=t(0),s=t(437),o=t(1286),l=t(491),d=t(492),u=t(505),j=t(493),b=t(489),f=t(458),m=t(213),p=t(1287),h=t(93),v=t(494),O=t(495),x=t(496),g=t(497),y=t(498),k=t(60),w=t(231),D=t(152),C=t(280),z=t.n(C),M=t(287),E=t.n(M),S=t(262),T=t(1),I=Object(D.a)((function(e){return{separer:{marginBottom:e.spacing(2)}}}));function L(e){var a=e.name,t=e.defaultValue,r=e.control,c=e.label,l=Object(i.a)(e,["name","defaultValue","control","label"]);return Object(T.jsx)(s.a,{control:Object(T.jsx)(S.a,{render:function(e){var a=e.onChange,t=e.onBlur,r=e.value,i=e.ref;return Object(T.jsx)(o.a,Object(n.a)({inputRef:i,onBlur:t,onChange:function(e){return a(e.currentTarget.checked)},checked:r},l))},name:a,defaultValue:t,control:r}),label:c})}function _(e){var a=e.id,t=e.name,r=e.nameLabel,c=e.control,s=e.defaultValue,o=e.errors,b=e.helperText,f=e.customWidth,m=void 0!==f&&f,p=e.children,h=Object(i.a)(e,["id","name","nameLabel","control","defaultValue","errors","helperText","customWidth","children"]);return Object(T.jsxs)(l.a,Object(n.a)(Object(n.a)({style:{width:m||"100%"},error:Boolean(o)},h),{},{children:[Object(T.jsx)(d.a,{id:a+"-label",children:r}),Object(T.jsx)(S.a,{as:Object(T.jsx)(u.a,{labelId:a+"-label",id:a,children:p}),name:t,control:c,defaultValue:s,rules:{required:{value:!0,message:"* Campo requerido"}}}),Object(T.jsx)(j.a,{children:(null===o||void 0===o?void 0:o.message)?null===o||void 0===o?void 0:o.message:b})]}))}function q(e){var a=Object(c.useState)(!1),t=Object(r.a)(a,2),i=t[0],s=t[1];return Object(T.jsx)(b.a,Object(n.a)({type:i?"text":"password",fullWidth:!0,InputProps:{endAdornment:Object(T.jsx)(f.a,{position:"end",children:Object(T.jsx)(m.a,{onClick:function(){s(!i)},size:null===e||void 0===e?void 0:e.size,children:i?Object(T.jsx)(E.a,{}):Object(T.jsx)(z.a,{})})})}},e))}var B={heading:function(e){var a,t=Object.assign({},e);switch(t.level){case 1:a="h5";break;case 2:a="h6";break;case 3:a="subtitle1";break;case 4:a="subtitle2";break;default:a="h6"}return Object(T.jsx)(k.a,{gutterBottom:!0,variant:a,children:t.children})},link:function(e){return Object(T.jsx)(w.a,{target:"_blank",href:e.href,children:e.children})},paragraph:function(e){var a=I();return Object(T.jsx)(k.a,{className:a.separer,children:e.children})},table:function(e){var a=I();return Object(T.jsx)(p.a,{component:h.a,className:a.separer,children:Object(T.jsx)(v.a,{size:"small","aria-label":"a dense table",children:e.children})})},tableHead:function(e){return Object(T.jsx)(y.a,{children:e.children})},tableBody:function(e){return Object(T.jsx)(g.a,{children:e.children})},tableRow:function(e){return Object(T.jsx)(x.a,{children:e.children})},tableCell:function(e){return Object(T.jsx)(O.a,{children:e.children})},listItem:function(e){var a=Object.assign({},e);return Object(T.jsx)("li",{children:Object(T.jsx)(k.a,{component:"span",children:a.children})})}}},280:function(e,a,t){"use strict";var r=t(25),n=t(26);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=n(t(0)),c=(0,r(t(27)).default)(i.createElement("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");a.default=c},287:function(e,a,t){"use strict";var r=t(25),n=t(26);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=n(t(0)),c=(0,r(t(27)).default)(i.createElement("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");a.default=c},333:function(e,a,t){"use strict";var r=t(2),n=t(3),i=t(0),c=(t(4),t(5)),s=t(7),o=t(10),l=44,d=i.forwardRef((function(e,a){var t=e.classes,s=e.className,d=e.color,u=void 0===d?"primary":d,j=e.disableShrink,b=void 0!==j&&j,f=e.size,m=void 0===f?40:f,p=e.style,h=e.thickness,v=void 0===h?3.6:h,O=e.value,x=void 0===O?0:O,g=e.variant,y=void 0===g?"indeterminate":g,k=Object(n.a)(e,["classes","className","color","disableShrink","size","style","thickness","value","variant"]),w={},D={},C={};if("determinate"===y||"static"===y){var z=2*Math.PI*((l-v)/2);w.strokeDasharray=z.toFixed(3),C["aria-valuenow"]=Math.round(x),w.strokeDashoffset="".concat(((100-x)/100*z).toFixed(3),"px"),D.transform="rotate(-90deg)"}return i.createElement("div",Object(r.a)({className:Object(c.a)(t.root,s,"inherit"!==u&&t["color".concat(Object(o.a)(u))],{determinate:t.determinate,indeterminate:t.indeterminate,static:t.static}[y]),style:Object(r.a)({width:m,height:m},D,p),ref:a,role:"progressbar"},C,k),i.createElement("svg",{className:t.svg,viewBox:"".concat(22," ").concat(22," ").concat(l," ").concat(l)},i.createElement("circle",{className:Object(c.a)(t.circle,b&&t.circleDisableShrink,{determinate:t.circleDeterminate,indeterminate:t.circleIndeterminate,static:t.circleStatic}[y]),style:w,cx:l,cy:l,r:(l-v)/2,fill:"none",strokeWidth:v})))}));a.a=Object(s.a)((function(e){return{root:{display:"inline-block"},static:{transition:e.transitions.create("transform")},indeterminate:{animation:"$circular-rotate 1.4s linear infinite"},determinate:{transition:e.transitions.create("transform")},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},svg:{display:"block"},circle:{stroke:"currentColor"},circleStatic:{transition:e.transitions.create("stroke-dashoffset")},circleIndeterminate:{animation:"$circular-dash 1.4s ease-in-out infinite",strokeDasharray:"80px, 200px",strokeDashoffset:"0px"},circleDeterminate:{transition:e.transitions.create("stroke-dashoffset")},"@keyframes circular-rotate":{"0%":{transformOrigin:"50% 50%"},"100%":{transform:"rotate(360deg)"}},"@keyframes circular-dash":{"0%":{strokeDasharray:"1px, 200px",strokeDashoffset:"0px"},"50%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-15px"},"100%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-125px"}},circleDisableShrink:{animation:"none"}}}),{name:"MuiCircularProgress",flip:!1})(d)}}]);
//# sourceMappingURL=50.4f8fa274.chunk.js.map