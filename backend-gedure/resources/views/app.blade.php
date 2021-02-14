<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width,initial-scale=1"/>
		<meta name="theme-color" content="#000000"/>
		<meta name="description" content="Pรกgina web oficial de La Candelaria Tumero, donde los estudiantes pueden las noticias publicadas por la instituciรณn y gestionar diferentes acciones."/>
		<link rel="icon" href="{{ secure_asset('resources/favicon.png') }}"/>
    <link rel="apple-touch-icon" href="{{ secure_asset('resources/favicon.png') }}"/>
		
		<link rel="manifest" href="/manifest.json"/>
		
		<title>{{ config('app.name', 'Laravel') }}</title>
		<meta name="csrf-token" content="{{ csrf_token() }}">
		
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
		
		<script src="https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=es2017%2CURLSearchParams%2Ces2015%2CIntersectionObserver"></script>
	<link href="/static/css/main.9e42d36a.chunk.css" rel="stylesheet"></head>
	<body>
		<noscript>Necesitas activar JavaScript para poder ver esta App.</noscript>
		<div id="root"></div>
	<script>!function(d){function e(e){for(var r,t,n=e[0],c=e[1],o=e[2],a=0,f=[];a<n.length;a++)t=n[a],Object.prototype.hasOwnProperty.call(u,t)&&u[t]&&f.push(u[t][0]),u[t]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(d[r]=c[r]);for(s&&s(e);f.length;)f.shift()();return i.push.apply(i,o||[]),b()}function b(){for(var e,r=0;r<i.length;r++){for(var t=i[r],n=!0,c=1;c<t.length;c++){var o=t[c];0!==u[o]&&(n=!1)}n&&(i.splice(r--,1),e=l(l.s=t[0]))}return e}var t={},u={10:0},i=[];function l(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return d[e].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.e=function(c){var e=[],t=u[c];if(0!==t)if(t)e.push(t[2]);else{var r=new Promise(function(e,r){t=u[c]=[e,r]});e.push(t[2]=r);var n,o=document.createElement("script");o.charset="utf-8",o.timeout=120,l.nc&&o.setAttribute("nonce",l.nc),o.src=l.p+"static/js/"+({}[c]||c)+"."+{0:"90fec198",1:"b3561431",2:"09b9c85a",3:"0956b1df",4:"3fd21dc3",5:"20715333",6:"8cf29ea9",7:"3b26ab9c",8:"1e974d74",11:"542cd0af",12:"01899035",13:"18c2b4b5",14:"7871cd97",15:"ba882351",17:"186dc9ba",18:"659d3c97",19:"3e1bbf04",20:"4de920ed",21:"cbc2de78",22:"b6297911",23:"ce752c2a",24:"b931dd54",25:"594b2df4",26:"6277677e",27:"d3e4d550",28:"1713c0b2",29:"a78cf0b8",30:"e4a18320",31:"e4e5858f",32:"9c2bf81d",33:"b8d14f2d",34:"36e43b37",35:"1760857b",36:"197c92f6",37:"f156cb62",38:"c1c00a40",39:"fa1ebec1",40:"6eaf0ede",41:"cf92d5db",42:"f1205cd5",43:"853d775d",44:"7b869529",45:"cc947fb4",46:"537f205c",47:"8f747b2e",48:"20cb656d",49:"1cde15b0",50:"2882ce5a",51:"9befbaed",52:"b28767b1",53:"2589a0ee",54:"bdd37b01",55:"aa323765",56:"87d433f0",57:"13589489",58:"f7a8e8b5",59:"c456beb5",60:"3d90e0f7",61:"5fd80735",62:"02bc32df",63:"2ca000b8",64:"dfb7ae27",65:"638e122c",66:"2c2d6377",67:"7612a681",68:"63a4714d",69:"b831361f",70:"75bc410a",71:"98e25481",72:"b571e573",73:"4b3b4ecb",74:"ea577605",75:"e28179e8",76:"6c90704b"}[c]+".chunk.js";var a=new Error;n=function(e){o.onerror=o.onload=null,clearTimeout(f);var r=u[c];if(0!==r){if(r){var t=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src;a.message="Loading chunk "+c+" failed.\n("+t+": "+n+")",a.name="ChunkLoadError",a.type=t,a.request=n,r[1](a)}u[c]=void 0}};var f=setTimeout(function(){n({type:"timeout",target:o})},12e4);o.onerror=o.onload=n,document.head.appendChild(o)}return Promise.all(e)},l.m=d,l.c=t,l.d=function(e,r,t){l.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(r,e){if(1&e&&(r=l(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(l.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)l.d(t,n,function(e){return r[e]}.bind(null,n));return t},l.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(r,"a",r),r},l.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},l.p="/",l.oe=function(e){throw console.error(e),e};var r=this.webpackJsonpGedure=this.webpackJsonpGedure||[],n=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var s=n;b()}([])</script><script src="/static/js/16.ba936069.chunk.js"></script><script src="/static/js/main.33cc34c5.chunk.js"></script></body>
</html>
