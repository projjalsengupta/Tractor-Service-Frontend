<template>
  <div>
    <v-container v-if="customer!= null && customer.invoice != null">
      <v-row>
        <v-chip class="ml-2 mr-2">
          <v-icon left color="accent">mdi-account</v-icon>Personal Information
        </v-chip>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Invoice name</span>
          <br />
          {{ customer.invoice.invoiceName }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Nick name</span>
          <br />
          {{ customer.invoice.nickName }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Son of</span>
          <br />
          {{ customer.invoice.sonOf }}
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
          {{ customer.invoice.village }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Post</span>
          <br />
          {{ customer.invoice.post }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Police station</span>
          <br />
          {{ customer.invoice.policeStation }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Dist</span>
          <br />
          {{ customer.invoice.dist }}
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
          {{ customer.invoice.mobile }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Whatsapp</span>
          <br />
          {{ customer.invoice.whatsapp }}
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
          {{ customer.invoice.challanNo }}
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-btn class="ml-2 mr-2" large color="accent" rounded v-on:click="updateEditInvoiceOpen">
          <v-icon left>edit</v-icon>Edit
        </v-btn>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row class="justify-center ma-2">No invoice added</v-row>
      <v-row class="justify-center ma-2">
        <v-btn color="primary" rounded v-on:click="updateEditInvoiceOpen">
          <v-icon left>mdi-plus</v-icon>Add invoice
        </v-btn>
      </v-row>
      <v-row class="justify-center ma-2">
        <v-dialog v-model="showCopyDialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="accent" rounded v-on="on">
              <v-icon left>mdi-content-copy</v-icon>Copy Booking to Invoice
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Copy Booking to Invoice</v-card-title>
            <v-card-text>
              <v-form v-model="valid" ref="form" v-on:submit.prevent="copyBookingToInvoice">
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
                <v-btn type="submit" color="primary" text v-on:click="copyBookingToInvoice">Copy</v-btn>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row class="justify-center ma-2">
        <v-dialog v-model="showCopyDialog2" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="accent" rounded v-on="on">
              <v-icon left>mdi-content-copy</v-icon>Copy Delivery to Invoice
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Copy Delivery to Invoice</v-card-title>
            <v-card-text>
              <v-form v-model="valid2" ref="form2" v-on:submit.prevent="copyDeliveryToInvoice">
                <v-text-field
                  v-model="challan2"
                  :rules="challanRules"
                  :counter="10"
                  label="Challan"
                  required
                ></v-text-field>
              </v-form>
              <v-row>
                <v-spacer></v-spacer>
                <v-btn color="red" text v-on:click="showCopyDialog2 = false">Cancel</v-btn>
                <v-btn type="submit" color="primary" text v-on:click="copyDeliveryToInvoice">Copy</v-btn>
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
  name: "ShowInvoice",
  props: ["customer"],
  data: function() {
    return {
      showCopyDialog: false,
      showCopyDialog2: false,
      challan: "",
      challan2: "",
      valid: false,
      valid2: false,
      challanRules: [
        v => !!v || "Challan is required",
        v => v.length <= 10 || "Challan must be less than 10 characters"
      ]
    };
  },
  methods: {
    updateEditInvoiceOpen: function() {
      this.$emit("update:editInvoiceOpen", true);
    },
    copyBookingToInvoice: function() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$store
          .dispatch("editInvoice", {
            customerId: this.customer.customerId,
            payload: {
              invoiceName: this.customer.booking.bookingName,
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
              this.showCopyDialog = false;
            }
          });
      }
    },
    copyDeliveryToInvoice: function() {
      this.$refs.form2.validate();
      if (this.valid2) {
        this.$store
          .dispatch("editInvoice", {
            customerId: this.customer.customerId,
            payload: {
              invoiceName: this.customer.delivery.bookingName,
              sonOf: this.customer.delivery.sonOf,
              nickName: this.customer.delivery.nickName,
              village: this.customer.delivery.village,
              post: this.customer.delivery.post,
              policeStation: this.customer.delivery.policeStation,
              dist: this.customer.delivery.dist,
              mobile: this.customer.delivery.mobile,
              whatsapp: this.customer.delivery.whatsapp,
              challanNo: this.challan2
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
              this.showCopyDialog2 = false;
            }
          });
      }
    }
  }
};
</script>
