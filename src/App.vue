<template>
  <v-app>
    <NavigationDrawer v-if="loggedIn" />
    <AppBar v-if="loggedIn" />
    <v-content>
      <router-view />
      <Snackbar />
    </v-content>
  </v-app>
</template>

<script>
import Snackbar from "./components/Snackbar.vue";
import AppBar from "./components/AppBar.vue";
import NavigationDrawer from "./components/NavigationDrawer.vue";

export default {
  name: "App",
  components: {
    Snackbar,
    AppBar,
    NavigationDrawer
  },
  data: function() {
    return {
      transitionName: "slide-right"
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    }
  },
  beforeCreate: function() {
    if (localStorage.getItem("token") != null) {
      this.$store.commit("setLoggedIn", true);
    }
  }
};
</script>
