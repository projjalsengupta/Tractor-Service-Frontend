<template>
  <div>
    <v-toolbar flat color="grey lighten-3">
      <v-btn icon v-on:click="goHome">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Home</v-toolbar-title>
    </v-toolbar>
    <v-form v-model="valid" ref="form" v-on:submit.prevent="createAccountWithBooking">
      <v-container>
        <v-row>
          <v-chip class="ml-2 mr-2">
            <v-icon left color="accent">mdi-account</v-icon>Personal Information
          </v-chip>
        </v-row>
        <v-row>
          <v-col cols="12" md="4" class="align-center d-flex flex-row">
            <v-avatar v-if="imgUrl != null" slot="prepend-icon" color="accent" size="64px">
              <img class="center-cropped" :src="imgUrl" />
            </v-avatar>
            <v-icon v-else>mdi-camera</v-icon>
            <v-file-input
              v-on:change="photoChanged"
              v-model="photo"
              class="ml-2"
              :prepend-icon="null"
              accept="image/png, image/jpeg, image/bmp"
              label="Photo"
            ></v-file-input>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="bookingname"
              :rules="bookingnameRules"
              :counter="30"
              :disabled="loading"
              label="Booking name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="nickname"
              :rules="nicknameRules"
              :counter="15"
              :disabled="loading"
              label="Nick name (optional)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="sonof"
              :disabled="loading"
              :rules="sonofRules"
              :counter="30"
              label="Son of"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-chip class="ml-2 mr-2">
            <v-icon left color="accent">mdi-earth</v-icon>Address
          </v-chip>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="village"
              :rules="villageRules"
              :counter="20"
              :disabled="loading"
              label="Village"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="post"
              @keydown.prevent.ctrl.enter="copyVillageToPost"
              :disabled="loading"
              :rules="postRules"
              :counter="20"
              label="Post"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="policestation"
              @keydown.prevent.ctrl.enter="copyPostToPoliceStation"
              :rules="policestationRules"
              :counter="20"
              label="Police station"
              :disabled="loading"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="dist"
              :disabled="loading"
              :rules="distRules"
              :counter="20"
              label="District"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-chip class="ml-2 mr-2">
            <v-icon left color="accent">mdi-phone</v-icon>Phone numbers
          </v-chip>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="mobile"
              :rules="mobileRules"
              :counter="10"
              :disabled="loading"
              type="number"
              label="Mobile number"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="whatsapp"
              :rules="whatsappRules"
              :counter="10"
              type="number"
              @keydown.prevent.ctrl.enter="copyMobileToWhatsapp"
              :disabled="loading"
              label="Whatsapp number (optional)"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-chip class="ml-2 mr-2">
            <v-icon left color="accent">mdi-chevron-right</v-icon>Others
          </v-chip>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="challan"
              :disabled="loading"
              :rules="challanRules"
              :counter="10"
              label="Challan number"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer />
          <v-btn
            type="submit"
            class="ml-2 mr-2"
            large
            color="accent"
            rounded
            v-on:click="createAccountWithBooking"
            :loading="loading"
            :disabled="loading"
          >
            <v-icon left>mdi-plus</v-icon>Create booking
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<style scoped>
.center-cropped {
  object-fit: cover;
  object-position: center;
}
</style>

<script>
const Compress = require("compress.js");
const compress = new Compress();

