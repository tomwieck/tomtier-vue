<template>
  <h1>Hello App!</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script>
import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "./Main.vue";
import AboutView from "./views/MixesView.vue";

const routes = [
  { path: "/", component: Main },
  { path: "/mixes", component: MixesView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
</script>
