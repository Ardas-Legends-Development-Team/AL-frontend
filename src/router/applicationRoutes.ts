const applicationRoutes = [
  {
    path: "/applications",
    name: "Applications",
    component: () => import("@/views/Applications/ApplicationsView.vue"),
  },
  {
    path: "/applications/roleplay_character",
    name: "RoleplayCharacterApplication",
    component: () =>
      import("@/views/Applications/RoleplayCharacterApplicationView.vue"),
  },
  {
    path: "/applications/roleplay_character/end",
    name: "RoleplayCharacterApplicationEnd",
    component: () =>
      import("@/views/Applications/RoleplayCharacterApplicationEndView.vue"),
  },
  {
    path: "/applications/claimbuilds",
    name: "ClaimBuildsApplication",
    component: () =>
      import("@/views/Applications/ClaimbuildsApplicationView.vue"),
  },
  {
    path: "/applications/claimbuilds/end",
    name: "ClaimBuildsApplicationEnd",
    component: () =>
      import("@/views/Applications/ClaimbuildsApplicationEndView.vue"),
  },
];

export default applicationRoutes;
