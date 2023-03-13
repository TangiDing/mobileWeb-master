import * as VueRouter from "vue-router";
import Main from "../pages/Main.vue";
import Other from "../pages/Other.vue";

var a = 1;

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/other",
    component: Other
  }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;