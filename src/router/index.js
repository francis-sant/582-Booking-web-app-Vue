import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ClassesAvailable from "../views/ClassesAvailable.vue";
import TeacherClasses from "../views/TeacherClasses.vue";
import RescheduleClass from "@/views/RescheduleClass.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/classes",
    name: "classes",
    component: ClassesAvailable,
    children: [
      {
        path: "/classes/booking",
        name: "classes",
        component: ClassesAvailable,
      },
      {
        path: "/classes/booking/bookedclasses",
        name: "classes",
        component: ClassesAvailable,
      },
    ],
  },
  {
    path: "/services",
    name: "services",
    component: TeacherClasses,
    children: [
      {
        path: "/services/booked",
        name: "services",
        component: TeacherClasses,
      },
    ],
  },
  {
    path: "/instructor",
    component: TeacherClasses,
    meta: { role: "instructor" },
  },
  {
    path: "/student",
    component: ClassesAvailable,
    meta: { role: "student" },
  },

  {
    path: "/reschedule",
    name: "reschedule",
    component: RescheduleClass,

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
