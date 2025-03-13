import { createApp } from "vue";
import App from "@/App.vue";
import * as UILibrary from "@/index";
import "bootstrap"; // Bootstrap JS
import "@/bootstrap/local-style-entrypoint.scss"; // Bootstrap CSS + Mocked theme CSS

const app = createApp(App);

app.use(UILibrary.default);

app.mount("#app");
