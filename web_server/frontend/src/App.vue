<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="subItem in item.items"
            :key="subItem.title"
            @click="$router.push({ path: subItem.link })"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue" dense fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-icon class="mx-3">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Rhino</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fill-height fluid>
        <v-layout>
          <v-flex>
            <router-view :key="$route.fullPath"></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  mounted() {
    const temp = this;
    axios.get("/mines").then(response => {
      response.data.forEach(element => {
        temp.items.push({
          title: element,
          items: [
            //{ title: "MWD", link: "/mwd/" + element },
            //{ title: "Sensor files", link: "/sensor_files/" + element },
            { title: "Processed files", link: "/processed/" + element },
            { title: "Blasthole observations", link: "/blasthole_observations/" + element }
          ]
        });
      });
    });
  },
  data: () => ({
    drawer: null,
    items: [],
    items2: [
      { picture: 28, text: "Joseph" },
      { picture: 38, text: "Apple" },
      { picture: 48, text: "Xbox Ahoy" },
      { picture: 58, text: "Nokia" },
      { picture: 78, text: "MKBHD" }
    ]
  }),
  props: {
    source: String
  }
};
</script>