import { createApp } from "vue";
import "@/assets/style.css";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount("#app");
