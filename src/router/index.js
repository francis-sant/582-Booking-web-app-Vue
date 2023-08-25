import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ClassesAvailable from "../views/ClassesAvailable.vue";
import TeacherClasses from "../views/TeacherClasses.vue";
import AboutViewVue from "@/views/AboutView.vue";

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
  },
  {
    path: "/teacherclasses",
    name: "teacherclasses",
    component: TeacherClasses,
    children: [
      {
        path: "/services/teacher",
        name: "teacherclasses",
        component: TeacherClasses,
      },
    ],
  },

  {
    path: "/about",
    name: "about",
    component: AboutViewVue,
    children: [
      {
        path: "/student/booking",
        name: "studentbooking",
        component: AboutViewVue,
      },
    ],
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
