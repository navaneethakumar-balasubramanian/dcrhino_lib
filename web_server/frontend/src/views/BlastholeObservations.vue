<template>
  <div class="about">
    <v-toolbar flat color="white">
      <v-toolbar-title>Blasthole Observations from : {{ mine_name }}<br /><span
          class="body-2 font-weight-light"
          >{{ filtered_data.length }} results found.</span
        > </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        v-model.lazy="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        @click:append="searchWeb"
        v-on:keyup.enter="searchWeb"
        :loading="loading"
      ></v-text-field>
    </v-toolbar>
    <v-data-table
      v-model="selected"
      :pagination.sync="pagination"
      :headers="headers"
      :items="filtered_data"
      item-key="bo_id"
      select-all
      class="elevation-1"
      hide-actions
    >
      <template slot="headerCell" slot-scope="props">
        <v-dialog v-model="props.header.dialog" scrollable max-width="300px">
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
        <td class="text-xs-left">{{ items.item.bo_id }}</td>
        
        <td class="text-xs-left">{{ items.item.bench_name }}</td>
        <td class="text-xs-left">{{ items.item.pattern_name }}</td>
        <td class="text-xs-left">{{ items.item.hole_name }}</td>
        <td class="text-xs-left">{{ items.item.hole_id }}</td>
        <td class="text-xs-left">{{ items.item.rig_id }}</td>
        <td class="text-xs-left">{{ items.item.sensor_id }}</td>
        <td class="text-xs-left">{{ items.item.digitizer_id }}</td>
        
        
      </template>
    </v-data-table>

  <v-btn v-if='visible_buttons' flat color="light-blue" v-on:click="process_selection()"
      >Process selected</v-btn>
    <v-dialog v-model="select_process_flow" scrollable max-width="300px">
          
          <v-card>
            <v-card-title>Select the process flow to use</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;" class="pa-0 pm-0">
              <v-list class="pa-0 pm-0">
                <v-list-tile style='margin:0;padding:0'
                  v-for="(item, i) in process_flows"
                  :key="i" ripple>
                 
                  <v-btn v-on:click="process_using(item)" style='padding:0;font-size:10px' flat color="light-blue" >{{ item }}</v-btn >
                </v-list-tile>
                
              </v-list>
            </v-card-text>
          </v-card>
        </v-dialog>
    
    
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
</template>

<script>


export default {
  data: () => ({
    select_process_flow:false,
    process_flows:[],
    search: null,
    blasthole_observations:[],
    filtered_data:[],
    clicked_processed_hole_id: false,
    show_dialog: false,
    show_dialog_comparison: false,
    selected: [],
    pagination: { rowsPerPage: -1 },
    warning: null,
    warning_text: null,
    message: null,
    message_text: null,
    headers: []
  }),
  created() {
    this.$store.dispatch("GET_BLASTHOLE_OBSERVATIONS", { mine_name: this.mine_name });
  },
  props: ["mine_name"],

  methods: {
    process_selection:function(){
      let temp = this;
      let payload = {
          mine_name: this.mine_name,
          responseType: "arraybuffer"
        };
        axios.post("http://localhost:5000/api/process_flows", payload).then(
          response => {
            temp.process_flows = response.data.process_flows
          }
        );
        this.select_process_flow = true
    },
    process_using:function(item){
      let temp = this;
      let payload = {
          mine_name: this.mine_name,
          blasthole_obs: this.selected,
          process_flow: item
        };
         axios.post("http://localhost:5000/api/process_holes_with", payload).then(
          response => {
            if (response.data.data == true ){
                temp.message = true;
                temp.message_text = "Added " + this.selected.length + " blastholes to processing queue.";
            }else{
              temp.warning = true;
              temp.warning_text = "Fail to add " + this.selected.length + " blastholes to processing queue."; 
            }
            
          }
        );
      this.select_process_flow = false
    },
    moment: function(unix) {
      return window.moment.unix(unix);
    },
    togleAllOnList: function(header) {
      for (let item in header.values) {
        header.values[item].checked = header.allChecked;
      }
      this.changed_filter();
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
    allChecked: function(list) {
      for (let item in list) {
        if (list[item].checked == false) {
          return false;
        }
      }
      return true;
    },
    get_processed_selection: function() {
      if (this.selected.length > 1) {
        let payload = {
          mine_name: this.mine_name,
          processed_holes: this.selected,
          responseType: "arraybuffer"
        };
        axios.post("http://localhost:5000/get_processed_csv", payload).then(
          response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "processed.csv"); //or any other extension
            document.body.appendChild(link);
            link.click();
          }
        );
      } else {
        this.warning = true;
        this.warning_text = "Select a few holes to download.";
      }
    },
    
    searchWeb: function() {
      this.$store.dispatch("GET_PROCESSED", {
        mine_name: this.mine_name,
        search: this.search
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
        let bo_ids = [...new Set(processed_list.map(a => a.bo_id))];
        let flow_ids = [...new Set(processed_list.map(a => a.flow_id))];
        let bench_names = [...new Set(processed_list.map(a => a.bench_name))];
        let pattern_names = [...new Set(processed_list.map(a => a.pattern_name))];
        let hole_names = [...new Set(processed_list.map(a => a.hole_name))];
        let hole_ids = [...new Set(processed_list.map(a => a.hole_id))];
        let rig_ids = [...new Set(processed_list.map(a => a.rig_id))];
        let sensor_ids = [...new Set(processed_list.map(a => a.sensor_id))];
        let digitizer_ids = [...new Set(processed_list.map(a => a.digitizer_id))];
        
        

        this.headers = [
          { text: "Id", value: "bo_id", sortable: false, values: to_unique_obj(bo_ids) },
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
          }
        ];
        
        this.filtered_data = _new
      }
      else{
        this.filtered_data = []
      }
    }
  },
  computed: {
    visible_buttons(){
      return (this.selected.length > 0) 
    },
    server_data() {      
      
      return this.$store.state.blasthole_observations.blasthole_observations;
    },

    loading() {
      return this.$store.state.blasthole_observations.loading;
    }
  }
};
</script>
