<template>
  <div>
    <v-container v-if="customer!= null && customer.delivery != null">
      <v-row>
        <v-chip class="ml-2 mr-2">
          <v-icon left color="accent">mdi-account</v-icon>Personal Information
        </v-chip>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Delivery name</span>
          <br />
          {{ customer.delivery.deliveryName }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Nick name</span>
          <br />
          {{ customer.delivery.nickName }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Son of</span>
          <br />
          {{ customer.delivery.sonOf }}
        </v-col>
      </v-row>
      <v-row>
        <v-chip class="ml-2 mr-2">
          <v-icon left color="accent">mdi-earth</v-icon>Address
        </v-chip>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Village</span>
          <br />
          {{ customer.delivery.village }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Post</span>
          <br />
          {{ customer.delivery.post }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Police station</span>
          <br />
          {{ customer.delivery.policeStation }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Dist</span>
          <br />
          {{ customer.delivery.dist }}
        </v-col>
      </v-row>
      <v-row>
        <v-chip class="ml-2 mr-2">
          <v-icon left color="accent">mdi-phone</v-icon>Phone numbers
        </v-chip>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Mobile</span>
          <br />
          {{ customer.delivery.mobile }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Whatsapp</span>
          <br />
          {{ customer.delivery.whatsapp }}
        </v-col>
      </v-row>
      <v-row>
        <v-chip class="ml-2 mr-2">
          <v-icon left color="accent">mdi-chevron-right</v-icon>Others
        </v-chip>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Challan</span>
          <br />
          {{ customer.delivery.challanNo }}
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-btn class="ml-2 mr-2" large color="accent" rounded v-on:click="updateEditDeliveryOpen">
          <v-icon left>edit</v-icon>Edit Delivery
        </v-btn>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row class="justify-center ma-2">No delivery added</v-row>
      <v-row class="justify-center ma-2">
        <v-btn color="primary" rounded v-on:click="updateEditDeliveryOpen">
          <v-icon left>mdi-plus</v-icon>Add delivery
        </v-btn>
      </v-row>
      <v-row class="justify-center ma-2">
        <v-dialog v-model="showCopyDialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="accent" rounded v-on="on">
              <v-icon left>mdi-content-copy</v-icon>Copy Booking to Delivery
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Copy Booking to Delivery</v-card-title>
            <v-card-text>
              <v-form v-model="valid" ref="form" v-on:submit.prevent="copyBookingToDelivery">
                <v-text-field
                  v-model="challan"
                  :rules="challanRules"
                  :counter="10"
                  label="Challan"
                  required
                ></v-text-field>
              </v-form>
              <v-row>
                <v-spacer></v-spacer>
                <v-btn color="red" text v-on:click="showCopyDialog = false">Cancel</v-btn>
                <v-btn type="submit" color="primary" text v-on:click="copyBookingToDelivery">Copy</v-btn>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ShowDelivery",
  props: ["customer"],
  data: function() {
    return {
      showCopyDialog: false,
      challan: "",
      valid: false,
      challanRules: [
        v => !!v || "Challan is required",
        v => v.length <= 10 || "Challan must be less than 10 characters"
      ]
    };
  },
  methods: {
    updateEditDeliveryOpen: function() {
      this.$emit("update:editDeliveryOpen", true);
    },
    copyBookingToDelivery: function() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$store
          .dispatch("editDelivery", {
            customerId: this.customer.customerId,
            payload: {
              deliveryName: this.customer.booking.bookingName,
              sonOf: this.customer.booking.sonOf,
              nickName: this.customer.booking.nickName,
              village: this.customer.booking.village,
              post: this.customer.booking.post,
              policeStation: this.customer.booking.policeStation,
              dist: this.customer.booking.dist,
              mobile: this.customer.booking.mobile,
              whatsapp: this.customer.booking.whatsapp,
              challanNo: this.challan
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
              this.showCopyDialog = false;
            }
          });
      }
    }
  }
};
</script>
