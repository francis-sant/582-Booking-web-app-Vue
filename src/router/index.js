import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MyItems from "../views/MyItems.vue";
import TeacherClasses from "../views/TeacherClasses.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/classes",
    name: "classes",
    component: MyItems,
  },
  {
    path: "/teacherclasses",
    name: "teacherclasses",
    component: TeacherClasses,
    children: [
      {
        path: "/teacherclasses/booked",
        name: "teacherclasses",
        component: TeacherClasses,
      },
    ],
  },

  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
