"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[5601],{76429:function(e,n,a){var r=a(1413),t=a(72791),o=a(32232),l=a(80184),i=t.forwardRef((function(e,n){return(0,l.jsx)(o.Z,(0,r.Z)({direction:"up",ref:n},e))}));n.Z=i},39481:function(e,n,a){a.d(n,{Z:function(){return x}});a(72791);var r=a(58195),t=a(40464),o=a(8440),l=a(39571),i=a(77248),s=a(61091),c=a(52797),d=a(74142),u=a(76429),p=a(59434),m=a(39709),h=a(80184);function x(e){var n=e.rdx1,a=e.rdx2,x=e.close,f=e.request,g=e.children,b=(0,p.v9)((function(e){return e[n][a]})),Z=b.open,v=b.loading,j=b.data,C=(0,p.I0)(),k=(0,d.Z)(),T=(0,c.Z)(k.breakpoints.down("md"));return(0,h.jsxs)(r.Z,{open:Z,TransitionComponent:u.Z,fullScreen:T,"aria-labelledby":"confirm-dialog-title","aria-describedby":"confirm-dialog-description",children:[(0,h.jsx)(t.Z,{children:"\xbfEst\xe1 seguro?"}),(0,h.jsx)(o.Z,{children:(0,h.jsx)(l.Z,{id:"confirm-dialog-description",children:g(j)})}),(0,h.jsxs)(i.Z,{children:[(0,h.jsx)(s.Z,{disabled:v,onClick:function(){C(x)},color:"inherit",children:"Cancelar"}),(0,h.jsx)(m.Z,{onClick:function(){C(f(j))},loading:v,color:"inherit",children:"Confirmar"})]})]})}},70825:function(e,n,a){a.d(n,{Z:function(){return M}});var r=a(1413),t=a(93433),o=a(45987),l=a(72791),i=a(45953),s=a(30286),c=a(55112),d=a(96580),u=a(44666),p=a(4565),m=a(75814),h=a(13811),x=a(69963),f=a(50228),g=a(21680),b=a(9827),Z=a(60807),v=a(24390),j=a(19773),C=a(62461),k=a(37168),T=a(35702),P=a(12065),y=a(12715),S=a(2156),q=a(98333),B=a(10111),z=a(78243),_=a(43950),A=a(71358),E=a(29439),I=a(59911),w=a(38254),V=a(5403),O=a(5130),F=a(80184);function D(e){var n=e.state,a=e.setGlobalFilter,r=e.gotoPage,t=e.dataTourGlobal,o=(0,l.useState)(n.globalFilter),i=(0,E.Z)(o,2),s=i[0],c=i[1],d=(0,A.useAsyncDebounce)((function(e){a(e||void 0),r(0)}),500);return(0,F.jsx)(I.Z,{"data-tour":t,size:"small",value:s||"",placeholder:"Buscar...",variant:"standard",autoComplete:"off",onChange:function(e){d(e.target.value),c(e.target.value)},sx:{mr:1},InputProps:{startAdornment:(0,F.jsx)(w.Z,{position:"start",children:(0,F.jsx)(V.Z,{})}),endAdornment:(0,F.jsx)(h.Z,{disabled:!s,onClick:function(){c(""),a(void 0),r(0)},children:(0,F.jsx)(O.Z,{})})}})}var R=a(45473),N=["indeterminate"],H=l.forwardRef((function(e,n){var a=e.indeterminate,t=(0,o.Z)(e,N),i=l.useRef(),s=n||i;return l.useEffect((function(){s.current.indeterminate=a}),[s,a]),(0,F.jsx)(R.Z,(0,r.Z)({type:"checkbox",ref:s,indeterminate:a,color:a?"default":"primary"},t))})),L=["data","columns","pageSizeData","pageCountData","loading","handleGlobalFilter","handleChange","filter","massiveOptions","title","refresh","dataTourMassive","dataTourGlobal"];function M(e){var n=e.data,a=e.columns,E=e.pageSizeData,I=e.pageCountData,w=e.loading,V=e.handleGlobalFilter,O=e.handleChange,R=e.filter,N=e.massiveOptions,M=e.title,W=e.refresh,G=e.dataTourMassive,Y=void 0===G?"gdTable__massive":G,J=e.dataTourGlobal,Q=void 0===J?"gdTable__search":J,U=(0,o.Z)(e,L),$=(0,A.useTable)({columns:a,data:n,initialState:{hiddenColumns:["massiveSelection"],pageSize:E,pageIndex:0},manualPagination:!0,pageCount:I},A.useGlobalFilter,A.usePagination,A.useRowSelect,(function(e){e.visibleColumns.push((function(e){return[{id:"massiveSelection",Header:function(e){var n=e.getToggleAllRowsSelectedProps;return(0,F.jsx)(H,(0,r.Z)({},n()))},Cell:function(e){var n=e.row;return(0,F.jsx)(H,(0,r.Z)({},n.getToggleRowSelectedProps()))}}].concat((0,t.Z)(e))}))})),K=$.getTableProps,X=$.getTableBodyProps,ee=$.headerGroups,ne=$.page,ae=$.prepareRow,re=$.state,te=$.selectedFlatRows,oe=$.allColumns,le=$.canPreviousPage,ie=$.canNextPage,se=$.nextPage,ce=$.previousPage,de=$.setPageSize,ue=$.pageOptions,pe=$.gotoPage,me=$.pageCount,he=re.pageIndex,xe=re.pageSize;return(0,l.useEffect)((function(){O({pageIndex:he+1,pageSize:xe})}),[he,xe]),(0,F.jsx)(i.ZP,{container:!0,spacing:2,children:(0,F.jsx)(i.ZP,{item:!0,xs:12,children:(0,F.jsxs)(s.Z,(0,r.Z)((0,r.Z)({sx:{position:"relative"}},U),{},{children:[(0,F.jsx)(c.Z,{sx:{color:"#fff",zIndex:function(e){return e.zIndex.appBar-1},position:"absolute"},open:w,children:(0,F.jsx)(d.Z,{})}),(0,F.jsxs)(u.Z,{sx:(0,r.Z)({},te.length>0&&{bgcolor:function(e){return(0,P.Fq)(e.palette.primary.main,e.palette.action.activatedOpacity)}}),children:[te.length>0?(0,F.jsxs)(p.Z,{sx:{flex:"1 1 100%"},color:"inherit",variant:"subtitle1",component:"div",noWrap:!0,children:[te.length," seleccionada(s)"]}):(0,F.jsx)(p.Z,{sx:{flex:"1 1 100%"},variant:"h6",id:"registros",component:"div",noWrap:!0,children:M}),(0,F.jsx)(D,{state:re,setGlobalFilter:V,gotoPage:pe,dataTourGlobal:Q}),te.length>0?N(te.map((function(e){return e.original}))):(0,F.jsxs)(F.Fragment,{children:[N&&(0,F.jsx)(m.Z,{title:"Opciones massivas",arrow:!0,children:(0,F.jsx)(h.Z,{component:"span",onClick:function(){oe.map((function(e){return("massiveSelection"===e.id||"options"===e.id)&&e.toggleHidden(),null}))},"data-tour":Y,disabled:te.length>0,children:(0,F.jsx)(z.Z,{})})}),(0,F.jsx)(m.Z,{title:"Recargar",arrow:!0,children:(0,F.jsx)(h.Z,{component:"span",onClick:W,"data-tour":"gdTable__refresh",children:(0,F.jsx)(_.Z,{})})}),R&&R(pe)]})]}),(0,F.jsxs)(x.Z,{children:[(0,F.jsx)(f.Z,{overflow:"auto",minWidth:352,children:(0,F.jsxs)(g.Z,(0,r.Z)((0,r.Z)({sx:{minWidth:650},"aria-label":"React Table"},K()),{},{children:[(0,F.jsx)(b.Z,{sx:{th:{border:0}},children:ee.map((function(e){return(0,F.jsx)(Z.Z,(0,r.Z)((0,r.Z)({sx:{td:{border:0}}},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return"massiveSelection"===e.id?(0,F.jsx)(v.Z,(0,r.Z)((0,r.Z)({padding:"checkbox"},e.getHeaderProps()),{},{children:e.render("Header")})):"Opciones"===e.Header?(0,F.jsx)(v.Z,(0,r.Z)((0,r.Z)({align:"right","data-tour":"table-Opciones"},e.getHeaderProps()),{},{children:e.render("Header")})):(0,F.jsx)(v.Z,(0,r.Z)((0,r.Z)({"data-tour":"table-".concat(e.render("Header"))},e.getHeaderProps()),{},{children:e.render("Header")}))}))}))}))}),(0,F.jsxs)(j.Z,(0,r.Z)((0,r.Z)({},X()),{},{children:[ne.map((function(e){return ae(e),(0,F.jsx)(Z.Z,(0,r.Z)((0,r.Z)({sx:{height:"73px"}},e.getRowProps()),{},{children:e.cells.map((function(e){return"massiveSelection"===e.column.id?(0,F.jsx)(v.Z,(0,r.Z)((0,r.Z)({padding:"checkbox"},e.getCellProps()),{},{children:e.render("Cell")})):"Opciones"===e.column.Header?(0,F.jsx)(v.Z,(0,r.Z)((0,r.Z)({align:"right"},e.getCellProps()),{},{children:e.render("Cell")})):(0,F.jsx)(v.Z,(0,r.Z)((0,r.Z)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))})),0===ne.length&&(0,F.jsx)(Z.Z,{children:(0,F.jsx)(v.Z,{colSpan:"100%",children:(0,F.jsx)(p.Z,{textAlign:"center",children:"No se han encontrado resultados"})})})]}))]}))}),(0,F.jsx)(f.Z,{overflow:"auto",minWidth:352,children:(0,F.jsx)(g.Z,{children:(0,F.jsx)(C.Z,{children:(0,F.jsx)(Z.Z,{children:(0,F.jsx)(v.Z,{colSpan:"100%",sx:{border:0},children:(0,F.jsxs)(i.ZP,{container:!0,justifyContent:"flex-end",alignItems:"center",spacing:1,item:!0,xs:12,children:[(0,F.jsx)(i.ZP,{item:!0,children:(0,F.jsx)(k.Z,{labelId:"page-size-table-label",id:"page-size-table",value:xe,label:"Filas",variant:"standard",onChange:function(e){de(Number(e.target.value))},children:[5,10,20,30,40,50].map((function(e){return(0,F.jsxs)(T.Z,{value:e,children:[e," Filas"]},e)}))})}),(0,F.jsx)(i.ZP,{item:!0,children:(0,F.jsx)(m.Z,{title:"Primera p\xe1gina",arrow:!0,children:(0,F.jsx)(h.Z,{component:"span",onClick:function(){return pe(0)},disabled:!le,children:(0,F.jsx)(y.Z,{})})})}),(0,F.jsx)(i.ZP,{item:!0,children:(0,F.jsx)(m.Z,{title:"Anterior",arrow:!0,children:(0,F.jsx)(h.Z,{component:"span",onClick:ce,disabled:!le,children:(0,F.jsx)(S.Z,{})})})}),(0,F.jsx)(i.ZP,{item:!0,children:(0,F.jsxs)(f.Z,{component:"span",fontSize:"body2.fontSize",color:"text.secondary",children:[he+1," de ",ue.length]})}),(0,F.jsx)(i.ZP,{item:!0,children:(0,F.jsx)(m.Z,{title:"Siguiente",arrow:!0,children:(0,F.jsx)(h.Z,{component:"span",onClick:se,disabled:!ie,children:(0,F.jsx)(q.Z,{})})})}),(0,F.jsx)(i.ZP,{item:!0,children:(0,F.jsx)(m.Z,{title:"\xdaltima p\xe1gina",arrow:!0,children:(0,F.jsx)(h.Z,{component:"span",onClick:function(){return pe(me-1)},disabled:!ie,children:(0,F.jsx)(B.Z,{})})})})]})})})})})})]})]}))})})}},91526:function(e,n,a){a(72791);var r=a(4837),t=a(61091),o=a(59434),l=a(57048),i=a(80184);n.Z=function(e){var n=e.steps,a=e.select,s=e.version,c=void 0===s?"v1":s,d=(0,o.v9)((function(e){return{tourOpen:e.configs.tour[a]}})).tourOpen,u=(0,o.I0)();return(0,i.jsx)(r.ZP,{steps:n,isOpen:!d,disableInteraction:!0,onAfterOpen:function(){document.body.style.overflowY="hidden"},onBeforeClose:function(){document.body.style.overflowY="auto"},showNavigationNumber:!1,showCloseButton:!1,rounded:5,lastStepNextButton:(0,i.jsx)(t.Z,{component:"span",size:"small",color:"primary",onClick:function(){u((0,l.Mn)({open:!0,tour:a,version:c}))},children:"Terminar gu\xeda"})})}},2183:function(e,n,a){a.d(n,{P:function(){return t},S:function(){return r}});var r=[{value:"0102",label:"Banco de Venezuela"},{value:"0104",label:"Venezolano de Cr\xe9dito"},{value:"0105",label:"Mercantil"},{value:"0108",label:"Provincial"},{value:"0114",label:"Bancaribe"},{value:"0115",label:"Exterior"},{value:"0116",label:"Occidental de Descuento"},{value:"0128",label:"Banco Caron\xed"},{value:"0134",label:"Banesco"},{value:"0138",label:"Banco Plaza"},{value:"0151",label:"BFC Banco Fondo Com\xfan"},{value:"0156",label:"100% Banco"},{value:"0157",label:"Delsur"},{value:"0163",label:"Banco del Tesoro"},{value:"0166",label:"Banco Agr\xedcola de Venezuela"},{value:"0168",label:"Bancrecer"},{value:"0169",label:"Mi Banco"},{value:"0171",label:"Banco Activo"},{value:"0172",label:"Bancamiga"},{value:"0174",label:"Banplus"},{value:"0175",label:"Bicentenario del Pueblo"},{value:"0177",label:"Banfanb"},{value:"0191",label:"BNC Nacional de Cr\xe9dito"}],t={"0102":"Banco de Venezuela","0104":"Venezolano de Cr\xe9dito","0105":"Mercantil","0108":"Provincial","0114":"Bancaribe","0115":"Exterior","0116":"Occidental de Descuento","0128":"Banco Caron\xed","0134":"Banesco","0138":"Banco Plaza","0151":"BFC Banco Fondo Com\xfan","0156":"100% Banco","0157":"Delsur","0163":"Banco del Tesoro","0166":"Banco Agr\xedcola de Venezuela","0168":"Bancrecer","0169":"Mi Banco","0171":"Banco Activo","0172":"Bancamiga","0174":"Banplus","0175":"Bicentenario del Pueblo","0177":"Banfanb","0191":"BNC Nacional de Cr\xe9dito"}},19840:function(e,n,a){a.d(n,{c:function(){return d}});var r=a(1413),t=a(45987),o=a(59911),l=a(61134),i=a(80184),s=["name","control","rules","defaultValue","helperText"],c=["ref"];function d(e){var n=e.name,a=e.control,d=e.rules,u=void 0===d?null:d,p=e.defaultValue,m=void 0===p?"":p,h=e.helperText,x=void 0===h?"":h,f=(0,t.Z)(e,s),g=(0,l.bc)({name:n,control:a,rules:u,defaultValue:m}),b=g.field,Z=b.ref,v=(0,t.Z)(b,c),j=g.fieldState,C=j.invalid,k=j.error;return(0,i.jsx)(o.Z,(0,r.Z)((0,r.Z)((0,r.Z)({inputRef:Z},v),f),{},{error:C,helperText:k?k.message:x}))}},18493:function(e,n,a){a.d(n,{Q:function(){return f}});var r=a(1413),t=a(29439),o=a(45987),l=a(72791),i=a(59911),s=a(38254),c=a(13811),d=a(3746),u=a(20165),p=a(61134),m=a(80184),h=["name","control","rules","defaultValue","helperText"],x=["ref"];function f(e){var n=e.name,a=e.control,f=e.rules,g=void 0===f?null:f,b=e.defaultValue,Z=void 0===b?"":b,v=e.helperText,j=void 0===v?"":v,C=(0,o.Z)(e,h),k=(0,l.useState)(!1),T=(0,t.Z)(k,2),P=T[0],y=T[1],S=(0,p.bc)({name:n,control:a,rules:g,defaultValue:Z}),q=S.field,B=q.ref,z=(0,o.Z)(q,x),_=S.fieldState,A=_.invalid,E=_.error;return(0,m.jsx)(i.Z,(0,r.Z)((0,r.Z)((0,r.Z)({inputRef:B},z),C),{},{error:A,helperText:E?E.message:j,type:P?"text":"password",InputProps:{endAdornment:(0,m.jsx)(s.Z,{position:"end",children:(0,m.jsx)(c.Z,{onClick:function(){y(!P)},size:null===C||void 0===C?void 0:C.size,children:P?(0,m.jsx)(u.Z,{}):(0,m.jsx)(d.Z,{})})})}}))}},99507:function(e,n,a){a.d(n,{yh:function(){return P},mX:function(){return b},cl:function(){return r.c},gT:function(){return p},Q:function(){return m.Q}});var r=a(19840),t=a(1413),o=a(45987),l=a(59911),i=a(61134),s=a(30948),c=a(80184),d=["name","control","rules","defaultValue","helperText"],u=["ref","onChange","value"];function p(e){var n=e.name,a=e.control,r=e.rules,p=void 0===r?null:r,m=e.defaultValue,h=void 0===m?"":m,x=e.helperText,f=void 0===x?"":x,g=(0,o.Z)(e,d),b=(0,i.bc)({name:n,control:a,rules:p,defaultValue:h}),Z=b.field,v=(Z.ref,Z.onChange),j=Z.value,C=(0,o.Z)(Z,u),k=b.fieldState,T=k.invalid,P=k.error;return(0,c.jsx)(s.Z,(0,t.Z)((0,t.Z)((0,t.Z)({},g),C),{},{value:(g.format?j:parseFloat(j))||"",customInput:l.Z,error:T,onValueChange:function(e){v((null===e||void 0===e?void 0:e.value)||"")},helperText:P?P.message:f,mask:"_"}))}var m=a(18493),h=a(97008),x=a(72791),f=["multiple","options","name","control","defaultValue","rules","isOptionEqualToValue","getOptionLabel","helperText","disabled"],g=["ref","onChange"];function b(e){var n=e.multiple,a=e.options,r=e.name,s=e.control,d=e.defaultValue,u=e.rules,p=void 0===u?{required:"* Campo requerido"}:u,m=e.isOptionEqualToValue,x=e.getOptionLabel,b=e.helperText,Z=e.disabled,v=(0,o.Z)(e,f),j=(0,i.bc)({name:r,control:s,rules:p,defaultValue:d}),C=j.field,k=C.ref,T=C.onChange,P=(0,o.Z)(C,g),y=j.fieldState,S=y.invalid,q=y.error;return(0,c.jsx)(h.Z,(0,t.Z)((0,t.Z)({},P),{},{onChange:function(e,n){T(n)},multiple:n,options:a,noOptionsText:"No hay resultados",getOptionLabel:x,isOptionEqualToValue:m,disabled:Z,renderInput:function(e){return(0,c.jsx)(l.Z,(0,t.Z)((0,t.Z)((0,t.Z)({},e),v),{},{inputRef:k,error:S,helperText:q?q.message:b}))}}))}var Z=a(74165),v=a(15861),j=a(29439),C=a(96580);var k=["name","control","rules","data","defaultValue","helperText","getOptionLabel","isOptionEqualToValue","multiple","handleRequest","disabled","renderOption","renderTags","limitTags"],T=["ref","onChange"];function P(e){var n=e.name,a=e.control,r=e.rules,s=void 0===r?null:r,d=e.data,u=void 0===d?[]:d,p=e.defaultValue,m=void 0===p?"":p,f=e.helperText,g=void 0===f?"":f,b=e.getOptionLabel,P=e.isOptionEqualToValue,y=e.multiple,S=e.handleRequest,q=e.disabled,B=e.renderOption,z=e.renderTags,_=e.limitTags,A=(0,o.Z)(e,k),E=(0,x.useState)(!1),I=(0,j.Z)(E,2),w=I[0],V=I[1],O=(0,x.useState)([]),F=(0,j.Z)(O,2),D=F[0],R=F[1],N=(0,x.useState)(""),H=(0,j.Z)(N,2),L=H[0],M=H[1],W=(0,x.useState)(!0),G=(0,j.Z)(W,2),Y=G[0],J=G[1],Q=Y&&w&&0===D.length,U=(0,i.bc)({name:n,control:a,rules:s,defaultValue:m}),$=U.field,K=$.ref,X=$.onChange,ee=(0,o.Z)($,T),ne=U.fieldState.error;(0,x.useEffect)((function(){var e=!0,n=function(){var e=(0,v.Z)((0,Z.Z)().mark((function e(){return(0,Z.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S(L);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(Q)return e&&n(),function(){e=!1}}),[Q]),(0,x.useEffect)((function(){w||(R([]),J(!0))}),[w]),(0,x.useEffect)((function(){null!==u&&(R(u),J(!1))}),[u]);var ae=(0,x.useCallback)(function(e,n){var a;return function(){for(var r=arguments.length,t=new Array(r),o=0;o<r;o++)t[o]=arguments[o];clearTimeout(a),a=setTimeout((function(){return e.apply(void 0,t)}),n)}}((function(){R([]),J(!0)}),500),[]);return(0,c.jsx)(h.Z,{multiple:y,id:"autocomplete-".concat(n),options:D,open:w,onOpen:function(){V(!0),J(!0)},onClose:function(){V(!1)},onChange:function(e,n){X(n)},inputValue:L,onInputChange:function(e,n){M(n),"change"===(null===e||void 0===e?void 0:e.type)&&ae()},getOptionLabel:b,isOptionEqualToValue:P,loading:Q,loadingText:"Cargando...",noOptionsText:"No hay resultados",renderTags:z,disabled:q,renderOption:B,limitTags:_,renderInput:function(e){return(0,c.jsx)(l.Z,(0,t.Z)((0,t.Z)((0,t.Z)((0,t.Z)({},e),ee),A),{},{inputRef:K,error:Boolean(ne),helperText:ne?ne.message:g,InputProps:(0,t.Z)((0,t.Z)({},e.InputProps),{},{endAdornment:(0,c.jsxs)(c.Fragment,{children:[Q?(0,c.jsx)(C.Z,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})})}))}})}},20310:function(e,n,a){a.d(n,{g:function(){return m}});var r=a(1413),t=a(45987),o=(a(72791),a(81898)),l=a(40508),i=a(37168),s=a(37924),c=a(61134),d=a(80184),u=["name","label","control","helperText","defaultValue","rules","children"],p=["ref"];function m(e){var n=e.name,a=e.label,m=e.control,h=e.helperText,x=void 0===h?"":h,f=e.defaultValue,g=void 0===f?"":f,b=e.rules,Z=void 0===b?{required:"* Campo requerido"}:b,v=e.children,j=(0,t.Z)(e,u),C=(0,c.bc)({name:n,control:m,rules:Z,defaultValue:g}),k=C.field,T=(k.ref,(0,t.Z)(k,p)),P=C.fieldState,y=P.invalid,S=P.error;return(0,d.jsxs)(o.Z,(0,r.Z)((0,r.Z)({},j),{},{error:y,children:[(0,d.jsx)(l.Z,{id:n+"-label",children:a}),(0,d.jsx)(i.Z,(0,r.Z)((0,r.Z)({labelId:n+"-label",label:a,id:n},T),{},{children:v})),(0,d.jsx)(s.Z,{children:S?S.message:x})]}))}},48214:function(e,n,a){a.d(n,{H:function(){return u}});var r=a(1413),t=a(45987),o=(a(72791),a(72900)),l=a(18956),i=a(61134),s=a(80184),c=["label","name","control","defaultValue","labelPlacement"],d=["ref","onChange","value"];function u(e){var n=e.label,a=e.name,u=e.control,p=e.defaultValue,m=void 0!==p&&p,h=e.labelPlacement,x=void 0===h?"end":h,f=(0,t.Z)(e,c),g=(0,i.bc)({name:a,control:u,defaultValue:m}).field,b=g.ref,Z=g.onChange,v=g.value,j=(0,t.Z)(g,d);return(0,s.jsx)(o.Z,{control:(0,s.jsx)(l.Z,(0,r.Z)((0,r.Z)((0,r.Z)({},f),j),{},{inputRef:b,onChange:function(e){return Z(e.currentTarget.checked)},checked:v})),label:n,sx:{userSelect:"none"},labelPlacement:x})}},25601:function(e,n,a){a.r(n),a.d(n,{default:function(){return le}});var r=a(72791),t=a(45953),o=a(4565),l=a(61091),i=a(74142),s=a(91526),c=a(80184);function d(){var e=(0,i.Z)(),n=[{selector:"",content:function(e){var n=e.goTo;return(0,c.jsxs)("div",{children:[(0,c.jsx)(o.Z,{color:"primary",className:"text__bold--big",variant:"h5",children:"Configurar pagos"}),(0,c.jsx)(o.Z,{variant:"body1",children:"En esta secci\xf3n podr\xe1 configurar las cuentas bancarias y transacciones de las mismas."}),(0,c.jsx)(l.Z,{size:"small",color:"primary",onClick:function(){return n(9)},children:"Saltar tour"})]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="create-bank-account"]',content:function(){return(0,c.jsxs)(o.Z,{variant:"body1",children:["Aqu\xed podr\xe1 ",(0,c.jsx)("strong",{children:"crear cuentas bancarias"})," en las cuales los estudiantes pueden transferir."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="bank-account"]',content:function(){return(0,c.jsxs)(o.Z,{variant:"body1",children:["Aqu\xed podr\xe1 visualizar las ",(0,c.jsx)("strong",{children:"cuentas bancarias creadas"})," en el sistema. Tambi\xe9n puede ",(0,c.jsx)("strong",{children:"editar y eliminar"})," cualquier cuenta bancaria."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdTable__search"]',content:function(){return(0,c.jsxs)(o.Z,{variant:"body1",children:["Puede ",(0,c.jsx)("strong",{children:"buscar"})," las cuentas bancarias que desee utiliz\xe1ndo el ",(0,c.jsx)("strong",{children:"n\xfamero de cuenta o el nombre"}),"."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdTable__massive"]',content:function(){return(0,c.jsxs)(o.Z,{variant:"body1",children:["Tambi\xe9n puede usar las ",(0,c.jsx)("strong",{children:"opciones masivas"})," con las cuales puedes ",(0,c.jsx)("strong",{children:"borrar varias cuentas bancarias"})," a la vez."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="upload-bank-transaction"]',content:function(){return(0,c.jsxs)(o.Z,{variant:"body1",children:["Aqu\xed podr\xe1 ",(0,c.jsx)("strong",{children:"subir las transacciones bancarias"})," de cada cuenta bancaria creada, con las cuales los usuarios podr\xe1n ",(0,c.jsx)("strong",{children:"verificar pagos"}),"."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="bank-transaction"]',content:function(){return(0,c.jsxs)(o.Z,{variant:"body1",children:["Aqu\xed podr\xe1 visualizar todas las ",(0,c.jsx)("strong",{children:"transacciones bancarias cargadas"})," en el sistema. Tambi\xe9n puede ",(0,c.jsx)("strong",{children:"asignar y eliminar"})," las transacciones."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="tableT-global"]',content:function(){return(0,c.jsxs)(o.Z,{variant:"body1",children:["Puede ",(0,c.jsx)("strong",{children:"buscar"})," las transacciones bancarias que desee utiliz\xe1ndo el ",(0,c.jsx)("strong",{children:"ID, referencia, o concepto"}),"."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="tableT-massive"]',content:function(){return(0,c.jsxs)(o.Z,{variant:"body1",children:["Tambi\xe9n puede usar las ",(0,c.jsx)("strong",{children:"opciones masivas"})," con las cuales puedes ",(0,c.jsx)("strong",{children:"borrar varias transacciones bancarias"})," a la vez."]})},style:{backgroundColor:e.palette.background.paper}},{selector:"",content:function(){return(0,c.jsx)(o.Z,{variant:"body1",children:"Con esto finaliza esta gu\xeda, navegue entre otras partes del sistema para encontrar m\xe1s gu\xedas."})},style:{backgroundColor:e.palette.background.paper}}];return(0,c.jsx)(s.Z,{select:"config_pagos",steps:n})}var u=a(35702),p=a(30286),m=a(61134),h=a(99507),x=a(20310),f=a(2183),g=a(39709),b=a(59434),Z=a(71149);function v(){var e=(0,b.v9)((function(e){return e.requestStatus.createBankAccount.loading})),n=(0,b.I0)(),a=(0,m.cI)(),l=a.control,i=a.handleSubmit,s=a.setError,d=f.S.map((0,r.useCallback)((function(e,n){return"0175"!==e.value?null:(0,c.jsx)(u.Z,{value:e.value,children:e.label},n)}),[]));return(0,c.jsx)(p.Z,{component:"form",autoComplete:"off",onSubmit:i((function(e){n((0,Z.p)({submitData:e,setError:s}))})),"data-tour":"create-bank-account",className:"paper--padding",children:(0,c.jsxs)(t.ZP,{container:!0,spacing:2,children:[(0,c.jsx)(t.ZP,{item:!0,xs:12,children:(0,c.jsx)(o.Z,{variant:"h6",className:"text__bold--semi",children:"Crear cuenta bancaria"})}),(0,c.jsx)(t.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,c.jsx)(h.gT,{control:l,rules:{required:"* Campo requerido",minLength:{value:20,message:"Error: Cuenta no v\xe1lida"},maxLength:{value:20,message:"Error: Cuenta no v\xe1lida"}},name:"n_account",label:"N\xb0 de cuenta",fullWidth:!0,size:"small",disabled:e,format:"#### #### #### #### ####"})}),(0,c.jsx)(t.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,c.jsx)(h.gT,{control:l,rules:{required:"* Campo requerido",minLength:{value:9,message:"Error: RIF no v\xe1lida"},maxLength:{value:9,message:"Error: RIF no v\xe1lida"}},name:"rif",label:"RIF",fullWidth:!0,size:"small",disabled:e,format:"J-########-#"})}),(0,c.jsx)(t.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,c.jsx)(h.cl,{control:l,rules:{required:"* Campo requerido",minLength:{value:6,message:"Error: Demaciado corto"},maxLength:{value:100,message:"Error: Demaciado largo"}},name:"name",label:"Nombre",size:"small",fullWidth:!0,disabled:e})}),(0,c.jsx)(t.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,c.jsx)(h.cl,{control:l,rules:{required:"* Campo requerido",pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Error: Correo no v\xe1lido"}},name:"email",label:"Correo",size:"small",fullWidth:!0,disabled:e})}),(0,c.jsx)(t.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,c.jsxs)(x.g,{name:"type",label:"Tipo de cuenta",control:l,size:"small",disabled:e,fullWidth:!0,children:[(0,c.jsx)(u.Z,{value:"",children:(0,c.jsx)("em",{children:"Ninguno"})}),(0,c.jsx)(u.Z,{value:"ahorro",children:"Ahorro"}),(0,c.jsx)(u.Z,{value:"corriente",children:"Corriente"})]})}),(0,c.jsx)(t.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,c.jsxs)(x.g,{name:"code",label:"Banco",control:l,disabled:e,size:"small",fullWidth:!0,children:[(0,c.jsx)(u.Z,{value:"",children:(0,c.jsx)("em",{children:"Ninguno"})}),d]})}),(0,c.jsx)(t.ZP,{container:!0,justifyContent:"flex-end",item:!0,xs:12,children:(0,c.jsx)(g.Z,{variant:"contained",loading:e,disableElevation:!0,type:"submit",children:"Agregar"})})]})})}var j=a(37762),C=a(1413),k=a(75814),T=a(13811),P=a(60383),y=a(41286),S=a(70825),q=a(5736),B=a(54895),z=a(15728),_=a(6728);function A(){var e=(0,b.v9)((function(e){return{dataR:e.tables.bankAccounts.tableData.data,loading:e.tables.bankAccounts.tableData.loading,pageSize:e.tables.bankAccounts.tableData.pageSize,pageCount:e.tables.bankAccounts.tableData.pageCount,gedure:e.auth.permissions.gedure}})),n=e.dataR,a=e.loading,t=e.pageSize,o=e.pageCount,l=e.gedure,i=l.bank_account_edit,s=l.bank_account_destroy,d=(0,b.I0)(),u=(0,r.useMemo)((function(){return[{Header:"N\xb0 cuenta",accessor:"n_account",Cell:function(e){var n=e.cell.row.original.n_account;return(0,q.Y)(n)}},{Header:"Nombre",accessor:"name"},{Header:"Correo",accessor:"email"},{Header:"Tipo",accessor:"type"},{Header:"Banco",accessor:"code",Cell:function(e){var n=e.cell.row.original.code;return f.P[n]||"No especificado"}},{id:"options",Header:"Opciones",accessor:"options",Cell:function(e){var n=e.cell.row.original,a=n.id,r=n.n_account,t=n.rif,o=n.name,l=n.email,u=n.type,p=n.code;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(k.Z,{title:"Editar",arrow:!0,children:(0,c.jsx)(T.Z,{component:"span",disabled:!i,onClick:function(){d((0,_.CI)({open:!0,data:{id:a,n_account:r,rif:t,name:o,email:l,type:u,code:p},select:"editBankAccount"}))},children:(0,c.jsx)(y.Z,{})})}),(0,c.jsx)(k.Z,{title:"Eliminar",arrow:!0,children:(0,c.jsx)(T.Z,{component:"span",disabled:!s,onClick:function(){d((0,_.CI)({open:!0,data:{id:a,n_account:r},select:"deleteBankAccount"}))},children:(0,c.jsx)(P.Z,{})})})]})}}]}),[]),p=(0,r.useMemo)((function(){return n}),[n]);(0,r.useEffect)((function(){var e=null;return a&&(e=d((0,B.T)())),function(){a&&e.abort()}}),[a]),(0,r.useEffect)((function(){return function(){d((0,z.AF)({select:"bankAccounts"}))}}),[]);return(0,c.jsx)(S.Z,{title:"Cuentas bancarias","data-tour":"bank-account",data:p,columns:u,pageCountData:o,pageSizeData:t,loading:a,handleGlobalFilter:function(e){d((0,z.qP)({search:e||"",select:"bankAccounts"}))},handleChange:function(e){d((0,z.ai)((0,C.Z)((0,C.Z)({},e),{},{select:"bankAccounts"})))},refresh:function(){d((0,z.bi)({select:"bankAccounts"}))},massiveOptions:function(e){return(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(k.Z,{title:"Eliminar",arrow:!0,children:(0,c.jsx)(T.Z,{component:"span",disabled:!s,onClick:function(){var n,a=0,r=[],t=(0,j.Z)(e);try{for(t.s();!(n=t.n()).done;){var o=n.value;r[a]=o.id,a++}}catch(l){t.e(l)}finally{t.f()}d((0,_.CI)({select:"deleteBankAccountMassive",open:!0,data:r}))},children:(0,c.jsx)(P.Z,{})})})})}})}var E=a(39481),I=a(58195),w=a(40464),V=a(8440),O=a(77248),F=a(48214),D=a(76429),R=a(56984);function N(){var e=(0,b.v9)((function(e){return e.requestStatus.editBankAccount})),n=e.data,a=e.open,o=e.loading,i=(0,b.I0)(),s=(0,m.cI)({shouldUnregister:!0}),d=s.control,p=s.handleSubmit,Z=s.watch,v=s.setError,j=f.S.map((0,r.useCallback)((function(e,n){return(0,c.jsx)(u.Z,{value:e.value,children:e.label},n)}),[])),C=function(e){e.id=n.id,e._method="PUT",i((0,R.s)({submitData:e,setError:v}))};return(0,c.jsxs)(I.Z,{open:a,TransitionComponent:D.Z,children:[(0,c.jsxs)(w.Z,{children:["Editar cuenta bancaria #",n.id]}),(0,c.jsx)(V.Z,{children:(0,c.jsxs)("form",{autoComplete:"off",onSubmit:p(C),children:[(0,c.jsxs)(t.ZP,{container:!0,spacing:2,children:[!0===Z("important_data")&&(0,c.jsx)(t.ZP,{item:!0,xs:12,children:(0,c.jsx)(h.gT,{control:d,rules:{required:"* Campo requerido",minLength:{value:20,message:"Error: Cuenta no v\xe1lida"},maxLength:{value:20,message:"Error: Cuenta no v\xe1lida"}},name:"n_account",label:"N\xb0 de cuenta",fullWidth:!0,size:"small",variant:"standard",disabled:o,defaultValue:n.n_account,format:"#### #### #### #### ####"})}),(0,c.jsx)(t.ZP,{item:!0,xs:12,children:(0,c.jsx)(h.gT,{control:d,rules:{required:"* Campo requerido",minLength:{value:9,message:"Error: RIF no v\xe1lida"},maxLength:{value:9,message:"Error: RIF no v\xe1lida"}},name:"rif",label:"RIF",fullWidth:!0,size:"small",variant:"standard",disabled:o,defaultValue:n.rif,format:"J-########-#"})}),(0,c.jsx)(t.ZP,{item:!0,xs:12,children:(0,c.jsx)(h.cl,{control:d,rules:{required:"* Campo requerido",minLength:{value:6,message:"Error: Demaciado corto"},maxLength:{value:100,message:"Error: Demaciado largo"}},name:"name",label:"Nombre",size:"small",variant:"standard",fullWidth:!0,disabled:o,defaultValue:n.name})}),(0,c.jsx)(t.ZP,{item:!0,xs:12,children:(0,c.jsx)(h.cl,{control:d,rules:{required:"* Campo requerido",pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Error: Correo no v\xe1lido"}},name:"email",label:"Correo",size:"small",variant:"standard",fullWidth:!0,disabled:o,defaultValue:n.email})}),(0,c.jsx)(t.ZP,{item:!0,xs:12,children:(0,c.jsxs)(x.g,{name:"type",label:"Tipo de cuenta",control:d,disabled:o,size:"small",variant:"standard",fullWidth:!0,defaultValue:n.type,children:[(0,c.jsx)(u.Z,{value:"",children:(0,c.jsx)("em",{children:"Ninguno"})}),(0,c.jsx)(u.Z,{value:"ahorro",children:"Ahorro"}),(0,c.jsx)(u.Z,{value:"corriente",children:"Corriente"})]})}),(0,c.jsx)(t.ZP,{item:!0,xs:12,children:(0,c.jsxs)(x.g,{name:"code",label:"Banco",control:d,disabled:o,size:"small",variant:"standard",fullWidth:!0,defaultValue:n.code,children:[(0,c.jsx)(u.Z,{value:"",children:(0,c.jsx)("em",{children:"Ninguno"})}),j]})})]}),(0,c.jsx)("input",{type:"submit",hidden:!0})]})}),(0,c.jsxs)(O.Z,{children:[(0,c.jsx)(F.H,{control:d,name:"important_data",label:"Modificar campos importantes",labelPlacement:"start",color:"primary",disabled:o}),(0,c.jsx)(l.Z,{sx:{ml:1},color:"inherit",disabled:o,onClick:function(){i((0,_.CI)({open:!1,data:{},select:"editBankAccount"}))},children:"Cancelar"}),(0,c.jsx)(g.Z,{onClick:p(C),loading:o,variant:"text",color:"inherit",children:"Actualizar"})]})]})}var H=a(74165),L=a(15861),M=a(50228),W=a(14890),G=a(13801);function Y(){var e,n=(0,b.v9)((function(e){return e.requestStatus.uploadTransactions})),a=n.autoComplete,r=n.loading,i=n.progress,s=(0,b.I0)(),d=(0,m.cI)({mode:"onTouched"}),u=d.register,x=d.control,f=d.handleSubmit,Z=d.watch,v=d.formState.errors,j=function(){var e=(0,L.Z)((0,H.Z)().mark((function e(n){return(0,H.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s((0,W.J)(n));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,c.jsx)(p.Z,{component:"form",autoComplete:"off",onSubmit:f((function(e){var n=new FormData;n.append("transactions",e.transactions[0]),s((0,G.y)({submitData:n,id:e.selected.id}))})),"data-tour":"upload-bank-transaction",className:"paper--padding",children:(0,c.jsxs)(t.ZP,{container:!0,spacing:2,children:[(0,c.jsx)(t.ZP,{item:!0,xs:12,children:(0,c.jsx)(o.Z,{variant:"h6",className:"text__bold--semi",children:"Cargar transacciones bancarias"})}),(0,c.jsx)(t.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,c.jsx)(h.yh,{data:a,name:"selected",label:"Buscar cuenta bancaria",helperText:"Busque la cuenta bancaria a la cual desea cargar las transferencias",control:x,disabled:r,getOptionLabel:function(e){return(0,q.Y)(e.n_account)||""},isOptionEqualToValue:function(e,n){return e.n_account===n.n_account},handleRequest:j,rules:{required:{value:!0,message:"* Campo requerido"}}})}),(0,c.jsxs)(t.ZP,{item:!0,xs:12,children:[(0,c.jsx)("input",(0,C.Z)((0,C.Z)({id:"upload-transactions"},u("transactions",{required:"* Debe subir un archivo"})),{},{defaultValue:null,style:{display:"none"},accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv,application/vnd.oasis.opendocument.spreadsheet",type:"file"})),(0,c.jsx)("label",{htmlFor:"upload-transactions",children:(0,c.jsx)(l.Z,{variant:"contained",color:Boolean(v.transactions)?"error":"primary",disableElevation:!0,component:"span",children:"Cargar archivo"})}),Boolean(v.transactions)&&(0,c.jsx)(M.Z,{fontSize:"body1.fontSize",component:"span",ml:2,color:"#f44336",children:v.transactions.message}),0!==((null===(e=Z("transactions"))||void 0===e?void 0:e.length)||[]).length&&(0,c.jsx)(M.Z,{fontSize:"body1.fontSize",component:"span",ml:2,children:"Archivo cargado"})]}),(0,c.jsx)(t.ZP,{container:!0,justifyContent:"flex-end",item:!0,xs:12,children:(0,c.jsx)(g.Z,{type:"submit",loading:r,loadingIndicator:r&&i<99?"".concat(i,"%"):null,variant:"contained",disableElevation:!0,children:"Cargar"})})]})})}var J=a(60545),Q=a(34280);function U(){var e=(0,b.v9)((function(e){return{dataR:e.tables.bankTransactions.tableData.data,loading:e.tables.bankTransactions.tableData.loading,pageSize:e.tables.bankTransactions.tableData.pageSize,pageCount:e.tables.bankTransactions.tableData.pageCount,gedure:e.auth.permissions.gedure}})),n=e.dataR,a=e.loading,t=e.pageSize,o=e.pageCount,l=e.gedure,i=l.bank_transaction_assign,s=l.bank_transaction_delete,d=(0,b.I0)(),u=(0,r.useMemo)((function(){return[{Header:"Id",accessor:"id"},{Header:"Referencia",accessor:"reference"},{Header:"Concepto",accessor:"concepto"},{Header:"Fecha de transferencia",accessor:"date"},{Header:"Monto",accessor:"amount",Cell:function(e){var n=e.cell.row.original.amount;return(0,q.C)(n)}},{Header:"Banco",accessor:"code",Cell:function(e){var n=e.cell.row.original.code;return f.P[n]||"No especificado"}},{Header:"Reclamado por",accessor:"taked_by",Cell:function(e){var n=e.cell.row.original.user;return(null===n||void 0===n?void 0:n.privilegio)+(null===n||void 0===n?void 0:n.username)||"No reclamado"}},{id:"options",Header:"Opciones",accessor:"options",Cell:function(e){var n=e.cell.row.original,a=n.id,r=n.amount;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(k.Z,{title:"Asignar",arrow:!0,children:(0,c.jsx)(T.Z,{component:"span",disabled:!i,onClick:function(){d((0,_.CI)({open:!0,data:{id:a,amount:r},select:"assignTransaction"}))},children:(0,c.jsx)(J.Z,{})})}),(0,c.jsx)(k.Z,{title:"Eliminar",arrow:!0,children:(0,c.jsx)(T.Z,{component:"span",disabled:!s,onClick:function(){d((0,_.CI)({open:!0,data:{id:a},select:"deleteTransaction"}))},children:(0,c.jsx)(P.Z,{})})})]})}}]}),[]),p=(0,r.useMemo)((function(){return n}),[n]);(0,r.useEffect)((function(){var e=null;return a&&(e=d((0,Q.o)())),function(){a&&e.abort()}}),[a]),(0,r.useEffect)((function(){return function(){d((0,z.AF)({select:"bankTransactions"}))}}),[]);return(0,c.jsx)(S.Z,{title:"Cuentas bancarias","data-tour":"bank-transaction",dataTourMassive:"tableT-massive",dataTourGlobal:"tableT-global",data:p,columns:u,pageCountData:o,pageSizeData:t,loading:a,handleGlobalFilter:function(e){d((0,z.qP)({search:e||"",select:"bankTransactions"}))},handleChange:function(e){d((0,z.ai)((0,C.Z)((0,C.Z)({},e),{},{select:"bankTransactions"})))},refresh:function(){d((0,z.bi)({select:"bankTransactions"}))},massiveOptions:function(e){return(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(k.Z,{title:"Eliminar",arrow:!0,children:(0,c.jsx)(T.Z,{component:"span",disabled:!s,onClick:function(){var n,a=0,r=[],t=(0,j.Z)(e);try{for(t.s();!(n=t.n()).done;){var o=n.value;r[a]=o.id,a++}}catch(l){t.e(l)}finally{t.f()}d((0,_.CI)({select:"deleteMassiveBankTransaction",open:!0,data:r}))},children:(0,c.jsx)(P.Z,{})})})})}})}var $=a(39571),K=a(52797),X=a(51684),ee=a(93640);function ne(){var e=(0,b.v9)((function(e){return e.requestStatus.assignTransaction})),n=e.autoComplete,a=e.data,r=e.open,o=e.loading,s=(0,b.I0)(),d=(0,i.Z)(),u=(0,K.Z)(d.breakpoints.down("md")),p=(0,m.cI)({shouldUnregister:!0}),x=p.control,f=p.handleSubmit,Z=function(e){e.user_selected=e.user_selected.id,s((0,ee.K)({submitData:e,id:a.id}))},v=function(){var e=(0,L.Z)((0,H.Z)().mark((function e(n){return(0,H.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s((0,X.q)(n));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,c.jsxs)(I.Z,{open:r,TransitionComponent:D.Z,fullScreen:u,children:[(0,c.jsxs)(w.Z,{children:["Asignar transacci\xf3n bancaria #",a.id]}),(0,c.jsx)(V.Z,{children:(0,c.jsxs)("form",{autoComplete:"off",onSubmit:f(Z),children:[(0,c.jsxs)(t.ZP,{container:!0,spacing:2,children:[(0,c.jsx)(t.ZP,{item:!0,xs:12,children:(0,c.jsxs)($.Z,{children:["Ha seleccionado la transacci\xf3n bancaria ",(0,c.jsxs)("strong",{children:["#",a.id]})," para asigarla a un usuario, esta acci\xf3n acreditar\xe1 ",(0,c.jsx)("strong",{children:(0,q.C)(a.amount||0)})," a la cuenta del usuario seleccionado."]})}),(0,c.jsx)(t.ZP,{item:!0,xs:12,children:(0,c.jsx)(h.yh,{data:n,label:"Seleccionar usuario",name:"user_selected",helperText:"Busque al usuario que desea seleccionar",control:x,disabled:o,getOptionLabel:function(e){return"".concat(e.privilegio).concat(e.username," - ").concat(e.name)||""},isOptionEqualToValue:function(e,n){return e.n_account===n.n_account},handleRequest:v,rules:{required:{value:!0,message:"* Campo requerido"}}})})]}),(0,c.jsx)("input",{type:"submit",hidden:!0})]})}),(0,c.jsxs)(O.Z,{children:[(0,c.jsx)(l.Z,{sx:{ml:1},color:"inherit",disabled:o,onClick:function(){s((0,_.CI)({open:!1,data:{},select:"assignTransaction"}))},children:"Cancelar"}),(0,c.jsx)(g.Z,{onClick:f(Z),loading:o,variant:"text",color:"inherit",children:"Asignar"})]})]})}var ae=a(16655),re=a(23164),te=a(71096),oe=a(34230);function le(){var e=(0,b.v9)((function(e){return{gedure:e.auth.permissions.gedure}})).gedure;return(0,c.jsxs)(t.ZP,{container:!0,spacing:2,sx:{paddingBottom:6},children:[e.bank_account_create&&(0,c.jsx)(t.ZP,{item:!0,xs:12,children:(0,c.jsx)(v,{})}),e.bank_account_index&&(0,c.jsxs)(t.ZP,{item:!0,xs:12,children:[(0,c.jsx)(A,{}),(0,c.jsx)(N,{}),(0,c.jsx)(E.Z,{rdx1:"requestStatus",rdx2:"deleteBankAccount",close:(0,_.CI)({open:!1,data:{},select:"deleteBankAccount"}),request:function(e){return(0,ae.Z)(e.id)},children:function(e){return(0,c.jsxs)("span",{children:["Est\xe1 a punto de ",(0,c.jsx)("strong",{children:"eliminar"})," la cuenta ",(0,c.jsx)("strong",{children:(0,q.Y)((null===e||void 0===e?void 0:e.n_account)||"")}),". Al realizarse esta acci\xf3n todas las ",(0,c.jsx)("strong",{children:"transacciones bancarias"})," registradas de la misma ",(0,c.jsx)("strong",{children:"ser\xe1n borradas"}),", pero las ",(0,c.jsx)("strong",{children:"transacciones internas"})," realizadas dentro del sistema ",(0,c.jsx)("strong",{children:"no se ver\xe1n afectadas"}),". Tenga en cuenta que esta acci\xf3n no se puede deshacer."]})}}),(0,c.jsx)(E.Z,{rdx1:"requestStatus",rdx2:"deleteBankAccountMassive",close:(0,_.CI)({open:!1,data:{},select:"deleteBankAccountMassive"}),request:function(e){return(0,te.k)(e)},children:function(e){return(0,c.jsxs)("span",{children:["Est\xe1 a punto de ",(0,c.jsx)("strong",{children:"eliminar"})," ",(0,c.jsx)("strong",{children:null===e||void 0===e?void 0:e.length})," cuenta(s). Al realizarse esta acci\xf3n todas las ",(0,c.jsx)("strong",{children:"transacciones bancarias"})," registradas de la misma ",(0,c.jsx)("strong",{children:"ser\xe1n borradas"}),", pero las ",(0,c.jsx)("strong",{children:"transacciones internas"})," realizadas dentro del sistema ",(0,c.jsx)("strong",{children:"no se ver\xe1n afectadas"}),". Tenga en cuenta que esta acci\xf3n no se puede deshacer."]})}})]}),e.bank_transaction_upload&&(0,c.jsx)(t.ZP,{item:!0,xs:12,children:(0,c.jsx)(Y,{})}),e.bank_transaction_index&&(0,c.jsxs)(t.ZP,{item:!0,xs:12,children:[(0,c.jsx)(U,{}),(0,c.jsx)(ne,{}),(0,c.jsx)(E.Z,{rdx1:"requestStatus",rdx2:"deleteTransaction",close:(0,_.CI)({open:!1,data:{},select:"deleteTransaction"}),request:function(e){return(0,re.t)(e.id)},children:function(e){return(0,c.jsxs)("span",{children:["Est\xe1 a punto de eliminar la transacci\xf3n ",(0,c.jsxs)("strong",{children:["#",e.id]}),", tenga en cuenta que esta acci\xf3n no se puede deshacer."]})}}),(0,c.jsx)(E.Z,{rdx1:"requestStatus",rdx2:"deleteMassiveBankTransaction",close:(0,_.CI)({open:!1,data:{},select:"deleteMassiveBankTransaction"}),request:function(e){return(0,oe.$)(e)},children:function(e){return(0,c.jsxs)("span",{children:["Est\xe1 a punto de ",(0,c.jsxs)("strong",{children:["eliminar ",null===e||void 0===e?void 0:e.length]})," transaccione(s), tenga en cuenta que esta acci\xf3n no se puede deshacer."]})}})]}),(0,c.jsx)(d,{})]})}}}]);
//# sourceMappingURL=5601.a3b0ce4b.chunk.js.map