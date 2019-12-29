<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card raised>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Username"
                name="username"
                prepend-icon="person"
                type="text"
                v-model="username"
                v-on:keyup.enter="login"
              />
              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                type="password"
                v-on:keyup.enter="login"
                v-model="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="accent" v-on:click="login" :loading="loading" :disabled="loading">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: function() {
    return {
      username: "",
      password: "",
      loading: false
    };
  },
  methods: {
    login: function() {
      this.loading = true;
      if (this.username === "" && this.password === "") {
        this.$store.commit("setSnackbarText", {
          snackbarText: "Username and password cannot be empty"
        });
        this.$store.commit("setSnackbarVisibility", {
          visible: true
        });
        this.loading = false;
      } else if (this.username === "") {
        this.$store.commit("setSnackbarText", {
          snackbarText: "Username cannot be empty"
        });
        this.$store.commit("setSnackbarVisibility", {
          visible: true
        });
        this.loading = false;
      } else if (this.password === "") {
        this.$store.commit("setSnackbarText", {
          snackbarText: "Password cannot be empty"
        });
        this.$store.commit("setSnackbarVisibility", {
          visible: true
        });
        this.loading = false;
      } else {
        this.$store
          .dispatch("login", {
            username: this.username,
            password: this.password
          })
          .then(response => {
            this.$store.commit("setSnackbarText", {
              snackbarText: response.message
            });
            this.$store.commit("setSnackbarVisibility", {
              visible: true
            });
            this.loading = false;
            if (!response.error) {
              this.$router.push("/home");
            }
          });
      }
    }
  },
  mounted: function() {
    if (localStorage.getItem("token") != null) {
      this.$router.push("/home");
    }
  }
};
</script>
