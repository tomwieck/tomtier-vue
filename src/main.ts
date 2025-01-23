import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

// import terra from 'terra';

// const app = new (createApp as any) (App);
// app.provide('$terra', terra);

createApp(App).use(router).mount("#app");
