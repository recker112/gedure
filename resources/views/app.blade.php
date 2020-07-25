<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8"/>
		
		<title>{{ config('app.name', 'La Candelaria') }}</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <meta name="theme-color" content="#000000"/>
		<meta name="”robots”" content="”Index," follow”>
    <meta name="description" content="Página web oficial de La Candelaria Tumero, donde los estudiantes pueden las noticias publicadas por la institución y gestionar diferentes acciones."/>
		 
		<link rel="icon" href="{{ secure_asset('resources/favicon.png') }}"/>
    <link rel="apple-touch-icon" href="{{ secure_asset('resources/favicon.png') }}"/>
    
    <link rel="manifest" href="/manifest.json"/>
    
		
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
		
		<script src="https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=es2017%2CURLSearchParams%2Ces2015%2CIntersectionObserver"></script>
  <link href="/static/css/main.dc7f6705.chunk.css" rel="stylesheet"></head>
  <body>
    <noscript>Necesitas tener activado JavaScript para ejecutar esta App.</noscript>
    <div id="root"></div>
  <script>!function(i){function e(e){for(var r,t,n=e[0],o=e[1],a=e[2],u=0,c=[];u<n.length;u++)t=n[u],Object.prototype.hasOwnProperty.call(f,t)&&f[t]&&c.push(f[t][0]),f[t]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(i[r]=o[r]);for(p&&p(e);c.length;)c.shift()();return d.push.apply(d,a||[]),l()}function l(){for(var e,r=0;r<d.length;r++){for(var t=d[r],n=!0,o=1;o<t.length;o++){var a=t[o];0!==f[a]&&(n=!1)}n&&(d.splice(r--,1),e=s(s.s=t[0]))}return e}var t={},f={6:0},d=[];function s(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return i[e].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.e=function(o){var e=[],t=f[o];if(0!==t)if(t)e.push(t[2]);else{var r=new Promise(function(e,r){t=f[o]=[e,r]});e.push(t[2]=r);var n,a=document.createElement("script");a.charset="utf-8",a.timeout=120,s.nc&&a.setAttribute("nonce",s.nc),a.src=s.p+"static/js/"+({}[o]||o)+"."+{0:"70b2dfe1",1:"a535e946",2:"22b1ebb8",3:"d11d6eab",4:"6446ea2f",8:"70d48045",9:"eacf21cd",10:"6552d59e",11:"83dd6942",12:"c3cdec99",13:"6bb2651a",14:"dddb4a1d",15:"f66f22bc",16:"30537559",17:"83cbfa8b",18:"fe25a3e1",19:"50670b7a",20:"ec97bba4",21:"e5eeb36a",22:"9aede255",23:"647463dd"}[o]+".chunk.js";var u=new Error;n=function(e){a.onerror=a.onload=null,clearTimeout(c);var r=f[o];if(0!==r){if(r){var t=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src;u.message="Loading chunk "+o+" failed.\n("+t+": "+n+")",u.name="ChunkLoadError",u.type=t,u.request=n,r[1](u)}f[o]=void 0}};var c=setTimeout(function(){n({type:"timeout",target:a})},12e4);a.onerror=a.onload=n,document.head.appendChild(a)}return Promise.all(e)},s.m=i,s.c=t,s.d=function(e,r,t){s.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(r,e){if(1&e&&(r=s(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)s.d(t,n,function(e){return r[e]}.bind(null,n));return t},s.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(r,"a",r),r},s.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},s.p="/",s.oe=function(e){throw console.error(e),e};var r=this["webpackJsonpla-candelaria-web"]=this["webpackJsonpla-candelaria-web"]||[],n=r.push.bind(r);r.push=e,r=r.slice();for(var o=0;o<r.length;o++)e(r[o]);var p=n;l()}([])</script><script src="/static/js/7.ff04d275.chunk.js"></script><script src="/static/js/main.46abe0bb.chunk.js"></script></body>
</html>
