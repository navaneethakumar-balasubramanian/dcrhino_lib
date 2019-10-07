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
      component: () => import("./views/mwdint.vue")
    },
    {
      path: "/blasthole_observations/:mine_name",
      name: "blasthole_observations",
      props: true,
      component: () => import("./views/BlastholeObservations.vue")
    },
    {
      path: "/acorr_files/:mine_name",
      name: "acorr_files",
      props: true,
      component: () => import("./views/AcorrFiles.vue")
    },
    {
      path: "/process_flows/:mine_name",
      name: "process_flows",
      props: true,
      component: () => import("./components/ProcessFlowEditor.vue")
    },
    {
      path: "/field_data/:mine_name",
      name: "field_data",
      props: true,
      component: () => import("./views/FieldDataList.vue")
    }
  ]
});