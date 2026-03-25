import { createApp } from "vue";
import App from "@/App.vue";
import * as UILibrary from "@/index";
import i18n from "@/i18n";
import "bootstrap"; // Bootstrap JS
import "@/bootstrap/local-style-entrypoint.scss"; // Bootstrap CSS + Mocked theme CSS

const app = createApp(App);

app.use(UILibrary.default);
app.use(i18n);

app.mount("#app");
