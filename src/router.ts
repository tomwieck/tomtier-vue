import { createRouter, createWebHistory } from "vue-router";

import Main from "./components/Main.vue";
import MixesView from "./components/views/MixesView.vue";
import TracksView from "./components/views/TracksView.vue";

const routes = [
  { path: "/", name: "Home", component: Main },
  { path: "/mixes", name: "Mixes", component: MixesView },
  { path: "/tracks", name: "Tracks", component: TracksView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
