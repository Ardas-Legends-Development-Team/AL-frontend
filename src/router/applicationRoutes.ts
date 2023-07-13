export const applicationRoutes = [
  {
    component: () => import("@/views/Applications/ApplicationsView.vue"),
    name: "Applications",
    path: "/applications",
  },
  {
    component: () =>
      import("@/views/Applications/RoleplayCharacterApplicationView.vue"),
    name: "RoleplayCharacterApplication",
    path: "/applications/roleplay_character",
  },
  {
    component: () =>
      import("@/views/Applications/RoleplayCharacterApplicationEndView.vue"),
    name: "RoleplayCharacterApplicationEnd",
    path: "/applications/roleplay_character/end",
  },
  {
    component: () =>
      import("@/views/Applications/ClaimbuildsApplicationView.vue"),
    name: "ClaimBuildsApplication",
    path: "/applications/claimbuilds",
  },
  {
    component: () =>
      import("@/views/Applications/ClaimbuildsApplicationEndView.vue"),
    name: "ClaimBuildsApplicationEnd",
    path: "/applications/claimbuilds/end",
  },
];
