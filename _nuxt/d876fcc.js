(window.webpackJsonp=window.webpackJsonp||[]).push([[12,4,8],{265:function(t,e,n){"use strict";n.r(e),n.d(e,"getCategoryColor",(function(){return l}));n(181),n(17),n(25),n(182),n(183),n(184),n(185),n(186),n(187),n(188),n(189),n(190),n(191),n(192),n(193),n(194),n(31);var r=n(269),o=n.n(r),c=new Map([["basic","#BDBDBD"],["reactions","#FF8F00"],["sushi-bot","#D32F2F"],["tashibot","#9C27B0"],["dajare","#42A5F5"],["tahoiya","#1B5E20"],["mahjong","#F57F17"],["shogi","#5D4037"],["prime","#1565C0"],["achievements","#558B2F"],["manual","#424242"],["pocky","#176BEF"],["ricochet-robots","#BF360C"],["atcoder","#78909C"],["voiperrobot","#0097A7"],["ahokusa","#E57373"],["anime","#004D40"]]),l=function(t){return c.has(t)?c.get(t):o()({luminosity:"bright",seed:t})}},266:function(t,e,n){"use strict";n.r(e);var r={components:!0,props:["difficulty"]},o=n(58),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",["baby"===t.difficulty?n("span",{staticClass:"tag is-light"},[t._v("\n\t\tBaby\n\t")]):t._e(),t._v(" "),"easy"===t.difficulty?n("span",{staticClass:"tag is-success"},[t._v("\n\t\tEasy\n\t")]):t._e(),t._v(" "),"medium"===t.difficulty?n("span",{staticClass:"tag is-link"},[t._v("\n\t\tMedium\n\t")]):t._e(),t._v(" "),"hard"===t.difficulty?n("span",{staticClass:"tag is-warning"},[t._v("\n\t\tHard\n\t")]):t._e(),t._v(" "),"professional"===t.difficulty?n("span",{staticClass:"tag is-danger"},[t._v("\n\t\tPro\n\t")]):t._e()])}),[],!1,null,null,null);e.default=component.exports},268:function(t,e,n){"use strict";n.r(e);n(46),n(35),n(40),n(59),n(39),n(60);var r=n(27),o=n(66);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={data:function(){return{url:""}},computed:l(l({},Object(o.c)({isUnauthorized:function(t){return t.slackInfos.isUnauthorized}})),{},{loginUrl:function(){return"https://slackbot-api.tsg.ne.jp/?return_to=".concat(encodeURIComponent(this.url))}}),created:function(){this.url=location.href},components:!0},h=n(58),component=Object(h.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isUnauthorized?n("div",{staticClass:"notification is-danger"},[t._v("\n\tログインしていないためユーザー名などの情報は表示されません。あなたがTSGerである場合は"),n("a",{attrs:{href:t.loginUrl}},[t._v("こちら")]),t._v("からログインしてください。\n")]):t._e()}),[],!1,null,null,null);e.default=component.exports},406:function(t,e,n){var r=n(407),o=n(408);t.exports=function(t){return t&&t.length?r(t,o):0}},407:function(t,e){t.exports=function(t,e){for(var n,r=-1,o=t.length;++r<o;){var c=e(t[r]);void 0!==c&&(n=void 0===n?c:n+c)}return n}},408:function(t,e){t.exports=function(t){return t}},420:function(t,e,n){var map={"./af":271,"./af.js":271,"./ar":272,"./ar-dz":273,"./ar-dz.js":273,"./ar-kw":274,"./ar-kw.js":274,"./ar-ly":275,"./ar-ly.js":275,"./ar-ma":276,"./ar-ma.js":276,"./ar-sa":277,"./ar-sa.js":277,"./ar-tn":278,"./ar-tn.js":278,"./ar.js":272,"./az":279,"./az.js":279,"./be":280,"./be.js":280,"./bg":281,"./bg.js":281,"./bm":282,"./bm.js":282,"./bn":283,"./bn-bd":284,"./bn-bd.js":284,"./bn.js":283,"./bo":285,"./bo.js":285,"./br":286,"./br.js":286,"./bs":287,"./bs.js":287,"./ca":288,"./ca.js":288,"./cs":289,"./cs.js":289,"./cv":290,"./cv.js":290,"./cy":291,"./cy.js":291,"./da":292,"./da.js":292,"./de":293,"./de-at":294,"./de-at.js":294,"./de-ch":295,"./de-ch.js":295,"./de.js":293,"./dv":296,"./dv.js":296,"./el":297,"./el.js":297,"./en-au":298,"./en-au.js":298,"./en-ca":299,"./en-ca.js":299,"./en-gb":300,"./en-gb.js":300,"./en-ie":301,"./en-ie.js":301,"./en-il":302,"./en-il.js":302,"./en-in":303,"./en-in.js":303,"./en-nz":304,"./en-nz.js":304,"./en-sg":305,"./en-sg.js":305,"./eo":306,"./eo.js":306,"./es":307,"./es-do":308,"./es-do.js":308,"./es-mx":309,"./es-mx.js":309,"./es-us":310,"./es-us.js":310,"./es.js":307,"./et":311,"./et.js":311,"./eu":312,"./eu.js":312,"./fa":313,"./fa.js":313,"./fi":314,"./fi.js":314,"./fil":315,"./fil.js":315,"./fo":316,"./fo.js":316,"./fr":317,"./fr-ca":318,"./fr-ca.js":318,"./fr-ch":319,"./fr-ch.js":319,"./fr.js":317,"./fy":320,"./fy.js":320,"./ga":321,"./ga.js":321,"./gd":322,"./gd.js":322,"./gl":323,"./gl.js":323,"./gom-deva":324,"./gom-deva.js":324,"./gom-latn":325,"./gom-latn.js":325,"./gu":326,"./gu.js":326,"./he":327,"./he.js":327,"./hi":328,"./hi.js":328,"./hr":329,"./hr.js":329,"./hu":330,"./hu.js":330,"./hy-am":331,"./hy-am.js":331,"./id":332,"./id.js":332,"./is":333,"./is.js":333,"./it":334,"./it-ch":335,"./it-ch.js":335,"./it.js":334,"./ja":336,"./ja.js":336,"./jv":337,"./jv.js":337,"./ka":338,"./ka.js":338,"./kk":339,"./kk.js":339,"./km":340,"./km.js":340,"./kn":341,"./kn.js":341,"./ko":342,"./ko.js":342,"./ku":343,"./ku.js":343,"./ky":344,"./ky.js":344,"./lb":345,"./lb.js":345,"./lo":346,"./lo.js":346,"./lt":347,"./lt.js":347,"./lv":348,"./lv.js":348,"./me":349,"./me.js":349,"./mi":350,"./mi.js":350,"./mk":351,"./mk.js":351,"./ml":352,"./ml.js":352,"./mn":353,"./mn.js":353,"./mr":354,"./mr.js":354,"./ms":355,"./ms-my":356,"./ms-my.js":356,"./ms.js":355,"./mt":357,"./mt.js":357,"./my":358,"./my.js":358,"./nb":359,"./nb.js":359,"./ne":360,"./ne.js":360,"./nl":361,"./nl-be":362,"./nl-be.js":362,"./nl.js":361,"./nn":363,"./nn.js":363,"./oc-lnc":364,"./oc-lnc.js":364,"./pa-in":365,"./pa-in.js":365,"./pl":366,"./pl.js":366,"./pt":367,"./pt-br":368,"./pt-br.js":368,"./pt.js":367,"./ro":369,"./ro.js":369,"./ru":370,"./ru.js":370,"./sd":371,"./sd.js":371,"./se":372,"./se.js":372,"./si":373,"./si.js":373,"./sk":374,"./sk.js":374,"./sl":375,"./sl.js":375,"./sq":376,"./sq.js":376,"./sr":377,"./sr-cyrl":378,"./sr-cyrl.js":378,"./sr.js":377,"./ss":379,"./ss.js":379,"./sv":380,"./sv.js":380,"./sw":381,"./sw.js":381,"./ta":382,"./ta.js":382,"./te":383,"./te.js":383,"./tet":384,"./tet.js":384,"./tg":385,"./tg.js":385,"./th":386,"./th.js":386,"./tk":387,"./tk.js":387,"./tl-ph":388,"./tl-ph.js":388,"./tlh":389,"./tlh.js":389,"./tr":390,"./tr.js":390,"./tzl":391,"./tzl.js":391,"./tzm":392,"./tzm-latn":393,"./tzm-latn.js":393,"./tzm.js":392,"./ug-cn":394,"./ug-cn.js":394,"./uk":395,"./uk.js":395,"./ur":396,"./ur.js":396,"./uz":397,"./uz-latn":398,"./uz-latn.js":398,"./uz.js":397,"./vi":399,"./vi.js":399,"./x-pseudo":400,"./x-pseudo.js":400,"./yo":401,"./yo.js":401,"./zh-cn":402,"./zh-cn.js":402,"./zh-hk":403,"./zh-hk.js":403,"./zh-mo":404,"./zh-mo.js":404,"./zh-tw":405,"./zh-tw.js":405};function r(t){var e=o(t);return n(e)}function o(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}r.keys=function(){return Object.keys(map)},r.resolve=o,t.exports=r,r.id=420},426:function(t,e,n){var content=n(505);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(80).default)("1b7833da",content,!0,{sourceMap:!1})},428:function(t,e,n){"use strict";n.r(e);var r=n(415),o=r.c.reactiveProp,c={components:!0,extends:r.a,mixins:[o],props:["options"],mounted:function(){this.renderChart(this.chartData,this.options)}},l=n(58),component=Object(l.a)(c,undefined,undefined,!1,null,null,null);e.default=component.exports},429:function(t,e,n){"use strict";n.r(e);var r=n(415),o=r.c.reactiveProp,c={components:!0,extends:r.b,mixins:[o],mounted:function(){this.renderChart(this.chartData,{scales:{xAxes:[{type:"time",time:{unit:"month"}}]},maintainAspectRatio:!1,aspectRatio:4})}},l=n(58),component=Object(l.a)(c,undefined,undefined,!1,null,null,null);e.default=component.exports},495:function(t,e,n){"use strict";var r=n(5),o=n(496).start;r({target:"String",proto:!0,forced:n(497)},{padStart:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},496:function(t,e,n){var r=n(28),o=n(196),c=n(33),l=Math.ceil,f=function(t){return function(e,n,f){var h,d,j=String(c(e)),m=j.length,v=void 0===f?" ":String(f),y=r(n);return y<=m||""==v?j:(h=y-m,(d=o.call(v,l(h/v.length))).length>h&&(d=d.slice(0,h)),t?j+d:d+j)}};t.exports={start:f(!1),end:f(!0)}},497:function(t,e,n){var r=n(98);t.exports=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(r)},498:function(t,e,n){var r=n(499);t.exports=function(t){return(null==t?0:t.length)?r(t,1):[]}},499:function(t,e,n){var r=n(500),o=n(501);t.exports=function t(e,n,c,l,f){var h=-1,d=e.length;for(c||(c=o),f||(f=[]);++h<d;){var j=e[h];n>0&&c(j)?n>1?t(j,n-1,c,l,f):r(f,j):l||(f[f.length]=j)}return f}},500:function(t,e){t.exports=function(t,e){for(var n=-1,r=e.length,o=t.length;++n<r;)t[o+n]=e[n];return t}},501:function(t,e,n){var r=n(411),o=n(502),c=n(410),l=r?r.isConcatSpreadable:void 0;t.exports=function(t){return c(t)||o(t)||!!(l&&t&&t[l])}},502:function(t,e,n){var r=n(503),o=n(419),c=Object.prototype,l=c.hasOwnProperty,f=c.propertyIsEnumerable,h=r(function(){return arguments}())?r:function(t){return o(t)&&l.call(t,"callee")&&!f.call(t,"callee")};t.exports=h},503:function(t,e,n){var r=n(417),o=n(419);t.exports=function(t){return o(t)&&"[object Arguments]"==r(t)}},504:function(t,e,n){"use strict";n(426)},505:function(t,e,n){var r=n(79)(!1);r.push([t.i,".index-icon{vertical-align:bottom}",""]),t.exports=r},512:function(t,e,n){"use strict";n.r(e);n(46),n(35),n(40),n(59),n(39),n(60);var r=n(4),o=n(27),c=(n(26),n(47),n(68),n(17),n(25),n(31),n(495),n(99),n(97),n(265)),l=(n(498),n(409)),f=n.n(l),h=(n(406),n(66)),d=n(268);n(23);function j(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?j(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):j(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v={components:{UnauthorizedNotification:d.default},data:function(){return{online:!0,isLoading:!0,datacollection:null}},computed:m(m(m({},Object(h.c)({users:function(t){return t.users.list},achievementData:function(t){return t.achievementData.list},achievementStatsByDifficulty:function(t){return t.achievementStatsByDifficulty.list},achievementStatsByCategory:function(t){return t.achievementStatsByCategory.list},achievementStatsByMonth:function(t){return t.achievementStatsByMonth.list},latestAchievements:function(t){return t.achievements.latestAchievements}})),Object(h.b)("slackInfos",["getUser"])),{},{statsByDifficulty:function(){var t=this,e=["baby","easy","medium","hard","professional"];return{datasets:[{data:e.map((function(label){var e=t.achievementStatsByDifficulty.find((function(t){return t.id===label}));return e?e.count:0})),backgroundColor:["whitesmoke","#48c774","#3273dc","#ffdd57","#f14668"]}],labels:e}},statsByCategory:function(){return{datasets:[{data:this.achievementStatsByCategory.map((function(t){return t.count})),backgroundColor:this.achievementStatsByCategory.map((function(t){return Object(c.getCategoryColor)(t.id)}))}],labels:this.achievementStatsByCategory.map((function(t){return t.id}))}},statsByMonth:function(){return{datasets:[{label:"実績解除数",data:this.achievementStatsByMonth.map((function(t){return t.count})),fill:!1,borderColor:"#3273dc"}],labels:this.achievementStatsByMonth.map((function(t){return new Date(t.id)}))}}}),fetch:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.store,e.next=16;break;case 4:return e.next=6,n.dispatch("slackInfos/init");case 6:return e.next=8,n.dispatch("achievements/bindLatestAchievements");case 8:return e.next=10,n.dispatch("achievementsData/bindList");case 10:return e.next=12,n.dispatch("achievementStatsByDifficulty/bindList");case 12:return e.next=14,n.dispatch("achievementStatsByCategory/bindList");case 14:return e.next=16,n.dispatch("achievementStatsByMonth/bindList");case 16:case"end":return e.stop()}}),e)})))()},mounted:function(){var t=this;Promise.all([this.$store.dispatch("users/initList"),this.$store.dispatch("slackInfos/init"),this.$store.dispatch("achievements/initLatestAchievements"),this.$store.dispatch("achievementData/initList"),this.$store.dispatch("achievementStatsByDifficulty/initList"),this.$store.dispatch("achievementStatsByCategory/initList"),this.$store.dispatch("achievementStatsByMonth/initList")]).then((function(){t.isLoading=!1}))},methods:{getUserName:function(t){var e=f()(t,["profile","display_name"],!1)||f()(t,["real_name"],!1)||"匿名ユーザー";return"@".concat(e)},getUserIcon:function(t){return f()(t,["profile","image_24"],"/images/anonymous-icon_24.png")},getUserIcon2x:function(t){return f()(t,["profile","image_48"],"/images/anonymous-icon_48.png")},getCategoryColor:function(t){return Object(c.getCategoryColor)(t)},getAchievement:function(t){return this.achievementData.find((function(e){return e.id===t}))||{title:"---",difficulty:"baby"}},getDateStringJa:function(t){var e=new Date(1e3*t.seconds),n=e.getHours().toString().padStart(2,"0"),r=e.getMinutes().toString().padStart(2,"0");return"".concat(e.getFullYear(),"年").concat(e.getMonth()+1,"月").concat(e.getDate(),"日 ").concat(n,":").concat(r)}},head:function(){return{title:"achievement-viewer"}}},y=(n(504),n(58)),component=Object(y.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container content"},[t.isLoading?n("progress",{staticClass:"progress is-small is-primary",attrs:{max:"100"}},[t._v("15%")]):t._e(),t._v(" "),n("unauthorized-notification"),t._v(" "),n("h2",[t._v("最近のアクティビティ")]),t._v(" "),n("table",{staticClass:"table"},[t._m(0),t._v(" "),n("tbody",t._l(t.latestAchievements,(function(e){return n("tr",{key:e.date.toString()},[n("td",[t._v(t._s(t.getDateStringJa(e.date)))]),t._v(" "),n("td",[n("nuxt-link",{attrs:{to:"/users/"+e.user}},[n("img",{staticClass:"index-icon",attrs:{src:t.getUserIcon(t.getUser(e.user)),srcset:t.getUserIcon(t.getUser(e.user))+" 1x, "+t.getUserIcon2x(t.getUser(e.user))+" 2x"}}),t._v("\n\t\t\t\t\t\t"+t._s(t.getUserName(t.getUser(e.user)))+"\n\t\t\t\t\t")]),t._v("\n\t\t\t\t\tが\n\t\t\t\t\t"),n("nuxt-link",{attrs:{to:"/achievements/"+e.name}},[n("strong",[t._v(t._s(t.getAchievement(e.name).title))]),t._v(" "),n("DifficultyBadge",{attrs:{difficulty:t.getAchievement(e.name).difficulty}})],1),t._v("\n\t\t\t\t\tを解除しました。\n\t\t\t\t")],1)])})),0)]),t._v(" "),n("h2",[t._v("統計情報")]),t._v(" "),n("div",{staticClass:"columns is-multiline block"},[n("div",{staticClass:"column is-half"},[n("PieChartStat",{attrs:{"chart-data":t.statsByDifficulty}})],1),t._v(" "),n("div",{staticClass:"column is-half"},[n("PieChartStat",{attrs:{"chart-data":t.statsByCategory}})],1),t._v(" "),n("div",{staticClass:"column is-full"},[n("TimeSeriesStat",{attrs:{"chart-data":t.statsByMonth}})],1)]),t._v(" "),n("h2",[t._v("ユーザー一覧")]),t._v(" "),n("table",{staticClass:"table"},[t._m(1),t._v(" "),n("tbody",t._l(t.users,(function(e){return n("tr",{key:e.id},[n("td",[n("nuxt-link",{attrs:{to:"/users/"+e.id}},[n("img",{staticClass:"index-icon",attrs:{src:t.getUserIcon(t.getUser(e.id)),srcset:t.getUserIcon(t.getUser(e.id))+" 1x, "+t.getUserIcon2x(t.getUser(e.id))+" 2x"}}),t._v("\n\t\t\t\t\t\t"+t._s(t.getUserName(t.getUser(e.id)))+"\n\t\t\t\t\t")])],1)])})),0)])],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("日時")]),t._v(" "),n("th",[t._v("アクティビティ")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("名前")])])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{UnauthorizedNotification:n(268).default,DifficultyBadge:n(266).default,PieChartStat:n(428).default,TimeSeriesStat:n(429).default})}}]);