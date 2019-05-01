<template>
  <div class="about">
 <v-toolbar flat color="white">
      <v-toolbar-title>Processed files from : {{mine_name}} </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-toolbar>
    <v-data-table
      v-if="processed.length > 0"
      v-model="selected"
      :pagination.sync="pagination"
      :headers="headers"
      :items="processed"
      item-key="processed_hole_id"
      select-all
      class="elevation-1"
      :search="search"
    >
   
      <template v-slot:items="items">
        <td>
          <v-checkbox
            v-model="items.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td class="text-xs-right">{{ moment(items.item.processed_at_ts).calendar() }}</td>
        <td class="text-xs-right">{{ items.item.bench_name }}</td>
        <td class="text-xs-right">{{ items.item.pattern_name }}</td>
        <td class="text-xs-right">{{ items.item.hole_name }}</td>
        <td class="text-xs-right">{{ items.item.hole_id }}</td>
        <td class="text-xs-right">{{ items.item.rig_id }}</td>
        <td class="text-xs-right">{{ items.item.sensor_id }}</td>
        <td class="text-xs-right">{{ items.item.digitizer_id }}</td>
        <td class="text-xs-right">{{ items.item.flow_id }}</td>
        <td class="text-xs-right"><v-icon v-if='items.item.to_mp == 1' color='green'>radio_button_checked</v-icon><v-icon v-else color='red'>radio_button_unchecked</v-icon></td>
        <td><v-btn outline icon color="indigo" @click="clicked_processed_hole_id = items.item.processed_hole_id; show_dialog=true">
              <v-icon>info</v-icon>
            </v-btn></td>
      </template>
    </v-data-table>
    <v-btn color='light-blue' v-on:click="compare">Compare selected</v-btn>
    <HoleCard :key="clicked_processed_hole_id" :clicked_processed_hole_id="clicked_processed_hole_id" :mine_name="mine_name" v-model="show_dialog" ></HoleCard>
  </div>
</template>

<script>
  import HoleCard from '../components/HoleCard.vue'
  export default {
    components:{
      HoleCard
    },
    data: () => ({
        search: null,
        clicked_processed_hole_id : false, 
        show_dialog:false,
        selected : [],
        pagination: {
          rowsPerPage: 25
        },
        headers : [
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
        this.$store.dispatch('GET_PROCESSED',this.mine_name)
    },
    props:['mine_name'],
    methods:{
      moment:function(unix){
        return window.moment.unix(unix);
      },
      compare:function(){
        console.log(this.selected)
      }
    },
    computed : {
      processed () {
        return this.$store.state.processed_holes.processed
      }
    }
  }
</script>