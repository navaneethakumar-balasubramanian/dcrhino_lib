<template>
  <div class="about">
 <v-toolbar flat color="white">
      <v-toolbar-title>Processed files from : {{mine_name}} </v-toolbar-title>
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
      :items="processed"
      item-key="processed_hole_id"
      select-all
      class="elevation-1"
      hide-actions
    >
   
      <template v-slot:items="items">
        <td>
          <v-checkbox
            v-model="items.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td class="text-xs-right">{{ items.item.processed_hole_id }}</td>
        <td class="text-xs-right">{{ moment(items.item.processed_at_ts).format('YYYY-MM-DD hh:mm:ss') }}</td>
        <td class="text-xs-right">{{ items.item.bench_name }}</td>
        <td class="text-xs-right">{{ items.item.pattern_name }}</td>
        <td class="text-xs-right">{{ items.item.hole_name }}</td>
        <td class="text-xs-right">{{ items.item.hole_id }}</td>
        <td class="text-xs-right">{{ items.item.rig_id }}</td>
        <td class="text-xs-right">{{ items.item.sensor_id }}</td>
        <td class="text-xs-right">{{ items.item.digitizer_id }}</td>
        <td class="text-xs-right">{{ items.item.flow_id }}</td>
        <td class="text-xs-right"><v-icon v-if='items.item.to_mp == 1' color='green'>radio_button_checked</v-icon><v-icon v-else color='red'>radio_button_unchecked</v-icon></td>
        <td>
          <v-btn outline icon color="indigo" @click="showProcessedHole(items.item.processed_hole_id)">
              <v-icon>info</v-icon>
            </v-btn></td>
      </template>
      
    </v-data-table>
    <v-btn flat color='light-blue' v-on:click="compare_selection()" >Compare selection</v-btn>
      <v-btn flat color='light-blue' v-on:click="compare_selection()" > <v-icon left dark>cloud_download</v-icon>Selection csv</v-btn>
    <HoleCard :key="clicked_processed_hole_id" :clicked_processed_hole_id="clicked_processed_hole_id" :mine_name="mine_name" v-model="show_dialog" ></HoleCard>
    <ComparisonHoleCard  :processed_hole_selection="selected" v-model="show_dialog_comparison" :mine_name="mine_name"></ComparisonHoleCard>
    <v-snackbar v-model="warning" color='error' bottom  right multi-line    :timeout='3000'  >{{ warning_text }}</v-snackbar>
  </div>
</template>

<script>
  import HoleCard from '../components/HoleCard.vue'
  import ComparisonHoleCard from '../components/ComparisonHoleCard.vue'
  export default {
    components:{
      HoleCard,
      ComparisonHoleCard
    },
    data: () => ({
        search: null,
        clicked_processed_hole_id : false, 
        show_dialog:false,
        show_dialog_comparison:false,
        selected : [],
        pagination: {rowsPerPage:-1},
        warning: null,
        warning_text: null,
        headers : [
                  {text:"Id", value:'processed_hole_id',sortable: false},
                    {text:"Processed date", value:'date',sortable: false},
                    {text:"Bench", value:'bench_name',sortable: false},
                    {text:"Pattern", value:'pattern_name',sortable: false},
                    {text:"Hole_name", value:'hole_name',sortable: false},
                    {text:"Hole_id", value:'hole_id',sortable: false}, 
                    {text:"Rig", value:'rig_id',sortable: false},
                    {text:"Sensor", value:'sensor_id',sortable: false},
                    {text:"Digitizer", value:'digitizer_id',sortable: false},
                    {text:"Flow", value:'flow_id',sortable: false},
                    {text:"MP", value:'to_mp',sortable: false},
                    {text:"Actions"}]
    }),
    created(){  
        this.$store.dispatch('GET_PROCESSED',{mine_name:this.mine_name})
    },
    props:['mine_name'],
    
    methods:{
      moment:function(unix){
        return window.moment.unix(unix);
      },
      compare_selection:function(){
        if (this.selected.length > 1) {
          this.show_dialog_comparison = true
          let selection_ids = this.selected.map(a => a.processed_hole_id);
          this.$store.dispatch('GET_HOLES_INFO',{mine_name:this.mine_name,processed_hole_id:selection_ids})    
        }else {
          this.warning = true
          this.warning_text = "Select a few holes to compare."
        }
      },
      searchWeb:function(){
        this.$store.dispatch('GET_PROCESSED',{mine_name:this.mine_name,search:this.search})
      },
      showProcessedHole:function(processed_hole_id){
        this.show_dialog=true
        this.clicked_processed_hole_id = processed_hole_id
        this.$store.dispatch('GET_HOLE_INFO',{mine_name:this.mine_name,processed_hole_id:processed_hole_id})    
      }
    },
    computed : {
      processed () {
        return this.$store.state.processed_holes.processed_list
      },
      loading () {
        return this.$store.state.processed_holes.loading
      }
    }
  }
</script>