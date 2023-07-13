export const listingRoutes = [
  {
    component: () => import("@/views/Listings/ListsView.vue"),
    name: "Lists",
    path: "/lists",
  },
  {
    component: () => import("@/views/Listings/RoleplayCharactersListView.vue"),
    name: "RoleplayCharactersList",
    path: "/lists/roleplay_characters",
  },
  {
    component: () => import("@/views/Listings/RegionListView.vue"),
    name: "RegionsList",
    path: "/lists/regions",
  },
  {
    component: () => import("@/views/Listings/FactionListView.vue"),
    name: "FactionsList",
    path: "/lists/factions",
  },
];
