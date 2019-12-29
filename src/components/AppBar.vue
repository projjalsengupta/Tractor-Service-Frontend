<template>
  <v-app-bar color="primary" dark app>
    <v-toolbar-title>Tractor service</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text v-on:click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  data: function() {
    return {};
  },
  methods: {
    logout: function() {
      this.$store.commit("setLoggedIn", false);
      this.$router.push("/");
      this.$store.commit("setSnackbarText", {
        snackbarText: "Logout successful"
      });
      this.$store.commit("setSnackbarVisibility", {
        visible: true
      });
    }
  }
};
</script>
