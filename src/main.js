import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Paginate from "vuejs-paginate";
import VueMeta from "vue-meta";
import Loader from "./components/app/Loader.vue";
import currencyFilter from "./filters/currency.filter";
import messagePlugin from "./utils/massage.plugin";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.use(VueMeta);
Vue.filter("currency", currencyFilter);
Vue.component("Paginate", Paginate);
Vue.component("Loader", Loader);

firebase.initializeApp({
  apiKey: "AIzaSyCiadoQB2CfaDIFP5unkGhEkvn0xK3ijR0",
  authDomain: "t-vue-crm.firebaseapp.com",
  databaseURL: "https://t-vue-crm.firebaseio.com",
  projectId: "t-vue-crm",
  storageBucket: "t-vue-crm.appspot.com",
  messagingSenderId: "738636523080",
  appId: "1:738636523080:web:b79d1f5f856dbaa2429a7d",
  measurementId: "G-K890TTWTHD"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
