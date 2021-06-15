(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{269:function(r,e,n){"use strict";n.r(e),n.d(e,"getCategoryColor",(function(){return l}));n(181),n(16),n(25),n(182),n(183),n(184),n(185),n(186),n(187),n(188),n(189),n(190),n(191),n(192),n(193),n(194),n(31);var t=n(271),o=n.n(t),c=new Map([["basic","#BDBDBD"],["reactions","#FF8F00"],["sushi-bot","#D32F2F"],["tashibot","#9C27B0"],["dajare","#42A5F5"],["tahoiya","#1B5E20"],["mahjong","#F57F17"],["shogi","#5D4037"],["prime","#1565C0"],["achievements","#558B2F"],["manual","#424242"],["pocky","#176BEF"],["ricochet-robots","#BF360C"],["atcoder","#78909C"],["voiperrobot","#0097A7"],["ahokusa","#E57373"],["anime","#004D40"]]),l=function(r){return c.has(r)?c.get(r):o()({luminosity:"bright",seed:r})}},270:function(r,e){r.exports=function(r){return r.webpackPolyfill||(r.deprecate=function(){},r.paths=[],r.children||(r.children=[]),Object.defineProperty(r,"loaded",{enumerable:!0,get:function(){return r.l}}),Object.defineProperty(r,"id",{enumerable:!0,get:function(){return r.i}}),r.webpackPolyfill=1),r}},271:function(r,e,n){(function(r){var n;n=function(){var r=null,e={};F();var n=[],t=function(e){if(void 0!==(e=e||{}).seed&&null!==e.seed&&e.seed===parseInt(e.seed,10))r=e.seed;else if("string"==typeof e.seed)r=B(e.seed);else{if(void 0!==e.seed&&null!==e.seed)throw new TypeError("The seed value must be an integer or string");r=null}var f,d;if(null!==e.count&&void 0!==e.count){for(var v=e.count,m=[],i=0;i<e.count;i++)n.push(!1);for(e.count=null;v>m.length;){var y=t(e);null!==r&&(e.seed=r),m.push(y)}return e.count=v,m}return h([f=o(e),d=c(f,e),l(f,d,e)],e)};function o(r){if(n.length>0){var e=y(c=C(r.hue)),t=(c[1]-c[0])/n.length,o=parseInt((e-c[0])/t);return!0===n[o]?o=(o+2)%n.length:n[o]=!0,(e=y(c=[(c[0]+o*t)%359,(c[0]+(o+1)*t)%359]))<0&&(e=360+e),e}var c;return(e=y(c=d(r.hue)))<0&&(e=360+e),e}function c(r,e){if("monochrome"===e.hue)return 0;if("random"===e.luminosity)return y([0,100]);var n=v(r),t=n[0],o=n[1];switch(e.luminosity){case"bright":t=55;break;case"dark":t=o-10;break;case"light":o=55}return y([t,o])}function l(r,e,n){var t=f(r,e),o=100;switch(n.luminosity){case"dark":o=t+20;break;case"light":t=(o+t)/2;break;case"random":t=0,o=100}return y([t,o])}function h(r,e){switch(e.format){case"hsvArray":return r;case"hslArray":return A(r);case"hsl":var n=A(r);return"hsl("+n[0]+", "+n[1]+"%, "+n[2]+"%)";case"hsla":var t=A(r),o=e.alpha||Math.random();return"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+o+")";case"rgbArray":return M(r);case"rgb":return"rgb("+M(r).join(", ")+")";case"rgba":var c=M(r);return o=e.alpha||Math.random(),"rgba("+c.join(", ")+", "+o+")";default:return w(r)}}function f(r,e){for(var n=m(r).lowerBounds,i=0;i<n.length-1;i++){var t=n[i][0],o=n[i][1],c=n[i+1][0],l=n[i+1][1];if(e>=t&&e<=c){var h=(l-o)/(c-t);return h*e+(o-h*t)}}return 0}function d(r){if("number"==typeof parseInt(r)){var n=parseInt(r);if(n<360&&n>0)return[n,n]}if("string"==typeof r)if(e[r]){var t=e[r];if(t.hueRange)return t.hueRange}else if(r.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)){var o=R(r)[0];return[o,o]}return[0,360]}function v(r){return m(r).saturationRange}function m(r){for(var n in r>=334&&r<=360&&(r-=360),e){var t=e[n];if(t.hueRange&&r>=t.hueRange[0]&&r<=t.hueRange[1])return e[n]}return"Color not found"}function y(e){if(null===r){var n=.618033988749895,t=Math.random();return t+=n,t%=1,Math.floor(e[0]+t*(e[1]+1-e[0]))}var o=e[1]||1,c=e[0]||0,l=(r=(9301*r+49297)%233280)/233280;return Math.floor(c+l*(o-c))}function w(r){var e=M(r);function n(r){var e=r.toString(16);return 1==e.length?"0"+e:e}return"#"+n(e[0])+n(e[1])+n(e[2])}function k(r,n,t){var o=t[0][0],c=t[t.length-1][0],l=t[t.length-1][1],h=t[0][1];e[r]={hueRange:n,lowerBounds:t,saturationRange:[o,c],brightnessRange:[l,h]}}function F(){k("monochrome",null,[[0,0],[100,0]]),k("red",[-26,18],[[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]),k("orange",[18,46],[[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]),k("yellow",[46,62],[[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]),k("green",[62,178],[[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]),k("blue",[178,257],[[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]),k("purple",[257,282],[[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]),k("pink",[282,334],[[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]])}function M(r){var e=r[0];0===e&&(e=1),360===e&&(e=359),e/=360;var s=r[1]/100,n=r[2]/100,t=Math.floor(6*e),o=6*e-t,p=n*(1-s),q=n*(1-o*s),c=n*(1-(1-o)*s),l=256,g=256,b=256;switch(t){case 0:l=n,g=c,b=p;break;case 1:l=q,g=n,b=p;break;case 2:l=p,g=n,b=c;break;case 3:l=p,g=q,b=n;break;case 4:l=c,g=p,b=n;break;case 5:l=n,g=p,b=q}return[Math.floor(255*l),Math.floor(255*g),Math.floor(255*b)]}function R(r){r=3===(r=r.replace(/^#/,"")).length?r.replace(/(.)/g,"$1$1"):r;var e=parseInt(r.substr(0,2),16)/255,n=parseInt(r.substr(2,2),16)/255,t=parseInt(r.substr(4,2),16)/255,o=Math.max(e,n,t),c=o-Math.min(e,n,t),l=o?c/o:0;switch(o){case e:return[(n-t)/c%6*60||0,l,o];case n:return[60*((t-e)/c+2)||0,l,o];case t:return[60*((e-n)/c+4)||0,l,o]}}function A(r){var e=r[0],s=r[1]/100,n=r[2]/100,t=(2-s)*n;return[e,Math.round(s*n/(t<1?t:2-t)*1e4)/100,t/2*100]}function B(r){for(var e=0,i=0;i!==r.length&&!(e>=Number.MAX_SAFE_INTEGER);i++)e+=r.charCodeAt(i);return e}function C(r){if(isNaN(r)){if("string"==typeof r)if(e[r]){var n=e[r];if(n.hueRange)return n.hueRange}else if(r.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i))return m(R(r)[0]).hueRange}else{var t=parseInt(r);if(t<360&&t>0)return m(r).hueRange}return[0,360]}return t}(),r&&r.exports&&(e=r.exports=n),e.randomColor=n}).call(this,n(270)(r))}}]);