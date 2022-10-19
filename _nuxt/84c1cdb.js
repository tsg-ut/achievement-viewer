(window.webpackJsonp=window.webpackJsonp||[]).push([[16,6,7,13],{347:function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},348:function(t,e,n){"use strict";n.r(e),n.d(e,"getCategoryColor",(function(){return l}));n(222),n(20),n(32),n(223),n(224),n(225),n(226),n(227),n(228),n(229),n(230),n(231),n(232),n(233),n(234),n(235),n(37);var r=n(349),o=n.n(r),c=new Map([["basic","#BDBDBD"],["reactions","#FF8F00"],["sushi-bot","#D32F2F"],["tashibot","#9C27B0"],["dajare","#42A5F5"],["tahoiya","#1B5E20"],["mahjong","#F57F17"],["shogi","#5D4037"],["prime","#1565C0"],["achievements","#558B2F"],["manual","#424242"],["pocky","#176BEF"],["ricochet-robots","#BF360C"],["atcoder","#78909C"],["voiperrobot","#0097A7"],["ahokusa","#E57373"],["anime","#004D40"]]),l=function(t){return c.has(t)?c.get(t):o()({luminosity:"bright",seed:t})}},349:function(t,e,n){(function(t){var n;n=function(){var t=null,e={};w();var n=[],r=function(e){if(void 0!==(e=e||{}).seed&&null!==e.seed&&e.seed===parseInt(e.seed,10))t=e.seed;else if("string"==typeof e.seed)t=M(e.seed);else{if(void 0!==e.seed&&null!==e.seed)throw new TypeError("The seed value must be an integer or string");t=null}var h,v;if(null!==e.count&&void 0!==e.count){for(var d=e.count,m=[],i=0;i<e.count;i++)n.push(!1);for(e.count=null;d>m.length;){var y=r(e);null!==t&&(e.seed=t),m.push(y)}return e.count=d,m}return f([h=o(e),v=c(h,e),l(h,v,e)],e)};function o(t){if(n.length>0){var e=y(c=x(t.hue)),r=(c[1]-c[0])/n.length,o=parseInt((e-c[0])/r);return!0===n[o]?o=(o+2)%n.length:n[o]=!0,(e=y(c=[(c[0]+o*r)%359,(c[0]+(o+1)*r)%359]))<0&&(e=360+e),e}var c;return(e=y(c=v(t.hue)))<0&&(e=360+e),e}function c(t,e){if("monochrome"===e.hue)return 0;if("random"===e.luminosity)return y([0,100]);var n=d(t),r=n[0],o=n[1];switch(e.luminosity){case"bright":r=55;break;case"dark":r=o-10;break;case"light":o=55}return y([r,o])}function l(t,e,n){var r=h(t,e),o=100;switch(n.luminosity){case"dark":o=r+20;break;case"light":r=(o+r)/2;break;case"random":r=0,o=100}return y([r,o])}function f(t,e){switch(e.format){case"hsvArray":return t;case"hslArray":return j(t);case"hsl":var n=j(t);return"hsl("+n[0]+", "+n[1]+"%, "+n[2]+"%)";case"hsla":var r=j(t),o=e.alpha||Math.random();return"hsla("+r[0]+", "+r[1]+"%, "+r[2]+"%, "+o+")";case"rgbArray":return k(t);case"rgb":return"rgb("+k(t).join(", ")+")";case"rgba":var c=k(t);return o=e.alpha||Math.random(),"rgba("+c.join(", ")+", "+o+")";default:return C(t)}}function h(t,e){for(var n=m(t).lowerBounds,i=0;i<n.length-1;i++){var r=n[i][0],o=n[i][1],c=n[i+1][0],l=n[i+1][1];if(e>=r&&e<=c){var f=(l-o)/(c-r);return f*e+(o-f*r)}}return 0}function v(t){if("number"==typeof parseInt(t)){var n=parseInt(t);if(n<360&&n>0)return[n,n]}if("string"==typeof t)if(e[t]){var r=e[t];if(r.hueRange)return r.hueRange}else if(t.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)){var o=O(t)[0];return[o,o]}return[0,360]}function d(t){return m(t).saturationRange}function m(t){for(var n in t>=334&&t<=360&&(t-=360),e){var r=e[n];if(r.hueRange&&t>=r.hueRange[0]&&t<=r.hueRange[1])return e[n]}return"Color not found"}function y(e){if(null===t){var n=.618033988749895,r=Math.random();return r+=n,r%=1,Math.floor(e[0]+r*(e[1]+1-e[0]))}var o=e[1]||1,c=e[0]||0,l=(t=(9301*t+49297)%233280)/233280;return Math.floor(c+l*(o-c))}function C(t){var e=k(t);function n(t){var e=t.toString(16);return 1==e.length?"0"+e:e}return"#"+n(e[0])+n(e[1])+n(e[2])}function _(t,n,r){var o=r[0][0],c=r[r.length-1][0],l=r[r.length-1][1],f=r[0][1];e[t]={hueRange:n,lowerBounds:r,saturationRange:[o,c],brightnessRange:[l,f]}}function w(){_("monochrome",null,[[0,0],[100,0]]),_("red",[-26,18],[[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]),_("orange",[18,46],[[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]),_("yellow",[46,62],[[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]),_("green",[62,178],[[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]),_("blue",[178,257],[[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]),_("purple",[257,282],[[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]),_("pink",[282,334],[[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]])}function k(t){var e=t[0];0===e&&(e=1),360===e&&(e=359),e/=360;var s=t[1]/100,n=t[2]/100,r=Math.floor(6*e),o=6*e-r,p=n*(1-s),q=n*(1-o*s),c=n*(1-(1-o)*s),l=256,g=256,b=256;switch(r){case 0:l=n,g=c,b=p;break;case 1:l=q,g=n,b=p;break;case 2:l=p,g=n,b=c;break;case 3:l=p,g=q,b=n;break;case 4:l=c,g=p,b=n;break;case 5:l=n,g=p,b=q}return[Math.floor(255*l),Math.floor(255*g),Math.floor(255*b)]}function O(t){t=3===(t=t.replace(/^#/,"")).length?t.replace(/(.)/g,"$1$1"):t;var e=parseInt(t.substr(0,2),16)/255,n=parseInt(t.substr(2,2),16)/255,r=parseInt(t.substr(4,2),16)/255,o=Math.max(e,n,r),c=o-Math.min(e,n,r),l=o?c/o:0;switch(o){case e:return[(n-r)/c%6*60||0,l,o];case n:return[60*((r-e)/c+2)||0,l,o];case r:return[60*((e-n)/c+4)||0,l,o]}}function j(t){var e=t[0],s=t[1]/100,n=t[2]/100,r=(2-s)*n;return[e,Math.round(s*n/(r<1?r:2-r)*1e4)/100,r/2*100]}function M(t){for(var e=0,i=0;i!==t.length&&!(e>=Number.MAX_SAFE_INTEGER);i++)e+=t.charCodeAt(i);return e}function x(t){if(isNaN(t)){if("string"==typeof t)if(e[t]){var n=e[t];if(n.hueRange)return n.hueRange}else if(t.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i))return m(O(t)[0]).hueRange}else{var r=parseInt(t);if(r<360&&r>0)return m(t).hueRange}return[0,360]}return r}(),t&&t.exports&&(e=t.exports=n),e.randomColor=n}).call(this,n(347)(t))},350:function(t,e,n){"use strict";n.r(e);var r={components:!0,props:["difficulty"]},o=n(66),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",["baby"===t.difficulty?n("span",{staticClass:"tag is-light"},[t._v("\n\t\tBaby\n\t")]):t._e(),t._v(" "),"easy"===t.difficulty?n("span",{staticClass:"tag is-success"},[t._v("\n\t\tEasy\n\t")]):t._e(),t._v(" "),"medium"===t.difficulty?n("span",{staticClass:"tag is-link"},[t._v("\n\t\tMedium\n\t")]):t._e(),t._v(" "),"hard"===t.difficulty?n("span",{staticClass:"tag is-warning"},[t._v("\n\t\tHard\n\t")]):t._e(),t._v(" "),"professional"===t.difficulty?n("span",{staticClass:"tag is-danger"},[t._v("\n\t\tPro\n\t")]):t._e()])}),[],!1,null,null,null);e.default=component.exports},354:function(t,e,n){var content=n(495);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(70).default)("43676270",content,!0,{sourceMap:!1})},494:function(t,e,n){"use strict";n(354)},495:function(t,e,n){var r=n(69)(!1);r.push([t.i,".achievements-count{white-space:nowrap}.achievements-progress{display:flex;align-items:center}.achievements-color{height:.3rem}",""]),t.exports=r},509:function(t,e,n){"use strict";n.r(e);var r=n(348),o={components:!0,props:["achievement","countMax"],methods:{getCategoryColor:function(t){return Object(r.getCategoryColor)(t)}}},c=(n(494),n(66)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nuxt-link",{staticClass:"card",style:{display:"block"},attrs:{to:"/achievements/"+t.achievement.id}},[n("div",{staticClass:"card-image"},[n("div",{staticClass:"image achievements-color",style:{backgroundColor:t.getCategoryColor(t.achievement.category)}})]),t._v(" "),n("div",{staticClass:"card-content"},[n("div",{staticClass:"content"},[n("p",{staticClass:"title"},[t._v("\n\t\t\t\t"+t._s(t.achievement.title)+"\n\t\t\t\t"),n("DifficultyBadge",{attrs:{difficulty:t.achievement.difficulty}})],1),t._v(" "),n("div",{staticClass:"columns"},[n("div",{staticClass:"column achievements-progress"},[n("progress",{staticClass:"progress is-danger",attrs:{max:t.countMax},domProps:{value:t.achievement.count||0}})]),t._v(" "),n("div",{staticClass:"column is-narrow"},[n("p",{staticClass:"subtitle is-6 achievements-count"},[n("strong",[t._v(t._s(t.achievement.count||0)+"人")]),t._v("が"),n("wbr"),t._v("解除済み")])])]),t._v(" "),n("p",[t._v(t._s(t.achievement.condition))])])])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{DifficultyBadge:n(350).default})},696:function(t,e,n){"use strict";n.r(e);n(53),n(40),n(41),n(67),n(47),n(68);var r=n(33),o=n(5),c=(n(57),n(236),n(20),n(32),n(37),n(29),n(84));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var h={data:function(){return{isLoading:!0}},fetch:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.store,e.next=4;break;case 4:case"end":return e.stop()}}),e)})))()},head:function(){return{title:"実績一覧 - achievement-viewer"}},computed:f(f({},Object(c.c)({achievementData:function(t){return t.achievementData.list}})),{},{ranking:function(){var t=this.achievementData.slice();return t.sort((function(a,b){return(b.count||0)-(a.count||0)})),t}}),mounted:function(){var t=this;Promise.all([this.$store.dispatch("achievementData/initList"),this.$store.dispatch("users/initList")]).then((function(){t.isLoading=!1}))}},v=n(66),component=Object(v.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[t.isLoading?n("progress",{staticClass:"progress is-small is-primary",attrs:{max:"100"}}):t._e(),t._v(" "),n("p",{staticClass:"title"},[t._v("実績一覧")]),t._v(" "),n("div",{staticClass:"columns is-multiline"},t._l(t.ranking,(function(e){return n("div",{key:e.id,staticClass:"column is-half"},[n("AchievementCard",{attrs:{achievement:e,"count-max":t.ranking[0].count}})],1)})),0)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{AchievementCard:n(509).default})}}]);