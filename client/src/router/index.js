import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Momentum from "../views/Momentum.vue"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Momentum",
    component: Momentum
  },

];

const router = new VueRouter({
  routes
});

export default router;
