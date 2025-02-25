import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import Router from "./services/router";

createApp(App).use(Router).mount("#app");
