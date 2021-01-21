(()=>{"use strict";const e=function(){let e,t=document.querySelector(".gallery"),n=document.querySelectorAll(".flex .image"),r=document.querySelector("#modal").content;async function a(){let e=await fetch("http://localhost:3000/comments");return await e.json()}function o(e,t,n){let r=0;for(let a=0;a<e.length;a++)if(e[a].image===t){let t=document.querySelector("#newComment").content.querySelector(".comment").cloneNode(!0);t.querySelector(".author").textContent=e[a].author,t.querySelector(".dateComment").textContent=e[a].dateComment,t.querySelector(".commentText").textContent=e[a].commentText,n.after(t),r+=1}else r+=0;if(0==r){let e=document.createElement("li");e.classList.add("no-comments"),e.textContent="Нет комментариев...",n.after(e)}}n.forEach((n=>{n.addEventListener("click",(n=>{let u=n.target.getAttribute("id"),i=n.target.getAttribute("src"),s=n.target.getAttribute("alt");a().then((t=>{e=t})).then((()=>function(n,u,i,s){let c=r.querySelector(".modal").cloneNode(!0),l=c.querySelector("img"),d=c.querySelector(".comment-stat"),f=c.querySelector(".modal__close"),m=c.querySelector(".add-comment"),h=c.querySelector(".new-comment-form");l.src=u,l.alt=i,l.setAttribute("id",n),o(s,n,d),t.append(c),f.addEventListener("click",(()=>{c.remove()})),m.addEventListener("click",(t=>{t.preventDefault();let r=new FormData(h),u=Object.fromEntries(r.entries());u.image=n;let i=new Date,s=i.getFullYear(),c=i.getMonth()+1,l=i.getDate();u.dateComment=`${l}-${c}-${s}`,async function(e){let t=await fetch("http://localhost:3000/comments",{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:e});if(!t.ok)throw new Error(`Error. Status: ${t.status}`);return await t.json()}(JSON.stringify(u)).then((()=>{let t=document.createElement("div");t.classList.add("modal-message"),t.textContent="Ваш комментарий успешно добавлен!",m.after(t),h.reset(),setTimeout((()=>{t.remove()}),1500),e=[],a().then((t=>{e=t})).then((()=>{document.querySelectorAll(".comments .comment").forEach((e=>{e.remove()})),document.querySelector(".comments .no-comments").remove();let t=document.querySelector(".modal .image").getAttribute("id"),n=document.querySelector(".comment-stat");o(e,t,n)}))}))}))}(u,i,s,e)))}))}))};var t={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},n={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},r=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],a={CSS:{},springs:{}};function o(e,t,n){return Math.min(Math.max(e,t),n)}function u(e,t){return e.indexOf(t)>-1}function i(e,t){return e.apply(null,t)}var s={arr:function(e){return Array.isArray(e)},obj:function(e){return u(Object.prototype.toString.call(e),"Object")},pth:function(e){return s.obj(e)&&e.hasOwnProperty("totalLength")},svg:function(e){return e instanceof SVGElement},inp:function(e){return e instanceof HTMLInputElement},dom:function(e){return e.nodeType||s.svg(e)},str:function(e){return"string"==typeof e},fnc:function(e){return"function"==typeof e},und:function(e){return void 0===e},nil:function(e){return s.und(e)||null===e},hex:function(e){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)},rgb:function(e){return/^rgb/.test(e)},hsl:function(e){return/^hsl/.test(e)},col:function(e){return s.hex(e)||s.rgb(e)||s.hsl(e)},key:function(e){return!t.hasOwnProperty(e)&&!n.hasOwnProperty(e)&&"targets"!==e&&"keyframes"!==e}};function c(e){var t=/\(([^)]+)\)/.exec(e);return t?t[1].split(",").map((function(e){return parseFloat(e)})):[]}function l(e,t){var n=c(e),r=o(s.und(n[0])?1:n[0],.1,100),u=o(s.und(n[1])?100:n[1],.1,100),i=o(s.und(n[2])?10:n[2],.1,100),l=o(s.und(n[3])?0:n[3],.1,100),d=Math.sqrt(u/r),f=i/(2*Math.sqrt(u*r)),m=f<1?d*Math.sqrt(1-f*f):0,h=f<1?(f*d-l)/m:-l+d;function g(e){var n=t?t*e/1e3:e;return n=f<1?Math.exp(-n*f*d)*(1*Math.cos(m*n)+h*Math.sin(m*n)):(1+h*n)*Math.exp(-n*d),0===e||1===e?e:1-n}return t?g:function(){var t=a.springs[e];if(t)return t;for(var n=1/6,r=0,o=0;;)if(1===g(r+=n)){if(++o>=16)break}else o=0;var u=r*n*1e3;return a.springs[e]=u,u}}function d(e){return void 0===e&&(e=10),function(t){return Math.ceil(o(t,1e-6,1)*e)*(1/e)}}var f,m,h=function(){var e=.1;function t(e,t){return 1-3*t+3*e}function n(e,t){return 3*t-6*e}function r(e){return 3*e}function a(e,a,o){return((t(a,o)*e+n(a,o))*e+r(a))*e}function o(e,a,o){return 3*t(a,o)*e*e+2*n(a,o)*e+r(a)}return function(t,n,r,u){if(0<=t&&t<=1&&0<=r&&r<=1){var i=new Float32Array(11);if(t!==n||r!==u)for(var s=0;s<11;++s)i[s]=a(s*e,t,r);return function(s){return t===n&&r===u||0===s||1===s?s:a(function(n){for(var u=0,s=1;10!==s&&i[s]<=n;++s)u+=e;--s;var c=u+(n-i[s])/(i[s+1]-i[s])*e,l=o(c,t,r);return l>=.001?function(e,t,n,r){for(var u=0;u<4;++u){var i=o(t,n,r);if(0===i)return t;t-=(a(t,n,r)-e)/i}return t}(n,c,t,r):0===l?c:function(e,t,n,r,o){var u,i,s=0;do{(u=a(i=t+(n-t)/2,r,o)-e)>0?n=i:t=i}while(Math.abs(u)>1e-7&&++s<10);return i}(n,u,u+e,t,r)}(s),n,u)}}}}(),g=(f={linear:function(){return function(e){return e}}},m={Sine:function(){return function(e){return 1-Math.cos(e*Math.PI/2)}},Circ:function(){return function(e){return 1-Math.sqrt(1-e*e)}},Back:function(){return function(e){return e*e*(3*e-2)}},Bounce:function(){return function(e){for(var t,n=4;e<((t=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*t-2)/22-e,2)}},Elastic:function(e,t){void 0===e&&(e=1),void 0===t&&(t=.5);var n=o(e,1,10),r=o(t,.1,2);return function(e){return 0===e||1===e?e:-n*Math.pow(2,10*(e-1))*Math.sin((e-1-r/(2*Math.PI)*Math.asin(1/n))*(2*Math.PI)/r)}}},["Quad","Cubic","Quart","Quint","Expo"].forEach((function(e,t){m[e]=function(){return function(e){return Math.pow(e,t+2)}}})),Object.keys(m).forEach((function(e){var t=m[e];f["easeIn"+e]=t,f["easeOut"+e]=function(e,n){return function(r){return 1-t(e,n)(1-r)}},f["easeInOut"+e]=function(e,n){return function(r){return r<.5?t(e,n)(2*r)/2:1-t(e,n)(-2*r+2)/2}},f["easeOutIn"+e]=function(e,n){return function(r){return r<.5?(1-t(e,n)(1-2*r))/2:(t(e,n)(2*r-1)+1)/2}}})),f);function p(e,t){if(s.fnc(e))return e;var n=e.split("(")[0],r=g[n],a=c(e);switch(n){case"spring":return l(e,t);case"cubicBezier":return i(h,a);case"steps":return i(d,a);default:return i(r,a)}}function v(e){try{return document.querySelectorAll(e)}catch(e){return}}function y(e,t){for(var n=e.length,r=arguments.length>=2?arguments[1]:void 0,a=[],o=0;o<n;o++)if(o in e){var u=e[o];t.call(r,u,o,e)&&a.push(u)}return a}function w(e){return e.reduce((function(e,t){return e.concat(s.arr(t)?w(t):t)}),[])}function b(e){return s.arr(e)?e:(s.str(e)&&(e=v(e)||e),e instanceof NodeList||e instanceof HTMLCollection?[].slice.call(e):[e])}function x(e,t){return e.some((function(e){return e===t}))}function S(e){var t={};for(var n in e)t[n]=e[n];return t}function C(e,t){var n=S(e);for(var r in e)n[r]=t.hasOwnProperty(r)?t[r]:e[r];return n}function M(e,t){var n=S(e);for(var r in t)n[r]=s.und(e[r])?t[r]:e[r];return n}function E(e){var t=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);if(t)return t[1]}function q(e,t){return s.fnc(e)?e(t.target,t.id,t.total):e}function k(e,t){return e.getAttribute(t)}function O(e,t,n){if(x([n,"deg","rad","turn"],E(t)))return t;var r=a.CSS[t+n];if(!s.und(r))return r;var o=document.createElement(e.tagName),u=e.parentNode&&e.parentNode!==document?e.parentNode:document.body;u.appendChild(o),o.style.position="absolute",o.style.width=100+n;var i=100/o.offsetWidth;u.removeChild(o);var c=i*parseFloat(t);return a.CSS[t+n]=c,c}function D(e,t,n){if(t in e.style){var r=t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),a=e.style[t]||getComputedStyle(e).getPropertyValue(r)||"0";return n?O(e,a,n):a}}function L(e,t){return s.dom(e)&&!s.inp(e)&&(!s.nil(k(e,t))||s.svg(e)&&e[t])?"attribute":s.dom(e)&&x(r,t)?"transform":s.dom(e)&&"transform"!==t&&D(e,t)?"css":null!=e[t]?"object":void 0}function P(e){if(s.dom(e)){for(var t,n=e.style.transform||"",r=/(\w+)\(([^)]*)\)/g,a=new Map;t=r.exec(n);)a.set(t[1],t[2]);return a}}function T(e,t,n,r){switch(L(e,t)){case"transform":return function(e,t,n,r){var a=u(t,"scale")?1:0+function(e){return u(e,"translate")||"perspective"===e?"px":u(e,"rotate")||u(e,"skew")?"deg":void 0}(t),o=P(e).get(t)||a;return n&&(n.transforms.list.set(t,o),n.transforms.last=t),r?O(e,o,r):o}(e,t,r,n);case"css":return D(e,t,n);case"attribute":return k(e,t);default:return e[t]||0}}function A(e,t){var n=/^(\*=|\+=|-=)/.exec(e);if(!n)return e;var r=E(e)||0,a=parseFloat(t),o=parseFloat(e.replace(n[0],""));switch(n[0][0]){case"+":return a+o+r;case"-":return a-o+r;case"*":return a*o+r}}function B(e,t){if(s.col(e))return function(e){return s.rgb(e)?(n=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(t=e))?"rgba("+n[1]+",1)":t:s.hex(e)?function(e){var t=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(function(e,t,n,r){return t+t+n+n+r+r})),n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return"rgba("+parseInt(n[1],16)+","+parseInt(n[2],16)+","+parseInt(n[3],16)+",1)"}(e):s.hsl(e)?function(e){var t,n,r,a=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e),o=parseInt(a[1],10)/360,u=parseInt(a[2],10)/100,i=parseInt(a[3],10)/100,s=a[4]||1;function c(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}if(0==u)t=n=r=i;else{var l=i<.5?i*(1+u):i+u-i*u,d=2*i-l;t=c(d,l,o+1/3),n=c(d,l,o),r=c(d,l,o-1/3)}return"rgba("+255*t+","+255*n+","+255*r+","+s+")"}(e):void 0;var t,n}(e);if(/\s/g.test(e))return e;var n=E(e),r=n?e.substr(0,e.length-n.length):e;return t?r+t:r}function I(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function N(e){for(var t,n=e.points,r=0,a=0;a<n.numberOfItems;a++){var o=n.getItem(a);a>0&&(r+=I(t,o)),t=o}return r}function j(e){if(e.getTotalLength)return e.getTotalLength();switch(e.tagName.toLowerCase()){case"circle":return function(e){return 2*Math.PI*k(e,"r")}(e);case"rect":return function(e){return 2*k(e,"width")+2*k(e,"height")}(e);case"line":return function(e){return I({x:k(e,"x1"),y:k(e,"y1")},{x:k(e,"x2"),y:k(e,"y2")})}(e);case"polyline":return N(e);case"polygon":return function(e){var t=e.points;return N(e)+I(t.getItem(t.numberOfItems-1),t.getItem(0))}(e)}}function F(e,t){var n=t||{},r=n.el||function(e){for(var t=e.parentNode;s.svg(t)&&s.svg(t.parentNode);)t=t.parentNode;return t}(e),a=r.getBoundingClientRect(),o=k(r,"viewBox"),u=a.width,i=a.height,c=n.viewBox||(o?o.split(" "):[0,0,u,i]);return{el:r,viewBox:c,x:c[0]/1,y:c[1]/1,w:u,h:i,vW:c[2],vH:c[3]}}function $(e,t,n){function r(n){void 0===n&&(n=0);var r=t+n>=1?t+n:0;return e.el.getPointAtLength(r)}var a=F(e.el,e.svg),o=r(),u=r(-1),i=r(1),s=n?1:a.w/a.vW,c=n?1:a.h/a.vH;switch(e.property){case"x":return(o.x-a.x)*s;case"y":return(o.y-a.y)*c;case"angle":return 180*Math.atan2(i.y-u.y,i.x-u.x)/Math.PI}}function Q(e,t){var n=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,r=B(s.pth(e)?e.totalLength:e,t)+"";return{original:r,numbers:r.match(n)?r.match(n).map(Number):[0],strings:s.str(e)||t?r.split(n):[]}}function W(e){return y(e?w(s.arr(e)?e.map(b):b(e)):[],(function(e,t,n){return n.indexOf(e)===t}))}function H(e){var t=W(e);return t.map((function(e,n){return{target:e,id:n,total:t.length,transforms:{list:P(e)}}}))}function V(e,t){var n=S(t);if(/^spring/.test(n.easing)&&(n.duration=l(n.easing)),s.arr(e)){var r=e.length;2!==r||s.obj(e[0])?s.fnc(t.duration)||(n.duration=t.duration/r):e={value:e}}var a=s.arr(e)?e:[e];return a.map((function(e,n){var r=s.obj(e)&&!s.pth(e)?e:{value:e};return s.und(r.delay)&&(r.delay=n?0:t.delay),s.und(r.endDelay)&&(r.endDelay=n===a.length-1?t.endDelay:0),r})).map((function(e){return M(e,n)}))}var Y={css:function(e,t,n){return e.style[t]=n},attribute:function(e,t,n){return e.setAttribute(t,n)},object:function(e,t,n){return e[t]=n},transform:function(e,t,n,r,a){if(r.list.set(t,n),t===r.last||a){var o="";r.list.forEach((function(e,t){o+=t+"("+e+") "})),e.style.transform=o}}};function X(e,t){H(e).forEach((function(e){for(var n in t){var r=q(t[n],e),a=e.target,o=E(r),u=T(a,n,o,e),i=A(B(r,o||E(u)),u),s=L(a,n);Y[s](a,n,i,e.transforms,!0)}}))}function Z(e,t){return y(w(e.map((function(e){return t.map((function(t){return function(e,t){var n=L(e.target,t.name);if(n){var r=function(e,t){var n;return e.tweens.map((function(r){var a=function(e,t){var n={};for(var r in e){var a=q(e[r],t);s.arr(a)&&1===(a=a.map((function(e){return q(e,t)}))).length&&(a=a[0]),n[r]=a}return n.duration=parseFloat(n.duration),n.delay=parseFloat(n.delay),n}(r,t),o=a.value,u=s.arr(o)?o[1]:o,i=E(u),c=T(t.target,e.name,i,t),l=n?n.to.original:c,d=s.arr(o)?o[0]:l,f=E(d)||E(c),m=i||f;return s.und(u)&&(u=l),a.from=Q(d,m),a.to=Q(A(u,d),m),a.start=n?n.end:0,a.end=a.start+a.delay+a.duration+a.endDelay,a.easing=p(a.easing,a.duration),a.isPath=s.pth(o),a.isPathTargetInsideSVG=a.isPath&&s.svg(t.target),a.isColor=s.col(a.from.original),a.isColor&&(a.round=1),n=a,a}))}(t,e),a=r[r.length-1];return{type:n,property:t.name,animatable:e,tweens:r,duration:a.end,delay:r[0].delay,endDelay:a.endDelay}}}(e,t)}))}))),(function(e){return!s.und(e)}))}function _(e,t){var n=e.length,r=function(e){return e.timelineOffset?e.timelineOffset:0},a={};return a.duration=n?Math.max.apply(Math,e.map((function(e){return r(e)+e.duration}))):t.duration,a.delay=n?Math.min.apply(Math,e.map((function(e){return r(e)+e.delay}))):t.delay,a.endDelay=n?a.duration-Math.max.apply(Math,e.map((function(e){return r(e)+e.duration-e.endDelay}))):t.endDelay,a}var G=0,R=[],z=function(){var e;function t(n){for(var r=R.length,a=0;a<r;){var o=R[a];o.paused?(R.splice(a,1),r--):(o.tick(n),a++)}e=a>0?requestAnimationFrame(t):void 0}return"undefined"!=typeof document&&document.addEventListener("visibilitychange",(function(){K.suspendWhenDocumentHidden&&(J()?e=cancelAnimationFrame(e):(R.forEach((function(e){return e._onDocumentVisibility()})),z()))})),function(){e||J()&&K.suspendWhenDocumentHidden||!(R.length>0)||(e=requestAnimationFrame(t))}}();function J(){return!!document&&document.hidden}function K(e){void 0===e&&(e={});var r,a=0,u=0,i=0,c=0,l=null;function d(e){var t=window.Promise&&new Promise((function(e){return l=e}));return e.finished=t,t}var f=function(e){var r=C(t,e),a=C(n,e),o=function(e,t){var n=[],r=t.keyframes;for(var a in r&&(t=M(function(e){for(var t=y(w(e.map((function(e){return Object.keys(e)}))),(function(e){return s.key(e)})).reduce((function(e,t){return e.indexOf(t)<0&&e.push(t),e}),[]),n={},r=function(r){var a=t[r];n[a]=e.map((function(e){var t={};for(var n in e)s.key(n)?n==a&&(t.value=e[n]):t[n]=e[n];return t}))},a=0;a<t.length;a++)r(a);return n}(r),t)),t)s.key(a)&&n.push({name:a,tweens:V(t[a],e)});return n}(a,e),u=H(e.targets),i=Z(u,o),c=_(i,a),l=G;return G++,M(r,{id:l,children:[],animatables:u,animations:i,duration:c.duration,delay:c.delay,endDelay:c.endDelay})}(e);function m(){var e=f.direction;"alternate"!==e&&(f.direction="normal"!==e?"normal":"reverse"),f.reversed=!f.reversed,r.forEach((function(e){return e.reversed=f.reversed}))}function h(e){return f.reversed?f.duration-e:e}function g(){a=0,u=h(f.currentTime)*(1/K.speed)}function p(e,t){t&&t.seek(e-t.timelineOffset)}function v(e){for(var t=0,n=f.animations,r=n.length;t<r;){var a=n[t],u=a.animatable,i=a.tweens,s=i.length-1,c=i[s];s&&(c=y(i,(function(t){return e<t.end}))[0]||c);for(var l=o(e-c.start-c.delay,0,c.duration)/c.duration,d=isNaN(l)?1:c.easing(l),m=c.to.strings,h=c.round,g=[],p=c.to.numbers.length,v=void 0,w=0;w<p;w++){var b=void 0,x=c.to.numbers[w],S=c.from.numbers[w]||0;b=c.isPath?$(c.value,d*x,c.isPathTargetInsideSVG):S+d*(x-S),h&&(c.isColor&&w>2||(b=Math.round(b*h)/h)),g.push(b)}var C=m.length;if(C){v=m[0];for(var M=0;M<C;M++){m[M];var E=m[M+1],q=g[M];isNaN(q)||(v+=E?q+E:q+" ")}}else v=g[0];Y[a.type](u.target,a.property,v,u.transforms),a.currentValue=v,t++}}function b(e){f[e]&&!f.passThrough&&f[e](f)}function x(e){var t=f.duration,n=f.delay,s=t-f.endDelay,g=h(e);f.progress=o(g/t*100,0,100),f.reversePlayback=g<f.currentTime,r&&function(e){if(f.reversePlayback)for(var t=c;t--;)p(e,r[t]);else for(var n=0;n<c;n++)p(e,r[n])}(g),!f.began&&f.currentTime>0&&(f.began=!0,b("begin")),!f.loopBegan&&f.currentTime>0&&(f.loopBegan=!0,b("loopBegin")),g<=n&&0!==f.currentTime&&v(0),(g>=s&&f.currentTime!==t||!t)&&v(t),g>n&&g<s?(f.changeBegan||(f.changeBegan=!0,f.changeCompleted=!1,b("changeBegin")),b("change"),v(g)):f.changeBegan&&(f.changeCompleted=!0,f.changeBegan=!1,b("changeComplete")),f.currentTime=o(g,0,t),f.began&&b("update"),e>=t&&(u=0,f.remaining&&!0!==f.remaining&&f.remaining--,f.remaining?(a=i,b("loopComplete"),f.loopBegan=!1,"alternate"===f.direction&&m()):(f.paused=!0,f.completed||(f.completed=!0,b("loopComplete"),b("complete"),!f.passThrough&&"Promise"in window&&(l(),d(f)))))}return d(f),f.reset=function(){var e=f.direction;f.passThrough=!1,f.currentTime=0,f.progress=0,f.paused=!0,f.began=!1,f.loopBegan=!1,f.changeBegan=!1,f.completed=!1,f.changeCompleted=!1,f.reversePlayback=!1,f.reversed="reverse"===e,f.remaining=f.loop,r=f.children;for(var t=c=r.length;t--;)f.children[t].reset();(f.reversed&&!0!==f.loop||"alternate"===e&&1===f.loop)&&f.remaining++,v(f.reversed?f.duration:0)},f._onDocumentVisibility=g,f.set=function(e,t){return X(e,t),f},f.tick=function(e){i=e,a||(a=i),x((i+(u-a))*K.speed)},f.seek=function(e){x(h(e))},f.pause=function(){f.paused=!0,g()},f.play=function(){f.paused&&(f.completed&&f.reset(),f.paused=!1,R.push(f),g(),z())},f.reverse=function(){m(),f.completed=!f.reversed,g()},f.restart=function(){f.reset(),f.play()},f.remove=function(e){ee(W(e),f)},f.reset(),f.autoplay&&f.play(),f}function U(e,t){for(var n=t.length;n--;)x(e,t[n].animatable.target)&&t.splice(n,1)}function ee(e,t){var n=t.animations,r=t.children;U(e,n);for(var a=r.length;a--;){var o=r[a],u=o.animations;U(e,u),u.length||o.children.length||r.splice(a,1)}n.length||r.length||t.pause()}K.version="3.2.1",K.speed=1,K.suspendWhenDocumentHidden=!0,K.running=R,K.remove=function(e){for(var t=W(e),n=R.length;n--;)ee(t,R[n])},K.get=T,K.set=X,K.convertPx=O,K.path=function(e,t){var n=s.str(e)?v(e)[0]:e,r=t||100;return function(e){return{property:e,el:n,svg:F(n),totalLength:j(n)*(r/100)}}},K.setDashoffset=function(e){var t=j(e);return e.setAttribute("stroke-dasharray",t),t},K.stagger=function(e,t){void 0===t&&(t={});var n=t.direction||"normal",r=t.easing?p(t.easing):null,a=t.grid,o=t.axis,u=t.from||0,i="first"===u,c="center"===u,l="last"===u,d=s.arr(e),f=d?parseFloat(e[0]):parseFloat(e),m=d?parseFloat(e[1]):0,h=E(d?e[1]:e)||0,g=t.start||0+(d?f:0),v=[],y=0;return function(e,t,s){if(i&&(u=0),c&&(u=(s-1)/2),l&&(u=s-1),!v.length){for(var p=0;p<s;p++){if(a){var w=c?(a[0]-1)/2:u%a[0],b=c?(a[1]-1)/2:Math.floor(u/a[0]),x=w-p%a[0],S=b-Math.floor(p/a[0]),C=Math.sqrt(x*x+S*S);"x"===o&&(C=-x),"y"===o&&(C=-S),v.push(C)}else v.push(Math.abs(u-p));y=Math.max.apply(Math,v)}r&&(v=v.map((function(e){return r(e/y)*y}))),"reverse"===n&&(v=v.map((function(e){return o?e<0?-1*e:-e:Math.abs(y-e)})))}return g+(d?(m-f)/y:f)*(Math.round(100*v[t])/100)+h}},K.timeline=function(e){void 0===e&&(e={});var t=K(e);return t.duration=0,t.add=function(r,a){var o=R.indexOf(t),u=t.children;function i(e){e.passThrough=!0}o>-1&&R.splice(o,1);for(var c=0;c<u.length;c++)i(u[c]);var l=M(r,C(n,e));l.targets=l.targets||e.targets;var d=t.duration;l.autoplay=!1,l.direction=t.direction,l.timelineOffset=s.und(a)?d:A(a,d),i(t),t.seek(l.timelineOffset);var f=K(l);i(f),u.push(f);var m=_(u,e);return t.delay=m.delay,t.endDelay=m.endDelay,t.duration=m.duration,t.seek(0),t.reset(),t.autoplay&&t.play(),t},t},K.easing=p,K.penner=g,K.random=function(e,t){return Math.floor(Math.random()*(t-e+1))+e};const te=K;switch(function(e){let t=document.querySelector(".theme-button");t.addEventListener("click",(()=>{let n=function(e){let t=[],n=[];for(let r=0;r<e.length;r++)document.querySelector(`.${e[r]}`)&&(t.push(document.querySelector(`.${e[r]}`)),n.push(e[r]));return{Elements:t,Classes:n}}(e);if("dark"===t.getAttribute("id")){for(let e=0;e<n.Elements.length;e++)n.Elements[e].classList.add(`${n.Classes[e]}-light`);t.setAttribute("id","light")}else{for(let e=0;e<n.Elements.length;e++)n.Elements[e].classList.remove(`${n.Classes[e]}-light`);t.setAttribute("id","dark")}}))}(["about-image","page","page-header","container-gallery","page-footer","container-english","page-gallery","page-english","theme-button","navigation"]),document.querySelector("[data-page]").dataset.page){case"gallery":e();break;case"dictionary":!function(){let e=document.querySelector(".navigation-back"),t=document.querySelector(".navigation-next"),n=document.querySelector(".num-page-dictionary"),r=document.querySelector(".pages-dictionary-left"),a=document.querySelector(".pages-dictionary-right"),o=document.querySelector(".container-dictionary"),u=o.getElementsByClassName("dash"),i=o.getElementsByClassName("word-rus"),s=o.getElementsByClassName("word-en"),c=document.querySelector(".form-new-words"),l=1,d=[];function f(e){for(let t=0;t<e.length;t++)i[t].textContent=e[t].rus,s[t].textContent=e[t].en,u[t].textContent="-";n.textContent=l}function m(e){let t=[];for(let n=0;n<e.length;n++)12===t.length&&(d.push(t),t=[]),t.push(e[n]);t.length>0&&d.push(t)}function h(){for(let e=0;e<i.length;e++)i[e].textContent="",s[e].textContent="",u[e].textContent=""}class g{constructor(e,t,n){this.words=e,this.parentLeftPage=t,this.parentRightPage=n,this.createContainersWords(this.parentLeftPage),this.createContainersWords(this.parentRightPage)}createContainersWords(e){for(let t=0;t<this.words.length/2;t++){let t=document.createElement("div");t.classList.add("word-rus"),e.append(t);let n=document.createElement("div");n.classList.add("dash"),e.append(n);let r=document.createElement("div");r.classList.add("word-en"),e.append(r)}}}let p=async()=>{let e=await fetch("http://localhost:3000/words");if(!e.ok)throw new Error(`Error. Status: ${e.status}`);return await e.json()};function v(e,t){let n=document.createElement("div");n.classList.add("message"),t?(n.textContent="Успешно добавлено!",e.append(n)):(n.textContent="Введите русское и английское слова",e.after(n)),setTimeout((()=>{n.remove()}),3e3)}t.addEventListener("click",(()=>{if(l===d.length)return;l++;let e=l;h(),f(d[e-1])})),e.addEventListener("click",(()=>{if(1===l)return;l--;let e=l;h(),f(d[e-1])})),c.addEventListener("submit",(e=>{if(e.preventDefault(),c.querySelector("#rus").value&&c.querySelector("#en").value){let e=new FormData(c);(async e=>{let t=await fetch("http://localhost:3000/words",{method:"POST",headers:{"Content-type":"application/json"},body:e});if(!t.ok)throw new Error(`Error. Status: ${t.status}`);return await t.json()})(JSON.stringify(Object.fromEntries(e.entries()))).then((()=>{v(c,"good"),p().then((e=>{d=[],m(e)})).then((()=>{h(),f(d[l-1])}))})),c.reset()}else v(c.querySelector("#en"))})),p().then((e=>{m(e)})).then((()=>{new g(d[0],r,a)})).then((()=>{f(d[0])}));let y=null;document.querySelector("#rus").addEventListener("focus",(function(e){y&&y.pause(),y=te({targets:"path",strokeDashoffset:{value:0,duration:700,easing:"easeOutQuart"},strokeDasharray:{value:"240 1386",duration:700,easing:"easeOutQuart"}})})),document.querySelector("#en").addEventListener("focus",(function(e){y&&y.pause(),y=te({targets:"path",strokeDashoffset:{value:-336,duration:700,easing:"easeOutQuart"},strokeDasharray:{value:"240 1386",duration:700,easing:"easeOutQuart"}})})),document.querySelector(".add-word").addEventListener("focus",(function(e){y&&y.pause(),y=te({targets:"path",strokeDashoffset:{value:-730,duration:700,easing:"easeOutQuart"},strokeDasharray:{value:"530 1386",duration:700,easing:"easeOutQuart"}})}))}()}})();
//# sourceMappingURL=bundle.js.map