import { createApp, h } from "vue"
import router from "./router/index";
import App from "./App.vue"
import "./styles/index.scss";

var a = 2;

const app = createApp({
  route: router,
  render: () => h(App)
});

app.use(router)

app.mount("#app")
