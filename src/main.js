import { createApp } from "vue";
import axios from "axios";
import mitt from 'mitt';
import VueAxios from "vue-axios";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import { required, email, min } from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";
import App from "./App.vue";
import router from "./router";

// 啟用 mitt
const emitter = mitt();

// 定義驗證規則
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);

// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
setLocale("zh_TW");

const app = createApp(App).use(router);
app.config.globalProperties.$emitter = emitter;
app.config.productionTip = false;
app.use(VueAxios, axios);
app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);
app.component("VueDatePicker", VueDatePicker);
app.mount("#app");

