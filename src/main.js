import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import router from './router'
import { store } from './store/index.js'
import VueResource from 'vue-resource'

Vue.use(router)
Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
    vuetify: vuetify,
    store: store,
    router: router,
    render: h => h(App)
}).$mount('#app')