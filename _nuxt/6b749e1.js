(window.webpackJsonp=window.webpackJsonp||[]).push([[16,9,11],{360:function(t,e,r){"use strict";r.r(e);r(54),r(45),r(41),r(13),r(63),r(46),r(64);var n=r(31),o=r(85);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={data:function(){return{url:""}},computed:l(l({},Object(o.c)({isUnauthorized:function(t){return t.slackInfos.isUnauthorized}})),{},{loginUrl:function(){var t="/?return_to=".concat(encodeURIComponent(this.url));return"https://slackbot-api.tsg.ne.jp/oauth2/start?rd=".concat(encodeURIComponent(t))}}),created:function(){this.url=location.href}},f=r(62),component=Object(f.a)(m,(function(){var t=this,e=t._self._c;return t.isUnauthorized?e("div",{staticClass:"notification is-danger"},[t._v("\n\tログインしていないためユーザー名などの情報は表示されません。あなたがTSGerである場合は"),e("a",{attrs:{href:t.loginUrl}},[t._v("こちら")]),t._v("からログインしてください。\n")]):t._e()}),[],!1,null,null,null);e.default=component.exports},507:function(t,e,r){var content=r(530);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(66).default)("b25a9af6",content,!0,{sourceMap:!1})},528:function(t,e,r){r(68),r(39),r(67),r(158),r(55),r(86),r(103),r(557),r(35),r(71),r(558);var n=r(559).last;t.exports.getQuestionText=function(t,e){if(t.question.split("/").length>=5){var r=t.question.split("/"),o=r.slice(0,e),c=r.slice(e),l=o.join(""),m=c.map((function(t,i){return Array.from(t).map((function(t,e,r){return i===c.length-1&&e===r.length-1&&["。","？","?"].includes(t)?t:"◯"})).join("​")})).join("/");return"".concat(l,"​").concat(m)}var f=n(Array.from(t.question)),v=function(t,e){if(t.question.split("/").length>=5)return{text:"",invisibleCharacters:0};for(var text="",progress=0,r=!1,n=0,o=0,c=Array.from(t.question);o<c.length;o++){var l=c[o];progress>=e?(progress++,n++):(text+=l,r?"】"===l&&(r=!1):"【"===l?r=!0:progress++)}return{text:text,invisibleCharacters:n}}(t,e),text=v.text,h=v.invisibleCharacters,d=Array(h).fill("").map((function(t,i){return i===h-1&&["。","？","?"].includes(f)?f:"◯"})).join("​");return"".concat(text,"​").concat(d)},t.exports.getMaxProgress=function(t){if(t.question.split("/").length>=5)return t.question.split("/").length;var e=t.question.replaceAll(/【.*?】/g,"");return Array.from(e).length}},529:function(t,e,r){"use strict";r(507)},530:function(t,e,r){var n=r(65)((function(i){return i[1]}));n.push([t.i,".SlowQuizGame .question-text{word-break:break-all}.SlowQuizGame .correct-answers{margin:0 1.5rem}.SlowQuizGame .correct-answers li{margin:.5em 0}.SlowQuizGame .correct-answers .answer-icon{vertical-align:text-bottom}.SlowQuizGame .game-answer .card-header{cursor:pointer}.SlowQuizGame .timeline-marker img{width:100%}.SlowQuizGame .timeline .timeline-item{padding-bottom:0}.SlowQuizGame .timeline .timeline-item:last-child{padding-bottom:1rem}.SlowQuizGame .timeline .timeline-content{word-break:break-all}.SlowQuizGame .timeline .timeline-content .heading{margin-bottom:0}.SlowQuizGame .timeline .timeline-header-wrapper{display:flex}",""]),n.locals={},t.exports=n},533:function(t,e,r){var content=r(571);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(66).default)("2b510cec",content,!0,{sourceMap:!1})},564:function(t,e,r){"use strict";r.r(e);r(103),r(54),r(45),r(41),r(13),r(63),r(46),r(64),r(67),r(56),r(68),r(39),r(35),r(69),r(70),r(40);var n=r(33),o=r(569),c=r(31),l=(r(55),r(239),r(238),r(534)),m=r.n(l),f=r(535),v=r.n(f),h=r(365),d=r.n(h),_=r(541),w=r.n(_),y=r(554),O=r.n(y),x=r(555),j=r.n(x),C=r(565),P=r(566),k=r(85),S=r(528);function A(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return z(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return z(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var i=0,n=function(){};return{s:n,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return c=t.done,t},e:function(t){l=!0,o=t},f:function(){try{c||null==r.return||r.return()}finally{if(l)throw o}}}}function z(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,r=new Array(e);i<e;i++)r[i]=t[i];return r}function D(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function T(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?D(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):D(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var U={components:{ArrowDownIcon:C.a,ArrowUpIcon:P.a},props:{game:{type:Object,required:!0},progressType:{type:String,required:!0}},data:function(){return{progress:1,isAnswerPanelShown:!1}},computed:T(T({},Object(k.b)("slackInfos",["getUser"])),{},{questionText:function(){return Object(S.getQuestionText)(this.game,this.progress)},maxProgress:function(){return Object(S.getMaxProgress)(this.game)},formattedStartDate:function(){return m()(this.game.startDate).format("YYYY年M月D日")},formattedStartTime:function(){return m()(this.game.startDate).format("YYYY-MM-DD HH:mm:ss")},formattedRegistrationTime:function(){return m()(this.game.registrationDate).format("YYYY-MM-DD HH:mm:ss")},formattedFinishTime:function(){return m()(this.game.finishDate).format("YYYY-MM-DD HH:mm:ss")},formattedGenre:function(){return"normal"===this.game.genre?"正統派":"strange"===this.game.genre?"変化球":"anything"===this.game.genre?"なんでも":"不明"},timelineChunks:function(){var t,e=[].concat(Object(o.a)(this.game.comments.map((function(t){return T(T({},t),{},{type:"comment"})}))),Object(o.a)(this.game.correctAnswers.map((function(t){return T(T({},t),{},{type:"correctAnswer"})}))),Object(o.a)(this.game.wrongAnswers.map((function(t){return T(T({},t),{},{type:"wrongAnswer"})})))),r=j()(Object.entries(w()(e,(function(t){return t.days}))),(function(t){var e=Object(n.a)(t,1)[0];return parseInt(e)})),c=A(r);try{for(c.s();!(t=c.n()).done;){Object(n.a)(t.value,2)[1].sort((function(a,b){return(a.date||0)-(b.date||0)}))}}catch(t){c.e(t)}finally{c.f()}return r}}),watch:{progressType:function(t){if("first"===t&&this.gotoProgress(1),"first-answer"===t){var e=v()(this.game.correctAnswers);this.gotoProgress(e?e.progress:1)}if("last-answer"===t){var r=O()(this.game.correctAnswers);this.gotoProgress(r?r.progress:1)}"last"===t&&this.gotoProgress(this.maxProgress)}},methods:{incrementProgress:function(){this.progress<this.maxProgress&&this.progress++},decrementProgress:function(){this.progress>1&&this.progress--},gotoProgress:function(progress){this.progress=progress},getUserName:function(t){var e=this.getUser(t),r=d()(e,["profile","display_name"],!1)||d()(e,["real_name"],!1)||"匿名ユーザー";return"@".concat(r)},getUserIcon:function(t){var e=this.getUser(t);return d()(e,["profile","image_24"],"/images/anonymous-icon_24.png")},getUserIcon2x:function(t){var e=this.getUser(t);return d()(e,["profile","image_48"],"/images/anonymous-icon_48.png")},formatTime:function(time){return m()(time||0).format("HH:mm:ss")},getQuestionText:function(progress){return Object(S.getQuestionText)(this.game,progress)}}},Q=(r(529),r(62)),component=Object(Q.a)(U,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"SlowQuizGame box"},[e("nav",{staticClass:"pagination",attrs:{role:"navigation","aria-label":"pagination"}},[e("a",{staticClass:"pagination-previous",class:{"is-disabled":1===t.progress},on:{click:t.decrementProgress}},[t._v("\n\t\t\t1文字減らす\n\t\t")]),t._v(" "),e("a",{staticClass:"pagination-next",class:{"is-disabled":t.progress===t.maxProgress},on:{click:t.incrementProgress}},[t._v("\n\t\t\t1文字増やす\n\t\t")]),t._v(" "),e("ul",{staticClass:"pagination-list"},[t.progress>=3?e("li",[e("a",{staticClass:"pagination-link",on:{click:function(e){return t.gotoProgress(1)}}},[t._v("\n\t\t\t\t\t1\n\t\t\t\t")])]):t._e(),t._v(" "),t.progress>=4?e("li",[e("span",{staticClass:"pagination-ellipsis"},[t._v("…")])]):t._e(),t._v(" "),t.progress>=2?e("li",[e("a",{staticClass:"pagination-link",on:{click:function(e){return t.gotoProgress(t.progress-1)}}},[t._v("\n\t\t\t\t\t"+t._s(t.progress-1)+"\n\t\t\t\t")])]):t._e(),t._v(" "),e("li",[e("a",{staticClass:"pagination-link is-current"},[t._v(t._s(t.progress))])]),t._v(" "),t.progress<=t.maxProgress-1?e("li",[e("a",{staticClass:"pagination-link",on:{click:function(e){return t.gotoProgress(t.progress+1)}}},[t._v("\n\t\t\t\t\t"+t._s(t.progress+1)+"\n\t\t\t\t")])]):t._e(),t._v(" "),t.progress<=t.maxProgress-3?e("li",[e("span",{staticClass:"pagination-ellipsis"},[t._v("…")])]):t._e(),t._v(" "),t.progress<=t.maxProgress-2?e("li",[e("a",{staticClass:"pagination-link",on:{click:function(e){return t.gotoProgress(t.maxProgress)}}},[t._v("\n\t\t\t\t\t"+t._s(t.maxProgress)+"\n\t\t\t\t")])]):t._e()])]),t._v(" "),e("h2",{staticClass:"is-size-3 has-text-weight-bold question-text"},[t._v("\n\t\t"+t._s(t.questionText)+"\n\t")]),t._v(" "),e("p",{staticClass:"has-text-grey has-text-right is-size-6"},[t._v("\n\t\t"+t._s(t.getUserName(t.game.author))+" の問題 / "+t._s(t.formattedStartDate)+"出題 / ジャンル: "+t._s(t.formattedGenre)+"\n\t")]),t._v(" "),e("ol",{staticClass:"correct-answers"},t._l(t.game.correctAnswers,(function(r){return e("li",{key:r.user},[e("img",{staticClass:"answer-icon",attrs:{src:t.getUserIcon(r.user),srcset:"".concat(t.getUserIcon(r.user)," 1x, ").concat(t.getUserIcon2x(r.user)," 2x")}}),t._v("\n\t\t\t"+t._s(t.getUserName(r.user))+"\n\t\t\t("+t._s(r.progress)+"文字)\n\t\t\t"),e("a",{staticClass:"button is-small",on:{click:function(e){return t.gotoProgress(r.progress)}}},[t._v("\n\t\t\t\tここまで表示\n\t\t\t")])])})),0),t._v(" "),e("div",{staticClass:"card game-answer"},[e("header",{staticClass:"card-header",on:{click:function(e){t.isAnswerPanelShown=!t.isAnswerPanelShown}}},[e("p",{staticClass:"card-header-title"},[t._v("\n\t\t\t\t正解を表示する\n\t\t\t")]),t._v(" "),e("button",{staticClass:"card-header-icon",attrs:{type:"button"}},[e("span",{staticClass:"icon"},[t.isAnswerPanelShown?e("arrow-up-icon"):e("arrow-down-icon")],1)])]),t._v(" "),t.isAnswerPanelShown?e("div",{staticClass:"card-content"},[e("div",{staticClass:"content"},[e("div",{staticClass:"is-size-3 has-text-weight-bold question-text"},[t._v("\n\t\t\t\t\tQ. "+t._s(t.game.question)+"\n\t\t\t\t")]),t._v(" "),e("div",{staticClass:"is-size-3 has-text-weight-bold question-text"},[t._v("\n\t\t\t\t\tA. "),e("span",{staticClass:"has-text-success has-background-success-light"},[t._v(t._s(t.game.answer))])]),t._v(" "),e("p",{staticClass:"pt-1"},[t._v("読み: "+t._s(t.game.ruby))]),t._v(" "),null!==t.game.hint?e("p",[t._v("ヒント: "+t._s(t.game.hint))]):t._e(),t._v(" "),e("hr"),t._v(" "),e("div",{staticClass:"timeline"},[t._l(t.timelineChunks,(function(r){return e("div",{key:r[0]},[e("div",{staticClass:"timeline-header-wrapper"},[e("header",{staticClass:"timeline-header"},[e("span",{staticClass:"tag is-primary"},[t._v(t._s(r[0])+"日目")])]),t._v(" "),e("div",{staticClass:"has-text-grey-light is-size-7"},[t._v(t._s(t.getQuestionText(r[1][0].progress)))])]),t._v(" "),t._l(r[1],(function(r){return e("div",{key:r.date,staticClass:"timeline-item"},[e("div",{staticClass:"timeline-marker is-warning is-image is-32x32"},[e("img",{attrs:{src:t.getUserIcon(r.user),srcset:"".concat(t.getUserIcon(r.user)," 1x, ").concat(t.getUserIcon2x(r.user)," 2x")}})]),t._v(" "),e("div",{staticClass:"timeline-content"},[e("p",{staticClass:"heading"},[t._v(t._s(t.formatTime(r.date)))]),t._v(" "),e("p",{class:{"has-text-info":"comment"===r.type}},[e("span",{class:{"has-text-weight-bold":"comment"!==r.type}},[t._v(t._s(r.answer))]),t._v(" "),"correctAnswer"===r.type?e("span",{staticClass:"tag is-danger"},[t._v("正解")]):t._e()])])])}))],2)})),t._v(" "),t._m(0)],2),t._v(" "),e("ul",[e("li",[t._v("問題登録: "+t._s(t.formattedRegistrationTime))]),t._v(" "),e("li",[t._v("出題: "+t._s(t.formattedStartTime))]),t._v(" "),e("li",[t._v("回答終了: "+t._s(t.formattedFinishTime))])])])]):t._e()])])}),[function(){var t=this._self._c;return t("header",{staticClass:"timeline-header"},[t("span",{staticClass:"tag is-medium is-primary"},[this._v("回答終了")])])}],!1,null,null,null);e.default=component.exports},570:function(t,e,r){"use strict";r(533)},571:function(t,e,r){var n=r(65)((function(i){return i[1]}));n.push([t.i,".question-text{word-break:break-all}.control{margin:1rem 0}.control-label{margin-right:.5em}",""]),n.locals={},t.exports=n},714:function(t,e,r){"use strict";r.r(e);r(54),r(45),r(41),r(63),r(46),r(64);var n=r(31),o=r(5),c=(r(13),r(39),r(40),r(28),r(85));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var m={data:function(){return{isLoading:!0,progressType:"none"}},fetch:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=t.store,e.next=6;break;case 4:return e.next=6,r.dispatch("slackInfos/init");case 6:case"end":return e.stop()}}),e)})))()},head:function(){return{title:"1日1文字クイズログ - achievement-viewer"}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(c.c)({games:function(t){return t.slowQuizGames.list}})),mounted:function(){var t=this;Promise.all([this.$store.dispatch("slowQuizGames/initList"),this.$store.dispatch("slackInfos/init")]).then((function(){t.isLoading=!1}))}},f=m,v=(r(570),r(62)),component=Object(v.a)(f,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"container is-max-desktop"},[t.isLoading?e("progress",{staticClass:"progress is-small is-primary",attrs:{max:"100"}}):t._e(),t._v(" "),e("unauthorized-notification"),t._v(" "),e("p",{staticClass:"title"},[t._v("1日1文字クイズログ")]),t._v(" "),e("div",{staticClass:"control is-flex"},[e("div",{staticClass:"control-label"},[t._v("一括操作")]),t._v(" "),e("div",{staticClass:"buttons are-small"},[e("button",{staticClass:"button is-primary is-outlined",attrs:{type:"button"},on:{click:function(e){t.progressType="first"}}},[t._v("\n\t\t\t\t1文字目のみ表示\n\t\t\t")]),t._v(" "),e("button",{staticClass:"button is-primary is-outlined",attrs:{type:"button"},on:{click:function(e){t.progressType="first-answer"}}},[t._v("\n\t\t\t\t最初の正解者まで表示\n\t\t\t")]),t._v(" "),e("button",{staticClass:"button is-primary is-outlined",attrs:{type:"button"},on:{click:function(e){t.progressType="last-answer"}}},[t._v("\n\t\t\t\t最後の正解者まで表示\n\t\t\t")]),t._v(" "),e("button",{staticClass:"button is-primary is-outlined",attrs:{type:"button"},on:{click:function(e){t.progressType="last"}}},[t._v("\n\t\t\t\t最後まで表示\n\t\t\t")])])]),t._v(" "),t._l(t.games,(function(r){return e("slow-quiz-game",{key:r.id,attrs:{game:r,"progress-type":t.progressType}})}))],2)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{UnauthorizedNotification:r(360).default,SlowQuizGame:r(564).default})}}]);