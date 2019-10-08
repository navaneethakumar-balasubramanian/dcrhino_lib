(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78055443"],{"2fdb":function(e,t,s){"use strict";var a=s("5ca1"),i=s("d2c8"),n="includes";a(a.P+a.F*s("5147")(n),"String",{includes:function(e){return!!~i(this,e,n).indexOf(e,arguments.length>1?arguments[1]:void 0)}})},"34a7":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"about"},[s("v-toolbar",{attrs:{flat:"",color:"white"}},[s("v-toolbar-title",[e._v("Blasthole Observations from : "+e._s(e.mine_name)),s("br"),s("span",{staticClass:"body-2 font-weight-light"},[e._v(e._s(e.filtered_data.length)+" results found.")])]),s("v-spacer"),s("v-text-field",{attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":"",loading:e.loading},on:{"click:append":e.searchWeb,keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchWeb(t)}},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),s("v-data-table",{staticClass:"elevation-1",attrs:{pagination:e.pagination,headers:e.headers,items:e.filtered_data,"item-key":"bo_id","select-all":""},on:{"update:pagination":function(t){e.pagination=t}},scopedSlots:e._u([{key:"headerCell",fn:function(t){return[s("v-dialog",{attrs:{scrollable:"","max-width":"300px"},scopedSlots:e._u([{key:"activator",fn:function(a){var i=a.on;return[s("span",e._g({staticStyle:{cursor:"pointer"},attrs:{ripple:""}},i),[e._v(e._s(t.header.text))])]}}],null,!0),model:{value:t.header.dialog,callback:function(s){e.$set(t.header,"dialog",s)},expression:"props.header.dialog"}},[s("v-card",[s("v-card-title",[e._v("Select "+e._s(t.header.text))]),s("v-divider"),s("v-card-text",{staticClass:"pa-0 pm-0",staticStyle:{height:"300px"}},[s("v-list",{staticClass:"pa-0 pm-0"},[s("v-list-tile",{attrs:{ripple:""}},[s("v-list-tile-action",[s("v-checkbox",{on:{change:function(s){return e.togleAllOnList(t.header)}},model:{value:t.header.allChecked,callback:function(s){e.$set(t.header,"allChecked",s)},expression:"props.header.allChecked"}})],1),s("v-list-tile-title",[e._v("Select all")])],1),s("v-divider"),e._l(t.header.values,(function(a,i){return s("v-list-tile",{key:i,attrs:{ripple:""}},[s("v-list-tile-action",[s("v-checkbox",{on:{change:function(s){return e.changed_filter(a,t.header)}},model:{value:a.checked,callback:function(t){e.$set(a,"checked",t)},expression:"item.checked"}})],1),s("v-list-tile-content",[s("v-list-tile-title",[e._v(e._s(a.label)+" ")])],1)],1)}))],2)],1)],1)],1)]}},{key:"items",fn:function(t){return[s("td",[s("v-checkbox",{attrs:{primary:"","hide-details":""},model:{value:t.selected,callback:function(s){e.$set(t,"selected",s)},expression:"items.selected"}})],1),s("td",{staticClass:"text-xs-left"},[e._v(e._s(t.item.bo_id))]),s("td",{staticClass:"text-xs-left"},[e._v(e._s(t.item.bench_name))]),s("td",{staticClass:"text-xs-left"},[e._v(e._s(t.item.pattern_name))]),s("td",{staticClass:"text-xs-left"},[e._v(e._s(t.item.hole_name))]),s("td",{staticClass:"text-xs-left"},[e._v(e._s(t.item.hole_id))]),s("td",{staticClass:"text-xs-left"},[e._v(e._s(t.item.rig_id))]),s("td",{staticClass:"text-xs-left"},[e._v(e._s(t.item.sensor_id))]),s("td",{staticClass:"text-xs-left"},[e._v(e._s(t.item.digitizer_id))])]}}]),model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}}),e.visible_buttons?s("v-btn",{attrs:{flat:"",color:"light-blue"},on:{click:function(t){return e.process_selection()}}},[e._v("Process selected")]):e._e(),s("v-dialog",{attrs:{scrollable:"","max-width":"600px"},model:{value:e.select_process_flow,callback:function(t){e.select_process_flow=t},expression:"select_process_flow"}},[s("v-card",[s("v-card-title",[e._v("Select the process flow to use")]),s("v-divider"),s("v-card-text",{staticClass:"pa-0 pm-0",staticStyle:{height:"300px"}},[s("v-list",{staticClass:"pa-0 pm-0",attrs:{dense:""}},e._l(e.process_flows,(function(t,a){return s("v-list-tile",{key:a,attrs:{ripple:""},on:{click:function(s){return e.process_using(t)}}},[s("v-list-tile-content",[s("v-list-tile-title",{domProps:{textContent:e._s(t)}})],1)],1)})),1)],1)],1)],1),s("v-dialog",{attrs:{scrollable:"","max-width":"600px"},model:{value:e.edit_process_flow,callback:function(t){e.edit_process_flow=t},expression:"edit_process_flow"}},[s("v-card",[s("v-card-title",[e._v("Select the process flow to use")]),s("v-divider"),s("v-card-text",{staticClass:"pa-0 pm-0",staticStyle:{height:"300px"}},[s("v-list",{staticClass:"pa-0 pm-0",attrs:{dense:""}},e._l(e.process_flows,(function(t,a){return s("v-list-tile",{key:a,attrs:{ripple:""},on:{click:function(s){return e.process_using(t)}}},[s("v-list-tile-content",[s("v-list-tile-title",{domProps:{textContent:e._s(t)}})],1)],1)})),1)],1)],1)],1),s("v-snackbar",{attrs:{color:"error",bottom:"",right:"","multi-line":"",timeout:3e3},model:{value:e.warning,callback:function(t){e.warning=t},expression:"warning"}},[e._v(e._s(e.warning_text))]),s("v-snackbar",{attrs:{bottom:"",right:"","multi-line":"",timeout:3e3},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}},[e._v(e._s(e.message_text))])],1)},i=[],n=(s("5df3"),s("4f7f"),s("75fc")),l=(s("386d"),s("456d"),s("6762"),s("2fdb"),s("ac6a"),{data:function(){return{edit_process_flow:!1,select_process_flow:!1,process_flows:[],search:null,blasthole_observations:[],filtered_data:[],clicked_processed_hole_id:!1,show_dialog:!1,show_dialog_comparison:!1,selected:[],pagination:{rowsPerPage:25},warning:null,warning_text:null,message:null,message_text:null,headers:[],confirm_process_flow:null}},created:function(){this.$store.dispatch("GET_BLASTHOLE_OBSERVATIONS",{mine_name:this.mine_name})},props:["mine_name"],methods:{confirm_process:function(e){self.confirm_process_flow=e,this.select_process_flow=!1},process_selection:function(){var e=this,t={mine_name:this.mine_name,responseType:"arraybuffer"};axios.post("/api/process_flows",t).then((function(t){e.process_flows=t.data.process_flows})),this.select_process_flow=!0},process_using:function(e){var t=this,s=this,a={mine_name:this.mine_name,blasthole_obs:this.selected,process_flow:e};axios.post("/api/process_holes_with",a).then((function(e){1==e.data.data?(s.message=!0,s.message_text="Added "+t.selected.length+" blastholes to processing queue."):(s.warning=!0,s.warning_text="Fail to add "+t.selected.length+" blastholes to processing queue.")})),this.select_process_flow=!1},moment:function(e){return window.moment.unix(e)},togleAllOnList:function(e){for(var t in e.values)e.values[t].checked=e.allChecked;this.changed_filter()},changed_filter:function(){var e=[];for(var t in this.server_data){t=this.server_data[t];var s=!0;for(var a in this.headers)a=this.headers[a],Object.keys(a).includes("values")&&Object.keys(a.values).includes(t[a.value])&&0==a.values[t[a.value]].checked&&(s=!1);s&&e.push(t)}for(var i in this.filtered_data=e,this.headers)i=this.headers[i],i.allChecked=this.allChecked(i.values)},allChecked:function(e){for(var t in e)if(0==e[t].checked)return!1;return!0},get_processed_selection:function(){if(this.selected.length>1){var e={mine_name:this.mine_name,processed_holes:this.selected,responseType:"arraybuffer"};axios.post("/get_processed_csv",e).then((function(e){var t=window.URL.createObjectURL(new Blob([e.data])),s=document.createElement("a");s.href=t,s.setAttribute("download","processed.csv"),document.body.appendChild(s),s.click()}))}else this.warning=!0,this.warning_text="Select a few holes to download."},searchWeb:function(){this.$store.dispatch("GET_PROCESSED",{mine_name:this.mine_name,search:this.search})},showProcessedHole:function(e){this.show_dialog=!0,this.clicked_processed_hole_id=e,this.$store.dispatch("GET_HOLE_INFO",{mine_name:this.mine_name,processed_hole_id:e})}},watch:{server_data:function(e,t){function s(e){var t={};for(var s in e)t[e[s]]={label:e[s],checked:!0};return t}if(e){var a=e,i=Object(n["a"])(new Set(a.map((function(e){return e.bo_id})))),l=(Object(n["a"])(new Set(a.map((function(e){return e.flow_id})))),Object(n["a"])(new Set(a.map((function(e){return e.bench_name}))))),r=Object(n["a"])(new Set(a.map((function(e){return e.pattern_name})))),o=Object(n["a"])(new Set(a.map((function(e){return e.hole_name})))),c=Object(n["a"])(new Set(a.map((function(e){return e.hole_id})))),d=Object(n["a"])(new Set(a.map((function(e){return e.rig_id})))),u=Object(n["a"])(new Set(a.map((function(e){return e.sensor_id})))),_=Object(n["a"])(new Set(a.map((function(e){return e.digitizer_id}))));this.headers=[{text:"Id",value:"bo_id",sortable:!1,values:s(i)},{text:"Bench",value:"bench_name",sortable:!1,values:s(l),allChecked:!0},{text:"Pattern",value:"pattern_name",sortable:!1,values:s(r),allChecked:!0},{text:"Hole_name",value:"hole_name",sortable:!1,values:s(o),allChecked:!0},{text:"Hole_id",value:"hole_id",sortable:!1,values:s(c),allChecked:!0},{text:"Rig",value:"rig_id",sortable:!1,values:s(d),allChecked:!0},{text:"Sensor",value:"sensor_id",sortable:!1,values:s(u),allChecked:!0},{text:"Digitizer",value:"digitizer_id",sortable:!1,values:s(_),allChecked:!0}],this.filtered_data=e}else this.filtered_data=[]}},computed:{visible_buttons:function(){return this.selected.length>0},server_data:function(){return this.$store.state.blasthole_observations.blasthole_observations},loading:function(){return this.$store.state.blasthole_observations.loading}}}),r=l,o=s("2877"),c=s("6544"),d=s.n(c),u=s("8336"),_=s("b0af"),h=s("99d9"),f=s("12b2"),v=s("ac7c"),p=s("8fea"),m=s("169a"),b=s("ce7e"),g=s("8860"),x=s("ba95"),w=s("40fe"),k=s("5d23"),C=s("2db4"),S=s("9910"),y=s("2677"),O=s("71d9"),T=s("2a7f"),V=Object(o["a"])(r,a,i,!1,null,null,null);t["default"]=V.exports;d()(V,{VBtn:u["a"],VCard:_["a"],VCardText:h["b"],VCardTitle:f["a"],VCheckbox:v["a"],VDataTable:p["a"],VDialog:m["a"],VDivider:b["a"],VList:g["a"],VListTile:x["a"],VListTileAction:w["a"],VListTileContent:k["a"],VListTileTitle:k["b"],VSnackbar:C["a"],VSpacer:S["a"],VTextField:y["a"],VToolbar:O["a"],VToolbarTitle:T["a"]})},"456d":function(e,t,s){var a=s("4bf8"),i=s("0d58");s("5eda")("keys",(function(){return function(e){return i(a(e))}}))},5147:function(e,t,s){var a=s("2b4c")("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(s){try{return t[a]=!1,!"/./"[e](t)}catch(i){}}return!0}},"5eda":function(e,t,s){var a=s("5ca1"),i=s("8378"),n=s("79e5");e.exports=function(e,t){var s=(i.Object||{})[e]||Object[e],l={};l[e]=t(s),a(a.S+a.F*n((function(){s(1)})),"Object",l)}},6762:function(e,t,s){"use strict";var a=s("5ca1"),i=s("c366")(!0);a(a.P,"Array",{includes:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),s("9c6c")("includes")},aae3:function(e,t,s){var a=s("d3f4"),i=s("2d95"),n=s("2b4c")("match");e.exports=function(e){var t;return a(e)&&(void 0!==(t=e[n])?!!t:"RegExp"==i(e))}},d2c8:function(e,t,s){var a=s("aae3"),i=s("be13");e.exports=function(e,t,s){if(a(t))throw TypeError("String#"+s+" doesn't accept regex!");return String(i(e))}}}]);
//# sourceMappingURL=chunk-78055443.dfd924c9.js.map