import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFoundView.vue"),
    },
    {
      path: "/",
      redirect: "/home",
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
      path: "/lists/roleplay_characters",
      name: "RoleplayCharactersList",
      component: () => import("@/views/RoleplayCharactersListView.vue"),
    },
    {
      path: "/lists/regions",
      name: "RegionsList",
      component: () => import("@/views/RegionListView.vue"),
    },
  ],
});

export default router;
