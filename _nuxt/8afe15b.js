(window.webpackJsonp=window.webpackJsonp||[]).push([[11,5,9],{341:function(t,e,n){"use strict";n.r(e),n.d(e,"getCategoryColor",(function(){return l}));n(219),n(20),n(31),n(220),n(221),n(222),n(223),n(224),n(225),n(226),n(227),n(228),n(229),n(230),n(231),n(232),n(37);var r=n(344),o=n.n(r),c=new Map([["basic","#BDBDBD"],["reactions","#FF8F00"],["sushi-bot","#D32F2F"],["tashibot","#9C27B0"],["dajare","#42A5F5"],["tahoiya","#1B5E20"],["mahjong","#F57F17"],["shogi","#5D4037"],["prime","#1565C0"],["achievements","#558B2F"],["manual","#424242"],["pocky","#176BEF"],["ricochet-robots","#BF360C"],["atcoder","#78909C"],["voiperrobot","#0097A7"],["ahokusa","#E57373"],["anime","#004D40"]]),l=function(t){return c.has(t)?c.get(t):o()({luminosity:"bright",seed:t})}},342:function(t,e,n){"use strict";n.r(e);var r={components:!0,props:["difficulty"]},o=n(66),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",["baby"===t.difficulty?n("span",{staticClass:"tag is-light"},[t._v("\n\t\tBaby\n\t")]):t._e(),t._v(" "),"easy"===t.difficulty?n("span",{staticClass:"tag is-success"},[t._v("\n\t\tEasy\n\t")]):t._e(),t._v(" "),"medium"===t.difficulty?n("span",{staticClass:"tag is-link"},[t._v("\n\t\tMedium\n\t")]):t._e(),t._v(" "),"hard"===t.difficulty?n("span",{staticClass:"tag is-warning"},[t._v("\n\t\tHard\n\t")]):t._e(),t._v(" "),"professional"===t.difficulty?n("span",{staticClass:"tag is-danger"},[t._v("\n\t\tPro\n\t")]):t._e()])}),[],!1,null,null,null);e.default=component.exports},343:function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},347:function(t,e,n){"use strict";n.r(e);n(52),n(40),n(41),n(67),n(47),n(68);var r=n(33),o=n(83);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={data:function(){return{url:""}},computed:l(l({},Object(o.c)({isUnauthorized:function(t){return t.slackInfos.isUnauthorized}})),{},{loginUrl:function(){var t="/?return_to=".concat(encodeURIComponent(this.url));return"https://slackbot-api.tsg.ne.jp/oauth2/start?rd=".concat(encodeURIComponent(t))}}),created:function(){this.url=location.href},components:!0},d=n(66),component=Object(d.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isUnauthorized?n("div",{staticClass:"notification is-danger"},[t._v("\n\tログインしていないためユーザー名などの情報は表示されません。あなたがTSGerである場合は"),n("a",{attrs:{href:t.loginUrl}},[t._v("こちら")]),t._v("からログインしてください。\n")]):t._e()}),[],!1,null,null,null);e.default=component.exports},499:function(t,e,n){var content=n(547);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(82).default)("de5b2dcc",content,!0,{sourceMap:!1})},546:function(t,e,n){"use strict";n(499)},547:function(t,e,n){var r=n(81)(!1);r.push([t.i,".achievements-count{white-space:nowrap}.achievements-progress{display:flex;align-items:center}.achievements-color{height:.3rem}.user-title{white-space:nowrap;overflow:hidden}.steps-segment>a{color:inherit}.tag.category-tag{color:#fff}",""]),t.exports=r},582:function(t,e,n){"use strict";n.r(e);n(52),n(40),n(41),n(67),n(47),n(68);var r=n(5),o=n(33),c=(n(32),n(53),n(233),n(48),n(57),n(20),n(31),n(37),n(341)),l=n(490),f=n.n(l),d=n(83);function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={data:function(){return{isLoading:!0}},computed:v(v({},Object(d.c)({userList:function(t){return t.users.list}})),{},{achievementDatum:function(){return this.$store.getters["achievementData/getById"](this.$route.params.id)},title:function(){return f()(this.achievementDatum,["title"],"")},condition:function(){return f()(this.achievementDatum,["condition"],"")},count:function(){return f()(this.achievementDatum,["count"],0)},counter:function(){return f()(this.achievementDatum,["counter"],null)},value:function(){return f()(this.achievementDatum,["value"],0)},difficulty:function(){return f()(this.achievementDatum,["difficulty"],"")},category:function(){return f()(this.achievementDatum,["category"],"")},users:function(){var t=this,e=this.$store.getters["achievements/getByName"](this.$route.params.id).map((function(e){var n=e.name,r=e.date,o=e.user;return{name:n,date:r,user:t.$store.getters["slackInfos/getUser"](o)}})).sort((function(a,b){return a.date-b.date})).map((function(t){return t.user}));return e},sortedUserList:function(){var t=this;return this.userList.slice().sort((function(a,b){return(b[t.counter]||0)-(a[t.counter]||0)})).map((function(e){return{info:t.$store.getters["slackInfos/getUser"](e.id),count:e[t.counter],id:e.id}}))},sameCounterAchievements:function(){return null===this.counter?[]:this.$store.getters["achievementData/getByCounter"](this.counter)},categoryColor:function(){return Object(c.getCategoryColor)(this.category)}}),fetch:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.store,e.next=4;break;case 4:case"end":return e.stop()}}),e)})))()},mounted:function(){var t=this;Promise.all([this.$store.dispatch("achievementData/initList"),this.$store.dispatch("achievements/fetchByName",this.$route.params.id),this.$store.dispatch("slackInfos/init"),this.$store.dispatch("users/initList")]).then((function(){t.isLoading=!1}))},methods:{getUserName:function(t){var e=f()(t,["profile","display_name"],!1)||f()(t,["real_name"],!1)||"匿名ユーザー";return"@".concat(e)},getUserIcon:function(t){return f()(t,["profile","image_24"],"/images/anonymous-icon_24.png")},getUserIcon2x:function(t){return f()(t,["profile","image_48"],"/images/anonymous-icon_48.png")},getUserIcon3x:function(t){return f()(t,["profile","image_72"],"/images/anonymous-icon_72.png")}},head:function(){return{title:"実績「".concat(this.title,"」 - achievement-viewer")}}},_=(n(546),n(66)),component=Object(_.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[t.isLoading?n("progress",{staticClass:"progress is-small is-primary",attrs:{max:"100"}},[t._v("15%")]):t._e(),t._v(" "),n("UnauthorizedNotification"),t._v(" "),n("div",{staticClass:"block"},[t._v("\n\t\tカテゴリ: "),n("nuxt-link",{staticClass:"category-tag tag is-medium",style:{backgroundColor:t.categoryColor},attrs:{to:"/categories/"+t.category}},[t._v(t._s(t.category))])],1),t._v(" "),n("div",{staticClass:"box"},[n("h1",{staticClass:"title is-size-1"},[t._v(t._s(t.title)),n("DifficultyBadge",{attrs:{difficulty:t.difficulty}})],1),t._v(" "),n("h2",{staticClass:"subtitle"},[t._v(t._s(t.condition))])]),t._v(" "),n("div",{staticClass:"block"},[t._v(t._s(t.count)+"人が解除済み")]),t._v(" "),n("div",{staticClass:"block"},t._l(t.users,(function(e){return n("nuxt-link",{key:e.id,attrs:{to:"/users/"+e.id}},[n("img",{attrs:{src:t.getUserIcon3x(e)}})])})),1),t._v(" "),null!==t.counter?n("div",[n("h1",{staticClass:"title is-3"},[t._v("上位/下位実績")]),t._v(" "),n("ul",{staticClass:"steps has-content-centered"},t._l(t.sameCounterAchievements,(function(e){return n("li",{key:e.id,staticClass:"steps-segment",class:{"is-active":e.id===t.$route.params.id}},[n("nuxt-link",{attrs:{to:"/achievements/"+e.id}},[n("span",{staticClass:"steps-marker"}),t._v(" "),n("div",{staticClass:"steps-content"},[n("p",{staticClass:"is-size-4"},[t._v(t._s(e.title))]),t._v(" "),n("p",{staticClass:"is-size-7"},[t._v(t._s(e.condition))]),t._v(" "),n("DifficultyBadge",{attrs:{difficulty:e.difficulty}})],1)])],1)})),0),t._v(" "),n("h1",{staticClass:"title is-3"},[t._v("実績の達成状況")]),t._v(" "),n("div",{staticClass:"table-container"},[n("table",{staticClass:"table"},[n("thead",[n("tr",[n("th",[t._v("ユーザー")]),t._v(" "),n("th",{style:{width:"100%"}},[t._v("達成状況")]),t._v(" "),n("th")])]),t._v(" "),n("tbody",t._l(t.sortedUserList,(function(e){return n("tr",{key:e.id},[n("td",{style:{whiteSpace:"nowrap",maxWidth:"15rem",textOverflow:"ellipsis",overflow:"hidden"}},[n("nuxt-link",{attrs:{to:"/users/"+e.id}},[n("img",{staticClass:"index-icon",attrs:{src:t.getUserIcon(e.info),srcset:t.getUserIcon(e.info)+" 1x, "+t.getUserIcon2x(e.info)+" 2x"}}),t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.getUserName(e.info))+"\n\t\t\t\t\t\t\t")])],1),t._v(" "),n("td",{style:{minWidth:"15rem"}},[n("progress",{staticClass:"progress is-success",class:(e.count||0)>=t.value?"is-success":"is-warning",attrs:{max:t.value},domProps:{value:e.count||0}})]),t._v(" "),n("td",{style:{whiteSpace:"nowrap"}},[t._v("\n\t\t\t\t\t\t\t"+t._s(e.count||0)+" / "+t._s(t.value)+"\n\t\t\t\t\t\t")])])})),0)])])]):t._e()],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{UnauthorizedNotification:n(347).default,DifficultyBadge:n(342).default})}}]);