(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return e(6756)}])},6342:function(n,t,e){"use strict";var r=e(5893),o=e(7294),i=e(872),a=e(4017),s=e(1163),c=e(6863),l=e(3122),u=e.n(l);t.Z=function(){var n=(0,s.useRouter)(),t=(0,o.useState)(!1),e=t[0],l=t[1],f=function(t){l(!0),n.push(t)};return(0,r.jsx)("nav",{className:u().host,children:(0,r.jsxs)(c.Z,{children:[(0,r.jsx)(a.Z,{size:"small",disabled:e||n.pathname===i.tL,onClick:function(){return f(i.tL)},children:"Welcome screen"}),(0,r.jsx)(a.Z,{size:"small",disabled:e||n.pathname===i.Z9,onClick:function(){return f(i.Z9)},children:"Main app page"})]})})}},9799:function(n,t,e){"use strict";e.d(t,{Y:function(){return p}});var r=e(5893),o=e(8862),i=e(9501),a=e(7294),s=e(2899),c=e.n(s);function l(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function u(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var e=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=e){var r,o,i=[],a=!0,s=!1;try{for(e=e.call(n);!(a=(r=e.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(c){s=!0,o=c}finally{try{a||null==e.return||e.return()}finally{if(s)throw o}}return i}}(n,t)||function(n,t){if(!n)return;if("string"===typeof n)return l(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return l(n,t)}(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var f=function(n){var t=n.children,e=n.textContent,s=u(a.useState(null),2),l=s[0],f=s[1],h=Boolean(l),d=h?"simple-popover":void 0;return(0,r.jsxs)("span",{className:c().host,children:[(0,r.jsx)("span",{"aria-describedby":d,onClick:function(n){f(n.currentTarget)},children:t}),(0,r.jsx)(i.ZP,{id:d,open:h,anchorEl:l,onClose:function(){f(null)},anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"bottom",horizontal:"left"},children:(0,r.jsx)(o.Z,{sx:{p:3},className:c().textContent,children:e})})]})},h=e(912),d=e.n(h),p=function(n){var t=n.popoverTextContent,e=n.titleTextContent,i=n.titleVariant,a=void 0===i?"h6":i;return(0,r.jsxs)(o.Z,{variant:a,component:"h2",className:d().host,children:[(0,r.jsx)(f,{textContent:t,children:(0,r.jsx)("i",{className:["fad fa-info-circle fa-sm",d().icon].join(" ")})}),(0,r.jsx)("span",{className:d().title,children:e})]})}},6756:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return N}});var r=e(5893),o=e(7294),i=e(5152),a=e(1163),s=e(872),c=e(5449),l=e(2714),u=e(361),f=e.n(u),h=e(5113),d=function(){return(0,r.jsx)("section",{className:f().host,children:(0,r.jsx)(h.Z,{elevation:3,className:f().iconSection,children:(0,r.jsxs)("span",{className:f().animateIcons,children:[(0,r.jsx)("i",{className:"fad fa-user-robot"}),(0,r.jsx)("i",{className:"fad fa-user-robot"}),(0,r.jsx)("i",{className:"fad fa-user-robot"}),(0,r.jsx)("i",{className:"fad fa-user-robot"})]})})})},p=e(6342),m=e(6719),_=e.n(m),x=e(9799),v=e(7579),j=e.n(v),b=(0,i.default)((function(){return Promise.all([e.e(581),e.e(770),e.e(260)]).then(e.bind(e,9770))}),{loadableGenerated:{webpack:function(){return[9770]}},ssr:!1}),w=function(){return(0,r.jsxs)("section",{className:j().host,children:[(0,r.jsx)(x.Y,{popoverTextContent:"Control the use of the main, standard thread. In this case, no Worker\n                        will\n                        be\n                        used.Causes loss of GUI smoothness. Animations may be slowed down. Try to\n                        start\n                        with\n                        a low values.",titleTextContent:"The main thread of the browser",titleVariant:"h5"}),(0,r.jsx)(b,{workerKey:l.Nc})]})},N=function(){var n=(0,i.default)((function(){return Promise.all([e.e(581),e.e(915),e.e(770),e.e(428)]).then(e.bind(e,8345))}),{loadableGenerated:{webpack:function(){return[8345]}},ssr:!1}),t=(0,a.useRouter)();return(0,o.useEffect)((function(){var n=(0,c.q)(l.wk);return"string"===typeof n?n!==l.Gp.true&&t.push(s.tL):t.push(s.tL),function(){}}),[t]),(0,r.jsxs)("main",{children:[(0,r.jsx)(d,{}),(0,r.jsx)("nav",{className:_().navigationButtons,children:(0,r.jsx)(p.Z,{})}),(0,r.jsx)("div",{className:_().mainThread,children:(0,r.jsx)(w,{})}),(0,r.jsx)(n,{})]})}},7579:function(n){n.exports={host:"MainThreadSwitch_host__2RlDt"}},3122:function(n){n.exports={host:"NavLinks_host__h1G27"}},912:function(n){n.exports={host:"PopoverTitle_host__9gG_0",title:"PopoverTitle_title__p1l5e",icon:"PopoverTitle_icon__ZFdAI"}},361:function(n){n.exports={host:"previewAnimation_host__QQu2f",iconSection:"previewAnimation_iconSection__C1ndY",animateIcons:"previewAnimation_animateIcons__l0mgP",loopedMove:"previewAnimation_loopedMove__DExlM"}},2899:function(n){n.exports={host:"Popover_host__Egkz0"}},6719:function(n){n.exports={navigationButtons:"index_navigationButtons__8NPwQ",mainThread:"index_mainThread__R_SxS"}}},function(n){n.O(0,[417,774,888,179],(function(){return t=5301,n(n.s=t);var t}));var t=n.O();_N_E=t}]);