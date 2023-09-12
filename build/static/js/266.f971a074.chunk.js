"use strict";(self.webpackChunkemilus=self.webpackChunkemilus||[]).push([[266],{8470:function(n,e,t){var i=t(1413),r=t(4236).Z.div((function(n){var e=n.justifyContent,t=n.alignItems,r=n.flexDirection,o=n.gap,a=n.padding,l=n.margin,u={display:"flex",justifyContent:e,alignItems:t,gap:"number"===typeof o?"".concat(o,"px"):o};return r&&(u.flexDirection=r),a&&(u.padding=a),l&&(u.margin=l),(0,i.Z)({},u)}));e.Z=r},4951:function(n,e,t){t.r(e);var i=t(4165),r=t(5861),o=t(9439),a=t(2791),l=t(2999),u=t(7615),s=t(6106),c=t(914),d=t(7888),v=t(7354),h=t(7007),f=t(8470),p=t(184),m=l.Z.Option;e.default=function(n){var e=n.parentToChild,t=u.Z.useForm(),Z=(0,o.Z)(t,1)[0],x=(0,a.useState)(!0),_=(0,o.Z)(x,2),g=_[0],j=_[1],y=(0,a.useState)([]),b=(0,o.Z)(y,2),w=b[0],S=b[1],C=(0,a.useState)([]),I=(0,o.Z)(C,2),A=I[0],k=I[1],D=(0,a.useState)([]),P=(0,o.Z)(D,2),F=P[0],O=P[1],E=(0,a.useState)([]),M=(0,o.Z)(E,2),T=M[0],V=M[1],z=function(){j(!g)},N=(0,a.useState)(localStorage.getItem("id")||""),q=(0,o.Z)(N,2),B=q[0],G=q[1],H=(0,a.useState)(localStorage.getItem("role")||""),J=(0,o.Z)(H,2),K=J[0],L=J[1],Q=function(){var n=(0,r.Z)((0,i.Z)().mark((function n(){var e,t,r,o,a,l,u,s,c,d;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e={user_id:B},n.next=3,h.ZP.post("role_based_user_list",e).then((function(n){return n})).catch((function(n){return[]}));case 3:t=n.sent,1==K&&(console.log("Super Admin"),S(null===t||void 0===t||null===(r=t.data)||void 0===r||null===(o=r.data)||void 0===o?void 0:o.user_list)),2==K&&(console.log("Admin"),k(null===t||void 0===t||null===(a=t.data)||void 0===a||null===(l=a.data)||void 0===l?void 0:l.user_list)),3==K&&(console.log("Distributor"),O(null===t||void 0===t||null===(u=t.data)||void 0===u||null===(s=u.data)||void 0===s?void 0:s.user_list)),4==K&&(console.log("Dealer"),V(null===t||void 0===t||null===(c=t.data)||void 0===c||null===(d=c.data)||void 0===d?void 0:d.subdealer_list));case 8:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),R=function(){var n=(0,r.Z)((0,i.Z)().mark((function n(e){var t,r,o,a;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return Z.setFieldValue(""),k([]),O([]),V([]),o={user_id:e},n.next=7,h.ZP.post("role_based_user_list",o).then((function(n){return n})).catch((function(n){return n}));case 7:a=n.sent,k(null===a||void 0===a||null===(t=a.data)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.user_list);case 9:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),U=function(){var n=(0,r.Z)((0,i.Z)().mark((function n(e){var t,r,o,a;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return Z.setFieldValue(""),O(""),V(""),o={user_id:e},n.next=6,h.ZP.post("role_based_user_list",o).then((function(n){return n})).catch((function(n){return n}));case 6:a=n.sent,O(null===a||void 0===a||null===(t=a.data)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.user_list);case 8:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),W=function(){var n=(0,r.Z)((0,i.Z)().mark((function n(e){var t,r,o,a;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return Z.setFieldValue(""),V([]),o={user_id:e},n.next=5,h.ZP.post("role_based_user_list",o).then((function(n){return n})).catch((function(n){return n}));case 5:a=n.sent,V(null===a||void 0===a||null===(t=a.data)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.subdealer_list);case 7:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();(0,a.useEffect)((function(){G(localStorage.getItem("id")),L(localStorage.getItem("role")),Q()}),[]);var X=function(){var n=(0,r.Z)((0,i.Z)().mark((function n(t){return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(console.log(t.type),t.id=e[0],"Sim"!=e[1]){n.next=9;break}return n.next=5,h.ZP.post("sim_transfer",t).then((function(n){return alert("Sim Transfered Successfuly")})).catch((function(n){return[]}));case 5:n.sent,z(),n.next=15;break;case 9:if("Device"!=e[1]){n.next=15;break}return t.id=e[0],n.next=13,h.ZP.post("device_transfer",t).then((function(n){return alert("Device Transfered Successfuly")})).catch((function(n){return[]}));case 13:n.sent,z();case 15:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return(0,p.jsx)(s.Z,{gutter:6,children:g&&(0,p.jsx)(c.Z,{children:(0,p.jsx)(d.Z,{title:"Assign Form",children:(0,p.jsx)(f.Z,{children:(0,p.jsx)("div",{className:"container",children:(0,p.jsxs)(u.Z,{layout:"vertical",size:"small",onFinish:X,children:[(0,p.jsx)(c.Z,{sm:12,md:12,lg:12,children:1==K&&(0,p.jsx)(u.Z.Item,{label:"Admin",name:"admin_id",children:(0,p.jsx)(l.Z,{onChange:R,allowClear:!0,showSearch:!0,optionFilterProp:"children",children:Array.isArray(w)?w.map((function(n){return(0,p.jsx)(l.Z.Option,{role_id:"2",value:null===n||void 0===n?void 0:n.id,children:null===n||void 0===n?void 0:n.name},null===n||void 0===n?void 0:n.id)})):(0,p.jsx)(l.Z.Option,{role_id:"2",value:""})})})}),(0,p.jsx)(c.Z,{sm:12,md:12,lg:12,children:(1==K||2==K)&&(0,p.jsx)(u.Z.Item,{label:"Distributor",name:"distributor_id",children:(0,p.jsx)(l.Z,{onChange:U,allowClear:!0,showSearch:!0,optionFilterProp:"children",children:Array.isArray(A)?A.map((function(n){return(0,p.jsx)(m,{role_id:"3",value:null===n||void 0===n?void 0:n.id,children:null===n||void 0===n?void 0:n.name},null===n||void 0===n?void 0:n.id)})):(0,p.jsx)(m,{role_id:"3",value:""})})})}),(0,p.jsx)(c.Z,{sm:12,md:12,lg:12,children:(1==K||2==K||3==K)&&(0,p.jsx)(u.Z.Item,{label:"Dealer",name:"dealer_id",children:(0,p.jsx)(l.Z,{onChange:W,allowClear:!0,showSearch:!0,optionFilterProp:"children",children:Array.isArray(F)?F.map((function(n){return(0,p.jsx)(m,{role_id:"4",value:null===n||void 0===n?void 0:n.id,children:null===n||void 0===n?void 0:n.name},null===n||void 0===n?void 0:n.id)})):(0,p.jsx)(m,{role_id:"4",value:""})})})}),(0,p.jsx)(c.Z,{sm:12,md:12,lg:12,children:(1==K||2==K||3==K||4==K)&&(0,p.jsx)(u.Z.Item,{label:"Subdealer",name:"subdealer_id",children:(0,p.jsx)(l.Z,{allowClear:!0,showSearch:!0,optionFilterProp:"children",children:Array.isArray(T)&&T.length>0?T.map((function(n){return(0,p.jsx)(m,{role_id:"5",value:null===n||void 0===n?void 0:n.id,children:null===n||void 0===n?void 0:n.name},null===n||void 0===n?void 0:n.id)})):(0,p.jsx)(m,{})})})}),(0,p.jsx)(v.ZP,{type:"primary",htmlType:"submit",children:"Assign"})]})})})})})})}},914:function(n,e,t){var i=t(9752);e.Z=i.Z},6106:function(n,e,t){var i=t(7545);e.Z=i.Z},6753:function(n,e,t){var i=t(4942);e.Z=function(n){var e;return(0,i.Z)({},n.componentCls,(e={},(0,i.Z)(e,"".concat(n.antCls,"-motion-collapse-legacy"),{overflow:"hidden","&-active":{transition:"height ".concat(n.motionDurationMid," ").concat(n.motionEaseInOut,",\n        opacity ").concat(n.motionDurationMid," ").concat(n.motionEaseInOut," !important")}}),(0,i.Z)(e,"".concat(n.antCls,"-motion-collapse"),{overflow:"hidden",transition:"height ".concat(n.motionDurationMid," ").concat(n.motionEaseInOut,",\n        opacity ").concat(n.motionDurationMid," ").concat(n.motionEaseInOut," !important")}),e))}}}]);
//# sourceMappingURL=266.f971a074.chunk.js.map