function nl2br(e){return e.replace(/([^>])\n/g,"$1<br/>\n")}function randomHexColorCode(){return"#"+(1048575*Math.random()*1e6).toString(16).slice(0,6)}function randomString(e){for(var t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",n=t.length,o="",r=0;r<e;r++)o+=t.charAt(Math.floor(Math.random()*n));return o}function formatMoney(e){for(var t=e.toString(),n=/(-?\d+)(\d{3})/;n.test(t);)t=t.replace(n,"$1,$2");return t}function copyTextToClipboard(e){var t=document.createRange();t.selectNode(document.getElementById(e));var n=window.getSelection();n.removeAllRanges(),n.addRange(t),document.execCommand("copy"),alert("複製成功")}function copyTxt(){document.getElementById("aa").select(),document.execCommand("Copy"),alert("已複製好，可貼粘。")}function escapeHTML(e){return e.replace(/[&<>'"]/g,function(e){return{"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[e]||e})}function getRandom(e,t){return Math.floor(Math.random()*(t-e+1))+e}function round(e,t){return void 0===t&&(t=0),Number(Math.round(e+"e"+t)+"e-"+t)}function imagePreload(e){(new Image).src=e}function isRepeat(e){for(var t=JSON.stringify(e),n=0;n<e.length;n++)if(1<t.match(new RegExp(e[n],"g")).length)return!0;return!1}function uniqArray(e){return e.filter(function(e,t,n){return n.indexOf(e)===t})}function flatArray(e,n){return void 0===n&&(n=1),e.reduce(function(e,t){return e.concat(1<n&&Array.isArray(t)?flatArray(t,n-1):t)},[])}function indexOfAll(e,o){return e.reduce(function(e,t,n){return t===o?e.concat([n]):e},[])}function intersection(e,t){var n=new Set(t);return e.filter(function(e){return n.has(e)})}function shuffle(e){for(var t,n=e.slice(0),o=n.length;o;){var r=Math.floor(Math.random()*o--);t=[n[r],n[o]],n[o]=t[0],n[r]=t[1]}return n}function typeOf(e){return void 0===e?"undefined":null===e?"null":e.constructor.name.toLowerCase()}function deepCopy(e){var t,n=typeOf(e);if("array"===n)t=[];else{if("object"!==n)return e;t={}}if("array"===n)for(var o=0;o<e.length;o++)t.push(deepCopy(e[o]));else if("object"===n)for(var o in e)t[o]=deepCopy(e[o]);return t}function getColonTimeFromDate(e){return e.toTimeString().slice(0,8)}function getDaysDiffBetweenDates(e,t){return(t-e)/864e5}function isAfterDate(e,t){return t<e}function isBeforeDate(e,t){return e<t}function getDiffDate(e){var t=new Date;return t.setDate(t.getDate()+e),t.toISOString().split("T")[0]}function timeFormat(e){var t,n=new Date(e),o=new Date,r=n.getFullYear(),i=n.getMonth()+10,c=n.getDate(),a=n.getHours(),u=n.getMinutes(),l=o.getFullYear(),d=o.getHours();if(r<l)t=r+"年"+i+"月"+c+"日 "+a+":"+u;else{var s=(o-n)/36e5;if(d<s)t=i+"月"+c+"日 "+a+":"+u;else if(1<=s)t="今天 "+a+":"+u+"分";else{var m=o.getMinutes()-u;t=1<m?m+"分鐘前":"剛剛"}}return t}function uniqueId(){return Number(new Date).toString()+parseInt(10*Math.random())+parseInt(10*Math.random())+parseInt(10*Math.random())}function anchorTop(){window.scrollTo(0,0)}function anchorElement(e){var t=document.getElementById(e);window.scrollTo(0,t.offsetTop)}function anchorBottom(){window.scrollTo(0,document.body.scrollHeight)}function scrollToTop(){var e=document.documentElement.scrollTop||document.body.scrollTop;0<e&&(window.requestAnimationFrame(scrollToTop),window.scrollTo(0,e-e/8))}function smoothScroll(e){document.querySelector(e).scrollIntoView({behavior:"smooth"})}function getScrollPosition(e){return void 0===e&&(e=window),{x:void 0!==e.pageXOffset?e.pageXOffset:e.scrollLeft,y:void 0!==e.pageYOffset?e.pageYOffset:e.scrollTop}}function getInitZoom(){if(!this._initZoom){var e=Math.min(screen.height,screen.width);this.isAndroidMobileDevice()&&!this.isNewChromeOnAndroid()&&(e/=window.devicePixelRatio),this._initZoom=e/document.body.offsetWidth}return this._initZoom}function getPageHeight(){var e=document,t=e.body,n=e.documentElement,o="BackCompat"==e.compatMode?t:e.documentElement;return Math.max(n.scrollHeight,t.scrollHeight,o.clientHeight)}function getPageScrollLeft(){var e=document;return e.documentElement.scrollLeft||e.body.scrollLeft}function getPageScrollTop(){var e=document;return e.documentElement.scrollTop||e.body.scrollTop}function getPageViewHeight(){var e=document;return("BackCompat"==e.compatMode?e.body:e.documentElement).clientHeight}function getPageViewWidth(){var e=document;return("BackCompat"==e.compatMode?e.body:e.documentElement).clientWidth}function getPageWidth(){var e=document,t=e.body,n=e.documentElement,o="BackCompat"==e.compatMode?t:e.documentElement;return Math.max(n.scrollWidth,t.scrollWidth,o.clientWidth)}function getScreenWidth(){var e=Math.min(screen.width,screen.height),t=rendererModel.runningExperiments.FixViewport||rendererModel.runningExperiments.fixviewport;t&&t.toLowerCase();return t&&this.isAndroidMobileDevice()&&!this.isNewChromeOnAndroid()&&(e/=window.devicePixelRatio),e}function getScrollXY(){return document.body.scrollTop?{x:document.body.scrollLeft,y:document.body.scrollTop}:{x:document.documentElement.scrollLeft,y:document.documentElement.scrollTop}}function getViewSize(){var e=document.documentElement,t=document.body,n=0==e.clientWidth?t.clientWidth:e.clientWidth,o=0==e.clientHeight?t.clientHeight:e.clientHeight;return Array(n,o)}function getZoom(){var e=90===Math.abs(window.orientation)?Math.max(screen.height,screen.width):Math.min(screen.height,screen.width);this.isAndroidMobileDevice()&&!this.isNewChromeOnAndroid()&&(e/=window.devicePixelRatio);var t=rendererModel.runningExperiments.FixViewport||rendererModel.runningExperiments.fixviewport;return t&&("New"===t||"new"===t)?e/window.innerWidth:e/document.body.offsetWidth}function isURL(e){return/^(https:\/\/|http:\/\/|ftp:\/\/|rtsp:\/\/|mms:\/\/)?[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(e)}function isIP(e){return/^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/.test(e)}function isIPv6(e){return Boolean(e.match(/:/g)?e.match(/:/g).length<=7:/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(e))}function loadStyle(t){try{document.createStyleSheet(t)}catch(e){var n=document.createElement("link");n.rel="stylesheet",n.type="text/css",n.href=t,document.getElementsByTagName("head")[0].appendChild(n)}}function getLocalStorage(e){return localStorage.getItem(e)}function setLocalStorage(e,t){localStorage.setItem(e,t)}function getCookie(e){var t=document.cookie.match(new RegExp("(^| )"+e+"=([^;]*)(;|$)"));return null!=t?unescape(t[2]):null}function setCookie(e,t,n){var o=new Date,r=o.getTime()+6e4*o.getTimezoneOffset(),i=new Date(r+288e5);i.setTime(i.getTime()+60*n*60*1e3),document.cookie=e+"="+escape(t)+";path=/;expires="+i.toGMTString()+";domain=360doc.com;"}function insertPlugin(e){var t=document.createElement("script");t.setAttribute("src",e),document.head.appendChild(t)}function queryString(e){var t=location.href;if(-1!=t.indexOf("?"))for(var n=t.split("?")[1].split("&"),o=0;o<n.length;o++)if(n[o].split("=")[0]==e)return n[o].split("=")[1]}function httpsRedirect(){"https:"!==location.protocol&&location.replace("https://"+location.href.split("//")[1])}function getUrlState(e){var t=new ActiveXObject("microsoft.xmlhttp");t.Open("GET",e,!1);try{t.Send()}catch(e){}finally{return!!t.responseText&&200==t.Status}}function isMobileUserAgent(){return/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase())}function isAppleMobileDevice(){return/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase())}function isAndroidMobileDevice(){return/android/i.test(navigator.userAgent.toLowerCase())}
//# sourceMappingURL=ud-utils.js.map