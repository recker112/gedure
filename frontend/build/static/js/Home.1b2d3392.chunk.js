(this["webpackJsonpcandelaria-web-frontend"]=this["webpackJsonpcandelaria-web-frontend"]||[]).push([[3],{202:function(e,t,n){"use strict";var a=n(1),i=n(2),r=n(0),o=n.n(r),c=(n(3),n(72)),s=n(18),l=n(21),d=n(19),u=n(7),m={entering:{transform:"none"},entered:{transform:"none"}},f={enter:s.b.enteringScreen,exit:s.b.leavingScreen},x=o.a.forwardRef((function(e,t){var n=e.children,r=e.in,s=e.onEnter,x=e.onExit,g=e.style,p=e.timeout,b=void 0===p?f:p,v=Object(i.a)(e,["children","in","onEnter","onExit","style","timeout"]),w=Object(l.a)(),j=Object(u.a)(n.ref,t);return o.a.createElement(c.a,Object(a.a)({appear:!0,in:r,onEnter:function(e,t){Object(d.b)(e);var n=Object(d.a)({style:g,timeout:b},{mode:"enter"});e.style.webkitTransition=w.transitions.create("transform",n),e.style.transition=w.transitions.create("transform",n),s&&s(e,t)},onExit:function(e){var t=Object(d.a)({style:g,timeout:b},{mode:"exit"});e.style.webkitTransition=w.transitions.create("transform",t),e.style.transition=w.transitions.create("transform",t),x&&x(e)},timeout:b},v),(function(e,t){return o.a.cloneElement(n,Object(a.a)({style:Object(a.a)({transform:"scale(0)",visibility:"exited"!==e||r?void 0:"hidden"},m[e],{},g,{},n.props.style),ref:j},t))}))}));t.a=x},215:function(e,t,n){"use strict";var a=n(2),i=n(1),r=n(0),o=n.n(r),c=(n(3),n(4)),s=n(5),l=[0,1,2,3,4,5,6,7,8,9,10],d=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=parseFloat(e);return"".concat(n/t).concat(String(e).replace(String(n),"")||"px")}var m=o.a.forwardRef((function(e,t){var n=e.alignContent,r=void 0===n?"stretch":n,s=e.alignItems,l=void 0===s?"stretch":s,d=e.classes,u=e.className,m=e.component,f=void 0===m?"div":m,x=e.container,g=void 0!==x&&x,p=e.direction,b=void 0===p?"row":p,v=e.item,w=void 0!==v&&v,j=e.justify,y=void 0===j?"flex-start":j,E=e.lg,h=void 0!==E&&E,S=e.md,k=void 0!==S&&S,C=e.sm,O=void 0!==C&&C,N=e.spacing,W=void 0===N?0:N,B=e.wrap,z=void 0===B?"wrap":B,M=e.xl,F=void 0!==M&&M,I=e.xs,P=void 0!==I&&I,G=e.zeroMinWidth,T=void 0!==G&&G,q=Object(a.a)(e,["alignContent","alignItems","classes","className","component","container","direction","item","justify","lg","md","sm","spacing","wrap","xl","xs","zeroMinWidth"]),D=Object(c.a)(d.root,u,g&&[d.container,0!==W&&d["spacing-xs-".concat(String(W))]],w&&d.item,T&&d.zeroMinWidth,"row"!==b&&d["direction-xs-".concat(String(b))],"wrap"!==z&&d["wrap-xs-".concat(String(z))],"stretch"!==l&&d["align-items-xs-".concat(String(l))],"stretch"!==r&&d["align-content-xs-".concat(String(r))],"flex-start"!==y&&d["justify-xs-".concat(String(y))],!1!==P&&d["grid-xs-".concat(String(P))],!1!==O&&d["grid-sm-".concat(String(O))],!1!==k&&d["grid-md-".concat(String(k))],!1!==h&&d["grid-lg-".concat(String(h))],!1!==F&&d["grid-xl-".concat(String(F))]);return o.a.createElement(f,Object(i.a)({className:D,ref:t},q))})),f=Object(s.a)((function(e){return Object(i.a)({root:{},container:{boxSizing:"border-box",display:"flex",flexWrap:"wrap",width:"100%"},item:{boxSizing:"border-box",margin:"0"},zeroMinWidth:{minWidth:0},"direction-xs-column":{flexDirection:"column"},"direction-xs-column-reverse":{flexDirection:"column-reverse"},"direction-xs-row-reverse":{flexDirection:"row-reverse"},"wrap-xs-nowrap":{flexWrap:"nowrap"},"wrap-xs-wrap-reverse":{flexWrap:"wrap-reverse"},"align-items-xs-center":{alignItems:"center"},"align-items-xs-flex-start":{alignItems:"flex-start"},"align-items-xs-flex-end":{alignItems:"flex-end"},"align-items-xs-baseline":{alignItems:"baseline"},"align-content-xs-center":{alignContent:"center"},"align-content-xs-flex-start":{alignContent:"flex-start"},"align-content-xs-flex-end":{alignContent:"flex-end"},"align-content-xs-space-between":{alignContent:"space-between"},"align-content-xs-space-around":{alignContent:"space-around"},"justify-xs-center":{justifyContent:"center"},"justify-xs-flex-end":{justifyContent:"flex-end"},"justify-xs-space-between":{justifyContent:"space-between"},"justify-xs-space-around":{justifyContent:"space-around"},"justify-xs-space-evenly":{justifyContent:"space-evenly"}},function(e,t){var n={};return l.forEach((function(a){var i=e.spacing(a);0!==i&&(n["spacing-".concat(t,"-").concat(a)]={margin:"-".concat(u(i,2)),width:"calc(100% + ".concat(u(i),")"),"& > $item":{padding:u(i,2)}})})),n}(e,"xs"),{},e.breakpoints.keys.reduce((function(t,n){return function(e,t,n){var a={};d.forEach((function(e){var t="grid-".concat(n,"-").concat(e);if(!0!==e)if("auto"!==e){var i="".concat(Math.round(e/12*1e8)/1e6,"%");a[t]={flexBasis:i,flexGrow:0,maxWidth:i}}else a[t]={flexBasis:"auto",flexGrow:0,maxWidth:"none"};else a[t]={flexBasis:0,flexGrow:1,maxWidth:"100%"}})),"xs"===n?Object(i.a)(e,a):e[t.breakpoints.up(n)]=a}(t,e,n),t}),{}))}),{name:"MuiGrid"})(m);t.a=f},268:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(215),o=n(142),c=n(46),s=n(202);function l(e){var t=Object(a.useState)(0),n=Object(c.a)(t,2),r=n[0],l=n[1],d=e.options,u=d.text,m=d.background,f=d.data;return Object(a.useEffect)((function(){var e=!1;e||setTimeout((function(){return l({StudientsTotal:4735,StudientsBlock:47,StudientsPermaBlock:12,PublicNotice:12,Likes:312}[f]),function(){e=!0}}),1e3)}),[f]),i.a.createElement(o.a,{variant:"outlined",className:"Status"},i.a.createElement(s.a,{in:!0,timeout:800},i.a.createElement("div",{className:"circulo",style:{background:m}},i.a.createElement("span",{className:"text"},r))),i.a.createElement("div",null,u))}t.default=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(r.a,{container:!0,spacing:2,justify:"center"},[{background:"#4879FC",text:"Estudiantes registrado en el sistema",data:"StudientsTotal"},{background:"#F8C822",text:"Estudiantes bloqueados",data:"StudientsBlock"},{background:"#FC4850",text:"Estudiantes bloqueados permanentemente",data:"StudientsPermaBlock"},{background:"#b448fc",text:"Noticias publicadas",data:"PublicNotice"},{background:"#39CCCC",text:'"Me gusta" recibidos',data:"Likes"}].map((function(e,t){return i.a.createElement(r.a,{key:t,item:!0,xs:12,sm:6,md:4},i.a.createElement(l,{options:{background:e.background,text:e.text,data:e.data}}))}))),i.a.createElement(r.a,{container:!0,spacing:2,className:"FixGrid"},i.a.createElement(r.a,{item:!0,xs:12},i.a.createElement(o.a,{variant:"outlined",className:"Box"},i.a.createElement("span",{className:"title"},"Bienvenidos"),i.a.createElement("div",{className:"content"},i.a.createElement("p",null,"Le damos la bienvenida al Panel de Administaci\xf3n, aqu\xed usted prodr\xe1 realizar acciones como: cargar matricula, ver registros, consultar, modificar, cargar archivos, cargar boletas, entre otros. Para m\xe1s informaci\xf3n por favor mantenga el mouse encima de la opci\xf3n que desea saber m\xe1s informaci\xf3n en el men\xfa."))))))}}}]);
//# sourceMappingURL=Home.1b2d3392.chunk.js.map