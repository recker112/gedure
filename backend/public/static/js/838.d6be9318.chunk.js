"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[838],{50838:function(e,a,r){r.r(a),r.d(a,{PAvatarForm:function(){return x},default:function(){return f}});var t=r(74165),n=r(15861),i=(r(72791),r(16871)),s=r(61889),l=r(20890),o=r(68870),d=r(94721),c=r(93044),u=r(39709),p=r(61134),g=r(16030),v=r(55614),h=r(80184),m={avatar:function(e){return{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText,height:e.spacing(10),width:e.spacing(10)}}};function x(e){var a=e.user,r=e.loadingUpload,t=e.loadingDelete,n=e.progress,i=e.handleSubmit,p=(0,e.register)("avatar"),g=p.onChange,v=p.onBlur,x=p.name,f=p.ref;return(0,h.jsxs)(s.ZP,{container:!0,spacing:2,children:[(0,h.jsxs)(s.ZP,{item:!0,xs:12,children:[(0,h.jsx)(l.Z,{variant:"h6",component:"span",className:"text__bold--semi",children:"Avatar del usuario"}),(0,h.jsx)(o.Z,{mt:1,children:(0,h.jsx)(d.Z,{})})]}),(0,h.jsxs)(s.ZP,{container:!0,alignItems:"center",spacing:2,item:!0,xs:12,children:[(0,h.jsx)(s.ZP,{item:!0,children:(0,h.jsx)(c.Z,{alt:"Avatar User",src:a.avatar,sx:m.avatar,children:a.name.substring(0,1).toUpperCase()})}),(0,h.jsxs)(s.ZP,{item:!0,children:[(0,h.jsx)("input",{id:"update_avatar_user",type:"file",style:{display:"none"},accept:"image/*",disabled:t,onChange:function(e){g(e),i()},onBlur:v,name:x,ref:f}),(0,h.jsx)("label",{htmlFor:"update_avatar_user",children:(0,h.jsx)(u.Z,{variant:"contained",loading:r,disabled:t,loadingIndicator:r&&n<99?"".concat(n,"%"):null,color:"primary",component:"span",disableElevation:!0,children:"Cambiar avatar"})})]}),(0,h.jsx)(s.ZP,{item:!0,children:(0,h.jsx)(u.Z,{variant:"outlined",loading:t,disabled:r,color:"inherit",onClick:function(){g({target:{name:"avatar",value:"delete"}}),i()},children:"Quitar avatar"})})]})]})}function f(){var e=(0,i.UO)().id,a=(0,g.v9)((function(e){return{userSelected:e.requestStatus.userShow.userSelected,loadingUpload:e.requestStatus.personalAvatar.loadingUpload,loadingDelete:e.requestStatus.personalAvatar.loadingDelete,progress:e.requestStatus.personalAvatar.progress}})),r=a.userSelected,s=a.loadingUpload,l=a.loadingDelete,d=a.progress,c=(0,g.I0)(),u=(0,p.cI)(),m=u.handleSubmit,f=u.register,j=u.resetField,Z=function(){var a=(0,n.Z)((0,t.Z)().mark((function a(r){var n;return(0,t.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n=new FormData,"delete"===r.avatar?n.append("delete_avatar",!0):n.append("avatar",r.avatar[0]),n.append("_method","PUT"),a.next=5,c((0,v.n)({data:n,id:e,type:"delete"!==r.avatar?1:2}));case 5:j("avatar");case 6:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}();return(0,h.jsx)(o.Z,{mb:4,children:(0,h.jsx)(x,{user:r,handleSubmit:m(Z),register:f,progress:d,loadingUpload:s,loadingDelete:l})})}}}]);
//# sourceMappingURL=838.d6be9318.chunk.js.map