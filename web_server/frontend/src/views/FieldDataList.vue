<template>
 <v-container fluid grid-list-sm>
     <h4 style='headline'>Field data from {{mine_name }}</h4>
    <v-layout row wrap>
        <template v-for="(item) in field_files_list">
            
            <v-flex :key="item" md6 lg3 >
                <v-card>
                    <v-img @click="redirect_to(item)" :src="item" aspect-ratio="1.5" ></v-img>
                    <v-card-actions>
                        <div class="caption text-truncate" small>.../{{item.split("/").slice(5,0).join("/")}}</div>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </template>
    </v-layout>
  </v-container>
</template>
<script>

export default {
  components: {
  },
  data: () => ({
    field_files_list: []
  }),
  created() {
    let temp = this
    axios.post("/api/field_data_images", { mine_name: this.mine_name }).then(
          response => {
            temp.field_files_list= response.data
          }
        );

  },
  props: ["mine_name"],
  methods:{
      redirect_to:function(url){
        window.open(url)
      },
      
  }

}
</script>