"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[71],{39481:function(e,r,n){n.d(r,{Z:function(){return h}});n(72791);var a=n(5574),t=n(65661),s=n(39157),o=n(51691),i=n(97123),l=n(24518),c=n(76429),d=n(16030),u=n(39709),p=n(80184);function h(e){var r=e.rdx1,n=e.rdx2,h=e.close,x=e.request,m=e.children,f=(0,d.v9)((function(e){return e[r][n]})),Z=f.open,v=f.loading,g=f.data,j=(0,d.I0)();return(0,p.jsxs)(a.Z,{open:Z,TransitionComponent:c.Z,"aria-labelledby":"confirm-dialog-title","aria-describedby":"confirm-dialog-description",children:[(0,p.jsx)(t.Z,{children:"\xbfEst\xe1 seguro?"}),(0,p.jsx)(s.Z,{children:(0,p.jsx)(o.Z,{id:"confirm-dialog-description",children:m(g)})}),(0,p.jsxs)(i.Z,{children:[(0,p.jsx)(l.Z,{disabled:v,onClick:function(){j(h)},color:"inherit",children:"Cancelar"}),(0,p.jsx)(u.Z,{onClick:function(){j(x(g))},loading:v,color:"inherit",children:"Confirmar"})]})]})}},12866:function(e,r){r.Z=function(e){for(var r="ABCDEFGHIJKMNPQRSTUVWXYZ123456789",n="",a=0,t=r.length;a<e;++a)n+=r.charAt(Math.floor(Math.random()*t));return n}},19840:function(e,r,n){n.d(r,{c:function(){return d}});var a=n(1413),t=n(45987),s=n(48550),o=n(61134),i=n(80184),l=["name","control","rules","defaultValue","helperText"],c=["ref"];function d(e){var r=e.name,n=e.control,d=e.rules,u=void 0===d?null:d,p=e.defaultValue,h=void 0===p?"":p,x=e.helperText,m=void 0===x?"":x,f=(0,t.Z)(e,l),Z=(0,o.bc)({name:r,control:n,rules:u,defaultValue:h}),v=Z.field,g=v.ref,j=(0,t.Z)(v,c),b=Z.fieldState,C=b.invalid,y=b.error;return(0,i.jsx)(s.Z,(0,a.Z)((0,a.Z)((0,a.Z)({inputRef:g},j),f),{},{error:C,helperText:y?y.message:m}))}},18493:function(e,r,n){n.d(r,{Q:function(){return f}});var a=n(1413),t=n(29439),s=n(45987),o=n(72791),i=n(48550),l=n(63466),c=n(13400),d=n(3746),u=n(20165),p=n(61134),h=n(80184),x=["name","control","rules","defaultValue","helperText"],m=["ref"];function f(e){var r=e.name,n=e.control,f=e.rules,Z=void 0===f?null:f,v=e.defaultValue,g=void 0===v?"":v,j=e.helperText,b=void 0===j?"":j,C=(0,s.Z)(e,x),y=(0,o.useState)(!1),_=(0,t.Z)(y,2),k=_[0],T=_[1],V=(0,p.bc)({name:r,control:n,rules:Z,defaultValue:g}),q=V.field,S=q.ref,E=(0,s.Z)(q,m),w=V.fieldState,P=w.invalid,U=w.error;return(0,h.jsx)(i.Z,(0,a.Z)((0,a.Z)((0,a.Z)({inputRef:S},E),C),{},{error:P,helperText:U?U.message:b,type:k?"text":"password",InputProps:{endAdornment:(0,h.jsx)(l.Z,{position:"end",children:(0,h.jsx)(c.Z,{onClick:function(){T(!k)},size:null===C||void 0===C?void 0:C.size,children:k?(0,h.jsx)(u.Z,{}):(0,h.jsx)(d.Z,{})})})}}))}},99507:function(e,r,n){n.d(r,{yh:function(){return k},mX:function(){return v},cl:function(){return a.c},gT:function(){return p},Q:function(){return h.Q}});var a=n(19840),t=n(1413),s=n(45987),o=n(48550),i=n(61134),l=n(30948),c=n(80184),d=["name","control","rules","defaultValue","helperText"],u=["ref","onChange","value"];function p(e){var r=e.name,n=e.control,a=e.rules,p=void 0===a?null:a,h=e.defaultValue,x=void 0===h?"":h,m=e.helperText,f=void 0===m?"":m,Z=(0,s.Z)(e,d),v=(0,i.bc)({name:r,control:n,rules:p,defaultValue:x}),g=v.field,j=(g.ref,g.onChange),b=g.value,C=(0,s.Z)(g,u),y=v.fieldState,_=y.invalid,k=y.error;return(0,c.jsx)(l.Z,(0,t.Z)((0,t.Z)((0,t.Z)({},Z),C),{},{value:Number(b)||"",customInput:o.Z,error:_,onValueChange:function(e){j((null===e||void 0===e?void 0:e.value)||"")},helperText:k?k.message:f,mask:"_"}))}var h=n(18493),x=n(92343),m=n(72791),f=["multiple","options","name","control","defaultValue","rules","isOptionEqualToValue","getOptionLabel","helperText","disabled"],Z=["ref","onChange"];function v(e){var r=e.multiple,n=e.options,a=e.name,l=e.control,d=e.defaultValue,u=e.rules,p=void 0===u?{required:"* Campo requerido"}:u,h=e.isOptionEqualToValue,m=e.getOptionLabel,v=e.helperText,g=e.disabled,j=(0,s.Z)(e,f),b=(0,i.bc)({name:a,control:l,rules:p,defaultValue:d}),C=b.field,y=C.ref,_=C.onChange,k=(0,s.Z)(C,Z),T=b.fieldState,V=T.invalid,q=T.error;return(0,c.jsx)(x.Z,(0,t.Z)((0,t.Z)({},k),{},{onChange:function(e,r){_(r)},multiple:r,options:n,noOptionsText:"No hay resultados",getOptionLabel:m,isOptionEqualToValue:h,disabled:g,renderInput:function(e){return(0,c.jsx)(o.Z,(0,t.Z)((0,t.Z)((0,t.Z)({},e),j),{},{inputRef:y,error:V,helperText:q?q.message:v}))}}))}var g=n(74165),j=n(15861),b=n(29439),C=n(13239);var y=["name","control","rules","data","defaultValue","helperText","getOptionLabel","isOptionEqualToValue","multiple","handleRequest","disabled","renderOption","renderTags","limitTags"],_=["ref","onChange"];function k(e){var r=e.name,n=e.control,a=e.rules,l=void 0===a?null:a,d=e.data,u=void 0===d?[]:d,p=e.defaultValue,h=void 0===p?"":p,f=e.helperText,Z=void 0===f?"":f,v=e.getOptionLabel,k=e.isOptionEqualToValue,T=e.multiple,V=e.handleRequest,q=e.disabled,S=e.renderOption,E=e.renderTags,w=e.limitTags,P=(0,s.Z)(e,y),U=(0,m.useState)(!1),I=(0,b.Z)(U,2),z=I[0],O=I[1],A=(0,m.useState)([]),D=(0,b.Z)(A,2),L=D[0],N=D[1],F=(0,m.useState)(""),M=(0,b.Z)(F,2),R=M[0],H=M[1],W=(0,m.useState)(!0),B=(0,b.Z)(W,2),G=B[0],Q=B[1],J=G&&z&&0===L.length,Y=(0,i.bc)({name:r,control:n,rules:l,defaultValue:h}),K=Y.field,X=K.ref,$=K.onChange,ee=(0,s.Z)(K,_),re=Y.fieldState.error;(0,m.useEffect)((function(){var e=!0,r=function(){var e=(0,j.Z)((0,g.Z)().mark((function e(){return(0,g.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V(R);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(J)return e&&r(),function(){e=!1}}),[J]),(0,m.useEffect)((function(){z||(N([]),Q(!0))}),[z]),(0,m.useEffect)((function(){null!==u&&(N(u),Q(!1))}),[u]);var ne=(0,m.useCallback)(function(e,r){var n;return function(){for(var a=arguments.length,t=new Array(a),s=0;s<a;s++)t[s]=arguments[s];clearTimeout(n),n=setTimeout((function(){return e.apply(void 0,t)}),r)}}((function(){N([]),Q(!0)}),500),[]);return(0,c.jsx)(x.Z,{multiple:T,id:"autocomplete-".concat(r),options:L,open:z,onOpen:function(){O(!0),Q(!0)},onClose:function(){O(!1)},onChange:function(e,r){$(r)},inputValue:R,onInputChange:function(e,r){H(r),"change"===(null===e||void 0===e?void 0:e.type)&&ne()},getOptionLabel:v,isOptionEqualToValue:k,loading:J,loadingText:"Cargando...",noOptionsText:"No hay resultados",renderTags:E,disabled:q,renderOption:S,limitTags:w,renderInput:function(e){return(0,c.jsx)(o.Z,(0,t.Z)((0,t.Z)((0,t.Z)((0,t.Z)({},e),ee),P),{},{inputRef:X,error:Boolean(re),helperText:re?re.message:Z,InputProps:(0,t.Z)((0,t.Z)({},e.InputProps),{},{endAdornment:(0,c.jsxs)(m.Fragment,{children:[J?(0,c.jsx)(C.Z,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})})}))}})}},90071:function(e,r,n){n.r(r),n.d(r,{default:function(){return _e}});var a=n(72791),t=n(68870),s=n(91614),o=n(61889),i=n(24518),l=n(81075),c=n(37762),d=n(1413),u=n(16871),p=n(93044),h=n(81918),x=n(20068),m=n(13400),f=n(40501),Z=n(27247),v=n(55037),g=n(70825),j=n(93433),b=n(74165),C=n(15861),y=n(84697),_=n(73974),k=n(10703),T=n(84395),V=n(34663),q=n(20890),S=n(91903),E=n(29823),w=n(86753),P=n(61134),U=n(37369),I=n(6122),z=n(16030),O=n(15728),A=n(80184);function D(){var e=(0,z.v9)((function(e){return e.tables.users})),r=e.filterBox,n=e.filters,a=e.countFilters,i=(0,z.I0)(),l=(0,P.cI)({defaultValues:n}),c=l.control,d=l.handleSubmit,u=l.reset,p=l.watch,h=l.setValue,f=function(){var e=(0,C.Z)((0,b.Z)().mark((function e(r){return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"V-"!==r.type&&(r.curso="",r.seccion="",h("curso",""),h("seccion","")),e.next=3,i((0,O.rr)({data:r,select:"users"}));case 3:i((0,O.es)({open:!1,select:"users"}));case 4:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),Z=[{value:"",label:"Todos"}].concat((0,j.Z)(U.Y5)),v=[{value:"",label:"Todos"}].concat((0,j.Z)(U.RJ));return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(y.Z,{badgeContent:a,color:"primary",children:(0,A.jsx)(x.Z,{title:"Filtrador",arrow:!0,children:(0,A.jsx)(m.Z,{color:"inherit","data-tour":"gdUser__filters",onClick:function(){i((0,O.es)({open:!0,select:"users"}))},children:(0,A.jsx)(S.Z,{})})})}),(0,A.jsx)(_.ZP,{open:r,anchor:"bottom",children:(0,A.jsxs)(k.Z,{sx:{height:"100vh"},children:[(0,A.jsx)(T.Z,{enableColorOnDark:!0,position:"static",elevation:0,children:(0,A.jsxs)(V.Z,{children:[(0,A.jsx)(q.Z,{variant:"h5",sx:{flexGrow:1},children:"Filtrador"}),(0,A.jsx)(x.Z,{title:"Reiniciar",arrow:!0,children:(0,A.jsx)(m.Z,{onClick:function(){u({type:"",curso:"",seccion:""})},children:(0,A.jsx)(w.Z,{})})}),(0,A.jsx)(x.Z,{title:"Cerrar",arrow:!0,children:(0,A.jsx)(m.Z,{onClick:d(f),children:(0,A.jsx)(E.Z,{})})})]})}),(0,A.jsx)(s.Z,{children:(0,A.jsx)(t.Z,{my:2,children:(0,A.jsxs)(o.ZP,{container:!0,spacing:2,children:[(0,A.jsx)(o.ZP,{item:!0,xs:12,children:(0,A.jsx)(I.V,{label:"Tipo de cuenta",name:"type",defaultValue:n.type,row:!0,radioList:[{value:"",label:"Todos"},{value:"A-",label:"Administradores"},{value:"V-",label:"Estudiantes"},{value:"V-NA",label:"Estudiantes sin curso"}],rules:{},control:c})}),(0,A.jsx)(o.ZP,{item:!0,xs:12,children:(0,A.jsx)(I.V,{label:"Curso",name:"curso",defaultValue:n.curso,disabled:"V-"!==p("type"),radioList:Z,rules:{},control:c,row:!0})}),(0,A.jsx)(o.ZP,{item:!0,xs:12,children:(0,A.jsx)(I.V,{label:"Secci\xf3n",name:"seccion",defaultValue:n.seccion,disabled:"V-"!==p("type"),radioList:v,rules:{},control:c,row:!0})})]})})})]})})]})}var L=n(65468),N=n(6728);function F(){var e=(0,u.s0)(),r=(0,z.v9)((function(e){return{dataR:e.tables.users.tableData.data,loading:e.tables.users.tableData.loading,pageSize:e.tables.users.tableData.pageSize,pageCount:e.tables.users.tableData.pageCount,type:e.tables.users.filters.type,curso:e.tables.users.filters.curso,seccion:e.tables.users.filters.seccion,permissions:e.auth.permissions,idU:e.auth.user.id}})),n=r.dataR,t=r.loading,s=r.pageSize,o=r.pageCount,i=r.type,l=r.permissions,j=r.idU,b=r.curso,C=r.seccion,y=l.administrar,_=y.users_edit,k=y.users_delete,T=(0,z.I0)(),V=(0,a.useMemo)((function(){return[{Header:"Avatar",accessor:"avatar",Cell:function(e){var r=e.cell.row.original,n=r.avatar,a=r.name;return(0,A.jsx)(p.Z,{sx:{backgroundColor:"secondary.main",color:"secondary.contrastText"},src:n,alt:"Avatar User de ".concat(a),children:a.substring(0,1).toUpperCase()})}},{Header:"Usuario",accessor:"username",Cell:function(e){var r=e.cell.row.original,n=r.privilegio,t=r.username,s=r.n_lista;return b&&C?(0,A.jsxs)(a.Fragment,{children:[(0,A.jsx)("div",{children:n+t}),(0,A.jsxs)("div",{children:["N\xb0 lista ",s]})]}):"".concat(n).concat(t)}},{Header:"Nombre",accessor:"name"},{Header:"Correo",accessor:"email"},{Header:"Estado",accessor:"actived_at",Cell:function(e){var r=e.cell.row.original.actived_at;return(0,A.jsx)(h.Z,{color:r?"primary":"default",label:r?"Activo":"Inactivo","data-tour":"gdUser__status"})}},{id:"options",Header:"Opciones",accessor:"options",Cell:function(r){var n=r.cell.row.original,a=n.id,t=n.username,s=n.privilegio;return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(x.Z,{title:"Ver",arrow:!0,children:(0,A.jsx)(m.Z,{onClick:function(){e(j===a?"/gedure/cuenta":"ver/".concat(a))},disabled:!_,"data-tour":"gdUser__show",children:(0,A.jsx)(f.Z,{})})}),(0,A.jsx)(x.Z,{title:"Desactivar",arrow:!0,children:(0,A.jsx)(m.Z,{onClick:function(){T((0,N.CI)({open:!0,data:{id:a,username:s+t},select:"disableUser"}))},disabled:!k,"data-tour":"gdUser__delete",children:(0,A.jsx)(Z.Z,{})})})]})}}]}),[b,C]),q=(0,a.useMemo)((function(){return n}),[n]);(0,a.useEffect)((function(){var e=null;return t&&(e=T((0,L.R)())),function(){t&&e.abort()}}),[t]),(0,a.useEffect)((function(){return function(){T((0,O.AF)({select:"users"}))}}),[]);return(0,A.jsx)(g.Z,{title:"Lista de usuarios",data:q,columns:V,pageCountData:o,pageSizeData:s,loading:t,handleGlobalFilter:function(e){T((0,O.qP)({search:e||"",select:"users"}))},handleChange:function(e){T((0,O.ai)((0,d.Z)((0,d.Z)({},e),{},{select:"users"})))},filter:(0,A.jsx)(D,{}),refresh:function(){T((0,O.bi)({select:"users"}))},massiveOptions:function(e){return(0,A.jsxs)(A.Fragment,{children:[("V-"===i||"V-NA"===i)&&(0,A.jsx)(x.Z,{title:"Cambiar de curso",arrow:!0,children:(0,A.jsx)(m.Z,{onClick:function(){var r,n=0,a=[],t=(0,c.Z)(e);try{for(t.s();!(r=t.n()).done;){var s=r.value;a[n]=s.id,n++}}catch(o){t.e(o)}finally{t.f()}T((0,N.CI)({open:!0,data:a,select:"updateSeccion"}))},disabled:!_,children:(0,A.jsx)(v.Z,{})})}),(0,A.jsx)(x.Z,{title:"Desactivar",arrow:!0,children:(0,A.jsx)(m.Z,{onClick:function(){var r,n=0,a=[],t=(0,c.Z)(e);try{for(t.s();!(r=t.n()).done;){var s=r.value;a[n]=s.id,n++}}catch(o){t.e(o)}finally{t.f()}T((0,N.CI)({select:"disableUserMassive",open:!0,data:a}))},disabled:!k,children:(0,A.jsx)(Z.Z,{})})})]})}})}var M=n(5574),R=n(65661),H=n(39157),W=n(23786),B=n(51691),G=n(97123),Q=n(39709),J=n(76429),Y=n(29439),K=n(85523),X=n(9955),$=n(18493),ee=n(12866);function re(e){var r=e.control,n=e.loading,t=e.setValue,s=(0,a.useState)(!1),i=(0,Y.Z)(s,2),l=i[0],c=i[1],d=(0,P.qo)({control:r,name:"invitation_mode",defaultValue:!1}),u=(0,P.qo)({control:r,name:"password",defaultValue:""});return d?null:(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(o.ZP,{item:!0,xs:12,children:(0,A.jsx)($.Q,{control:r,rules:{required:"* Campo requerido",minLength:{value:4,message:"Error: Demaciado corto"}},name:"password",label:"Contrase\xf1a",size:"small",variant:"standard",disabled:n,fullWidth:!0})}),(0,A.jsx)(o.ZP,{item:!0,xs:12,children:(0,A.jsx)(K.Z,{control:(0,A.jsx)(X.Z,{value:l,onChange:function(e){if(e.target.checked){var r=(0,ee.Z)(4);t("password",r),c(!0)}else t("password",""),c(!1)},disabled:n,color:"primary"}),label:"Generar contrase\xf1a"})}),l&&(0,A.jsx)(o.ZP,{item:!0,xs:12,children:(0,A.jsxs)(q.Z,{className:"text__opacity--semi",children:["Contrase\xf1a generada: ",u]})})]})}var ne=n(99507),ae=n(48887);function te(e){var r=e.disabled,n=e.control,a=(0,P.qo)({control:n,name:"privilegio"}),t=(0,z.v9)((function(e){return e.requestStatus.createUser.data})),s=(0,z.I0)(),i=function(){var e=(0,C.Z)((0,b.Z)().mark((function e(r){return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s((0,ae.K)(r));case 2:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return"V-"===a?(0,A.jsx)(o.ZP,{item:!0,xs:12,children:(0,A.jsx)(ne.yh,{data:t,name:"curso_id",label:"Seleccionar un curso",helperText:"Seleccione el curso en el cual desea ingresar al usuario",control:n,disabled:r,getOptionLabel:function(e){return e.code||""},isOptionEqualToValue:function(e,r){return e.code===r.code},handleRequest:i,rules:{required:{value:!0,message:"* Campo requerido"}}})}):null}var se=n(9438),oe=n(48214),ie=n(20310),le=n(19840),ce=n(37661);function de(){var e=(0,z.v9)((function(e){return e.requestStatus.createUser})),r=e.open,n=e.loading,a=(0,z.I0)(),t=(0,P.cI)({shouldUnregister:!0}),s=t.control,l=t.handleSubmit,c=t.setValue,d=t.setError,u=function(){a((0,N.CI)({select:"createUser",open:!1}))},p=function(){var e=(0,C.Z)((0,b.Z)().mark((function e(r){return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.curso_id&&(r.curso_id=r.curso_id.id),e.next=3,a((0,ce.r)({submitData:r,errors:d,handleClose:u}));case 3:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return(0,A.jsxs)(M.Z,{open:r,TransitionComponent:J.Z,children:[(0,A.jsx)(R.Z,{children:"Crear usuario"}),(0,A.jsx)(H.Z,{children:(0,A.jsx)("form",{autoComplete:"off",children:(0,A.jsxs)(o.ZP,{container:!0,spacing:1,children:[(0,A.jsx)(o.ZP,{item:!0,xs:12,children:(0,A.jsx)(oe.H,{control:s,label:"El usuario genera su contrase\xf1a",name:"invitation_mode",color:"primary",disabled:n})}),(0,A.jsx)(o.ZP,{item:!0,xs:12,children:(0,A.jsxs)(ie.g,{name:"privilegio",label:"Tipo de cuenta",control:s,disabled:n,variant:"standard",fullWidth:!0,children:[(0,A.jsx)(W.Z,{value:"",children:(0,A.jsx)("em",{children:"Ninguno"})}),(0,A.jsx)(W.Z,{value:"V-",children:"Estudiante"}),(0,A.jsx)(W.Z,{value:"A-",children:"Administrador"})]})}),(0,A.jsx)(o.ZP,{item:!0,xs:12,children:(0,A.jsx)(le.c,{control:s,rules:{required:"* Campo requerido",minLength:{value:3,message:"Error: Demaciado corto"},maxLength:{value:30,message:"Error: Demaciado largo"}},name:"username",label:"Usuario o c\xe9dula",size:"small",variant:"standard",fullWidth:!0,disabled:n})}),(0,A.jsx)(o.ZP,{item:!0,xs:12,children:(0,A.jsx)(le.c,{control:s,rules:{required:"* Campo requerido",minLength:{value:3,message:"Error: Demaciado corto"},maxLength:{value:90,message:"Error: Demaciado largo"}},name:"name",label:"Nombre y apellido",size:"small",variant:"standard",fullWidth:!0,disabled:n})}),(0,A.jsx)(o.ZP,{item:!0,xs:12,children:(0,A.jsx)(le.c,{control:s,rules:{required:"* Campo requerido",pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Error: Correo no v\xe1lido"}},name:"email",label:"Correo",size:"small",variant:"standard",fullWidth:!0,disabled:n})}),(0,A.jsx)(re,{loading:n,control:s,setValue:c}),(0,A.jsx)(te,{disabled:n,control:s}),(0,A.jsx)(o.ZP,{item:!0,xs:12,children:(0,A.jsx)(B.Z,{children:"Permisos"})}),(0,A.jsx)(se.Z,{disabled:n,control:s,setValue:c})]})})}),(0,A.jsxs)(G.Z,{children:[(0,A.jsx)(oe.H,{control:s,name:"create_more",label:"Crear m\xe1s de uno",labelPlacement:"start",color:"primary",disabled:n}),(0,A.jsx)(i.Z,{sx:{ml:1},disabled:n,onClick:u,color:"inherit",children:"Cancelar"}),(0,A.jsx)(Q.Z,{onClick:l(p),loading:n,variant:"text",color:"inherit",children:"crear"})]})]})}var ue=n(43504),pe=n(50533),he=n(7686);function xe(){var e=(0,z.v9)((function(e){return e.requestStatus.uploadMatricula})),r=e.open,n=e.loading,a=e.progress,s=(0,z.I0)(),l=(0,P.cI)({shouldUnregister:!0}),c=l.handleSubmit,u=l.register,p=l.watch,h=l.formState.errors,x=l.setError,m=function(){s((0,N.CI)({select:"uploadMatricula",open:!1}))};return(0,A.jsxs)(M.Z,{open:r,TransitionComponent:J.Z,children:[(0,A.jsx)(R.Z,{children:"Cargar estudiantes"}),(0,A.jsx)(H.Z,{children:(0,A.jsxs)(o.ZP,{container:!0,rowSpacing:2,children:[(0,A.jsx)(o.ZP,{item:!0,xs:12,children:(0,A.jsxs)(B.Z,{children:["El proceso de carga de matr\xedcula es realizado en segundo plano. Si tienes dudas respecto al formato que debe usar al cargar estudiantes puede ver el formato correcto ",(0,A.jsx)(pe.Z,{color:"primary",onClick:m,component:ue.rU,to:"/gedure/preguntas-frecuentes",children:"aqu\xed"}),"."]})}),(0,A.jsxs)(o.ZP,{container:!0,alignItems:"center",item:!0,xs:12,children:[(0,A.jsx)("input",(0,d.Z)((0,d.Z)({id:"matricula-upload-file"},u("database",{required:{value:!0,message:"* Debe subir un archivo"}})),{},{defaultValue:null,disabled:n,style:{display:"none"},accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv,application/vnd.oasis.opendocument.spreadsheet",type:"file"})),(0,A.jsx)("label",{htmlFor:"matricula-upload-file",children:(0,A.jsx)(i.Z,{variant:"contained",color:Boolean(h.database)?"error":"secondary",component:"span",disabled:n,children:"Cargar archivo"})}),0!==(p("database")||[]).length&&(0,A.jsx)(t.Z,{ml:2,children:(0,A.jsx)(q.Z,{children:"Archivo cargado"})}),Boolean(h.database)&&(0,A.jsx)(t.Z,{ml:2,color:"#f44336",children:(0,A.jsx)(q.Z,{children:h.database.message})})]})]})}),(0,A.jsxs)(G.Z,{children:[(0,A.jsx)(i.Z,{disabled:n,onClick:m,color:"inherit",children:"Cancelar"}),(0,A.jsx)(Q.Z,{onClick:c((function(e){var r=new FormData;r.append("database",e.database[0]),s((0,he.G)({submitData:r,errors:x,handleClose:m}))})),loading:n,loadingIndicator:n&&a<99?"".concat(a,"%"):null,variant:"text",color:"inherit",children:"Cargar"})]})]})}var me=n(39481),fe=n(65479);function Ze(){var e=(0,z.v9)((function(e){return e.requestStatus.updateSeccion})),r=e.open,n=e.loading,t=e.data,s=(0,z.I0)(),l=(0,P.cI)({mode:"onTouched",shouldUnregister:!0}),c=l.handleSubmit,u=l.control,p=U.Y5.map((0,a.useCallback)((function(e,r){return(0,A.jsx)(W.Z,{value:e.value,children:e.label},r)}),[])),h=U.RJ.map((0,a.useCallback)((function(e,r){return(0,A.jsx)(W.Z,{value:e.value,children:e.label},r)}),[]));return(0,A.jsxs)(M.Z,{open:r,TransitionComponent:J.Z,children:[(0,A.jsx)(R.Z,{children:"Cambiar secci\xf3n"}),(0,A.jsx)(H.Z,{children:(0,A.jsxs)(o.ZP,{container:!0,spacing:2,children:[(0,A.jsx)(o.ZP,{item:!0,xs:12,children:(0,A.jsxs)(B.Z,{children:["Ha ",(0,A.jsx)("strong",{children:"seleccionado data.length estudiante(s)"}),", seleccione la secci\xf3n a la que los desea cambiar."]})}),(0,A.jsx)(o.ZP,{item:!0,xs:12,sm:6,children:(0,A.jsxs)(ie.g,{name:"curso",label:"Curso",control:u,disabled:n,variant:"standard",fullWidth:!0,children:[(0,A.jsx)(W.Z,{value:"",children:(0,A.jsx)("em",{children:"Ninguno"})}),p]})}),(0,A.jsx)(o.ZP,{container:!0,item:!0,xs:12,sm:6,children:(0,A.jsxs)(ie.g,{name:"seccion",label:"Secci\xf3n",control:u,disabled:n,variant:"standard",fullWidth:!0,children:[(0,A.jsx)(W.Z,{value:"",children:(0,A.jsx)("em",{children:"Ninguno"})}),h]})})]})}),(0,A.jsxs)(G.Z,{children:[(0,A.jsx)(i.Z,{disabled:n,onClick:function(){s((0,N.CI)({open:!1,select:"updateSeccion"}))},color:"inherit",children:"Cancelar"}),(0,A.jsx)(Q.Z,{loading:n,onClick:c((function(e){s((0,fe.x)((0,d.Z)((0,d.Z)({},e),{},{ids:t,_method:"PUT"})))})),color:"inherit",children:"Cambiar"})]})]})}var ve=n(13967),ge=n(91526);function je(){var e=(0,ve.Z)(),r=[{selector:"",content:function(e){var r=e.goTo;return(0,A.jsxs)("div",{children:[(0,A.jsx)(q.Z,{color:"primary",className:"text__bold--big",variant:"h5",children:"Usuarios"}),(0,A.jsx)(q.Z,{variant:"body1",children:"En esta secci\xf3n podr\xe1 administrar a todos los usuarios del sistema."}),(0,A.jsx)(i.Z,{size:"small",color:"primary",onClick:function(){r(10)},children:"Saltar tour"})]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdUser__create"]',content:function(){return(0,A.jsxs)(q.Z,{variant:"body1",children:["Este bot\xf3n le permite ",(0,A.jsx)("strong",{children:"crear o invitar usuarios"})," al sistema, simplemente rellene todos los campos requeridos para que el sistema pueda agregarlo."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdUser__upload"]',content:function(){return(0,A.jsxs)(q.Z,{variant:"body1",children:["Este bot\xf3n le permite ",(0,A.jsx)("strong",{children:"actualizar"})," la lista de las secciones, ",(0,A.jsx)("strong",{children:"cambiando"})," a un estudiante de secci\xf3n o ",(0,A.jsx)("strong",{children:"creando"})," uno nuevo con solamente cargar una matr\xedcula."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdUser__filters"]',content:function(){return(0,A.jsxs)(q.Z,{variant:"body1",children:["Este bot\xf3n le permitir\xe1 filtrar a los usuarios que desea ver, \xa1incluso podr\xe1 ",(0,A.jsx)("strong",{children:"buscar a estudiantes"})," de una ",(0,A.jsx)("strong",{children:"secci\xf3n en espec\xedfico"}),"!"]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdTable__refresh"]',content:function(){return(0,A.jsxs)(q.Z,{variant:"body1",children:["Este bot\xf3n le permite ",(0,A.jsx)("strong",{children:"refrescar los datos"})," mostrados en la tabla."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdTable__massive"]',content:function(){return(0,A.jsxs)(q.Z,{variant:"body1",children:["Este bot\xf3n le permite usar las ",(0,A.jsx)("strong",{children:"opciones masivas"}),", con lo cual podr\xe1 ",(0,A.jsx)("strong",{children:"seleccionar varios usuarios"})," y realizar distintas acciones como: ",(0,A.jsx)("strong",{children:"Desactivar usuarios"})," y ",(0,A.jsx)("strong",{children:"Cambiar de secci\xf3n a estudiantes"}),"."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdTable__search"]',content:function(){return(0,A.jsxs)(q.Z,{variant:"body1",children:["Aqu\xed podra buscar usuarios por por su ",(0,A.jsx)("strong",{children:"usuario"}),", ",(0,A.jsx)("strong",{children:"nombre"})," o ",(0,A.jsx)("strong",{children:"email"}),"."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdUser__status"]',content:function(){return(0,A.jsxs)(q.Z,{variant:"body1",children:["Esta parte de la tabla mostrar\xe1 el ",(0,A.jsx)("strong",{children:"estado de la cuenta"}),", un usuario es activado \xfanicamente despu\xe9s de rellenar ",(0,A.jsx)("strong",{children:"todos sus datos personales"}),", por ende, haber entrado al sistema."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdUser__show"]',content:function(){return(0,A.jsxs)(q.Z,{variant:"body1",children:["Este bot\xf3n le permite ",(0,A.jsx)("strong",{children:"ver al usuario"}),", mostrando todos sus datos y podiendo modificarlos a su gusto. Tambi\xe9n puede realizar otras acciones referentes a esa cuenta."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdUser__delete"]',content:function(){return(0,A.jsxs)(q.Z,{variant:"body1",children:["Este bot\xf3n le permite ",(0,A.jsx)("strong",{children:"desactivar al usuario"}),", tenga en cuenta que una vez desactivado el mismo ser\xe1 borrado de su curso actual."]})},style:{backgroundColor:e.palette.background.paper}},{selector:"",content:function(){return(0,A.jsx)(q.Z,{variant:"body1",children:"Con esto finaliza esta gu\xeda, navegue entre otras partes del sistema para encontrar m\xe1s gu\xedas."})},style:{backgroundColor:e.palette.background.paper}}];return(0,A.jsx)(ge.Z,{select:"usuarios",steps:r})}var be=n(59250),Ce=n(46986),ye={container:{flexGrow:1,paddingBottom:6,marginTop:{xs:"80px",sm:12}}};function _e(){(0,l.Z)();var e=(0,z.v9)((function(e){return{permissions:e.auth.permissions.administrar,count_notify:e.auth.notify.count}})),r=e.permissions,n=r.users_upload_matricula,a=r.users_create,c=e.count_notify,d=(0,z.I0)();document.title=c>0?"(".concat(c,") Usuarios - La Candelaria"):"Usuarios - La Candelaria";return(0,A.jsxs)(t.Z,{component:"main",sx:ye.container,children:[(0,A.jsxs)(s.Z,{children:[(0,A.jsx)(t.Z,{fontSize:"h4.fontSize",mb:3,className:"text__bold--big",children:"Usuarios"}),(0,A.jsxs)(o.ZP,{container:!0,spacing:2,children:[(0,A.jsxs)(o.ZP,{container:!0,spacing:1,justifyContent:"flex-end",item:!0,xs:12,children:[(0,A.jsx)(o.ZP,{item:!0,children:(0,A.jsx)(i.Z,{disabled:!n,variant:"contained","data-tour":"gdUser__upload",onClick:function(){d((0,N.CI)({select:"uploadMatricula",open:!0}))},sx:{mr:1},children:"Cargar estudiantes"})}),(0,A.jsx)(o.ZP,{item:!0,children:(0,A.jsx)(i.Z,{disabled:!a,variant:"contained","data-tour":"gdUser__create",onClick:function(){d((0,N.CI)({select:"createUser",open:!0}))},children:"Crear usuario"})})]}),(0,A.jsx)(o.ZP,{item:!0,xs:12,children:(0,A.jsx)(F,{})})]}),(0,A.jsx)(de,{}),(0,A.jsx)(xe,{}),(0,A.jsx)(me.Z,{rdx1:"requestStatus",rdx2:"disableUser",close:(0,N.CI)({open:!1,data:{},select:"disableUser"}),request:function(e){return(0,be.B)(e.id)},children:function(e){return(0,A.jsxs)("span",{children:["Est\xe1 a punto de ",(0,A.jsxs)("strong",{children:["desactivar la cuenta ",e.username]}),". Si llega a desactivar una cuenta por accidente puede reactivarla."]})}}),(0,A.jsx)(me.Z,{rdx1:"requestStatus",rdx2:"disableUserMassive",close:(0,N.CI)({open:!1,data:{},select:"disableUserMassive"}),request:function(e){return(0,Ce.$)(e)},children:function(e){return(0,A.jsxs)("span",{children:["Est\xe1 a punto de ",(0,A.jsxs)("strong",{children:["desactivar ",null===e||void 0===e?void 0:e.length," cuenta(s)"]}),". Si llega a desactivar una cuenta por accidente puede reactivarla."]})}}),(0,A.jsx)(Ze,{})]}),(0,A.jsx)(je,{})]})}},27247:function(e,r,n){var a=n(64836);r.Z=void 0;var t=a(n(45649)),s=n(80184),o=(0,t.default)((0,s.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");r.Z=o},40501:function(e,r,n){var a=n(64836);r.Z=void 0;var t=a(n(45649)),s=n(80184),o=(0,t.default)((0,s.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");r.Z=o}}]);
//# sourceMappingURL=71.39145800.chunk.js.map