"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[8350],{2183:function(e,a,n){n.d(a,{P:function(){return t},S:function(){return i}});var i=[{value:"0102",label:"Banco de Venezuela"},{value:"0104",label:"Venezolano de Cr\xe9dito"},{value:"0105",label:"Mercantil"},{value:"0108",label:"Provincial"},{value:"0114",label:"Bancaribe"},{value:"0115",label:"Exterior"},{value:"0116",label:"Occidental de Descuento"},{value:"0128",label:"Banco Caron\xed"},{value:"0134",label:"Banesco"},{value:"0138",label:"Banco Plaza"},{value:"0151",label:"BFC Banco Fondo Com\xfan"},{value:"0156",label:"100% Banco"},{value:"0157",label:"Delsur"},{value:"0163",label:"Banco del Tesoro"},{value:"0166",label:"Banco Agr\xedcola de Venezuela"},{value:"0168",label:"Bancrecer"},{value:"0169",label:"Mi Banco"},{value:"0171",label:"Banco Activo"},{value:"0172",label:"Bancamiga"},{value:"0174",label:"Banplus"},{value:"0175",label:"Bicentenario del Pueblo"},{value:"0177",label:"Banfanb"},{value:"0191",label:"BNC Nacional de Cr\xe9dito"}],t={"0102":"Banco de Venezuela","0104":"Venezolano de Cr\xe9dito","0105":"Mercantil","0108":"Provincial","0114":"Bancaribe","0115":"Exterior","0116":"Occidental de Descuento","0128":"Banco Caron\xed","0134":"Banesco","0138":"Banco Plaza","0151":"BFC Banco Fondo Com\xfan","0156":"100% Banco","0157":"Delsur","0163":"Banco del Tesoro","0166":"Banco Agr\xedcola de Venezuela","0168":"Bancrecer","0169":"Mi Banco","0171":"Banco Activo","0172":"Bancamiga","0174":"Banplus","0175":"Bicentenario del Pueblo","0177":"Banfanb","0191":"BNC Nacional de Cr\xe9dito"}},81075:function(e,a,n){n.d(a,{Z:function(){return o}});var i=n(72791),t=n(86951),s=n(59434),r=n(80064),l=n(5016);function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=e.messageTo200,n=void 0===a||a,o=e.messageTo400,c=void 0===o||o,d=e.message400,x=void 0!==d&&d,u=e.messageTo404,h=void 0===u||u,m=e.message404,j=void 0===m?"Ruta URL no encontrada":m,g=e.messageTo422,Z=void 0===g||g,v=e.message422,b=void 0===v?"Error al verificar los datos":v,f=(0,t.Ds)(),p=f.enqueueSnackbar,_=(0,s.v9)((function(e){return e.notistack})),P=_.notiText,B=_.notiStatus,C=_.notiVariant,N=(0,s.I0)();(0,i.useEffect)((function(){return 200===B||201===B?n&&p(P,{variant:C}):400===B?c&&p(x||P,{variant:"warning"}):401===B?(p("Sesi\xf3n expirada",{variant:"info"}),N((0,l.Rg)())):403===B?p("No tienes permisos para esta acci\xf3n",{variant:"error"}):404===B?h&&p(P||j,{variant:"warning"}):422===B?Z&&p(b,{variant:"error"}):429===B?(p("Demasiadas peticiones",{variant:"info"}),N((0,l.Rg)())):500===B?p("No se ha podido conectar con la base de datos",{variant:"error"}):"offline"===B&&p("Revise su conexi\xf3n a internet",{variant:"error"}),function(){N((0,r.ZN)())}}),[P,B,C,N,p,n,c,x,h,j,Z,b])}},45382:function(e,a,n){n.d(a,{Z:function(){return v}});n(72791);var i=n(30286),t=n(45953),s=n(50228),r=n(4565),l=n(81872),o=n(21680),c=n(9827),d=n(60807),x=n(24390),u=n(19773),h=n.p+"static/media/favicon.5c8dac61611130d499b8.png",m=n(40046),j=n(2183),g=n(5736),Z=n(80184);function v(e){var a,n=e.id,v=e.user,b=e.type,f=e.payload,p=e.amount,_=e.previous_balance,P=e.exonerado,B=(e.exonerante,e.created_at),C=e.payment_method,N=p;return("deuda pagada"===b||"transferencia de saldo"===b&&null!==f&&void 0!==f&&null!==(a=f.extra_data)&&void 0!==a&&a.sender)&&(N*=-1),(0,Z.jsxs)(i.Z,{className:"paper--padding",id:"PDF",children:[(0,Z.jsxs)(t.ZP,{container:!0,children:[(0,Z.jsxs)(t.ZP,{container:!0,item:!0,xs:12,md:6,children:[(0,Z.jsx)(s.Z,{mr:2,children:(0,Z.jsx)("img",{src:h,width:"75",alt:"Logo del instituto"})}),(0,Z.jsxs)(t.ZP,{item:!0,xs:!0,children:[(0,Z.jsx)(r.Z,{className:"text__bold--semi",children:'U.E.P A.P.E.P "La Candelaria"'}),(0,Z.jsxs)(r.Z,{className:"text__opacity--semi",children:["N\xb0 Recibo #",n]})]})]}),(0,Z.jsx)(t.ZP,{container:!0,justifyContent:"flex-end",alignItems:"center",item:!0,xs:12,md:6,children:(0,Z.jsxs)(s.Z,{fontSize:{xs:"h5.fontSize",md:"h4.fontSize"},className:"text__bold--big",color:"#00ddff",children:["Transacci\xf3n ",(0,Z.jsx)(s.Z,{color:"#2a86ff",component:"span",children:"realizada"})]})})]}),(0,Z.jsx)(s.Z,{my:3,children:(0,Z.jsx)(l.Z,{})}),(0,Z.jsxs)(t.ZP,{container:!0,spacing:2,children:[(0,Z.jsxs)(t.ZP,{item:!0,xs:12,sm:6,children:[(0,Z.jsx)(r.Z,{className:"text__bold--semi",children:"Comprobante a nombre de:"}),(0,Z.jsxs)(r.Z,{children:[v.name," (",v.privilegio+v.username,")"]})]}),"pago verificado"===b&&(0,Z.jsxs)(t.ZP,{item:!0,xs:12,sm:6,children:[(0,Z.jsx)(r.Z,{align:"right",className:"text__bold--semi",children:"Pago realizado a:"}),(0,Z.jsxs)(r.Z,{align:"right",children:[f.extra_data.name,(0,Z.jsx)("br",{}),"J-",f.extra_data.rif.slice(0,-1),"-",f.extra_data.rif.charAt(f.extra_data.rif.length-1),(0,Z.jsx)("br",{}),j.P[f.extra_data.code],(0,Z.jsx)("br",{}),f.extra_data.type]})]}),"deuda pagada"===b&&(0,Z.jsxs)(t.ZP,{item:!0,xs:12,sm:6,children:[(0,Z.jsx)(r.Z,{align:"right",className:"text__bold--semi",children:"Pago realizado a:"}),(0,Z.jsx)(r.Z,{align:"right",children:"Plataforma"})]}),"transferencia de saldo"===b&&(0,Z.jsxs)(t.ZP,{item:!0,xs:12,sm:6,children:[(0,Z.jsx)(r.Z,{align:"right",className:"text__bold--semi",children:f.extra_data.sender?"Pago realizado a:":"Pago recibido de:"}),(0,Z.jsxs)(r.Z,{align:"right",children:[f.extra_data.name," (",f.extra_data.username,")"]})]}),"manual"===b&&(0,Z.jsxs)(t.ZP,{item:!0,xs:12,sm:6,children:[(0,Z.jsx)(r.Z,{align:"right",className:"text__bold--semi",children:p<=0?"Pago realizado a:":"Pago recibido de:"}),(0,Z.jsx)(r.Z,{align:"right",children:"Plataforma"})]})]}),(0,Z.jsxs)(t.ZP,{container:!0,style:{margin:"15px 0"},children:[(0,Z.jsxs)(t.ZP,{item:!0,xs:12,sm:6,children:[(0,Z.jsx)(r.Z,{className:"text__bold--semi",children:"Fecha:"}),(0,Z.jsx)(r.Z,{children:B})]}),(0,Z.jsxs)(t.ZP,{item:!0,xs:12,sm:6,children:[(0,Z.jsx)(r.Z,{className:"text__bold--semi",align:"right",children:"M\xe9todo de pago:"}),(0,Z.jsx)(r.Z,{align:"right",children:C.charAt(0).toUpperCase()+C.slice(1)})]})]}),(0,Z.jsxs)(s.Z,{children:[(0,Z.jsx)(r.Z,{variant:"h5",className:"text__bold--semi",children:"Acciones"}),(0,Z.jsxs)(o.Z,{"aria-label":"actions table",children:[(0,Z.jsx)(c.Z,{children:(0,Z.jsxs)(d.Z,{children:[(0,Z.jsx)(x.Z,{children:"Descripci\xf3n"}),(0,Z.jsx)(x.Z,{align:"right",children:"Importe"})]})}),(0,Z.jsx)(u.Z,{children:f.actions&&f.actions.map((function(e,a){return(0,Z.jsxs)(d.Z,{children:[(0,Z.jsx)(x.Z,{children:e.reason}),(0,Z.jsx)(x.Z,{align:"right",children:(0,g.C)(e.amount)})]},a)}))})]})]}),(0,Z.jsxs)(s.Z,{mt:2,mb:14,textAlign:"right",children:[(0,Z.jsx)(r.Z,{component:"span",className:"text__bold--semi",children:"Total:"}),(0,Z.jsx)(r.Z,{component:"span",children:" "+(0,g.C)(p)}),(0,Z.jsx)("br",{}),(0,Z.jsx)(r.Z,{component:"span",className:"text__bold--semi",children:"Saldo anterior:"}),(0,Z.jsx)(r.Z,{component:"span",children:" "+(0,g.C)(_)}),(0,Z.jsx)("br",{}),(0,Z.jsx)(r.Z,{component:"span",className:"text__bold--semi",children:"Nuevo saldo disponible:"}),(0,Z.jsx)(r.Z,{component:"span",children:" "+(0,g.C)(P?_:N+_)})]}),(0,Z.jsx)(t.ZP,{container:!0,justifyContent:"center",children:(0,Z.jsxs)(t.ZP,{item:!0,xs:8,sm:6,md:4,children:[(0,Z.jsx)(l.Z,{}),(0,Z.jsx)(r.Z,{align:"center",children:"Sello"})]})}),(0,Z.jsxs)(t.ZP,{container:!0,justifyContent:"center",alignItems:"center",style:{opacity:.5,marginTop:15},children:[(0,Z.jsx)(s.Z,{style:{marginRight:3},fontSize:"body1.fontSize",className:"text__bold--semi",component:"span",children:"Powered by"}),(0,Z.jsx)("img",{src:m.Z,alt:"logo de Gedure",height:"22"})]}),1===P&&(0,Z.jsxs)(s.Z,{sx:{textAlign:{xs:"center",sm:"left"}},mt:2,style:{opacity:.6},children:[(0,Z.jsx)(r.Z,{className:"text__bold--semi",children:"Pago exonerado por:"}),(0,Z.jsx)(r.Z,{children:'U.E.P A.P.E.P "La Candelaria"'})]})]})}},11135:function(e,a,n){n.r(a),n.d(a,{default:function(){return P}});var i=n(1413),t=n(72791),s=n(57689),r=n(50228),l=n(20803),o=n(45953),c=n(75814),d=n(13811),x=n(96580),u=n(39709),h=n(67394),m=n(73518),j=n(45382),g=n(81075),Z=n(59434),v=n(44289),b=n(84659),f=n(73506),p=n(80184),_={container:{flexGrow:1,paddingBottom:6,marginTop:{xs:"80px",sm:12}}};function P(){var e=(0,s.UO)().id;(0,g.Z)();var a=(0,Z.v9)((function(e){return{count_notify:e.auth.notify.count,data:e.requestStatusWallet.showTransaction.data,loading:e.requestStatusWallet.showTransaction.loading,progress:e.requestStatusWallet.showTransaction.progress,loadingDownload:e.requestStatusWallet.showTransaction.loadingDownload}})),n=a.count_notify,P=a.data,B=a.loading,C=a.progress,N=a.loadingDownload,y=(0,Z.I0)();document.title=n>0?"(".concat(n,") Ver transacciones - La Candelaria"):"Ver transacciones - La Candelaria";var w=(0,s.s0)();return(0,t.useEffect)((function(){var a=null;return B&&(a=y((0,v.h)(e))),function(){B&&a.abort(),y((0,b.u2)({select:"showTransaction"}))}}),[]),(0,p.jsx)(r.Z,{component:"main",sx:_.container,children:(0,p.jsxs)(l.Z,{children:[(0,p.jsxs)(o.ZP,{sx:{mb:3},container:!0,justifyContent:"space-between",children:[(0,p.jsx)(o.ZP,{item:!0,xs:!0,children:(0,p.jsx)(c.Z,{title:"Volver",arrow:!0,children:(0,p.jsx)(d.Z,{onClick:function(){window.history.state&&window.history.state.idx>0?w(-1):w("/gedure/transacciones")},"aria-label":"return",children:(0,p.jsx)(h.Z,{})})})}),(0,p.jsx)(o.ZP,{item:!0,children:(0,p.jsx)(c.Z,{title:"Descargar",arrow:!0,children:(0,p.jsx)(u.Z,{loading:N,component:"span",disabled:B||Object.keys(P).length<=0,loadingIndicator:N&&C<99?"".concat(C,"%"):null,onClick:function(){y((0,f.P)(e))},color:"inherit",children:(0,p.jsx)(m.Z,{})})})})]}),B&&(0,p.jsx)(r.Z,{textAlign:"center",children:(0,p.jsx)(x.Z,{})}),!B&&Object.keys(P).length>0&&(0,p.jsx)(j.Z,(0,i.Z)({},P)),!B&&Object.keys(P).length<=0&&(0,p.jsx)(r.Z,{textAlign:"center",children:"No se pudo encontrar la transacci\xf3n solicitada."})]})})}},67394:function(e,a,n){var i=n(64836);a.Z=void 0;var t=i(n(45649)),s=n(80184),r=(0,t.default)((0,s.jsx)("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}),"ArrowBack");a.Z=r},73518:function(e,a,n){var i=n(64836);a.Z=void 0;var t=i(n(45649)),s=n(80184),r=(0,t.default)((0,s.jsx)("path",{d:"M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"}),"Download");a.Z=r}}]);
//# sourceMappingURL=8350.681a618b.chunk.js.map