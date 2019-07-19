<template>
    <v-dialog v-model="value"  fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Comparing {{ holes_info.length }} process</v-toolbar-title>
          
        </v-toolbar>
        
        <v-container grid-list-md fluid text-xs-center >
          <v-layout row wrap align-center v-if='loading '>
          <v-flex>
            <v-progress-circular
      :size="100"
      color="primary"
      indeterminate
      
    ></v-progress-circular>    
          </v-flex>
        </v-layout>
        
        <v-layout row wrap v-if='holes_info'  >
            <v-flex xs12 v-for="hole_info in holes_info" :key='hole_info.processed_hole_id'>
                <v-subheader class="grey--text text--darken-4">{{ hole_info.output_folder_name }}</v-subheader>
                <v-img :src="get_image(hole_info.images[0],hole_info.processed_hole_id)"></v-img>
                
                
                <v-divider ></v-divider>
            </v-flex >
            
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
        get_image:function(image_file_name,processed_hole_id){
            return "/images/" + this.mine_name + "/" + processed_hole_id + "/"+image_file_name
        },
    },
   
    computed : {
      holes_info () {
        return this.$store.state.comparison_hole_info.holes_info
      },
      loading () {
        return this.$store.state.comparison_hole_info.loading
      }
    },
    props:['processed_hole_selection','mine_name','value']
  }
</script>