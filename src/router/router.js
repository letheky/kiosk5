import { createRouter, createWebHashHistory } from "vue-router";
import Timeline from "@/views/Timeline.vue";
// import Detail from "@/views/Detail.vue";
// import Book from "@/views/Book.vue";
// import Map from "@/views/Map.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("../views/Home.vue"),
  },
  // {
  //   name: "detail",
  //   path: "/detail/:type/:id",
  //   component: () => import("../views/Detail.vue"),
  // },
  {
    name: "timeline",
    path: "/timeline",
    component: Timeline,
  },
  {
    name: "detail",
    path: "/detail/:id",
    component: () => import("../views/Detail.vue"),
  },
  {
    name: "book",
    path: "/book/:id",
    component: () => import("../views/Book.vue"),
  },
  {
    name: "map",
    path: "/map/:id",
    component: () => import("../views/Map.vue"),
  },
  {
    name: "tour",
    path: "/tour/:id",
    component: () => import("../views/Tour.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
