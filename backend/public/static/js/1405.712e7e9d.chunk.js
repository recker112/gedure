"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[1405],{76429:function(e,n,t){var r=t(1413),a=t(72791),o=t(32232),i=t(80184),s=a.forwardRef((function(e,n){return(0,i.jsx)(o.Z,(0,r.Z)({direction:"up",ref:n},e))}));n.Z=s},39481:function(e,n,t){t.d(n,{Z:function(){return x}});t(72791);var r=t(58195),a=t(40464),o=t(8440),i=t(39571),s=t(77248),l=t(61091),c=t(52797),d=t(74142),u=t(76429),p=t(59434),f=t(39709),h=t(80184);function x(e){var n=e.rdx1,t=e.rdx2,x=e.close,Z=e.request,g=e.children,m=(0,p.v9)((function(e){return e[n][t]})),v=m.open,j=m.loading,b=m.data,C=(0,p.I0)(),P=(0,d.Z)(),w=(0,c.Z)(P.breakpoints.down("md"));return(0,h.jsxs)(r.Z,{open:v,TransitionComponent:u.Z,fullScreen:w,"aria-labelledby":"confirm-dialog-title","aria-describedby":"confirm-dialog-description",children:[(0,h.jsx)(a.Z,{children:"\xbfEst\xe1 seguro?"}),(0,h.jsx)(o.Z,{children:(0,h.jsx)(i.Z,{id:"confirm-dialog-description",children:g(b)})}),(0,h.jsxs)(s.Z,{children:[(0,h.jsx)(l.Z,{disabled:j,onClick:function(){C(x)},color:"inherit",children:"Cancelar"}),(0,h.jsx)(f.Z,{onClick:function(){C(Z(b))},loading:j,color:"inherit",children:"Confirmar"})]})]})}},70825:function(e,n,t){t.d(n,{Z:function(){return B}});var r=t(1413),a=t(93433),o=t(45987),i=t(72791),s=t(45953),l=t(30286),c=t(55112),d=t(96580),u=t(44666),p=t(4565),f=t(75814),h=t(13811),x=t(69963),Z=t(50228),g=t(21680),m=t(9827),v=t(60807),j=t(24390),b=t(19773),C=t(62461),P=t(37168),w=t(35702),y=t(12065),S=t(12715),k=t(2156),T=t(98333),z=t(10111),M=t(78243),_=t(43950),R=t(71358),D=t(29439),F=t(59911),H=t(38254),N=t(5403),I=t(5130),E=t(80184);function L(e){var n=e.state,t=e.setGlobalFilter,r=e.gotoPage,a=e.dataTourGlobal,o=(0,i.useState)(n.globalFilter),s=(0,D.Z)(o,2),l=s[0],c=s[1],d=(0,R.useAsyncDebounce)((function(e){t(e||void 0),r(0)}),500);return(0,E.jsx)(F.Z,{"data-tour":a,size:"small",value:l||"",placeholder:"Buscar...",variant:"standard",autoComplete:"off",onChange:function(e){d(e.target.value),c(e.target.value)},sx:{mr:1},InputProps:{startAdornment:(0,E.jsx)(H.Z,{position:"start",children:(0,E.jsx)(N.Z,{})}),endAdornment:(0,E.jsx)(h.Z,{disabled:!l,onClick:function(){c(""),t(void 0),r(0)},children:(0,E.jsx)(I.Z,{})})}})}var O=t(45473),G=["indeterminate"],A=i.forwardRef((function(e,n){var t=e.indeterminate,a=(0,o.Z)(e,G),s=i.useRef(),l=n||s;return i.useEffect((function(){l.current.indeterminate=t}),[l,t]),(0,E.jsx)(O.Z,(0,r.Z)({type:"checkbox",ref:l,indeterminate:t,color:t?"default":"primary"},a))})),q=["data","columns","pageSizeData","pageCountData","loading","handleGlobalFilter","handleChange","filter","massiveOptions","title","refresh","dataTourMassive","dataTourGlobal"];function B(e){var n=e.data,t=e.columns,D=e.pageSizeData,F=e.pageCountData,H=e.loading,N=e.handleGlobalFilter,I=e.handleChange,O=e.filter,G=e.massiveOptions,B=e.title,V=e.refresh,W=e.dataTourMassive,U=void 0===W?"gdTable__massive":W,Y=e.dataTourGlobal,J=void 0===Y?"gdTable__search":Y,Q=(0,o.Z)(e,q),K=(0,R.useTable)({columns:t,data:n,initialState:{hiddenColumns:["massiveSelection"],pageSize:D,pageIndex:0},manualPagination:!0,pageCount:F},R.useGlobalFilter,R.usePagination,R.useRowSelect,(function(e){e.visibleColumns.push((function(e){return[{id:"massiveSelection",Header:function(e){var n=e.getToggleAllRowsSelectedProps;return(0,E.jsx)(A,(0,r.Z)({},n()))},Cell:function(e){var n=e.row;return(0,E.jsx)(A,(0,r.Z)({},n.getToggleRowSelectedProps()))}}].concat((0,a.Z)(e))}))})),X=K.getTableProps,$=K.getTableBodyProps,ee=K.headerGroups,ne=K.page,te=K.prepareRow,re=K.state,ae=K.selectedFlatRows,oe=K.allColumns,ie=K.canPreviousPage,se=K.canNextPage,le=K.nextPage,ce=K.previousPage,de=K.setPageSize,ue=K.pageOptions,pe=K.gotoPage,fe=K.pageCount,he=re.pageIndex,xe=re.pageSize;return(0,i.useEffect)((function(){I({pageIndex:he+1,pageSize:xe})}),[he,xe]),(0,E.jsx)(s.ZP,{container:!0,spacing:2,children:(0,E.jsx)(s.ZP,{item:!0,xs:12,children:(0,E.jsxs)(l.Z,(0,r.Z)((0,r.Z)({sx:{position:"relative"}},Q),{},{children:[(0,E.jsx)(c.Z,{sx:{color:"#fff",zIndex:function(e){return e.zIndex.appBar-1},position:"absolute"},open:H,children:(0,E.jsx)(d.Z,{})}),(0,E.jsxs)(u.Z,{sx:(0,r.Z)({},ae.length>0&&{bgcolor:function(e){return(0,y.Fq)(e.palette.primary.main,e.palette.action.activatedOpacity)}}),children:[ae.length>0?(0,E.jsxs)(p.Z,{sx:{flex:"1 1 100%"},color:"inherit",variant:"subtitle1",component:"div",noWrap:!0,children:[ae.length," seleccionada(s)"]}):(0,E.jsx)(p.Z,{sx:{flex:"1 1 100%"},variant:"h6",id:"registros",component:"div",noWrap:!0,children:B}),(0,E.jsx)(L,{state:re,setGlobalFilter:N,gotoPage:pe,dataTourGlobal:J}),ae.length>0?G(ae.map((function(e){return e.original}))):(0,E.jsxs)(E.Fragment,{children:[G&&(0,E.jsx)(f.Z,{title:"Opciones massivas",arrow:!0,children:(0,E.jsx)(h.Z,{component:"span",onClick:function(){oe.map((function(e){return("massiveSelection"===e.id||"options"===e.id)&&e.toggleHidden(),null}))},"data-tour":U,disabled:ae.length>0,children:(0,E.jsx)(M.Z,{})})}),(0,E.jsx)(f.Z,{title:"Recargar",arrow:!0,children:(0,E.jsx)(h.Z,{component:"span",onClick:V,"data-tour":"gdTable__refresh",children:(0,E.jsx)(_.Z,{})})}),O&&O(pe)]})]}),(0,E.jsxs)(x.Z,{children:[(0,E.jsx)(Z.Z,{overflow:"auto",minWidth:352,children:(0,E.jsxs)(g.Z,(0,r.Z)((0,r.Z)({sx:{minWidth:650},"aria-label":"React Table"},X()),{},{children:[(0,E.jsx)(m.Z,{sx:{th:{border:0}},children:ee.map((function(e){return(0,E.jsx)(v.Z,(0,r.Z)((0,r.Z)({sx:{td:{border:0}}},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return"massiveSelection"===e.id?(0,E.jsx)(j.Z,(0,r.Z)((0,r.Z)({padding:"checkbox"},e.getHeaderProps()),{},{children:e.render("Header")})):"Opciones"===e.Header?(0,E.jsx)(j.Z,(0,r.Z)((0,r.Z)({align:"right","data-tour":"table-Opciones"},e.getHeaderProps()),{},{children:e.render("Header")})):(0,E.jsx)(j.Z,(0,r.Z)((0,r.Z)({"data-tour":"table-".concat(e.render("Header"))},e.getHeaderProps()),{},{children:e.render("Header")}))}))}))}))}),(0,E.jsxs)(b.Z,(0,r.Z)((0,r.Z)({},$()),{},{children:[ne.map((function(e){return te(e),(0,E.jsx)(v.Z,(0,r.Z)((0,r.Z)({sx:{height:"73px"}},e.getRowProps()),{},{children:e.cells.map((function(e){return"massiveSelection"===e.column.id?(0,E.jsx)(j.Z,(0,r.Z)((0,r.Z)({padding:"checkbox"},e.getCellProps()),{},{children:e.render("Cell")})):"Opciones"===e.column.Header?(0,E.jsx)(j.Z,(0,r.Z)((0,r.Z)({align:"right"},e.getCellProps()),{},{children:e.render("Cell")})):(0,E.jsx)(j.Z,(0,r.Z)((0,r.Z)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))})),0===ne.length&&(0,E.jsx)(v.Z,{children:(0,E.jsx)(j.Z,{colSpan:"100%",children:(0,E.jsx)(p.Z,{textAlign:"center",children:"No se han encontrado resultados"})})})]}))]}))}),(0,E.jsx)(Z.Z,{overflow:"auto",minWidth:352,children:(0,E.jsx)(g.Z,{children:(0,E.jsx)(C.Z,{children:(0,E.jsx)(v.Z,{children:(0,E.jsx)(j.Z,{colSpan:"100%",sx:{border:0},children:(0,E.jsxs)(s.ZP,{container:!0,justifyContent:"flex-end",alignItems:"center",spacing:1,item:!0,xs:12,children:[(0,E.jsx)(s.ZP,{item:!0,children:(0,E.jsx)(P.Z,{labelId:"page-size-table-label",id:"page-size-table",value:xe,label:"Filas",variant:"standard",onChange:function(e){de(Number(e.target.value))},children:[5,10,20,30,40,50].map((function(e){return(0,E.jsxs)(w.Z,{value:e,children:[e," Filas"]},e)}))})}),(0,E.jsx)(s.ZP,{item:!0,children:(0,E.jsx)(f.Z,{title:"Primera p\xe1gina",arrow:!0,children:(0,E.jsx)(h.Z,{component:"span",onClick:function(){return pe(0)},disabled:!ie,children:(0,E.jsx)(S.Z,{})})})}),(0,E.jsx)(s.ZP,{item:!0,children:(0,E.jsx)(f.Z,{title:"Anterior",arrow:!0,children:(0,E.jsx)(h.Z,{component:"span",onClick:ce,disabled:!ie,children:(0,E.jsx)(k.Z,{})})})}),(0,E.jsx)(s.ZP,{item:!0,children:(0,E.jsxs)(Z.Z,{component:"span",fontSize:"body2.fontSize",color:"text.secondary",children:[he+1," de ",ue.length]})}),(0,E.jsx)(s.ZP,{item:!0,children:(0,E.jsx)(f.Z,{title:"Siguiente",arrow:!0,children:(0,E.jsx)(h.Z,{component:"span",onClick:le,disabled:!se,children:(0,E.jsx)(T.Z,{})})})}),(0,E.jsx)(s.ZP,{item:!0,children:(0,E.jsx)(f.Z,{title:"\xdaltima p\xe1gina",arrow:!0,children:(0,E.jsx)(h.Z,{component:"span",onClick:function(){return pe(fe-1)},disabled:!se,children:(0,E.jsx)(z.Z,{})})})})]})})})})})})]})]}))})})}},91526:function(e,n,t){t(72791);var r=t(4837),a=t(61091),o=t(59434),i=t(57048),s=t(80184);n.Z=function(e){var n=e.steps,t=e.select,l=e.version,c=void 0===l?"v1":l,d=(0,o.v9)((function(e){return{tourOpen:e.configs.tour[t]}})).tourOpen,u=(0,o.I0)();return(0,s.jsx)(r.ZP,{steps:n,isOpen:!d,disableInteraction:!0,onAfterOpen:function(){document.body.style.overflowY="hidden"},onBeforeClose:function(){document.body.style.overflowY="auto"},showNavigationNumber:!1,showCloseButton:!1,rounded:5,lastStepNextButton:(0,s.jsx)(a.Z,{component:"span",size:"small",color:"primary",onClick:function(){u((0,i.Mn)({open:!0,tour:t,version:c}))},children:"Terminar gu\xeda"})})}},81075:function(e,n,t){t.d(n,{Z:function(){return l}});var r=t(72791),a=t(86951),o=t(59434),i=t(80064),s=t(5016);function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.messageTo200,t=void 0===n||n,l=e.messageTo400,c=void 0===l||l,d=e.message400,u=void 0!==d&&d,p=e.messageTo404,f=void 0===p||p,h=e.message404,x=void 0===h?"Ruta URL no encontrada":h,Z=e.messageTo422,g=void 0===Z||Z,m=e.message422,v=void 0===m?"Error al verificar los datos":m,j=(0,a.Ds)(),b=j.enqueueSnackbar,C=(0,o.v9)((function(e){return e.notistack})),P=C.notiText,w=C.notiStatus,y=C.notiVariant,S=(0,o.I0)();(0,r.useEffect)((function(){return 200===w||201===w?t&&b(P,{variant:y}):400===w?c&&b(u||P,{variant:"warning"}):401===w?(b("Sesi\xf3n expirada",{variant:"info"}),S((0,s.Rg)())):403===w?b("No tienes permisos para esta acci\xf3n",{variant:"error"}):404===w?f&&b(P||x,{variant:"warning"}):422===w?g&&b(v,{variant:"error"}):429===w?(b("Demasiadas peticiones",{variant:"info"}),S((0,s.Rg)())):500===w?b("No se ha podido conectar con la base de datos",{variant:"error"}):"offline"===w&&b("Revise su conexi\xf3n a internet",{variant:"error"}),function(){S((0,i.ZN)())}}),[P,w,y,S,b,t,c,u,f,x,g,v])}},91405:function(e,n,t){t.r(n),t.d(n,{default:function(){return M}});var r=t(72791),a=t(57689),o=t(50228),i=t(20803),s=t(45953),l=t(61091),c=t(1413),d=t(75814),u=t(13811),p=t(3746),f=t(41286),h=t(60383),x=t(70825),Z=t(59434),g=t(40004),m=t(15728),v=t(6728),j=t(80184);function b(){var e=(0,a.s0)(),n=(0,Z.v9)((function(e){return{dataR:e.tables.posts.tableData.data,loading:e.tables.posts.tableData.loading,pageSize:e.tables.posts.tableData.pageSize,pageCount:e.tables.posts.tableData.pageCount,permissions:e.auth.permissions}})),t=n.dataR,o=n.loading,i=n.pageSize,s=n.pageCount,l=n.permissions.administrar,b=l.posts_edit,C=l.posts_destroy,P=(0,Z.I0)(),w=(0,r.useMemo)((function(){return[{Header:"T\xedtulo",accessor:"title"},{Header:"Due\xf1o",accessor:"user",Cell:function(e){var n=e.cell.row.original.user;return(null===n||void 0===n?void 0:n.privilegio)+(null===n||void 0===n?void 0:n.username)||"Ninguno"}},{Header:"Fecha de publicaci\xf3n",accessor:"created_at"},{id:"options",Header:"Opciones",accessor:"options",Cell:function(n){var t=n.cell.row.original,r=(t.id,t.slug),a=t.title;return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(d.Z,{title:"Ver",arrow:!0,children:(0,j.jsx)(u.Z,{onClick:function(){e("/noticias/".concat(r),{state:{backPanel:!0}})},component:"span",children:(0,j.jsx)(p.Z,{})})}),(0,j.jsx)(d.Z,{title:"Editar",arrow:!0,children:(0,j.jsx)(u.Z,{onClick:function(){e("editar/".concat(r))},component:"span",disabled:!b,children:(0,j.jsx)(f.Z,{})})}),(0,j.jsx)(d.Z,{title:"Eliminar",arrow:!0,children:(0,j.jsx)(u.Z,{onClick:function(){P((0,v.CI)({open:!0,data:{slug:r,title:a},select:"deletePost"}))},component:"span",disabled:!C,children:(0,j.jsx)(h.Z,{})})})]})}}]}),[]),y=(0,r.useMemo)((function(){return t}),[t]);(0,r.useEffect)((function(){var e=null;return o&&(e=P((0,g.J)())),function(){o&&e.abort()}}),[o]),(0,r.useEffect)((function(){return function(){P((0,m.AF)({select:"posts"}))}}),[]);return(0,j.jsx)(x.Z,{title:"Lista de noticias",data:y,columns:w,pageCountData:s,pageSizeData:i,loading:o,handleGlobalFilter:function(e){P((0,m.qP)({search:e||"",select:"posts"}))},handleChange:function(e){P((0,m.ai)((0,c.Z)((0,c.Z)({},e),{},{select:"posts"})))},refresh:function(){P((0,m.bi)({select:"posts"}))}})}var C=t(39481),P=t(81075),w=t(4565),y=t(74142),S=t(91526);function k(){var e=(0,y.Z)(),n=[{selector:"",content:function(e){var n=e.goTo;return(0,j.jsxs)("div",{children:[(0,j.jsx)(w.Z,{color:"primary",className:"text__bold--big",variant:"h5",children:"Publicaciones"}),(0,j.jsxs)(w.Z,{variant:"body1",children:["En esta secci\xf3n podr\xe1 ",(0,j.jsx)("strong",{children:"crear, editar y eliminar"})," publicaciones."]}),(0,j.jsx)(l.Z,{size:"small",color:"primary",onClick:function(){n(4)},children:"Saltar tour"})]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdPub__create"]',content:function(){return(0,j.jsx)(w.Z,{variant:"body1",children:"Este bot\xf3n le permite crear una nueva publicaci\xf3n."})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdTable__refresh"]',content:function(){return(0,j.jsxs)(w.Z,{variant:"body1",children:["Este bot\xf3n le permite ",(0,j.jsx)("strong",{children:"refrescar los datos"})," mostrados en la tabla."]})},style:{backgroundColor:e.palette.background.paper}},{selector:'[data-tour="gdTable__search"]',content:function(){return(0,j.jsxs)(w.Z,{variant:"body1",children:["Aqu\xed podr\xe1 buscar las publicaciones del sistema por ",(0,j.jsx)("strong",{children:"t\xedtulo"}),", ",(0,j.jsx)("strong",{children:"usuario"})," o ",(0,j.jsx)("strong",{children:"fecha"}),"."]})},style:{backgroundColor:e.palette.background.paper}},{selector:"",content:function(){return(0,j.jsx)(w.Z,{variant:"body1",children:"Con esto finaliza esta gu\xeda, navegue entre otras partes del sistema para encontrar m\xe1s gu\xedas."})},style:{backgroundColor:e.palette.background.paper}}];return(0,j.jsx)(S.Z,{select:"publicaciones",steps:n})}var T=t(87519),z={container:{flexGrow:1,paddingBottom:6,marginTop:{xs:"80px",sm:12}}};function M(){(0,P.Z)();var e=(0,Z.v9)((function(e){return{administrar:e.auth.permissions.administrar,count_notify:e.auth.notify.count}})),n=e.administrar.posts_create,t=e.count_notify;document.title=t>0?"(".concat(t,") Publicaciones - La Candelaria"):"Publicaciones - La Candelaria";var r=(0,a.s0)();return(0,j.jsxs)(o.Z,{component:"main",sx:z.container,children:[(0,j.jsxs)(i.Z,{children:[(0,j.jsx)(o.Z,{fontSize:"h4.fontSize",mb:3,className:"text__bold--big",children:"Publicaciones"}),(0,j.jsxs)(s.ZP,{container:!0,spacing:2,children:[(0,j.jsx)(s.ZP,{container:!0,justifyContent:"flex-end",item:!0,xs:12,children:(0,j.jsx)(l.Z,{variant:"contained","data-tour":"gdPub__create",onClick:function(){r("crear")},disabled:!n,children:"Crear publicaci\xf3n"})}),(0,j.jsx)(s.ZP,{item:!0,xs:12,children:(0,j.jsx)(b,{})})]})]}),(0,j.jsx)(C.Z,{rdx1:"requestStatus",rdx2:"deletePost",close:(0,v.CI)({open:!1,data:{},select:"deletePost"}),request:function(e){return(0,T.f)(e.slug)},children:function(e){return(0,j.jsxs)("span",{children:["Est\xe1 a punto de eliminar la noticia ",(0,j.jsx)("strong",{children:e.title}),". Una vez realizada no se podr\xe1 deshacer esta acci\xf3n."]})}}),(0,j.jsx)(k,{})]})}},60383:function(e,n,t){var r=t(64836);n.Z=void 0;var a=r(t(45649)),o=t(80184),i=(0,a.default)((0,o.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"}),"DeleteForever");n.Z=i},41286:function(e,n,t){var r=t(64836);n.Z=void 0;var a=r(t(45649)),o=t(80184),i=(0,a.default)((0,o.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");n.Z=i},3746:function(e,n,t){var r=t(64836);n.Z=void 0;var a=r(t(45649)),o=t(80184),i=(0,a.default)((0,o.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");n.Z=i},39571:function(e,n,t){t.d(n,{Z:function(){return g}});var r=t(63366),a=t(87462),o=t(72791),i=t(28182),s=t(94419),l=t(60277),c=t(85513),d=t(4565),u=t(75878),p=t(21217);function f(e){return(0,p.Z)("MuiDialogContentText",e)}(0,u.Z)("MuiDialogContentText",["root"]);var h=t(80184),x=["children","className"],Z=(0,l.ZP)(d.Z,{shouldForwardProp:function(e){return(0,l.FO)(e)||"classes"===e},name:"MuiDialogContentText",slot:"Root",overridesResolver:function(e,n){return n.root}})({}),g=o.forwardRef((function(e,n){var t=(0,c.Z)({props:e,name:"MuiDialogContentText"}),o=t.className,l=(0,r.Z)(t,x),d=function(e){var n=e.classes,t=(0,s.Z)({root:["root"]},f,n);return(0,a.Z)({},n,t)}(l);return(0,h.jsx)(Z,(0,a.Z)({component:"p",variant:"body1",color:"text.secondary",ref:n,ownerState:l,className:(0,i.Z)(d.root,o)},t,{classes:d}))}))},40464:function(e,n,t){var r=t(87462),a=t(63366),o=t(72791),i=t(28182),s=t(94419),l=t(4565),c=t(60277),d=t(85513),u=t(5186),p=t(43053),f=t(80184),h=["className","id"],x=(0,c.ZP)(l.Z,{name:"MuiDialogTitle",slot:"Root",overridesResolver:function(e,n){return n.root}})({padding:"16px 24px",flex:"0 0 auto"}),Z=o.forwardRef((function(e,n){var t=(0,d.Z)({props:e,name:"MuiDialogTitle"}),l=t.className,c=t.id,Z=(0,a.Z)(t,h),g=t,m=function(e){var n=e.classes;return(0,s.Z)({root:["root"]},u.a,n)}(g),v=o.useContext(p.Z).titleId,j=void 0===v?c:v;return(0,f.jsx)(x,(0,r.Z)({component:"h2",className:(0,i.Z)(m.root,l),ownerState:g,ref:n,variant:"h6",id:j},Z))}));n.Z=Z},52797:function(e,n,t){var r;t.d(n,{Z:function(){return p}});var a=t(29439),o=t(72791),i=t(69120),s=t(33073),l=t(93026);function c(e,n,t,r,i){var s="undefined"!==typeof window&&"undefined"!==typeof window.matchMedia,c=o.useState((function(){return i&&s?t(e).matches:r?r(e).matches:n})),d=(0,a.Z)(c,2),u=d[0],p=d[1];return(0,l.Z)((function(){var n=!0;if(s){var r=t(e),a=function(){n&&p(r.matches)};return a(),r.addListener(a),function(){n=!1,r.removeListener(a)}}}),[e,t,s]),u}var d=(r||(r=t.t(o,2))).useSyncExternalStore;function u(e,n,t,r){var i=o.useCallback((function(){return n}),[n]),s=o.useMemo((function(){if(null!==r){var n=r(e).matches;return function(){return n}}return i}),[i,e,r]),l=o.useMemo((function(){if(null===t)return[i,function(){return function(){}}];var n=t(e);return[function(){return n.matches},function(e){return n.addListener(e),function(){n.removeListener(e)}}]}),[i,t,e]),c=(0,a.Z)(l,2),u=c[0],p=c[1];return d(p,u,s)}function p(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=(0,i.Z)(),r="undefined"!==typeof window&&"undefined"!==typeof window.matchMedia,a=(0,s.Z)({name:"MuiUseMediaQuery",props:n,theme:t}),o=a.defaultMatches,l=void 0!==o&&o,p=a.matchMedia,f=void 0===p?r?window.matchMedia:null:p,h=a.ssrMatchMedia,x=void 0===h?null:h,Z=a.noSsr;var g="function"===typeof e?e(t):e;g=g.replace(/^@media( ?)/m,"");var m=void 0!==d?u:c,v=m(g,l,f,x,Z);return v}}}]);
//# sourceMappingURL=1405.712e7e9d.chunk.js.map