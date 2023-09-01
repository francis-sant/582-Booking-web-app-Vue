import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ClassesAvailable from "../views/ClassesAvailable.vue";
import TeacherClasses from "../views/TeacherClasses.vue";
import RescheduleClass from "@/views/RescheduleClass.vue";
import StudentPage from "@/views/StudentPage.vue";
import InstructorPage from "@/views/InstructorPage.vue";
import { useAuthStore } from "@/store/authentication.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/student",
    name: "classes",
    component: StudentPage,
    meta: { role: "student", requiresAuth: true },
    children: [
      {
        path: "/student/dashboard",
        name: "studentclasses",
        component: ClassesAvailable,
      },
      // {
      //   path: "/student/dashboard",
      //   name: "studentdashboard",
      //   component: ClassesAvailable,
      // },
    ],
  },

  {
    path: "/instructor",
    name: "services",
    component: InstructorPage,
    meta: { role: "instructor", requiresAuth: true },
    children: [
      {
        path: "/services/booked",
        name: "services",
        component: TeacherClasses,
      },
      {
        path: "/instructor/reschedule",
        name: "reschedule",
        component: RescheduleClass,
      },
      // {
      //   path: "/student/booking",
      //   name: "services",
      //   component: ClassesAvailable,
      //   meta: { role: "student", requiresAuth: true },
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiredRole = to.meta.role;
  const authStore = useAuthStore();
  const userRole = authStore.role;
  const isAuthenticated = authStore.isAuthenticated;

  // console.log("requiredRole", requiredRole);
  // console.log("isAuthenticated", isAuthenticated);
  // console.log("userRole", userRole);

  if (requiredRole) {
    if (!isAuthenticated) {
      // console.log("User not authenticated. Preventing navigation.");
      next(false);
    } else if (userRole === requiredRole) {
      // console.log("Role and authentication match. Allowing navigation.");
      next();
    } else {
      // console.log("Role mismatch. Preventing navigation.");
      next(false);
    }
  } else {
    next();
  }
});

export default router;
