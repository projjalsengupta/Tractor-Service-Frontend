<template>
  <div>
    <v-form
      v-if="customer!= null && customer.booking != null"
      v-model="valid"
      ref="form"
      v-on:submit.prevent="editBooking"
    >
      <v-container>
        <v-row>
          <v-chip class="ml-2 mr-2">
            <v-icon left color="accent">mdi-account</v-icon>Personal Information
          </v-chip>
        </v-row>
        <v-row>
          <v-col cols="12" md="4" class="align-center d-flex flex-row">
            <v-avatar
              v-if="(imgUrl != null) || ((customer != null) && (customer.image != null) && (customer.image.data != null))"
              slot="prepend-icon"
              color="accent"
              size="64px"
            >
              <img v-if="imgUrl != null" class="center-cropped" :src="imgUrl" />
              <img
                v-else
                class="center-cropped"
                :src="'data:image/*;base64,' + customer.image.data"
              />
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
              v-model="customer.booking.bookingName"
              :rules="bookingnameRules"
              :counter="30"
              :disabled="loading"
              label="Booking name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="customer.booking.nickName"
              :rules="nicknameRules"
              :counter="15"
              :disabled="loading"
              label="Nick name (optional)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="customer.booking.sonOf"
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
              v-model="customer.booking.village"
              :rules="villageRules"
              :counter="20"
              :disabled="loading"
              label="Village"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="customer.booking.post"
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
              v-model="customer.booking.policeStation"
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
              v-model="customer.booking.dist"
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
              v-model="customer.booking.mobile"
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
              v-model="customer.booking.whatsapp"
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
              v-model="customer.booking.challanNo"
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
            class="ml-2 mr-2 white--text"
            large
            color="red"
            rounded
            v-on:click="close"
            :loading="loading"
            :disabled="loading"
          >
            <v-icon left class="white--text">close</v-icon>Cancel
          </v-btn>
          <v-btn
            type="submit"
            class="ml-2 mr-2"
            large
            color="accent"
            rounded
            v-on:click="editBooking"
            :loading="loading"
            :disabled="loading"
          >
            <v-icon left>save</v-icon>Save
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
  name: "EditBooking",
  props: ["customer"],
  data: function() {
    return {
      imgUrl: null,
      photo: null,
      photoBlob: null,
      valid: false,
      loading: false,
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
    editPhoto: function() {
      if (this.photo != null) {
        this.$store
          .dispatch("editPhoto", {
            customerId: this.customer.customerId,
            file: this.photoBlob
          })
          .then(response => {
            if (response.error) {
              this.$store.commit("setSnackbarText", {
                snackbarText: "Booking edited. Error edited photo. Try again"
              });
              this.$store.commit("setSnackbarVisibility", {
                visible: true
              });
            } else {
              this.$store.commit("setSnackbarText", {
                snackbarText: "Booking edited. Photo edited."
              });
              this.$store.commit("setSnackbarVisibility", {
                visible: true
              });
              this.$emit("update:customer", response.body);
              this.$emit("update:editBookingOpen", false);
            }
            this.loading = false;
          });
      } else {
        this.loading = false;
        this.$store.commit("setSnackbarText", {
          snackbarText: "Booking edited"
        });
        this.$store.commit("setSnackbarVisibility", {
          visible: true
        });
        this.$emit("update:editBookingOpen", false);
      }
    },
    editBooking: function() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$store
          .dispatch("editBooking", {
            customerId: this.customer.customerId,
            payload: {
              bookingName: this.customer.booking.bookingName,
              sonOf: this.customer.booking.sonOf,
              nickName: this.customer.booking.nickName,
              village: this.customer.booking.village,
              post: this.customer.booking.post,
              policeStation: this.customer.booking.policeStation,
              dist: this.customer.booking.dist,
              mobile: this.customer.booking.mobile,
              whatsapp: this.customer.booking.whatsapp,
              challanNo: this.customer.booking.challanNo
            }
          })
          .then(response => {
            if (response.error) {
              this.$store.commit("setSnackbarText", {
                snackbarText: "Error editing booking"
              });
              this.$store.commit("setSnackbarVisibility", {
                visible: true
              });
            } else {
              this.$emit("update:customer", response.body);
            }
            this.editPhoto();
          });
      }
    },
    close: function() {
      this.$emit("update:editBookingOpen", false);
    }
  }
};
</script>
