"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[838],{50838:function(e,t,r){r.r(t),r.d(t,{PAvatarForm:function(){return m},default:function(){return x}});var a=r(74165),i=r(15861),n=(r(72791),r(16871)),o=r(61889),l=r(20890),d=r(68870),c=r(94721),s=r(93044),u=r(39709),h=r(61134),v=r(16030),p=r(55614),g=r(80184),f={avatar:function(e){return{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText,height:e.spacing(10),width:e.spacing(10)}}};function m(e){var t=e.user,r=e.loadingUpload,a=e.loadingDelete,i=e.progress,n=e.handleSubmit,h=(0,e.register)("avatar"),v=h.onChange,p=h.onBlur,m=h.name,x=h.ref;return(0,g.jsxs)(o.ZP,{container:!0,spacing:2,children:[(0,g.jsxs)(o.ZP,{item:!0,xs:12,children:[(0,g.jsx)(l.Z,{variant:"h6",component:"span",className:"text__bold--semi",children:"Avatar del usuario"}),(0,g.jsx)(d.Z,{mt:1,children:(0,g.jsx)(c.Z,{})})]}),(0,g.jsxs)(o.ZP,{container:!0,alignItems:"center",spacing:2,item:!0,xs:12,children:[(0,g.jsx)(o.ZP,{item:!0,children:(0,g.jsx)(s.Z,{alt:"Avatar User",src:t.avatar,sx:f.avatar,children:t.name.substring(0,1).toUpperCase()})}),(0,g.jsxs)(o.ZP,{item:!0,children:[(0,g.jsx)("input",{id:"update_avatar_user",type:"file",style:{display:"none"},accept:"image/*",disabled:a,onChange:function(e){v(e),n()},onBlur:p,name:m,ref:x}),(0,g.jsx)("label",{htmlFor:"update_avatar_user",children:(0,g.jsx)(u.Z,{variant:"contained",loading:r,disabled:a,loadingIndicator:r&&i<99?"".concat(i,"%"):null,color:"primary",component:"span",disableElevation:!0,children:"Cambiar avatar"})})]}),(0,g.jsx)(o.ZP,{item:!0,children:(0,g.jsx)(u.Z,{variant:"outlined",loading:a,disabled:r,color:"inherit",onClick:function(){v({target:{name:"avatar",value:"delete"}}),n()},children:"Quitar avatar"})})]})]})}function x(){var e=(0,n.UO)().id,t=(0,v.v9)((function(e){return{userSelected:e.requestStatus.userShow.userSelected,loadingUpload:e.requestStatus.personalAvatar.loadingUpload,loadingDelete:e.requestStatus.personalAvatar.loadingDelete,progress:e.requestStatus.personalAvatar.progress}})),r=t.userSelected,o=t.loadingUpload,l=t.loadingDelete,c=t.progress,s=(0,v.I0)(),u=(0,h.cI)(),f=u.handleSubmit,x=u.register,b=u.resetField,w=function(){var t=(0,i.Z)((0,a.Z)().mark((function t(r){var i;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=new FormData,"delete"===r.avatar?i.append("delete_avatar",!0):i.append("avatar",r.avatar[0]),i.append("_method","PUT"),t.next=5,s((0,p.n)({data:i,id:e,type:"delete"!==r.avatar?1:2}));case 5:b("avatar");case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return(0,g.jsx)(d.Z,{mb:4,children:(0,g.jsx)(m,{user:r,handleSubmit:f(w),register:x,progress:c,loadingUpload:o,loadingDelete:l})})}},94721:function(e,t,r){var a=r(63366),i=r(87462),n=r(72791),o=r(28182),l=r(94419),d=r(12065),c=r(66934),s=r(31402),u=r(90133),h=r(80184),v=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],p=(0,c.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState;return[t.root,r.absolute&&t.absolute,t[r.variant],r.light&&t.light,"vertical"===r.orientation&&t.vertical,r.flexItem&&t.flexItem,r.children&&t.withChildren,r.children&&"vertical"===r.orientation&&t.withChildrenVertical,"right"===r.textAlign&&"vertical"!==r.orientation&&t.textAlignRight,"left"===r.textAlign&&"vertical"!==r.orientation&&t.textAlignLeft]}})((function(e){var t=e.theme,r=e.ownerState;return(0,i.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},r.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},r.light&&{borderColor:t.vars?"rgba(".concat(t.vars.palette.dividerChannel," / 0.08)"):(0,d.Fq)(t.palette.divider,.08)},"inset"===r.variant&&{marginLeft:72},"middle"===r.variant&&"horizontal"===r.orientation&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},"middle"===r.variant&&"vertical"===r.orientation&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},"vertical"===r.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},r.flexItem&&{alignSelf:"stretch",height:"auto"})}),(function(e){var t=e.theme,r=e.ownerState;return(0,i.Z)({},r.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{position:"relative",width:"100%",borderTop:"thin solid ".concat((t.vars||t).palette.divider),top:"50%",content:'""',transform:"translateY(50%)"}})}),(function(e){var t=e.theme,r=e.ownerState;return(0,i.Z)({},r.children&&"vertical"===r.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",top:"0%",left:"50%",borderTop:0,borderLeft:"thin solid ".concat((t.vars||t).palette.divider),transform:"translateX(0%)"}})}),(function(e){var t=e.ownerState;return(0,i.Z)({},"right"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})})),g=(0,c.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:function(e,t){var r=e.ownerState;return[t.wrapper,"vertical"===r.orientation&&t.wrapperVertical]}})((function(e){var t=e.theme,r=e.ownerState;return(0,i.Z)({display:"inline-block",paddingLeft:"calc(".concat(t.spacing(1)," * 1.2)"),paddingRight:"calc(".concat(t.spacing(1)," * 1.2)")},"vertical"===r.orientation&&{paddingTop:"calc(".concat(t.spacing(1)," * 1.2)"),paddingBottom:"calc(".concat(t.spacing(1)," * 1.2)")})})),f=n.forwardRef((function(e,t){var r=(0,s.Z)({props:e,name:"MuiDivider"}),n=r.absolute,d=void 0!==n&&n,c=r.children,f=r.className,m=r.component,x=void 0===m?c?"div":"hr":m,b=r.flexItem,w=void 0!==b&&b,Z=r.light,S=void 0!==Z&&Z,A=r.orientation,j=void 0===A?"horizontal":A,C=r.role,I=void 0===C?"hr"!==x?"separator":void 0:C,D=r.textAlign,_=void 0===D?"center":D,y=r.variant,P=void 0===y?"fullWidth":y,R=(0,a.Z)(r,v),k=(0,i.Z)({},r,{absolute:d,component:x,flexItem:w,light:S,orientation:j,role:I,textAlign:_,variant:P}),U=function(e){var t=e.absolute,r=e.children,a=e.classes,i=e.flexItem,n=e.light,o=e.orientation,d=e.textAlign,c={root:["root",t&&"absolute",e.variant,n&&"light","vertical"===o&&"vertical",i&&"flexItem",r&&"withChildren",r&&"vertical"===o&&"withChildrenVertical","right"===d&&"vertical"!==o&&"textAlignRight","left"===d&&"vertical"!==o&&"textAlignLeft"],wrapper:["wrapper","vertical"===o&&"wrapperVertical"]};return(0,l.Z)(c,u.V,a)}(k);return(0,h.jsx)(p,(0,i.Z)({as:x,className:(0,o.Z)(U.root,f),role:I,ref:t,ownerState:k},R,{children:c?(0,h.jsx)(g,{className:U.wrapper,ownerState:k,children:c}):null}))}));t.Z=f},90133:function(e,t,r){r.d(t,{V:function(){return i}});var a=r(21217);function i(e){return(0,a.Z)("MuiDivider",e)}var n=(0,r(75878).Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);t.Z=n}}]);
//# sourceMappingURL=838.8673ea1d.chunk.js.map