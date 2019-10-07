<template>
         <v-list two-line>
             <template v-for="(item) in field_files_list">
             <v-list-tile
              :key="item"
              @click="redirect_to(item)"
                >
                <v-list-tile-content>
                <v-list-tile-title v-html="item"></v-list-tile-title>
              </v-list-tile-content>
                </v-list-tile>
                </template>
         </v-list>
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
      }
  }

}
</script>