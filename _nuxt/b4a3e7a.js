(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{374:function(t,e,r){"use strict";r.r(e);r(44),r(36),r(62),r(63),r(49),r(14),r(45);var n=r(23),o=r(89);function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function l(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var f={props:{required:{type:Boolean,default:!1}},data:function(){return{url:""}},computed:l(l({},Object(o.d)({isUnauthorized:function(t){return t.slackInfos.isUnauthorized}})),{},{loginUrl:function(){var t="/?return_to=".concat(encodeURIComponent(this.url));return"https://slackbot-api.tsg.ne.jp/oauth2/start?rd=".concat(encodeURIComponent(t))}}),created:function(){this.url=location.href}},d=r(70),component=Object(d.a)(f,(function(){var t=this,e=t._self._c;return t.isUnauthorized?e("div",{staticClass:"notification is-danger"},[t.required?e("span",[t._v("\n\t\tこのページの閲覧にはログインが必要です。"),e("a",{attrs:{href:t.loginUrl}},[t._v("こちら")]),t._v("からログインしてください。\n\t")]):e("span",[t._v("\n\t\tログインしていないためユーザー名などの情報は表示されません。あなたがTSGerである場合は"),e("a",{attrs:{href:t.loginUrl}},[t._v("こちら")]),t._v("からログインしてください。\n\t")])]):t._e()}),[],!1,null,null,null);e.default=component.exports}}]);