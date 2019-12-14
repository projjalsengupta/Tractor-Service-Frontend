<template>
  <div>
    <v-toolbar flat color="grey lighten-3">
      <v-btn icon v-on:click="goHome">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Home</v-toolbar-title>
    </v-toolbar>
      <v-container>
        Hello
      </v-container>
  </div>
</template>

<script>
export default {
  name: "EditAccount",
  data: function() {
    return {}
  },
  methods: {
    goHome: function() {
      this.$router.push("/home");
    }
  },
  beforeCreate: function() {
    if (!this.$store.state.loggedIn) {
      this.$store.commit("setSnackbarText", {
        snackbarText: "Log in first"
      });
      this.$store.commit("setSnackbarVisibility", {
        visible: true
      });
      this.$router.push("/");
    }
  }
};
</script>