export default {
  name: "CreateAccount",
  data: function() {
    return {
      imgUrl: null,
      photo: null,
      photoBlob: null,
      customerId: null,
      valid: false,
      loading: false,
      bookingname: "",
      nickname: "",
      sonof: "",
      village: "",
      post: "",
      policestation: "",
      dist: "",
      mobile: "",
      whatsapp: "",
      challan: "",
      tractorModelNo: "",
      tractorEngineNo: "",
      tractorChasisNo: "",
      bookingnameRules: [
        v => !!v || "Booking name is required",
        v => v.length <= 30 || "Booking name must be less than 30 characters"
      ],
      nicknameRules: [
        v => v.length <= 15 || "Nick name must be less than 15 characters"
      ],
      sonofRules: [
        v => !!v || "Son of field is required",
        v => v.length <= 30 || "Son of field must be less than 30 characters"
      ],
      tractorModelNoRules: [
        v => !!v || "Tractor model number of field is required",
        v => v.length <= 30 || "Tractor model number of field must be less than 30 characters"
      ],
      tractorEngineNoRules: [
        v => !!v || "Tractor engine number of field is required",
        v => v.length <= 30 || "Tractor engine number of field must be less than 30 characters"
      ],
      tractorChasisNoRules: [
        v => !!v || "Tractor chasis number of field is required",
        v => v.length <= 30 || "Tractor chasis number of field must be less than 30 characters"
      ],
      villageRules: [
        v => !!v || "Village is required",
        v => v.length <= 20 || "Village must be less than 20 characters"
      ],
      postRules: [
        v => !!v || "Post is required",
        v => v.length <= 20 || "Post must be less than 20 characters"
      ],
      policestationRules: [
        v => !!v || "Police station is required",
        v => v.length <= 20 || "Police station must be less than 20 characters"
      ],
      distRules: [
        v => !!v || "District is required",
        v => v.length <= 20 || "District must be less than 20 characters"
      ],
      mobileRules: [
        v => !!v || "Mobile is required",
        v => v.length == 10 || "Mobile number should be of 10 digits"
      ],
      whatsappRules: [
        v =>
          v.length == 10 ||
          v.length == 0 ||
          "Whatsapp number should be of 10 digits"
      ],
      challanRules: [
        v => !!v || "Challan is required",
        v => v.length <= 10 || "Challan must be less than 10 characters"
      ]
    };
  },
  methods: {
    goHome: function() {
      this.$router.push("/home");
    },
    copyMobileToWhatsapp: function() {
      this.whatsapp = this.mobile;
    },
    copyVillageToPost: function() {
      this.post = this.village;
    },
    copyPostToPoliceStation: function() {
      this.policestation = this.post;
    },
    photoChanged: function() {
      if (this.photo != null) {
        this.imgUrl = URL.createObjectURL(this.photo);
        this.loading = true;
        const files = [this.photo];
        compress
          .compress(files, {
            size: 0.05,
            quality: 1,
            maxWidth: 250,
            maxHeight: 250,
            resize: true
          })
          .then(data => {
            const img = data[0];
            const base64str = img.data;
            const imgExt = img.ext;
            const file = Compress.convertBase64ToFile(base64str, imgExt);
            this.photoBlob = file;
            this.loading = false;
          });
      } else {
        this.imgUrl = null;
      }
    },
    addPhoto: function() {
      if (this.photo != null) {
        this.$store
          .dispatch("editPhoto", {
            customerId: this.customerId,
            file: this.photoBlob
          })
          .then(response => {
            if (response.error) {
              this.$store.commit("setSnackbarText", {
                snackbarText:
                  "Account created. Booking added. Error uploading photo. Try again"
              });
              this.$store.commit("setSnackbarVisibility", {
                visible: true
              });
            } else {
              this.$store.commit("setSnackbarText", {
                snackbarText: "Account created. Booking added. Photo uploaded."
              });
              this.$store.commit("setSnackbarVisibility", {
                visible: true
              });
              this.$refs.form.reset();
              this.customerId = null;
              this.photo = null;
              this.bookingname = "";
              this.nickname = "";
              this.sonof = "";
              this.village = "";
              this.post = "";
              this.policestation = "";
              this.dist = "";
              this.mobile = "";
              this.whatsapp = "";
              this.challan = "";
            }
            this.loading = false;
          });
      } else {
        this.loading = false;
        this.$store.commit("setSnackbarText", {
          snackbarText: "Account created. Booking added."
        });
        this.$store.commit("setSnackbarVisibility", {
          visible: true
        });
        this.$refs.form.reset();
        this.customerId = null;
        this.photo = null;
        this.bookingname = "";
        this.nickname = "";
        this.sonof = "";
        this.village = "";
        this.post = "";
        this.policestation = "";
        this.dist = "";
        this.mobile = "";
        this.whatsapp = "";
        this.challan = "";
      }
    },
    addBooking: function() {
      this.$store
        .dispatch("editBooking", {
          customerId: this.customerId,
          payload: {
            bookingName: this.bookingname,
            sonOf: this.sonof,
            nickName: this.nickname,
            village: this.village,
            post: this.post,
            policeStation: this.policestation,
            dist: this.dist,
            mobile: this.mobile,
            whatsapp: this.whatsapp,
            challanNo: this.challan,
          }
        })
        .then(response => {
          if (response.error) {
            this.$store.commit("setSnackbarText", {
              snackbarText: "Error creating booking"
            });
            this.$store.commit("setSnackbarVisibility", {
              visible: true
            });
          }
          this.addPhoto();
        });
    },
    createAccountWithBooking: function() {
      this.$refs.form.validate();
      if (this.valid) {
        this.loading = true;
        if (this.customerId == null) {
          this.$store.dispatch("createAccount").then(response => {
            if (response.error) {
              this.$store.commit("setSnackbarText", {
                snackbarText: response.message
              });
              this.$store.commit("setSnackbarVisibility", {
                visible: true
              });
              this.customerId = null;
            } else {
              this.customerId = response.customerId;
              this.addBooking();
            }
          });
        } else {
          this.addBooking();
        }
      }
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
