<template>
  <v-snackbar v-model="snackbar">
    {{ snackbarText }}
    <v-btn color="accent" text v-on:click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  computed: {
    snackbar: {
      get: function() {
        return this.$store.state.snackbar;
      },
      set: function() {
        this.$store.commit("setSnackbarVisibility", {
          visible: false
        });
      }
    },
    snackbarText() {
      return this.$store.state.snackbarText;
    }
  }
};
</script>
