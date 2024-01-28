export const staffRoutes = [
  {
    component: () => import("@/views/Staff/StaffAreaView.vue"),
    name: "StaffArea",
    path: "/staff_area",
  },
  {
    component: () => import("@/views/Staff/ApplicationsReviewView.vue"),
    name: "ApplicationsReview",
    path: "/staff_area/applications_review",
  },
  {
    component: () => import("@/views/Staff/StaffWars.vue"),
    name: "StaffWars",
    path: "/staff_area/wars",
  },
];
