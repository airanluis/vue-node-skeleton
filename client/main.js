// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import lang from "element-ui/lib/locale/lang/es";
import locale from "element-ui/lib/locale";


import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";

import store from "./core/store";

locale.use(lang);
Vue.use(ElementUI, { locale: lang });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	store,
	components: { App },
	render: h => h("app")
});
