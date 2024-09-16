import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import CV from "./views/CV.vue";
import Projects from "./views/Projects.vue";
import Chat from "./views/Chat.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/cv",
      component: CV,
      meta: { title: "CV" },
    },
    {
      path: "/projects",
      component: Projects,
      meta: { title: "Projects" },
    },
    {
      path: "/chat",
      component: Chat,
      meta: { title: "Chat" },
    },
  ],
});

const DEFAULT_TITLE: string = "Anh Tài";
router.afterEach((to) => {
  let title = to.meta?.title;
  if (typeof title == "string") {
    document.title = DEFAULT_TITLE + " | " + title;
  } else {
    document.title = DEFAULT_TITLE;
  }
});

export default router;
