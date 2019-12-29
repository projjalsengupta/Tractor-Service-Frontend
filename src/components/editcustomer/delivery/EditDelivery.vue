<template>
  <div v-if="customer!= null">
    <v-form v-model="valid" ref="form" v-on:submit.prevent="editDelivery">
      <v-container>
        <v-row>
          <v-chip class="ml-2 mr-2">
            <v-icon left color="accent">mdi-account</v-icon>Personal Information
          </v-chip>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="copyDelivery.deliveryName"
              :rules="deliverynameRules"
              :value="'ge'"
              :counter="30"
              :disabled="loading"
              label="Delivery name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="copyDelivery.nickName"
              :rules="nicknameRules"
              :counter="15"
              :disabled="loading"
              label="Nick name (optional)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="copyDelivery.sonOf"
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
              v-model="copyDelivery.village"
              :rules="villageRules"
              :counter="20"
              :disabled="loading"
              label="Village"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="copyDelivery.post"
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
              v-model="copyDelivery.policeStation"
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
              v-model="copyDelivery.dist"
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
              v-model="copyDelivery.mobile"
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
              v-model="copyDelivery.whatsapp"
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
              v-model="copyDelivery.challanNo"
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
            v-on:click="editDelivery"
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

<script>
export default {
  name: "EditDelivery",
  props: ["customer"],
  data: function() {
    return {
      copyDelivery: {
        deliveryName: "",
        nickName: "",
        sonOf: "",
        village: "",
        post: "",
        policeStation: "",
        dist: "",
        mobile: "",
        whatsapp: "",
        challanNo: ""
      },
      valid: false,
      loading: false,
      deliverynameRules: [
        v => !!v || "Delivery name is required",
        v => v.length <= 30 || "Delivery name must be less than 30 characters"
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
  created: function() {
    if (this.customer.delivery != null) {
      this.copyDelivery = this.customer.delivery;
    }
  },
  methods: {
    copyMobileToWhatsapp: function() {
      this.copyDelivery.whatsapp = this.copyDelivery.mobile;
    },
    copyVillageToPost: function() {
      this.copyDelivery.post = this.copyDelivery.village;
    },
    copyPostToPoliceStation: function() {
      this.copyDelivery.policeStation = this.copyDelivery.post;
    },
    editDelivery: function() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$store
          .dispatch("editDelivery", {
            customerId: this.customer.customerId,
            payload: {
              deliveryName: this.copyDelivery.deliveryName,
              sonOf: this.copyDelivery.sonOf,
              nickName: this.copyDelivery.nickName,
              village: this.copyDelivery.village,
              post: this.copyDelivery.post,
              policeStation: this.copyDelivery.policeStation,
              dist: this.copyDelivery.dist,
              mobile: this.copyDelivery.mobile,
              whatsapp: this.copyDelivery.whatsapp,
              challanNo: this.copyDelivery.challanNo
            }
          })
          .then(response => {
            if (response.error) {
              this.$store.commit("setSnackbarText", {
                snackbarText: "Error editing delivery"
              });
              this.$store.commit("setSnackbarVisibility", {
                visible: true
              });
            } else {
              this.$store.commit("setSnackbarText", {
                snackbarText: "Successfully edited delivery"
              });
              this.$store.commit("setSnackbarVisibility", {
                visible: true
              });
              this.$emit("update:customer", response.body);
              this.$emit("update:editDeliveryOpen", false);
            }
          });
      }
    },
    close: function() {
      this.$emit("update:editDeliveryOpen", false);
    }
  }
};
</script>
