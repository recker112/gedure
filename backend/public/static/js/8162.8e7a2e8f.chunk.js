"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[8162],{76429:function(e,n,a){var r=a(1413),t=a(72791),l=a(55931),i=a(80184),o=t.forwardRef((function(e,n){return(0,i.jsx)(l.Z,(0,r.Z)({direction:"up",ref:n},e))}));n.Z=o},39481:function(e,n,a){a.d(n,{Z:function(){return h}});a(72791);var r=a(5574),t=a(65661),l=a(39157),i=a(51691),o=a(97123),s=a(24518),c=a(76429),d=a(16030),u=a(39709),m=a(80184);function h(e){var n=e.rdx1,a=e.rdx2,h=e.close,p=e.request,x=e.children,f=(0,d.v9)((function(e){return e[n][a]})),g=f.open,Z=f.loading,v=f.data,j=(0,d.I0)();return(0,m.jsxs)(r.Z,{open:g,TransitionComponent:c.Z,"aria-labelledby":"confirm-dialog-title","aria-describedby":"confirm-dialog-description",children:[(0,m.jsx)(t.Z,{children:"\xbfEst\xe1 seguro?"}),(0,m.jsx)(l.Z,{children:(0,m.jsx)(i.Z,{id:"confirm-dialog-description",children:x(v)})}),(0,m.jsxs)(o.Z,{children:[(0,m.jsx)(s.Z,{disabled:Z,onClick:function(){j(h)},color:"inherit",children:"Cancelar"}),(0,m.jsx)(u.Z,{onClick:function(){j(p(v))},loading:Z,color:"inherit",children:"Confirmar"})]})]})}},70825:function(e,n,a){a.d(n,{Z:function(){return L}});var r=a(1413),t=a(93433),l=a(72791),i=a(61889),o=a(10703),s=a(52739),c=a(13239),d=a(34663),u=a(20890),m=a(20068),h=a(13400),p=a(39281),x=a(68870),f=a(79836),g=a(56890),Z=a(35855),v=a(53994),j=a(53382),b=a(68582),C=a(12674),T=a(23786),P=a(12065),k=a(12715),B=a(2156),q=a(98333),S=a(10111),_=a(78243),z=a(43950),E=a(71358),A=a(29439),I=a(48550),y=a(63466),V=a(5403),w=a(5130),O=a(80184);function F(e){var n=e.state,a=e.setGlobalFilter,r=e.gotoPage,t=(0,l.useState)(n.globalFilter),i=(0,A.Z)(t,2),o=i[0],s=i[1],c=(0,E.useAsyncDebounce)((function(e){a(e||void 0),r(0)}),500);return(0,O.jsx)(I.Z,{"data-tour":"gdTable__search",size:"small",value:o||"",placeholder:"Buscar...",variant:"standard",onChange:function(e){c(e.target.value),s(e.target.value)},sx:{mr:1},InputProps:{startAdornment:(0,O.jsx)(y.Z,{position:"start",children:(0,O.jsx)(V.Z,{})}),endAdornment:(0,O.jsx)(h.Z,{disabled:!o,onClick:function(){s(""),a(void 0),r(0)},children:(0,O.jsx)(w.Z,{})})}})}var R=a(45987),D=a(94454),H=["indeterminate"],N=l.forwardRef((function(e,n){var a=e.indeterminate,t=(0,R.Z)(e,H),i=l.useRef(),o=n||i;return l.useEffect((function(){o.current.indeterminate=a}),[o,a]),(0,O.jsx)(D.Z,(0,r.Z)({type:"checkbox",ref:o,indeterminate:a,color:a?"default":"primary"},t))}));function L(e){var n=e.data,a=e.columns,A=e.pageSizeData,I=e.pageCountData,y=e.loading,V=e.handleGlobalFilter,w=e.handleChange,R=e.filter,D=e.massiveOptions,H=e.title,L=e.refresh,W=(0,E.useTable)({columns:a,data:n,initialState:{hiddenColumns:["massiveSelection"],pageSize:A,pageIndex:0},manualPagination:!0,pageCount:I},E.useGlobalFilter,E.usePagination,E.useRowSelect,(function(e){e.visibleColumns.push((function(e){return[{id:"massiveSelection",Header:function(e){var n=e.getToggleAllRowsSelectedProps;return(0,O.jsx)(N,(0,r.Z)({},n()))},Cell:function(e){var n=e.row;return(0,O.jsx)(N,(0,r.Z)({},n.getToggleRowSelectedProps()))}}].concat((0,t.Z)(e))}))})),M=W.getTableProps,G=W.getTableBodyProps,J=W.headerGroups,Q=W.page,U=W.prepareRow,Y=W.state,$=W.selectedFlatRows,K=W.allColumns,X=W.canPreviousPage,ee=W.canNextPage,ne=W.nextPage,ae=W.previousPage,re=W.setPageSize,te=W.pageOptions,le=W.gotoPage,ie=W.pageCount,oe=Y.pageIndex,se=Y.pageSize;return(0,l.useEffect)((function(){w({pageIndex:oe,pageSize:se})}),[oe,se]),(0,O.jsx)(i.ZP,{container:!0,spacing:2,children:(0,O.jsx)(i.ZP,{item:!0,xs:12,children:(0,O.jsxs)(o.Z,{sx:{position:"relative"},children:[(0,O.jsx)(s.Z,{sx:{color:"#fff",zIndex:function(e){return e.zIndex.appBar-1},position:"absolute"},open:y,children:(0,O.jsx)(c.Z,{})}),(0,O.jsxs)(d.Z,{sx:(0,r.Z)({},$.length>0&&{bgcolor:function(e){return(0,P.Fq)(e.palette.primary.main,e.palette.action.activatedOpacity)}}),children:[$.length>0?(0,O.jsxs)(u.Z,{sx:{flex:"1 1 100%"},color:"inherit",variant:"subtitle1",component:"div",noWrap:!0,children:[$.length," seleccionada(s)"]}):(0,O.jsx)(u.Z,{sx:{flex:"1 1 100%"},variant:"h6",id:"registros",component:"div",noWrap:!0,children:H}),(0,O.jsx)(F,{state:Y,setGlobalFilter:V,gotoPage:le}),$.length>0?D($.map((function(e){return e.original}))):(0,O.jsxs)(O.Fragment,{children:[D&&(0,O.jsx)(m.Z,{title:"Opciones massivas",arrow:!0,children:(0,O.jsx)(h.Z,{component:"span",onClick:function(){K.map((function(e){return("massiveSelection"===e.id||"options"===e.id)&&e.toggleHidden(),null}))},"data-tour":"gdTable__massive",disabled:$.length>0,children:(0,O.jsx)(_.Z,{})})}),(0,O.jsx)(m.Z,{title:"Recargar",arrow:!0,children:(0,O.jsx)(h.Z,{component:"span",onClick:L,"data-tour":"gdTable__refresh",children:(0,O.jsx)(z.Z,{})})}),R]})]}),(0,O.jsxs)(p.Z,{children:[(0,O.jsx)(x.Z,{overflow:"auto",minWidth:352,children:(0,O.jsxs)(f.Z,(0,r.Z)((0,r.Z)({sx:{minWidth:650},"aria-label":"React Table"},M()),{},{children:[(0,O.jsx)(g.Z,{sx:{th:{border:0}},children:J.map((function(e){return(0,O.jsx)(Z.Z,(0,r.Z)((0,r.Z)({sx:{td:{border:0}}},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return"massiveSelection"===e.id?(0,O.jsx)(v.Z,(0,r.Z)((0,r.Z)({padding:"checkbox"},e.getHeaderProps()),{},{children:e.render("Header")})):"Opciones"===e.Header?(0,O.jsx)(v.Z,(0,r.Z)((0,r.Z)({align:"right"},e.getHeaderProps()),{},{children:e.render("Header")})):(0,O.jsx)(v.Z,(0,r.Z)((0,r.Z)({},e.getHeaderProps()),{},{children:e.render("Header")}))}))}))}))}),(0,O.jsxs)(j.Z,(0,r.Z)((0,r.Z)({},G()),{},{children:[Q.map((function(e){return U(e),(0,O.jsx)(Z.Z,(0,r.Z)((0,r.Z)({sx:{height:"73px"}},e.getRowProps()),{},{children:e.cells.map((function(e){return"massiveSelection"===e.column.id?(0,O.jsx)(v.Z,(0,r.Z)((0,r.Z)({padding:"checkbox"},e.getCellProps()),{},{children:e.render("Cell")})):"Opciones"===e.column.Header?(0,O.jsx)(v.Z,(0,r.Z)((0,r.Z)({align:"right"},e.getCellProps()),{},{children:e.render("Cell")})):(0,O.jsx)(v.Z,(0,r.Z)((0,r.Z)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))})),0===Q.length&&(0,O.jsx)(Z.Z,{children:(0,O.jsx)(v.Z,{colSpan:"100%",children:(0,O.jsx)(u.Z,{textAlign:"center",children:"No se han encontrado resultados"})})})]}))]}))}),(0,O.jsx)(x.Z,{overflow:"auto",minWidth:352,children:(0,O.jsx)(f.Z,{children:(0,O.jsx)(b.Z,{children:(0,O.jsx)(Z.Z,{children:(0,O.jsx)(v.Z,{colSpan:"100%",sx:{border:0},children:(0,O.jsxs)(i.ZP,{container:!0,justifyContent:"flex-end",alignItems:"center",spacing:1,item:!0,xs:12,children:[(0,O.jsx)(i.ZP,{item:!0,children:(0,O.jsx)(C.Z,{labelId:"page-size-table-label",id:"page-size-table",value:se,label:"Filas",variant:"standard",onChange:function(e){re(Number(e.target.value))},children:[5,10,20,30,40,50].map((function(e){return(0,O.jsxs)(T.Z,{value:e,children:[e," Filas"]},e)}))})}),(0,O.jsx)(i.ZP,{item:!0,children:(0,O.jsx)(m.Z,{title:"Primera p\xe1gina",arrow:!0,children:(0,O.jsx)(h.Z,{component:"span",onClick:function(){return le(0)},disabled:!X,children:(0,O.jsx)(k.Z,{})})})}),(0,O.jsx)(i.ZP,{item:!0,children:(0,O.jsx)(m.Z,{title:"Anterior",arrow:!0,children:(0,O.jsx)(h.Z,{component:"span",onClick:ae,disabled:!X,children:(0,O.jsx)(B.Z,{})})})}),(0,O.jsx)(i.ZP,{item:!0,children:(0,O.jsxs)(x.Z,{component:"span",fontSize:"body2.fontSize",color:"text.secondary",children:[oe+1," de ",te.length]})}),(0,O.jsx)(i.ZP,{item:!0,children:(0,O.jsx)(m.Z,{title:"Siguiente",arrow:!0,children:(0,O.jsx)(h.Z,{component:"span",onClick:ne,disabled:!ee,children:(0,O.jsx)(q.Z,{})})})}),(0,O.jsx)(i.ZP,{item:!0,children:(0,O.jsx)(m.Z,{title:"\xdaltima p\xe1gina",arrow:!0,children:(0,O.jsx)(h.Z,{component:"span",onClick:function(){return le(ie-1)},disabled:!ee,children:(0,O.jsx)(S.Z,{})})})})]})})})})})})]})]})})})}},2183:function(e,n,a){a.d(n,{P:function(){return t},S:function(){return r}});var r=[{value:"0102",label:"Banco de Venezuela"},{value:"0104",label:"Venezolano de Cr\xe9dito"},{value:"0105",label:"Mercantil"},{value:"0108",label:"Provincial"},{value:"0114",label:"Bancaribe"},{value:"0115",label:"Exterior"},{value:"0116",label:"Occidental de Descuento"},{value:"0128",label:"Banco Caron\xed"},{value:"0134",label:"Banesco"},{value:"0138",label:"Banco Plaza"},{value:"0151",label:"BFC Banco Fondo Com\xfan"},{value:"0156",label:"100% Banco"},{value:"0157",label:"Delsur"},{value:"0163",label:"Banco del Tesoro"},{value:"0166",label:"Banco Agr\xedcola de Venezuela"},{value:"0168",label:"Bancrecer"},{value:"0169",label:"Mi Banco"},{value:"0171",label:"Banco Activo"},{value:"0172",label:"Bancamiga"},{value:"0174",label:"Banplus"},{value:"0175",label:"Bicentenario del Pueblo"},{value:"0177",label:"Banfanb"},{value:"0191",label:"BNC Nacional de Cr\xe9dito"}],t={"0102":"Banco de Venezuela","0104":"Venezolano de Cr\xe9dito","0105":"Mercantil","0108":"Provincial","0114":"Bancaribe","0115":"Exterior","0116":"Occidental de Descuento","0128":"Banco Caron\xed","0134":"Banesco","0138":"Banco Plaza","0151":"BFC Banco Fondo Com\xfan","0156":"100% Banco","0157":"Delsur","0163":"Banco del Tesoro","0166":"Banco Agr\xedcola de Venezuela","0168":"Bancrecer","0169":"Mi Banco","0171":"Banco Activo","0172":"Bancamiga","0174":"Banplus","0175":"Bicentenario del Pueblo","0177":"Banfanb","0191":"BNC Nacional de Cr\xe9dito"}},19840:function(e,n,a){a.d(n,{c:function(){return d}});var r=a(1413),t=a(45987),l=a(48550),i=a(61134),o=a(80184),s=["name","control","rules","defaultValue","helperText"],c=["ref"];function d(e){var n=e.name,a=e.control,d=e.rules,u=void 0===d?null:d,m=e.defaultValue,h=void 0===m?"":m,p=e.helperText,x=void 0===p?"":p,f=(0,t.Z)(e,s),g=(0,i.bc)({name:n,control:a,rules:u,defaultValue:h}),Z=g.field,v=Z.ref,j=(0,t.Z)(Z,c),b=g.fieldState,C=b.invalid,T=b.error;return(0,o.jsx)(l.Z,(0,r.Z)((0,r.Z)((0,r.Z)({inputRef:v},j),f),{},{error:C,helperText:T?T.message:x}))}},18493:function(e,n,a){a.d(n,{Q:function(){return f}});var r=a(1413),t=a(29439),l=a(45987),i=a(72791),o=a(48550),s=a(63466),c=a(13400),d=a(3746),u=a(20165),m=a(61134),h=a(80184),p=["name","control","rules","defaultValue","helperText"],x=["ref"];function f(e){var n=e.name,a=e.control,f=e.rules,g=void 0===f?null:f,Z=e.defaultValue,v=void 0===Z?"":Z,j=e.helperText,b=void 0===j?"":j,C=(0,l.Z)(e,p),T=(0,i.useState)(!1),P=(0,t.Z)(T,2),k=P[0],B=P[1],q=(0,m.bc)({name:n,control:a,rules:g,defaultValue:v}),S=q.field,_=S.ref,z=(0,l.Z)(S,x),E=q.fieldState,A=E.invalid,I=E.error;return(0,h.jsx)(o.Z,(0,r.Z)((0,r.Z)((0,r.Z)({inputRef:_},z),C),{},{error:A,helperText:I?I.message:b,type:k?"text":"password",InputProps:{endAdornment:(0,h.jsx)(s.Z,{position:"end",children:(0,h.jsx)(c.Z,{onClick:function(){B(!k)},size:null===C||void 0===C?void 0:C.size,children:k?(0,h.jsx)(u.Z,{}):(0,h.jsx)(d.Z,{})})})}}))}},99507:function(e,n,a){a.d(n,{yh:function(){return k},mX:function(){return Z},cl:function(){return r.c},gT:function(){return m},Q:function(){return h.Q}});var r=a(19840),t=a(1413),l=a(45987),i=a(48550),o=a(61134),s=a(30948),c=a(80184),d=["name","control","rules","defaultValue","helperText"],u=["ref","onChange","value"];function m(e){var n=e.name,a=e.control,r=e.rules,m=void 0===r?null:r,h=e.defaultValue,p=void 0===h?"":h,x=e.helperText,f=void 0===x?"":x,g=(0,l.Z)(e,d),Z=(0,o.bc)({name:n,control:a,rules:m,defaultValue:p}),v=Z.field,j=(v.ref,v.onChange),b=v.value,C=(0,l.Z)(v,u),T=Z.fieldState,P=T.invalid,k=T.error;return(0,c.jsx)(s.Z,(0,t.Z)((0,t.Z)((0,t.Z)({},g),C),{},{value:Number(b)||"",customInput:i.Z,error:P,onValueChange:function(e){j((null===e||void 0===e?void 0:e.value)||"")},helperText:k?k.message:f,mask:"_"}))}var h=a(18493),p=a(92343),x=a(72791),f=["multiple","options","name","control","defaultValue","rules","isOptionEqualToValue","getOptionLabel","helperText","disabled"],g=["ref","onChange"];function Z(e){var n=e.multiple,a=e.options,r=e.name,s=e.control,d=e.defaultValue,u=e.rules,m=void 0===u?{required:"* Campo requerido"}:u,h=e.isOptionEqualToValue,x=e.getOptionLabel,Z=e.helperText,v=e.disabled,j=(0,l.Z)(e,f),b=(0,o.bc)({name:r,control:s,rules:m,defaultValue:d}),C=b.field,T=C.ref,P=C.onChange,k=(0,l.Z)(C,g),B=b.fieldState,q=B.invalid,S=B.error;return(0,c.jsx)(p.Z,(0,t.Z)((0,t.Z)({},k),{},{onChange:function(e,n){P(n)},multiple:n,options:a,noOptionsText:"No hay resultados",getOptionLabel:x,isOptionEqualToValue:h,disabled:v,renderInput:function(e){return(0,c.jsx)(i.Z,(0,t.Z)((0,t.Z)((0,t.Z)({},e),j),{},{inputRef:T,error:q,helperText:S?S.message:Z}))}}))}var v=a(74165),j=a(15861),b=a(29439),C=a(13239);var T=["name","control","rules","data","defaultValue","helperText","getOptionLabel","isOptionEqualToValue","multiple","handleRequest","disabled","renderOption","renderTags","limitTags"],P=["ref","onChange"];function k(e){var n=e.name,a=e.control,r=e.rules,s=void 0===r?null:r,d=e.data,u=void 0===d?[]:d,m=e.defaultValue,h=void 0===m?"":m,f=e.helperText,g=void 0===f?"":f,Z=e.getOptionLabel,k=e.isOptionEqualToValue,B=e.multiple,q=e.handleRequest,S=e.disabled,_=e.renderOption,z=e.renderTags,E=e.limitTags,A=(0,l.Z)(e,T),I=(0,x.useState)(!1),y=(0,b.Z)(I,2),V=y[0],w=y[1],O=(0,x.useState)([]),F=(0,b.Z)(O,2),R=F[0],D=F[1],H=(0,x.useState)(""),N=(0,b.Z)(H,2),L=N[0],W=N[1],M=(0,x.useState)(!0),G=(0,b.Z)(M,2),J=G[0],Q=G[1],U=J&&V&&0===R.length,Y=(0,o.bc)({name:n,control:a,rules:s,defaultValue:h}),$=Y.field,K=$.ref,X=$.onChange,ee=(0,l.Z)($,P),ne=Y.fieldState.error;(0,x.useEffect)((function(){var e=!0,n=function(){var e=(0,j.Z)((0,v.Z)().mark((function e(){return(0,v.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,q(L);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(U)return e&&n(),function(){e=!1}}),[U]),(0,x.useEffect)((function(){V||(D([]),Q(!0))}),[V]),(0,x.useEffect)((function(){null!==u&&(D(u),Q(!1))}),[u]);var ae=(0,x.useCallback)(function(e,n){var a;return function(){for(var r=arguments.length,t=new Array(r),l=0;l<r;l++)t[l]=arguments[l];clearTimeout(a),a=setTimeout((function(){return e.apply(void 0,t)}),n)}}((function(){D([]),Q(!0)}),500),[]);return(0,c.jsx)(p.Z,{multiple:B,id:"autocomplete-".concat(n),options:R,open:V,onOpen:function(){w(!0),Q(!0)},onClose:function(){w(!1)},onChange:function(e,n){X(n)},inputValue:L,onInputChange:function(e,n){W(n),"change"===(null===e||void 0===e?void 0:e.type)&&ae()},getOptionLabel:Z,isOptionEqualToValue:k,loading:U,loadingText:"Cargando...",noOptionsText:"No hay resultados",renderTags:z,disabled:S,renderOption:_,limitTags:E,renderInput:function(e){return(0,c.jsx)(i.Z,(0,t.Z)((0,t.Z)((0,t.Z)((0,t.Z)({},e),ee),A),{},{inputRef:K,error:Boolean(ne),helperText:ne?ne.message:g,InputProps:(0,t.Z)((0,t.Z)({},e.InputProps),{},{endAdornment:(0,c.jsxs)(x.Fragment,{children:[U?(0,c.jsx)(C.Z,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})})}))}})}},20310:function(e,n,a){a.d(n,{g:function(){return h}});var r=a(1413),t=a(45987),l=(a(72791),a(68096)),i=a(30829),o=a(12674),s=a(47071),c=a(61134),d=a(80184),u=["name","label","control","helperText","defaultValue","rules","children"],m=["ref"];function h(e){var n=e.name,a=e.label,h=e.control,p=e.helperText,x=void 0===p?"":p,f=e.defaultValue,g=void 0===f?"":f,Z=e.rules,v=void 0===Z?{required:"* Campo requerido"}:Z,j=e.children,b=(0,t.Z)(e,u),C=(0,c.bc)({name:n,control:h,rules:v,defaultValue:g}),T=C.field,P=(T.ref,(0,t.Z)(T,m)),k=C.fieldState,B=k.invalid,q=k.error;return(0,d.jsxs)(l.Z,(0,r.Z)((0,r.Z)({},b),{},{error:B,children:[(0,d.jsx)(i.Z,{id:n+"-label",children:a}),(0,d.jsx)(o.Z,(0,r.Z)((0,r.Z)({labelId:n+"-label",label:a,id:n},P),{},{children:j})),(0,d.jsx)(s.Z,{children:q?q.message:x})]}))}},48214:function(e,n,a){a.d(n,{H:function(){return u}});var r=a(1413),t=a(45987),l=(a(72791),a(85523)),i=a(9955),o=a(61134),s=a(80184),c=["label","name","control","defaultValue","labelPlacement"],d=["ref","onChange","value"];function u(e){var n=e.label,a=e.name,u=e.control,m=e.defaultValue,h=void 0!==m&&m,p=e.labelPlacement,x=void 0===p?"end":p,f=(0,t.Z)(e,c),g=(0,o.bc)({name:a,control:u,defaultValue:h}).field,Z=g.ref,v=g.onChange,j=g.value,b=(0,t.Z)(g,d);return(0,s.jsx)(l.Z,{control:(0,s.jsx)(i.Z,(0,r.Z)((0,r.Z)((0,r.Z)({},f),b),{},{inputRef:Z,onChange:function(e){return v(e.currentTarget.checked)},checked:j})),label:n,sx:{userSelect:"none"},labelPlacement:x})}},88162:function(e,n,a){a.r(n),a.d(n,{default:function(){return ae}});var r=a(72791),t=a(61889),l=a(23786),i=a(10703),o=a(20890),s=a(61134),c=a(99507),d=a(20310),u=a(2183),m=a(39709),h=a(16030),p=a(71149),x=a(80184);function f(){var e=(0,h.v9)((function(e){return e.requestStatus.createBankAccount.loading})),n=(0,h.I0)(),a=(0,s.cI)(),f=a.control,g=a.handleSubmit,Z=a.setError,v=u.S.map((0,r.useCallback)((function(e,n){return(0,x.jsx)(l.Z,{value:e.value,children:e.label},n)}),[]));return(0,x.jsx)(i.Z,{component:"form",autoComplete:"off",className:"paper--padding",children:(0,x.jsxs)(t.ZP,{container:!0,spacing:2,children:[(0,x.jsx)(t.ZP,{item:!0,xs:12,children:(0,x.jsx)(o.Z,{variant:"h6",className:"text__bold--semi",children:"Crear cuenta bancaria"})}),(0,x.jsx)(t.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,x.jsx)(c.gT,{control:f,rules:{required:"* Campo requerido",minLength:{value:20,message:"Error: Cuenta no v\xe1lida"},maxLength:{value:20,message:"Error: Cuenta no v\xe1lida"}},name:"n_account",label:"N\xb0 de cuenta",fullWidth:!0,size:"small",disabled:e,format:"#### #### #### #### ####"})}),(0,x.jsx)(t.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,x.jsx)(c.gT,{control:f,rules:{required:"* Campo requerido",minLength:{value:9,message:"Error: RIF no v\xe1lida"},maxLength:{value:9,message:"Error: RIF no v\xe1lida"}},name:"rif",label:"RIF",fullWidth:!0,size:"small",disabled:e,format:"J-########-#"})}),(0,x.jsx)(t.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,x.jsx)(c.cl,{control:f,rules:{required:"* Campo requerido",minLength:{value:6,message:"Error: Demaciado corto"},maxLength:{value:100,message:"Error: Demaciado largo"}},name:"name",label:"Nombre",size:"small",fullWidth:!0,disabled:e})}),(0,x.jsx)(t.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,x.jsx)(c.cl,{control:f,rules:{required:"* Campo requerido",pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Error: Correo no v\xe1lido"}},name:"email",label:"Correo",size:"small",fullWidth:!0,disabled:e})}),(0,x.jsx)(t.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,x.jsxs)(d.g,{name:"type",label:"Tipo de cuenta",control:f,size:"small",disabled:e,fullWidth:!0,children:[(0,x.jsx)(l.Z,{value:"",children:(0,x.jsx)("em",{children:"Ninguno"})}),(0,x.jsx)(l.Z,{value:"ahorro",children:"Ahorro"}),(0,x.jsx)(l.Z,{value:"corriente",children:"Corriente"})]})}),(0,x.jsx)(t.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,x.jsxs)(d.g,{name:"code",label:"Banco",control:f,disabled:e,size:"small",fullWidth:!0,children:[(0,x.jsx)(l.Z,{value:"",children:(0,x.jsx)("em",{children:"Ninguno"})}),v]})}),(0,x.jsx)(t.ZP,{container:!0,justifyContent:"flex-end",item:!0,xs:12,children:(0,x.jsx)(m.Z,{variant:"contained",loading:e,disableElevation:!0,onClick:g((function(e){n((0,p.p)({submitData:e,setError:Z}))})),children:"Agregar"})})]})})}var g=a(37762),Z=a(1413),v=a(20068),j=a(13400),b=a(60383),C=a(41286),T=a(70825),P=a(5736),k=a(54895),B=a(15728),q=a(6728);function S(){var e=(0,h.v9)((function(e){return{dataR:e.tables.bankAccounts.tableData.data,loading:e.tables.bankAccounts.tableData.loading,pageSize:e.tables.bankAccounts.tableData.pageSize,pageCount:e.tables.bankAccounts.tableData.pageCount,gedure:e.auth.permissions.gedure}})),n=e.dataR,a=e.loading,t=e.pageSize,l=e.pageCount,i=e.gedure,o=i.bank_transaction_assign,s=i.bank_transaction_delete,c=(0,h.I0)(),d=(0,r.useMemo)((function(){return[{Header:"N\xb0 cuenta",accessor:"n_account",Cell:function(e){var n=e.cell.row.original.n_account;return(0,P.Y)(n)}},{Header:"Nombre",accessor:"name"},{Header:"Correo",accessor:"email"},{Header:"Tipo",accessor:"type"},{Header:"Banco",accessor:"code",Cell:function(e){var n=e.cell.row.original.code;return u.P[n]||"No especificado"}},{id:"options",Header:"Opciones",accessor:"options",Cell:function(e){var n=e.cell.row.original,a=n.id,r=n.n_account,t=n.rif,l=n.name,i=n.email,d=n.type,u=n.code;return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(v.Z,{title:"Editar",arrow:!0,children:(0,x.jsx)(j.Z,{component:"span",disabled:!o,onClick:function(){c((0,q.CI)({open:!0,data:{id:a,n_account:r,rif:t,name:l,email:i,type:d,code:u},select:"editBankAccount"}))},children:(0,x.jsx)(C.Z,{})})}),(0,x.jsx)(v.Z,{title:"Eliminar",arrow:!0,children:(0,x.jsx)(j.Z,{component:"span",disabled:!s,onClick:function(){c((0,q.CI)({open:!0,data:{id:a,n_account:r},select:"deleteBankAccount"}))},children:(0,x.jsx)(b.Z,{})})})]})}}]}),[]),m=(0,r.useMemo)((function(){return n}),[n]);(0,r.useEffect)((function(){var e=null;return a&&(e=c((0,k.T)())),function(){a&&e.abort()}}),[a]),(0,r.useEffect)((function(){return function(){c((0,B.AF)({select:"bankAccounts"}))}}),[]);return(0,x.jsx)(T.Z,{title:"Cuentas bancarias",data:m,columns:d,pageCountData:l,pageSizeData:t,loading:a,handleGlobalFilter:function(e){c((0,B.qP)({search:e||"",select:"bankAccounts"}))},handleChange:function(e){c((0,B.ai)((0,Z.Z)((0,Z.Z)({},e),{},{select:"bankAccounts"})))},refresh:function(){c((0,B.bi)({select:"bankAccounts"}))},massiveOptions:function(e){return(0,x.jsx)(x.Fragment,{children:(0,x.jsx)(v.Z,{title:"Eliminar",arrow:!0,children:(0,x.jsx)(j.Z,{component:"span",disabled:!s,onClick:function(){var n,a=0,r=[],t=(0,g.Z)(e);try{for(t.s();!(n=t.n()).done;){var l=n.value;r[a]=l.id,a++}}catch(i){t.e(i)}finally{t.f()}c((0,q.CI)({select:"deleteBankAccountMassive",open:!0,data:r}))},children:(0,x.jsx)(b.Z,{})})})})}})}var _=a(39481),z=a(5574),E=a(65661),A=a(39157),I=a(97123),y=a(24518),V=a(48214),w=a(76429),O=a(56984);function F(){var e=(0,h.v9)((function(e){return e.requestStatus.editBankAccount})),n=e.data,a=e.open,i=e.loading,o=(0,h.I0)(),p=(0,s.cI)({shouldUnregister:!0}),f=p.control,g=p.handleSubmit,Z=p.watch,v=p.setError,j=u.S.map((0,r.useCallback)((function(e,n){return(0,x.jsx)(l.Z,{value:e.value,children:e.label},n)}),[]));return(0,x.jsxs)(z.Z,{open:a,TransitionComponent:w.Z,children:[(0,x.jsxs)(E.Z,{children:["Editar cuenta bancaria #",n.id]}),(0,x.jsx)(A.Z,{children:(0,x.jsx)("form",{autoComplete:"off",children:(0,x.jsxs)(t.ZP,{container:!0,spacing:2,children:[!0===Z("important_data")&&(0,x.jsx)(t.ZP,{item:!0,xs:12,children:(0,x.jsx)(c.gT,{control:f,rules:{required:"* Campo requerido",minLength:{value:20,message:"Error: Cuenta no v\xe1lida"},maxLength:{value:20,message:"Error: Cuenta no v\xe1lida"}},name:"n_account",label:"N\xb0 de cuenta",fullWidth:!0,size:"small",variant:"standard",disabled:i,defaultValue:n.n_account,format:"#### #### #### #### ####"})}),(0,x.jsx)(t.ZP,{item:!0,xs:12,children:(0,x.jsx)(c.gT,{control:f,rules:{required:"* Campo requerido",minLength:{value:9,message:"Error: RIF no v\xe1lida"},maxLength:{value:9,message:"Error: RIF no v\xe1lida"}},name:"rif",label:"RIF",fullWidth:!0,size:"small",variant:"standard",disabled:i,defaultValue:n.rif,format:"J-########-#"})}),(0,x.jsx)(t.ZP,{item:!0,xs:12,children:(0,x.jsx)(c.cl,{control:f,rules:{required:"* Campo requerido",minLength:{value:6,message:"Error: Demaciado corto"},maxLength:{value:100,message:"Error: Demaciado largo"}},name:"name",label:"Nombre",size:"small",variant:"standard",fullWidth:!0,disabled:i,defaultValue:n.name})}),(0,x.jsx)(t.ZP,{item:!0,xs:12,children:(0,x.jsx)(c.cl,{control:f,rules:{required:"* Campo requerido",pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Error: Correo no v\xe1lido"}},name:"email",label:"Correo",size:"small",variant:"standard",fullWidth:!0,disabled:i,defaultValue:n.email})}),(0,x.jsx)(t.ZP,{item:!0,xs:12,children:(0,x.jsxs)(d.g,{name:"type",label:"Tipo de cuenta",control:f,disabled:i,size:"small",variant:"standard",fullWidth:!0,defaultValue:n.type,children:[(0,x.jsx)(l.Z,{value:"",children:(0,x.jsx)("em",{children:"Ninguno"})}),(0,x.jsx)(l.Z,{value:"ahorro",children:"Ahorro"}),(0,x.jsx)(l.Z,{value:"corriente",children:"Corriente"})]})}),(0,x.jsx)(t.ZP,{item:!0,xs:12,children:(0,x.jsxs)(d.g,{name:"code",label:"Banco",control:f,disabled:i,size:"small",variant:"standard",fullWidth:!0,defaultValue:n.code,children:[(0,x.jsx)(l.Z,{value:"",children:(0,x.jsx)("em",{children:"Ninguno"})}),j]})})]})})}),(0,x.jsxs)(I.Z,{children:[(0,x.jsx)(V.H,{control:f,name:"important_data",label:"Modificar campos importantes",labelPlacement:"start",color:"primary",disabled:i}),(0,x.jsx)(y.Z,{sx:{ml:1},color:"inherit",disabled:i,onClick:function(){o((0,q.CI)({open:!1,data:{},select:"editBankAccount"}))},children:"Cancelar"}),(0,x.jsx)(m.Z,{onClick:g((function(e){e.id=n.id,e._method="PUT",o((0,O.s)({submitData:e,setError:v}))})),loading:i,variant:"text",color:"inherit",children:"Actualizar"})]})]})}var R=a(74165),D=a(15861),H=a(68870),N=a(14890),L=a(13801);function W(){var e,n=(0,h.v9)((function(e){return e.requestStatus.uploadTransactions})),a=n.autoComplete,r=n.loading,l=n.progress,d=(0,h.I0)(),u=(0,s.cI)({mode:"onTouched"}),p=u.register,f=u.control,g=u.handleSubmit,v=u.watch,j=u.formState.errors,b=function(){var e=(0,D.Z)((0,R.Z)().mark((function e(n){return(0,R.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d((0,N.J)(n));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,x.jsx)(i.Z,{component:"form",autoComplete:"off",className:"paper--padding",children:(0,x.jsxs)(t.ZP,{container:!0,spacing:2,children:[(0,x.jsx)(t.ZP,{item:!0,xs:12,children:(0,x.jsx)(o.Z,{variant:"h6",className:"text__bold--semi",children:"Cargar transacciones bancarias"})}),(0,x.jsx)(t.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,x.jsx)(c.yh,{data:a,name:"selected",label:"Buscar cuenta bancaria",helperText:"Busque la cuenta bancaria a la cual desea cargar las transferencias",control:f,disabled:r,getOptionLabel:function(e){return(0,P.Y)(e.n_account)||""},isOptionEqualToValue:function(e,n){return e.n_account===n.n_account},handleRequest:b,rules:{required:{value:!0,message:"* Campo requerido"}}})}),(0,x.jsxs)(t.ZP,{item:!0,xs:12,children:[(0,x.jsx)("input",(0,Z.Z)((0,Z.Z)({id:"upload-transactions"},p("transactions",{required:"* Debe subir un archivo"})),{},{defaultValue:null,style:{display:"none"},accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv,application/vnd.oasis.opendocument.spreadsheet",type:"file"})),(0,x.jsx)("label",{htmlFor:"upload-transactions",children:(0,x.jsx)(y.Z,{variant:"contained",color:Boolean(j.transactions)?"error":"primary",disableElevation:!0,component:"span",children:"Cargar archivo"})}),Boolean(j.transactions)&&(0,x.jsx)(H.Z,{fontSize:"body1.fontSize",component:"span",ml:2,color:"#f44336",children:j.transactions.message}),0!==((null===(e=v("transactions"))||void 0===e?void 0:e.length)||[]).length&&(0,x.jsx)(H.Z,{fontSize:"body1.fontSize",component:"span",ml:2,children:"Archivo cargado"})]}),(0,x.jsx)(t.ZP,{container:!0,justifyContent:"flex-end",item:!0,xs:12,children:(0,x.jsx)(m.Z,{onClick:g((function(e){var n=new FormData;n.append("transactions",e.transactions[0]),d((0,L.y)({submitData:n,id:e.selected.id}))})),loading:r,loadingIndicator:r&&l<99?"".concat(l,"%"):null,variant:"contained",disableElevation:!0,children:"Cargar"})})]})})}var M=a(52797),G=a(34280);function J(){var e=(0,h.v9)((function(e){return{dataR:e.tables.bankTransactions.tableData.data,loading:e.tables.bankTransactions.tableData.loading,pageSize:e.tables.bankTransactions.tableData.pageSize,pageCount:e.tables.bankTransactions.tableData.pageCount,gedure:e.auth.permissions.gedure}})),n=e.dataR,a=e.loading,t=e.pageSize,l=e.pageCount,i=e.gedure,o=i.bank_account_edit,s=i.bank_account_destroy,c=(0,h.I0)(),d=(0,r.useMemo)((function(){return[{Header:"Id",accessor:"id"},{Header:"Referencia",accessor:"reference"},{Header:"Concepto",accessor:"concepto"},{Header:"Fecha de transferencia",accessor:"date"},{Header:"Monto",accessor:"amount",Cell:function(e){var n=e.cell.row.original.amount;return(0,P.C)(n)}},{Header:"Banco",accessor:"code",Cell:function(e){var n=e.cell.row.original.code;return u.P[n]||"No especificado"}},{Header:"Reclamado por",accessor:"taked_by",Cell:function(e){var n=e.cell.row.original.user;return(null===n||void 0===n?void 0:n.privilegio)+(null===n||void 0===n?void 0:n.username)||"No reclamado"}},{id:"options",Header:"Opciones",accessor:"options",Cell:function(e){var n=e.cell.row.original,a=n.id,r=n.amount;return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(v.Z,{title:"Asignar",arrow:!0,children:(0,x.jsx)(j.Z,{component:"span",disabled:!o,onClick:function(){c((0,q.CI)({open:!0,data:{id:a,amount:r},select:"assignTransaction"}))},children:(0,x.jsx)(M.Z,{})})}),(0,x.jsx)(v.Z,{title:"Eliminar",arrow:!0,children:(0,x.jsx)(j.Z,{component:"span",disabled:!s,onClick:function(){c((0,q.CI)({open:!0,data:{id:a},select:"deleteTransaction"}))},children:(0,x.jsx)(b.Z,{})})})]})}}]}),[]),m=(0,r.useMemo)((function(){return n}),[n]);(0,r.useEffect)((function(){var e=null;return a&&(e=c((0,G.o)())),function(){a&&e.abort()}}),[a]),(0,r.useEffect)((function(){return function(){c((0,B.AF)({select:"bankTransactions"}))}}),[]);return(0,x.jsx)(T.Z,{title:"Cuentas bancarias",data:m,columns:d,pageCountData:l,pageSizeData:t,loading:a,handleGlobalFilter:function(e){console.log(e),c((0,B.qP)({search:e||"",select:"bankTransactions"}))},handleChange:function(e){c((0,B.ai)((0,Z.Z)((0,Z.Z)({},e),{},{select:"bankTransactions"})))},refresh:function(){c((0,B.bi)({select:"bankTransactions"}))},massiveOptions:function(e){return(0,x.jsx)(x.Fragment,{children:(0,x.jsx)(v.Z,{title:"Eliminar",arrow:!0,children:(0,x.jsx)(j.Z,{component:"span",disabled:!s,onClick:function(){var n,a=0,r=[],t=(0,g.Z)(e);try{for(t.s();!(n=t.n()).done;){var l=n.value;r[a]=l.id,a++}}catch(i){t.e(i)}finally{t.f()}c((0,q.CI)({select:"deleteMassiveBankTransaction",open:!0,data:r}))},children:(0,x.jsx)(b.Z,{})})})})}})}var Q=a(51691),U=a(51684),Y=a(93640);function $(){var e=(0,h.v9)((function(e){return e.requestStatus.assignTransaction})),n=e.autoComplete,a=e.data,r=e.open,l=e.loading,i=(0,h.I0)(),o=(0,s.cI)({shouldUnregister:!0}),d=o.control,u=o.handleSubmit,p=function(){var e=(0,D.Z)((0,R.Z)().mark((function e(n){return(0,R.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i((0,U.q)(n));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,x.jsxs)(z.Z,{open:r,TransitionComponent:w.Z,children:[(0,x.jsxs)(E.Z,{children:["Asignar transacci\xf3n bancaria #",a.id]}),(0,x.jsx)(A.Z,{children:(0,x.jsx)("form",{autoComplete:"off",children:(0,x.jsxs)(t.ZP,{container:!0,spacing:2,children:[(0,x.jsx)(t.ZP,{item:!0,xs:12,children:(0,x.jsxs)(Q.Z,{children:["Ha seleccionado la transacci\xf3n bancaria ",(0,x.jsxs)("strong",{children:["#",a.id]})," para asigarla a un usuario, esta acci\xf3n acreditar\xe1 ",(0,x.jsx)("strong",{children:(0,P.C)(a.amount||0)})," a la cuenta del usuario seleccionado."]})}),(0,x.jsx)(t.ZP,{item:!0,xs:12,children:(0,x.jsx)(c.yh,{data:n,label:"Seleccionar usuario",name:"user_selected",helperText:"Busque al usuario que desea seleccionar",control:d,disabled:l,getOptionLabel:function(e){return"".concat(e.privilegio).concat(e.username," - ").concat(e.name)||""},isOptionEqualToValue:function(e,n){return e.n_account===n.n_account},handleRequest:p,rules:{required:{value:!0,message:"* Campo requerido"}}})})]})})}),(0,x.jsxs)(I.Z,{children:[(0,x.jsx)(y.Z,{sx:{ml:1},color:"inherit",disabled:l,onClick:function(){i((0,q.CI)({open:!1,data:{},select:"assignTransaction"}))},children:"Cancelar"}),(0,x.jsx)(m.Z,{onClick:u((function(e){e.user_selected=e.user_selected.id,i((0,Y.K)({submitData:e,id:a.id}))})),loading:l,variant:"text",color:"inherit",children:"Asignar"})]})]})}var K=a(16655),X=a(23164),ee=a(71096),ne=a(34230);function ae(){var e=(0,h.v9)((function(e){return{gedure:e.auth.permissions.gedure}})).gedure;return(0,x.jsxs)(t.ZP,{container:!0,spacing:2,sx:{paddingBottom:6},children:[e.bank_account_create&&(0,x.jsx)(t.ZP,{item:!0,xs:12,children:(0,x.jsx)(f,{})}),e.bank_account_index&&(0,x.jsxs)(t.ZP,{item:!0,xs:12,children:[(0,x.jsx)(S,{}),(0,x.jsx)(F,{}),(0,x.jsx)(_.Z,{rdx1:"requestStatus",rdx2:"deleteBankAccount",close:(0,q.CI)({open:!1,data:{},select:"deleteBankAccount"}),request:function(e){return(0,K.Z)(e.id)},children:function(e){return(0,x.jsxs)("span",{children:["Est\xe1 a punto de ",(0,x.jsx)("strong",{children:"eliminar"})," la cuenta ",(0,x.jsx)("strong",{children:(0,P.Y)((null===e||void 0===e?void 0:e.n_account)||"")}),". Al realizarse esta acci\xf3n todas las ",(0,x.jsx)("strong",{children:"transacciones bancarias"})," registradas de la misma ",(0,x.jsx)("strong",{children:"ser\xe1n borradas"}),", pero las ",(0,x.jsx)("strong",{children:"transacciones internas"})," realizadas dentro del sistema ",(0,x.jsx)("strong",{children:"no se ver\xe1n afectadas"}),". Tenga en cuenta que esta acci\xf3n no se puede deshacer."]})}}),(0,x.jsx)(_.Z,{rdx1:"requestStatus",rdx2:"deleteBankAccountMassive",close:(0,q.CI)({open:!1,data:{},select:"deleteBankAccountMassive"}),request:function(e){return(0,ee.k)(e)},children:function(e){return(0,x.jsxs)("span",{children:["Est\xe1 a punto de ",(0,x.jsx)("strong",{children:"eliminar"})," ",(0,x.jsx)("strong",{children:null===e||void 0===e?void 0:e.length})," cuenta(s). Al realizarse esta acci\xf3n todas las ",(0,x.jsx)("strong",{children:"transacciones bancarias"})," registradas de la misma ",(0,x.jsx)("strong",{children:"ser\xe1n borradas"}),", pero las ",(0,x.jsx)("strong",{children:"transacciones internas"})," realizadas dentro del sistema ",(0,x.jsx)("strong",{children:"no se ver\xe1n afectadas"}),". Tenga en cuenta que esta acci\xf3n no se puede deshacer."]})}})]}),e.bank_transaction_upload&&(0,x.jsx)(t.ZP,{item:!0,xs:12,children:(0,x.jsx)(W,{})}),e.bank_transaction_index&&(0,x.jsxs)(t.ZP,{item:!0,xs:12,children:[(0,x.jsx)(J,{}),(0,x.jsx)($,{}),(0,x.jsx)(_.Z,{rdx1:"requestStatus",rdx2:"deleteTransaction",close:(0,q.CI)({open:!1,data:{},select:"deleteTransaction"}),request:function(e){return(0,X.t)(e.id)},children:function(e){return(0,x.jsxs)("span",{children:["Est\xe1 a punto de eliminar la transacci\xf3n ",(0,x.jsxs)("strong",{children:["#",e.id]}),", tenga en cuenta que esta acci\xf3n no se puede deshacer."]})}}),(0,x.jsx)(_.Z,{rdx1:"requestStatus",rdx2:"deleteMassiveBankTransaction",close:(0,q.CI)({open:!1,data:{},select:"deleteMassiveBankTransaction"}),request:function(e){return(0,ne.$)(e)},children:function(e){return(0,x.jsxs)("span",{children:["Est\xe1 a punto de ",(0,x.jsxs)("strong",{children:["eliminar ",null===e||void 0===e?void 0:e.length]})," transaccione(s), tenga en cuenta que esta acci\xf3n no se puede deshacer."]})}})]})]})}}}]);
//# sourceMappingURL=8162.8e7a2e8f.chunk.js.map