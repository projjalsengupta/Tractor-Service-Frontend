(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-54308660"],{"132d":function(t,e,r){"use strict";r("a4d3"),r("4de4"),r("7db0"),r("4160"),r("caad"),r("c975"),r("fb6a"),r("45fc"),r("a9e3"),r("e439"),r("dbb4"),r("b64b"),r("2532"),r("498a"),r("c96a"),r("159b");var n,a=r("2fa7"),i=(r("4804"),r("7e2b")),s=r("a9ad"),o=r("af2b"),c=r("7560"),l=r("80d2"),u=r("2b0e"),d=r("58df");function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?f(r,!0).forEach((function(e){Object(a["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):f(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function h(t){return["fas","far","fal","fab"].some((function(e){return t.includes(e)}))}function b(t){return/^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(t)&&/[\dz]$/i.test(t)&&t.length>4}(function(t){t["xSmall"]="12px",t["small"]="16px",t["default"]="24px",t["medium"]="28px",t["large"]="36px",t["xLarge"]="40px"})(n||(n={}));var v=Object(d["a"])(i["a"],s["a"],o["a"],c["a"]).extend({name:"v-icon",props:{dense:Boolean,disabled:Boolean,left:Boolean,right:Boolean,size:[Number,String],tag:{type:String,required:!1,default:"i"}},computed:{medium:function(){return!1}},methods:{getIcon:function(){var t="";return this.$slots.default&&(t=this.$slots.default[0].text.trim()),Object(l["A"])(this,t)},getSize:function(){var t={xSmall:this.xSmall,small:this.small,medium:this.medium,large:this.large,xLarge:this.xLarge},e=Object(l["y"])(t).find((function(e){return t[e]}));return e&&n[e]||Object(l["g"])(this.size)},getDefaultData:function(){var t=Boolean(this.listeners$.click||this.listeners$["!click"]),e={staticClass:"v-icon notranslate",class:{"v-icon--disabled":this.disabled,"v-icon--left":this.left,"v-icon--link":t,"v-icon--right":this.right,"v-icon--dense":this.dense},attrs:p({"aria-hidden":!t,role:t?"button":null},this.attrs$),on:this.listeners$};return e},applyColors:function(t){t.class=p({},t.class,{},this.themeClasses),this.setTextColor(this.color,t)},renderFontIcon:function(t,e){var r=[],n=this.getDefaultData(),a="material-icons",i=t.indexOf("-"),s=i<=-1;s?r.push(t):(a=t.slice(0,i),h(a)&&(a="")),n.class[a]=!0,n.class[t]=!s;var o=this.getSize();return o&&(n.style={fontSize:o}),this.applyColors(n),e(this.tag,n,r)},renderSvgIcon:function(t,e){var r=this.getDefaultData();r.class["v-icon--svg"]=!0,r.attrs={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",height:"24",width:"24",role:"img","aria-hidden":!this.attrs$["aria-label"],"aria-label":this.attrs$["aria-label"]};var n=this.getSize();return n&&(r.style={fontSize:n,height:n,width:n},r.attrs.height=n,r.attrs.width=n),this.applyColors(r),e("svg",r,[e("path",{attrs:{d:t}})])},renderSvgIconComponent:function(t,e){var r=this.getDefaultData();r.class["v-icon--is-component"]=!0;var n=this.getSize();n&&(r.style={fontSize:n,height:n}),this.applyColors(r);var a=t.component;return r.props=t.props,r.nativeOn=r.on,e(a,r)}},render:function(t){var e=this.getIcon();return"string"===typeof e?b(e)?this.renderSvgIcon(e,t):this.renderFontIcon(e,t):this.renderSvgIconComponent(e,t)}});e["a"]=u["a"].extend({name:"v-icon",$_wrapperFor:v,functional:!0,render:function(t,e){var r=e.data,n=e.children,a="";return r.domProps&&(a=r.domProps.textContent||r.domProps.innerHTML||a,delete r.domProps.textContent,delete r.domProps.innerHTML),t(v,r,a?[a]:n)}})},4804:function(t,e,r){},"4b85":function(t,e,r){},"761b":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-toolbar",{attrs:{flat:"",color:"grey lighten-3"}},[r("v-btn",{attrs:{icon:""},on:{click:t.goHome}},[r("v-icon",[t._v("mdi-arrow-left")])],1),r("v-toolbar-title",[t._v("Home")])],1),r("v-container",[t._v(" Hello ")])],1)},a=[],i={name:"EditAccount",data:function(){return{}},methods:{goHome:function(){this.$router.push("/home")}},beforeCreate:function(){this.$store.state.loggedIn||(this.$store.commit("setSnackbarText",{snackbarText:"Log in first"}),this.$store.commit("setSnackbarVisibility",{visible:!0}),this.$router.push("/"))}},s=i,o=r("2877"),c=r("6544"),l=r.n(c),u=r("8336"),d=r("a523"),f=r("132d"),p=r("71d9"),h=r("2a7f"),b=Object(o["a"])(s,n,a,!1,null,null,null);e["default"]=b.exports;l()(b,{VBtn:u["a"],VContainer:d["a"],VIcon:f["a"],VToolbar:p["a"],VToolbarTitle:h["a"]})},a523:function(t,e,r){"use strict";r("99af"),r("4de4"),r("b64b"),r("2ca0"),r("20f6"),r("4b85"),r("a15b"),r("498a");var n=r("2b0e");function a(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,r){var n=r.props,a=r.data,i=r.children;a.staticClass="".concat(t," ").concat(a.staticClass||"").trim();var s=a.attrs;if(s){a.attrs={};var o=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(a.attrs[t]=e,!1):e||"string"===typeof e}));o.length&&(a.staticClass+=" ".concat(o.join(" ")))}return n.id&&(a.domProps=a.domProps||{},a.domProps.id=n.id),e(n.tag,a,i)}})}var i=r("d9f7");e["a"]=a("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var r,n=e.props,a=e.data,s=e.children,o=a.attrs;return o&&(a.attrs={},r=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(a.attrs[t]=e,!1):e||"string"===typeof e}))),n.id&&(a.domProps=a.domProps||{},a.domProps.id=n.id),t(n.tag,Object(i["a"])(a,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(r||[])}),s)}})},d28b:function(t,e,r){var n=r("746f");n("iterator")},d9f7:function(t,e,r){"use strict";r.d(e,"a",(function(){return u}));r("a4d3"),r("e01a"),r("d28b"),r("99af"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("d3b7"),r("ac1f"),r("3ca3"),r("1276"),r("498a"),r("159b"),r("ddb0");var n=r("2fa7"),a=r("e587"),i=r("80d2");function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(r,!0).forEach((function(e){Object(n["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var c={styleList:/;(?![^(]*\))/g,styleProp:/:(.*)/};function l(t){var e={},r=!0,n=!1,s=void 0;try{for(var o,l=t.split(c.styleList)[Symbol.iterator]();!(r=(o=l.next()).done);r=!0){var u=o.value,d=u.split(c.styleProp),f=Object(a["a"])(d,2),p=f[0],h=f[1];p=p.trim(),p&&("string"===typeof h&&(h=h.trim()),e[Object(i["c"])(p)]=h)}}catch(b){n=!0,s=b}finally{try{r||null==l.return||l.return()}finally{if(n)throw s}}return e}function u(){var t,e,r={},n=arguments.length;while(n--)for(var a=0,i=Object.keys(arguments[n]);a<i.length;a++)switch(t=i[a],t){case"class":case"style":case"directives":if(Array.isArray(r[t])||(r[t]=[]),"style"===t){var s=void 0;s=Array.isArray(arguments[n].style)?arguments[n].style:[arguments[n].style];for(var c=0;c<s.length;c++){var u=s[c];"string"===typeof u&&(s[c]=l(u))}arguments[n].style=s}r[t]=r[t].concat(arguments[n][t]);break;case"staticClass":if(!arguments[n][t])break;void 0===r[t]&&(r[t]=""),r[t]&&(r[t]+=" "),r[t]+=arguments[n][t].trim();break;case"on":case"nativeOn":r[t]||(r[t]={});for(var d=r[t],f=0,p=Object.keys(arguments[n][t]||{});f<p.length;f++)e=p[f],d[e]?d[e]=Array().concat(d[e],arguments[n][t][e]):d[e]=arguments[n][t][e];break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":r[t]||(r[t]={}),r[t]=o({},arguments[n][t],{},r[t]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:r[t]||(r[t]=arguments[n][t])}return r}}}]);
//# sourceMappingURL=chunk-54308660.5e761338.js.map