"use strict";(self.webpackChunkemilus=self.webpackChunkemilus||[]).push([[206],{8470:function(e,n,r){var t=r(1413),i=r(4236).Z.div((function(e){var n=e.justifyContent,r=e.alignItems,i=e.flexDirection,s=e.gap,a=e.padding,o=e.margin,l={display:"flex",justifyContent:n,alignItems:r,gap:"number"===typeof s?"".concat(s,"px"):s};return i&&(l.flexDirection=i),a&&(l.padding=a),o&&(l.margin=o),(0,t.Z)({},l)}));n.Z=i},2703:function(e,n,r){var t=r(5671),i=r(3144),s=function(){function e(){(0,t.Z)(this,e)}return(0,i.Z)(e,null,[{key:"getNameInitial",value:function(e){var n=e.match(/\b\w/g)||[];return((n.shift()||"")+(n.pop()||"")).toUpperCase()}},{key:"getRouteInfo",value:function(e,n){if(e.path===n)return e;var r;for(var t in e)if(e.hasOwnProperty(t)&&"object"===typeof e[t]&&(r=this.getRouteInfo(e[t],n)))return r;return r}},{key:"getColorContrast",value:function(e){if(!e)return"dark";var n=parseInt(i(e).substring(0,2),16),r=function(e){return parseInt(i(e).substring(2,4),16)}(e),t=function(e){return parseInt(i(e).substring(4,6),16)}(e);function i(e){return"#"===e.charAt(0)?e.substring(1,7):e}return(299*n+587*r+114*t)/1e3>130?"dark":"light"}},{key:"shadeColor",value:function(e,n){var r=parseInt(e.substring(1,3),16),t=parseInt(e.substring(3,5),16),i=parseInt(e.substring(5,7),16);r=parseInt(r*(100+n)/100),t=(t=parseInt(t*(100+n)/100))<255?t:255,i=(i=parseInt(i*(100+n)/100))<255?i:255;var s=1===(r=r<255?r:255).toString(16).length?"0".concat(r.toString(16)):r.toString(16),a=1===t.toString(16).length?"0".concat(t.toString(16)):t.toString(16),o=1===i.toString(16).length?"0".concat(i.toString(16)):i.toString(16);return"#".concat(s).concat(a).concat(o)}},{key:"rgbaToHex",value:function(e){var n=function(e){return e.replace(/^\s+|\s+$/gm,"")},r=e.substring(e.indexOf("(")).split(","),t=parseInt(n(r[0].substring(1)),10),i=parseInt(n(r[1]),10),s=parseInt(n(r[2]),10),a=parseFloat(n(r[3].substring(0,r[3].length-1))).toFixed(2),o=[t.toString(16),i.toString(16),s.toString(16),Math.round(255*a).toString(16).substring(0,2)];return o.forEach((function(e,n){1===e.length&&(o[n]="0"+e)})),"#".concat(o.join(""))}},{key:"getSignNum",value:function(e,n,r){return e>0?n:e<0?r:null}},{key:"antdTableSorter",value:function(e,n,r){return"number"===typeof e[r]&&"number"===typeof n[r]?e[r]-n[r]:"string"===typeof e[r]&&"string"===typeof n[r]?(e=e[r].toLowerCase())>(n=n[r].toLowerCase())?-1:n>e?1:0:void 0}},{key:"filterArray",value:function(e,n,r){var t=e;return e&&(t=e.filter((function(e){return e[n]===r}))),t}},{key:"deleteArrayRow",value:function(e,n,r){var t=e;return e&&(t=e.filter((function(e){return e[n]!==r}))),t}},{key:"wildCardSearch",value:function(e,n){return e=e.filter((function(e){return function(e){for(var r in e)if(null!=e[r]&&-1!==e[r].toString().toUpperCase().indexOf(n.toString().toUpperCase()))return!0}(e)}))}},{key:"getBreakPoint",value:function(e){var n=[];for(var r in e){if(e.hasOwnProperty(r))e[r]&&n.push(r)}return n}}]),e}();n.Z=s},4951:function(e,n,r){r.r(n);var t=r(4165),i=r(5861),s=r(9439),a=r(5987),o=r(2791),l=r(2999),u=r(7615),d=r(6090),c=r(6106),m=r(914),p=r(7888),h=r(7309),f=r(7007),v=r(8470),Z=r(184),x=["parentToChild"],_=l.Z.Option;n.default=function(e){var n,r,g,j,b,S=e.parentToChild,y=(0,a.Z)(e,x),w=u.Z.useForm(),I=(0,s.Z)(w,1)[0],k=(0,o.useState)(!0),P=(0,s.Z)(k,2),C=P[0],N=P[1],F=(0,o.useState)([]),A=(0,s.Z)(F,2),M=A[0],E=A[1],D=(0,o.useState)([]),Y=(0,s.Z)(D,2),O=Y[0],T=Y[1],z=(0,o.useState)([]),q=(0,s.Z)(z,2),V=q[0],L=q[1],U=(0,o.useState)([]),G=(0,s.Z)(U,2),B=G[0],R=G[1],H=function(){N(!C)},K=(0,o.useState)(localStorage.getItem("id")||""),$=(0,s.Z)(K,2),J=$[0],Q=$[1],W=(0,o.useState)(localStorage.getItem("role")||""),X=(0,s.Z)(W,2),ee=X[0],ne=X[1],re=function(e,n,r){d.Z[e]({message:n,description:r})};(0,o.useEffect)((function(){Q(localStorage.getItem("id")),ne(localStorage.getItem("role")),function(){(n=n||(0,i.Z)((0,t.Z)().mark((function e(){var n,r,i,s,a,o,l,u,d,c;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={user_id:J},e.next=3,f.ZP.post("role_based_user_list",n).then((function(e){return e})).catch((function(e){return[]}));case 3:r=e.sent,1==ee&&(console.log("Super Admin"),E(null===r||void 0===r||null===(i=r.data)||void 0===i||null===(s=i.data)||void 0===s?void 0:s.user_list)),2==ee&&(console.log("Admin"),T(null===r||void 0===r||null===(a=r.data)||void 0===a||null===(o=a.data)||void 0===o?void 0:o.user_list)),3==ee&&(console.log("Distributor"),L(null===r||void 0===r||null===(l=r.data)||void 0===l||null===(u=l.data)||void 0===u?void 0:u.user_list)),4==ee&&(console.log("Dealer"),R(null===r||void 0===r||null===(d=r.data)||void 0===d||null===(c=d.data)||void 0===c?void 0:c.subdealer_list));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}()}),[]);return(0,Z.jsx)(c.Z,{gutter:6,children:C&&(0,Z.jsx)(m.Z,{children:(0,Z.jsx)(p.Z,{title:"Assign Form",children:(0,Z.jsx)(v.Z,{children:(0,Z.jsx)("div",{className:"container",children:(0,Z.jsxs)(u.Z,{layout:"vertical",size:"small",onFinish:function(e){return(b=b||(0,i.Z)((0,t.Z)().mark((function e(n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Sim"!=S[1]){e.next=10;break}return n.id=S[0],e.next=4,f.ZP.post("sim_transfer",n);case 4:I.resetFields(),y.parentFunction(),re("success","Device","Sim Transfered Successfully!"),H(),e.next=18;break;case 10:if("Device"!=S[1]){e.next=18;break}return n.id=S[0],e.next=14,f.ZP.post("device_transfer",n);case 14:I.resetFields(),y.parentFunction(),re("success","Device","Device Transfered Successfully!"),H();case 18:case"end":return e.stop()}}),e)})))).apply(this,arguments)},children:[(0,Z.jsx)(m.Z,{sm:12,md:12,lg:12,children:1==ee&&(0,Z.jsx)(u.Z.Item,{label:"Admin",name:"admin_id",children:(0,Z.jsx)(l.Z,{onChange:function(e){return(r=r||(0,i.Z)((0,t.Z)().mark((function e(n){var r,i,s,a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return I.setFieldValue(""),T([]),L([]),R([]),s={user_id:n},e.next=7,f.ZP.post("role_based_user_list",s).then((function(e){return e})).catch((function(e){return e}));case 7:a=e.sent,T(null===a||void 0===a||null===(r=a.data)||void 0===r||null===(i=r.data)||void 0===i?void 0:i.user_list);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)},allowClear:!0,showSearch:!0,optionFilterProp:"children",children:Array.isArray(M)?M.map((function(e){return(0,Z.jsx)(l.Z.Option,{role_id:"2",value:null===e||void 0===e?void 0:e.id,children:null===e||void 0===e?void 0:e.name},null===e||void 0===e?void 0:e.id)})):(0,Z.jsx)(l.Z.Option,{role_id:"2",value:""})})})}),(0,Z.jsx)(m.Z,{sm:12,md:12,lg:12,children:(1==ee||2==ee)&&(0,Z.jsx)(u.Z.Item,{label:"Distributor",name:"distributor_id",children:(0,Z.jsx)(l.Z,{onChange:function(e){return(g=g||(0,i.Z)((0,t.Z)().mark((function e(n){var r,i,s,a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return I.setFieldValue(""),L(""),R(""),s={user_id:n},e.next=6,f.ZP.post("role_based_user_list",s).then((function(e){return e})).catch((function(e){return e}));case 6:a=e.sent,L(null===a||void 0===a||null===(r=a.data)||void 0===r||null===(i=r.data)||void 0===i?void 0:i.user_list);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)},allowClear:!0,showSearch:!0,optionFilterProp:"children",children:Array.isArray(O)?O.map((function(e){return(0,Z.jsx)(_,{role_id:"3",value:null===e||void 0===e?void 0:e.id,children:null===e||void 0===e?void 0:e.name},null===e||void 0===e?void 0:e.id)})):(0,Z.jsx)(_,{role_id:"3",value:""})})})}),(0,Z.jsx)(m.Z,{sm:12,md:12,lg:12,children:(1==ee||2==ee||3==ee)&&(0,Z.jsx)(u.Z.Item,{label:"Dealer",name:"dealer_id",children:(0,Z.jsx)(l.Z,{onChange:function(e){return(j=j||(0,i.Z)((0,t.Z)().mark((function e(n){var r,i,s,a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return I.setFieldValue(""),R([]),s={user_id:n},e.next=5,f.ZP.post("role_based_user_list",s).then((function(e){return e})).catch((function(e){return e}));case 5:a=e.sent,R(null===a||void 0===a||null===(r=a.data)||void 0===r||null===(i=r.data)||void 0===i?void 0:i.subdealer_list);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)},allowClear:!0,showSearch:!0,optionFilterProp:"children",children:Array.isArray(V)?V.map((function(e){return(0,Z.jsx)(_,{role_id:"4",value:null===e||void 0===e?void 0:e.id,children:null===e||void 0===e?void 0:e.name},null===e||void 0===e?void 0:e.id)})):(0,Z.jsx)(_,{role_id:"4",value:""})})})}),(0,Z.jsx)(m.Z,{sm:12,md:12,lg:12,children:(1==ee||2==ee||3==ee||4==ee)&&(0,Z.jsx)(u.Z.Item,{label:"Subdealer",name:"subdealer_id",children:(0,Z.jsx)(l.Z,{allowClear:!0,showSearch:!0,optionFilterProp:"children",children:Array.isArray(B)&&B.length>0?B.map((function(e){return(0,Z.jsx)(_,{role_id:"5",value:null===e||void 0===e?void 0:e.id,children:null===e||void 0===e?void 0:e.name},null===e||void 0===e?void 0:e.id)})):(0,Z.jsx)(_,{})})})}),(0,Z.jsx)(h.ZP,{type:"primary",htmlType:"submit",children:"Assign"})]})})})})})})}},3206:function(e,n,r){r.r(n),r.d(n,{Sim:function(){return E},default:function(){return D}});var t=r(4165),i=r(5861),s=r(9439),a=r(2791),o=r(6106),l=r(914),u=r(7888),d=r(2835),c=r(7309),m=r(3248),p=r(1752),h=r(1730),f=r(9286),v=r(8470),Z=r(2703),x=r(7007),_=r(2999),g=r(7615),j=r(6090),b=r(1717),S=r(3099),y=r(2426),w=r.n(y),I=r(184),k=_.Z.Option,P=function(e){var n,r,m=g.Z.useForm(),p=(0,s.Z)(m,1)[0],h=(0,a.useState)(),f=(0,s.Z)(h,2),Z=f[0],y=f[1],P=(0,a.useState)([]),C=(0,s.Z)(P,2),N=C[0],F=C[1];(0,a.useEffect)((function(){!function(e){(r=r||(0,i.Z)((0,t.Z)().mark((function e(n){var r;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.ZP.get("network");case 3:(r=e.sent).data.success?n(r.data.data):console.error("API request was not successful"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("Error fetching roles:",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}(F)}),[]);var A=function(e,n,r){j.Z[e]({message:n,description:r})};return(0,I.jsx)(o.Z,{gutter:6,children:(0,I.jsx)(l.Z,{children:(0,I.jsx)(u.Z,{title:"New Sim",children:(0,I.jsx)(v.Z,{children:(0,I.jsx)("div",{className:"container",children:(0,I.jsxs)(g.Z,{form:p,size:"small",name:"registrationForm",onFinish:function(r){return(n=n||(0,i.Z)((0,t.Z)().mark((function n(r){var i,s,a,o,l,u,d;return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i=w()(r.valid_from).format("YYYY-MM-DD"),s=w()(r.valid_to).format("YYYY-MM-DD"),a={network_id:r.network_id,sim_imei_no:r.sim_imei_no,sim_mob_no1:r.sim_mob_no1,sim_mob_no2:r.sim_mob_no2,valid_from:i,valid_to:s},n.prev=3,o=new Date(r.valid_from),r.valid_from=o.toISOString().split("T")[0],l=new Date(r.valid_to),r.valid_to=l.toISOString().split("T")[0],n.next=10,x.ZP.post("sim/store",a);case 10:p.resetFields(),e.parentFunction(),A("success","Sim","Sim Inserted Successfully!"),n.next=18;break;case 15:n.prev=15,n.t0=n.catch(3),n.t0.response&&403===n.t0.response.status&&(u=n.t0.response.data).message&&"object"===typeof u.message&&((d=u.message).hasOwnProperty("sim_imei_no")&&A("info","Sim IMEI","Given Sim IMEI No is Already Exists"),d.hasOwnProperty("sim_mob_no1")&&A("info","Sim Mobile Number-1","Given Sim Mobile Number-1 is Already Exists"));case 18:case"end":return n.stop()}}),n,null,[[3,15]])})))).apply(this,arguments)},layout:"vertical",children:[(0,I.jsxs)(o.Z,{gutter:[8,8],children:[(0,I.jsx)(l.Z,{sm:12,md:12,lg:12,children:(0,I.jsx)(g.Z.Item,{size:"small",label:"Network",name:"network_id",rules:[{required:!0,message:"Please Select a Network"}],children:(0,I.jsx)(_.Z,{allowClear:!0,showSearch:!0,optionFilterProp:"children",onChange:function(e){y(e)},value:Z,filterOption:function(e,n){return n.children.toLowerCase().indexOf(e.toLowerCase())>=0},children:Array.isArray(N)?N.map((function(e){return(0,I.jsx)(k,{value:e.id,children:e.network_provider_name},e.id)})):(0,I.jsx)(k,{value:"Loading",disabled:!0,children:"Loading..."})})})}),(0,I.jsx)(l.Z,{sm:12,md:12,lg:12,children:(0,I.jsx)(g.Z.Item,{size:"small",label:"Sim IMEI No",name:"sim_imei_no",id:"sim_imei_no",rules:[{required:!0,message:"Please enter a Sim IMEI No"}],children:(0,I.jsx)(d.Z,{id:"sim_imei_no"})})}),(0,I.jsx)(l.Z,{sm:12,md:12,lg:12,children:(0,I.jsx)(g.Z.Item,{size:"small",label:"Primary Number",name:"sim_mob_no1",rules:[{required:!0,message:"Please enter a Primary Number"}],children:(0,I.jsx)(d.Z,{})})}),(0,I.jsx)(l.Z,{sm:12,md:12,lg:12,children:(0,I.jsx)(g.Z.Item,{size:"small",label:"Secondary Mobile No",name:"sim_mob_no2",children:(0,I.jsx)(d.Z,{})})}),(0,I.jsx)(l.Z,{sm:12,md:12,lg:12,children:(0,I.jsx)(g.Z.Item,{name:"valid_from",label:"Valid From",children:(0,I.jsx)(b.Z,{style:{width:"100%",fontSize:"16px"},required:!0,allowClear:!1,format:"YYYY-MM-DD"})})}),(0,I.jsx)(l.Z,{sm:12,md:12,lg:12,children:(0,I.jsx)(g.Z.Item,{name:"valid_to",label:"Valid To",children:(0,I.jsx)(b.Z,{style:{width:"100%",fontSize:"16px"},allowClear:!1})})})]}),(0,I.jsx)(o.Z,{align:"middle",children:(0,I.jsx)(l.Z,{span:12,children:(0,I.jsx)(g.Z.Item,{children:(0,I.jsxs)(S.Z,{wrap:!0,children:[(0,I.jsx)(c.ZP,{type:"primary",shape:"round",htmlType:"submit",children:"Save"}),(0,I.jsx)(c.ZP,{type:"primary",shape:"round",children:"Back"})]})})})})]})})})})})})},C=r(5987),N=["parentToChild"],F=_.Z.Option,A=function(e){var n,r,m=e.parentToChild,p=(0,C.Z)(e,N),h=g.Z.useForm(),f=(0,s.Z)(h,1)[0],Z=(0,a.useState)(!0),y=(0,s.Z)(Z,2),k=y[0],P=y[1],A=(0,a.useState)(),M=(0,s.Z)(A,2),E=M[0],D=M[1],Y=(0,a.useState)([]),O=(0,s.Z)(Y,2),T=O[0],z=O[1];(0,a.useEffect)((function(){!function(e){(r=r||(0,i.Z)((0,t.Z)().mark((function e(n){var r;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.ZP.get("network");case 3:(r=e.sent).data.success?n(r.data.data):console.error("API request was not successful"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("Error fetching roles:",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}(z)}),[]);var q=function(e,n,r){j.Z[e]({message:n,description:r})};return(0,I.jsx)(o.Z,{gutter:6,children:k&&(0,I.jsx)(l.Z,{children:(0,I.jsx)(u.Z,{title:"Edit Sim",children:(0,I.jsx)(v.Z,{children:(0,I.jsx)("div",{className:"container",children:(0,I.jsxs)(g.Z,{form:f,size:"small",name:"registrationForm",onFinish:function(e){return(n=n||(0,i.Z)((0,t.Z)().mark((function e(n){var r,i,s,a,o;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=w()(n.valid_from).format("YYYY-MM-DD"),i=w()(n.valid_to).format("YYYY-MM-DD"),s={id:m[0],network_id:n.network_id,sim_imei_no:n.sim_imei_no,sim_mob_no1:n.sim_mob_no1,sim_mob_no2:n.sim_mob_no2,valid_from:r,valid_to:i},e.prev=3,e.next=6,x.ZP.post("sim/update",s);case 6:f.resetFields(),p.parentFunction(),q("success","Sim","Sim Updated Successfully!"),P(!k),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(3),e.t0.response&&403===e.t0.response.status&&(a=e.t0.response.data).message&&"object"===typeof a.message&&((o=a.message).hasOwnProperty("sim_imei_no")&&q("info","Sim IMEI","Given Sim IMEI No is Already Exists"),o.hasOwnProperty("sim_mob_no1")&&q("info","Sim Mobile Number-1","Given Sim Mobile Number-1 is Already Exists"));case 15:case"end":return e.stop()}}),e,null,[[3,12]])})))).apply(this,arguments)},layout:"vertical",children:[(0,I.jsxs)(o.Z,{gutter:[8,8],children:[(0,I.jsx)(l.Z,{sm:12,md:12,lg:12,children:(0,I.jsx)(g.Z.Item,{size:"small",label:"Network",name:"network_id",initialValue:m[1],rules:[{required:!0,message:"Please Select a Network"}],children:(0,I.jsx)(_.Z,{showSearch:!0,placeholder:"Select Network",optionFilterProp:"children",onChange:function(e){D(e)},value:E,filterOption:function(e,n){return n.children.toLowerCase().indexOf(e.toLowerCase())>=0},children:Array.isArray(T)?T.map((function(e){return(0,I.jsx)(F,{value:e.id,children:e.network_provider_name},e.id)})):(0,I.jsx)(F,{value:"Loading",disabled:!0,children:"Loading..."})})})}),(0,I.jsx)(l.Z,{sm:12,md:12,lg:12,children:(0,I.jsx)(g.Z.Item,{size:"small",label:"Sim IMEI No",name:"sim_imei_no",initialValue:m[3],rules:[{required:!0,message:"Please enter a Sim IMEI No"}],children:(0,I.jsx)(d.Z,{})})}),(0,I.jsx)(l.Z,{sm:12,md:12,lg:12,children:(0,I.jsx)(g.Z.Item,{initialValue:m[4],size:"small",label:"Primary Number",name:"sim_mob_no1",rules:[{required:!0,message:"Please enter a Primary Number"}],children:(0,I.jsx)(d.Z,{})})}),(0,I.jsx)(l.Z,{sm:12,md:12,lg:12,children:(0,I.jsx)(g.Z.Item,{initialValue:m[5],size:"small",label:"Secondary Mobile No",name:"sim_mob_no2",rules:[{required:!0,message:"Please enter a Secondary Mobile No"}],children:(0,I.jsx)(d.Z,{})})}),(0,I.jsx)(l.Z,{sm:12,md:12,lg:12,children:(0,I.jsx)(g.Z.Item,{name:"valid_from",label:"Valid From",initialValue:w()(m[6]),rules:[{required:!0,message:"Please enter a valid from"}],children:(0,I.jsx)(b.Z,{style:{width:"100%",fontSize:"16px"}})})}),(0,I.jsx)(l.Z,{sm:12,md:12,lg:12,children:(0,I.jsx)(g.Z.Item,{name:"valid_to",label:"Valid To",initialValue:w()(m[6]),rules:[{required:!0,message:"Please select a valid to"}],children:(0,I.jsx)(b.Z,{style:{width:"100%",fontSize:"16px"}})})})]}),(0,I.jsx)(o.Z,{align:"middle",children:(0,I.jsx)(l.Z,{span:12,children:(0,I.jsx)(g.Z.Item,{children:(0,I.jsxs)(S.Z,{wrap:!0,children:[(0,I.jsx)(c.ZP,{type:"primary",shape:"round",htmlType:"submit",children:"Update"}),(0,I.jsx)(c.ZP,{type:"primary",shape:"round",children:"Back"})]})})})})]})})})})})})},M=r(4951),E=function(){var e,n=(0,a.useState)([]),r=(0,s.Z)(n,2),_=(r[0],r[1]),g=(0,a.useState)([]),j=(0,s.Z)(g,2),b=(j[0],j[1],(0,a.useState)([])),S=(0,s.Z)(b,2),y=S[0],w=S[1],k=(0,a.useState)([]),C=(0,s.Z)(k,2),N=C[0],F=C[1],E=(0,a.useState)(!1),D=(0,s.Z)(E,2),Y=D[0],O=D[1],T=(0,a.useState)(!1),z=(0,s.Z)(T,2),q=z[0],V=z[1],L=(0,a.useState)(!1),U=(0,s.Z)(L,2),G=U[0],B=U[1],R=(0,a.useState)(""),H=(0,s.Z)(R,2),K=H[0],$=H[1],J=(0,a.useState)(""),Q=(0,s.Z)(J,2),W=Q[0],X=Q[1],ee=function(){V(!1),ne()},ne=function(){return(e=e||(0,i.Z)((0,t.Z)().mark((function e(){var n,r;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.ZP.post("sim_list");case 3:(n=e.sent).data&&Array.isArray(n.data.data)?(r=n.data.data.map((function(e){return{id:e.id,network_id:e.network_id,network_provider_name:e.network_provider_name,sim_imei_no:e.sim_imei_no,sim_mob_no1:e.sim_mob_no1,sim_mob_no2:e.sim_mob_no2,valid_from:e.valid_from,valid_to:e.valid_to}})),w(r),F(r)):(w(""),F(""),console.error("API request was not successful")),e.next=12;break;case 7:e.prev=7,e.t0=e.catch(0),w(""),F(""),console.error("Error fetching users:",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)};function re(e){O(!1),V(!1),B(!0);var n=e.id,r=e.sim_imei_no;X([n,"Sim",r])}(0,a.useEffect)((function(){ne()}),[]);var te=[{title:"Network",dataIndex:"network_provider_name"},{title:"Sim IMEI No",dataIndex:"sim_imei_no"},{title:"Sim Mobile Number",dataIndex:"sim_mob_no1"},{title:"Sim Mobile Number",dataIndex:"sim_mob_no2"},{title:"Edit",dataIndex:"edit",fixed:"right",render:function(e,n){return(0,I.jsx)("span",{style:{cursor:"pointer"},onClick:function(){return function(e){$([e.id,e.network_id,e.network_provider_name,e.sim_imei_no,e.sim_mob_no1,e.sim_mob_no2,e.valid_form,e.valid_to]),V(!0),O(!1),B(!1)}(n)},children:(0,I.jsx)(p.Z,{})})}},{title:"Assign",dataIndex:"edit",fixed:"right",render:function(e,n){return(0,I.jsxs)("span",{style:{cursor:"pointer"},onClick:function(){return re(n)},children:[(0,I.jsx)(p.Z,{})," "]})}}];return(0,I.jsx)(I.Fragment,{children:(0,I.jsxs)(o.Z,{gutter:6,children:[(0,I.jsx)(l.Z,{sm:24,md:14,lg:14,children:(0,I.jsxs)(u.Z,{title:"Sim",children:[(0,I.jsxs)(v.Z,{alignItems:"center",justifyContent:"space-between",mobileFlex:!1,children:[(0,I.jsxs)(v.Z,{className:"mb-1",mobileFlex:!1,children:[(0,I.jsx)("div",{className:"mr-md-3 mb-3",children:(0,I.jsx)(d.Z,{placeholder:"Search",prefix:(0,I.jsx)(h.Z,{}),onChange:function(e){return function(e){var n=e.currentTarget.value,r=n?y:N,t=Z.Z.wildCardSearch(r,n);w(t),_([])}(e)}})}),(0,I.jsx)("div",{className:"mb-3"})]}),(0,I.jsx)("div",{className:"mb-3",children:(0,I.jsx)(c.ZP,{type:"primary",icon:(0,I.jsx)(f.Z,{}),ghost:!0,onClick:function(){O(!0),V(!1),B(!1)},children:"Add Sim"})})]}),(0,I.jsx)("div",{className:"table-responsive",children:(0,I.jsx)(m.Z,{bordered:!0,columns:te,dataSource:y,rowKey:"id"})})]})}),(0,I.jsxs)(l.Z,{sm:24,md:10,lg:10,children:[Y&&(0,I.jsx)(P,{parentFunction:ee}),G&&(0,I.jsx)(M.default,{parentToChild:W,parentFunction:ee},W[0]),q&&(0,I.jsx)(A,{parentToChild:K,parentFunction:ee},K[0])]})]})})},D=E}}]);
//# sourceMappingURL=206.c433e457.chunk.js.map