(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d773d51"],{"026a":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"about"},[a("v-toolbar",{attrs:{flat:"",color:"white"}},[a("v-toolbar-title",[e._v("Acorr files from : "+e._s(e.mine_name)+" ")]),a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":"",loading:e.loading},on:{"click:append":e.searchWeb,keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchWeb(t)}},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),a("v-data-table",{staticClass:"elevation-1",attrs:{pagination:e.pagination,headers:e.headers,items:e.processed,"item-key":"processed_hole_id","select-all":"","hide-actions":""},on:{"update:pagination":function(t){e.pagination=t}},scopedSlots:e._u([{key:"headerCell",fn:function(t){return[a("v-dialog",{attrs:{scrollable:"","max-width":"300px"},scopedSlots:e._u([{key:"activator",fn:function(s){var l=s.on;return[a("div",e._g({},l),[a("span",[e._v(e._s(t.header.text))]),t.header.values?a("div",{staticClass:"font-weight-light font-italic"},[e._v("\n              "+e._s(t.header.selected)+"\n            ")]):e._e()])]}}],null,!0),model:{value:t.header.dialog,callback:function(a){e.$set(t.header,"dialog",a)},expression:"props.header.dialog"}},[a("v-card",[a("v-card-title",[e._v("Select Country")]),a("v-divider"),a("v-card-text",{staticClass:"pa-0 pm-0",staticStyle:{height:"300px"}},[a("v-list",{staticClass:"pa-0 pm-0"},e._l(t.header.values,(function(t,s){return a("v-list-tile",{key:s,on:{click:function(e){}}},[a("v-list-tile-title",[e._v(e._s(t))])],1)})),1)],1),a("v-divider"),a("v-card-actions",[a("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:function(t){e.dialog=!1}}},[e._v("Close")]),a("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:function(t){e.dialog=!1}}},[e._v("Save")])],1)],1)],1)]}},{key:"items",fn:function(t){return[a("td",[a("v-checkbox",{attrs:{primary:"","hide-details":""},model:{value:t.selected,callback:function(a){e.$set(t,"selected",a)},expression:"items.selected"}})],1),a("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.processed_hole_id))]),a("td",{staticClass:"text-xs-right"},[e._v("\n        "+e._s(e.moment(t.item.processed_at_ts).format("YYYY-MM-DD hh:mm:ss"))+"\n      ")]),a("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.bench_name))]),a("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.pattern_name))]),a("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.hole_name))]),a("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.hole_id))]),a("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.rig_id))]),a("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.sensor_id))]),a("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.digitizer_id))]),a("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.flow_id))]),a("td",{staticClass:"text-xs-right"},[1==t.item.to_mp?a("v-icon",{attrs:{color:"green"}},[e._v("radio_button_checked")]):a("v-icon",{attrs:{color:"red"}},[e._v("radio_button_unchecked")])],1),a("td",[a("v-btn",{attrs:{outline:"",icon:"",color:"indigo"},on:{click:function(a){return e.showProcessedHole(t.item.processed_hole_id)}}},[a("v-icon",[e._v("info")])],1)],1)]}}]),model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}}),a("v-btn",{attrs:{flat:"",color:"light-blue"},on:{click:function(t){return e.compare_selection()}}},[e._v("Compare selection")]),a("v-btn",{attrs:{flat:"",color:"light-blue"},on:{click:e.get_processed_selection}},[a("v-icon",{attrs:{left:"",dark:""}},[e._v("cloud_download")]),e._v("Selection csv")],1),a("HoleCard",{key:e.clicked_processed_hole_id,attrs:{clicked_processed_hole_id:e.clicked_processed_hole_id,mine_name:e.mine_name},model:{value:e.show_dialog,callback:function(t){e.show_dialog=t},expression:"show_dialog"}}),a("ComparisonHoleCard",{attrs:{processed_hole_selection:e.selected,mine_name:e.mine_name},model:{value:e.show_dialog_comparison,callback:function(t){e.show_dialog_comparison=t},expression:"show_dialog_comparison"}}),a("v-snackbar",{attrs:{color:"error",bottom:"",right:"","multi-line":"",timeout:3e3},model:{value:e.warning,callback:function(t){e.warning=t},expression:"warning"}},[e._v(e._s(e.warning_text))])],1)},l=[],r=(a("ac6a"),a("5df3"),a("4f7f"),a("75fc")),o=(a("386d"),a("e40b")),i=a("d898"),n={components:{HoleCard:o["a"],ComparisonHoleCard:i["a"]},data:function(){return{search:null,clicked_processed_hole_id:!1,show_dialog:!1,show_dialog_comparison:!1,selected:[],pagination:{rowsPerPage:-1},warning:null,warning_text:null,headers:[{text:"Id",value:"processed_hole_id",sortable:!1},{text:"Processed date",value:"date",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Bench",value:"bench_name",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Pattern",value:"pattern_name",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Hole_name",value:"hole_name",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Hole_id",value:"hole_id",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Rig",value:"rig_id",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Sensor",value:"sensor_id",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Digitizer",value:"digitizer_id",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Flow",value:"flow_id",sortable:!1},{text:"MP",value:"to_mp",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Actions",sortable:!1}]}},created:function(){this.$store.dispatch("GET_PROCESSED",{mine_name:this.mine_name})},props:["mine_name"],methods:{moment:function(e){return window.moment.unix(e)},get_processed_selection:function(){if(this.selected.length>1){var e={mine_name:this.mine_name,processed_holes:this.selected,responseType:"arraybuffer"};axios.post("http://localhost:5000/get_processed_csv",e).then((function(e){var t=window.URL.createObjectURL(new Blob([e.data])),a=document.createElement("a");a.href=t,a.setAttribute("download","processed.csv"),document.body.appendChild(a),a.click()}))}else this.warning=!0,this.warning_text="Select a few holes to download."},compare_selection:function(){if(this.selected.length>1){this.show_dialog_comparison=!0;var e=this.selected.map((function(e){return e.processed_hole_id}));this.$store.dispatch("GET_HOLES_INFO",{mine_name:this.mine_name,processed_hole_id:e})}else this.warning=!0,this.warning_text="Select a few holes to compare."},searchWeb:function(){this.$store.dispatch("GET_PROCESSED",{mine_name:this.mine_name,search:this.search})},showProcessedHole:function(e){this.show_dialog=!0,this.clicked_processed_hole_id=e,this.$store.dispatch("GET_HOLE_INFO",{mine_name:this.mine_name,processed_hole_id:e})}},computed:{processed:function(){var e=this.$store.state.processed_holes.processed_list,t=Object(r["a"])(new Set(e.map((function(e){return e.flow_id})))),a=Object(r["a"])(new Set(e.map((function(e){return e.bench_name})))),s=Object(r["a"])(new Set(e.map((function(e){return e.pattern_name})))),l=Object(r["a"])(new Set(e.map((function(e){return e.hole_name})))),o=Object(r["a"])(new Set(e.map((function(e){return e.hole_id})))),i=Object(r["a"])(new Set(e.map((function(e){return e.rig_id})))),n=Object(r["a"])(new Set(e.map((function(e){return e.sensor_id})))),c=Object(r["a"])(new Set(e.map((function(e){return e.digitizer_id}))));return this.headers=[{text:"Id",value:"processed_hole_id",sortable:!1},{text:"Processed date",value:"date",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Bench",value:"bench_name",sortable:!1,values:a,selected:"All"},{text:"Pattern",value:"pattern_name",sortable:!1,values:s,selected:"All"},{text:"Hole_name",value:"hole_name",sortable:!1,values:l,selected:"All"},{text:"Hole_id",value:"hole_id",sortable:!1,values:o,selected:"All"},{text:"Rig",value:"rig_id",sortable:!1,values:i,selected:"All"},{text:"Sensor",value:"sensor_id",sortable:!1,values:n,selected:"All"},{text:"Digitizer",value:"digitizer_id",sortable:!1,values:c,selected:"All"},{text:"Flow",value:"flow_id",sortable:!1,values:t,selected:"All"},{text:"MP",value:"to_mp",sortable:!1,values:["All","True","False"],selected:"All"},{text:"Actions",sortable:!1}],e},loading:function(){return this.$store.state.processed_holes.loading}}},c=n,d=a("2877"),_=a("6544"),v=a.n(_),u=a("8336"),x=a("b0af"),p=a("99d9"),m=a("12b2"),h=a("ac7c"),f=a("8fea"),g=a("169a"),b=a("ce7e"),w=a("132d"),C=a("8860"),k=a("ba95"),V=a("5d23"),z=a("2db4"),y=a("9910"),A=a("2677"),T=a("71d9"),S=a("2a7f"),P=Object(d["a"])(c,s,l,!1,null,null,null);t["default"]=P.exports;v()(P,{VBtn:u["a"],VCard:x["a"],VCardActions:p["a"],VCardText:p["b"],VCardTitle:m["a"],VCheckbox:h["a"],VDataTable:f["a"],VDialog:g["a"],VDivider:b["a"],VIcon:w["a"],VList:C["a"],VListTile:k["a"],VListTileTitle:V["b"],VSnackbar:z["a"],VSpacer:y["a"],VTextField:A["a"],VToolbar:T["a"],VToolbarTitle:S["a"]})},d898:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},[a("v-card",[a("v-toolbar",{attrs:{dark:"",color:"primary"}},[a("v-btn",{attrs:{icon:"",dark:""},on:{click:e.close}},[a("v-icon",[e._v("close")])],1),a("v-toolbar-title",[e._v("Comparing "+e._s(e.holes_info.length)+" process")])],1),a("v-container",{attrs:{"grid-list-md":"",fluid:"","text-xs-center":""}},[e.loading?a("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[a("v-flex",[a("v-progress-circular",{attrs:{size:100,color:"primary",indeterminate:""}})],1)],1):e._e(),e.holes_info?a("v-layout",{attrs:{row:"",wrap:""}},e._l(e.holes_info,(function(t){return a("v-flex",{key:t.processed_hole_id,attrs:{xs12:""}},[a("v-subheader",{staticClass:"grey--text text--darken-4"},[e._v(e._s(t.output_folder_name))]),a("v-img",{attrs:{src:e.get_image(t.images[0],t.processed_hole_id)}}),a("v-divider")],1)})),1):e._e()],1)],1)],1)},l=[],r={data:function(){return{}},methods:{close:function(){this.$emit("input",!1)},get_image:function(e,t){return"/images/"+this.mine_name+"/"+t+"/"+e}},computed:{holes_info:function(){return this.$store.state.comparison_hole_info.holes_info},loading:function(){return this.$store.state.comparison_hole_info.loading}},props:["processed_hole_selection","mine_name","value"]},o=r,i=a("2877"),n=a("6544"),c=a.n(n),d=a("8336"),_=a("b0af"),v=a("a523"),u=a("169a"),x=a("ce7e"),p=a("0e8f"),m=a("132d"),h=a("adda"),f=a("a722"),g=a("490a"),b=a("e0c7"),w=a("71d9"),C=a("2a7f"),k=Object(i["a"])(o,s,l,!1,null,null,null);t["a"]=k.exports;c()(k,{VBtn:d["a"],VCard:_["a"],VContainer:v["a"],VDialog:u["a"],VDivider:x["a"],VFlex:p["a"],VIcon:m["a"],VImg:h["a"],VLayout:f["a"],VProgressCircular:g["a"],VSubheader:b["a"],VToolbar:w["a"],VToolbarTitle:C["a"]})},e40b:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},[a("v-card",[a("v-toolbar",{attrs:{dark:"",color:"primary"}},[a("v-btn",{attrs:{icon:"",dark:""},on:{click:e.close}},[a("v-icon",[e._v("close")])],1),a("v-toolbar-title",[e._v("Processed hole")]),a("v-spacer"),e.processed&&0==e.processed.to_mp?a("v-btn",{attrs:{color:"green"},on:{click:function(t){return e.to_mp(!0)}}},[e._v("Add to mp")]):e._e(),e.processed&&1==e.processed.to_mp?a("v-btn",{attrs:{color:"red"},on:{click:function(t){return e.to_mp(!1)}}},[e._v("Remove from mp")]):e._e()],1),a("v-container",{attrs:{"grid-list-md":"",fluid:"","text-xs-center":""}},[e.loading&&!e.processed?a("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[a("v-flex",[a("v-progress-circular",{attrs:{size:100,color:"primary",indeterminate:""}})],1)],1):e._e(),e.processed?a("v-layout",{attrs:{row:"",wrap:""}},[a("v-btn",{attrs:{outline:"",color:"dark-blue"}},[e._v("Processed.csv")]),e._l(e.processed.images,(function(t){return a("v-flex",{attrs:{xs12:""}},[a("v-img",{attrs:{src:e.get_image(t)}})],1)})),a("v-flex",{attrs:{xs12:""}},[a("v-subheader",[e._v("Processed hole details:")])],1),a("v-flex",{attrs:{xs4:""}},[a("v-card",{attrs:{dark:"",color:"secondary"}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[e._v("Process_id:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[e._v(e._s(e.processed.processed_hole_id))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[e._v("Processed_at:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[e._v(e._s(e.moment(e.processed.processed_at_ts).format("YYYY-MM-DD hh:mm:ss")))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[e._v("Min Time:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[e._v("{{}}")])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[e._v("Max Time:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[e._v("{{}}")])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[e._v("To mp:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[e._v(e._s(e.processed.to_mp))])],1)],1)],1)],1),a("v-flex",{attrs:{xs4:""}},[a("v-card",{attrs:{dark:"",color:"secondary"}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[e._v("Bench:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[e._v(e._s(e.processed.bench_name))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[e._v("Pattern:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[e._v(e._s(e.processed.pattern_name))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[e._v("Hole_name:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[e._v(e._s(e.processed.hole_name))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[e._v("Hole_id:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[e._v(e._s(e.processed.hole_id))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[e._v("Flow id:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[e._v(e._s(e.processed.flow_id))])],1)],1)],1)],1),a("v-flex",{attrs:{xs4:""}},[a("v-card",{attrs:{dark:"",color:"secondary"}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[e._v("Rig_id:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[e._v(e._s(e.processed.rig_id))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[e._v("Sensor_id:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[e._v(e._s(e.processed.sensor_id))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[e._v("Accel_type:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[e._v(e._s(e.processed.sensor_accelerometer_type))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[e._v("Saturation_g:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[e._v(e._s(e.processed.sensor_saturation_g))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[e._v("Digitizer_id:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[e._v(e._s(e.processed.digitizer_id))])],1)],1)],1)],1),a("v-btn",{attrs:{outline:"",color:"dark-blue"}},[e._v("Processed.csv")]),a("v-btn",{attrs:{outline:"",color:"dark-blue"}},[e._v("Acorr.h5")])],2):e._e()],1)],1)],1)},l=[],r={data:function(){return{}},methods:{close:function(){this.$emit("input",!1)},moment:function(e){return window.moment.unix(e)},get_image:function(e){return"/images/"+this.mine_name+"/"+this.processed.processed_hole_id+"/"+e},to_mp:function(e){this.$store.dispatch("UPDATE_HOLE_TO_MP",{mine_name:this.mine_name,processed_hole_id:this.processed.processed_hole_id,to_mp:e})}},computed:{processed:function(){return console.log(this.$store.state.hole_info.hole_info),this.$store.state.hole_info.hole_info},loading:function(){return this.$store.state.hole_info.loading}},props:["value","mine_name","clicked_processed_hole_id"]},o=r,i=a("2877"),n=a("6544"),c=a.n(n),d=a("8336"),_=a("b0af"),v=a("99d9"),u=a("a523"),x=a("169a"),p=a("0e8f"),m=a("132d"),h=a("adda"),f=a("a722"),g=a("490a"),b=a("9910"),w=a("e0c7"),C=a("71d9"),k=a("2a7f"),V=Object(i["a"])(o,s,l,!1,null,null,null);t["a"]=V.exports;c()(V,{VBtn:d["a"],VCard:_["a"],VCardText:v["b"],VContainer:u["a"],VDialog:x["a"],VFlex:p["a"],VIcon:m["a"],VImg:h["a"],VLayout:f["a"],VProgressCircular:g["a"],VSpacer:b["a"],VSubheader:w["a"],VToolbar:C["a"],VToolbarTitle:k["a"]})}}]);
//# sourceMappingURL=chunk-4d773d51.5654aeb2.js.map