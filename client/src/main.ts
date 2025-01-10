import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";
import VueKonva from "vue-konva";

createApp(App).use(VueKonva).use(Router).mount("#app");
