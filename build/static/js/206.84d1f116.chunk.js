"use strict";(self.webpackChunkemilus=self.webpackChunkemilus||[]).push([[206],{8470:function(e,n,r){var t=r(1413),i=r(4236).Z.div((function(e){var n=e.justifyContent,r=e.alignItems,i=e.flexDirection,s=e.gap,a=e.padding,o=e.margin,l={display:"flex",justifyContent:n,alignItems:r,gap:"number"===typeof s?"".concat(s,"px"):s};return i&&(l.flexDirection=i),a&&(l.padding=a),o&&(l.margin=o),(0,t.Z)({},l)}));n.Z=i},2703:function(e,n,r){var t=r(5671),i=r(3144),s=function(){function e(){(0,t.Z)(this,e)}return(0,i.Z)(e,null,[{key:"getNameInitial",value:function(e){var n=e.match(/\b\w/g)||[];return((n.shift()||"")+(n.pop()||"")).toUpperCase()}},{key:"getRouteInfo",value:function(e,n){if(e.path===n)return e;var r;for(var t in e)if(e.hasOwnProperty(t)&&"object"===typeof e[t]&&(r=this.getRouteInfo(e[t],n)))return r;return r}},{key:"getColorContrast",value:function(e){if(!e)return"dark";var n=parseInt(i(e).substring(0,2),16),r=function(e){return parseInt(i(e).substring(2,4),16)}(e),t=function(e){return parseInt(i(e).substring(4,6),16)}(e);function i(e){return"#"===e.charAt(0)?e.substring(1,7):e}return(299*n+587*r+114*t)/1e3>130?"dark":"light"}},{key:"shadeColor",value:function(e,n){var r=parseInt(e.substring(1,3),16),t=parseInt(e.substring(3,5),16),i=parseInt(e.substring(5,7),16);r=parseInt(r*(100+n)/100),t=(t=parseInt(t*(100+n)/100))<255?t:255,i=(i=parseInt(i*(100+n)/100))<255?i:255;var s=1===(r=r<255?r:255).toString(16).length?"0".concat(r.toString(16)):r.toString(16),a=1===t.toString(16).length?"0".concat(t.toString(16)):t.toString(16),o=1===i.toString(16).length?"0".concat(i.toString(16)):i.toString(16);return"#".concat(s).concat(a).concat(o)}},{key:"rgbaToHex",value:function(e){var n=function(e){return e.replace(/^\s+|\s+$/gm,"")},r=e.substring(e.indexOf("(")).split(","),t=parseInt(n(r[0].substring(1)),10),i=parseInt(n(r[1]),10),s=parseInt(n(r[2]),10),a=parseFloat(n(r[3].substring(0,r[3].length-1))).toFixed(2),o=[t.toString(16),i.toString(16),s.toString(16),Math.round(255*a).toString(16).substring(0,2)];return o.forEach((function(e,n){1===e.length&&(o[n]="0"+e)})),"#".concat(o.join(""))}},{key:"getSignNum",value:function(e,n,r){return e>0?n:e<0?r:null}},{key:"antdTableSorter",value:function(e,n,r){return"number"===typeof e[r]&&"number"===typeof n[r]?e[r]-n[r]:"string"===typeof e[r]&&"string"===typeof n[r]?(e=e[r].toLowerCase())>(n=n[r].toLowerCase())?-1:n>e?1:0:void 0}},{key:"filterArray",value:function(e,n,r){var t=e;return e&&(t=e.filter((function(e){return e[n]===r}))),t}},{key:"deleteArrayRow",value:function(e,n,r){var t=e;return e&&(t=e.filter((function(e){return e[n]!==r}))),t}},{key:"wildCardSearch",value:function(e,n){return e=e.filter((function(e){return function(e){for(var r in e)if(null!=e[r]&&-1!==e[r].toString().toUpperCase().indexOf(n.toString().toUpperCase()))return!0}(e)}))}},{key:"getBreakPoint",value:function(e){var n=[];for(var r in e){if(e.hasOwnProperty(r))e[r]&&n.push(r)}return n}}]),e}();n.Z=s},4951:function(e,n,r){r.r(n);var t=r(4165),i=r(5861),s=r(9439),a=r(5987),o=r(2791),l=r(2999),u=r(7615),c=r(6090),d=r(6106),m=r(914),p=r(7888),f=r(7309),h=r(7007),v=r(8470),Z=r(184),x=["parentToChild"],_=l.Z.Option;n.default=function(e){var n=e.parentToChild,r=(0,a.Z)(e,x),g=u.Z.useForm(),j=(0,s.Z)(g,1)[0],b=(0,o.useState)(!0),S=(0,s.Z)(b,2),y=S[0],w=S[1],I=(0,o.useState)([]),k=(0,s.Z)(I,2),P=k[0],C=k[1],N=(0,o.useState)([]),F=(0,s.Z)(N,2),A=F[0],M=F[1],E=(0,o.useState)([]),D=(0,s.Z)(E,2),Y=D[0],O=D[1],T=(0,o.useState)([]),z=(0,s.Z)(T,2),q=z[0],V=z[1],L=function(){w(!y)},R=(0,o.useState)(localStorage.getItem("id")||""),U=(0,s.Z)(R,2),G=U[0],B=U[1],K=(0,o.useState)(localStorage.getItem("role")||""),H=(0,s.Z)(K,2),$=H[0],J=H[1],Q=function(e,n,r){c.Z[e]({message:n,description:r})},W=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(){var n,r,i,s,a,o,l,u,c,d;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={user_id:G},e.next=3,h.ZP.post("role_based_user_list",n).then((function(e){return e})).catch((function(e){return[]}));case 3:r=e.sent,1==$&&(console.log("Super Admin"),C(null===r||void 0===r||null===(i=r.data)||void 0===i||null===(s=i.data)||void 0===s?void 0:s.user_list)),2==$&&(console.log("Admin"),M(null===r||void 0===r||null===(a=r.data)||void 0===a||null===(o=a.data)||void 0===o?void 0:o.user_list)),3==$&&(console.log("Distributor"),O(null===r||void 0===r||null===(l=r.data)||void 0===l||null===(u=l.data)||void 0===u?void 0:u.user_list)),4==$&&(console.log("Dealer"),V(null===r||void 0===r||null===(c=r.data)||void 0===c||null===(d=c.data)||void 0===d?void 0:d.subdealer_list));case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),X=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(n){var r,i,s,a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return j.setFieldValue(""),M([]),O([]),V([]),s={user_id:n},e.next=7,h.ZP.post("role_based_user_list",s).then((function(e){return e})).catch((function(e){return e}));case 7:a=e.sent,M(null===a||void 0===a||null===(r=a.data)||void 0===r||null===(i=r.data)||void 0===i?void 0:i.user_list);case 9:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),ee=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(n){var r,i,s,a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return j.setFieldValue(""),O(""),V(""),s={user_id:n},e.next=6,h.ZP.post("role_based_user_list",s).then((function(e){return e})).catch((function(e){return e}));case 6:a=e.sent,O(null===a||void 0===a||null===(r=a.data)||void 0===r||null===(i=r.data)||void 0===i?void 0:i.user_list);case 8:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),ne=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(n){var r,i,s,a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return j.setFieldValue(""),V([]),s={user_id:n},e.next=5,h.ZP.post("role_based_user_list",s).then((function(e){return e})).catch((function(e){return e}));case 5:a=e.sent,V(null===a||void 0===a||null===(r=a.data)||void 0===r||null===(i=r.data)||void 0===i?void 0:i.subdealer_list);case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();(0,o.useEffect)((function(){B(localStorage.getItem("id")),J(localStorage.getItem("role")),W()}),[]);var re=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(i){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Sim"!=n[1]){e.next=10;break}return i.id=n[0],e.next=4,h.ZP.post("sim_transfer",i);case 4:j.resetFields(),r.parentFunction(),Q("success","Device","Sim Transfered Successfully!"),L(),e.next=18;break;case 10:if("Device"!=n[1]){e.next=18;break}return i.id=n[0],e.next=14,h.ZP.post("device_transfer",i);case 14:j.resetFields(),r.parentFunction(),Q("success","Device","Device Transfered Successfully!"),L();case 18:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,Z.jsx)(d.Z,{gutter:6,children:y&&(0,Z.jsx)(m.Z,{children:(0,Z.jsx)(p.Z,{title:"Assign Form",children:(0,Z.jsx)(v.Z,{children:(0,Z.jsx)("div",{className:"container",children:(0,Z.jsxs)(u.Z,{layout:"vertical",size:"small",onFinish:re,children:[(0,Z.jsx)(m.Z,{sm:12,md:12,lg:12,children:1==$&&(0,Z.jsx)(u.Z.Item,{label:"Admin",name:"admin_id",children:(0,Z.jsx)(l.Z,{onChange:X,allowClear:!0,showSearch:!0,optionFilterProp:"children",children:Array.isArray(P)?P.map((function(e){return(0,Z.jsx)(l.Z.Option,{role_id:"2",value:null===e||void 0===e?void 0:e.id,children:null===e||void 0===e?void 0:e.name},null===e||void 0===e?void 0:e.id)})):(0,Z.jsx)(l.Z.Option,{role_id:"2",value:""})})})}),(0,Z.jsx)(m.Z,{sm:12,md:12,lg:12,children:(1==$||2==$)&&(0,Z.jsx)(u.Z.Item,{label:"Distributor",name:"distributor_id",children:(0,Z.jsx)(l.Z,{onChange:ee,allowClear:!0,showSearch:!0,optionFilterProp:"children",children:Array.isArray(A)?A.map((function(e){return(0,Z.jsx)(_,{role_id:"3",value:null===e||void 0===e?void 0:e.id,children:null===e||void 0===e?void 0:e.name},null===e||void 0===e?void 0:e.id)})):(0,Z.jsx)(_,{role_id:"3",value:""})})})}),(0,Z.jsx)(m.Z,{sm:12,md:12,lg:12,children:(1==$||2==$||3==$)&&(0,Z.jsx)(u.Z.Item,{label:"Dealer",name:"dealer_id",children:(0,Z.jsx)(l.Z,{onChange:ne,allowClear:!0,showSearch:!0,optionFilterProp:"children",children:Array.isArray(Y)?Y.map((function(e){return(0,Z.jsx)(_,{role_id:"4",value:null===e||void 0===e?void 0:e.id,children:null===e||void 0===e?void 0:e.name},null===e||void 0===e?void 0:e.id)})):(0,Z.jsx)(_,{role_id:"4",value:""})})})}),(0,Z.jsx)(m.Z,{sm:12,md:12,lg:12,children:(1==$||2==$||3==$||4==$)&&(0,Z.jsx)(u.Z.Item,{label:"Subdealer",name:"subdealer_id",children:(0,Z.jsx)(l.Z,{allowClear:!0,showSearch:!0,optionFilterProp:"children",children:Array.isArray(q)&&q.length>0?q.map((function(e){return(0,Z.jsx)(_,{role_id:"5",value:null===e||void 0===e?void 0:e.id,children:null===e||void 0===e?void 0:e.name},null===e||void 0===e?void 0:e.id)})):(0,Z.jsx)(_,{})})})}),(0,Z.jsx)(f.ZP,{type:"primary",htmlType:"submit",children:"Assign"})]})})})})})})}},3206:function(e,n,r){r.r(n),r.d(n,{Sim:function(){return D},default:function(){return Y}});var t=r(1413),i=r(4165),s=r(5861),a=r(9439),o=r(2791),l=r(6106),u=r(914),c=r(7888),d=r(2835),m=r(7309),p=r(9004),f=r(1752),h=r(1730),v=r(9286),Z=r(8470),x=r(2703),_=r(7007),g=r(2999),j=r(7615),b=r(6090),S=r(1717),y=r(3099),w=r(2426),I=r.n(w),k=r(184),P=g.Z.Option,C=function(e){var n=j.Z.useForm(),r=(0,a.Z)(n,1)[0],t=(0,o.useState)(),p=(0,a.Z)(t,2),f=p[0],h=p[1],v=(0,o.useState)([]),x=(0,a.Z)(v,2),w=x[0],C=x[1];(0,o.useEffect)((function(){!function(e){A.apply(this,arguments)}(C)}),[]);var N=function(e,n,r){b.Z[e]({message:n,description:r})},F=function(){var n=(0,s.Z)((0,i.Z)().mark((function n(t){var s,a,o,l,u,c,d;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return s=I()(t.valid_from).format("YYYY-MM-DD"),a=I()(t.valid_to).format("YYYY-MM-DD"),o={network_id:t.network_id,sim_imei_no:t.sim_imei_no,sim_mob_no1:t.sim_mob_no1,sim_mob_no2:t.sim_mob_no2,valid_from:s,valid_to:a},n.prev=3,l=new Date(t.valid_from),t.valid_from=l.toISOString().split("T")[0],u=new Date(t.valid_to),t.valid_to=u.toISOString().split("T")[0],n.next=10,_.ZP.post("sim/store",o);case 10:r.resetFields(),e.parentFunction(),N("success","Sim","Sim Inserted Successfully!"),n.next=18;break;case 15:n.prev=15,n.t0=n.catch(3),n.t0.response&&403===n.t0.response.status&&(c=n.t0.response.data).message&&"object"===typeof c.message&&((d=c.message).hasOwnProperty("sim_imei_no")&&N("info","Sim IMEI","Given Sim IMEI No is Already Exists"),d.hasOwnProperty("sim_mob_no1")&&N("info","Sim Mobile Number-1","Given Sim Mobile Number-1 is Already Exists"));case 18:case"end":return n.stop()}}),n,null,[[3,15]])})));return function(e){return n.apply(this,arguments)}}();function A(){return A=(0,s.Z)((0,i.Z)().mark((function e(n){var r;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,_.ZP.get("network");case 3:(r=e.sent).data.success?n(r.data.data):console.error("API request was not successful"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("Error fetching roles:",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])}))),A.apply(this,arguments)}return(0,k.jsx)(l.Z,{gutter:6,children:(0,k.jsx)(u.Z,{children:(0,k.jsx)(c.Z,{title:"New Sim",children:(0,k.jsx)(Z.Z,{children:(0,k.jsx)("div",{className:"container",children:(0,k.jsxs)(j.Z,{form:r,size:"small",name:"registrationForm",onFinish:F,layout:"vertical",children:[(0,k.jsxs)(l.Z,{gutter:[8,8],children:[(0,k.jsx)(u.Z,{sm:12,md:12,lg:12,children:(0,k.jsx)(j.Z.Item,{size:"small",label:"Network",name:"network_id",rules:[{required:!0,message:"Please Select a Network"}],children:(0,k.jsx)(g.Z,{allowClear:!0,showSearch:!0,optionFilterProp:"children",onChange:function(e){h(e)},value:f,filterOption:function(e,n){return n.children.toLowerCase().indexOf(e.toLowerCase())>=0},children:Array.isArray(w)?w.map((function(e){return(0,k.jsx)(P,{value:e.id,children:e.network_provider_name},e.id)})):(0,k.jsx)(P,{value:"Loading",disabled:!0,children:"Loading..."})})})}),(0,k.jsx)(u.Z,{sm:12,md:12,lg:12,children:(0,k.jsx)(j.Z.Item,{size:"small",label:"Sim IMEI No",name:"sim_imei_no",id:"sim_imei_no",rules:[{required:!0,message:"Please enter a Sim IMEI No"}],children:(0,k.jsx)(d.Z,{id:"sim_imei_no"})})}),(0,k.jsx)(u.Z,{sm:12,md:12,lg:12,children:(0,k.jsx)(j.Z.Item,{size:"small",label:"Primary Number",name:"sim_mob_no1",rules:[{required:!0,message:"Please enter a Primary Number"}],children:(0,k.jsx)(d.Z,{})})}),(0,k.jsx)(u.Z,{sm:12,md:12,lg:12,children:(0,k.jsx)(j.Z.Item,{size:"small",label:"Secondary Mobile No",name:"sim_mob_no2",rules:[{required:!0,message:"Please enter a Secondary Mobile No"}],children:(0,k.jsx)(d.Z,{})})}),(0,k.jsx)(u.Z,{sm:12,md:12,lg:12,children:(0,k.jsx)(j.Z.Item,{name:"valid_from",label:"Valid From",children:(0,k.jsx)(S.Z,{style:{width:"100%",fontSize:"16px"},required:!0,allowClear:!1,format:"YYYY-MM-DD"})})}),(0,k.jsx)(u.Z,{sm:12,md:12,lg:12,children:(0,k.jsx)(j.Z.Item,{name:"valid_to",label:"Valid To",children:(0,k.jsx)(S.Z,{style:{width:"100%",fontSize:"16px"},allowClear:!1})})})]}),(0,k.jsx)(l.Z,{align:"middle",children:(0,k.jsx)(u.Z,{span:12,children:(0,k.jsx)(j.Z.Item,{children:(0,k.jsxs)(y.Z,{wrap:!0,children:[(0,k.jsx)(m.ZP,{type:"primary",shape:"round",htmlType:"submit",children:"Save"}),(0,k.jsx)(m.ZP,{type:"primary",shape:"round",children:"Back"})]})})})})]})})})})})})},N=r(5987),F=["parentToChild"],A=g.Z.Option,M=function(e){var n=e.parentToChild,r=(0,N.Z)(e,F),t=j.Z.useForm(),p=(0,a.Z)(t,1)[0],f=(0,o.useState)(!0),h=(0,a.Z)(f,2),v=h[0],x=h[1],w=(0,o.useState)(),P=(0,a.Z)(w,2),C=P[0],M=P[1],E=(0,o.useState)([]),D=(0,a.Z)(E,2),Y=D[0],O=D[1];(0,o.useEffect)((function(){!function(e){q.apply(this,arguments)}(O)}),[]);var T=function(e,n,r){b.Z[e]({message:n,description:r})},z=function(){var e=(0,s.Z)((0,i.Z)().mark((function e(t){var s,a,o,l,u;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=I()(t.valid_from).format("YYYY-MM-DD"),a=I()(t.valid_to).format("YYYY-MM-DD"),o={id:n[0],network_id:t.network_id,sim_imei_no:t.sim_imei_no,sim_mob_no1:t.sim_mob_no1,sim_mob_no2:t.sim_mob_no2,valid_from:s,valid_to:a},e.prev=3,e.next=6,_.ZP.post("sim/update",o);case 6:p.resetFields(),r.parentFunction(),T("success","Sim","Sim Updated Successfully!"),x(!v),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(3),e.t0.response&&403===e.t0.response.status&&(l=e.t0.response.data).message&&"object"===typeof l.message&&((u=l.message).hasOwnProperty("sim_imei_no")&&T("info","Sim IMEI","Given Sim IMEI No is Already Exists"),u.hasOwnProperty("sim_mob_no1")&&T("info","Sim Mobile Number-1","Given Sim Mobile Number-1 is Already Exists"));case 15:case"end":return e.stop()}}),e,null,[[3,12]])})));return function(n){return e.apply(this,arguments)}}();function q(){return q=(0,s.Z)((0,i.Z)().mark((function e(n){var r;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,_.ZP.get("network");case 3:(r=e.sent).data.success?n(r.data.data):console.error("API request was not successful"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("Error fetching roles:",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])}))),q.apply(this,arguments)}return(0,k.jsx)(l.Z,{gutter:6,children:v&&(0,k.jsx)(u.Z,{children:(0,k.jsx)(c.Z,{title:"Edit Sim",children:(0,k.jsx)(Z.Z,{children:(0,k.jsx)("div",{className:"container",children:(0,k.jsxs)(j.Z,{form:p,size:"small",name:"registrationForm",onFinish:z,layout:"vertical",children:[(0,k.jsxs)(l.Z,{gutter:[8,8],children:[(0,k.jsx)(u.Z,{sm:12,md:12,lg:12,children:(0,k.jsx)(j.Z.Item,{size:"small",label:"Network",name:"network_id",initialValue:n[1],rules:[{required:!0,message:"Please Select a Network"}],children:(0,k.jsx)(g.Z,{showSearch:!0,placeholder:"Select Network",optionFilterProp:"children",onChange:function(e){M(e)},value:C,filterOption:function(e,n){return n.children.toLowerCase().indexOf(e.toLowerCase())>=0},children:Array.isArray(Y)?Y.map((function(e){return(0,k.jsx)(A,{value:e.id,children:e.network_provider_name},e.id)})):(0,k.jsx)(A,{value:"Loading",disabled:!0,children:"Loading..."})})})}),(0,k.jsx)(u.Z,{sm:12,md:12,lg:12,children:(0,k.jsx)(j.Z.Item,{size:"small",label:"Sim IMEI No",name:"sim_imei_no",initialValue:n[3],rules:[{required:!0,message:"Please enter a Sim IMEI No"}],children:(0,k.jsx)(d.Z,{})})}),(0,k.jsx)(u.Z,{sm:12,md:12,lg:12,children:(0,k.jsx)(j.Z.Item,{initialValue:n[4],size:"small",label:"Primary Number",name:"sim_mob_no1",rules:[{required:!0,message:"Please enter a Primary Number"}],children:(0,k.jsx)(d.Z,{})})}),(0,k.jsx)(u.Z,{sm:12,md:12,lg:12,children:(0,k.jsx)(j.Z.Item,{initialValue:n[5],size:"small",label:"Secondary Mobile No",name:"sim_mob_no2",rules:[{required:!0,message:"Please enter a Secondary Mobile No"}],children:(0,k.jsx)(d.Z,{})})}),(0,k.jsx)(u.Z,{sm:12,md:12,lg:12,children:(0,k.jsx)(j.Z.Item,{name:"valid_from",label:"Valid From",initialValue:I()(n[6]),rules:[{required:!0,message:"Please enter a valid from"}],children:(0,k.jsx)(S.Z,{style:{width:"100%",fontSize:"16px"}})})}),(0,k.jsx)(u.Z,{sm:12,md:12,lg:12,children:(0,k.jsx)(j.Z.Item,{name:"valid_to",label:"Valid To",initialValue:I()(n[6]),rules:[{required:!0,message:"Please select a valid to"}],children:(0,k.jsx)(S.Z,{style:{width:"100%",fontSize:"16px"}})})})]}),(0,k.jsx)(l.Z,{align:"middle",children:(0,k.jsx)(u.Z,{span:12,children:(0,k.jsx)(j.Z.Item,{children:(0,k.jsxs)(y.Z,{wrap:!0,children:[(0,k.jsx)(m.ZP,{type:"primary",shape:"round",htmlType:"submit",children:"Update"}),(0,k.jsx)(m.ZP,{type:"primary",shape:"round",children:"Back"})]})})})})]})})})})})})},E=r(4951),D=function(){var e=(0,o.useState)([]),n=(0,a.Z)(e,2),r=(n[0],n[1]),g=(0,o.useState)([]),j=(0,a.Z)(g,2),b=j[0],S=j[1],y=(0,o.useState)([]),w=(0,a.Z)(y,2),I=w[0],P=w[1],N=(0,o.useState)(!1),F=(0,a.Z)(N,2),A=F[0],D=F[1],Y=(0,o.useState)(!1),O=(0,a.Z)(Y,2),T=O[0],z=O[1],q=(0,o.useState)(!1),V=(0,a.Z)(q,2),L=V[0],R=V[1],U=(0,o.useState)(""),G=(0,a.Z)(U,2),B=G[0],K=G[1],H=(0,o.useState)(""),$=(0,a.Z)(H,2),J=$[0],Q=$[1],W=function(){console.log(b),X()},X=function(){var e=(0,s.Z)((0,i.Z)().mark((function e(){var n,r;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,_.ZP.post("sim_list");case 3:(n=e.sent).data&&Array.isArray(n.data.data)?(r=n.data.data.map((function(e){return{id:e.id,network_id:e.network_id,network_provider_name:e.network_provider_name,sim_imei_no:e.sim_imei_no,sim_mob_no1:e.sim_mob_no1,sim_mob_no2:e.sim_mob_no2,valid_from:e.valid_from,valid_to:e.valid_to}})),S(r)):console.error("API request was not successful"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("Error fetching users:",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();function ee(e){D(!1),z(!1),R(!0);var n=e.id,r=e.sim_imei_no;Q([n,"Sim",r])}(0,o.useEffect)((function(){X(S)}),[]);var ne=[{title:"Network",dataIndex:"network_provider_name"},{title:"Sim IMEI No",dataIndex:"sim_imei_no"},{title:"Sim Mobile Number",dataIndex:"sim_mob_no1"},{title:"Sim Mobile Number",dataIndex:"sim_mob_no2"},{title:"Edit",dataIndex:"edit",render:function(e,n){return(0,k.jsx)("span",{style:{cursor:"pointer"},onClick:function(){return function(e){K([e.id,e.network_id,e.network_provider_name,e.sim_imei_no,e.sim_mob_no1,e.sim_mob_no2,e.valid_form,e.valid_to]),z(!0),D(!1),R(!1)}(n)},children:(0,k.jsx)(f.Z,{})})}},{title:"Assign",dataIndex:"edit",render:function(e,n){return(0,k.jsxs)("span",{style:{cursor:"pointer"},onClick:function(){return ee(n)},children:[(0,k.jsx)(f.Z,{})," "]})}}],re={onChange:function(e,n){r(n),P(e)}};return(0,k.jsx)(k.Fragment,{children:(0,k.jsxs)(l.Z,{gutter:6,children:[(0,k.jsx)(u.Z,{sm:24,md:14,lg:14,children:(0,k.jsxs)(c.Z,{title:"Sim",children:[(0,k.jsxs)(Z.Z,{alignItems:"center",justifyContent:"space-between",mobileFlex:!1,children:[(0,k.jsxs)(Z.Z,{className:"mb-1",mobileFlex:!1,children:[(0,k.jsx)("div",{className:"mr-md-3 mb-3",children:(0,k.jsx)(d.Z,{placeholder:"Search",prefix:(0,k.jsx)(h.Z,{}),onChange:function(e){return function(e){var n=e.currentTarget.value,r=e.currentTarget.value?b:[],t=x.Z.wildCardSearch(r,n);S(t),P([])}(e)}})}),(0,k.jsx)("div",{className:"mb-3"})]}),(0,k.jsx)("div",{className:"mb-3",children:(0,k.jsx)(m.ZP,{type:"primary",icon:(0,k.jsx)(v.Z,{}),ghost:!0,onClick:function(){D(!0),z(!1),R(!1)},children:"Add Sim"})})]}),(0,k.jsx)("div",{className:"table-responsive",children:(0,k.jsx)(p.Z,{bordered:!0,columns:ne,dataSource:b,rowKey:"id",rowSelection:(0,t.Z)({selectedRowKeys:I,type:"checkbox",preserveSelectedRowKeys:!1},re)})})]})}),(0,k.jsxs)(u.Z,{sm:24,md:10,lg:10,children:[A&&(0,k.jsx)(C,{parentFunction:W}),L&&(0,k.jsx)(E.default,{parentToChild:J,parentFunction:W},J[0]),T&&(0,k.jsx)(M,{parentToChild:B,parentFunction:W},B[0])]})]})})},Y=D}}]);
//# sourceMappingURL=206.84d1f116.chunk.js.map