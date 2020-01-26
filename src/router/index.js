import Vue from "vue";
import Router from "vue-router";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../views/Index.vue")
    },
    {
      path: "/about-good/:id",
      name: "about-good",
      props: true,
      component: () => import("../views/About-good.vue")
    },
    {
      path: "/about-order/:id",
      name: "about-order",
      props: true,
      component: () => import("../views/About-order.vue")
    },
    {
      path: "/basket",
      name: "basket",
      component: () => import("../views/Basket.vue")
    },
    {
      path: "/catalog",
      name: "catalog",
      component: () => import("../views/Catalog.vue")
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/Contact.vue")
    },
    {
      path: "/history",
      name: "history",
      component: () => import("../views/History.vue")
    },
    {
      path: "/order-payment",
      name: "order-payment",
      component: () => import("../views/Order-payment.vue")
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/Profile.vue")
    },
    {
      path: "/support",
      name: "support",
      component: () => import("../views/Support.vue")
    },
    {
      path: "/successfully",
      name: "successfully",
      component: () => import("../views/Successfully.vue")
    },
    {
      path: "/404",
      name: "404",
      component: () => import("../views/404.vue")
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});

export default router;
