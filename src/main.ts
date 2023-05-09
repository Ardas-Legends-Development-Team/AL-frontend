import { createApp } from "vue";
import "@/assets/style.css";
import App from "./App.vue";
import { router } from "@/router";
import { createPinia } from "pinia";
import { VueCookieNext } from "vue-cookie-next";

VueCookieNext.config({
  expire: "604800s",
  path: "/",
});

const pinia = createPinia();

const app = createApp(App);

app.use(VueCookieNext);
app.use(router);
app.use(pinia);

app.mount("#app");
