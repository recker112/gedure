"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[1373,5682],{12866:function(e,n){n.Z=function(e){for(var n="ABCDEFGHIJKMNPQRSTUVWXYZ123456789",r="",t=0,a=n.length;t<e;++t)r+=n.charAt(Math.floor(Math.random()*a));return r}},19840:function(e,n,r){r.d(n,{c:function(){return d}});var t=r(1413),a=r(45987),o=r(48550),l=r(61134),i=r(80184),u=["name","control","rules","defaultValue","helperText"],s=["ref"];function d(e){var n=e.name,r=e.control,d=e.rules,c=void 0===d?null:d,f=e.defaultValue,p=void 0===f?"":f,m=e.helperText,h=void 0===m?"":m,v=(0,a.Z)(e,u),Z=(0,l.bc)({name:n,control:r,rules:c,defaultValue:p}),x=Z.field,g=x.ref,T=(0,a.Z)(x,s),b=Z.fieldState,j=b.invalid,V=b.error;return(0,i.jsx)(o.Z,(0,t.Z)((0,t.Z)((0,t.Z)({inputRef:g},T),v),{},{error:j,helperText:V?V.message:h}))}},18493:function(e,n,r){r.d(n,{Q:function(){return v}});var t=r(1413),a=r(29439),o=r(45987),l=r(72791),i=r(48550),u=r(63466),s=r(13400),d=r(3746),c=r(20165),f=r(61134),p=r(80184),m=["name","control","rules","defaultValue","helperText"],h=["ref"];function v(e){var n=e.name,r=e.control,v=e.rules,Z=void 0===v?null:v,x=e.defaultValue,g=void 0===x?"":x,T=e.helperText,b=void 0===T?"":T,j=(0,o.Z)(e,m),V=(0,l.useState)(!1),C=(0,a.Z)(V,2),P=C[0],q=C[1],O=(0,f.bc)({name:n,control:r,rules:Z,defaultValue:g}),S=O.field,E=S.ref,w=(0,o.Z)(S,h),_=O.fieldState,I=_.invalid,k=_.error;return(0,p.jsx)(i.Z,(0,t.Z)((0,t.Z)((0,t.Z)({inputRef:E},w),j),{},{error:I,helperText:k?k.message:b,type:P?"text":"password",InputProps:{endAdornment:(0,p.jsx)(u.Z,{position:"end",children:(0,p.jsx)(s.Z,{onClick:function(){q(!P)},size:null===j||void 0===j?void 0:j.size,children:P?(0,p.jsx)(c.Z,{}):(0,p.jsx)(d.Z,{})})})}}))}},99507:function(e,n,r){r.d(n,{yh:function(){return P},mX:function(){return x},cl:function(){return t.c},gT:function(){return f},Q:function(){return p.Q}});var t=r(19840),a=r(1413),o=r(45987),l=r(48550),i=r(61134),u=r(30948),s=r(80184),d=["name","control","rules","defaultValue","helperText"],c=["ref","onChange","value"];function f(e){var n=e.name,r=e.control,t=e.rules,f=void 0===t?null:t,p=e.defaultValue,m=void 0===p?"":p,h=e.helperText,v=void 0===h?"":h,Z=(0,o.Z)(e,d),x=(0,i.bc)({name:n,control:r,rules:f,defaultValue:m}),g=x.field,T=(g.ref,g.onChange),b=g.value,j=(0,o.Z)(g,c),V=x.fieldState,C=V.invalid,P=V.error;return(0,s.jsx)(u.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},Z),j),{},{value:Number(b)||"",customInput:l.Z,error:C,onValueChange:function(e){T((null===e||void 0===e?void 0:e.value)||"")},helperText:P?P.message:v,mask:"_"}))}var p=r(18493),m=r(92343),h=r(72791),v=["multiple","options","name","control","defaultValue","rules","isOptionEqualToValue","getOptionLabel","helperText","disabled"],Z=["ref","onChange"];function x(e){var n=e.multiple,r=e.options,t=e.name,u=e.control,d=e.defaultValue,c=e.rules,f=void 0===c?{required:"* Campo requerido"}:c,p=e.isOptionEqualToValue,h=e.getOptionLabel,x=e.helperText,g=e.disabled,T=(0,o.Z)(e,v),b=(0,i.bc)({name:t,control:u,rules:f,defaultValue:d}),j=b.field,V=j.ref,C=j.onChange,P=(0,o.Z)(j,Z),q=b.fieldState,O=q.invalid,S=q.error;return(0,s.jsx)(m.Z,(0,a.Z)((0,a.Z)({},P),{},{onChange:function(e,n){C(n)},multiple:n,options:r,noOptionsText:"No hay resultados",getOptionLabel:h,isOptionEqualToValue:p,disabled:g,renderInput:function(e){return(0,s.jsx)(l.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},e),T),{},{inputRef:V,error:O,helperText:S?S.message:x}))}}))}var g=r(74165),T=r(15861),b=r(29439),j=r(13239);var V=["name","control","rules","data","defaultValue","helperText","getOptionLabel","isOptionEqualToValue","multiple","handleRequest","disabled","renderOption","renderTags","limitTags"],C=["ref","onChange"];function P(e){var n=e.name,r=e.control,t=e.rules,u=void 0===t?null:t,d=e.data,c=void 0===d?[]:d,f=e.defaultValue,p=void 0===f?"":f,v=e.helperText,Z=void 0===v?"":v,x=e.getOptionLabel,P=e.isOptionEqualToValue,q=e.multiple,O=e.handleRequest,S=e.disabled,E=e.renderOption,w=e.renderTags,_=e.limitTags,I=(0,o.Z)(e,V),k=(0,h.useState)(!1),y=(0,b.Z)(k,2),L=y[0],N=y[1],R=(0,h.useState)([]),A=(0,b.Z)(R,2),z=A[0],Q=A[1],D=(0,h.useState)(""),U=(0,b.Z)(D,2),F=U[0],M=U[1],W=(0,h.useState)(!0),B=(0,b.Z)(W,2),G=B[0],X=B[1],H=G&&L&&0===z.length,J=(0,i.bc)({name:n,control:r,rules:u,defaultValue:p}),K=J.field,Y=K.ref,$=K.onChange,ee=(0,o.Z)(K,C),ne=J.fieldState.error;(0,h.useEffect)((function(){var e=!0,n=function(){var e=(0,T.Z)((0,g.Z)().mark((function e(){return(0,g.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O(F);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(H)return e&&n(),function(){e=!1}}),[H]),(0,h.useEffect)((function(){L||(Q([]),X(!0))}),[L]),(0,h.useEffect)((function(){null!==c&&(Q(c),X(!1))}),[c]);var re=(0,h.useCallback)(function(e,n){var r;return function(){for(var t=arguments.length,a=new Array(t),o=0;o<t;o++)a[o]=arguments[o];clearTimeout(r),r=setTimeout((function(){return e.apply(void 0,a)}),n)}}((function(){Q([]),X(!0)}),500),[]);return(0,s.jsx)(m.Z,{multiple:q,id:"autocomplete-".concat(n),options:z,open:L,onOpen:function(){N(!0),X(!0)},onClose:function(){N(!1)},onChange:function(e,n){$(n)},inputValue:F,onInputChange:function(e,n){M(n),"change"===(null===e||void 0===e?void 0:e.type)&&re()},getOptionLabel:x,isOptionEqualToValue:P,loading:H,loadingText:"Cargando...",noOptionsText:"No hay resultados",renderTags:w,disabled:S,renderOption:E,limitTags:_,renderInput:function(e){return(0,s.jsx)(l.Z,(0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)({},e),ee),I),{},{inputRef:Y,error:Boolean(ne),helperText:ne?ne.message:Z,InputProps:(0,a.Z)((0,a.Z)({},e.InputProps),{},{endAdornment:(0,s.jsxs)(h.Fragment,{children:[H?(0,s.jsx)(j.Z,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})})}))}})}},41373:function(e,n,r){r.r(n),r.d(n,{default:function(){return s}});r(72791);var t=r(61134),a=r(25682),o=r(16030),l=r(84955),i=r(5016),u=r(80184);function s(){var e=(0,o.v9)((function(e){return e.requestStatus.personalData.loadingPP})),n=(0,o.I0)(),r=(0,t.cI)(),s=r.handleSubmit,d=r.control,c=r.setValue,f=function(e){var r=e.user;n((0,i.Al)({user:r}))};return(0,u.jsx)(a.PPasswordForm,{control:d,handleSubmit:s((function(e){e._method="PUT",n((0,l.V)({submitData:e,loading:"loadingPP",personal:!0,handleUpdate:f}))})),loading:e,setValue:c,helperText:"* Campo requerido"})}},25682:function(e,n,r){r.r(n),r.d(n,{PPasswordForm:function(){return g},default:function(){return T}});var t=r(29439),a=r(72791),o=r(16871),l=r(61889),i=r(20890),u=r(68870),s=r(94721),d=r(85523),c=r(9955),f=r(39709),p=r(61134),m=r(99507),h=r(12866),v=r(16030),Z=r(84955),x=r(80184);function g(e){var n=e.control,r=e.handleSubmit,o=e.setValue,v=e.loading,Z=e.helperText,g=(0,a.useState)(!1),T=(0,t.Z)(g,2),b=T[0],j=T[1],V=(0,p.qo)({name:"password",control:n});return(0,x.jsxs)(l.ZP,{container:!0,spacing:2,children:[(0,x.jsxs)(l.ZP,{item:!0,xs:12,children:[(0,x.jsx)(i.Z,{variant:"h6",component:"span",className:"text__bold--semi",children:"Cambiar contrase\xf1a"}),(0,x.jsx)(u.Z,{mt:1,children:(0,x.jsx)(s.Z,{})})]}),(0,x.jsx)(l.ZP,{item:!0,xs:12,children:(0,x.jsx)(m.Q,{control:n,rules:{required:"* Campo requerido",minLength:{value:4,message:"Error: No v\xe1lido"},maxLength:{value:25,message:"Error: No v\xe1lida"}},name:"password",label:"Contrase\xf1a",helperText:Z,size:"small",fullWidth:!0,disabled:v})}),(0,x.jsx)(l.ZP,{item:!0,xs:12,children:(0,x.jsx)(m.Q,{control:n,rules:{required:"* Campo requerido",minLength:{value:4,message:"Error: No v\xe1lido"},maxLength:{value:25,message:"Error: No v\xe1lida"},validate:function(e){return e===V||"Error: La contrase\xf1a no coincide"}},name:"repeat_password",label:"Repetir contrase\xf1a",helperText:"* Campo requerido",size:"small",fullWidth:!0,disabled:v})}),(0,x.jsx)(l.ZP,{item:!0,xs:12,children:(0,x.jsx)(d.Z,{control:(0,x.jsx)(c.Z,{value:b,onChange:function(e){if(e.target.checked){var n=(0,h.Z)(4);o("password",n),o("repeat_password",n),j(e.target.checked)}else o("password",""),o("repeat_password",""),j(e.target.checked)},disabled:v,color:"primary"}),label:"Generar contrase\xf1a"})}),b&&(0,x.jsx)(l.ZP,{item:!0,xs:12,children:(0,x.jsxs)(i.Z,{className:"text__opacity--semi",children:["Contrase\xf1a generada: ",V]})}),(0,x.jsx)(l.ZP,{container:!0,justifyContent:"flex-end",item:!0,xs:12,children:(0,x.jsx)(f.Z,{variant:"contained",loading:v,disableElevation:!0,onClick:r,children:"Cambiar contrase\xf1a"})})]})}function T(){var e=(0,o.UO)().id,n=(0,v.v9)((function(e){return e.requestStatus.personalData.loadingPP})),r=(0,v.I0)(),t=(0,p.cI)(),a=t.handleSubmit,l=t.control,i=t.setValue;return(0,x.jsx)(g,{control:l,handleSubmit:a((function(n){n._method="PUT",r((0,Z.V)({submitData:n,id:e,loading:"loadingPP"}))})),loading:n,setValue:i,helperText:"Tenga en cuenta que una vez cambiada la contrase\xf1a el usuario ya no podr\xe1 acceder con su contrase\xf1a antig\xfca, asegurese de informar al usuario de este cambio"})}}}]);
//# sourceMappingURL=1373.efb933b4.chunk.js.map