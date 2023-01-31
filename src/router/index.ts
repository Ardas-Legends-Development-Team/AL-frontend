import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Homeview.vue"),
    },
    {
      path: "/lists",
      name: "Lists",
      component: () => import("@/views/ListsView.vue"),
    },
  ],
});

export default router;
