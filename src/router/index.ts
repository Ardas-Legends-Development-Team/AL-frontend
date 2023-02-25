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
      path: "/applications",
      name: "Applications",
      component: () => import("@/views/ApplicationsView.vue"),
    },
    {
      path: "/applications/roleplay_character",
      name: "RoleplayCharacterApplication",
      component: () => import("@/views/RoleplayCharacterApplicationView.vue"),
    },
    {
      path: "/applications/roleplay_character/end",
      name: "RoleplayCharacterApplicationEnd",
      component: () =>
        import("@/views/RoleplayCharacterApplicationEndView.vue"),
    },
    {
      path: "/applications/claimbuilds",
      name: "ClaimBuildsApplication",
      component: () => import("@/views/ClaimbuildsApplicationView.vue"),
    },
    {
      path: "/applications/claimbuilds/end",
      name: "ClaimBuildsApplicationEnd",
      component: () => import("@/views/ClaimBuildsApplicationEndView.vue"),
    },
  ],
});

export default router;
