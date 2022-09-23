(window.webpackJsonp=window.webpackJsonp||[]).push([[15,5,9],{341:function(t,e,r){"use strict";r.r(e),r.d(e,"getCategoryColor",(function(){return l}));r(219),r(20),r(31),r(220),r(221),r(222),r(223),r(224),r(225),r(226),r(227),r(228),r(229),r(230),r(231),r(232),r(37);var n=r(344),o=r.n(n),c=new Map([["basic","#BDBDBD"],["reactions","#FF8F00"],["sushi-bot","#D32F2F"],["tashibot","#9C27B0"],["dajare","#42A5F5"],["tahoiya","#1B5E20"],["mahjong","#F57F17"],["shogi","#5D4037"],["prime","#1565C0"],["achievements","#558B2F"],["manual","#424242"],["pocky","#176BEF"],["ricochet-robots","#BF360C"],["atcoder","#78909C"],["voiperrobot","#0097A7"],["ahokusa","#E57373"],["anime","#004D40"]]),l=function(t){return c.has(t)?c.get(t):o()({luminosity:"bright",seed:t})}},342:function(t,e,r){"use strict";r.r(e);var n={components:!0,props:["difficulty"]},o=r(66),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("span",["baby"===t.difficulty?r("span",{staticClass:"tag is-light"},[t._v("\n\t\tBaby\n\t")]):t._e(),t._v(" "),"easy"===t.difficulty?r("span",{staticClass:"tag is-success"},[t._v("\n\t\tEasy\n\t")]):t._e(),t._v(" "),"medium"===t.difficulty?r("span",{staticClass:"tag is-link"},[t._v("\n\t\tMedium\n\t")]):t._e(),t._v(" "),"hard"===t.difficulty?r("span",{staticClass:"tag is-warning"},[t._v("\n\t\tHard\n\t")]):t._e(),t._v(" "),"professional"===t.difficulty?r("span",{staticClass:"tag is-danger"},[t._v("\n\t\tPro\n\t")]):t._e()])}),[],!1,null,null,null);e.default=component.exports},343:function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},346:function(t,e,r){var n=r(10);t.exports=function(t){return n(Set.prototype.values,t)}},347:function(t,e,r){"use strict";r.r(e);r(52),r(40),r(41),r(67),r(47),r(68);var n=r(33),o=r(83);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={data:function(){return{url:""}},computed:l(l({},Object(o.c)({isUnauthorized:function(t){return t.slackInfos.isUnauthorized}})),{},{loginUrl:function(){var t="/?return_to=".concat(encodeURIComponent(this.url));return"https://slackbot-api.tsg.ne.jp/oauth2/start?rd=".concat(encodeURIComponent(t))}}),created:function(){this.url=location.href},components:!0},d=r(66),component=Object(d.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.isUnauthorized?r("div",{staticClass:"notification is-danger"},[t._v("\n\tログインしていないためユーザー名などの情報は表示されません。あなたがTSGerである場合は"),r("a",{attrs:{href:t.loginUrl}},[t._v("こちら")]),t._v("からログインしてください。\n")]):t._e()}),[],!1,null,null,null);e.default=component.exports},500:function(t,e,r){var content=r(572);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(82).default)("381a161e",content,!0,{sourceMap:!1})},548:function(t,e,r){var n=r(4),o=r(234).values;n({target:"Object",stat:!0},{values:function(t){return o(t)}})},549:function(t,e,r){r(550)},550:function(t,e,r){"use strict";r(236)("Set",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),r(237))},551:function(t,e,r){"use strict";r(4)({target:"Set",proto:!0,real:!0,forced:!0},{addAll:r(552)})},552:function(t,e,r){"use strict";var n=r(10),o=r(24),c=r(8);t.exports=function(){for(var t=c(this),e=o(t.add),r=0,l=arguments.length;r<l;r++)n(e,t,arguments[r]);return t}},553:function(t,e,r){"use strict";r(4)({target:"Set",proto:!0,real:!0,forced:!0},{deleteAll:r(238)})},554:function(t,e,r){"use strict";var n=r(4),o=r(25),c=r(10),l=r(24),f=r(8),d=r(69),v=r(23);n({target:"Set",proto:!0,real:!0,forced:!0},{difference:function(t){var e=f(this),r=new(d(e,o("Set")))(e),n=l(r.delete);return v(t,(function(t){c(n,r,t)})),r}})},555:function(t,e,r){"use strict";var n=r(4),o=r(8),c=r(26),l=r(346),f=r(23);n({target:"Set",proto:!0,real:!0,forced:!0},{every:function(t){var e=o(this),r=l(e),n=c(t,arguments.length>1?arguments[1]:void 0);return!f(r,(function(t,r){if(!n(t,t,e))return r()}),{IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}})},556:function(t,e,r){"use strict";var n=r(4),o=r(25),c=r(10),l=r(24),f=r(8),d=r(26),v=r(69),h=r(346),m=r(23);n({target:"Set",proto:!0,real:!0,forced:!0},{filter:function(t){var e=f(this),r=h(e),n=d(t,arguments.length>1?arguments[1]:void 0),y=new(v(e,o("Set"))),_=l(y.add);return m(r,(function(t){n(t,t,e)&&c(_,y,t)}),{IS_ITERATOR:!0}),y}})},557:function(t,e,r){"use strict";var n=r(4),o=r(8),c=r(26),l=r(346),f=r(23);n({target:"Set",proto:!0,real:!0,forced:!0},{find:function(t){var e=o(this),r=l(e),n=c(t,arguments.length>1?arguments[1]:void 0);return f(r,(function(t,r){if(n(t,t,e))return r(t)}),{IS_ITERATOR:!0,INTERRUPTED:!0}).result}})},558:function(t,e,r){"use strict";var n=r(4),o=r(25),c=r(10),l=r(24),f=r(8),d=r(69),v=r(23);n({target:"Set",proto:!0,real:!0,forced:!0},{intersection:function(t){var e=f(this),r=new(d(e,o("Set"))),n=l(e.has),h=l(r.add);return v(t,(function(t){c(n,e,t)&&c(h,r,t)})),r}})},559:function(t,e,r){"use strict";var n=r(4),o=r(10),c=r(24),l=r(8),f=r(23);n({target:"Set",proto:!0,real:!0,forced:!0},{isDisjointFrom:function(t){var e=l(this),r=c(e.has);return!f(t,(function(t,n){if(!0===o(r,e,t))return n()}),{INTERRUPTED:!0}).stopped}})},560:function(t,e,r){"use strict";var n=r(4),o=r(25),c=r(10),l=r(24),f=r(11),d=r(8),v=r(130),h=r(23);n({target:"Set",proto:!0,real:!0,forced:!0},{isSubsetOf:function(t){var e=v(this),r=d(t),n=r.has;return f(n)||(r=new(o("Set"))(t),n=l(r.has)),!h(e,(function(t,e){if(!1===c(n,r,t))return e()}),{IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}})},561:function(t,e,r){"use strict";var n=r(4),o=r(10),c=r(24),l=r(8),f=r(23);n({target:"Set",proto:!0,real:!0,forced:!0},{isSupersetOf:function(t){var e=l(this),r=c(e.has);return!f(t,(function(t,n){if(!1===o(r,e,t))return n()}),{INTERRUPTED:!0}).stopped}})},562:function(t,e,r){"use strict";var n=r(4),o=r(6),c=r(8),l=r(16),f=r(346),d=r(23),v=o([].join),h=[].push;n({target:"Set",proto:!0,real:!0,forced:!0},{join:function(t){var e=c(this),r=f(e),n=void 0===t?",":l(t),o=[];return d(r,h,{that:o,IS_ITERATOR:!0}),v(o,n)}})},563:function(t,e,r){"use strict";var n=r(4),o=r(25),c=r(26),l=r(10),f=r(24),d=r(8),v=r(69),h=r(346),m=r(23);n({target:"Set",proto:!0,real:!0,forced:!0},{map:function(t){var e=d(this),r=h(e),n=c(t,arguments.length>1?arguments[1]:void 0),y=new(v(e,o("Set"))),_=f(y.add);return m(r,(function(t){l(_,y,n(t,t,e))}),{IS_ITERATOR:!0}),y}})},564:function(t,e,r){"use strict";var n=r(4),o=r(24),c=r(8),l=r(346),f=r(23),d=TypeError;n({target:"Set",proto:!0,real:!0,forced:!0},{reduce:function(t){var e=c(this),r=l(e),n=arguments.length<2,v=n?void 0:arguments[1];if(o(t),f(r,(function(r){n?(n=!1,v=r):v=t(v,r,r,e)}),{IS_ITERATOR:!0}),n)throw d("Reduce of empty set with no initial value");return v}})},565:function(t,e,r){"use strict";var n=r(4),o=r(8),c=r(26),l=r(346),f=r(23);n({target:"Set",proto:!0,real:!0,forced:!0},{some:function(t){var e=o(this),r=l(e),n=c(t,arguments.length>1?arguments[1]:void 0);return f(r,(function(t,r){if(n(t,t,e))return r()}),{IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}})},566:function(t,e,r){"use strict";var n=r(4),o=r(25),c=r(10),l=r(24),f=r(8),d=r(69),v=r(23);n({target:"Set",proto:!0,real:!0,forced:!0},{symmetricDifference:function(t){var e=f(this),r=new(d(e,o("Set")))(e),n=l(r.delete),h=l(r.add);return v(t,(function(t){c(n,r,t)||c(h,r,t)})),r}})},567:function(t,e,r){"use strict";var n=r(4),o=r(25),c=r(24),l=r(8),f=r(69),d=r(23);n({target:"Set",proto:!0,real:!0,forced:!0},{union:function(t){var e=l(this),r=new(f(e,o("Set")))(e);return d(t,c(r.add),{that:r}),r}})},568:function(t,e,r){var n=r(569),o=r(570);t.exports=function(t){return t&&t.length?n(t,o):0}},569:function(t,e){t.exports=function(t,e){for(var r,n=-1,o=t.length;++n<o;){var c=e(t[n]);void 0!==c&&(r=void 0===r?c:r+c)}return r}},570:function(t,e){t.exports=function(t){return t}},571:function(t,e,r){"use strict";r(500)},572:function(t,e,r){var n=r(81)(!1);n.push([t.i,".achievements-count{white-space:nowrap}.achievements-progress{display:flex;align-items:center}.achievements-color{height:.3rem}.user-title{white-space:nowrap;overflow:hidden}",""]),t.exports=n},584:function(t,e,r){"use strict";r.r(e);r(52),r(40),r(67),r(47),r(68);var n=r(5),o=r(33),c=(r(32),r(548),r(233),r(53),r(48),r(20),r(549),r(31),r(551),r(553),r(554),r(555),r(556),r(557),r(558),r(559),r(560),r(561),r(562),r(563),r(564),r(565),r(566),r(567),r(37),r(41),r(71),r(157),r(101),r(341)),l=r(490),f=r.n(l),d=r(568),v=r.n(d),h=r(83);r(342);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function y(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var _={data:function(){return{isLoading:!0}},computed:y(y({},Object(h.c)({achievementData:function(t){return t.achievementData.list}})),{},{user:function(){return this.$store.getters["users/getById"](this.$route.params.id)},slackUser:function(){return this.$store.getters["slackInfos/getUser"](this.$route.params.id)},achievementCount:function(){return v()(Object.values(this.user.counts||{}))},name:function(){var t=f()(this.slackUser,["profile","display_name"],!1)||f()(this.slackUser,["real_name"],!1)||"匿名ユーザー";return"@".concat(t)},achievements:function(){var t=this;return this.$store.getters["achievements/getByUser"](this.$route.params.id).map((function(e){var r=e.name;return{name:r,date:e.date,datum:t.$store.getters["achievementData/getById"](r)}})).sort((function(a,b){return a.datum.difficulty&&b.datum.difficulty?t.getDifficultyRank(b.datum.difficulty)-t.getDifficultyRank(a.datum.difficulty):0}))},lockedAchievements:function(){var t=new Set(this.$store.getters["achievements/getByUser"](this.$route.params.id).map((function(t){return t.name})));return this.achievementData.filter((function(e){var r=e.id;return!t.has(r)})).sort((function(a,b){return a.category&&b.category?a.category.localeCompare(b.category):0}))},icon:function(){return f()(this.slackUser,["profile","image_72"],"/images/anonymous-icon_72.png")},icon2x:function(){return f()(this.slackUser,["profile","image_192"],"/images/anonymous-icon_192.png")}}),fetch:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.store,e.next=4;break;case 4:case"end":return e.stop()}}),e)})))()},mounted:function(){var t=this;Promise.all([this.$store.dispatch("achievementData/initList"),this.$store.dispatch("slackInfos/init"),this.$store.dispatch("users/bindById",this.$route.params.id),this.$store.dispatch("users/initList")]).then((function(){t.isLoading=!1}))},methods:{getCategoryColor:function(t){return Object(c.getCategoryColor)(t)},getDifficultyRank:function(t){return{baby:1,easy:2,medium:3,hard:4,professional:5}[t]||0},getDateString:function(t){return new Date(1e3*t.seconds).toISOString().split("T")[0]},getDateStringJa:function(t){var e=new Date(1e3*t.seconds);return"".concat(e.getFullYear(),"年").concat(e.getMonth()+1,"月").concat(e.getDate(),"日")}},head:function(){return{title:"".concat(this.name,"の解除した実績一覧 - achievement-viewer")}}},C=(r(571),r(66)),component=Object(C.a)(_,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[t.isLoading?r("progress",{staticClass:"progress is-small is-primary",attrs:{max:"100"}},[t._v("15%")]):t._e(),t._v(" "),r("UnauthorizedNotification"),t._v(" "),r("div",{staticClass:"columns has-text-centered"},[r("div",{staticClass:"column is-narrow"},[r("img",{attrs:{src:t.icon,srcset:t.icon+" 1x, "+t.icon2x+" 2x"}})]),t._v(" "),r("div",{staticClass:"column"},[r("p",{staticClass:"title user-title"},[t._v(t._s(t.name)+"の"),r("wbr"),t._v("解除した"),r("wbr"),t._v("実績一覧")])])]),t._v(" "),r("div",{staticClass:"columns is-multiline"},t._l(t.achievements,(function(e){var n=e.datum,o=e.name,c=e.date;return r("div",{key:o,staticClass:"column is-one-third"},[r("nuxt-link",{staticClass:"card",style:{display:"block"},attrs:{to:"/achievements/"+o}},[r("div",{staticClass:"card-image"},[r("div",{staticClass:"image achievements-color",style:{backgroundColor:t.getCategoryColor(n.category)}})]),t._v(" "),r("div",{staticClass:"card-content"},[r("div",{staticClass:"content"},[r("p",{staticClass:"title"},[t._v("\n\t\t\t\t\t\t\t"+t._s(n.title)+"\n\t\t\t\t\t\t\t"),r("DifficultyBadge",{attrs:{difficulty:n.difficulty}})],1),t._v(" "),n.counter?r("div",{staticClass:"columns"},[r("div",{staticClass:"column achievements-progress"},[r("progress",{staticClass:"progress is-success",attrs:{max:n.value},domProps:{value:t.user[n.counter]||0}})]),t._v(" "),r("div",{staticClass:"column is-narrow"},[r("p",{staticClass:"subtitle is-6 achievements-count"},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(n.value)+"/"+t._s(n.value)+"\n\t\t\t\t\t\t\t\t")])])]):t._e(),t._v(" "),r("p",[t._v(t._s(n.condition))]),t._v(" "),r("p",{staticClass:"has-text-right is-size-7"},[r("time",{attrs:{datetime:t.getDateString(c)}},[t._v(t._s(t.getDateStringJa(c)))])])])])])],1)})),0),t._v(" "),r("p",{staticClass:"title"},[t._v("未解除の実績一覧")]),t._v(" "),r("div",{staticClass:"columns is-multiline"},t._l(t.lockedAchievements,(function(e){return r("div",{key:e.id,staticClass:"column is-one-third"},[r("nuxt-link",{staticClass:"card",style:{display:"block"},attrs:{to:"/achievements/"+e.id}},[r("div",{staticClass:"card-image"},[r("div",{staticClass:"image achievements-color",style:{backgroundColor:t.getCategoryColor(e.category)}})]),t._v(" "),r("div",{staticClass:"card-content"},[r("div",{staticClass:"content"},[r("p",{staticClass:"title"},[t._v("\n\t\t\t\t\t\t\t??????\n\t\t\t\t\t\t\t"),r("DifficultyBadge",{attrs:{difficulty:e.difficulty}})],1),t._v(" "),e.counter?r("div",{staticClass:"columns"},[r("div",{staticClass:"column achievements-progress"},[r("progress",{staticClass:"progress is-gray",attrs:{max:e.value},domProps:{value:t.user[e.counter]||0}})]),t._v(" "),r("div",{staticClass:"column is-narrow"},[r("p",{staticClass:"subtitle is-6 achievements-count"},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(t.user[e.counter]||0)+"/"+t._s(e.value)+"\n\t\t\t\t\t\t\t\t")])])]):t._e(),t._v(" "),r("p",[t._v(t._s(e.condition))])])])])],1)})),0)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{UnauthorizedNotification:r(347).default,DifficultyBadge:r(342).default})}}]);