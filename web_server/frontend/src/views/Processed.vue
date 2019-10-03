<template>
  <div class="about">

    <div v-if="loading_lp">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </div>

     <div v-else>
    <v-toolbar flat color="white" style="z-index:1">
   
      <v-toolbar-title
        >Processed files from : {{ mine_name }}<br /><span
          class="body-2 font-weight-light"
          >{{ filtered_data.length }} results found.</span
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-layout align-right justify-end column fill-height>
      <v-flex xs12 md6>
      <date-range-picker
            ref="picker" v-model="dateRange" @update="updated_date_picker" :locale-data="{ firstDay: 1, format: 'YYYY-MM-DD' }" opens="left" style="width:240px; float:right;z-index:1000" :dateFormat="format_available_dates">
        <div slot="input" slot-scope="picker" style="min-width: 200px; text-align:center;">
            From : {{ dateRange.startDate.substring(0,10) }}  To: {{ dateRange.endDate.substring(0,10) }} 
        </div>
    </date-range-picker>
      </v-flex>
      <v-flex xs12 md6>
      <v-text-field
      style="min-width: 240px; float:right;"
        v-model.lazy="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        @click:append="searchWeb"
        v-on:keyup.enter="searchWeb"
        :loading="loading"
      ></v-text-field>
      </v-flex>
      </v-layout>
    </v-toolbar>
    </v-layout>


    <v-data-table
      v-model="selected"
      :pagination.sync="pagination"
      :headers="headers"
      :items="filtered_data"
      item-key="processed_hole_id"
      select-all
      class="elevation-1"
      v-if="!show_dialog_comparison"
    >
      <template slot="headerCell" slot-scope="props">
        <span v-if="!props.header.values" v-on="on" ripple>{{
          props.header.text
        }}</span>
        <v-dialog
          v-if="props.header.values"
          v-model="props.header.dialog"
          max-width="300px"
        >
          <template v-slot:activator="{ on }">
            <span style="cursor: pointer" v-on="on" ripple>{{ props.header.text }}</span>
          </template>
          <v-card>
            <v-card-title>Select {{ props.header.text }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;" class="pa-0 pm-0">
              <v-list class="pa-0 pm-0">
                <v-list-tile ripple>
                  <v-list-tile-action>
                    <v-checkbox
                      v-model="props.header.allChecked"
                      @change="togleAllOnList(props.header)"
                    ></v-checkbox>
                  </v-list-tile-action>
                  <v-list-tile-title>Select all</v-list-tile-title>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile
                  v-for="(item, i) in props.header.values"
                  :key="i"
                  ripple
                >
                  <v-list-tile-action>
                    <v-checkbox
                      v-model="item.checked"
                      @change="changed_filter(item, props.header)"
                    ></v-checkbox>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.label }} </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:items="items">
        <td>
          <v-checkbox
            v-model="items.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td class="text-xs-left">{{ items.item.processed_hole_id }}</td>
        <td class="text-xs-left">
          {{ moment(items.item.processed_at_ts).format("YYYY-MM-DD hh:mm:ss") }}
        </td>
        <td class="text-xs-left">{{ items.item.bench_name }}</td>
        <td class="text-xs-left">{{ items.item.pattern_name }}</td>
        <td class="text-xs-left">{{ items.item.hole_name }}</td>
        <td class="text-xs-left">{{ items.item.hole_id }}</td>
        <td class="text-xs-left">{{ items.item.rig_id }}</td>
        <td class="text-xs-left">{{ items.item.sensor_id }}</td>
        <td class="text-xs-left">{{ items.item.digitizer_id }}</td>
        <td class="text-xs-left">{{ items.item.flow_id }}</td>
        <td class="text-xs-left">{{ items.item.process_id }}</td>
        <td class="text-xs-left">
          <v-icon v-if="items.item.to_mp == 1" color="green"
            >radio_button_checked</v-icon
          ><v-icon v-else color="red">radio_button_unchecked</v-icon>
        </td>
        <td>
          <v-btn
            outline
            icon
            color="indigo"
            @click="showProcessedHole(items.item.processed_hole_id)"
          >
            <v-icon>info</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <v-btn flat color="light-blue" v-on:click="compare_selection()"
      >Compare selection</v-btn
    >
    <v-btn flat color="light-blue" v-on:click="get_zipped_plots()"
      >Download selection plots</v-btn
    >
    <v-btn flat color="light-blue" v-on:click="get_processed_selection()">
      <v-icon left dark>cloud_download</v-icon>Selection csv</v-btn
    >
    <v-btn flat color="light-blue" v-on:click="log_process_selection()"
      >Log process</v-btn>
    <v-dialog v-model="select_process_flow" scrollable max-width="300px">
          <v-card>
            <v-card-title>Select the lp process to use</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;" class="pa-0 pm-0">
              <v-list class="pa-0 pm-0">
                <v-list-tile style='margin:0;padding:0'
                  v-for="(item, i) in log_process_flows"
                  :key="i" ripple>
                  <v-btn v-on:click="log_process_to_lp(item)" style='padding:0;font-size:10px' flat color="light-blue" >{{ item }}</v-btn >
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-dialog>
    
    <HoleCard
      :key="clicked_processed_hole_id"
      :clicked_processed_hole_id="clicked_processed_hole_id"
      :mine_name="mine_name"
      v-model="show_dialog"
    ></HoleCard>
    <ComparisonHoleCard
      :processed_hole_selection="selected"
      v-model="show_dialog_comparison"
      :mine_name="mine_name"
    ></ComparisonHoleCard>
    <v-snackbar
      v-model="warning"
      color="error"
      bottom
      right
      multi-line
      :timeout="3000"
      >{{ warning_text }}</v-snackbar
    >
    <v-snackbar
      v-model="message"
      bottom
      right
      multi-line
      :timeout="3000"
      >{{ message_text }}</v-snackbar
    >
  </div>

  </div>

