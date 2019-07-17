(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ab0e7"],{"143a":function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"about"},[l("v-toolbar",{attrs:{flat:"",color:"white"}},[l("v-toolbar-title",[e._v("Processed files from : "+e._s(e.mine_name)+" ")]),l("v-spacer"),l("v-text-field",{attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":"",loading:e.loading},on:{"click:append":e.searchWeb,keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchWeb(t)}},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),e.show_dialog_comparison?e._e():l("v-data-table",{staticClass:"elevation-1",attrs:{pagination:e.pagination,headers:e.headers,items:e.processed,"item-key":"processed_hole_id","select-all":"","hide-actions":""},on:{"update:pagination":function(t){e.pagination=t}},scopedSlots:e._u([{key:"headerCell",fn:function(t){return[l("v-dialog",{attrs:{scrollable:"","max-width":"300px"},scopedSlots:e._u([{key:"activator",fn:function(a){var s=a.on;return[l("div",e._g({},s),[l("span",[e._v(e._s(t.header.text))]),t.header.values?l("div",{staticClass:"font-weight-light font-italic"},[e._v(e._s(t.header.selected))]):e._e()])]}}],null,!0),model:{value:t.header.dialog,callback:function(l){e.$set(t.header,"dialog",l)},expression:"props.header.dialog"}},[l("v-card",[l("v-card-title",[e._v("Select Country")]),l("v-divider"),l("v-card-text",{staticClass:"pa-0 pm-0",staticStyle:{height:"300px"}},[l("v-list",{staticClass:"pa-0 pm-0"},e._l(t.header.values,function(t,a){return l("v-list-tile",{key:a,on:{click:function(e){}}},[l("v-list-tile-title",[e._v(e._s(t))])],1)}),1)],1),l("v-divider"),l("v-card-actions",[l("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:function(t){e.dialog=!1}}},[e._v("Close")]),l("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:function(t){e.dialog=!1}}},[e._v("Save")])],1)],1)],1)]}},{key:"items",fn:function(t){return[l("td",[l("v-checkbox",{attrs:{primary:"","hide-details":""},model:{value:t.selected,callback:function(l){e.$set(t,"selected",l)},expression:"items.selected"}})],1),l("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.processed_hole_id))]),l("td",{staticClass:"text-xs-right"},[e._v(e._s(e.moment(t.item.processed_at_ts).format("YYYY-MM-DD hh:mm:ss")))]),l("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.bench_name))]),l("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.pattern_name))]),l("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.hole_name))]),l("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.hole_id))]),l("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.rig_id))]),l("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.sensor_id))]),l("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.digitizer_id))]),l("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.flow_id))]),l("td",{staticClass:"text-xs-right"},[1==t.item.to_mp?l("v-icon",{attrs:{color:"green"}},[e._v("radio_button_checked")]):l("v-icon",{attrs:{color:"red"}},[e._v("radio_button_unchecked")])],1),l("td",[l("v-btn",{attrs:{outline:"",icon:"",color:"indigo"},on:{click:function(l){return e.showProcessedHole(t.item.processed_hole_id)}}},[l("v-icon",[e._v("info")])],1)],1)]}}],null,!1,1439715580),model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}}),l("v-btn",{attrs:{flat:"",color:"light-blue"},on:{click:function(t){return e.compare_selection()}}},[e._v("Compare selection")]),l("v-btn",{attrs:{flat:"",color:"light-blue"},on:{click:function(t){return e.get_zipped_plots()}}},[e._v("Download selection plots")]),l("v-btn",{attrs:{flat:"",color:"light-blue"},on:{click:e.get_processed_selection}},[l("v-icon",{attrs:{left:"",dark:""}},[e._v("cloud_download")]),e._v("Selection csv")],1),l("HoleCard",{key:e.clicked_processed_hole_id,attrs:{clicked_processed_hole_id:e.clicked_processed_hole_id,mine_name:e.mine_name},model:{value:e.show_dialog,callback:function(t){e.show_dialog=t},expression:"show_dialog"}}),l("ComparisonHoleCard",{attrs:{processed_hole_selection:e.selected,mine_name:e.mine_name},model:{value:e.show_dialog_comparison,callback:function(t){e.show_dialog_comparison=t},expression:"show_dialog_comparison"}}),l("v-snackbar",{attrs:{color:"error",bottom:"",right:"","multi-line":"",timeout:3e3},model:{value:e.warning,callback:function(t){e.warning=t},expression:"warning"}},[e._v(e._s(e.warning_text))])],1)},s=[],o=(l("ac6a"),l("5df3"),l("4f7f"),l("75fc")),i=(l("386d"),l("e40b")),n=l("d898"),r=l("bc3a"),c=l.n(r),d={components:{HoleCard:i["a"],ComparisonHoleCard:n["a"]},data:function(){return{search:null,clicked_processed_hole_id:!1,show_dialog:!1,show_dialog_comparison:!1,selected:[],pagination:{rowsPerPage:-1},warning:null,warning_text:null,headers:[{text:"Id",value:"processed_hole_id",sortable:!1},{text:"Processed date",value:"date",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Bench",value:"bench_name",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Pattern",value:"pattern_name",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Hole_name",value:"hole_name",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Hole_id",value:"hole_id",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Rig",value:"rig_id",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Sensor",value:"sensor_id",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Digitizer",value:"digitizer_id",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Flow",value:"flow_id",sortable:!1},{text:"MP",value:"to_mp",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Actions",sortable:!1}]}},created:function(){this.$store.dispatch("GET_PROCESSED",{mine_name:this.mine_name})},props:["mine_name"],methods:{moment:function(e){return window.moment.unix(e)},get_zipped_plots:function(){if(this.selected.length>1){var e={mine_name:this.mine_name,processed_holes:this.selected,responseType:"arraybuffer"};c.a.post("http://localhost:5000/get_zipped_plots",e).then(function(e){window.location.href=e.data.url})}else this.warning=!0,this.warning_text="Select a few holes to download."},compare_selection:function(){if(this.selected.length>1){this.show_dialog_comparison=!0;var e=this.selected.map(function(e){return e.processed_hole_id});this.$store.dispatch("GET_HOLES_INFO",{mine_name:this.mine_name,processed_hole_id:e})}else this.warning=!0,this.warning_text="Select a few holes to compare."},download_selection_plots:function(){if(this.selected.length>1){var e={mine_name:this.mine_name,processed_holes:this.selected,responseType:"arraybuffer"};c.a.post("http://localhost:5000/get_processed_csv",e).then(function(e){var t=window.URL.createObjectURL(new Blob([e.data])),l=document.createElement("a");l.href=t,l.setAttribute("download","processed.csv"),document.body.appendChild(l),l.click()})}else this.warning=!0,this.warning_text="Select a few holes to download."},searchWeb:function(){this.$store.dispatch("GET_PROCESSED",{mine_name:this.mine_name,search:this.search})},showProcessedHole:function(e){this.show_dialog=!0,this.clicked_processed_hole_id=e,this.$store.dispatch("GET_HOLE_INFO",{mine_name:this.mine_name,processed_hole_id:e})}},computed:{processed:function(){var e=this.$store.state.processed_holes.processed_list,t=Object(o["a"])(new Set(e.map(function(e){return e.flow_id}))),l=Object(o["a"])(new Set(e.map(function(e){return e.bench_name}))),a=Object(o["a"])(new Set(e.map(function(e){return e.pattern_name}))),s=Object(o["a"])(new Set(e.map(function(e){return e.hole_name}))),i=Object(o["a"])(new Set(e.map(function(e){return e.hole_id}))),n=Object(o["a"])(new Set(e.map(function(e){return e.rig_id}))),r=Object(o["a"])(new Set(e.map(function(e){return e.sensor_id}))),c=Object(o["a"])(new Set(e.map(function(e){return e.digitizer_id})));return this.headers=[{text:"Id",value:"processed_hole_id",sortable:!1},{text:"Processed date",value:"date",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Bench",value:"bench_name",sortable:!1,values:l,selected:"All"},{text:"Pattern",value:"pattern_name",sortable:!1,values:a,selected:"All"},{text:"Hole_name",value:"hole_name",sortable:!1,values:s,selected:"All"},{text:"Hole_id",value:"hole_id",sortable:!1,values:i,selected:"All"},{text:"Rig",value:"rig_id",sortable:!1,values:n,selected:"All"},{text:"Sensor",value:"sensor_id",sortable:!1,values:r,selected:"All"},{text:"Digitizer",value:"digitizer_id",sortable:!1,values:c,selected:"All"},{text:"Flow",value:"flow_id",sortable:!1,values:t,selected:"All"},{text:"MP",value:"to_mp",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Actions",sortable:!1}],e},loading:function(){return this.$store.state.processed_holes.loading}}},_=d,u=l("2877"),h=l("6544"),v=l.n(h),m=l("8336"),p=l("b0af"),b=l("99d9"),f=l("12b2"),g=l("ac7c"),x=l("8fea"),w=l("169a"),k=l("ce7e"),C=l("132d"),A=l("8860"),S=l("ba95"),T=l("5d23"),y=l("2db4"),V=l("9910"),O=l("2677"),F=l("71d9"),E=l("2a7f"),P=Object(u["a"])(_,a,s,!1,null,null,null);t["default"]=P.exports;v()(P,{VBtn:m["a"],VCard:p["a"],VCardActions:b["b"],VCardText:b["d"],VCardTitle:f["a"],VCheckbox:g["a"],VDataTable:x["a"],VDialog:w["a"],VDivider:k["a"],VIcon:C["a"],VList:A["a"],VListTile:S["a"],VListTileTitle:T["i"],VSnackbar:y["a"],VSpacer:V["e"],VTextField:O["a"],VToolbar:F["a"],VToolbarTitle:E["d"]})}}]);
//# sourceMappingURL=chunk-2d0ab0e7.c24c82ec.js.map