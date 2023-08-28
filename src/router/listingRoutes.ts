export const listingRoutes = [
  {
    component: () => import("@/views/Listings/ListsView.vue"),
    name: "Lists",
    path: "/modals",
  },
  {
    component: () => import("@/views/Listings/RoleplayCharactersListView.vue"),
    name: "RoleplayCharactersList",
    path: "/modals/roleplay_characters",
  },
  {
    component: () => import("@/views/Listings/RegionListView.vue"),
    name: "RegionsList",
    path: "/modals/regions",
  },
  {
    component: () => import("@/views/Listings/FactionListView.vue"),
    name: "FactionsList",
    path: "/modals/factions",
  },
];