</template>

<script>
import HoleCard from "../components/HoleCard.vue";
import ComparisonHoleCard from "../components/ComparisonHoleCard.vue";

export default {
  components: {
    HoleCard,
    ComparisonHoleCard
  },
  data: () => ({
    loading_lp:false,
    notifications: false,
    search: null,
    clicked_processed_hole_id: false,
    show_dialog: false,
    show_dialog_comparison: false,
    selected: [],
    log_process_flows: [],
    pagination: { rowsPerPage: 25 },
    warning: null,
    warning_text: null,
    message: null,
    message_text: null,
    headers: [],
    filtered_data: [],
    select_process_flow: false,
    dateRange: { startDate: "",
                endDate: ""}
  }),
  created() {
    this.$store.dispatch("GET_PROCESSED", { mine_name: this.mine_name });
  },
  props: ["mine_name"],

  methods: {
    log_process_selection:function(){
      let temp = this;
      let payload = {
          mine_name: this.mine_name,
          responseType: "arraybuffer"
        };
        axios.post("/api/log_process_flows", payload).then(
          response => {
            temp.log_process_flows = response.data.log_process_flows
          }
        );
        this.select_process_flow = true
    },
    log_process_to_lp:function(lp_json_name){
        let temp = this
        this.select_process_flow = false
        let payload = {
          mine_name: this.mine_name,
          log_process_flow: lp_json_name
        };
        axios.post("/api/log_process_holes", payload).then(response => {
          temp.message = true;
          temp.message_text = "Added lp to processing queue."
        });
    },
    
    format_available_dates:function(classes,date){
      
      if (this.processed_at_ts.includes(moment(date).format("YYYY-MM-DD"))){
        classes.today = true;
      }
      return classes
      
    },
    updated_date_picker:function(e){
      e.startDate = moment(e.startDate).format("YYYY-MM-DD") + " 00:00:00";
      e.endDate = moment(e.endDate).format("YYYY-MM-DD")+ " 23:59:59";
      this.searchWeb()
    },
    changed_filter: function() {
      let temp = [];
      for (let item in this.server_data) {
        item = this.server_data[item];
        let canPush = true;
        for (let header in this.headers) {
          header = this.headers[header];

          if (
            Object.keys(header).includes("values") &&
            Object.keys(header.values).includes(item[header.value]) &&
            header.values[item[header.value]].checked == false
          ) {
            //console.log("cannot push ", item,header,header.values[item[header.value]].checked)
            canPush = false;
          }
        }
        if (canPush) {
          temp.push(item);
        }
      }
      this.filtered_data = temp;
      for (let header in this.headers) {
        header = this.headers[header];
        header.allChecked = this.allChecked(header.values);
      }
    },
    togleAllOnList: function(header) {
      for (let item in header.values) {
        header.values[item].checked = header.allChecked;
      }
      this.changed_filter();
    },
    allChecked: function(list) {
      for (let item in list) {
        if (list[item].checked == false) {
          return false;
        }
      }
      return true;
    },
    moment: function(unix) {
      return window.moment.unix(unix);
    },
    get_zipped_plots: function() {
      if (this.selected.length > 1) {
        let payload = {
          mine_name: this.mine_name,
          processed_holes: this.selected,
          responseType: "arraybuffer"
        };
        axios.post("/get_zipped_plots", payload).then(response => {
          window.location.href = response.data.url;
        });
      } else {
        this.warning = true;
        this.warning_text = "Select a few holes to download.";
      }
    },
    compare_selection: function() {
      if (this.selected.length > 1) {
        this.show_dialog_comparison = true;
        let selection_ids = this.selected.map(a => a.processed_hole_id);
        this.$store.dispatch("GET_HOLES_INFO", {
          mine_name: this.mine_name,
          processed_hole_id: selection_ids
        });
      } else {
        this.warning = true;
        this.warning_text = "Select a few holes to compare.";
      }
    },
    get_processed_selection: function() {
      if (this.selected.length > 1) {
        let payload = {
          mine_name: this.mine_name,
          processed_holes: this.selected,
          responseType: "arraybuffer"
        };
        axios.post("/get_processed_csv", payload).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "processed.csv"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      } else {
        this.warning = true;
        this.warning_text = "Select a few holes to download.";
      }
    },
    searchWeb: function() {
      this.$store.dispatch("GET_PROCESSED", {
        mine_name: this.mine_name,
        search: this.search,
        from: moment(this.dateRange.startDate).format("X"),
        to:  moment(this.dateRange.endDate).format("X"),
      });
    },
    showProcessedHole: function(processed_hole_id) {
      this.show_dialog = true;
      this.clicked_processed_hole_id = processed_hole_id;
      this.$store.dispatch("GET_HOLE_INFO", {
        mine_name: this.mine_name,
        processed_hole_id: processed_hole_id
      });
    }
  },
  watch: {
    server_data: function(_new, old) {
      
      function to_unique_obj(list) {
        let temp_list = {};
        for (let item in list) {
          temp_list[list[item]] = { label: list[item], checked: true };
        }
        return temp_list;
      }

      if (_new){
        let processed_list = _new;
        let process_ids = [...new Set(processed_list.map(a => a.process_id))];
        let flow_ids = [...new Set(processed_list.map(a => a.flow_id))];
        let bench_names = [...new Set(processed_list.map(a => a.bench_name))];
        let pattern_names = [...new Set(processed_list.map(a => a.pattern_name))];
        let hole_names = [...new Set(processed_list.map(a => a.hole_name))];
        let hole_ids = [...new Set(processed_list.map(a => a.hole_id))];
        let rig_ids = [...new Set(processed_list.map(a => a.rig_id))];
        let sensor_ids = [...new Set(processed_list.map(a => a.sensor_id))];
        let digitizer_ids = [...new Set(processed_list.map(a => a.digitizer_id))];
        if (processed_list.length >0 && this.dateRange.endDate == ""){
          this.dateRange.endDate = moment(processed_list[0].processed_at_ts,"X").format("YYYY-MM-DD") + " 23:59:59";
          this.dateRange.startDate = moment(processed_list[processed_list.length-1].processed_at_ts,"X").format("YYYY-MM-DD") + " 00:00:00";
        }
        

        this.headers = [
          { text: "Id", value: "processed_hole_id", sortable: true },
          { text: "Processed date", value: "date", sortable: false },
          {
            text: "Bench",
            value: "bench_name",
            sortable: false,
            values: to_unique_obj(bench_names),
            allChecked: true
          },
          {
            text: "Pattern",
            value: "pattern_name",
            sortable: false,
            values: to_unique_obj(pattern_names),
            allChecked: true
          },
          {
            text: "Hole_name",
            value: "hole_name",
            sortable: false,
            values: to_unique_obj(hole_names),
            allChecked: true
          },
          {
            text: "Hole_id",
            value: "hole_id",
            sortable: false,
            values: to_unique_obj(hole_ids),
            allChecked: true
          },
          {
            text: "Rig",
            value: "rig_id",
            sortable: false,
            values: to_unique_obj(rig_ids),
            allChecked: true
          },
          {
            text: "Sensor",
            value: "sensor_id",
            sortable: false,
            values: to_unique_obj(sensor_ids),
            allChecked: true
          },
          {
            text: "Digitizer",
            value: "digitizer_id",
            sortable: false,
            values: to_unique_obj(digitizer_ids),
            allChecked: true
          },
          {
            text: "Flow",
            value: "flow_id",
            sortable: false,
            values: to_unique_obj(flow_ids),
            allChecked: true
          },
          {
            text: "Batch_id",
            value: "process_id",
            sortable: false,
            values: to_unique_obj(process_ids),
            allChecked: true
          },
          {
            text: "TO LP",
            value: "to_mp",
            sortable: false,
            values: {
              1: { label: "True", checked: true },
              0: { label: "False", checked: true }
            },
            allChecked: true
          },
          { text: "Actions", sortable: false }
        ];
      }
    },
    headers: function(_new, _old) {
      this.changed_filter();
    }
  },
  computed: {
    server_data() {
      
      return this.$store.state.processed_holes.processed_list;
    },
    processed_at_ts(){
      return this.$store.state.processed_holes.processed_at_ts.map(a => moment(a,"X").format("YYYY-MM-DD"));
    },

    loading() {
      return this.$store.state.processed_holes.loading;
    }
  }
};
</script>
