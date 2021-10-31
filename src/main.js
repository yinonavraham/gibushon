import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvad9JZ_XU8GdWMH9Kv0I52PyEkyksQLU",
  authDomain: "gibushon-dev.firebaseapp.com",
  projectId: "gibushon-dev",
  storageBucket: "gibushon-dev.appspot.com",
  messagingSenderId: "72539550504",
  appId: "1:72539550504:web:9ad067195f1fda5920561d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')