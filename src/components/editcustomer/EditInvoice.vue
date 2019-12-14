<template>
  <div v-if="customer!= null">
    <v-form v-model="valid" ref="form" v-on:submit.prevent="editInvoice">
      <v-container>
        <v-row>
          <v-chip class="ml-2 mr-2">
            <v-icon left color="accent">mdi-account</v-icon>Personal Information
          </v-chip>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="copyInvoice.invoiceName"
              :rules="invoicenameRules"
              :value="'ge'"
              :counter="30"
              :disabled="loading"
              label="Invoice name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="copyInvoice.nickName"
              :rules="nicknameRules"
              :counter="15"
              :disabled="loading"
              label="Nick name (optional)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="copyInvoice.sonOf"
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
              v-model="copyInvoice.village"
              :rules="villageRules"
              :counter="20"
              :disabled="loading"
              label="Village"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="copyInvoice.post"
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
              v-model="copyInvoice.policeStation"
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
              v-model="copyInvoice.dist"
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
              v-model="copyInvoice.mobile"
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
              v-model="copyInvoice.whatsapp"
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
              v-model="copyInvoice.challanNo"
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
            v-on:click="editInvoice"
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
  name: "EditInvoice",
  props: ["customer"],
  data: function() {
    return {
      copyInvoice: {
        invoiceName: "",
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
      invoicenameRules: [
        v => !!v || "Invoice name is required",
        v => v.length <= 30 || "Invoice name must be less than 30 characters"
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
    if (this.customer.invoice != null) {
      this.copyInvoice = this.customer.invoice;
    }
  },
  methods: {
    copyMobileToWhatsapp: function() {
      this.copyInvoice.whatsapp = this.copyInvoice.mobile;
    },
    copyVillageToPost: function() {
      this.copyInvoice.post = this.copyInvoice.village;
    },
    copyPostToPoliceStation: function() {
      this.copyInvoice.policeStation = this.copyInvoice.post;
    },
    editInvoice: function() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$store
          .dispatch("editInvoice", {
            customerId: this.customer.customerId,
            payload: {
              invoiceName: this.copyInvoice.invoiceName,
              sonOf: this.copyInvoice.sonOf,
              nickName: this.copyInvoice.nickName,
              village: this.copyInvoice.village,
              post: this.copyInvoice.post,
              policeStation: this.copyInvoice.policeStation,
              dist: this.copyInvoice.dist,
              mobile: this.copyInvoice.mobile,
              whatsapp: this.copyInvoice.whatsapp,
              challanNo: this.copyInvoice.challanNo
            }
          })
          .then(response => {
            if (response.error) {
              this.$store.commit("setSnackbarText", {
                snackbarText: "Error editing invoice"
              });
              this.$store.commit("setSnackbarVisibility", {
                visible: true
              });
            } else {
              this.$store.commit("setSnackbarText", {
                snackbarText: "Successfully edited invoice"
              });
              this.$store.commit("setSnackbarVisibility", {
                visible: true
              });
              this.$emit("update:customer", response.body);
              this.$emit("update:editInvoiceOpen", false);
            }
          });
      }
    },
    close: function() {
      this.$emit("update:editInvoiceOpen", false);
    }
  }
};
</script>
