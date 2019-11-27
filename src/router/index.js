import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { layout: "main-layout", auth: true }
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile.vue"),
    meta: { layout: "main-layout", auth: true }
  },
  {
    path: "/create",
    name: "create",
    component: () => import("../views/Create.vue"),
    meta: { layout: "main-layout", auth: true }
  },
  {
    path: "/outcome",
    name: "outcome",
    component: () => import("../views/Outcome.vue"),
    meta: { layout: "main-layout", auth: true }
  },
  {
    path: "/income",
    name: "income",
    component: () => import("../views/Income.vue"),
    meta: { layout: "main-layout", auth: true }
  },
  {
    path: "/record",
    name: "record",
    component: () => import("../views/CreateRecord.vue"),
    meta: { layout: "main-layout", auth: true }
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: () => import("../views/Detail.vue"),
    meta: { layout: "main-layout", auth: true }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: { layout: "empty-layout" }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
    meta: { layout: "empty-layout" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/login?message=auth/login");
  } else {
    next();
  }
});

export default router;
