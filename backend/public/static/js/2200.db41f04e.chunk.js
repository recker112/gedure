"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[2200],{19840:function(e,n,r){r.d(n,{c:function(){return d}});var t=r(1413),a=r(45987),l=r(48550),o=r(61134),i=r(80184),u=["name","control","rules","defaultValue","helperText"],s=["ref"];function d(e){var n=e.name,r=e.control,d=e.rules,c=void 0===d?null:d,f=e.defaultValue,m=void 0===f?"":f,p=e.helperText,h=void 0===p?"":p,v=(0,a.Z)(e,u),Z=(0,o.bc)({name:n,control:r,rules:c,defaultValue:m}),x=Z.field,g=x.ref,T=(0,a.Z)(x,s),b=Z.fieldState,j=b.invalid,V=b.error;return(0,i.jsx)(l.Z,(0,t.Z)((0,t.Z)((0,t.Z)({inputRef:g},T),v),{},{error:j,helperText:V?V.message:h}))}},18493:function(e,n,r){r.d(n,{Q:function(){return v}});var t=r(1413),a=r(29439),l=r(45987),o=r(72791),i=r(48550),u=r(63466),s=r(13400),d=r(3746),c=r(20165),f=r(61134),m=r(80184),p=["name","control","rules","defaultValue","helperText"],h=["ref"];function v(e){var n=e.name,r=e.control,v=e.rules,Z=void 0===v?null:v,x=e.defaultValue,g=void 0===x?"":x,T=e.helperText,b=void 0===T?"":T,j=(0,l.Z)(e,p),V=(0,o.useState)(!1),C=(0,a.Z)(V,2),q=C[0],E=C[1],O=(0,f.bc)({name:n,control:r,rules:Z,defaultValue:g}),S=O.field,P=S.ref,I=(0,l.Z)(S,h),L=O.fieldState,k=L.invalid,y=L.error;return(0,m.jsx)(i.Z,(0,t.Z)((0,t.Z)((0,t.Z)({inputRef:P},I),j),{},{error:k,helperText:y?y.message:b,type:q?"text":"password",InputProps:{endAdornment:(0,m.jsx)(u.Z,{position:"end",children:(0,m.jsx)(s.Z,{onClick:function(){E(!q)},size:null===j||void 0===j?void 0:j.size,children:q?(0,m.jsx)(c.Z,{}):(0,m.jsx)(d.Z,{})})})}}))}},99507:function(e,n,r){r.d(n,{yh:function(){return q},mX:function(){return x},cl:function(){return t.c},gT:function(){return f},Q:function(){return m.Q}});var t=r(19840),a=r(1413),l=r(45987),o=r(48550),i=r(61134),u=r(30948),s=r(80184),d=["name","control","rules","defaultValue","helperText"],c=["ref","onChange","value"];function f(e){var n=e.name,r=e.control,t=e.rules,f=void 0===t?null:t,m=e.defaultValue,p=void 0===m?"":m,h=e.helperText,v=void 0===h?"":h,Z=(0,l.Z)(e,d),x=(0,i.bc)({name:n,control:r,rules:f,defaultValue:p}),g=x.field,T=(g.ref,g.onChange),b=g.value,j=(0,l.Z)(g,c),V=x.fieldState,C=V.invalid,q=V.error;return(0,s.jsx)(u.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},Z),j),{},{value:Number(b)||"",customInput:o.Z,error:C,onValueChange:function(e){T((null===e||void 0===e?void 0:e.value)||"")},helperText:q?q.message:v,mask:"_"}))}var m=r(18493),p=r(92343),h=r(72791),v=["multiple","options","name","control","defaultValue","rules","isOptionEqualToValue","getOptionLabel","helperText","disabled"],Z=["ref","onChange"];function x(e){var n=e.multiple,r=e.options,t=e.name,u=e.control,d=e.defaultValue,c=e.rules,f=void 0===c?{required:"* Campo requerido"}:c,m=e.isOptionEqualToValue,h=e.getOptionLabel,x=e.helperText,g=e.disabled,T=(0,l.Z)(e,v),b=(0,i.bc)({name:t,control:u,rules:f,defaultValue:d}),j=b.field,V=j.ref,C=j.onChange,q=(0,l.Z)(j,Z),E=b.fieldState,O=E.invalid,S=E.error;return(0,s.jsx)(p.Z,(0,a.Z)((0,a.Z)({},q),{},{onChange:function(e,n){C(n)},multiple:n,options:r,noOptionsText:"No hay resultados",getOptionLabel:h,isOptionEqualToValue:m,disabled:g,renderInput:function(e){return(0,s.jsx)(o.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},e),T),{},{inputRef:V,error:O,helperText:S?S.message:x}))}}))}var g=r(74165),T=r(15861),b=r(29439),j=r(13239);var V=["name","control","rules","data","defaultValue","helperText","getOptionLabel","isOptionEqualToValue","multiple","handleRequest","disabled","renderOption","renderTags","limitTags"],C=["ref","onChange"];function q(e){var n=e.name,r=e.control,t=e.rules,u=void 0===t?null:t,d=e.data,c=void 0===d?[]:d,f=e.defaultValue,m=void 0===f?"":f,v=e.helperText,Z=void 0===v?"":v,x=e.getOptionLabel,q=e.isOptionEqualToValue,E=e.multiple,O=e.handleRequest,S=e.disabled,P=e.renderOption,I=e.renderTags,L=e.limitTags,k=(0,l.Z)(e,V),y=(0,h.useState)(!1),D=(0,b.Z)(y,2),_=D[0],A=D[1],w=(0,h.useState)([]),z=(0,b.Z)(w,2),R=z[0],N=z[1],F=(0,h.useState)(""),Q=(0,b.Z)(F,2),U=Q[0],W=Q[1],B=(0,h.useState)(!0),X=(0,b.Z)(B,2),$=X[0],G=X[1],H=$&&_&&0===R.length,J=(0,i.bc)({name:n,control:r,rules:u,defaultValue:m}),K=J.field,M=K.ref,Y=K.onChange,ee=(0,l.Z)(K,C),ne=J.fieldState.error;(0,h.useEffect)((function(){var e=!0,n=function(){var e=(0,T.Z)((0,g.Z)().mark((function e(){return(0,g.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O(U);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(H)return e&&n(),function(){e=!1}}),[H]),(0,h.useEffect)((function(){_||(N([]),G(!0))}),[_]),(0,h.useEffect)((function(){null!==c&&(N(c),G(!1))}),[c]);var re=(0,h.useCallback)(function(e,n){var r;return function(){for(var t=arguments.length,a=new Array(t),l=0;l<t;l++)a[l]=arguments[l];clearTimeout(r),r=setTimeout((function(){return e.apply(void 0,a)}),n)}}((function(){N([]),G(!0)}),500),[]);return(0,s.jsx)(p.Z,{multiple:E,id:"autocomplete-".concat(n),options:R,open:_,onOpen:function(){A(!0),G(!0)},onClose:function(){A(!1)},onChange:function(e,n){Y(n)},inputValue:U,onInputChange:function(e,n){W(n),"change"===(null===e||void 0===e?void 0:e.type)&&re()},getOptionLabel:x,isOptionEqualToValue:q,loading:H,loadingText:"Cargando...",noOptionsText:"No hay resultados",renderTags:I,disabled:S,renderOption:P,limitTags:L,renderInput:function(e){return(0,s.jsx)(o.Z,(0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)({},e),ee),k),{},{inputRef:M,error:Boolean(ne),helperText:ne?ne.message:Z,InputProps:(0,a.Z)((0,a.Z)({},e.InputProps),{},{endAdornment:(0,s.jsxs)(h.Fragment,{children:[H?(0,s.jsx)(j.Z,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})})}))}})}},32200:function(e,n,r){r.r(n),r.d(n,{PDatosForm:function(){return p},default:function(){return h}});r(72791);var t=r(16871),a=r(61889),l=r(20890),o=r(68870),i=r(94721),u=r(39709),s=r(61134),d=r(99507),c=r(16030),f=r(84955),m=r(80184);function p(e){var n=e.control,r=e.loading,t=e.handleSubmit,s=e.userField,c=void 0===s||s,f=e.nameField,p=void 0===f||f,h=e.user,v=void 0===h?{}:h;return(0,m.jsxs)(a.ZP,{container:!0,spacing:2,children:[(0,m.jsxs)(a.ZP,{item:!0,xs:12,children:[(0,m.jsx)(l.Z,{variant:"h6",component:"span",className:"text__bold--semi",children:"Perfil del usuario"}),(0,m.jsx)(o.Z,{mt:1,children:(0,m.jsx)(i.Z,{})})]}),c&&(0,m.jsx)(a.ZP,{item:!0,xs:12,children:(0,m.jsx)(d.cl,{control:n,rules:{required:"* Campo requerido",minLength:{value:3,message:"Error: Demaciado corto"},maxLength:{value:30,message:"Error: Demaciado largo"}},name:"username",label:"Usuario o c\xe9dula",helperText:"El usuario identificar\xe1 a esta cuenta dentro del sistema",defaultValue:v.username,variant:"outlined",size:"small",fullWidth:!0,disabled:r})}),p&&(0,m.jsx)(a.ZP,{item:!0,xs:12,children:(0,m.jsx)(d.cl,{control:n,rules:{required:"* Campo requerido",minLength:{value:3,message:"Error: Demaciado corto"},maxLength:{value:90,message:"Error: Demaciado largo"}},name:"name",label:"Nombre de la cuenta",helperText:"El nombre puede ser visto por otros usuarios, tenga discreci\xf3n con lo que coloque aqu\xed",defaultValue:v.name,variant:"outlined",size:"small",fullWidth:!0,disabled:r})}),(0,m.jsx)(a.ZP,{item:!0,xs:12,children:(0,m.jsx)(d.cl,{control:n,rules:{required:"* Campo requerido",pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Error: Correo no v\xe1lido"}},name:"email",label:"Correo elect\xf3nico",helperText:"Este correo ser\xe1 usado en distintas partes del sistema para una comunicaci\xf3n directa con el usuario",defaultValue:v.email,variant:"outlined",size:"small",fullWidth:!0,disabled:r})}),(0,m.jsx)(a.ZP,{container:!0,justifyContent:"flex-end",item:!0,xs:12,children:(0,m.jsx)(u.Z,{variant:"contained",loading:r,disableElevation:!0,onClick:t,children:"Actualizar"})})]})}function h(){var e=(0,t.UO)().id,n=(0,c.v9)((function(e){return{userSelected:e.requestStatus.userShow.userSelected,loading:e.requestStatus.personalData.loadingPD}})),r=n.userSelected,a=n.loading,l=(0,c.I0)(),o=(0,s.cI)(),i=o.handleSubmit,u=o.control,d=o.setError;return(0,m.jsx)(p,{control:u,user:r,handleSubmit:i((function(n){r.username===n.username&&delete n.username,r.email===n.email&&delete n.email,n._method="PUT",l((0,f.V)({submitData:n,id:e,errors:d,loading:"loadingPD"}))})),loading:a})}}}]);
//# sourceMappingURL=2200.db41f04e.chunk.js.map