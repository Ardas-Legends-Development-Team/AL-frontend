import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/lists",
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("@/views/Homeview.vue"),
    },
    {
      path: "/lists",
      name: "Lists",
      component: () => import("@/views/ListsView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

export default router;
