import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home.vue"), // Lazy load
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/favorites.vue"), // Lazy load
  },
  {
    path: "/random",
    name: "Random",
    component: () => import("../views/random.vue"), // Lazy load
  },
];

// Crear la instancia del router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
