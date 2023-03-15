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
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Homeview.vue"),
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
