const listingRoutes = [
  {
    path: "/lists",
    name: "Lists",
    component: () => import("@/views/Listings/ListsView.vue"),
  },
  {
    path: "/lists/roleplay_characters",
    name: "RoleplayCharactersList",
    component: () => import("@/views/Listings/RoleplayCharactersListView.vue"),
  },
  {
    path: "/lists/regions",
    name: "RegionsList",
    component: () => import("@/views/Listings/RegionListView.vue"),
  },
];

export default listingRoutes;
