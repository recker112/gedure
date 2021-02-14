(this.webpackJsonpGedure=this.webpackJsonpGedure||[]).push([[61],{6119:function(e,a,t){"use strict";var r=t(0),n=t.n(r),o=t(6215),i=t(6193),c=t(57),l=t(6040),s=t(6038),u=t(108),d=Object(u.a)((function(e){return{progressLabel:{marginTop:5}}}));a.a=function(e){var a=e.loading,t=e.backDrop,r=void 0!==t&&t,u=e.children,m=function(e){var a=e.color,t=void 0===a?"primary":a,r=e.progressLabel,s=e.progressLoading,u=e.progress,m=d();return s&&u<=99?n.a.createElement(o.a,null,n.a.createElement(o.a,{position:"relative",display:"inline-flex"},n.a.createElement(i.a,{color:t,variant:"static",value:u}),n.a.createElement(o.a,{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},n.a.createElement(c.a,{variant:"caption",component:"div",color:"textSecondary"},u,"%"))),r&&n.a.createElement(l.a,{container:!0,justify:"center"},n.a.createElement("span",{className:m.progressLabel},r))):n.a.createElement(i.a,{color:t})};return a&&!r?n.a.createElement(m,e):a&&r?n.a.createElement(s.a,{open:!0,style:{zIndex:200}},n.a.createElement(m,e)):u}},6123:function(e,a,t){"use strict";a.a=function(e){return{type:"UPDATE_DATA_USER",payload:e}}},6169:function(e,a,t){"use strict";var r=t(1),n=t(2),o=t(0),i=(t(3),t(4)),c=t(5),l=t(22),s=o.forwardRef((function(e,a){var t=e.absolute,c=void 0!==t&&t,l=e.classes,s=e.className,u=e.component,d=void 0===u?"hr":u,m=e.flexItem,p=void 0!==m&&m,v=e.light,f=void 0!==v&&v,g=e.orientation,b=void 0===g?"horizontal":g,h=e.role,E=void 0===h?"hr"!==d?"separator":void 0:h,j=e.variant,O=void 0===j?"fullWidth":j,y=Object(n.a)(e,["absolute","classes","className","component","flexItem","light","orientation","role","variant"]);return o.createElement(d,Object(r.a)({className:Object(i.a)(l.root,s,"fullWidth"!==O&&l[O],c&&l.absolute,p&&l.flexItem,f&&l.light,"vertical"===b&&l.vertical),role:E,ref:a},y))}));a.a=Object(c.a)((function(e){return{root:{height:1,margin:0,border:"none",flexShrink:0,backgroundColor:e.palette.divider},absolute:{position:"absolute",bottom:0,left:0,width:"100%"},inset:{marginLeft:72},light:{backgroundColor:Object(l.d)(e.palette.divider,.08)},middle:{marginLeft:e.spacing(2),marginRight:e.spacing(2)},vertical:{height:"100%",width:1},flexItem:{alignSelf:"stretch",height:"auto"}}}),{name:"MuiDivider"})(s)},6780:function(e,a,t){"use strict";t.r(a),t.d(a,"PerfilAvatarForm",(function(){return x})),t.d(a,"default",(function(){return A}));var r=t(41),n=t(46),o=t.n(n),i=t(63),c=t(34),l=t(0),s=t.n(l),u=t(6040),d=t(57),m=t(6215),p=t(6169),v=t(6102),f=t(6354),g=t(108),b=t(98),h=t(6119),E=t(13),j=t(6120),O=t(6123),y=Object(g.a)((function(e){return{avatar:{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText,height:e.spacing(10),width:e.spacing(10)}}}));function x(e){var a=e.user,t=e.loading,r=e.progress,n=e.handleChange,o=y();return s.a.createElement(u.a,{container:!0,spacing:2},s.a.createElement(u.a,{item:!0,xs:12},s.a.createElement(d.a,{variant:"h6",component:"span",className:"text__bold--semi"},"Avatar del usuario"),s.a.createElement(m.a,{mt:1},s.a.createElement(p.a,null))),s.a.createElement(u.a,{container:!0,alignItems:"center",spacing:2,item:!0,xs:12},s.a.createElement(u.a,{item:!0},s.a.createElement(v.a,{alt:"Avatar User",src:a.avatar,className:o.avatar},a.name.substring(0,1).toUpperCase())),s.a.createElement(u.a,{item:!0},s.a.createElement("input",{id:"update_avatar_user",type:"file",style:{display:"none"},accept:"image/*",name:"avatar",onChange:n,value:""}),s.a.createElement("label",{htmlFor:"update_avatar_user"},s.a.createElement(h.a,{loading:t,progressLoading:!0,progress:r},s.a.createElement(f.a,{variant:"contained",color:"primary",component:"span",disableElevation:!0},"Cambiar avatar")))),s.a.createElement(u.a,{item:!0},s.a.createElement(f.a,{onClick:function(){return n({target:{name:"avatar",files:["delete"]}})},variant:"outlined",disabled:t},"Quitar avatar"))))}function A(e){var a=e.id,t=Object(l.useState)(0),n=Object(c.a)(t,2),u=n[0],d=n[1],p=Object(E.d)((function(e){return{user:e.forms.showUser.data.user,loading:e.forms.updateAvatar.loading,data:e.forms.updateAvatar.data,userData:e.userData.user}})),v=p.user,f=p.loading,g=p.data,h=p.userData,y=Object(E.c)(),A=Object(b.a)().fetchData,C=Object(l.useCallback)((function(e){var a=Math.round(100*e.loaded/e.total);d(a)}),[]);Object(l.useEffect)((function(){var e=function(){var e=Object(i.a)(o.a.mark((function e(){var t,r,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return y(Object(j.a)("updateAvatar",!0)),t=new FormData,"delete"===g.avatar?t.append("delete_avatar",!0):t.append("avatar",g.avatar),t.append("_method","PUT"),r={url:"v1/user/".concat(a),type:"post",data:t,otherData:{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:C},successText:"Avatar actualizado"},e.next=7,A(r);case 7:(n=e.sent)&&(y(Object(j.a)("showUser",!1,n)),n.user.id===h.id&&y(Object(O.a)({user:n.user}))),y(Object(j.a)("updateAvatar",!1,{})),d(0);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();g.avatar&&e()}),[g.avatar]);return s.a.createElement(m.a,{mb:4},s.a.createElement(x,{user:v,handleChange:function(e){y(Object(j.a)("updateAvatar",!1,Object(r.a)({},e.target.name,e.target.files[0])))},progress:u,loading:f}))}}}]);
//# sourceMappingURL=61.5fd80735.chunk.js.map