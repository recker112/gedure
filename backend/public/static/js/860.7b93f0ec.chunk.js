"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[860,1948],{19840:function(e,n,t){t.d(n,{c:function(){return d}});var a=t(1413),o=t(45987),r=t(48550),l=t(61134),i=t(80184),u=["name","control","rules","defaultValue","helperText"],s=["ref"];function d(e){var n=e.name,t=e.control,d=e.rules,c=void 0===d?null:d,f=e.defaultValue,p=void 0===f?"":f,m=e.helperText,v=void 0===m?"":m,h=(0,o.Z)(e,u),Z=(0,l.bc)({name:n,control:t,rules:c,defaultValue:p}),x=Z.field,g=x.ref,b=(0,o.Z)(x,s),_=Z.fieldState,j=_.invalid,T=_.error;return(0,i.jsx)(r.Z,(0,a.Z)((0,a.Z)((0,a.Z)({inputRef:g},b),h),{},{error:j,helperText:T?T.message:v}))}},18493:function(e,n,t){t.d(n,{Q:function(){return h}});var a=t(1413),o=t(29439),r=t(45987),l=t(72791),i=t(48550),u=t(63466),s=t(13400),d=t(3746),c=t(20165),f=t(61134),p=t(80184),m=["name","control","rules","defaultValue","helperText"],v=["ref"];function h(e){var n=e.name,t=e.control,h=e.rules,Z=void 0===h?null:h,x=e.defaultValue,g=void 0===x?"":x,b=e.helperText,_=void 0===b?"":b,j=(0,r.Z)(e,m),T=(0,l.useState)(!1),V=(0,o.Z)(T,2),S=V[0],O=V[1],C=(0,f.bc)({name:n,control:t,rules:Z,defaultValue:g}),P=C.field,q=P.ref,N=(0,r.Z)(P,v),w=C.fieldState,E=w.invalid,I=w.error;return(0,p.jsx)(i.Z,(0,a.Z)((0,a.Z)((0,a.Z)({inputRef:q},N),j),{},{error:E,helperText:I?I.message:_,type:S?"text":"password",InputProps:{endAdornment:(0,p.jsx)(u.Z,{position:"end",children:(0,p.jsx)(s.Z,{onClick:function(){O(!S)},size:null===j||void 0===j?void 0:j.size,children:S?(0,p.jsx)(c.Z,{}):(0,p.jsx)(d.Z,{})})})}}))}},99507:function(e,n,t){t.d(n,{yh:function(){return S},mX:function(){return x},cl:function(){return a.c},gT:function(){return f},Q:function(){return p.Q}});var a=t(19840),o=t(1413),r=t(45987),l=t(48550),i=t(61134),u=t(30948),s=t(80184),d=["name","control","rules","defaultValue","helperText"],c=["ref","onChange","value"];function f(e){var n=e.name,t=e.control,a=e.rules,f=void 0===a?null:a,p=e.defaultValue,m=void 0===p?"":p,v=e.helperText,h=void 0===v?"":v,Z=(0,r.Z)(e,d),x=(0,i.bc)({name:n,control:t,rules:f,defaultValue:m}),g=x.field,b=(g.ref,g.onChange),_=g.value,j=(0,r.Z)(g,c),T=x.fieldState,V=T.invalid,S=T.error;return(0,s.jsx)(u.Z,(0,o.Z)((0,o.Z)((0,o.Z)({},Z),j),{},{value:Number(_)||"",customInput:l.Z,error:V,onValueChange:function(e){b((null===e||void 0===e?void 0:e.value)||"")},helperText:S?S.message:h,mask:"_"}))}var p=t(18493),m=t(92343),v=t(72791),h=["multiple","options","name","control","defaultValue","rules","isOptionEqualToValue","getOptionLabel","helperText","disabled"],Z=["ref","onChange"];function x(e){var n=e.multiple,t=e.options,a=e.name,u=e.control,d=e.defaultValue,c=e.rules,f=void 0===c?{required:"* Campo requerido"}:c,p=e.isOptionEqualToValue,v=e.getOptionLabel,x=e.helperText,g=e.disabled,b=(0,r.Z)(e,h),_=(0,i.bc)({name:a,control:u,rules:f,defaultValue:d}),j=_.field,T=j.ref,V=j.onChange,S=(0,r.Z)(j,Z),O=_.fieldState,C=O.invalid,P=O.error;return(0,s.jsx)(m.Z,(0,o.Z)((0,o.Z)({},S),{},{onChange:function(e,n){V(n)},multiple:n,options:t,noOptionsText:"No hay resultados",getOptionLabel:v,isOptionEqualToValue:p,disabled:g,renderInput:function(e){return(0,s.jsx)(l.Z,(0,o.Z)((0,o.Z)((0,o.Z)({},e),b),{},{inputRef:T,error:C,helperText:P?P.message:x}))}}))}var g=t(74165),b=t(15861),_=t(29439),j=t(13239);var T=["name","control","rules","data","defaultValue","helperText","getOptionLabel","isOptionEqualToValue","multiple","handleRequest","disabled","renderOption","renderTags","limitTags"],V=["ref","onChange"];function S(e){var n=e.name,t=e.control,a=e.rules,u=void 0===a?null:a,d=e.data,c=void 0===d?[]:d,f=e.defaultValue,p=void 0===f?"":f,h=e.helperText,Z=void 0===h?"":h,x=e.getOptionLabel,S=e.isOptionEqualToValue,O=e.multiple,C=e.handleRequest,P=e.disabled,q=e.renderOption,N=e.renderTags,w=e.limitTags,E=(0,r.Z)(e,T),I=(0,v.useState)(!1),L=(0,_.Z)(I,2),k=L[0],y=L[1],D=(0,v.useState)([]),A=(0,_.Z)(D,2),R=A[0],U=A[1],z=(0,v.useState)(""),F=(0,_.Z)(z,2),Q=F[0],B=F[1],W=(0,v.useState)(!0),X=(0,_.Z)(W,2),G=X[0],H=X[1],J=G&&k&&0===R.length,K=(0,i.bc)({name:n,control:t,rules:u,defaultValue:p}),M=K.field,Y=M.ref,$=M.onChange,ee=(0,r.Z)(M,V),ne=K.fieldState.error;(0,v.useEffect)((function(){var e=!0,n=function(){var e=(0,b.Z)((0,g.Z)().mark((function e(){return(0,g.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C(Q);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(J)return e&&n(),function(){e=!1}}),[J]),(0,v.useEffect)((function(){k||(U([]),H(!0))}),[k]),(0,v.useEffect)((function(){null!==c&&(U(c),H(!1))}),[c]);var te=(0,v.useCallback)(function(e,n){var t;return function(){for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];clearTimeout(t),t=setTimeout((function(){return e.apply(void 0,o)}),n)}}((function(){U([]),H(!0)}),500),[]);return(0,s.jsx)(m.Z,{multiple:O,id:"autocomplete-".concat(n),options:R,open:k,onOpen:function(){y(!0),H(!0)},onClose:function(){y(!1)},onChange:function(e,n){$(n)},inputValue:Q,onInputChange:function(e,n){B(n),"change"===(null===e||void 0===e?void 0:e.type)&&te()},getOptionLabel:x,isOptionEqualToValue:S,loading:J,loadingText:"Cargando...",noOptionsText:"No hay resultados",renderTags:N,disabled:P,renderOption:q,limitTags:w,renderInput:function(e){return(0,s.jsx)(l.Z,(0,o.Z)((0,o.Z)((0,o.Z)((0,o.Z)({},e),ee),E),{},{inputRef:Y,error:Boolean(ne),helperText:ne?ne.message:Z,InputProps:(0,o.Z)((0,o.Z)({},e.InputProps),{},{endAdornment:(0,s.jsxs)(v.Fragment,{children:[J?(0,s.jsx)(j.Z,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})})}))}})}},6122:function(e,n,t){t.d(n,{V:function(){return c}});var a=t(1413),o=(t(72791),t(68096)),r=t(17133),l=t(10765),i=t(85523),u=t(61419),s=t(61134),d=t(80184);function c(e){var n=e.disabled,t=e.label,c=e.name,f=e.control,p=e.defaultValue,m=e.row,v=e.radioList,h=e.rules,Z=void 0===h?{required:"* Campo requerido"}:h,x=(0,s.bc)({name:c,control:f,rules:Z,defaultValue:p}),g=Object.assign({},x.field),b=x.fieldState.invalid;return(0,d.jsxs)(o.Z,{error:b,component:"fieldset",disabled:n,children:[(0,d.jsx)(r.Z,{component:"legend",children:t}),(0,d.jsx)(l.Z,(0,a.Z)((0,a.Z)({},g),{},{"aria-label":t,row:m,children:v.map((function(e,n){return(0,d.jsx)(i.Z,{value:e.value,control:(0,d.jsx)(u.Z,{}),label:e.label},n)}))}))]})}},20860:function(e,n,t){t.r(n),t.d(n,{default:function(){return s}});t(72791);var a=t(61134),o=t(51948),r=t(16030),l=t(84955),i=t(5016),u=t(80184);function s(){var e=(0,r.v9)((function(e){return{user:e.auth.user,loading:e.requestStatus.personalData.loadingPO}})),n=e.user,t=e.loading,s=(0,r.I0)(),d=(0,a.cI)({shouldUnregister:!0}),c=d.handleSubmit,f=d.control,p=function(e){var n=e.user;s((0,i.Al)({user:n}))};return(0,u.jsx)(o.POtrosForm,{control:f,user:n,handleSubmit:c((function(e){"Si"===e.personal_data.estudi_otros_alojado&&(e.personal_data.estudi_otros_direccion=null),e._method="PUT",s((0,l.V)({submitData:e,loading:"loadingPO",personal:!0,handleUpdate:p}))})),loading:t})}},51948:function(e,n,t){t.r(n),t.d(n,{POtrosForm:function(){return v},default:function(){return h}});t(72791);var a=t(16871),o=t(61889),r=t(20890),l=t(68870),i=t(94721),u=t(39709),s=t(61134),d=t(99507),c=t(6122),f=t(16030),p=t(84955),m=t(80184);function v(e){var n=e.control,t=e.loading,a=e.user,f=e.handleSubmit,p=e.buttonDisable,v=(0,s.qo)({control:n,name:"personal_data.estudi_otros_alojado",defaultValue:a.personal_data.estudi_otros_alojado});return(0,m.jsxs)(o.ZP,{container:!0,spacing:2,children:[(0,m.jsxs)(o.ZP,{item:!0,xs:12,children:[(0,m.jsx)(r.Z,{variant:"h6",component:"span",className:"text__bold--semi",children:"Otros datos del estudiante"}),(0,m.jsx)(l.Z,{mt:1,children:(0,m.jsx)(i.Z,{})})]}),(0,m.jsx)(o.ZP,{item:!0,xs:12,children:(0,m.jsx)(c.V,{control:n,defaultValue:a.personal_data.estudi_otros_canaima||"No",disabled:t,label:"\xbfTiene canaima?",name:"personal_data.estudi_otros_canaima",row:!0,radioList:[{value:"Si",label:"Si"},{value:"No",label:"No"}]})}),(0,m.jsx)(o.ZP,{item:!0,xs:12,children:(0,m.jsx)(c.V,{control:n,defaultValue:a.personal_data.estudi_otros_beca||"No",disabled:t,label:"\xbfTiene beca?",name:"personal_data.estudi_otros_beca",row:!0,radioList:[{value:"Si",label:"Si"},{value:"No",label:"No"}]})}),(0,m.jsx)(o.ZP,{item:!0,xs:12,children:(0,m.jsx)(c.V,{control:n,defaultValue:a.personal_data.estudi_otros_alojado||"Si",disabled:t,label:"\xbfVive con el representante?",name:"personal_data.estudi_otros_alojado",row:!0,radioList:[{value:"Si",label:"Si"},{value:"No",label:"No"}]})}),"No"===v&&(0,m.jsx)(o.ZP,{item:!0,xs:12,children:(0,m.jsx)(d.cl,{control:n,rules:{required:"* Campo requerido",minLength:{value:10,message:"Error: Demaciado corto"},maxLength:{value:40,message:"Error: Demaciado largo"}},defaultValue:a.personal_data.estudi_otros_direccion||"",name:"personal_data.estudi_otros_direccion",label:"Direccion",variant:"outlined",size:"small",fullWidth:!0,disabled:t})}),!p&&(0,m.jsx)(o.ZP,{container:!0,justifyContent:"flex-end",item:!0,xs:12,children:(0,m.jsx)(u.Z,{variant:"contained",loading:t,disableElevation:!0,onClick:f,children:"Actualizar"})})]})}function h(){var e=(0,a.UO)().id,n=(0,f.v9)((function(e){return{userSelected:e.requestStatus.userShow.userSelected,loading:e.requestStatus.personalData.loadingPO}})),t=n.userSelected,o=n.loading,r=(0,f.I0)(),i=(0,s.cI)({shouldUnregister:!0}),u=i.handleSubmit,d=i.control;return(0,m.jsx)(l.Z,{mb:4,children:(0,m.jsx)(v,{control:d,user:t,handleSubmit:u((function(n){"Si"===n.personal_data.estudi_otros_alojado&&(n.personal_data.estudi_otros_direccion=null),n._method="PUT",r((0,p.V)({submitData:n,id:e,loading:"loadingPO"}))})),loading:o})})}}}]);
//# sourceMappingURL=860.7b93f0ec.chunk.js.map