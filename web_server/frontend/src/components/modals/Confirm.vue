<template>
    <v-dialog
      v-model="show"
      max-width="290"
    >
      <v-card>
        <v-card-title class="title">{{title}}</v-card-title>
        <v-card-text>
          {{description}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="show = false"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="show = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
    name:"ConfirmDialog",
    props: ["title","description","show"],
}
</script>