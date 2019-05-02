<template>
    <v-dialog v-model="value" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Processed hole</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn v-if='processed && processed.to_mp == 0' color="green" v-on:click="to_mp(true)">Add to mp</v-btn>
          <v-btn v-if='processed && processed.to_mp == 1' color="red" v-on:click="to_mp(false)">Remove from mp</v-btn>
          
        </v-toolbar>
        
        <v-container grid-list-md fluid text-xs-center >
          <v-layout row wrap align-center v-if='loading && !processed'>
          <v-flex>
            <v-progress-circular
      :size="100"
      color="primary"
      indeterminate
      
    ></v-progress-circular>    
          </v-flex>
        </v-layout>
        
        <v-layout row wrap v-if='processed'>
            <v-flex xs12>
                <v-img :src="get_image(processed.images[0])"></v-img>
            </v-flex >
            <v-flex xs12>
            <v-subheader>Processed hole details:</v-subheader>
            </v-flex >
            <v-flex xs4> 
                
            <v-card dark color="secondary">
                <v-layout row wrap>
                <v-flex xs6>
                <v-card-text class="text-capitalize "><strong>Process_id:</strong></v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize ">{{processed.processed_hole_id}}</v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize "><strong>Processed_at:</strong></v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize ">{{moment(processed.processed_at_ts).format('YYYY-MM-DD hh:mm:ss')}}</v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize "><strong>Min Time:</strong></v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize ">{{}}</v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize "><strong>Max Time:</strong></v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize ">{{}}</v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize "><strong>To mp:</strong></v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize ">{{processed.to_mp}}</v-card-text>
                </v-flex >
                </v-layout>
            </v-card>
            </v-flex>
            <v-flex xs4>
            <v-card dark color="secondary">
                <v-layout row wrap>
                <v-flex xs6>
                <v-card-text class="text-capitalize "><strong>Bench:</strong></v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize ">{{processed.bench_name}}</v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize "><strong>Pattern:</strong></v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize ">{{processed.pattern_name}}</v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize "><strong>Hole_name:</strong></v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize ">{{processed.hole_name}}</v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize "><strong>Hole_id:</strong></v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize ">{{processed.hole_id}}</v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize "><strong>Flow id:</strong></v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize ">{{processed.flow_id}}</v-card-text>
                </v-flex >
                </v-layout>
            </v-card>
            </v-flex>
            <v-flex xs4>
            <v-card dark color="secondary">
                <v-layout row wrap>
                <v-flex xs6>
                <v-card-text class="text-capitalize "><strong>Rig_id:</strong></v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize ">{{processed.rig_id}}</v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize "><strong>Sensor_id:</strong></v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize ">{{processed.sensor_id}}</v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize "><strong>Accel_type:</strong></v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize ">{{processed.sensor_accelerometer_type}}</v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize "><strong>Saturation_g:</strong></v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize ">{{processed.sensor_saturation_g}}</v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize "><strong>Digitizer_id:</strong></v-card-text>
                </v-flex >
                <v-flex xs6>
                <v-card-text class="text-capitalize ">{{processed.digitizer_id}}</v-card-text>
                </v-flex >
                </v-layout>
            </v-card>
            
            </v-flex>
            <v-btn outline color="dark-blue">Processed.csv</v-btn>
            <v-btn outline color="dark-blue">Acorr.h5</v-btn>
            
        </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    data: () => ({
    }),
    methods:{
        close:function(){
            this.$emit('input', false)
        },
        moment:function(unix){
            return window.moment.unix(unix);
        },
        get_image:function(image_file_name){
            return "http://localhost:5000/images/" + this.mine_name + "/" + this.processed.processed_hole_id + "/"+image_file_name
        },
        to_mp:function(to_mp){
            this.$store.dispatch('UPDATE_HOLE_TO_MP',{mine_name:this.mine_name,processed_hole_id:this.processed.processed_hole_id,to_mp:to_mp})
        }
    },
    computed : {
      processed () {
        return this.$store.state.hole_info.hole_info
      },
      loading () {
        return this.$store.state.hole_info.loading
      }
    },
    props:['value','mine_name','clicked_processed_hole_id']
  }
</script>