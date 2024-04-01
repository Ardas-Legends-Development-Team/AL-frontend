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
    component: () => import("@/views/Staff/StaffWarsView.vue"),
    name: "StaffWars",
    path: "/staff_area/wars",
  },
  {
    component: () => import("@/views/Staff/SubmitBattleView.vue"),
    name: "SubmitBattle",
    path: "/staff_area/submit_battle",
  },
];
