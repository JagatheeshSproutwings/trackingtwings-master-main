"use strict";(self.webpackChunkemilus=self.webpackChunkemilus||[]).push([[510],{8470:function(e,t,n){var a=n(1413),l=n(4236).Z.div((function(e){var t=e.justifyContent,n=e.alignItems,l=e.flexDirection,r=e.gap,i=e.padding,s=e.margin,o={display:"flex",justifyContent:t,alignItems:n,gap:"number"===typeof r?"".concat(r,"px"):r};return l&&(o.flexDirection=l),i&&(o.padding=i),s&&(o.margin=s),(0,a.Z)({},o)}));t.Z=l},5510:function(e,t,n){n.r(t),n.d(t,{default:function(){return O}});var a=n(4165),l=n(5861),r=n(9439),i=n(2791),s=n(2999),o=n(1717),d=n(7615),c=n(7888),u=n(6106),v=n(914),m=n(6459),h=n(7354),x=n(3248),p=n(7007),f=n(8470),Z=n(1730),g=n(3685),j=n(6610),_=n(184),y=s.Z.Option,S=o.Z.RangePicker;var b=function(e){(0,m.Z)(e);var t=(0,i.useState)([]),n=(0,r.Z)(t,2),o=n[0],d=n[1],u=(0,i.useState)(!1),v=(0,r.Z)(u,2),b=(v[0],v[1]),w=(0,i.useState)(null),D=(0,r.Z)(w,2),Y=D[0],k=D[1],A=(0,i.useState)("All"),I=(0,r.Z)(A,2),C=I[0],N=I[1],M=(0,i.useState)([]),P=(0,r.Z)(M,2),V=P[0],R=P[1],F=[{title:"S.No",dataIndex:"s_no"},{title:"Vehicle Name",dataIndex:"vehicle_name"},{title:"Start Date",dataIndex:"start_date"},{title:"End Date",dataIndex:"end_date"},{title:"Location",dataIndex:"location"},{title:"Duration",dataIndex:"duration"},{title:"Map View",dataIndex:"map_view"}];(0,i.useEffect)((function(){function e(){return(e=(0,l.Z)((0,a.Z)().mark((function e(){var t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.ZP.get("vehicle_list");case 3:(t=e.sent).data.success?R(t.data.data):console.error("API request was not successful"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("Error fetching vehicle options:",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var L=function(){var e=(0,l.Z)((0,a.Z)().mark((function e(){var t,n,l,i,s,c;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Selected Date Range:",Y),Y&&(t=(0,r.Z)(Y,2),n=t[0],l=t[1],console.log("Start Date:",n.format("YYYY-MM-DD")),console.log("End Date:",l.format("YYYY-MM-DD"))),console.log("Selected Vehicle ID:",C),i={start_day:Y?Y[0].format("YYYY-MM-DD HH:mm:ss"):null,end_day:Y?Y[1].format("YYYY-MM-DD HH:mm:ss"):null,device_imei:"0"===C?null:C},d([]),b(!0),e.prev=6,e.next=9,p.ZP.post("get_idle_report",i);case 9:s=e.sent,console.log(s.data),s.data&&Array.isArray(s.data.data)?(c=s.data.data.map((function(e){return{s_no:e.id,vehicle_name:e.vehicle_name,start_date:e.start_datetime,end_date:e.end_datetime,location:e.start_latitude+":"+e.start_longitude,duration:e.idle_duration}})),console.log(c),d(c),console.log("idleList:",o)):(d([]),console.log("Response data is not in the expected format:",s.data)),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(6),console.error(e.t0);case 17:b(!1);case 18:case"end":return e.stop()}}),e,null,[[6,14]])})));return function(){return e.apply(this,arguments)}}();return(0,_.jsx)("div",{children:(0,_.jsxs)(c.Z,{title:"Idle Report",children:[(0,_.jsx)(f.Z,{alignItems:"center",justifyContent:"space-between",mobileFlex:!1,children:(0,_.jsxs)(f.Z,{className:"mb-1",mobileFlex:!1,children:[(0,_.jsx)("div",{className:"mr-md-3 mr-3",children:(0,_.jsx)(S,{showTime:!0,name:"range_picker",format:"YYYY-MM-DD hh:mm:ss",onChange:function(e){k(e)}})}),(0,_.jsx)("div",{className:"mr-md-3 mb-3",children:(0,_.jsxs)(s.Z,{defaultValue:"All",className:"w-100",style:{minWidth:180},name:"vehicle_id",placeholder:"Vehicle",onChange:function(e){N(e)},value:C,children:[(0,_.jsx)(y,{value:"All",children:"All"}),Array.isArray(V)?V.map((function(e){return(0,_.jsx)(y,{value:e.device_imei,children:e.vehicle_name},e.device_imei)})):(0,_.jsx)(y,{value:"Loading",children:"Loading..."})]})}),(0,_.jsx)("div",{className:"mb-3 mr-3",children:(0,_.jsx)(h.ZP,{type:"primary",success:!0,icon:(0,_.jsx)(Z.Z,{}),onClick:L,children:"Search"})}),(0,_.jsx)("div",{className:"mb-3",children:(0,_.jsx)(h.ZP,{type:"primary",icon:(0,_.jsx)(g.Z,{}),onClick:function(){(new j.i).addSheet("test").addColumns(F).addDataSource(o,{str2Percent:!0}).saveAs("Excel.xlsx")},children:"Export"})})]})}),(0,_.jsx)(x.Z,{bordered:!0,rowKey:"id",columns:F,dataSource:o})]})})},w=s.Z.Option,D=o.Z.RangePicker,Y=function(){var e=(0,i.useState)([]),t=(0,r.Z)(e,2),n=t[0],o=t[1],d=(0,i.useState)(!1),u=(0,r.Z)(d,2),v=u[0],m=u[1],y=(0,i.useState)(null),S=(0,r.Z)(y,2),b=S[0],Y=S[1],k=(0,i.useState)("All"),A=(0,r.Z)(k,2),I=A[0],C=A[1],N=(0,i.useState)([]),M=(0,r.Z)(N,2),P=M[0],V=M[1];(0,i.useEffect)((function(){function e(){return(e=(0,l.Z)((0,a.Z)().mark((function e(){var t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.ZP.get("vehicle_list");case 3:(t=e.sent).data.success?V(t.data.data):console.error("API request was not successful"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("Error fetching vehicle options:",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var R=function(){var e=(0,l.Z)((0,a.Z)().mark((function e(){var t,l,i,s,d,c;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Selected Date Range:",b),b&&(t=(0,r.Z)(b,2),l=t[0],i=t[1],console.log("Start Date:",l.format("YYYY-MM-DD")),console.log("End Date:",i.format("YYYY-MM-DD"))),console.log("Selected Vehicle ID:",I),s={start_day:b?b[0].format("YYYY-MM-DD HH:mm:ss"):null,end_day:b?b[1].format("YYYY-MM-DD HH:mm:ss"):null,device_imei:"0"===I?null:I},o([]),m(!0),e.prev=6,e.next=9,p.ZP.post("get_parking_report",s);case 9:d=e.sent,console.log(d.data),d.data&&Array.isArray(d.data.data)?(c=d.data.data.map((function(e){return{s_no:e.id,vehicle_name:e.vehicle_name,start_date:e.start_datetime,end_date:e.end_datetime,location:e.start_latitude+":"+e.start_longitude,duration:e.parking_duration}})),console.log(c),o(c),console.log("parkingList:",n)):(o([]),console.log("Response data is not in the expected format:",d.data)),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(6),console.error(e.t0);case 17:m(!1);case 18:case"end":return e.stop()}}),e,null,[[6,14]])})));return function(){return e.apply(this,arguments)}}(),F=[{title:"S.No",dataIndex:"s_no"},{title:"Vehicle Name",dataIndex:"vehicle_name"},{title:"Start Date",dataIndex:"start_date"},{title:"End Date",dataIndex:"end_date"},{title:"Location",dataIndex:"location"},{title:"Duration",dataIndex:"duration"},{title:"Map View",dataIndex:"map_view"}];return(0,_.jsx)(_.Fragment,{children:(0,_.jsxs)(c.Z,{title:"Parking Report",children:[(0,_.jsx)(f.Z,{alignItems:"center",justifyContent:"space-between",mobileFlex:!1,children:(0,_.jsxs)(f.Z,{className:"mb-1",mobileFlex:!1,children:[(0,_.jsx)("div",{className:"mr-md-3 mr-3",children:(0,_.jsx)(D,{showTime:!0,name:"range_picker",format:"YYYY-MM-DD hh:mm:ss",onChange:function(e){Y(e)}})}),(0,_.jsx)("div",{className:"mr-md-3 mb-3",children:(0,_.jsxs)(s.Z,{defaultValue:"All",className:"w-100",style:{minWidth:180},name:"device_imei",placeholder:"Vehicle",onChange:function(e){C(e)},value:I,children:[(0,_.jsx)(w,{value:"All",children:"All"}),Array.isArray(P)?P.map((function(e){return(0,_.jsx)(w,{value:e.device_imei,children:e.vehicle_name},e.device_imei)})):(0,_.jsx)(w,{value:"Loading",children:"Loading..."})]})}),(0,_.jsx)("div",{className:"mb-3 mr-3",children:(0,_.jsx)(h.ZP,{type:"primary",success:!0,icon:(0,_.jsx)(Z.Z,{}),onClick:R,children:"Search"})}),(0,_.jsx)("div",{className:"mb-3",children:(0,_.jsx)(h.ZP,{type:"primary",icon:(0,_.jsx)(g.Z,{}),onClick:function(){(new j.i).addSheet("test").addColumns(F).addDataSource(n,{str2Percent:!0}).saveAs("Excel.xlsx")},children:"Export"})})]})}),(0,_.jsx)("div",{className:"table-responsive",children:v?(0,_.jsx)("div",{children:"Loading..."}):n.length>0?(0,_.jsx)(x.Z,{bordered:!0,columns:F,dataSource:n}):(0,_.jsx)("p",{children:"No Data Found"})})]})})},k=n(7313),A=n(9961),I=n(3407),C=s.Z.Option,N=o.Z.RangePicker,M=[11.0467,76.9254],P=k.et.BaseLayer,V=function(){var e=function(e){alert("Selected Values "+e)};return(0,_.jsx)(_.Fragment,{children:(0,_.jsxs)(c.Z,{title:"Playback History",children:[(0,_.jsx)(f.Z,{alignItems:"center",justifyContent:"space-between",mobileFlex:!1,children:(0,_.jsxs)(f.Z,{className:"mb-1",mobileFlex:!1,children:[(0,_.jsx)("div",{className:"mr-md-6 mr-3",children:(0,_.jsxs)(s.Z,{showSearch:!0,defaultValue:"Today",className:"w-100",style:{minWidth:180},onChange:e,name:"date_selection",children:[(0,_.jsx)("option",{value:"1",children:"Today"}),(0,_.jsx)("option",{value:"2",children:"Last 7 Days"}),(0,_.jsx)("option",{value:"3",children:"Last Month"}),(0,_.jsx)("option",{value:"4",children:"Custom"})]})}),(0,_.jsx)("div",{className:"mr-md-3 mr-3",children:(0,_.jsx)(N,{showTime:!0,name:"date_range",onChange:e})}),(0,_.jsx)("div",{className:"mr-md-3 mb-3",children:(0,_.jsxs)(s.Z,{mode:"multiple",name:"vehicle_id",onChange:e,defaultValue:"All",className:"w-100",style:{minWidth:180},placeholder:"Vehicle",children:[(0,_.jsx)(C,{value:"1",children:"TN01AB1234"}),(0,_.jsx)(C,{value:"2",children:"TN02AB9874"})]})}),(0,_.jsx)("div",{className:"mb-3",children:(0,_.jsx)(h.ZP,{type:"primary",success:!0,icon:(0,_.jsx)(Z.Z,{}),onClick:function(e){alert(e),console.log(e)},children:"Search"})})]})}),(0,_.jsx)("div",{className:"table-responsive",children:(0,_.jsx)(c.Z,{children:(0,_.jsx)(A.h,{center:M,zoom:13,scrollWheelZoom:!0,children:(0,_.jsxs)(k.et,{children:[(0,_.jsx)(P,{checked:!0,name:"OpenStreetMap",children:(0,_.jsx)(I.I,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'\xa9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})}),(0,_.jsx)(P,{name:"Google-Street View",children:(0,_.jsx)(I.I,{attribution:"Google Maps",url:"https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"})}),(0,_.jsx)(P,{checked:!0,name:"Google-Satelite",children:(0,_.jsx)(I.I,{url:"https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",maxZoom:20,subdomains:["mt1","mt2","mt3"]})})]})})})})]})})},R=function(){return(0,_.jsx)("div",{children:"KeyonKeyOffReport"})},F=n(364),L=s.Z.Option,O=(o.Z.RangePicker,function(){var e=d.Z.useForm(),t=(0,r.Z)(e,1)[0],n=(0,i.useState)(!1),o=(0,r.Z)(n,2),m=(o[0],o[1],(0,i.useState)("")),h=(0,r.Z)(m,2),x=(h[0],h[1],(0,i.useState)("")),f=(0,r.Z)(x,2),Z=f[0],g=f[1],j=(0,i.useState)(localStorage.getItem("id")||""),y=(0,r.Z)(j,2),S=y[0],w=y[1],D=(0,i.useState)(localStorage.getItem("role")||""),k=(0,r.Z)(D,2),A=k[0],I=k[1],C=(0,i.useState)(""),N=(0,r.Z)(C,2),M=N[0],P=N[1],O=(0,i.useState)([]),E=(0,r.Z)(O,2),H=(E[0],E[1],(0,i.useState)([])),q=(0,r.Z)(H,2),z=q[0],T=q[1],K=(0,i.useState)([]),W=(0,r.Z)(K,2),B=W[0],G=W[1],U=(0,i.useState)([]),J=(0,r.Z)(U,2),Q=J[0],X=J[1],$=(0,i.useState)([]),ee=(0,r.Z)($,2),te=ee[0],ne=ee[1],ae=(0,i.useState)([]),le=(0,r.Z)(ae,2),re=le[0],ie=le[1],se=(0,i.useState)(""),oe=(0,r.Z)(se,2),de=(oe[0],oe[1],(0,i.useState)("")),ce=(0,r.Z)(de,2),ue=ce[0],ve=(ce[1],(0,i.useState)("")),me=(0,r.Z)(ve,2),he=(me[0],me[1],(0,i.useState)("")),xe=(0,r.Z)(he,2),pe=(xe[0],xe[1],(0,i.useState)("")),fe=(0,r.Z)(pe,2),Ze=(fe[0],fe[1],(0,F.v9)((function(e){return e.auth})),function(){var e=(0,l.Z)((0,a.Z)().mark((function e(){var t,n,l,r,i,s,o,d,c,u,v,m,h,x,f,Z,g;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("User List Data Begins.."),console.log(S),console.log(A),t={user_id:S},e.next=6,p.ZP.post("role_based_user_list",t).then((function(e){return e})).catch((function(e){return[]}));case 6:n=e.sent,1==A&&(console.log("Super Admin"),T(null===n||void 0===n||null===(l=n.data)||void 0===l||null===(r=l.data)||void 0===r?void 0:r.user_list)),2==A&&(console.log("Admin Login"),console.log(null===n||void 0===n||null===(i=n.data)||void 0===i||null===(s=i.data)||void 0===s?void 0:s.user_list),G(null===n||void 0===n||null===(o=n.data)||void 0===o||null===(d=o.data)||void 0===d?void 0:d.user_list)),3==A&&(console.log("Distributor"),console.log(null===n||void 0===n||null===(c=n.data)||void 0===c?void 0:c.data),X(null===n||void 0===n||null===(u=n.data)||void 0===u||null===(v=u.data)||void 0===v?void 0:v.user_list),console.log(Q)),4==A&&(console.log("Dealer"),ie(null===n||void 0===n||null===(m=n.data)||void 0===m||null===(h=m.data)||void 0===h?void 0:h.user_list),ne(null===n||void 0===n||null===(x=n.data)||void 0===x||null===(f=x.data)||void 0===f?void 0:f.subdealer_list)),5==A&&(console.log("Subdealer"),ie(null===n||void 0===n||null===(Z=n.data)||void 0===Z||null===(g=Z.data)||void 0===g?void 0:g.user_list));case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),ge=function(){return localStorage.getItem("id")},je=function(){return localStorage.getItem("role")},_e=function(){var e=(0,l.Z)((0,a.Z)().mark((function e(n,l){var r,i,s,o,d,c;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.setFieldValue(""),G([]),X([]),ne([]),P([]),d={user_id:n},e.next=8,p.ZP.post("role_based_user_list",d).then((function(e){return e})).catch((function(e){return e}));case 8:c=e.sent,console.log(null===c||void 0===c||null===(r=c.data)||void 0===r||null===(i=r.data)||void 0===i?void 0:i.user_list),G(null===c||void 0===c||null===(s=c.data)||void 0===s||null===(o=s.data)||void 0===o?void 0:o.user_list);case 11:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),ye=function(){var e=(0,l.Z)((0,a.Z)().mark((function e(n,l){var r,i,s,o,d,c;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.setFieldValue(""),X(""),ne(""),P(""),d={user_id:n},e.next=7,p.ZP.post("role_based_user_list",d).then((function(e){return e})).catch((function(e){return e}));case 7:c=e.sent,console.log(null===c||void 0===c||null===(r=c.data)||void 0===r||null===(i=r.data)||void 0===i?void 0:i.user_list),X(null===c||void 0===c||null===(s=c.data)||void 0===s||null===(o=s.data)||void 0===o?void 0:o.user_list);case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Se=function(){var e=(0,l.Z)((0,a.Z)().mark((function e(n,l){var r,i,s,o,d,c,u,v,m,h;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return ne([]),P(""),ie([]),t.setFieldValue(""),m={user_id:n},e.next=7,p.ZP.post("role_based_user_list",m).then((function(e){return e})).catch((function(e){return e}));case 7:h=e.sent,console.log(null===h||void 0===h?void 0:h.data),ie(null===h||void 0===h||null===(r=h.data)||void 0===r||null===(i=r.data)||void 0===i?void 0:i.user_list),ne(null===h||void 0===h||null===(s=h.data)||void 0===s||null===(o=s.data)||void 0===o?void 0:o.subdealer_list),console.log(Array.isArray(null===h||void 0===h||null===(d=h.data)||void 0===d||null===(c=d.data)||void 0===c?void 0:c.subdealer_list)?(null===h||void 0===h||null===(u=h.data)||void 0===u||null===(v=u.data)||void 0===v?void 0:v.subdealer_list).length:0);case 12:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),be=function(){var e=(0,l.Z)((0,a.Z)().mark((function e(n,l){var r,i,s,o;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return P(""),ie([]),t.setFieldValue(""),s={user_id:n},e.next=6,p.ZP.post("role_based_user_list",s).then((function(e){return e})).catch((function(e){return e}));case 6:o=e.sent,console.log(null===o||void 0===o?void 0:o.data),ie(null===o||void 0===o||null===(r=o.data)||void 0===r||null===(i=r.data)||void 0===i?void 0:i.user_list);case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),we=function(){var e=(0,l.Z)((0,a.Z)().mark((function e(t,n){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:P(t);case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){6==je()&&""!=ge()&&P(ge()),w(ge()),I(je()),Ze()}),[]);var De=(0,_.jsx)(c.Z,{children:(0,_.jsxs)(d.Z,{layout:"vertical",size:"small",children:[1==A&&(0,_.jsx)(d.Z.Item,{label:"Admin",name:"admin_id",size:"small",rules:[{required:!0}],children:(0,_.jsx)(s.Z,{onChange:_e,children:Array.isArray(z)?z.map((function(e){return(0,_.jsx)(s.Z.Option,{role_id:"2",value:null===e||void 0===e?void 0:e.id,children:null===e||void 0===e?void 0:e.name},null===e||void 0===e?void 0:e.id)})):(0,_.jsx)(s.Z.Option,{role_id:"2",value:""})})}),(1==A||2==A)&&(0,_.jsx)(d.Z.Item,{label:"Distributor",name:"distributor_id",rules:[{required:!0}],children:(0,_.jsx)(s.Z,{onChange:ye,children:Array.isArray(B)?B.map((function(e){return(0,_.jsx)(L,{role_id:"3",value:null===e||void 0===e?void 0:e.id,children:null===e||void 0===e?void 0:e.name},null===e||void 0===e?void 0:e.id)})):(0,_.jsx)(L,{role_id:"3",value:ue})})}),(1==A||2==A||3==A)&&(0,_.jsx)(d.Z.Item,{label:"Dealer",name:"dealer_id",rules:[{required:!0}],children:(0,_.jsx)(s.Z,{onChange:Se,children:Array.isArray(Q)?Q.map((function(e){return(0,_.jsx)(L,{role_id:"4",value:null===e||void 0===e?void 0:e.id,children:null===e||void 0===e?void 0:e.name},null===e||void 0===e?void 0:e.id)})):(0,_.jsx)(L,{role_id:"4",value:""})})}),(1==A||2==A||3==A||4==A)&&(0,_.jsx)(d.Z.Item,{label:"Subdealer",name:"subdealer_id",rules:[{required:!0}],children:(0,_.jsx)(s.Z,{onChange:be,children:Array.isArray(te)&&te.length>0?te.map((function(e){return(0,_.jsx)(L,{role_id:"5",value:null===e||void 0===e?void 0:e.id,children:null===e||void 0===e?void 0:e.name},null===e||void 0===e?void 0:e.id)})):(0,_.jsx)(L,{})})}),(1==A||2==A||3==A||4==A||5==A)&&(0,_.jsx)(d.Z.Item,{label:"Customer",name:"customer_id",rules:[{required:!0}],children:(0,_.jsx)(s.Z,{onChange:we,children:Array.isArray(re)?re.map((function(e){return(0,_.jsx)(L,{role_id:"6",value:null===e||void 0===e?void 0:e.id,children:null===e||void 0===e?void 0:e.name},null===e||void 0===e?void 0:e.id)})):(0,_.jsx)(L,{role_id:"6",value:""})})}),(0,_.jsx)(d.Z.Item,{label:"Reports",rules:[{required:!0}],name:"report_id",children:(0,_.jsxs)(s.Z,{onChange:function(e){""!=M&&g(e)},children:[(0,_.jsx)(s.Z.Option,{value:"1",children:"Idle Report"}),(0,_.jsx)(s.Z.Option,{value:"2",children:"Parking Report"}),(0,_.jsx)(s.Z.Option,{value:"3",children:"Playback Report"}),(0,_.jsx)(s.Z.Option,{value:"4",children:"Keyon KeyOff Report"})]})})]})});return(0,_.jsx)(_.Fragment,{children:(0,_.jsxs)(u.Z,{gutter:6,children:[(0,_.jsx)(v.Z,{xs:24,sm:24,xl:4,md:4,lg:4,xxl:4,children:De}),(0,_.jsx)(v.Z,{xs:24,sm:24,xl:20,md:20,lg:20,xxl:20,children:function(){switch(Z){case"1":return(0,_.jsx)(b,{});case"2":return(0,_.jsx)(Y,{});case"3":return(0,_.jsx)(V,{});case"4":return(0,_.jsx)(R,{});default:return""}}()})]})})})},914:function(e,t,n){var a=n(9752);t.Z=a.Z},6106:function(e,t,n){var a=n(7545);t.Z=a.Z}}]);
//# sourceMappingURL=510.c2204751.chunk.js.map