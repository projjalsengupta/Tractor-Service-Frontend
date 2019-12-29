import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        //api: "http://192.168.0.10:8102/api/",
        //api: "http://192.168.43.222:8102/api/",
        api: "http://ec2-13-233-168-239.ap-south-1.compute.amazonaws.com:8102/api/",
        snackbar: false,
        snackbarText: "",
        loggedIn: false
    },
    mutations,
    actions: actions()
})