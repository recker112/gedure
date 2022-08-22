"use strict";(self.webpackChunkfrontend_la_candelaria=self.webpackChunkfrontend_la_candelaria||[]).push([[9438],{48214:function(e,a,t){t.d(a,{H:function(){return u}});var n=t(1413),r=t(45987),o=(t(72791),t(85523)),l=t(9955),i=t(61134),s=t(80184),c=["label","name","control","defaultValue","labelPlacement"],d=["ref","onChange","value"];function u(e){var a=e.label,t=e.name,u=e.control,m=e.defaultValue,b=void 0!==m&&m,h=e.labelPlacement,p=void 0===h?"end":h,v=(0,r.Z)(e,c),f=(0,i.bc)({name:t,control:u,defaultValue:b}).field,_=f.ref,g=f.onChange,x=f.value,Z=(0,r.Z)(f,d);return(0,s.jsx)(o.Z,{control:(0,s.jsx)(l.Z,(0,n.Z)((0,n.Z)((0,n.Z)({},v),Z),{},{inputRef:_,onChange:function(e){return g(e.currentTarget.checked)},checked:x})),label:a,sx:{userSelect:"none"},labelPlacement:p})}},9438:function(e,a,t){t.d(a,{Z:function(){return b}});var n=t(1413),r=t(72791),o=t(61889),l=t(51691),i=t(48214),s=t(61134),c=t(80184);function d(e){var a=e.name,t=e.label,n=e.defaultData,r=e.control,l=e.disabled,s=e.fullWidth;return(0,c.jsx)(o.ZP,{item:!0,xs:12,sm:s?12:6,children:(0,c.jsx)(i.H,{control:r,defaultValue:n[a]||!1,name:"permissions.".concat(a),label:t,color:"primary",disabled:l})})}function u(e){var a=e.name,t=e.label,n=e.defaultData,l=e.control,d=e.disabled,u=e.need,m=e.setValue,b=(0,s.qo)({control:l,name:"permissions.".concat(u),defaultValue:n[u]||!1});return(0,r.useEffect)((function(){b||m("permissions.".concat(a),!1)}),[b]),(0,c.jsx)(o.ZP,{item:!0,xs:12,sm:6,children:(0,c.jsx)(i.H,{control:l,defaultValue:n[a]||!1,name:"permissions.".concat(a),label:t,color:"primary",disabled:!b||d})})}function m(e){var a=e.control,t=e.disabled,o=e.setValue,l=e.defaultData;return(0,s.qo)({control:a,name:"super_admin",defaultValue:l.super_admin||!1})?null:[{name:"registros_index",label:"Ver registros del sistema"},{name:"users_index",label:"Ver lista de usuarios",nested:[{name:"users_create",label:"Crear usuarios"},{name:"users_upload_matricula",label:"Cargar estudiantes"},{name:"users_edit",label:"Editar usuarios"},{name:"users_edit_admins",label:"Editar administradores"},{name:"users_delete",label:"Desactivar usuarios"}]},{name:"posts_index",label:"Ver noticias publicadas",nested:[{name:"posts_create",label:"Crear noticia"},{name:"posts_edit",label:"Editar noticia"},{name:"posts_destroy",label:"Eliminar noticia"},{name:"posts_others",label:"Poder editar las noticias de otros usuarios"}]},{name:"boletas_index",label:"Ver boletas cargadas",nested:[{name:"boletas_upload",label:"Cargar boleta"},{name:"boletas_edit",label:"Editar boleta"},{name:"boletas_destroy",label:"Eliminar boleta"}]},{name:"contact_index",label:"Ver solicitudes de cont\xe1cto",nested:[{name:"contact_destroy",label:"Eliminar solicitudes de cont\xe1cto"}]},{name:"cursos_index",label:"Ver cursos",nested:[{name:"cursos_create",label:"Crear curso"},{name:"cursos_destroy",label:"Eliminar curso"}]},{name:"users_disabled_index",label:"Ver usuarios desactivados",nested:[{name:"users_disabled_restore",label:"Restaurar usuario"},{name:"users_disabled_destroy",label:"Eliminar usuario"}]},{name:"wallet_index",label:"Ver monederos",nested:[{name:"wallet_administration",label:"Administrar monederos"}]},{name:"debt_lote_index",label:"Ver lotes de deudas",nested:[{name:"debt_lote_create",label:"Crear lotes de deudas"},{name:"debt_lote_edit",label:"Editar lotes de deudas"},{name:"debt_lote_delete",label:"Eliminar lotes de deudas"},{name:"debt_create",label:"Asignar deuda individualmente"},{name:"debt_delete",label:"Eliminar deuda individualmente"},{name:"debt_refund",label:"Reembolsar deuda individualmente"}]},{name:"bank_account_index",label:"Ver cuentas bancarias",nested:[{name:"bank_account_create",label:"Crear cuenta bancaria"},{name:"bank_account_edit",label:"Editar cuenta bancaria"},{name:"bank_account_destroy",label:"Eliminar cuenta bancaria"}]},{name:"bank_transaction_index",label:"Ver transacciones bancarias",nested:[{name:"bank_transaction_upload",label:"Cargar transacciones bancarias"},{name:"bank_transaction_assign",label:"Asignar transacci\xf3n bancaria"},{name:"bank_transaction_delete",label:"Eliminar transacci\xf3n bancaria"}]},{name:"transaction_index",label:"Ver transacciones del sistema"}].map((function(e,i){return(0,c.jsxs)(r.Fragment,{children:[(0,c.jsx)(d,(0,n.Z)({control:a,disabled:t,defaultData:l,fullWidth:!0},e)),e.nested&&e.nested.length>0&&e.nested.map((function(r,i){return(0,c.jsx)(u,(0,n.Z)({setValue:o,control:a,disabled:t,defaultData:l,need:e.name},r),i)}))]},i)}))}function b(e){var a,t=e.control,r=e.disabled,u=e.setValue,b=e.defaultData,h=void 0===b?{}:b,p=(0,s.qo)({control:t,name:"privilegio"});return"V-"===p&&(a=[{name:"boleta_download",label:"Descargar boletas"},{name:"change_avatar",label:"Cambiar avatar"}].map((function(e,a){return(0,c.jsx)(d,(0,n.Z)({control:t,disabled:r,defaultData:h},e),a)}))),(0,c.jsxs)(c.Fragment,{children:["V-"===p&&a,"A-"===p&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(o.ZP,{item:!0,xs:12,children:(0,c.jsx)(i.H,{control:t,defaultValue:h.super_admin||!1,name:"super_admin",label:"Super admin",color:"primary",disabled:r})}),(0,c.jsx)(o.ZP,{item:!0,xs:12,children:(0,c.jsx)(l.Z,{children:"Al activar este permiso el usuario tendr\xe1 poder absoluto del sistema, podr\xe1 usar todo lo actual y lo futuro. Use esta opci\xf3n con cautela."})}),(0,c.jsx)(m,{control:t,disabled:r,defaultData:h,setValue:u})]})]})}},9955:function(e,a,t){t.d(a,{Z:function(){return w}});var n=t(4942),r=t(63366),o=t(87462),l=t(72791),i=t(28182),s=t(94419),c=t(12065),d=t(14036),u=t(97278),m=t(31402),b=t(66934),h=t(21217);function p(e){return(0,h.Z)("MuiSwitch",e)}var v=(0,t(75878).Z)("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]),f=t(80184),_=["className","color","edge","size","sx"],g=(0,b.ZP)("span",{name:"MuiSwitch",slot:"Root",overridesResolver:function(e,a){var t=e.ownerState;return[a.root,t.edge&&a["edge".concat((0,d.Z)(t.edge))],a["size".concat((0,d.Z)(t.size))]]}})((function(e){var a,t=e.ownerState;return(0,o.Z)({display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},"start"===t.edge&&{marginLeft:-8},"end"===t.edge&&{marginRight:-8},"small"===t.size&&(a={width:40,height:24,padding:7},(0,n.Z)(a,"& .".concat(v.thumb),{width:16,height:16}),(0,n.Z)(a,"& .".concat(v.switchBase),(0,n.Z)({padding:4},"&.".concat(v.checked),{transform:"translateX(16px)"})),a))})),x=(0,b.ZP)(u.Z,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:function(e,a){var t=e.ownerState;return[a.switchBase,(0,n.Z)({},"& .".concat(v.input),a.input),"default"!==t.color&&a["color".concat((0,d.Z)(t.color))]]}})((function(e){var a,t=e.theme;return a={position:"absolute",top:0,left:0,zIndex:1,color:t.vars?t.vars.palette.Switch.defaultColor:"".concat("light"===t.palette.mode?t.palette.common.white:t.palette.grey[300]),transition:t.transitions.create(["left","transform"],{duration:t.transitions.duration.shortest})},(0,n.Z)(a,"&.".concat(v.checked),{transform:"translateX(20px)"}),(0,n.Z)(a,"&.".concat(v.disabled),{color:t.vars?t.vars.palette.Switch.defaultDisabledColor:"".concat("light"===t.palette.mode?t.palette.grey[100]:t.palette.grey[600])}),(0,n.Z)(a,"&.".concat(v.checked," + .").concat(v.track),{opacity:.5}),(0,n.Z)(a,"&.".concat(v.disabled," + .").concat(v.track),{opacity:t.vars?t.vars.opacity.switchTrackDisabled:"".concat("light"===t.palette.mode?.12:.2)}),(0,n.Z)(a,"& .".concat(v.input),{left:"-100%",width:"300%"}),a}),(function(e){var a,t=e.theme,r=e.ownerState;return(0,o.Z)({"&:hover":{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.action.activeChannel," / ").concat(t.vars.palette.action.hoverOpacity,")"):(0,c.Fq)(t.palette.action.active,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==r.color&&(a={},(0,n.Z)(a,"&.".concat(v.checked),(0,n.Z)({color:(t.vars||t).palette[r.color].main,"&:hover":{backgroundColor:t.vars?"rgba(".concat(t.vars.palette[r.color].mainChannel," / ").concat(t.vars.palette.action.hoverOpacity,")"):(0,c.Fq)(t.palette[r.color].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&.".concat(v.disabled),{color:t.vars?t.vars.palette.Switch["".concat(r.color,"DisabledColor")]:"".concat("light"===t.palette.mode?(0,c.$n)(t.palette[r.color].main,.62):(0,c._j)(t.palette[r.color].main,.55))})),(0,n.Z)(a,"&.".concat(v.checked," + .").concat(v.track),{backgroundColor:(t.vars||t).palette[r.color].main}),a))})),Z=(0,b.ZP)("span",{name:"MuiSwitch",slot:"Track",overridesResolver:function(e,a){return a.track}})((function(e){var a=e.theme;return{height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:a.transitions.create(["opacity","background-color"],{duration:a.transitions.duration.shortest}),backgroundColor:a.vars?a.vars.palette.common.onBackground:"".concat("light"===a.palette.mode?a.palette.common.black:a.palette.common.white),opacity:a.vars?a.vars.opacity.switchTrack:"".concat("light"===a.palette.mode?.38:.3)}})),k=(0,b.ZP)("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:function(e,a){return a.thumb}})((function(e){var a=e.theme;return{boxShadow:(a.vars||a).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}})),w=l.forwardRef((function(e,a){var t=(0,m.Z)({props:e,name:"MuiSwitch"}),n=t.className,l=t.color,c=void 0===l?"primary":l,u=t.edge,b=void 0!==u&&u,h=t.size,v=void 0===h?"medium":h,w=t.sx,y=(0,r.Z)(t,_),C=(0,o.Z)({},t,{color:c,edge:b,size:v}),S=function(e){var a=e.classes,t=e.edge,n=e.size,r=e.color,l=e.checked,i=e.disabled,c={root:["root",t&&"edge".concat((0,d.Z)(t)),"size".concat((0,d.Z)(n))],switchBase:["switchBase","color".concat((0,d.Z)(r)),l&&"checked",i&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},u=(0,s.Z)(c,p,a);return(0,o.Z)({},a,u)}(C),V=(0,f.jsx)(k,{className:S.thumb,ownerState:C});return(0,f.jsxs)(g,{className:(0,i.Z)(S.root,n),sx:w,ownerState:C,children:[(0,f.jsx)(x,(0,o.Z)({type:"checkbox",icon:V,checkedIcon:V,ref:a,ownerState:C},y,{classes:(0,o.Z)({},S,{root:S.switchBase})})),(0,f.jsx)(Z,{className:S.track,ownerState:C})]})}))}}]);
//# sourceMappingURL=9438.93ed4e39.chunk.js.map