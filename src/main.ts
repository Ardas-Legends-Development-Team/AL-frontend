import { createApp } from "vue";
import "@/assets/style.css";
import App from "./App.vue";
import router from "./router/index";

import claimbuildStore from "./stores/listingDataStore";

const app = createApp(App);

app.use(router);
app.use(claimbuildStore);

app.mount("#app");
