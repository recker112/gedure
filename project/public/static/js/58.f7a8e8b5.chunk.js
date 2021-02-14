(this.webpackJsonpGedure=this.webpackJsonpGedure||[]).push([[58],{6119:function(e,a,t){"use strict";var r=t(0),n=t.n(r),o=t(6215),i=t(6193),l=t(57),s=t(6040),c=t(6038),u=t(108),m=Object(u.a)((function(e){return{progressLabel:{marginTop:5}}}));a.a=function(e){var a=e.loading,t=e.backDrop,r=void 0!==t&&t,u=e.children,d=function(e){var a=e.color,t=void 0===a?"primary":a,r=e.progressLabel,c=e.progressLoading,u=e.progress,d=m();return c&&u<=99?n.a.createElement(o.a,null,n.a.createElement(o.a,{position:"relative",display:"inline-flex"},n.a.createElement(i.a,{color:t,variant:"static",value:u}),n.a.createElement(o.a,{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},n.a.createElement(l.a,{variant:"caption",component:"div",color:"textSecondary"},u,"%"))),r&&n.a.createElement(s.a,{container:!0,justify:"center"},n.a.createElement("span",{className:d.progressLabel},r))):n.a.createElement(i.a,{color:t})};return a&&!r?n.a.createElement(d,e):a&&r?n.a.createElement(c.a,{open:!0,style:{zIndex:200}},n.a.createElement(d,e)):u}},6123:function(e,a,t){"use strict";a.a=function(e){return{type:"UPDATE_DATA_USER",payload:e}}},6169:function(e,a,t){"use strict";var r=t(1),n=t(2),o=t(0),i=(t(3),t(4)),l=t(5),s=t(22),c=o.forwardRef((function(e,a){var t=e.absolute,l=void 0!==t&&t,s=e.classes,c=e.className,u=e.component,m=void 0===u?"hr":u,d=e.flexItem,p=void 0!==d&&d,v=e.light,f=void 0!==v&&v,g=e.orientation,b=void 0===g?"horizontal":g,h=e.role,E=void 0===h?"hr"!==m?"separator":void 0:h,x=e.variant,j=void 0===x?"fullWidth":x,O=Object(n.a)(e,["absolute","classes","className","component","flexItem","light","orientation","role","variant"]);return o.createElement(m,Object(r.a)({className:Object(i.a)(s.root,c,"fullWidth"!==j&&s[j],l&&s.absolute,p&&s.flexItem,f&&s.light,"vertical"===b&&s.vertical),role:E,ref:a},O))}));a.a=Object(l.a)((function(e){return{root:{height:1,margin:0,border:"none",flexShrink:0,backgroundColor:e.palette.divider},absolute:{position:"absolute",bottom:0,left:0,width:"100%"},inset:{marginLeft:72},light:{backgroundColor:Object(s.d)(e.palette.divider,.08)},middle:{marginLeft:e.spacing(2),marginRight:e.spacing(2)},vertical:{height:"100%",width:1},flexItem:{alignSelf:"stretch",height:"auto"}}}),{name:"MuiDivider"})(c)},7081:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return x}));var r=t(46),n=t.n(r),o=t(63),i=t(0),l=t.n(i),s=t(6215),c=t(6040),u=t(57),m=t(6169),d=t(6355),p=t(6354),v=t(6117),f=t(98),g=t(6119),b=t(13),h=t(6120),E=t(6123);function x(){var e,a,t=Object(b.d)((function(e){return{loading:e.forms.updatePerfil.loading,user:e.userData.user}})),r=t.loading,i=t.user,x=Object(b.c)(),j=Object(v.c)({mode:"onTouched"}),O=j.register,y=j.handleSubmit,D=j.errors,k=j.setError,q=Object(f.a)(k).fetchData,A=function(){var e=Object(o.a)(n.a.mark((function e(a){var t,r,o;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x(Object(h.a)("updatePerfil",!0)),t={},a.email!==i.email&&(t.email=a.email),a.name&&(t.name=a.name),t._method="PUT",r={url:"v1/user",type:"post",data:t,successText:"Datos actualizados"},e.next=8,q(r);case 8:(o=e.sent)&&x(Object(E.a)({user:o.user})),x(Object(h.a)("updatePerfil",!1));case 11:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return l.a.createElement(s.a,null,l.a.createElement(c.a,{container:!0,spacing:2},l.a.createElement(c.a,{item:!0,xs:12},l.a.createElement(u.a,{variant:"h6",component:"span",className:"text__bold--semi"},"Perfil del usuario"),l.a.createElement(s.a,{mt:1},l.a.createElement(m.a,null))),"V-"!==i.privilegio&&l.a.createElement(c.a,{item:!0,xs:12},l.a.createElement(d.a,{inputRef:O({required:{value:!0,message:"* Campo requerido"},minLength:{value:3,message:"Error: Demaciado corto"},maxLength:{value:90,message:"Error: Demaciado largo"}}),name:"name",error:Boolean(null===D||void 0===D?void 0:D.name),helperText:(null===D||void 0===D||null===(e=D.name)||void 0===e?void 0:e.message)?D.name.message:"El nombre puede ser visto por otros usuarios, tenga discreci\xf3n con lo que coloque aqu\xed",label:"Nombre de la cuenta",defaultValue:i.name,variant:"outlined",size:"small",disabled:r,fullWidth:!0})),l.a.createElement(c.a,{item:!0,xs:12},l.a.createElement(d.a,{inputRef:O({required:{value:!0,message:"* Campo requerido"},pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Error: Correo no v\xe1lido"}}),name:"email",error:Boolean(null===D||void 0===D?void 0:D.email),helperText:(null===D||void 0===D||null===(a=D.email)||void 0===a?void 0:a.message)?D.email.message:"Este correo ser\xe1 usado en distintas partes de la App, coloqu\xe9 un correo al cual tenga acceso",label:"Correo elect\xf3nico",defaultValue:i.email,variant:"outlined",size:"small",disabled:r,fullWidth:!0})),l.a.createElement(c.a,{container:!0,justify:"flex-end",item:!0,xs:12},l.a.createElement(g.a,{loading:r},l.a.createElement(p.a,{onClick:y(A),variant:"contained",color:"primary",disableElevation:!0},"Actualizar")))))}}}]);
//# sourceMappingURL=58.f7a8e8b5.chunk.js.map