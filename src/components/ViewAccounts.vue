<template>
  <div>
    <v-toolbar flat color="grey lighten-3">
      <v-btn icon v-on:click="goHome">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Home</v-toolbar-title>
    </v-toolbar>
    <v-container fill-height fluid>
      <v-row no-gutters class="mb-n4">
        <v-col cols="12">
          <v-select
            v-model="showBy"
            :items="showByItems"
            label="Show records by"
            v-on:change="changeShowBy"
          ></v-select>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col v-if="filterVisible" cols="12" md="3">
          <v-card outlined>
            <v-toolbar color="accent" dark flat>
              <v-icon left>mdi-filter</v-icon>
              <v-toolbar-title>Filter</v-toolbar-title>
              <v-spacer />
              <v-btn v-on:click="filterVisible = !filterVisible; clearFilter();" fab text small>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-form class="mt-4 ml-4 mr-4" v-on:submit.prevent="applyFilter">
              <v-text-field v-model="name" :label="nameFieldLabel" outlined dense></v-text-field>
              <v-text-field v-model="nickName" label="Nick name" outlined dense></v-text-field>
              <v-text-field v-model="sonOf" label="Son of" outlined dense></v-text-field>
              <v-text-field v-model="village" label="Village" outlined dense></v-text-field>
              <v-text-field v-model="challan" label="Challan no." outlined dense></v-text-field>
              <v-text-field v-model="mobile" type="number" label="Mobile" outlined dense></v-text-field>
              <v-text-field v-model="whatsapp" type="number" label="Whatsapp" outlined dense></v-text-field>
              <v-row no-gutters class="justify-end">
                <v-btn
                  class="mt-n3 mb-4 white--text"
                  fab
                  small
                  color="red"
                  v-on:click="clearFilter"
                >
                  <v-icon color="white">delete</v-icon>
                </v-btn>
                <v-btn
                  type="submit"
                  class="mt-n3 ml-4 mr-4 mb-4"
                  fab
                  small
                  color="primary"
                  v-on:click="applyFilter"
                >
                  <v-icon>done</v-icon>
                </v-btn>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined>
            <v-toolbar color="accent" dark flat>
              <v-icon left>mdi-file-cabinet</v-icon>
              <v-toolbar-title>Records</v-toolbar-title>
              <v-spacer />
              <v-btn v-if="!filterVisible" v-on:click="filterVisible = true" fab text small>
                <v-icon>search</v-icon>
              </v-btn>
            </v-toolbar>
            <v-data-table
              :headers="headers"
              :items="items"
              :loading="loading"
              item-key="createdAt"
              :options.sync="options"
              :footer-props="footerProps"
              :server-items-length="itemsLength"
            >
              <template v-slot:item.image.data="{ item }">
                <v-avatar slot="prepend-icon" class="ma-2" color="accent" size="40px">
                  <img
                    v-if="item.image != null"
                    class="center-cropped"
                    :src="'data:image/*;base64,' + item.image.data"
                  />
                  <v-icon v-else size="40px" color="white">mdi-account</v-icon>
                </v-avatar>
              </template>
              <template
                v-slot:item.createdAtBooking="{ item }"
              >{{ convertTimestampToDate(item.booking.createdAt) }}</template>
              <template
                v-slot:item.createdAtDelivery="{ item }"
              >{{ convertTimestampToDate(item.delivery.createdAt) }}</template>
              <template
                v-slot:item.createdAtInvoice="{ item }"
              >{{ convertTimestampToDate(item.invoice.createdAt) }}</template>
              <template
                v-slot:item.bookingmobilewhatsapp="{ item }"
              >{{ item.booking.mobile + " / " + item.booking.whatsapp }}</template>
              <template
                v-slot:item.deliverymobilewhatsapp="{ item }"
              >{{ item.delivery.mobile + " / " + item.delivery.whatsapp }}</template>
              <template
                v-slot:item.invoicemobilewhatsapp="{ item }"
              >{{ item.invoice.mobile + " / " + item.invoice.whatsapp }}</template>
              <template v-slot:item.edit="{ item }">
                <v-btn fab small color="primary" v-on:click="expandCustomer(item.customerId)">
                  <v-icon>mdi-arrow-expand</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.center-cropped {
  object-fit: cover;
  object-position: center;
}
</style>

