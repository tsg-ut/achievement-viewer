(window.webpackJsonp=window.webpackJsonp||[]).push([[14,5,7,8,9],{269:function(t,e,n){"use strict";n.r(e),n.d(e,"getCategoryColor",(function(){return l}));n(181),n(16),n(25),n(182),n(183),n(184),n(185),n(186),n(187),n(188),n(189),n(190),n(191),n(192),n(193),n(194),n(31);var r=n(271),c=n.n(r),o=new Map([["basic","#BDBDBD"],["reactions","#FF8F00"],["sushi-bot","#D32F2F"],["tashibot","#9C27B0"],["dajare","#42A5F5"],["tahoiya","#1B5E20"],["mahjong","#F57F17"],["shogi","#5D4037"],["prime","#1565C0"],["achievements","#558B2F"],["manual","#424242"],["pocky","#176BEF"],["ricochet-robots","#BF360C"],["atcoder","#78909C"],["voiperrobot","#0097A7"],["ahokusa","#E57373"],["anime","#004D40"]]),l=function(t){return o.has(t)?o.get(t):c()({luminosity:"bright",seed:t})}},274:function(t,e,n){"use strict";n.r(e);n(46),n(35),n(36),n(60),n(41),n(61);var r=n(28),c=n(69);function o(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={data:function(){return{url:""}},computed:l(l({},Object(c.c)({isUnauthorized:function(t){return t.slackInfos.isUnauthorized}})),{},{loginUrl:function(){return"https://slackbot-api.tsg.ne.jp/?return_to=".concat(encodeURIComponent(this.url))}}),created:function(){this.url=location.href},components:!0},d=n(59),component=Object(d.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isUnauthorized?n("div",{staticClass:"notification is-danger"},[t._v("\n\tログインしていないためユーザー名などの情報は表示されません。あなたがTSGerである場合は"),n("a",{attrs:{href:t.loginUrl}},[t._v("こちら")]),t._v("からログインしてください。\n")]):t._e()}),[],!1,null,null,null);e.default=component.exports},275:function(t,e,n){"use strict";n.r(e);var r={components:!0,props:["difficulty"]},c=n(59),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",["baby"===t.difficulty?n("span",{staticClass:"tag is-light"},[t._v("\n\t\tBaby\n\t")]):t._e(),t._v(" "),"easy"===t.difficulty?n("span",{staticClass:"tag is-success"},[t._v("\n\t\tEasy\n\t")]):t._e(),t._v(" "),"medium"===t.difficulty?n("span",{staticClass:"tag is-link"},[t._v("\n\t\tMedium\n\t")]):t._e(),t._v(" "),"hard"===t.difficulty?n("span",{staticClass:"tag is-warning"},[t._v("\n\t\tHard\n\t")]):t._e(),t._v(" "),"professional"===t.difficulty?n("span",{staticClass:"tag is-danger"},[t._v("\n\t\tPro\n\t")]):t._e()])}),[],!1,null,null,null);e.default=component.exports},423:function(t,e,n){var map={"./af":276,"./af.js":276,"./ar":277,"./ar-dz":278,"./ar-dz.js":278,"./ar-kw":279,"./ar-kw.js":279,"./ar-ly":280,"./ar-ly.js":280,"./ar-ma":281,"./ar-ma.js":281,"./ar-sa":282,"./ar-sa.js":282,"./ar-tn":283,"./ar-tn.js":283,"./ar.js":277,"./az":284,"./az.js":284,"./be":285,"./be.js":285,"./bg":286,"./bg.js":286,"./bm":287,"./bm.js":287,"./bn":288,"./bn-bd":289,"./bn-bd.js":289,"./bn.js":288,"./bo":290,"./bo.js":290,"./br":291,"./br.js":291,"./bs":292,"./bs.js":292,"./ca":293,"./ca.js":293,"./cs":294,"./cs.js":294,"./cv":295,"./cv.js":295,"./cy":296,"./cy.js":296,"./da":297,"./da.js":297,"./de":298,"./de-at":299,"./de-at.js":299,"./de-ch":300,"./de-ch.js":300,"./de.js":298,"./dv":301,"./dv.js":301,"./el":302,"./el.js":302,"./en-au":303,"./en-au.js":303,"./en-ca":304,"./en-ca.js":304,"./en-gb":305,"./en-gb.js":305,"./en-ie":306,"./en-ie.js":306,"./en-il":307,"./en-il.js":307,"./en-in":308,"./en-in.js":308,"./en-nz":309,"./en-nz.js":309,"./en-sg":310,"./en-sg.js":310,"./eo":311,"./eo.js":311,"./es":312,"./es-do":313,"./es-do.js":313,"./es-mx":314,"./es-mx.js":314,"./es-us":315,"./es-us.js":315,"./es.js":312,"./et":316,"./et.js":316,"./eu":317,"./eu.js":317,"./fa":318,"./fa.js":318,"./fi":319,"./fi.js":319,"./fil":320,"./fil.js":320,"./fo":321,"./fo.js":321,"./fr":322,"./fr-ca":323,"./fr-ca.js":323,"./fr-ch":324,"./fr-ch.js":324,"./fr.js":322,"./fy":325,"./fy.js":325,"./ga":326,"./ga.js":326,"./gd":327,"./gd.js":327,"./gl":328,"./gl.js":328,"./gom-deva":329,"./gom-deva.js":329,"./gom-latn":330,"./gom-latn.js":330,"./gu":331,"./gu.js":331,"./he":332,"./he.js":332,"./hi":333,"./hi.js":333,"./hr":334,"./hr.js":334,"./hu":335,"./hu.js":335,"./hy-am":336,"./hy-am.js":336,"./id":337,"./id.js":337,"./is":338,"./is.js":338,"./it":339,"./it-ch":340,"./it-ch.js":340,"./it.js":339,"./ja":341,"./ja.js":341,"./jv":342,"./jv.js":342,"./ka":343,"./ka.js":343,"./kk":344,"./kk.js":344,"./km":345,"./km.js":345,"./kn":346,"./kn.js":346,"./ko":347,"./ko.js":347,"./ku":348,"./ku.js":348,"./ky":349,"./ky.js":349,"./lb":350,"./lb.js":350,"./lo":351,"./lo.js":351,"./lt":352,"./lt.js":352,"./lv":353,"./lv.js":353,"./me":354,"./me.js":354,"./mi":355,"./mi.js":355,"./mk":356,"./mk.js":356,"./ml":357,"./ml.js":357,"./mn":358,"./mn.js":358,"./mr":359,"./mr.js":359,"./ms":360,"./ms-my":361,"./ms-my.js":361,"./ms.js":360,"./mt":362,"./mt.js":362,"./my":363,"./my.js":363,"./nb":364,"./nb.js":364,"./ne":365,"./ne.js":365,"./nl":366,"./nl-be":367,"./nl-be.js":367,"./nl.js":366,"./nn":368,"./nn.js":368,"./oc-lnc":369,"./oc-lnc.js":369,"./pa-in":370,"./pa-in.js":370,"./pl":371,"./pl.js":371,"./pt":372,"./pt-br":373,"./pt-br.js":373,"./pt.js":372,"./ro":374,"./ro.js":374,"./ru":375,"./ru.js":375,"./sd":376,"./sd.js":376,"./se":377,"./se.js":377,"./si":378,"./si.js":378,"./sk":379,"./sk.js":379,"./sl":380,"./sl.js":380,"./sq":381,"./sq.js":381,"./sr":382,"./sr-cyrl":383,"./sr-cyrl.js":383,"./sr.js":382,"./ss":384,"./ss.js":384,"./sv":385,"./sv.js":385,"./sw":386,"./sw.js":386,"./ta":387,"./ta.js":387,"./te":388,"./te.js":388,"./tet":389,"./tet.js":389,"./tg":390,"./tg.js":390,"./th":391,"./th.js":391,"./tk":392,"./tk.js":392,"./tl-ph":393,"./tl-ph.js":393,"./tlh":394,"./tlh.js":394,"./tr":395,"./tr.js":395,"./tzl":396,"./tzl.js":396,"./tzm":397,"./tzm-latn":398,"./tzm-latn.js":398,"./tzm.js":397,"./ug-cn":399,"./ug-cn.js":399,"./uk":400,"./uk.js":400,"./ur":401,"./ur.js":401,"./uz":402,"./uz-latn":403,"./uz-latn.js":403,"./uz.js":402,"./vi":404,"./vi.js":404,"./x-pseudo":405,"./x-pseudo.js":405,"./yo":406,"./yo.js":406,"./zh-cn":407,"./zh-cn.js":407,"./zh-hk":408,"./zh-hk.js":408,"./zh-mo":409,"./zh-mo.js":409,"./zh-tw":410,"./zh-tw.js":410};function r(t){var e=c(t);return n(e)}function c(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}r.keys=function(){return Object.keys(map)},r.resolve=c,t.exports=r,r.id=423},429:function(t,e,n){var content=n(504);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(68).default)("1b7833da",content,!0,{sourceMap:!1})},431:function(t,e,n){"use strict";n.r(e);var r=n(417),c=r.c.reactiveProp,o={components:!0,extends:r.b,mixins:[c],props:["options"],mounted:function(){this.renderChart(this.chartData,this.options)}},l=n(59),component=Object(l.a)(o,undefined,undefined,!1,null,null,null);e.default=component.exports},432:function(t,e,n){"use strict";n.r(e);var r=n(417),c=r.c.reactiveProp,o={components:!0,extends:r.a,mixins:[c],mounted:function(){this.renderChart(this.chartData,{responsive:!0,maintainAspectRatio:!1,aspectRatio:4})}},l=n(59),component=Object(l.a)(o,undefined,undefined,!1,null,null,null);e.default=component.exports},500:function(t,e,n){"use strict";var r=n(5),c=n(501).start;r({target:"String",proto:!0,forced:n(502)},{padStart:function(t){return c(this,t,arguments.length>1?arguments[1]:void 0)}})},501:function(t,e,n){var r=n(29),c=n(197),o=n(33),l=Math.ceil,f=function(t){return function(e,n,f){var d,h,j=String(o(e)),m=j.length,v=void 0===f?" ":String(f),y=r(n);return y<=m||""==v?j:(d=y-m,(h=c.call(v,l(d/v.length))).length>d&&(h=h.slice(0,d)),t?j+h:h+j)}};t.exports={start:f(!1),end:f(!0)}},502:function(t,e,n){var r=n(99);t.exports=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(r)},503:function(t,e,n){"use strict";n(429)},504:function(t,e,n){var r=n(67)(!1);r.push([t.i,".index-icon{vertical-align:bottom}",""]),t.exports=r},512:function(t,e,n){"use strict";n.r(e);n(46),n(35),n(36),n(60),n(41),n(61);var r=n(4),c=n(28),o=(n(27),n(47),n(70),n(16),n(25),n(31),n(500),n(83),n(82),n(269)),l=n(418),f=n.n(l),d=n(69);function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function j(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={components:{UnauthorizedNotification:n(274).default},data:function(){return{online:!0,isLoading:!0,datacollection:null}},computed:j(j(j({},Object(d.c)({users:function(t){return t.users.list},achievementData:function(t){return t.achievementData.list},achievementStatsByDifficulty:function(t){return t.achievementStatsByDifficulty.list},achievementStatsByCategory:function(t){return t.achievementStatsByCategory.list},achievementStatsByMonth:function(t){return t.achievementStatsByMonth.list},latestAchievements:function(t){return t.achievements.latestAchievements}})),Object(d.b)("slackInfos",["getUser"])),{},{statsByDifficulty:function(){var t=this,e=["baby","easy","medium","hard","professional"];return{datasets:[{data:e.map((function(label){var e=t.achievementStatsByDifficulty.find((function(t){return t.id===label}));return e?e.count:0})),backgroundColor:["whitesmoke","#48c774","#3273dc","#ffdd57","#f14668"]}],labels:e}},statsByCategory:function(){return{datasets:[{data:this.achievementStatsByCategory.map((function(t){return t.count})),backgroundColor:this.achievementStatsByCategory.map((function(t){return Object(o.getCategoryColor)(t.id)}))}],labels:this.achievementStatsByCategory.map((function(t){return t.id}))}},statsByMonth:function(){return{datasets:[{label:"実績解除数",data:this.achievementStatsByMonth.map((function(t){return t.count})),backgroundColor:"#3273dc"}],labels:this.achievementStatsByMonth.map((function(t){return t.id}))}}}),fetch:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.store,e.next=16;break;case 4:return e.next=6,n.dispatch("slackInfos/init");case 6:return e.next=8,n.dispatch("achievements/bindLatestAchievements");case 8:return e.next=10,n.dispatch("achievementsData/bindList");case 10:return e.next=12,n.dispatch("achievementStatsByDifficulty/bindList");case 12:return e.next=14,n.dispatch("achievementStatsByCategory/bindList");case 14:return e.next=16,n.dispatch("achievementStatsByMonth/bindList");case 16:case"end":return e.stop()}}),e)})))()},mounted:function(){var t=this;Promise.all([this.$store.dispatch("users/initList"),this.$store.dispatch("slackInfos/init"),this.$store.dispatch("achievements/initLatestAchievements"),this.$store.dispatch("achievementData/initList"),this.$store.dispatch("achievementStatsByDifficulty/initList"),this.$store.dispatch("achievementStatsByCategory/initList"),this.$store.dispatch("achievementStatsByMonth/initList")]).then((function(){t.isLoading=!1}))},methods:{getUserName:function(t){var e=f()(t,["profile","display_name"],!1)||f()(t,["real_name"],!1)||"匿名ユーザー";return"@".concat(e)},getUserIcon:function(t){return f()(t,["profile","image_24"],"/images/anonymous-icon_24.png")},getUserIcon2x:function(t){return f()(t,["profile","image_48"],"/images/anonymous-icon_48.png")},getCategoryColor:function(t){return Object(o.getCategoryColor)(t)},getAchievement:function(t){return this.achievementData.find((function(e){return e.id===t}))||{title:"---",difficulty:"baby"}},getDateStringJa:function(t){var e=new Date(1e3*t.seconds),n=e.getHours().toString().padStart(2,"0"),r=e.getMinutes().toString().padStart(2,"0");return"".concat(e.getFullYear(),"年").concat(e.getMonth()+1,"月").concat(e.getDate(),"日 ").concat(n,":").concat(r)}},head:function(){return{title:"achievement-viewer"}}},v=(n(503),n(59)),component=Object(v.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container content"},[t.isLoading?n("progress",{staticClass:"progress is-small is-primary",attrs:{max:"100"}},[t._v("15%")]):t._e(),t._v(" "),n("unauthorized-notification"),t._v(" "),n("h2",[t._v("最近のアクティビティ")]),t._v(" "),n("table",{staticClass:"table"},[t._m(0),t._v(" "),n("tbody",t._l(t.latestAchievements,(function(e){return n("tr",{key:e.date.toString()},[n("td",[t._v(t._s(t.getDateStringJa(e.date)))]),t._v(" "),n("td",[n("nuxt-link",{attrs:{to:"/users/"+e.user}},[n("img",{staticClass:"index-icon",attrs:{src:t.getUserIcon(t.getUser(e.user)),srcset:t.getUserIcon(t.getUser(e.user))+" 1x, "+t.getUserIcon2x(t.getUser(e.user))+" 2x"}}),t._v("\n\t\t\t\t\t\t"+t._s(t.getUserName(t.getUser(e.user)))+"\n\t\t\t\t\t")]),t._v("\n\t\t\t\t\tが\n\t\t\t\t\t"),n("nuxt-link",{attrs:{to:"/achievements/"+e.name}},[n("strong",[t._v(t._s(t.getAchievement(e.name).title))]),t._v(" "),n("DifficultyBadge",{attrs:{difficulty:t.getAchievement(e.name).difficulty}})],1),t._v("\n\t\t\t\t\tを解除しました。\n\t\t\t\t")],1)])})),0)]),t._v(" "),n("h2",[t._v("統計情報")]),t._v(" "),n("div",{staticClass:"columns is-multiline block"},[n("div",{staticClass:"column is-half"},[n("PieChartStat",{attrs:{"chart-data":t.statsByDifficulty}})],1),t._v(" "),n("div",{staticClass:"column is-half"},[n("PieChartStat",{attrs:{"chart-data":t.statsByCategory}})],1),t._v(" "),n("div",{staticClass:"column is-full"},[n("TimeSeriesStat",{attrs:{"chart-data":t.statsByMonth}})],1)]),t._v(" "),n("h2",[t._v("ユーザー一覧")]),t._v(" "),n("table",{staticClass:"table"},[t._m(1),t._v(" "),n("tbody",t._l(t.users,(function(e){return n("tr",{key:e.id},[n("td",[n("nuxt-link",{attrs:{to:"/users/"+e.id}},[n("img",{staticClass:"index-icon",attrs:{src:t.getUserIcon(t.getUser(e.id)),srcset:t.getUserIcon(t.getUser(e.id))+" 1x, "+t.getUserIcon2x(t.getUser(e.id))+" 2x"}}),t._v("\n\t\t\t\t\t\t"+t._s(t.getUserName(t.getUser(e.id)))+"\n\t\t\t\t\t")])],1)])})),0)])],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("日時")]),t._v(" "),n("th",[t._v("アクティビティ")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("名前")])])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{UnauthorizedNotification:n(274).default,DifficultyBadge:n(275).default,PieChartStat:n(431).default,TimeSeriesStat:n(432).default})}}]);