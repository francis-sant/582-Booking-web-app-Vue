import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ClassesAvailable from "../views/ClassesAvailable.vue";
import TeacherClasses from "../views/TeacherClasses.vue";
import RescheduleClass from "@/views/RescheduleClass.vue";
import StudentPage from "@/views/StudentPage.vue";
import InstructorPage from "@/views/InstructorPage.vue";
import StudentBookedClass from "@/components/StudentBookedClass.vue";
import { useAuthStore } from "@/store/authentication.js";
import NotFoundComponent from "@/views/NotFoundComponent.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/student",
    name: "student",
    component: StudentPage,
    meta: { role: "student", requiresAuth: true },
    children: [
      {
        // /student/dashboard
        path: "/student/booking",
        name: "studentclasses",
        component: ClassesAvailable,
      },
      {
        path: "/student/reschedule",
        name: "studentreschedule",
        component: StudentBookedClass,
      },
    ],
  },

  {
    path: "/instructor",
    name: "instructor",
    component: InstructorPage,
    meta: { role: "instructor", requiresAuth: true },
    children: [
      {
        // "/services/booked",
        path: "/instructor/booking",
        name: "instructorclasses",
        component: TeacherClasses,
      },
      {
        path: "student/reschedule",
        name: "rescheduleclasses",
        component: RescheduleClass,
      },
    ],
  },
  {
    path: "/*",
    name: "notFound",
    component: NotFoundComponent,
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
