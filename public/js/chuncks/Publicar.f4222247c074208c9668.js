(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"8yK5":function(e,t,a){"use strict";a.r(t);var n=a("o0o1"),r=a.n(n),o=a("q1tI"),i=a.n(o),c=a("vkC2"),l=a("Z3vd"),u=a("HXb3");function s(e,t,a,n,r,o,i){try{var c=e[o](i),l=c.value}catch(e){return void a(e)}c.done?t(l):Promise.resolve(l).then(n,r)}function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e))&&"[object Arguments]"!==Object.prototype.toString.call(e))return;var a=[],n=!0,r=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw o}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}t.default=function(){var e=m(Object(o.useState)(!1),2),t=e[0],a=e[1],n=!1,d=Object(u.useSnackbar)().enqueueSnackbar,p=function(){var e,t=(e=r.a.mark((function e(){var t,o,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,axios.get("api/archivos/boleta",{responseType:"blob"});case 3:t=e.sent,Object(c.a)(t.data,"boleta","pdf"),d("Descargando boleta",{variant:"info"}),n||a(!0),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),o=e.t0.response,i=o.status,o.data,400===i?d("Su boleta aún no ha sido cargada",{variant:"warning"}):d(403===i?"No estás autorizado":422===i?"El servidor rechazó tu solicitud":500===i?"No se ha podido conectar con la base de datos":"Error interno en el sistema",{variant:"error"});case 13:n||a(!0);case 14:case"end":return e.stop()}}),e,null,[[0,9]])})),function(){var t=this,a=arguments;return new Promise((function(n,r){var o=e.apply(t,a);function i(e){s(o,n,r,i,c,"next",e)}function c(e){s(o,n,r,i,c,"throw",e)}i(void 0)}))});return function(){return t.apply(this,arguments)}}();return Object(o.useEffect)((function(){return t||p(),function(){n=!0}}),[t,n,a]),t?i.a.createElement(i.a.Fragment,null,i.a.createElement("h1",null,"Respuesta obtenida."),i.a.createElement(l.a,{variant:"outlined",color:"inherit",onClick:function(){a(!1)}},"Click aquí para re-intentar")):i.a.createElement("h1",null,"Buscando boleta...")}},NUoh:function(e,t,a){"use strict";t.a=function(e,t,a){var n=!1;return e.map((function(e){return 0===e.value.length?(t(e.name,"Campo obligatorio",a),n=!0):e.minValue&&e.value.length<e.minValue&&(t(e.name,"No válido",a),n=!0),null})),n}},qS50:function(e,t,a){"use strict";a.r(t);var n=a("o0o1"),r=a.n(n),o=a("q1tI"),i=a.n(o),c=a("tRbT"),l=a("kKAo"),u=a("4fo9"),s=a("LrKO"),m=a("g6jR"),d=a("NUoh"),p=a("/MKj"),v=a("nXu+"),f=a("uHp0"),h=a("Bnya"),b=a("HXb3");function g(e,t,a,n,r,o,i){try{var c=e[o](i),l=c.value}catch(e){return void a(e)}c.done?t(l):Promise.resolve(l).then(n,r)}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e))&&"[object Arguments]"!==Object.prototype.toString.call(e))return;var a=[],n=!0,r=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw o}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function y(e){var t=e.handleChange,a=e.error,n=e.values,r=e.option,o=e.loading,l=e.updateInputValue,d=e.contentMaxLength,p=e.progress,v=n.title,f=n.content,h=n.img,b=n.archives;return i.a.createElement(c.a,{container:!0,spacing:2,justify:"center"},i.a.createElement(c.a,{item:!0,xs:12,sm:7,md:5},i.a.createElement(u.a,{data:{val:v,name:"title",label:"Título"},size:"small",accion:t,error:a.title})),i.a.createElement(c.a,{item:!0,xs:12,sm:10,md:8,style:{textAlign:"center"}},i.a.createElement(u.a,{data:{val:f,name:"content",label:"Contenido de la publicación"},accion:t,error:a.content,textarea:!0})),i.a.createElement(c.a,{item:!0,xs:12,style:{textAlign:"center"}},a.content.status&&""===a.content.message?i.a.createElement("span",{style:{color:"#f44336"}},"".concat(f.length,"/").concat(d," caracteres")):i.a.createElement("span",null,"".concat(f.length,"/").concat(d," caracteres"))),"noticia"===r&&i.a.createElement(i.a.Fragment,null,i.a.createElement(c.a,{item:!0,xs:12,sm:5,md:3},i.a.createElement(m.a,{idName:"uploadPublic",accepted:"image/*",reset:r,files:h,action:l,multiple:!0,maxSizeFile:{unique:"3MB",multiple:"3MB"},label:{unique:"imagenes",multiple:"imagenes"},name:"img",type:"PUBLICAR"})),i.a.createElement(c.a,{item:!0,xs:12,sm:5,md:3},i.a.createElement(m.a,{idName:"uploadArchivesPublic",accepted:".doc,.docx,.pdf,.xlsx,.xls",reset:r,files:b,action:l,multiple:!0,maxSizeFile:{unique:"2MB",multiple:"2MB"},label:{unique:"archivos",multiple:"archivos"},name:"archives",type:"PUBLICAR"}))),i.a.createElement(c.a,{item:!0,xs:12,style:{textAlign:"center"}},i.a.createElement(c.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},i.a.createElement(s.a,{estilo:"outlined",colorsito:"inherit",text:"Publicar",loading:o,progressBar:"noticia"===r,progress:p}))))}function E(e){var t=e.action,a=e.value;return i.a.createElement("div",{className:"Box"},i.a.createElement("span",{className:"title"},"Publicar"),i.a.createElement("div",{className:"content"},i.a.createElement(u.c,{action:t,val:a,data:{name:"option",values:[{value:"noticia",name:"Noticia"},{value:"anuncio",name:"Anuncio"}]},classNameSet:"select",customWidth:"auto",empty:!1})))}var w={updateInputValue:v.a,errorInfo:f.a,updateLoading:h.a};t.default=Object(p.b)((function(e){return{data:e.panelSettings.publicarSection}}),w)((function(e){var t=e.data,a=e.updateInputValue,n=e.errorInfo,u=e.updateLoading,s=t.option,m=t.loading,p=t.error,v=t.title,f=t.content,h=t.img,w=t.archives,S="noticia"===s?1e4:520,j=x(Object(o.useState)(0),2),A=j[0],k=j[1],C=Object(b.useSnackbar)().enqueueSnackbar,I=function(e){a(e,"PUBLICAR")},B=function(e){var t=Math.round(100*e.loaded/e.total);k(t)},P=function(){var e,t=(e=r.a.mark((function e(t){var a,n,o,i,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,"noticia"!==s){e.next=7;break}return e.next=4,axios.post("api/news",t,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:B});case 4:a=e.sent,e.next=10;break;case 7:return e.next=9,axios.post("api/anuncios",t);case 9:a=e.sent;case 10:n=a.data.description,C(n,{variant:"success"}),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(0),o=e.t0.response,i=o.status,c=o.data,400===i?C(c.description,{variant:"warning"}):C(403===i||422===i?c.description:500===i?"No se ha podido conectar con la base de datos":"Error interno en el sistema",{variant:"error"});case 18:u(!1,"PUBLICAR");case 19:case"end":return e.stop()}}),e,null,[[0,14]])})),function(){var t=this,a=arguments;return new Promise((function(n,r){var o=e.apply(t,a);function i(e){g(o,n,r,i,c,"next",e)}function c(e){g(o,n,r,i,c,"throw",e)}i(void 0)}))});return function(e){return t.apply(this,arguments)}}();return i.a.createElement(c.a,{container:!0,spacing:2,justify:"center"},i.a.createElement(c.a,{item:!0,xs:12,sm:5,md:3},i.a.createElement(l.a,{variant:"outlined"},i.a.createElement(E,{action:I,value:s}))),i.a.createElement(c.a,{item:!0,xs:12,sm:10},i.a.createElement(l.a,{variant:"outlined"},i.a.createElement("div",{className:"Box"},i.a.createElement("div",{className:"content"},i.a.createElement("form",{autoComplete:"off",onSubmit:function(e){e.preventDefault();var t=!1,a=[{value:v,name:"title",minValue:5},{value:f,name:"content",minValue:20}];t=Object(d.a)(a,n,"PUBLICAR"),f.length>S&&(n("content","","PUBLICAR"),t=!0),"noticia"===s&&w.length>4&&(C("Solo puede subir un máximo de 4 archivos",{variant:"warning"}),t=!0);var r=new FormData;r.append("title",v),r.append("content",f);for(var o=0;o<h.length;o++){var i=h[o];r.append("img[]",i),i.size/1024>3072&&(C("Una de las imagenes supera el tamaño máximo",{variant:"warning"}),t=!0)}for(var c=0;c<w.length;c++){var l=w[c];r.append("archives[]",l),l.size/1024>2048&&(C("Uno de los archivos supera el tamaño máximo",{variant:"warning"}),t=!0)}if(t)return null;u(!0,"PUBLICAR"),P(r)},method:"POST",style:{marginTop:"0"}},i.a.createElement(y,{handleChange:I,error:p,values:{title:v,content:f,img:h},loading:m,updateInputValue:a,option:s,contentMaxLength:S,progress:A})))))))}))},vkC2:function(e,t,a){"use strict";t.a=function(e,t,a){var n=window.URL.createObjectURL(new Blob([e])),r=document.createElement("a");r.href=n,r.setAttribute("download","".concat(t,".").concat(a)),document.body.appendChild(r),r.click()}}}]);