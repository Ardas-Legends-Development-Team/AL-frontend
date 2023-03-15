const staffRoutes = [
  {
    path: "/staff_area",
    name: "StaffArea",
    component: () => import("@/views/Staff/StaffAreaView.vue"),
  },
  {
    path: "/staff_area/applications_review",
    name: "ApplicationsReview",
    component: () => import("@/views/Staff/ApplicationsReviewView.vue"),
  },
];

export default staffRoutes;
