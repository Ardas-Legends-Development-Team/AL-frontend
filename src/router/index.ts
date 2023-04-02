import { createRouter, createWebHistory } from "vue-router";
import applicationRoutes from "@/router/applicationRoutes";
import listingRoutes from "@/router/listingRoutes";
import staffRoutes from "@/router/staffRoutes";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFoundView.vue"),
  },
  {
    path: "/",
    redirect: "/user_dashboard",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Homeview.vue"),
  },
  {
    path: "/user_dashboard",
    name: "UserDashboard",
    component: () => import("@/views/Dashboards/UserDashboardView.vue"),
  },
  {
    path: "/faction/:factionName",
    name: "FactionDashboard",
    component: () => import("@/views/Dashboards/FactionDashboardView.vue"),
  },
];

routes.push(...applicationRoutes);
routes.push(...listingRoutes);
routes.push(...staffRoutes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
