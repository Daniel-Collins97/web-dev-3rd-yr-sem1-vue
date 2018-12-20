// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetAlert2 from 'vue-sweetalert2'
import firebase from 'firebase'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueSweetAlert2);

let app = '';

var config = {
  apiKey: "AIzaSyAzS4Nf4xINUVOCMyu0GGSeMPJsVfs7AUI",
  authDomain: "vue-proj-b3032.firebaseapp.com",
  databaseURL: "https://vue-proj-b3032.firebaseio.com",
  projectId: "vue-proj-b3032",
  storageBucket: "vue-proj-b3032.appspot.com",
  messagingSenderId: "73216819675"
};

firebase.initializeApp(config);


firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    console.log(firebase.auth().currentUser);
    app = new Vue({
      el: '#app',
      router,
      components: {App},
      template: '<App/>',
    })
  }
});
