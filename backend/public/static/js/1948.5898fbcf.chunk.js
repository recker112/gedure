"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[1948],{19840:function(e,n,t){t.d(n,{c:function(){return d}});var a=t(1413),o=t(45987),r=t(48550),l=t(61134),i=t(80184),u=["name","control","rules","defaultValue","helperText"],s=["ref"];function d(e){var n=e.name,t=e.control,d=e.rules,c=void 0===d?null:d,f=e.defaultValue,p=void 0===f?"":f,m=e.helperText,Z=void 0===m?"":m,v=(0,o.Z)(e,u),h=(0,l.bc)({name:n,control:t,rules:c,defaultValue:p}),x=h.field,b=x.ref,g=(0,o.Z)(x,s),_=h.fieldState,j=_.invalid,T=_.error;return(0,i.jsx)(r.Z,(0,a.Z)((0,a.Z)((0,a.Z)({inputRef:b},g),v),{},{error:j,helperText:T?T.message:Z}))}},18493:function(e,n,t){t.d(n,{Q:function(){return v}});var a=t(1413),o=t(29439),r=t(45987),l=t(72791),i=t(48550),u=t(63466),s=t(13400),d=t(3746),c=t(20165),f=t(61134),p=t(80184),m=["name","control","rules","defaultValue","helperText"],Z=["ref"];function v(e){var n=e.name,t=e.control,v=e.rules,h=void 0===v?null:v,x=e.defaultValue,b=void 0===x?"":x,g=e.helperText,_=void 0===g?"":g,j=(0,r.Z)(e,m),T=(0,l.useState)(!1),V=(0,o.Z)(T,2),S=V[0],O=V[1],C=(0,f.bc)({name:n,control:t,rules:h,defaultValue:b}),q=C.field,P=q.ref,N=(0,r.Z)(q,Z),w=C.fieldState,E=w.invalid,L=w.error;return(0,p.jsx)(i.Z,(0,a.Z)((0,a.Z)((0,a.Z)({inputRef:P},N),j),{},{error:E,helperText:L?L.message:_,type:S?"text":"password",InputProps:{endAdornment:(0,p.jsx)(u.Z,{position:"end",children:(0,p.jsx)(s.Z,{onClick:function(){O(!S)},size:null===j||void 0===j?void 0:j.size,children:S?(0,p.jsx)(c.Z,{}):(0,p.jsx)(d.Z,{})})})}}))}},99507:function(e,n,t){t.d(n,{yh:function(){return S},mX:function(){return x},cl:function(){return a.c},gT:function(){return f},Q:function(){return p.Q}});var a=t(19840),o=t(1413),r=t(45987),l=t(48550),i=t(61134),u=t(30948),s=t(80184),d=["name","control","rules","defaultValue","helperText"],c=["ref","onChange","value"];function f(e){var n=e.name,t=e.control,a=e.rules,f=void 0===a?null:a,p=e.defaultValue,m=void 0===p?"":p,Z=e.helperText,v=void 0===Z?"":Z,h=(0,r.Z)(e,d),x=(0,i.bc)({name:n,control:t,rules:f,defaultValue:m}),b=x.field,g=(b.ref,b.onChange),_=b.value,j=(0,r.Z)(b,c),T=x.fieldState,V=T.invalid,S=T.error;return(0,s.jsx)(u.Z,(0,o.Z)((0,o.Z)((0,o.Z)({},h),j),{},{value:Number(_)||"",customInput:l.Z,error:V,onValueChange:function(e){g((null===e||void 0===e?void 0:e.value)||"")},helperText:S?S.message:v,mask:"_"}))}var p=t(18493),m=t(92343),Z=t(72791),v=["multiple","options","name","control","defaultValue","rules","isOptionEqualToValue","getOptionLabel","helperText","disabled"],h=["ref","onChange"];function x(e){var n=e.multiple,t=e.options,a=e.name,u=e.control,d=e.defaultValue,c=e.rules,f=void 0===c?{required:"* Campo requerido"}:c,p=e.isOptionEqualToValue,Z=e.getOptionLabel,x=e.helperText,b=e.disabled,g=(0,r.Z)(e,v),_=(0,i.bc)({name:a,control:u,rules:f,defaultValue:d}),j=_.field,T=j.ref,V=j.onChange,S=(0,r.Z)(j,h),O=_.fieldState,C=O.invalid,q=O.error;return(0,s.jsx)(m.Z,(0,o.Z)((0,o.Z)({},S),{},{onChange:function(e,n){V(n)},multiple:n,options:t,noOptionsText:"No hay resultados",getOptionLabel:Z,isOptionEqualToValue:p,disabled:b,renderInput:function(e){return(0,s.jsx)(l.Z,(0,o.Z)((0,o.Z)((0,o.Z)({},e),g),{},{inputRef:T,error:C,helperText:q?q.message:x}))}}))}var b=t(74165),g=t(15861),_=t(29439),j=t(13239);var T=["name","control","rules","data","defaultValue","helperText","getOptionLabel","isOptionEqualToValue","multiple","handleRequest","disabled","renderOption","renderTags","limitTags"],V=["ref","onChange"];function S(e){var n=e.name,t=e.control,a=e.rules,u=void 0===a?null:a,d=e.data,c=void 0===d?[]:d,f=e.defaultValue,p=void 0===f?"":f,v=e.helperText,h=void 0===v?"":v,x=e.getOptionLabel,S=e.isOptionEqualToValue,O=e.multiple,C=e.handleRequest,q=e.disabled,P=e.renderOption,N=e.renderTags,w=e.limitTags,E=(0,r.Z)(e,T),L=(0,Z.useState)(!1),I=(0,_.Z)(L,2),k=I[0],y=I[1],D=(0,Z.useState)([]),R=(0,_.Z)(D,2),z=R[0],A=R[1],Q=(0,Z.useState)(""),U=(0,_.Z)(Q,2),F=U[0],B=U[1],W=(0,Z.useState)(!0),X=(0,_.Z)(W,2),G=X[0],H=X[1],J=G&&k&&0===z.length,K=(0,i.bc)({name:n,control:t,rules:u,defaultValue:p}),M=K.field,Y=M.ref,$=M.onChange,ee=(0,r.Z)(M,V),ne=K.fieldState.error;(0,Z.useEffect)((function(){var e=!0,n=function(){var e=(0,g.Z)((0,b.Z)().mark((function e(){return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C(F);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(J)return e&&n(),function(){e=!1}}),[J]),(0,Z.useEffect)((function(){k||(A([]),H(!0))}),[k]),(0,Z.useEffect)((function(){null!==c&&(A(c),H(!1))}),[c]);var te=(0,Z.useCallback)(function(e,n){var t;return function(){for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];clearTimeout(t),t=setTimeout((function(){return e.apply(void 0,o)}),n)}}((function(){A([]),H(!0)}),500),[]);return(0,s.jsx)(m.Z,{multiple:O,id:"autocomplete-".concat(n),options:z,open:k,onOpen:function(){y(!0),H(!0)},onClose:function(){y(!1)},onChange:function(e,n){$(n)},inputValue:F,onInputChange:function(e,n){B(n),"change"===(null===e||void 0===e?void 0:e.type)&&te()},getOptionLabel:x,isOptionEqualToValue:S,loading:J,loadingText:"Cargando...",noOptionsText:"No hay resultados",renderTags:N,disabled:q,renderOption:P,limitTags:w,renderInput:function(e){return(0,s.jsx)(l.Z,(0,o.Z)((0,o.Z)((0,o.Z)((0,o.Z)({},e),ee),E),{},{inputRef:Y,error:Boolean(ne),helperText:ne?ne.message:h,InputProps:(0,o.Z)((0,o.Z)({},e.InputProps),{},{endAdornment:(0,s.jsxs)(Z.Fragment,{children:[J?(0,s.jsx)(j.Z,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})})}))}})}},6122:function(e,n,t){t.d(n,{V:function(){return c}});var a=t(1413),o=(t(72791),t(68096)),r=t(17133),l=t(10765),i=t(85523),u=t(61419),s=t(61134),d=t(80184);function c(e){var n=e.disabled,t=e.label,c=e.name,f=e.control,p=e.defaultValue,m=e.row,Z=e.radioList,v=e.rules,h=void 0===v?{required:"* Campo requerido"}:v,x=(0,s.bc)({name:c,control:f,rules:h,defaultValue:p}),b=Object.assign({},x.field),g=x.fieldState.invalid;return(0,d.jsxs)(o.Z,{error:g,component:"fieldset",disabled:n,children:[(0,d.jsx)(r.Z,{component:"legend",children:t}),(0,d.jsx)(l.Z,(0,a.Z)((0,a.Z)({},b),{},{"aria-label":t,row:m,children:Z.map((function(e,n){return(0,d.jsx)(i.Z,{value:e.value,control:(0,d.jsx)(u.Z,{}),label:e.label},n)}))}))]})}},51948:function(e,n,t){t.r(n),t.d(n,{POtrosForm:function(){return Z},default:function(){return v}});t(72791);var a=t(16871),o=t(61889),r=t(20890),l=t(68870),i=t(94721),u=t(39709),s=t(61134),d=t(99507),c=t(6122),f=t(16030),p=t(84955),m=t(80184);function Z(e){var n=e.control,t=e.loading,a=e.user,f=e.handleSubmit,p=e.buttonDisable,Z=(0,s.qo)({control:n,name:"personal_data.estudi_otros_alojado",defaultValue:a.personal_data.estudi_otros_alojado});return(0,m.jsxs)(o.ZP,{container:!0,spacing:2,children:[(0,m.jsxs)(o.ZP,{item:!0,xs:12,children:[(0,m.jsx)(r.Z,{variant:"h6",component:"span",className:"text__bold--semi",children:"Otros datos del estudiante"}),(0,m.jsx)(l.Z,{mt:1,children:(0,m.jsx)(i.Z,{})})]}),(0,m.jsx)(o.ZP,{item:!0,xs:12,children:(0,m.jsx)(c.V,{control:n,defaultValue:a.personal_data.estudi_otros_canaima||"No",disabled:t,label:"\xbfTiene canaima?",name:"personal_data.estudi_otros_canaima",row:!0,radioList:[{value:"Si",label:"Si"},{value:"No",label:"No"}]})}),(0,m.jsx)(o.ZP,{item:!0,xs:12,children:(0,m.jsx)(c.V,{control:n,defaultValue:a.personal_data.estudi_otros_beca||"No",disabled:t,label:"\xbfTiene beca?",name:"personal_data.estudi_otros_beca",row:!0,radioList:[{value:"Si",label:"Si"},{value:"No",label:"No"}]})}),(0,m.jsx)(o.ZP,{item:!0,xs:12,children:(0,m.jsx)(c.V,{control:n,defaultValue:a.personal_data.estudi_otros_alojado||"Si",disabled:t,label:"\xbfVive con el representante?",name:"personal_data.estudi_otros_alojado",row:!0,radioList:[{value:"Si",label:"Si"},{value:"No",label:"No"}]})}),"No"===Z&&(0,m.jsx)(o.ZP,{item:!0,xs:12,children:(0,m.jsx)(d.cl,{control:n,rules:{required:"* Campo requerido",minLength:{value:10,message:"Error: Demaciado corto"},maxLength:{value:40,message:"Error: Demaciado largo"}},defaultValue:a.personal_data.estudi_otros_direccion||"",name:"personal_data.estudi_otros_direccion",label:"Direccion",variant:"outlined",size:"small",fullWidth:!0,disabled:t})}),!p&&(0,m.jsx)(o.ZP,{container:!0,justifyContent:"flex-end",item:!0,xs:12,children:(0,m.jsx)(u.Z,{variant:"contained",loading:t,disableElevation:!0,onClick:f,children:"Actualizar"})})]})}function v(){var e=(0,a.UO)().id,n=(0,f.v9)((function(e){return{userSelected:e.requestStatus.userShow.userSelected,loading:e.requestStatus.personalData.loadingPO}})),t=n.userSelected,o=n.loading,r=(0,f.I0)(),i=(0,s.cI)({shouldUnregister:!0}),u=i.handleSubmit,d=i.control;return(0,m.jsx)(l.Z,{mb:4,children:(0,m.jsx)(Z,{control:d,user:t,handleSubmit:u((function(n){"Si"===n.personal_data.estudi_otros_alojado&&(n.personal_data.estudi_otros_direccion=null),n._method="PUT",r((0,p.V)({submitData:n,id:e,loading:"loadingPO"}))})),loading:o})})}}}]);
//# sourceMappingURL=1948.5898fbcf.chunk.js.map