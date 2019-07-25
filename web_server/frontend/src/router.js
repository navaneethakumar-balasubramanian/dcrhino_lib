import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import IntTest from "./views/Inttest.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/int",
      name: "int",
      component: IntTest
    },
    {
      path: "/processed/:mine_name",
      name: "processed",
      props: true,
      component: () => import("./views/Processed.vue")
    },
    {
      path: "/mwd/:mine_name",
      name: "mwd",
      props: true,
      component: () => import("./views/Mwd.vue")
    },
    {
      path: "/acorr_files/:mine_name",
      name: "acorr_files",
      props: true,
      component: () => import("./views/AcorrFiles.vue")
    }
  ]
});
