<template>
  <v-container fluid>
    <v-row>
      <v-chip class="ml-4 mr-4">
        <v-icon left color="accent">mdi-chevron-right</v-icon>Actions
      </v-chip>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" xs="12" sm="4">
        <v-card>
          <router-link to="/create-account">
            <v-btn absolute dark fab bottom right color="green">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </router-link>
          <v-card-title class="green--text">Create</v-card-title>
          <v-card-subtitle>Create a new account</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="4">
        <v-card>
          <router-link to="/view-accounts">
            <v-btn absolute dark fab bottom right color="orange">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </router-link>
          <v-card-title class="orange--text">View</v-card-title>
          <v-card-subtitle>View all of the accounts</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="4">
        <v-card>
          <router-link to="/edit-account">
            <v-btn absolute dark fab bottom right color="red">
              <v-icon>mdi-file-edit</v-icon>
            </v-btn>
          </router-link>
          <v-card-title class="red--text">Edit</v-card-title>
          <v-card-subtitle>Edit an existing account</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-chip class="ml-4 mr-4">
        <v-icon left color="accent">mdi-chart-bar</v-icon>Statistics
      </v-chip>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: function() {
    return {};
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
