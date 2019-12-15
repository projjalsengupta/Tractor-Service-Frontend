<template>
  <div v-if="customer!= null">
    <v-toolbar flat color="grey lighten-3">
      <v-btn icon v-on:click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Back</v-toolbar-title>
    </v-toolbar>
    <div v-if="!loading">
      <div v-if="bookingVisible">
        <ShowBooking v-if="!editBookingOpen" :customer.sync="customer" :editBookingOpen.sync="editBookingOpen" />
        <EditBooking v-else :customer.sync="customer" :editBookingOpen.sync="editBookingOpen" />
      </div>
      <div v-if="deliveryVisible">
        <ShowDelivery
          v-if="!editDeliveryOpen"
          :customer.sync="customer"
          :editDeliveryOpen.sync="editDeliveryOpen"
        />
        <EditDelivery v-else :customer.sync="customer" :editDeliveryOpen.sync="editDeliveryOpen" />
      </div>
      <div v-if="invoiceVisible">
        <ShowInvoice
          v-if="!editInvoiceOpen"
          :customer.sync="customer"
          :editInvoiceOpen.sync="editInvoiceOpen"
        />
        <EditInvoice v-else :customer.sync="customer" :editInvoiceOpen.sync="editInvoiceOpen" />
      </div>
      <div v-if="tractorDetailsVisible">
        <ShowTractorDetails
          v-if="!editTractorDetailsOpen"
          :customer.sync="customer"
          :editTractorDetailsOpen.sync="editTractorDetailsOpen"
        />
        <EditTractorDetails v-else :customer.sync="customer" :editTractorDetailsOpen.sync="editTractorDetailsOpen" />
      </div>
      <v-bottom-navigation app v-model="bottomNav" color="primary" grow>
        <v-btn value="booking" v-on:click="openBooking">
          <span>Booking</span>
          <v-icon>mdi-notebook</v-icon>
        </v-btn>
        <v-btn value="delivery" v-on:click="openDelivery">
          <span>Delivery</span>
          <v-icon>mdi-truck-delivery</v-icon>
        </v-btn>
        <v-btn value="invoice" v-on:click="openInvoice">
          <span>Invoice</span>
          <v-icon>mdi-newspaper</v-icon>
        </v-btn>
        <v-btn value="tractordetails" v-on:click="openTractorDetails">
          <span>Tractor details</span>
          <v-icon>mdi-tractor</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </div>
    <div class="text-center" v-else>
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
  </div>
</template>

<script>
import ShowBooking from "./booking/ShowBooking.vue";
import EditBooking from "./booking/EditBooking.vue";
import ShowDelivery from "./delivery/ShowDelivery.vue";
import EditDelivery from "./delivery/EditDelivery.vue";
import ShowInvoice from "./invoice/ShowInvoice.vue";
import EditInvoice from "./invoice/EditInvoice.vue";
import ShowTractorDetails from "./tractordetails/ShowTractorDetails.vue";
import EditTractorDetails from "./tractordetails/EditTractorDetails.vue";

export default {
  name: "EditCustomer",
  components: {
    EditBooking,
    ShowBooking,
    EditDelivery,
    ShowDelivery,
    EditInvoice,
    ShowInvoice,
    EditTractorDetails,
    ShowTractorDetails
  },
  data: function() {
    return {
      panel: 0,
      customer: null,
      loading: false,
      bookingVisible: true,
      deliveryVisible: false,
      invoiceVisible: false,
      tractorDetailsVisible: false,
      bottomNav: "booking",
      editBookingOpen: false,
      editDeliveryOpen: false,
      editInvoiceOpen: false,
      editTractorDetailsOpen: false
    };
  },
  methods: {
    openBooking: function() {
      this.bookingVisible = true;
      this.deliveryVisible = false;
      this.invoiceVisible = false;
      this.tractorDetailsVisible = false;
    },
    openDelivery: function() {
      this.bookingVisible = false;
      this.deliveryVisible = true;
      this.invoiceVisible = false;
      this.tractorDetailsVisible = false;
    },
    openInvoice: function() {
      this.bookingVisible = false;
      this.deliveryVisible = false;
      this.invoiceVisible = true;
      this.tractorDetailsVisible = false;
    },
    openTractorDetails: function() {
      this.bookingVisible = false;
      this.deliveryVisible = false;
      this.invoiceVisible = false;
      this.tractorDetailsVisible = true;
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
  },
  mounted: function() {
    this.loading = true;
    this.$store
      .dispatch("getCustomer", {
        customerId: this.$route.params.id
      })
      .then(response => {
        if (response.error) {
          this.$store.commit("setSnackbarText", {
            snackbarText: response.message
          });
          this.$store.commit("setSnackbarVisibility", {
            visible: true
          });
          this.$router.push("/view-accounts");
        } else {
          this.customer = response.body;
        }
        this.loading = false;
      });
  }
};
</script>
