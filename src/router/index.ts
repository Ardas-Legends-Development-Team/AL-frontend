import { createRouter, createWebHistory } from "vue-router";
import { applicationRoutes } from "@/router/applicationRoutes";
import { listingRoutes } from "@/router/listingRoutes";
import { staffRoutes } from "@/router/staffRoutes";

const routes = [
  {
    component: () => import("@/views/NotFoundView.vue"),
    name: "NotFound",
    path: "/:pathMatch(.*)*",
  },
  {
    path: "/",
    redirect: "/user_dashboard",
  },
  {
    component: () => import("@/views/HomeView.vue"),
    name: "Home",
    path: "/home",
  },
  {
    component: () => import("@/views/Dashboards/UserDashboardView.vue"),
    name: "UserDashboard",
    path: "/user_dashboard",
  },
  {
    component: () => import("@/views/Dashboards/FactionDashboardView.vue"),
    name: "FactionDashboard",
    path: "/faction/:factionName",
  },
];

routes.push(...applicationRoutes);
routes.push(...listingRoutes);
// We ignore the error below because it makes no sense, it works perfectly.
// @ts-ignore
routes.push(...staffRoutes);

export const router = createRouter({
  history: createWebHistory("/AL-Frontend/"),
  routes,
});
