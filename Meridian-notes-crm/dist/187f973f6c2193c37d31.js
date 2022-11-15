/*! For license information please see 187f973f6c2193c37d31.js.LICENSE.txt */
function _typeof(t){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof(t)}function _regeneratorRuntime(){"use strict";_regeneratorRuntime=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,r=Object.defineProperty||function(t,e,n){t[e]=n.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,n){return t[e]=n}}function u(t,e,n,o){var a=e&&e.prototype instanceof h?e:h,i=Object.create(a.prototype),s=new L(o||[]);return r(i,"_invoke",{value:x(t,n,s)}),i}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var p={};function h(){}function f(){}function d(){}var m={};c(m,a,(function(){return this}));var v=Object.getPrototypeOf,g=v&&v(v(k([])));g&&g!==e&&n.call(g,a)&&(m=g);var y=d.prototype=h.prototype=Object.create(m);function w(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){function o(r,a,i,s){var c=l(t[r],t,a);if("throw"!==c.type){var u=c.arg,p=u.value;return p&&"object"==_typeof(p)&&n.call(p,"__await")?e.resolve(p.__await).then((function(t){o("next",t,i,s)}),(function(t){o("throw",t,i,s)})):e.resolve(p).then((function(t){u.value=t,i(u)}),(function(t){return o("throw",t,i,s)}))}s(c.arg)}var a;r(this,"_invoke",{value:function(t,n){function r(){return new e((function(e,r){o(t,n,e,r)}))}return a=a?a.then(r,r):r()}})}function x(t,e,n){var r="suspendedStart";return function(o,a){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw a;return{value:void 0,done:!0}}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var s=_(i,n);if(s){if(s===p)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var c=l(t,e,n);if("normal"===c.type){if(r=n.done?"completed":"suspendedYield",c.arg===p)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r="completed",n.method="throw",n.arg=c.arg)}}}function _(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,_(t,e),"throw"===e.method))return p;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var r=l(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,p;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,p):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function T(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function k(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:R}}function R(){return{value:void 0,done:!0}}return f.prototype=d,r(y,"constructor",{value:d,configurable:!0}),r(d,"constructor",{value:f,configurable:!0}),f.displayName=c(d,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===f||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,c(t,s,"GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},w(b.prototype),c(b.prototype,i,(function(){return this})),t.AsyncIterator=b,t.async=function(e,n,r,o,a){void 0===a&&(a=Promise);var i=new b(u(e,n,r,o),a);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},w(y),c(y,s,"Generator"),c(y,a,(function(){return this})),c(y,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},t.values=k,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return i.type="throw",i.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var s=n.call(a,"catchLoc"),c=n.call(a,"finallyLoc");if(s&&c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,p):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),E(n),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;E(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:k(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),p}},t}function asyncGeneratorStep(t,e,n,r,o,a,i){try{var s=t[a](i),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(r,o)}function _asyncToGenerator(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function i(t){asyncGeneratorStep(a,r,o,i,s,"next",t)}function s(t){asyncGeneratorStep(a,r,o,i,s,"throw",t)}i(void 0)}))}}function getWorkingCases(t,e){var n=makeRequest("POST","https://stage-api.meridianmedlegal.com/api/v1/login",t,e);return console.log("httpRequest-Response"),console.log(n),n}function recentlyVisitedCases(t,e){return _recentlyVisitedCases.apply(this,arguments)}function _recentlyVisitedCases(){return(_recentlyVisitedCases=_asyncToGenerator(_regeneratorRuntime().mark((function t(e,n){var r,o,a;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,console.log("recentlyVisitedCases"),t.next=4,makeTokenRequest("https://stage-api.meridianmedlegal.com/api/v1/login",e,n);case 4:return r=t.sent,o=JSON.parse(r),console.log(o),console.log(o.data.token),t.next=10,getDashboardInfo(o.data.token);case 10:a=t.sent,console.log(a),console.log("infoFromDashboard"),t.next=18;break;case 15:t.prev=15,t.t0=t.catch(0),console.log("Error getting the cases: ",t.t0);case 18:case"end":return t.stop()}}),t,null,[[0,15]])})))).apply(this,arguments)}function getDashboardInfo(t){return _getDashboardInfo.apply(this,arguments)}function _getDashboardInfo(){return(_getDashboardInfo=_asyncToGenerator(_regeneratorRuntime().mark((function t(e){var n,r;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,makeDashboardRequest("https://stage-api.meridianmedlegal.com/api/v1/dashboard",e);case 3:n=t.sent,console.log("dashboard"),r=JSON.parse(n),console.log("Inside getDashboardInfo"),console.log(r),buildCasesHtml(r.data.recently_visited_cases),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.log("Error fetching remote HTML: ",t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})))).apply(this,arguments)}function getToken(t,e){return _getToken.apply(this,arguments)}function _getToken(){return(_getToken=_asyncToGenerator(_regeneratorRuntime().mark((function t(e,n){var r;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,makeTokenRequest("https://stage-api.meridianmedlegal.com/api/v1/login",e,n);case 3:r=t.sent,JSON.parse(r),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log("Error fetching remote HTML: ",t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))).apply(this,arguments)}function saveNoteCRM(t,e,n,r,o){return _saveNoteCRM.apply(this,arguments)}function _saveNoteCRM(){return(_saveNoteCRM=_asyncToGenerator(_regeneratorRuntime().mark((function t(e,n,r,o,a){var i,s,c;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,console.log("saveNote"),console.log(e),console.log(n),console.log(r),console.log(o),console.log(a),t.next=9,makeTokenRequest("https://stage-api.meridianmedlegal.com/api/v1/login",e,n);case 9:return i=t.sent,s=JSON.parse(i),console.log(s.data.token),t.next=14,makeStoreRequest(s.data.token,r,o,a);case 14:c=t.sent,console.log(c),console.log("infoFromDashboard"),t.next=23;break;case 19:t.prev=19,t.t0=t.catch(0),console.log("Error getting the cases: ",t.t0),alert("hubo un pex");case 23:case"end":return t.stop()}}),t,null,[[0,19]])})))).apply(this,arguments)}function makeStoreRequest(t,e,n,r){var o="https://stage-api.meridianmedlegal.com/api/v1/case/"+e+"/note/store";return new Promise((function(e,a){var i=new XMLHttpRequest;i.open("POST",o),i.setRequestHeader("Content-Type","application/json"),i.setRequestHeader("Authorization","Bearer "+t),i.onload=function(){this.status>=200&&this.status<300?e(i.response):a({status:this.status,statusText:i.statusText})},i.onerror=function(){a({status:this.status,statusText:i.errors})},i.send(JSON.stringify({description:r,subject:n,pinned:!0}))}))}function makeTokenRequest(t,e,n){return new Promise((function(r,o){var a=new XMLHttpRequest;a.open("POST",t),a.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),a.onload=function(){this.status>=200&&this.status<300?r(a.response):o({status:this.status,statusText:a.statusText})},a.onerror=function(){o({status:this.status,statusText:a.statusText})},a.send("email="+e+"&password="+n)}))}function makeDashboardRequest(t,e){return new Promise((function(n,r){var o=new XMLHttpRequest;o.open("GET",t),o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.setRequestHeader("Authorization","Bearer "+e),o.onload=function(){this.status>=200&&this.status<300?n(o.response):r({status:this.status,statusText:o.statusText})},o.onerror=function(){r({status:this.status,statusText:o.statusText})},o.send()}))}function buildCasesHtml(t){var e=document.createElement("table"),n=document.createElement("thead"),r=document.createElement("tbody"),o=document.createElement("tr"),a=document.createElement("th");a.innerHTML="Case ID";var i=document.createElement("th");i.innerHTML="Claim Number";var s=document.createElement("th");s.innerHTML="Claimant",o.appendChild(a),o.appendChild(i),o.appendChild(s),n.appendChild(o);for(var c=0;c<t.length;c++){var u=document.createElement("tr"),l=document.createElement("td");l.innerHTML=t[c].id;var p=document.createElement("td");p.innerHTML=t[c].cases.claim_number;var h=document.createElement("td");h.innerHTML=t[c].cases.claimant_full_name,u.appendChild(l),u.appendChild(p),u.appendChild(h),r.appendChild(u)}e.appendChild(n),e.appendChild(r);var f=document.getElementById("cases-list");void 0!==f&&null!=f?(document.getElementById("cases-list").innerHTML="",document.getElementById("cases-list").appendChild(e)):document.getElementById("cases-list").appendChild(e)}