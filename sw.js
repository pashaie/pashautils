if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>n(e,o),d={module:{uri:o},exports:t,require:c};i[o]=Promise.all(s.map((e=>d[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-1cb8ffbd.js",revision:null},{url:"assets/index-7eaca2fc.css",revision:null},{url:"index.html",revision:"c23f12f537160f83d72a689182e6c6cb"},{url:"registerSW.js",revision:"40bd85456d92675a2edb3eb3a17feabc"},{url:"favicon.ico",revision:"e5e0c5f22268059069df5d4803bd141f"},{url:"apple-touch-icon.png",revision:"1a5df0b5d9e743e155331c08cd47db88"},{url:"manifest.webmanifest",revision:"c4a0413c82fc06164dfbc75ee81b75d9"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
