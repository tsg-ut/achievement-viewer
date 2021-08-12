(window.webpackJsonp=window.webpackJsonp||[]).push([[14,5,7,8,9],{271:function(t,e,n){"use strict";n.r(e),n.d(e,"getCategoryColor",(function(){return l}));n(184),n(16),n(25),n(185),n(186),n(187),n(188),n(189),n(190),n(191),n(192),n(193),n(194),n(195),n(196),n(197),n(31);var r=n(273),c=n.n(r),o=new Map([["basic","#BDBDBD"],["reactions","#FF8F00"],["sushi-bot","#D32F2F"],["tashibot","#9C27B0"],["dajare","#42A5F5"],["tahoiya","#1B5E20"],["mahjong","#F57F17"],["shogi","#5D4037"],["prime","#1565C0"],["achievements","#558B2F"],["manual","#424242"],["pocky","#176BEF"],["ricochet-robots","#BF360C"],["atcoder","#78909C"],["voiperrobot","#0097A7"],["ahokusa","#E57373"],["anime","#004D40"]]),l=function(t){return o.has(t)?o.get(t):c()({luminosity:"bright",seed:t})}},276:function(t,e,n){"use strict";n.r(e);n(47),n(35),n(36),n(60),n(42),n(61);var r=n(28),c=n(69);function o(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={data:function(){return{url:""}},computed:l(l({},Object(c.c)({isUnauthorized:function(t){return t.slackInfos.isUnauthorized}})),{},{loginUrl:function(){return"https://slackbot-api.tsg.ne.jp/?return_to=".concat(encodeURIComponent(this.url))}}),created:function(){this.url=location.href},components:!0},d=n(59),component=Object(d.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isUnauthorized?n("div",{staticClass:"notification is-danger"},[t._v("\n\tログインしていないためユーザー名などの情報は表示されません。あなたがTSGerである場合は"),n("a",{attrs:{href:t.loginUrl}},[t._v("こちら")]),t._v("からログインしてください。\n")]):t._e()}),[],!1,null,null,null);e.default=component.exports},277:function(t,e,n){"use strict";n.r(e);var r={components:!0,props:["difficulty"]},c=n(59),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",["baby"===t.difficulty?n("span",{staticClass:"tag is-light"},[t._v("\n\t\tBaby\n\t")]):t._e(),t._v(" "),"easy"===t.difficulty?n("span",{staticClass:"tag is-success"},[t._v("\n\t\tEasy\n\t")]):t._e(),t._v(" "),"medium"===t.difficulty?n("span",{staticClass:"tag is-link"},[t._v("\n\t\tMedium\n\t")]):t._e(),t._v(" "),"hard"===t.difficulty?n("span",{staticClass:"tag is-warning"},[t._v("\n\t\tHard\n\t")]):t._e(),t._v(" "),"professional"===t.difficulty?n("span",{staticClass:"tag is-danger"},[t._v("\n\t\tPro\n\t")]):t._e()])}),[],!1,null,null,null);e.default=component.exports},425:function(t,e,n){var map={"./af":278,"./af.js":278,"./ar":279,"./ar-dz":280,"./ar-dz.js":280,"./ar-kw":281,"./ar-kw.js":281,"./ar-ly":282,"./ar-ly.js":282,"./ar-ma":283,"./ar-ma.js":283,"./ar-sa":284,"./ar-sa.js":284,"./ar-tn":285,"./ar-tn.js":285,"./ar.js":279,"./az":286,"./az.js":286,"./be":287,"./be.js":287,"./bg":288,"./bg.js":288,"./bm":289,"./bm.js":289,"./bn":290,"./bn-bd":291,"./bn-bd.js":291,"./bn.js":290,"./bo":292,"./bo.js":292,"./br":293,"./br.js":293,"./bs":294,"./bs.js":294,"./ca":295,"./ca.js":295,"./cs":296,"./cs.js":296,"./cv":297,"./cv.js":297,"./cy":298,"./cy.js":298,"./da":299,"./da.js":299,"./de":300,"./de-at":301,"./de-at.js":301,"./de-ch":302,"./de-ch.js":302,"./de.js":300,"./dv":303,"./dv.js":303,"./el":304,"./el.js":304,"./en-au":305,"./en-au.js":305,"./en-ca":306,"./en-ca.js":306,"./en-gb":307,"./en-gb.js":307,"./en-ie":308,"./en-ie.js":308,"./en-il":309,"./en-il.js":309,"./en-in":310,"./en-in.js":310,"./en-nz":311,"./en-nz.js":311,"./en-sg":312,"./en-sg.js":312,"./eo":313,"./eo.js":313,"./es":314,"./es-do":315,"./es-do.js":315,"./es-mx":316,"./es-mx.js":316,"./es-us":317,"./es-us.js":317,"./es.js":314,"./et":318,"./et.js":318,"./eu":319,"./eu.js":319,"./fa":320,"./fa.js":320,"./fi":321,"./fi.js":321,"./fil":322,"./fil.js":322,"./fo":323,"./fo.js":323,"./fr":324,"./fr-ca":325,"./fr-ca.js":325,"./fr-ch":326,"./fr-ch.js":326,"./fr.js":324,"./fy":327,"./fy.js":327,"./ga":328,"./ga.js":328,"./gd":329,"./gd.js":329,"./gl":330,"./gl.js":330,"./gom-deva":331,"./gom-deva.js":331,"./gom-latn":332,"./gom-latn.js":332,"./gu":333,"./gu.js":333,"./he":334,"./he.js":334,"./hi":335,"./hi.js":335,"./hr":336,"./hr.js":336,"./hu":337,"./hu.js":337,"./hy-am":338,"./hy-am.js":338,"./id":339,"./id.js":339,"./is":340,"./is.js":340,"./it":341,"./it-ch":342,"./it-ch.js":342,"./it.js":341,"./ja":343,"./ja.js":343,"./jv":344,"./jv.js":344,"./ka":345,"./ka.js":345,"./kk":346,"./kk.js":346,"./km":347,"./km.js":347,"./kn":348,"./kn.js":348,"./ko":349,"./ko.js":349,"./ku":350,"./ku.js":350,"./ky":351,"./ky.js":351,"./lb":352,"./lb.js":352,"./lo":353,"./lo.js":353,"./lt":354,"./lt.js":354,"./lv":355,"./lv.js":355,"./me":356,"./me.js":356,"./mi":357,"./mi.js":357,"./mk":358,"./mk.js":358,"./ml":359,"./ml.js":359,"./mn":360,"./mn.js":360,"./mr":361,"./mr.js":361,"./ms":362,"./ms-my":363,"./ms-my.js":363,"./ms.js":362,"./mt":364,"./mt.js":364,"./my":365,"./my.js":365,"./nb":366,"./nb.js":366,"./ne":367,"./ne.js":367,"./nl":368,"./nl-be":369,"./nl-be.js":369,"./nl.js":368,"./nn":370,"./nn.js":370,"./oc-lnc":371,"./oc-lnc.js":371,"./pa-in":372,"./pa-in.js":372,"./pl":373,"./pl.js":373,"./pt":374,"./pt-br":375,"./pt-br.js":375,"./pt.js":374,"./ro":376,"./ro.js":376,"./ru":377,"./ru.js":377,"./sd":378,"./sd.js":378,"./se":379,"./se.js":379,"./si":380,"./si.js":380,"./sk":381,"./sk.js":381,"./sl":382,"./sl.js":382,"./sq":383,"./sq.js":383,"./sr":384,"./sr-cyrl":385,"./sr-cyrl.js":385,"./sr.js":384,"./ss":386,"./ss.js":386,"./sv":387,"./sv.js":387,"./sw":388,"./sw.js":388,"./ta":389,"./ta.js":389,"./te":390,"./te.js":390,"./tet":391,"./tet.js":391,"./tg":392,"./tg.js":392,"./th":393,"./th.js":393,"./tk":394,"./tk.js":394,"./tl-ph":395,"./tl-ph.js":395,"./tlh":396,"./tlh.js":396,"./tr":397,"./tr.js":397,"./tzl":398,"./tzl.js":398,"./tzm":399,"./tzm-latn":400,"./tzm-latn.js":400,"./tzm.js":399,"./ug-cn":401,"./ug-cn.js":401,"./uk":402,"./uk.js":402,"./ur":403,"./ur.js":403,"./uz":404,"./uz-latn":405,"./uz-latn.js":405,"./uz.js":404,"./vi":406,"./vi.js":406,"./x-pseudo":407,"./x-pseudo.js":407,"./yo":408,"./yo.js":408,"./zh-cn":409,"./zh-cn.js":409,"./zh-hk":410,"./zh-hk.js":410,"./zh-mo":411,"./zh-mo.js":411,"./zh-tw":412,"./zh-tw.js":412};function r(t){var e=c(t);return n(e)}function c(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}r.keys=function(){return Object.keys(map)},r.resolve=c,t.exports=r,r.id=425},431:function(t,e,n){var content=n(506);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(68).default)("1b7833da",content,!0,{sourceMap:!1})},433:function(t,e,n){"use strict";n.r(e);var r=n(419),c=r.c.reactiveProp,o={components:!0,extends:r.b,mixins:[c],props:["options"],mounted:function(){this.renderChart(this.chartData,this.options)}},l=n(59),component=Object(l.a)(o,undefined,undefined,!1,null,null,null);e.default=component.exports},434:function(t,e,n){"use strict";n.r(e);var r=n(419),c=r.c.reactiveProp,o={components:!0,extends:r.a,mixins:[c],mounted:function(){this.renderChart(this.chartData,{responsive:!0,maintainAspectRatio:!1,aspectRatio:4})}},l=n(59),component=Object(l.a)(o,undefined,undefined,!1,null,null,null);e.default=component.exports},502:function(t,e,n){"use strict";var r=n(5),c=n(503).start;r({target:"String",proto:!0,forced:n(504)},{padStart:function(t){return c(this,t,arguments.length>1?arguments[1]:void 0)}})},503:function(t,e,n){var r=n(29),c=n(200),o=n(33),l=Math.ceil,f=function(t){return function(e,n,f){var d,h,j=String(o(e)),m=j.length,v=void 0===f?" ":String(f),y=r(n);return y<=m||""==v?j:(d=y-m,(h=c.call(v,l(d/v.length))).length>d&&(h=h.slice(0,d)),t?j+h:h+j)}};t.exports={start:f(!1),end:f(!0)}},504:function(t,e,n){var r=n(102);t.exports=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(r)},505:function(t,e,n){"use strict";n(431)},506:function(t,e,n){var r=n(67)(!1);r.push([t.i,".index-icon{vertical-align:bottom}",""]),t.exports=r},514:function(t,e,n){"use strict";n.r(e);n(47),n(35),n(36),n(60),n(42),n(61);var r=n(4),c=n(28),o=(n(27),n(48),n(70),n(16),n(25),n(31),n(502),n(83),n(82),n(271)),l=n(420),f=n.n(l),d=n(69);function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function j(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={components:{UnauthorizedNotification:n(276).default},data:function(){return{online:!0,isLoading:!0,datacollection:null}},computed:j(j(j({},Object(d.c)({users:function(t){return t.users.list},achievementData:function(t){return t.achievementData.list},achievementStatsByDifficulty:function(t){return t.achievementStatsByDifficulty.list},achievementStatsByCategory:function(t){return t.achievementStatsByCategory.list},achievementStatsByMonth:function(t){return t.achievementStatsByMonth.list},latestAchievements:function(t){return t.achievements.latestAchievements}})),Object(d.b)("slackInfos",["getUser"])),{},{statsByDifficulty:function(){var t=this,e=["baby","easy","medium","hard","professional"];return{datasets:[{data:e.map((function(label){var e=t.achievementStatsByDifficulty.find((function(t){return t.id===label}));return e?e.count:0})),backgroundColor:["whitesmoke","#48c774","#3273dc","#ffdd57","#f14668"]}],labels:e}},statsByCategory:function(){return{datasets:[{data:this.achievementStatsByCategory.map((function(t){return t.count})),backgroundColor:this.achievementStatsByCategory.map((function(t){return Object(o.getCategoryColor)(t.id)}))}],labels:this.achievementStatsByCategory.map((function(t){return t.id}))}},statsByMonth:function(){return{datasets:[{label:"実績解除数",data:this.achievementStatsByMonth.map((function(t){return t.count})),backgroundColor:"#3273dc"}],labels:this.achievementStatsByMonth.map((function(t){return t.id}))}}}),fetch:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.store,e.next=16;break;case 4:return e.next=6,n.dispatch("slackInfos/init");case 6:return e.next=8,n.dispatch("achievements/bindLatestAchievements");case 8:return e.next=10,n.dispatch("achievementsData/bindList");case 10:return e.next=12,n.dispatch("achievementStatsByDifficulty/bindList");case 12:return e.next=14,n.dispatch("achievementStatsByCategory/bindList");case 14:return e.next=16,n.dispatch("achievementStatsByMonth/bindList");case 16:case"end":return e.stop()}}),e)})))()},mounted:function(){var t=this;Promise.all([this.$store.dispatch("users/initList"),this.$store.dispatch("slackInfos/init"),this.$store.dispatch("achievements/initLatestAchievements"),this.$store.dispatch("achievementData/initList"),this.$store.dispatch("achievementStatsByDifficulty/initList"),this.$store.dispatch("achievementStatsByCategory/initList"),this.$store.dispatch("achievementStatsByMonth/initList")]).then((function(){t.isLoading=!1}))},methods:{getUserName:function(t){var e=f()(t,["profile","display_name"],!1)||f()(t,["real_name"],!1)||"匿名ユーザー";return"@".concat(e)},getUserIcon:function(t){return f()(t,["profile","image_24"],"/images/anonymous-icon_24.png")},getUserIcon2x:function(t){return f()(t,["profile","image_48"],"/images/anonymous-icon_48.png")},getCategoryColor:function(t){return Object(o.getCategoryColor)(t)},getAchievement:function(t){return this.achievementData.find((function(e){return e.id===t}))||{title:"---",difficulty:"baby"}},getDateStringJa:function(t){var e=new Date(1e3*t.seconds),n=e.getHours().toString().padStart(2,"0"),r=e.getMinutes().toString().padStart(2,"0");return"".concat(e.getFullYear(),"年").concat(e.getMonth()+1,"月").concat(e.getDate(),"日 ").concat(n,":").concat(r)}},head:function(){return{title:"achievement-viewer"}}},v=(n(505),n(59)),component=Object(v.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container content"},[t.isLoading?n("progress",{staticClass:"progress is-small is-primary",attrs:{max:"100"}},[t._v("15%")]):t._e(),t._v(" "),n("unauthorized-notification"),t._v(" "),n("h2",[t._v("最近のアクティビティ")]),t._v(" "),n("table",{staticClass:"table"},[t._m(0),t._v(" "),n("tbody",t._l(t.latestAchievements,(function(e){return n("tr",{key:e.date.toString()},[n("td",[t._v(t._s(t.getDateStringJa(e.date)))]),t._v(" "),n("td",[n("nuxt-link",{attrs:{to:"/users/"+e.user}},[n("img",{staticClass:"index-icon",attrs:{src:t.getUserIcon(t.getUser(e.user)),srcset:t.getUserIcon(t.getUser(e.user))+" 1x, "+t.getUserIcon2x(t.getUser(e.user))+" 2x"}}),t._v("\n\t\t\t\t\t\t"+t._s(t.getUserName(t.getUser(e.user)))+"\n\t\t\t\t\t")]),t._v("\n\t\t\t\t\tが\n\t\t\t\t\t"),n("nuxt-link",{attrs:{to:"/achievements/"+e.name}},[n("strong",[t._v(t._s(t.getAchievement(e.name).title))]),t._v(" "),n("DifficultyBadge",{attrs:{difficulty:t.getAchievement(e.name).difficulty}})],1),t._v("\n\t\t\t\t\tを解除しました。\n\t\t\t\t")],1)])})),0)]),t._v(" "),n("h2",[t._v("統計情報")]),t._v(" "),n("div",{staticClass:"columns is-multiline block"},[n("div",{staticClass:"column is-half"},[n("PieChartStat",{attrs:{"chart-data":t.statsByDifficulty}})],1),t._v(" "),n("div",{staticClass:"column is-half"},[n("PieChartStat",{attrs:{"chart-data":t.statsByCategory}})],1),t._v(" "),n("div",{staticClass:"column is-full"},[n("TimeSeriesStat",{attrs:{"chart-data":t.statsByMonth}})],1)]),t._v(" "),n("h2",[t._v("ユーザー一覧")]),t._v(" "),n("table",{staticClass:"table"},[t._m(1),t._v(" "),n("tbody",t._l(t.users,(function(e){return n("tr",{key:e.id},[n("td",[n("nuxt-link",{attrs:{to:"/users/"+e.id}},[n("img",{staticClass:"index-icon",attrs:{src:t.getUserIcon(t.getUser(e.id)),srcset:t.getUserIcon(t.getUser(e.id))+" 1x, "+t.getUserIcon2x(t.getUser(e.id))+" 2x"}}),t._v("\n\t\t\t\t\t\t"+t._s(t.getUserName(t.getUser(e.id)))+"\n\t\t\t\t\t")])],1)])})),0)])],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("日時")]),t._v(" "),n("th",[t._v("アクティビティ")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("名前")])])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{UnauthorizedNotification:n(276).default,DifficultyBadge:n(277).default,PieChartStat:n(433).default,TimeSeriesStat:n(434).default})}}]);