<script>
export default {
  name: "ViewAccounts",
  data: function() {
    return {
      name: "",
      nickName: "",
      sonOf: "",
      village: "",
      mobile: "",
      whatsapp: "",
      challan: "",
      filterVisible: false,
      loading: false,
      options: {},
      pageNo: 0,
      pageSize: 10,
      sortBy: "_id",
      sortOrder: "desc",
      itemsLength: 0,
      showBy: "Booking",
      showByItems: ["Booking", "Delivery", "Invoice"],
      headers: [],
      headersBooking: [
        { text: "Photo", value: "image.data", sortable: false },
        { text: "Name", value: "booking.bookingName" },
        { text: "Nick name", value: "booking.nickName" },
        { text: "Son of", value: "booking.sonOf" },
        { text: "Vill", value: "booking.village" },
        { text: "Post", value: "booking.post" },
        { text: "Police station", value: "booking.policeStation" },
        {
          text: "Mobile / Whatsapp",
          value: "bookingmobilewhatsapp",
          sortable: false
        },
        { text: "Challan", value: "booking.challanNo" },
        { text: "Date", value: "createdAtBooking" },
        { text: "Expand", value: "edit", sortable: false }
      ],
      headersDelivery: [
        { text: "Name", value: "delivery.deliveryName" },
        { text: "Nick name", value: "delivery.nickName" },
        { text: "Son of", value: "delivery.sonOf" },
        { text: "Vill", value: "delivery.village" },
        { text: "Post", value: "delivery.post" },
        { text: "Police station", value: "delivery.policeStation" },
        {
          text: "Mobile / Whatsapp",
          value: "deliverymobilewhatsapp",
          sortable: false
        },
        { text: "Challan", value: "delivery.challanNo" },
        { text: "Date", value: "createdAtDelivery" },
        { text: "Expand", value: "edit", sortable: false }
      ],
      headersInvoice: [
        { text: "Name", value: "invoice.invoiceName" },
        { text: "Nick name", value: "invoice.nickName" },
        { text: "Son of", value: "invoice.sonOf" },
        { text: "Vill", value: "invoice.village" },
        { text: "Post", value: "invoice.post" },
        { text: "Police station", value: "invoice.policeStation" },
        {
          text: "Mobile / Whatsapp",
          value: "invoicemobilewhatsapp",
          sortable: false
        },
        { text: "Challan", value: "invoice.challanNo" },
        { text: "Date", value: "createdAtInvoice" },
        { text: "Expand", value: "edit", sortable: false }
      ],
      items: [],
      footerProps: {
        showFirstLastPage: true,
        "items-per-page-options": [5, 10, 20, 50, 100],
        firstIcon: "mdi-page-first",
        lastIcon: "mdi-page-last"
      }
    };
  },
  computed: {
    nameFieldLabel() {
      if (this.showBy == "Booking") {
        return "Booking name";
      } else if (this.showBy == "Delivery") {
        return "Delivery name";
      } else {
        return "Invoice name";
      }
    }
  },
  watch: {
    options: {
      handler() {
        this.pageNo = this.options.page - 1;
        this.pageSize = this.options.itemsPerPage;
        if (this.options.sortBy.length == 0) {
          this.sortBy = "_id";
        } else {
          this.sortBy = this.options.sortBy[0];
        }
        if (this.options.sortDesc.length > 0) {
          this.sortOrder = this.options.sortDesc[0] ? "asc" : "desc";
        } else {
          this.sortOrder = "desc";
        }
        this.loadData();
      }
    }
  },
  methods: {
    changeShowBy: function() {
      if (this.showBy == "Booking") {
        this.headers = this.headersBooking;
      } else if (this.showBy == "Delivery") {
        this.headers = this.headersDelivery;
      } else {
        this.headers = this.headersInvoice;
      }
      this.clearFilter();
      this.loadData();
    },
    goHome: function() {
      this.$router.push("/home");
    },
    expandCustomer: function(customerId) {
      this.$router.push("/customer/" + customerId);
    },
    convertTimestampToDate: function(timestamp) {
      var date = new Date(timestamp);
      return (
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " "
      );
    },
    clearFilter: function() {
      this.name = "";
      this.nickName = "";
      this.sonOf = "";
      this.village = "";
      this.challan = "";
      this.mobile = "";
      this.whatsapp = "";
      this.pageNo = 0;
      this.options.page = 1;
      this.loadData();
    },
    applyFilter: function() {
      this.pageNo = 0;
      this.options.page = 1;
      this.loadData();
    },
    loadData: function() {
      this.loading = true;
      this.items = [];
      this.$store
        .dispatch("getAllCustomers", {
          showBy: this.showBy,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          sortBy: this.sortBy,
          sortOrder: this.sortOrder,
          name: this.name,
          nickName: this.nickName,
          sonOf: this.sonOf,
          village: this.village,
          challanNo: this.challan,
          mobile: this.mobile,
          whatsapp: this.whatsapp
        })
        .then(response => {
          this.loading = false;
          this.itemsLength = response.body.totalElements;
          this.items = response.body.content;
        });
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
    this.headers = this.headersBooking;
    this.loadData();
  }
};
</script>
