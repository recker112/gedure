"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[348],{76429:function(e,n,a){var r=a(1413),t=a(72791),i=a(55931),l=a(80184),o=t.forwardRef((function(e,n){return(0,l.jsx)(i.Z,(0,r.Z)({direction:"up",ref:n},e))}));n.Z=o},70825:function(e,n,a){a.d(n,{Z:function(){return M}});var r=a(1413),t=a(93433),i=a(72791),l=a(61889),o=a(10703),s=a(52739),d=a(13239),c=a(34663),u=a(20890),Z=a(20068),p=a(13400),v=a(39281),x=a(68870),h=a(79836),f=a(56890),g=a(35855),m=a(53994),j=a(53382),b=a(68582),C=a(12674),P=a(23786),w=a(12065),S=a(12715),z=a(2156),R=a(98333),k=a(10111),T=a(78243),y=a(43950),H=a(71358),G=a(29439),I=a(48550),V=a(63466),F=a(5403),O=a(5130),A=a(80184);function _(e){var n=e.state,a=e.setGlobalFilter,r=e.gotoPage,t=(0,i.useState)(n.globalFilter),l=(0,G.Z)(t,2),o=l[0],s=l[1],d=(0,H.useAsyncDebounce)((function(e){a(e||void 0),r(0)}),500);return(0,A.jsx)(I.Z,{"data-tour":"gdTable__search",size:"small",value:o||"",placeholder:"Buscar...",variant:"standard",onChange:function(e){d(e.target.value),s(e.target.value)},sx:{mr:1},InputProps:{startAdornment:(0,A.jsx)(V.Z,{position:"start",children:(0,A.jsx)(F.Z,{})}),endAdornment:(0,A.jsx)(p.Z,{disabled:!o,onClick:function(){s(""),a(void 0),r(0)},children:(0,A.jsx)(O.Z,{})})}})}var L=a(45987),B=a(94454),N=["indeterminate"],q=i.forwardRef((function(e,n){var a=e.indeterminate,t=(0,L.Z)(e,N),l=i.useRef(),o=n||l;return i.useEffect((function(){o.current.indeterminate=a}),[o,a]),(0,A.jsx)(B.Z,(0,r.Z)({type:"checkbox",ref:o,indeterminate:a,color:a?"default":"primary"},t))}));function M(e){var n=e.data,a=e.columns,G=e.pageSizeData,I=e.pageCountData,V=e.loading,F=e.handleGlobalFilter,O=e.handleChange,L=e.filter,B=e.massiveOptions,N=e.title,M=e.refresh,D=(0,H.useTable)({columns:a,data:n,initialState:{hiddenColumns:["massiveSelection"],pageSize:G,pageIndex:0},manualPagination:!0,pageCount:I},H.useGlobalFilter,H.usePagination,H.useRowSelect,(function(e){e.visibleColumns.push((function(e){return[{id:"massiveSelection",Header:function(e){var n=e.getToggleAllRowsSelectedProps;return(0,A.jsx)(q,(0,r.Z)({},n()))},Cell:function(e){var n=e.row;return(0,A.jsx)(q,(0,r.Z)({},n.getToggleRowSelectedProps()))}}].concat((0,t.Z)(e))}))})),W=D.getTableProps,E=D.getTableBodyProps,U=D.headerGroups,Y=D.page,J=D.prepareRow,K=D.state,Q=D.selectedFlatRows,X=D.allColumns,$=D.canPreviousPage,ee=D.canNextPage,ne=D.nextPage,ae=D.previousPage,re=D.setPageSize,te=D.pageOptions,ie=D.gotoPage,le=D.pageCount,oe=K.pageIndex,se=K.pageSize;return(0,i.useEffect)((function(){O({pageIndex:oe,pageSize:se})}),[oe,se]),(0,A.jsx)(l.ZP,{container:!0,spacing:2,children:(0,A.jsx)(l.ZP,{item:!0,xs:12,children:(0,A.jsxs)(o.Z,{sx:{position:"relative"},children:[(0,A.jsx)(s.Z,{sx:{color:"#fff",zIndex:function(e){return e.zIndex.appBar-1},position:"absolute"},open:V,children:(0,A.jsx)(d.Z,{})}),(0,A.jsxs)(c.Z,{sx:(0,r.Z)({},Q.length>0&&{bgcolor:function(e){return(0,w.Fq)(e.palette.primary.main,e.palette.action.activatedOpacity)}}),children:[Q.length>0?(0,A.jsxs)(u.Z,{sx:{flex:"1 1 100%"},color:"inherit",variant:"subtitle1",component:"div",noWrap:!0,children:[Q.length," seleccionada(s)"]}):(0,A.jsx)(u.Z,{sx:{flex:"1 1 100%"},variant:"h6",id:"registros",component:"div",noWrap:!0,children:N}),(0,A.jsx)(_,{state:K,setGlobalFilter:F,gotoPage:ie}),Q.length>0?B(Q.map((function(e){return e.original}))):(0,A.jsxs)(A.Fragment,{children:[B&&(0,A.jsx)(Z.Z,{title:"Opciones massivas",arrow:!0,children:(0,A.jsx)(p.Z,{component:"span",onClick:function(){X.map((function(e){return("massiveSelection"===e.id||"options"===e.id)&&e.toggleHidden(),null}))},"data-tour":"gdTable__massive",disabled:Q.length>0,children:(0,A.jsx)(T.Z,{})})}),(0,A.jsx)(Z.Z,{title:"Recargar",arrow:!0,children:(0,A.jsx)(p.Z,{component:"span",onClick:M,"data-tour":"gdTable__refresh",children:(0,A.jsx)(y.Z,{})})}),L]})]}),(0,A.jsxs)(v.Z,{children:[(0,A.jsx)(x.Z,{overflow:"auto",minWidth:352,children:(0,A.jsxs)(h.Z,(0,r.Z)((0,r.Z)({sx:{minWidth:650},"aria-label":"React Table"},W()),{},{children:[(0,A.jsx)(f.Z,{sx:{th:{border:0}},children:U.map((function(e){return(0,A.jsx)(g.Z,(0,r.Z)((0,r.Z)({sx:{td:{border:0}}},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return"massiveSelection"===e.id?(0,A.jsx)(m.Z,(0,r.Z)((0,r.Z)({padding:"checkbox"},e.getHeaderProps()),{},{children:e.render("Header")})):"Opciones"===e.Header?(0,A.jsx)(m.Z,(0,r.Z)((0,r.Z)({align:"right"},e.getHeaderProps()),{},{children:e.render("Header")})):(0,A.jsx)(m.Z,(0,r.Z)((0,r.Z)({},e.getHeaderProps()),{},{children:e.render("Header")}))}))}))}))}),(0,A.jsxs)(j.Z,(0,r.Z)((0,r.Z)({},E()),{},{children:[Y.map((function(e){return J(e),(0,A.jsx)(g.Z,(0,r.Z)((0,r.Z)({sx:{height:"73px"}},e.getRowProps()),{},{children:e.cells.map((function(e){return"massiveSelection"===e.column.id?(0,A.jsx)(m.Z,(0,r.Z)((0,r.Z)({padding:"checkbox"},e.getCellProps()),{},{children:e.render("Cell")})):"Opciones"===e.column.Header?(0,A.jsx)(m.Z,(0,r.Z)((0,r.Z)({align:"right"},e.getCellProps()),{},{children:e.render("Cell")})):(0,A.jsx)(m.Z,(0,r.Z)((0,r.Z)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))})),0===Y.length&&(0,A.jsx)(g.Z,{children:(0,A.jsx)(m.Z,{colSpan:"100%",children:(0,A.jsx)(u.Z,{textAlign:"center",children:"No se han encontrado resultados"})})})]}))]}))}),(0,A.jsx)(x.Z,{overflow:"auto",minWidth:352,children:(0,A.jsx)(h.Z,{children:(0,A.jsx)(b.Z,{children:(0,A.jsx)(g.Z,{children:(0,A.jsx)(m.Z,{colSpan:"100%",sx:{border:0},children:(0,A.jsxs)(l.ZP,{container:!0,justifyContent:"flex-end",alignItems:"center",spacing:1,item:!0,xs:12,children:[(0,A.jsx)(l.ZP,{item:!0,children:(0,A.jsx)(C.Z,{labelId:"page-size-table-label",id:"page-size-table",value:se,label:"Filas",variant:"standard",onChange:function(e){re(Number(e.target.value))},children:[5,10,20,30,40,50].map((function(e){return(0,A.jsxs)(P.Z,{value:e,children:[e," Filas"]},e)}))})}),(0,A.jsx)(l.ZP,{item:!0,children:(0,A.jsx)(Z.Z,{title:"Primera p\xe1gina",arrow:!0,children:(0,A.jsx)(p.Z,{component:"span",onClick:function(){return ie(0)},disabled:!$,children:(0,A.jsx)(S.Z,{})})})}),(0,A.jsx)(l.ZP,{item:!0,children:(0,A.jsx)(Z.Z,{title:"Anterior",arrow:!0,children:(0,A.jsx)(p.Z,{component:"span",onClick:ae,disabled:!$,children:(0,A.jsx)(z.Z,{})})})}),(0,A.jsx)(l.ZP,{item:!0,children:(0,A.jsxs)(x.Z,{component:"span",fontSize:"body2.fontSize",color:"text.secondary",children:[oe+1," de ",te.length]})}),(0,A.jsx)(l.ZP,{item:!0,children:(0,A.jsx)(Z.Z,{title:"Siguiente",arrow:!0,children:(0,A.jsx)(p.Z,{component:"span",onClick:ne,disabled:!ee,children:(0,A.jsx)(R.Z,{})})})}),(0,A.jsx)(l.ZP,{item:!0,children:(0,A.jsx)(Z.Z,{title:"\xdaltima p\xe1gina",arrow:!0,children:(0,A.jsx)(p.Z,{component:"span",onClick:function(){return ie(le-1)},disabled:!ee,children:(0,A.jsx)(k.Z,{})})})})]})})})})})})]})]})})})}},91526:function(e,n,a){a(72791);var r=a(4837),t=a(24518),i=a(16030),l=a(57048),o=a(80184);n.Z=function(e){var n=e.steps,a=e.select,s=e.version,d=void 0===s?"v1":s,c=(0,i.v9)((function(e){return{tourOpen:e.configs.tour[a]}})).tourOpen,u=(0,i.I0)();return(0,o.jsx)(r.ZP,{steps:n,isOpen:!c,disableInteraction:!0,onAfterOpen:function(){document.body.style.overflowY="hidden"},onBeforeClose:function(){document.body.style.overflowY="auto"},showCloseButton:!1,rounded:5,lastStepNextButton:(0,o.jsx)(t.Z,{component:"span",size:"small",color:"primary",onClick:function(){u((0,l.Mn)({open:!0,tour:a,version:d}))},children:"Terminar gu\xeda"})})}},37369:function(e,n,a){a.d(n,{RJ:function(){return t},Y5:function(){return r},wp:function(){return i}});var r=[{value:"1G",label:"1 grado"},{value:"2G",label:"2 grado"},{value:"3G",label:"3 grado"},{value:"4G",label:"4 grado"},{value:"5G",label:"5 grado"},{value:"6G",label:"6 grado"},{value:"1",label:"1 a\xf1o"},{value:"2",label:"2 a\xf1o"},{value:"3",label:"3 a\xf1o"},{value:"4",label:"4 a\xf1o"},{value:"5",label:"5 a\xf1o"},{value:"6",label:"6 a\xf1o"}],t=[{value:"A",label:"A"},{value:"B",label:"B"},{value:"C",label:"C"},{value:"U",label:"U"}],i=[{value:"1",label:"Lapso 1"},{value:"2",label:"Lapso 2"},{value:"3",label:"Lapso 3"}]},6122:function(e,n,a){a.d(n,{V:function(){return u}});var r=a(1413),t=(a(72791),a(68096)),i=a(17133),l=a(10765),o=a(85523),s=a(61419),d=a(61134),c=a(80184);function u(e){var n=e.disabled,a=e.label,u=e.name,Z=e.control,p=e.defaultValue,v=e.row,x=e.radioList,h=e.rules,f=void 0===h?{required:"* Campo requerido"}:h,g=(0,d.bc)({name:u,control:Z,rules:f,defaultValue:p}),m=Object.assign({},g.field),j=g.fieldState.invalid;return(0,c.jsxs)(t.Z,{error:j,component:"fieldset",disabled:n,children:[(0,c.jsx)(i.Z,{component:"legend",children:a}),(0,c.jsx)(l.Z,(0,r.Z)((0,r.Z)({},m),{},{"aria-label":a,row:v,children:x.map((function(e,n){return(0,c.jsx)(o.Z,{value:e.value,control:(0,c.jsx)(s.Z,{}),label:e.label},n)}))}))]})}},20310:function(e,n,a){a.d(n,{g:function(){return p}});var r=a(1413),t=a(45987),i=(a(72791),a(68096)),l=a(30829),o=a(12674),s=a(47071),d=a(61134),c=a(80184),u=["name","label","control","helperText","defaultValue","rules","children"],Z=["ref"];function p(e){var n=e.name,a=e.label,p=e.control,v=e.helperText,x=void 0===v?"":v,h=e.defaultValue,f=void 0===h?"":h,g=e.rules,m=void 0===g?{required:"* Campo requerido"}:g,j=e.children,b=(0,t.Z)(e,u),C=(0,d.bc)({name:n,control:p,rules:m,defaultValue:f}),P=C.field,w=(P.ref,(0,t.Z)(P,Z)),S=C.fieldState,z=S.invalid,R=S.error;return(0,c.jsxs)(i.Z,(0,r.Z)((0,r.Z)({},b),{},{error:z,children:[(0,c.jsx)(l.Z,{id:n+"-label",children:a}),(0,c.jsx)(o.Z,(0,r.Z)((0,r.Z)({labelId:n+"-label",label:a,id:n},w),{},{children:j})),(0,c.jsx)(s.Z,{children:R?R.message:x})]}))}},81075:function(e,n,a){a.d(n,{Z:function(){return s}});var r=a(72791),t=a(86951),i=a(16030),l=a(80064),o=a(5016);function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.messageTo200,a=void 0===n||n,s=e.messageTo400,d=void 0===s||s,c=e.message400,u=void 0!==c&&c,Z=e.messageTo404,p=void 0===Z||Z,v=e.message404,x=void 0===v?"Ruta URL no encontrada":v,h=e.messageTo422,f=void 0===h||h,g=e.message422,m=void 0===g?"Error al verificar los datos":g,j=(0,t.Ds)(),b=j.enqueueSnackbar,C=(0,i.v9)((function(e){return e.notistack})),P=C.notiText,w=C.notiStatus,S=C.notiVariant,z=(0,i.I0)();(0,r.useEffect)((function(){return 200===w||201===w?a&&b(P,{variant:S}):400===w?d&&b(u||P,{variant:"warning"}):401===w?(b("Sesi\xf3n expirada",{variant:"info"}),z((0,o.Rg)())):403===w?b("No tienes permisos para esta acci\xf3n",{variant:"error"}):404===w?p&&b(P||x,{variant:"warning"}):422===w?f&&b(m,{variant:"error"}):429===w?(b("Demasiadas peticiones",{variant:"info"}),z((0,o.Rg)())):500===w?b("No se ha podido conectar con la base de datos",{variant:"error"}):"offline"===w&&b("Revise su conexi\xf3n a internet",{variant:"error"}),function(){z((0,l.ZN)())}}),[P,w,S,z,b,a,d,u,p,x,f,m])}},55037:function(e,n,a){var r=a(64836);n.Z=void 0;var t=r(a(45649)),i=a(80184),l=(0,t.default)((0,i.jsx)("path",{d:"M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"}),"Class");n.Z=l},91903:function(e,n,a){var r=a(64836);n.Z=void 0;var t=r(a(45649)),i=a(80184),l=(0,t.default)((0,i.jsx)("path",{d:"M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"}),"FilterList");n.Z=l},86753:function(e,n,a){var r=a(64836);n.Z=void 0;var t=r(a(45649)),i=a(80184),l=(0,t.default)((0,i.jsx)("path",{d:"M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93 0-4.42-3.58-8-8-8zm-6 8c0-1.65.67-3.15 1.76-4.24L6.34 7.34C4.9 8.79 4 10.79 4 13c0 4.08 3.05 7.44 7 7.93v-2.02c-2.83-.48-5-2.94-5-5.91z"}),"RestartAlt");n.Z=l}}]);
//# sourceMappingURL=348.bedeb239.chunk.js.map