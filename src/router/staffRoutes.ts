const staffRoutes = [
  {
    path: "/staff_area",
    name: "StaffArea",
    component: () => import("@/views/StaffAreaView.vue"),
  },
  {
    path: "/staff_area/applications_review",
    name: "ApplicationsReview",
    component: () => import("@/views/ApplicationsReviewView.vue"),
  },
];

export default staffRoutes;
