(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0c5d2072"],{"4b85":function(t,e,r){},"761b":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-toolbar",{attrs:{flat:"",color:"grey lighten-3"}},[r("v-btn",{attrs:{icon:""},on:{click:t.goHome}},[r("v-icon",[t._v("mdi-arrow-left")])],1),r("v-toolbar-title",[t._v("Home")])],1),r("v-container",[t._v(" Hello ")])],1)},n=[],o={name:"EditAccount",data:function(){return{}},methods:{goHome:function(){this.$router.push("/home")}},beforeCreate:function(){this.$store.state.loggedIn||(this.$store.commit("setSnackbarText",{snackbarText:"Log in first"}),this.$store.commit("setSnackbarVisibility",{visible:!0}),this.$router.push("/"))}},s=o,i=r("2877"),c=r("6544"),l=r.n(c),f=r("8336"),d=r("a523"),u=r("132d"),b=r("71d9"),p=r("2a7f"),v=Object(i["a"])(s,a,n,!1,null,null,null);e["default"]=v.exports;l()(v,{VBtn:f["a"],VContainer:d["a"],VIcon:u["a"],VToolbar:b["a"],VToolbarTitle:p["a"]})},a523:function(t,e,r){"use strict";r("99af"),r("4de4"),r("b64b"),r("2ca0"),r("20f6"),r("4b85"),r("a15b"),r("498a");var a=r("2b0e");function n(t){return a["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,r){var a=r.props,n=r.data,o=r.children;n.staticClass="".concat(t," ").concat(n.staticClass||"").trim();var s=n.attrs;if(s){n.attrs={};var i=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}));i.length&&(n.staticClass+=" ".concat(i.join(" ")))}return a.id&&(n.domProps=n.domProps||{},n.domProps.id=a.id),e(a.tag,n,o)}})}var o=r("d9f7");e["a"]=n("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var r,a=e.props,n=e.data,s=e.children,i=n.attrs;return i&&(n.attrs={},r=Object.keys(i).filter((function(t){if("slot"===t)return!1;var e=i[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}))),a.id&&(n.domProps=n.domProps||{},n.domProps.id=a.id),t(a.tag,Object(o["a"])(n,{staticClass:"container",class:Array({"container--fluid":a.fluid}).concat(r||[])}),s)}})},d28b:function(t,e,r){var a=r("746f");a("iterator")},d9f7:function(t,e,r){"use strict";r.d(e,"a",(function(){return f}));r("a4d3"),r("e01a"),r("d28b"),r("99af"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("d3b7"),r("ac1f"),r("3ca3"),r("1276"),r("498a"),r("159b"),r("ddb0");var a=r("2fa7"),n=r("e587"),o=r("80d2");function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(r,!0).forEach((function(e){Object(a["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var c={styleList:/;(?![^(]*\))/g,styleProp:/:(.*)/};function l(t){var e={},r=!0,a=!1,s=void 0;try{for(var i,l=t.split(c.styleList)[Symbol.iterator]();!(r=(i=l.next()).done);r=!0){var f=i.value,d=f.split(c.styleProp),u=Object(n["a"])(d,2),b=u[0],p=u[1];b=b.trim(),b&&("string"===typeof p&&(p=p.trim()),e[Object(o["c"])(b)]=p)}}catch(v){a=!0,s=v}finally{try{r||null==l.return||l.return()}finally{if(a)throw s}}return e}function f(){var t,e,r={},a=arguments.length;while(a--)for(var n=0,o=Object.keys(arguments[a]);n<o.length;n++)switch(t=o[n],t){case"class":case"style":case"directives":if(Array.isArray(r[t])||(r[t]=[]),"style"===t){var s=void 0;s=Array.isArray(arguments[a].style)?arguments[a].style:[arguments[a].style];for(var c=0;c<s.length;c++){var f=s[c];"string"===typeof f&&(s[c]=l(f))}arguments[a].style=s}r[t]=r[t].concat(arguments[a][t]);break;case"staticClass":if(!arguments[a][t])break;void 0===r[t]&&(r[t]=""),r[t]&&(r[t]+=" "),r[t]+=arguments[a][t].trim();break;case"on":case"nativeOn":r[t]||(r[t]={});for(var d=r[t],u=0,b=Object.keys(arguments[a][t]||{});u<b.length;u++)e=b[u],d[e]?d[e]=Array().concat(d[e],arguments[a][t][e]):d[e]=arguments[a][t][e];break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":r[t]||(r[t]={}),r[t]=i({},arguments[a][t],{},r[t]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:r[t]||(r[t]=arguments[a][t])}return r}}}]);
//# sourceMappingURL=chunk-0c5d2072.cf15f134.js.map