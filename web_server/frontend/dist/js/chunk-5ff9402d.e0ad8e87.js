(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5ff9402d"],{"2fdb":function(t,e,a){"use strict";var s=a("5ca1"),r=a("d2c8"),i="includes";s(s.P+s.F*a("5147")(i),"String",{includes:function(t){return!!~r(this,t,i).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},"456d":function(t,e,a){var s=a("4bf8"),r=a("0d58");a("5eda")("keys",(function(){return function(t){return r(s(t))}}))},5147:function(t,e,a){var s=a("2b4c")("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(a){try{return e[s]=!1,!"/./"[t](e)}catch(r){}}return!0}},"5eda":function(t,e,a){var s=a("5ca1"),r=a("8378"),i=a("79e5");t.exports=function(t,e){var a=(r.Object||{})[t]||Object[t],o={};o[t]=e(a),s(s.S+s.F*i((function(){a(1)})),"Object",o)}},6762:function(t,e,a){"use strict";var s=a("5ca1"),r=a("c366")(!0);s(s.P,"Array",{includes:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),a("9c6c")("includes")},"901a":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"about"},[a("v-card",{attrs:{color:"blue lighten-4"}},[a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("div",{staticClass:"headline"},[t._v("MWD: "+t._s(t.mine_name)+" ")]),a("div",[t._v("Type: CSV")]),a("div",[t._v('Path: "/data/arcelor_mittal/mwds/201992.csv"')])])])],1)],1),a("v-divider",{attrs:{light:""}}),a("v-card-actions",{staticClass:"pa-3"},[a("v-btn",[t._v("Mapping")]),a("v-btn",[t._v("Download")]),a("v-spacer"),a("date-range-picker",{ref:"picker",staticStyle:{width:"240px",float:"right","z-index":"1000"},attrs:{"locale-data":{firstDay:1,format:"YYYY-MM-DD"},opens:"left",dateFormat:t.format_available_dates},on:{update:t.updated_date_picker},scopedSlots:t._u([{key:"input",fn:function(e){return a("div",{staticStyle:{"min-width":"200px","text-align":"center","font-color":"'#000'"}},[t._v("\n              From : "+t._s(t.dateRange.startDate.substring(0,10))+"  To: "+t._s(t.dateRange.endDate.substring(0,10))+" \n          ")])}}]),model:{value:t.dateRange,callback:function(e){t.dateRange=e},expression:"dateRange"}})],1)],1),a("v-toolbar",{staticStyle:{"z-index":"1"},attrs:{flat:"",color:"white"}},[a("v-toolbar-title",[a("span",{staticClass:"body-2 font-weight-light"},[t._v(t._s(t.filtered_data.length)+" results found.")])]),a("v-spacer"),a("v-text-field",{staticStyle:{"min-width":"240px",float:"right"},attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":"",loading:t.loading},on:{"click:append":t.searchWeb,keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchWeb(e)}},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("canvas",{staticStyle:{height:"100%",width:"100%"},attrs:{id:"data_table"}}),a("v-btn",{attrs:{flat:"",color:"light-blue"},on:{click:function(e){return t.compare_selection()}}},[t._v("Compare selection")]),a("v-btn",{attrs:{flat:"",color:"light-blue"},on:{click:function(e){return t.get_zipped_plots()}}},[t._v("Download selection plots")]),a("v-btn",{attrs:{flat:"",color:"light-blue"},on:{click:function(e){return t.get_processed_selection()}}},[a("v-icon",{attrs:{left:"",dark:""}},[t._v("cloud_download")]),t._v("Selection csv")],1),a("HoleCard",{key:t.clicked_processed_hole_id,attrs:{clicked_processed_hole_id:t.clicked_processed_hole_id,mine_name:t.mine_name},model:{value:t.show_dialog,callback:function(e){t.show_dialog=e},expression:"show_dialog"}}),a("ComparisonHoleCard",{attrs:{processed_hole_selection:t.selected,mine_name:t.mine_name},model:{value:t.show_dialog_comparison,callback:function(e){t.show_dialog_comparison=e},expression:"show_dialog_comparison"}}),a("v-snackbar",{attrs:{color:"error",bottom:"",right:"","multi-line":"",timeout:3e3},model:{value:t.warning,callback:function(e){t.warning=e},expression:"warning"}},[t._v(t._s(t.warning_text))])],1)},r=[],i=(a("5df3"),a("4f7f"),a("75fc")),o=(a("386d"),a("ac6a"),a("456d"),a("6762"),a("2fdb"),a("e40b")),n=a("d898"),c={components:{HoleCard:o["a"],ComparisonHoleCard:n["a"]},data:function(){return{notifications:!1,search:null,clicked_processed_hole_id:!1,show_dialog:!1,show_dialog_comparison:!1,selected:[],pagination:{rowsPerPage:-1},warning:null,warning_text:null,headers:[],filtered_data:[],dateRange:{startDate:"",endDate:""}}},created:function(){this.$store.dispatch("GET_MWD",{mine_name:this.mine_name})},props:["mine_name"],methods:{format_available_dates:function(t,e){return this.processed_at_ts.includes(moment(e).format("YYYY-MM-DD"))&&(t.today=!0),t},updated_date_picker:function(t){t.startDate=moment(t.startDate).format("YYYY-MM-DD")+" 00:00:00",t.endDate=moment(t.endDate).format("YYYY-MM-DD")+" 23:59:59",this.searchWeb()},changed_filter:function(){var t=[];for(var e in this.server_data.data){e=this.server_data.data[e];var a=!0;for(var s in this.headers)s=this.headers[s],Object.keys(s).includes("values")&&Object.keys(s.values).includes(e[s.value])&&0==s.values[e[s.value]].checked&&(a=!1);a&&t.push(e)}for(var r in this.filtered_data=t,this.headers)r=this.headers[r],r.allChecked=this.allChecked(r.values)},togleAllOnList:function(t){for(var e in t.values)t.values[e].checked=t.allChecked;this.changed_filter()},allChecked:function(t){for(var e in t)if(0==t[e].checked)return!1;return!0},moment:function(t){return window.moment.unix(t)},get_zipped_plots:function(){if(this.selected.length>1){var t={mine_name:this.mine_name,processed_holes:this.selected,responseType:"arraybuffer"};axios.post("/get_zipped_plots",t).then((function(t){window.location.href=t.data.url}))}else this.warning=!0,this.warning_text="Select a few holes to download."},compare_selection:function(){if(this.selected.length>1){this.show_dialog_comparison=!0;var t=this.selected.map((function(t){return t.processed_hole_id}));this.$store.dispatch("GET_HOLES_INFO",{mine_name:this.mine_name,processed_hole_id:t})}else this.warning=!0,this.warning_text="Select a few holes to compare."},get_processed_selection:function(){if(this.selected.length>1){var t={mine_name:this.mine_name,processed_holes:this.selected,responseType:"arraybuffer"};axios.post("/get_processed_csv",t).then((function(t){var e=window.URL.createObjectURL(new Blob([t.data])),a=document.createElement("a");a.href=e,a.setAttribute("download","processed.csv"),document.body.appendChild(a),a.click()}))}else this.warning=!0,this.warning_text="Select a few holes to download."},searchWeb:function(){this.$store.dispatch("GET_PROCESSED",{mine_name:this.mine_name,search:this.search,from:moment(this.dateRange.startDate).format("X"),to:moment(this.dateRange.endDate).format("X")})},showProcessedHole:function(t){this.show_dialog=!0,this.clicked_processed_hole_id=t,this.$store.dispatch("GET_HOLE_INFO",{mine_name:this.mine_name,processed_hole_id:t})}},watch:{server_data:function(t,e){var a=this;function s(t){var e={};for(var a in t)e[t[a]]={label:t[a],checked:!0};return e}if(t){var r=t.data;this.headers=[],Object.keys(r[0]).forEach((function(t){var e=Object(i["a"])(new Set(r.map((function(e){return e[t]}))));a.headers.push({text:t,value:t,sortable:!1,values:s(e),allChecked:!0})}))}},headers:function(t,e){this.changed_filter()}},computed:{server_data:function(){return this.$store.state.mwd.mwd},loading:function(){return this.$store.state.processed_holes.loading}}},l=c,d=a("2877"),_=a("6544"),v=a.n(_),u=a("8336"),p=a("b0af"),f=a("99d9"),h=a("12b2"),x=a("ce7e"),m=a("0e8f"),g=a("132d"),b=a("a722"),w=a("2db4"),k=a("9910"),C=a("2677"),y=a("71d9"),V=a("2a7f"),z=Object(d["a"])(l,s,r,!1,null,null,null);e["default"]=z.exports;v()(z,{VBtn:u["a"],VCard:p["a"],VCardActions:f["a"],VCardTitle:h["a"],VDivider:x["a"],VFlex:m["a"],VIcon:g["a"],VLayout:b["a"],VSnackbar:w["a"],VSpacer:k["a"],VTextField:C["a"],VToolbar:y["a"],VToolbarTitle:V["a"]})},aae3:function(t,e,a){var s=a("d3f4"),r=a("2d95"),i=a("2b4c")("match");t.exports=function(t){var e;return s(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==r(t))}},d2c8:function(t,e,a){var s=a("aae3"),r=a("be13");t.exports=function(t,e,a){if(s(e))throw TypeError("String#"+a+" doesn't accept regex!");return String(r(t))}},d898:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},[a("v-card",[a("v-toolbar",{attrs:{dark:"",color:"primary"}},[a("v-btn",{attrs:{icon:"",dark:""},on:{click:t.close}},[a("v-icon",[t._v("close")])],1),a("v-toolbar-title",[t._v("Comparing "+t._s(t.holes_info.length)+" process")])],1),a("v-container",{attrs:{"grid-list-md":"",fluid:"","text-xs-center":""}},[t.loading?a("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[a("v-flex",[a("v-progress-circular",{attrs:{size:100,color:"primary",indeterminate:""}})],1)],1):t._e(),t.holes_info?a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.holes_info,(function(e){return a("v-flex",{key:e.processed_hole_id,attrs:{xs12:""}},[a("v-subheader",{staticClass:"grey--text text--darken-4"},[t._v(t._s(e.output_folder_name))]),a("v-img",{attrs:{src:t.get_image(e.images[0],e.processed_hole_id)}}),a("v-divider")],1)})),1):t._e()],1)],1)],1)},r=[],i={data:function(){return{}},methods:{close:function(){this.$emit("input",!1)},get_image:function(t,e){return"/images/"+this.mine_name+"/"+e+"/"+t}},computed:{holes_info:function(){return this.$store.state.comparison_hole_info.holes_info},loading:function(){return this.$store.state.comparison_hole_info.loading}},props:["processed_hole_selection","mine_name","value"]},o=i,n=a("2877"),c=a("6544"),l=a.n(c),d=a("8336"),_=a("b0af"),v=a("a523"),u=a("169a"),p=a("ce7e"),f=a("0e8f"),h=a("132d"),x=a("adda"),m=a("a722"),g=a("490a"),b=a("e0c7"),w=a("71d9"),k=a("2a7f"),C=Object(n["a"])(o,s,r,!1,null,null,null);e["a"]=C.exports;l()(C,{VBtn:d["a"],VCard:_["a"],VContainer:v["a"],VDialog:u["a"],VDivider:p["a"],VFlex:f["a"],VIcon:h["a"],VImg:x["a"],VLayout:m["a"],VProgressCircular:g["a"],VSubheader:b["a"],VToolbar:w["a"],VToolbarTitle:k["a"]})},e40b:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},[a("v-card",[a("v-toolbar",{attrs:{dark:"",color:"primary"}},[a("v-btn",{attrs:{icon:"",dark:""},on:{click:t.close}},[a("v-icon",[t._v("close")])],1),a("v-toolbar-title",[t._v("Processed hole")]),a("v-spacer"),t.processed&&0==t.processed.to_mp?a("v-btn",{attrs:{color:"green"},on:{click:function(e){return t.to_mp(!0)}}},[t._v("Add to mp")]):t._e(),t.processed&&1==t.processed.to_mp?a("v-btn",{attrs:{color:"red"},on:{click:function(e){return t.to_mp(!1)}}},[t._v("Remove from mp")]):t._e()],1),a("v-container",{attrs:{"grid-list-md":"",fluid:"","text-xs-center":""}},[t.loading&&!t.processed?a("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[a("v-flex",[a("v-progress-circular",{attrs:{size:100,color:"primary",indeterminate:""}})],1)],1):t._e(),t.processed?a("v-layout",{attrs:{row:"",wrap:""}},[a("v-btn",{attrs:{outline:"",color:"dark-blue"}},[t._v("Processed.csv")]),t._l(t.processed.images,(function(e){return a("v-flex",{attrs:{xs12:""}},[a("v-img",{attrs:{src:t.get_image(e)}})],1)})),a("v-flex",{attrs:{xs12:""}},[a("v-subheader",[t._v("Processed hole details:")])],1),a("v-flex",{attrs:{xs4:""}},[a("v-card",{attrs:{dark:"",color:"secondary"}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[t._v("Process_id:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[t._v(t._s(t.processed.processed_hole_id))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[t._v("Processed_at:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[t._v(t._s(t.moment(t.processed.processed_at_ts).format("YYYY-MM-DD hh:mm:ss")))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[t._v("Min Time:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[t._v("{{}}")])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[t._v("Max Time:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[t._v("{{}}")])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[t._v("To mp:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[t._v(t._s(t.processed.to_mp))])],1)],1)],1)],1),a("v-flex",{attrs:{xs4:""}},[a("v-card",{attrs:{dark:"",color:"secondary"}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[t._v("Bench:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[t._v(t._s(t.processed.bench_name))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[t._v("Pattern:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[t._v(t._s(t.processed.pattern_name))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[t._v("Hole_name:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[t._v(t._s(t.processed.hole_name))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[t._v("Hole_id:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[t._v(t._s(t.processed.hole_id))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[t._v("Flow id:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[t._v(t._s(t.processed.flow_id))])],1)],1)],1)],1),a("v-flex",{attrs:{xs4:""}},[a("v-card",{attrs:{dark:"",color:"secondary"}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[t._v("Rig_id:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[t._v(t._s(t.processed.rig_id))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[t._v("Sensor_id:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[t._v(t._s(t.processed.sensor_id))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[t._v("Accel_type:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[t._v(t._s(t.processed.sensor_accelerometer_type))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[t._v("Saturation_g:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[t._v(t._s(t.processed.sensor_saturation_g))])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[a("strong",[t._v("Digitizer_id:")])])],1),a("v-flex",{attrs:{xs6:""}},[a("v-card-text",{staticClass:"text-capitalize "},[t._v(t._s(t.processed.digitizer_id))])],1)],1)],1)],1),a("v-btn",{attrs:{outline:"",color:"dark-blue"}},[t._v("Processed.csv")]),a("v-btn",{attrs:{outline:"",color:"dark-blue"}},[t._v("Acorr.h5")])],2):t._e()],1)],1)],1)},r=[],i={data:function(){return{}},methods:{close:function(){this.$emit("input",!1)},moment:function(t){return window.moment.unix(t)},get_image:function(t){return"/images/"+this.mine_name+"/"+this.processed.processed_hole_id+"/"+t},to_mp:function(t){this.$store.dispatch("UPDATE_HOLE_TO_MP",{mine_name:this.mine_name,processed_hole_id:this.processed.processed_hole_id,to_mp:t})}},computed:{processed:function(){return console.log(this.$store.state.hole_info.hole_info),this.$store.state.hole_info.hole_info},loading:function(){return this.$store.state.hole_info.loading}},props:["value","mine_name","clicked_processed_hole_id"]},o=i,n=a("2877"),c=a("6544"),l=a.n(c),d=a("8336"),_=a("b0af"),v=a("99d9"),u=a("a523"),p=a("169a"),f=a("0e8f"),h=a("132d"),x=a("adda"),m=a("a722"),g=a("490a"),b=a("9910"),w=a("e0c7"),k=a("71d9"),C=a("2a7f"),y=Object(n["a"])(o,s,r,!1,null,null,null);e["a"]=y.exports;l()(y,{VBtn:d["a"],VCard:_["a"],VCardText:v["b"],VContainer:u["a"],VDialog:p["a"],VFlex:f["a"],VIcon:h["a"],VImg:x["a"],VLayout:m["a"],VProgressCircular:g["a"],VSpacer:b["a"],VSubheader:w["a"],VToolbar:k["a"],VToolbarTitle:C["a"]})}}]);
//# sourceMappingURL=chunk-5ff9402d.e0ad8e87.js.map