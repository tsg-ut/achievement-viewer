(window.webpackJsonp=window.webpackJsonp||[]).push([[18,12],{374:function(t,e,r){"use strict";r.r(e);r(44),r(36),r(62),r(63),r(49),r(14),r(45);var n=r(23),o=r(89);function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function l(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var d={props:{required:{type:Boolean,default:!1}},data:function(){return{url:""}},computed:l(l({},Object(o.d)({isUnauthorized:function(t){return t.slackInfos.isUnauthorized}})),{},{loginUrl:function(){var t="/?return_to=".concat(encodeURIComponent(this.url));return"https://slackbot-api.tsg.ne.jp/oauth2/start?rd=".concat(encodeURIComponent(t))}}),created:function(){this.url=location.href}},f=r(70),component=Object(f.a)(d,(function(){var t=this,e=t._self._c;return t.isUnauthorized?e("div",{staticClass:"notification is-danger"},[t.required?e("span",[t._v("\n\t\tこのページの閲覧にはログインが必要です。"),e("a",{attrs:{href:t.loginUrl}},[t._v("こちら")]),t._v("からログインしてください。\n\t")]):e("span",[t._v("\n\t\tログインしていないためユーザー名などの情報は表示されません。あなたがTSGerである場合は"),e("a",{attrs:{href:t.loginUrl}},[t._v("こちら")]),t._v("からログインしてください。\n\t")])]):t._e()}),[],!1,null,null,null);e.default=component.exports},439:function(t,e,r){var content=r(553);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(65).default)("e59673d8",content,!0,{sourceMap:!1})},552:function(t,e,r){"use strict";r(439)},553:function(t,e,r){var n=r(64)((function(i){return i[1]}));n.push([t.i,".topics.table td,.topics.table th{padding-left:.25em;padding-right:.25em}.topic-text{line-break:anywhere;min-width:20em}.topic-icon{height:24px;vertical-align:bottom;width:24px}.topic-like,.topic-slacklog,.topic-timestamp{white-space:nowrap;width:1%}.topic-like{color:#ff1493;cursor:pointer}.topic-like .icon{vertical-align:bottom}",""]),n.locals={},t.exports=n},597:function(t,e,r){"use strict";r.r(e);r(44),r(62),r(63),r(49),r(45);var n=r(23),o=r(5),c=(r(36),r(54),r(14),r(42),r(166),r(43),r(30),r(377)),l=r.n(c),d=r(399),f=r.n(d),m=r(89),v=r(409),h=r.n(v);function _(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function y(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?_(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):_(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var k={data:function(){return{isLoading:!0,sortBy:"timestamp"}},fetch:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=t.store,e.next=6;break;case 4:return e.next=6,r.dispatch("slackInfos/initTopicMessages");case 6:case"end":return e.stop()}}),e)})))()},head:function(){return{title:"sandboxのトピックログ - achievement-viewer"}},computed:y(y(y({},Object(m.d)({topicMessages:function(t){return t.slackInfos.topicMessages.filter((function(t){var e,r=t.message;return null==r||null===(e=r.reactions)||void 0===e?void 0:e.some((function(t){var e=t.name,r=t.count;return"koresuki"===e&&r>=3}))}))}})),Object(m.c)("slackInfos",["getUser"])),{},{sortedTopics:function(){var t=this;return"timestamp"===this.sortBy?h()(this.topicMessages,(function(t){return t.message.ts})).reverse():"username"===this.sortBy?h()(this.topicMessages,[function(e){var r=e.message;return t.getUserName(r)},function(t){var e=t.message;return-parseFloat(e.ts)}]):"likes"===this.sortBy?h()(this.topicMessages,[function(t){return-t.likes.length},function(t){var e=t.message;return-parseFloat(e.ts)}]):"random"===this.sortBy?h()(this.topicMessages,[function(t){return t.randomSortKey}]):this.topicMessages}}),mounted:function(){var t=this;Promise.all([this.$store.dispatch("slackInfos/initUsers"),this.$store.dispatch("slackInfos/initTopicMessages")]).then((function(){t.isLoading=!1}))},methods:y(y({},Object(m.b)({likeTopicMessage:"slackInfos/likeTopicMessage",unlikeTopicMessage:"slackInfos/unlikeTopicMessage"})),{},{toggleTopicMessageLike:function(t,e){e?this.unlikeTopicMessage({ts:t.ts}):this.likeTopicMessage({ts:t.ts})},getUserName:function(t){if(t.username)return t.username;if(t.user&&t.user.startsWith("U")){var e=this.getUser(t.user),r=l()(e,["profile","display_name"],!1)||l()(e,["real_name"],!1)||"匿名ユーザー";return"@".concat(r)}return"@匿名ユーザー"},getUserIcon:function(t){var e;if(null!=t&&null!==(e=t.icons)&&void 0!==e&&e.image_48)return t.icons.image_48;if(t.user&&t.user.startsWith("U")){var r=this.getUser(t.user);return l()(r,["profile","image_24"],"/images/anonymous-icon_24.png")}return"/images/anonymous-icon_24.png"},getTime:function(t){var e=parseFloat(t);return f()(1e3*e).format("YYYY/MM/DD")}})},O=(r(552),r(70)),component=Object(O.a)(k,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"container is-max-desktop"},[t.isLoading?e("progress",{staticClass:"progress is-small is-primary",attrs:{max:"100"}}):t._e(),t._v(" "),e("unauthorized-notification",{attrs:{required:""}}),t._v(" "),e("p",{staticClass:"title"},[t._v("sandboxのトピックログ")]),t._v(" "),e("div",{staticClass:"control is-spaced"},[t._v("\n\t\t並び替え:\n\t\t"),e("label",{staticClass:"radio"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.sortBy,expression:"sortBy"}],attrs:{type:"radio",id:"timestamp",value:"timestamp"},domProps:{checked:t._q(t.sortBy,"timestamp")},on:{change:function(e){t.sortBy="timestamp"}}}),t._v("\n\t\t\t新しい順\n\t\t")]),t._v(" "),e("label",{staticClass:"radio"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.sortBy,expression:"sortBy"}],attrs:{type:"radio",id:"username",value:"username"},domProps:{checked:t._q(t.sortBy,"username")},on:{change:function(e){t.sortBy="username"}}}),t._v("\n\t\t\tユーザー順\n\t\t")]),t._v(" "),e("label",{staticClass:"radio"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.sortBy,expression:"sortBy"}],attrs:{type:"radio",id:"likes",value:"likes"},domProps:{checked:t._q(t.sortBy,"likes")},on:{change:function(e){t.sortBy="likes"}}}),t._v("\n\t\t\tお気に入り順\n\t\t")]),t._v(" "),e("label",{staticClass:"radio"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.sortBy,expression:"sortBy"}],attrs:{type:"radio",id:"random",value:"random"},domProps:{checked:t._q(t.sortBy,"random")},on:{change:function(e){t.sortBy="random"}}}),t._v("\n\t\t\tランダム\n\t\t")])]),t._v(" "),e("div",{staticClass:"table-container"},[e("table",{staticClass:"table topics"},[e("tbody",t._l(t.sortedTopics,(function(r){var n=r.message,o=r.likes,c=r.isLiked;return e("tr",{key:n.ts},[e("td",{staticClass:"topic-text"},[n.user?e("nuxt-link",{attrs:{to:"/users/".concat(n.user)}},[e("img",{staticClass:"topic-icon",attrs:{src:t.getUserIcon(n)}}),t._v("\n\t\t\t\t\t\t\t"+t._s(t.getUserName(n))+"\n\t\t\t\t\t\t")]):e("span",[e("img",{staticClass:"topic-icon",attrs:{src:t.getUserIcon(n)}}),t._v("\n\t\t\t\t\t\t\t"+t._s(t.getUserName(n))+"\n\t\t\t\t\t\t")]),t._v(" "),e("strong",[t._v(t._s(n.text))])],1),t._v(" "),e("td",{staticClass:"topic-like"},[e("span",{staticClass:"icon",on:{click:function(e){return t.toggleTopicMessageLike(n,c)}}},[e("i",c?{staticClass:"ri-heart-fill"}:{staticClass:"ri-heart-line"})]),t._v(t._s(o.length)+"\n\t\t\t\t\t")]),t._v(" "),e("td",{staticClass:"topic-timestamp"},[t._v("\n\t\t\t\t\t\t"+t._s(t.getTime(n.ts))+"\n\t\t\t\t\t")]),t._v(" "),e("td",{staticClass:"topic-slacklog"},[e("a",{attrs:{href:"https://slack-log.tsg.ne.jp/C7AAX50QY/"+n.ts,target:"_blank",rel:"noopener nereferrer"}},[t._v("\n\t\t\t\t\t\t\tslacklog"),t._m(0,!0)])])])})),0)])])],1)}),[function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("i",{staticClass:"ri-external-link-line"})])}],!1,null,null,null);e.default=component.exports;installComponents(component,{UnauthorizedNotification:r(374).default})}}]);