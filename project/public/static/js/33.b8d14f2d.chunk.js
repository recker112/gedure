(this.webpackJsonpGedure=this.webpackJsonpGedure||[]).push([[33,45,46],{6119:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(6215),l=t(6193),c=t(57),i=t(6040),s=t(6038),d=t(108),u=Object(d.a)((function(e){return{progressLabel:{marginTop:5}}}));a.a=function(e){var a=e.loading,t=e.backDrop,n=void 0!==t&&t,d=e.children,m=function(e){var a=e.color,t=void 0===a?"primary":a,n=e.progressLabel,s=e.progressLoading,d=e.progress,m=u();return s&&d<=99?r.a.createElement(o.a,null,r.a.createElement(o.a,{position:"relative",display:"inline-flex"},r.a.createElement(l.a,{color:t,variant:"static",value:d}),r.a.createElement(o.a,{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},r.a.createElement(c.a,{variant:"caption",component:"div",color:"textSecondary"},d,"%"))),n&&r.a.createElement(i.a,{container:!0,justify:"center"},r.a.createElement("span",{className:m.progressLabel},n))):r.a.createElement(l.a,{color:t})};return a&&!n?r.a.createElement(m,e):a&&n?r.a.createElement(s.a,{open:!0,style:{zIndex:200}},r.a.createElement(m,e)):d}},6123:function(e,a,t){"use strict";a.a=function(e){return{type:"UPDATE_DATA_USER",payload:e}}},6169:function(e,a,t){"use strict";var n=t(1),r=t(2),o=t(0),l=(t(3),t(4)),c=t(5),i=t(22),s=o.forwardRef((function(e,a){var t=e.absolute,c=void 0!==t&&t,i=e.classes,s=e.className,d=e.component,u=void 0===d?"hr":d,m=e.flexItem,p=void 0!==m&&m,f=e.light,b=void 0!==f&&f,v=e.orientation,h=void 0===v?"horizontal":v,g=e.role,E=void 0===g?"hr"!==u?"separator":void 0:g,O=e.variant,j=void 0===O?"fullWidth":O,y=Object(r.a)(e,["absolute","classes","className","component","flexItem","light","orientation","role","variant"]);return o.createElement(u,Object(n.a)({className:Object(l.a)(i.root,s,"fullWidth"!==j&&i[j],c&&i.absolute,p&&i.flexItem,b&&i.light,"vertical"===h&&i.vertical),role:E,ref:a},y))}));a.a=Object(c.a)((function(e){return{root:{height:1,margin:0,border:"none",flexShrink:0,backgroundColor:e.palette.divider},absolute:{position:"absolute",bottom:0,left:0,width:"100%"},inset:{marginLeft:72},light:{backgroundColor:Object(i.d)(e.palette.divider,.08)},middle:{marginLeft:e.spacing(2),marginRight:e.spacing(2)},vertical:{height:"100%",width:1},flexItem:{alignSelf:"stretch",height:"auto"}}}),{name:"MuiDivider"})(s)},6194:function(e,a,t){"use strict";t.d(a,"a",(function(){return o}));var n=t(0),r=t(6206);function o(){return n.useContext(r.a)}},6206:function(e,a,t){"use strict";var n=t(0),r=n.createContext();a.a=r},6213:function(e,a,t){"use strict";var n=t(1),r=t(28),o=t(2),l=t(0),c=(t(3),t(4)),i=t(101),s=t(6198),d=t(5),u=t(6070),m=l.forwardRef((function(e,a){var t=e.autoFocus,d=e.checked,m=e.checkedIcon,p=e.classes,f=e.className,b=e.defaultChecked,v=e.disabled,h=e.icon,g=e.id,E=e.inputProps,O=e.inputRef,j=e.name,y=e.onBlur,k=e.onChange,x=e.onFocus,C=e.readOnly,_=e.required,D=e.tabIndex,R=e.type,w=e.value,N=Object(o.a)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),S=Object(i.a)({controlled:d,default:Boolean(b),name:"SwitchBase",state:"checked"}),P=Object(r.a)(S,2),I=P[0],z=P[1],L=Object(s.a)(),B=v;L&&"undefined"===typeof B&&(B=L.disabled);var T="checkbox"===R||"radio"===R;return l.createElement(u.a,Object(n.a)({component:"span",className:Object(c.a)(p.root,f,I&&p.checked,B&&p.disabled),disabled:B,tabIndex:null,role:void 0,onFocus:function(e){x&&x(e),L&&L.onFocus&&L.onFocus(e)},onBlur:function(e){y&&y(e),L&&L.onBlur&&L.onBlur(e)},ref:a},N),l.createElement("input",Object(n.a)({autoFocus:t,checked:d,defaultChecked:b,className:p.input,disabled:B,id:T&&g,name:j,onChange:function(e){var a=e.target.checked;z(a),k&&k(e,a)},readOnly:C,ref:O,required:_,tabIndex:D,type:R,value:w},E)),I?m:h)}));a.a=Object(d.a)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(m)},6231:function(e,a,t){"use strict";var n=t(1),r=t(28),o=t(2),l=t(0),c=(t(3),t(6232)),i=t(6),s=t(101),d=t(6206),u=t(102),m=l.forwardRef((function(e,a){var t=e.actions,m=e.children,p=e.name,f=e.value,b=e.onChange,v=Object(o.a)(e,["actions","children","name","value","onChange"]),h=l.useRef(null),g=Object(s.a)({controlled:f,default:e.defaultValue,name:"RadioGroup"}),E=Object(r.a)(g,2),O=E[0],j=E[1];l.useImperativeHandle(t,(function(){return{focus:function(){var e=h.current.querySelector("input:not(:disabled):checked");e||(e=h.current.querySelector("input:not(:disabled)")),e&&e.focus()}}}),[]);var y=Object(i.a)(a,h),k=Object(u.a)(p);return l.createElement(d.a.Provider,{value:{name:k,onChange:function(e){j(e.target.value),b&&b(e,e.target.value)},value:O}},l.createElement(c.a,Object(n.a)({role:"radiogroup",ref:y},v),m))}));a.a=m},6232:function(e,a,t){"use strict";var n=t(1),r=t(2),o=t(0),l=(t(3),t(4)),c=t(5),i=o.forwardRef((function(e,a){var t=e.classes,c=e.className,i=e.row,s=void 0!==i&&i,d=Object(r.a)(e,["classes","className","row"]);return o.createElement("div",Object(n.a)({className:Object(l.a)(t.root,c,s&&t.row),ref:a},d))}));a.a=Object(c.a)({root:{display:"flex",flexDirection:"column",flexWrap:"wrap"},row:{flexDirection:"row"}},{name:"MuiFormGroup"})(i)},6239:function(e,a,t){"use strict";var n=t(1),r=t(2),o=t(0),l=(t(3),t(4)),c=t(6198),i=t(5),s=t(57),d=t(10),u=o.forwardRef((function(e,a){e.checked;var t=e.classes,i=e.className,u=e.control,m=e.disabled,p=(e.inputRef,e.label),f=e.labelPlacement,b=void 0===f?"end":f,v=(e.name,e.onChange,e.value,Object(r.a)(e,["checked","classes","className","control","disabled","inputRef","label","labelPlacement","name","onChange","value"])),h=Object(c.a)(),g=m;"undefined"===typeof g&&"undefined"!==typeof u.props.disabled&&(g=u.props.disabled),"undefined"===typeof g&&h&&(g=h.disabled);var E={disabled:g};return["checked","name","onChange","value","inputRef"].forEach((function(a){"undefined"===typeof u.props[a]&&"undefined"!==typeof e[a]&&(E[a]=e[a])})),o.createElement("label",Object(n.a)({className:Object(l.a)(t.root,i,"end"!==b&&t["labelPlacement".concat(Object(d.a)(b))],g&&t.disabled),ref:a},v),o.cloneElement(u,E),o.createElement(s.a,{component:"span",className:Object(l.a)(t.label,g&&t.disabled)},p))}));a.a=Object(i.a)((function(e){return{root:{display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,"&$disabled":{cursor:"default"}},labelPlacementStart:{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},labelPlacementTop:{flexDirection:"column-reverse",marginLeft:16},labelPlacementBottom:{flexDirection:"column",marginLeft:16},disabled:{},label:{"&$disabled":{color:e.palette.text.disabled}}}}),{name:"MuiFormControlLabel"})(u)},6512:function(e,a,t){"use strict";var n=t(1),r=t(2),o=t(0),l=(t(3),t(4)),c=t(6213),i=t(97),s=Object(i.a)(o.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUnchecked"),d=Object(i.a)(o.createElement("path",{d:"M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"}),"RadioButtonChecked"),u=t(5);var m=Object(u.a)((function(e){return{root:{position:"relative",display:"flex","&$checked $layer":{transform:"scale(1)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.shortest})}},layer:{left:0,position:"absolute",transform:"scale(0)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeIn,duration:e.transitions.duration.shortest})},checked:{}}}),{name:"PrivateRadioButtonIcon"})((function(e){var a=e.checked,t=e.classes,n=e.fontSize;return o.createElement("div",{className:Object(l.a)(t.root,a&&t.checked)},o.createElement(s,{fontSize:n}),o.createElement(d,{fontSize:n,className:t.layer}))})),p=t(22),f=t(10),b=t(31),v=t(6194),h=o.createElement(m,{checked:!0}),g=o.createElement(m,null),E=o.forwardRef((function(e,a){var t=e.checked,i=e.classes,s=e.color,d=void 0===s?"secondary":s,u=e.name,m=e.onChange,p=e.size,E=void 0===p?"medium":p,O=Object(r.a)(e,["checked","classes","color","name","onChange","size"]),j=Object(v.a)(),y=t,k=Object(b.a)(m,j&&j.onChange),x=u;return j&&("undefined"===typeof y&&(y=j.value===e.value),"undefined"===typeof x&&(x=j.name)),o.createElement(c.a,Object(n.a)({color:d,type:"radio",icon:o.cloneElement(g,{fontSize:"small"===E?"small":"default"}),checkedIcon:o.cloneElement(h,{fontSize:"small"===E?"small":"default"}),classes:{root:Object(l.a)(i.root,i["color".concat(Object(f.a)(d))]),checked:i.checked,disabled:i.disabled},name:x,checked:y,onChange:k,ref:a},O))}));a.a=Object(u.a)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(p.d)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(p.d)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiRadio"})(E)},6659:function(e,a,t){"use strict";t.r(a),t.d(a,"PersonalRepresentanteEmpleoForm",(function(){return _})),t.d(a,"default",(function(){return D}));var n=t(46),r=t.n(n),o=t(7),l=t(63),c=t(0),i=t.n(c),s=t(6040),d=t(57),u=t(6215),m=t(6169),p=t(6357),f=t(7076),b=t(6231),v=t(6239),h=t(6512),g=t(6355),E=t(6354),O=t(6117),j=t(98),y=t(6119),k=t(13),x=t(6120),C=t(6123);function _(e){var a,t,n,r,o,l,c=e.onSubmit,O=e.user,j=e.loading,k=e.register,x=e.errors,C=e.watch,_=e.buttonText,D=e.buttonDisable;return i.a.createElement("form",{onSubmit:c,autoComplete:"off"},i.a.createElement(s.a,{container:!0,spacing:2},i.a.createElement(s.a,{item:!0,xs:12},i.a.createElement(d.a,{variant:"h6",component:"span",className:"text__bold--semi"},"Empleo del representante"),i.a.createElement(u.a,{mt:1},i.a.createElement(m.a,null))),i.a.createElement(s.a,{item:!0,xs:12},i.a.createElement(p.a,{component:"fieldset",disabled:j},i.a.createElement(f.a,{component:"legend"},"\xbfTiene empleo?"),i.a.createElement(b.a,{"aria-label":"empleo",defaultValue:O.personal_data.repre_empleo||"No",name:"personalData.repre_empleo",row:!0},i.a.createElement(v.a,{value:"No",control:i.a.createElement(h.a,{inputRef:k}),label:"No"}),i.a.createElement(v.a,{value:"Si",control:i.a.createElement(h.a,{inputRef:k}),label:"Si"})))),"Si"===C("personalData.repre_empleo","No")&&i.a.createElement(i.a.Fragment,null,i.a.createElement(s.a,{item:!0,xs:12},i.a.createElement(g.a,{inputRef:k({required:{value:!0,message:"* Campo requerido"},minLength:{value:3,message:"Error: Demaciado corto"},maxLength:{value:30,message:"Error: Demaciado largo"}}),error:Boolean(null===x||void 0===x||null===(a=x.personalData)||void 0===a?void 0:a.repre_empleo_profesion),helperText:(null===x||void 0===x||null===(t=x.personalData)||void 0===t||null===(n=t.repre_empleo_profesion)||void 0===n?void 0:n.message)?x.personalData.repre_empleo_profesion.message:"",variant:"outlined",name:"personalData.repre_empleo_profesion",defaultValue:O.personal_data.repre_empleo_profesion||"",label:"Profesi\xf3n",size:"small",disabled:j,fullWidth:!0})),i.a.createElement(s.a,{item:!0,xs:12},i.a.createElement(g.a,{inputRef:k({required:{value:!0,message:"* Campo requerido"},minLength:{value:3,message:"Error: Demaciado corto"},maxLength:{value:30,message:"Error: Demaciado largo"}}),error:Boolean(null===x||void 0===x||null===(r=x.personalData)||void 0===r?void 0:r.repre_empleo_lugar),helperText:(null===x||void 0===x||null===(o=x.personalData)||void 0===o||null===(l=o.repre_empleo_lugar)||void 0===l?void 0:l.message)?x.personalData.repre_empleo_lugar.message:"",variant:"outlined",name:"personalData.repre_empleo_lugar",label:"Lugar donde trabaja",defaultValue:O.personal_data.repre_empleo_lugar||"",size:"small",disabled:j,fullWidth:!0}))),!D&&i.a.createElement(s.a,{container:!0,justify:"flex-end",item:!0,xs:12},i.a.createElement(y.a,{loading:j},i.a.createElement(E.a,{type:"submit",variant:"contained",color:"primary"},_)))))}function D(e){var a=e.id,t=Object(k.d)((function(e){return{user:e.forms.showUser.data.user,loading:e.forms.updatePersonalRepreEmpleo.loading,userData:e.userData.user}})),n=t.user,c=t.loading,s=t.userData,d=Object(k.c)(),u=Object(O.c)({mode:"onTouched"}),m=u.register,p=u.errors,f=u.watch,b=u.handleSubmit,v=Object(j.a)().fetchData,h=function(){var e=Object(l.a)(r.a.mark((function e(t){var n,l,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(Object(x.a)("updatePersonalRepreEmpleo",!0)),"No"===t.personalData.repre_empleo&&(t.personalData.repre_empleo_profesion=null,t.personalData.repre_empleo_lugar=null),n={url:"v1/user/".concat(a),type:"post",data:Object(o.a)(Object(o.a)({},t),{},{_method:"PUT"}),successText:"Datos actualizados"},e.next=5,v(n);case 5:(l=e.sent)&&(d(Object(x.a)("showUser",!1,l)),(null===(c=l.user)||void 0===c?void 0:c.id)===s.id&&d(Object(C.a)({user:l.user}))),d(Object(x.a)("updatePersonalRepreEmpleo",!1));case 8:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return i.a.createElement(_,{onSubmit:b(h),register:m,errors:p,watch:f,loading:c,buttonText:"Actualizar",user:n})}}}]);
//# sourceMappingURL=33.b8d14f2d.chunk.js.map