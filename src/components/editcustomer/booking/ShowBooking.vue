<template>
  <div>
    <v-container v-if="customer!= null && customer.booking != null">
      <v-row>
        <v-chip class="ml-2 mr-2">
          <v-icon left color="accent">mdi-account</v-icon>Personal Information
        </v-chip>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-row>
            <v-avatar class="ma-2" slot="prepend-icon" color="accent" size="40px">
              <img
                v-if="customer != null && customer.image != null && customer.image.data != null"
                class="center-cropped"
                :src="'data:image/*;base64,' + customer.image.data"
              />
              <v-icon v-else size="40px" color="white">mdi-account</v-icon>
            </v-avatar>
            <div>
              <span class="caption blue--text">Booking name</span>
              <br />
              {{ customer.booking.bookingName }}
            </div>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Nick name</span>
          <br />
          {{ customer.booking.nickName }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Son of</span>
          <br />
          {{ customer.booking.sonOf }}
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
          {{ customer.booking.village }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Post</span>
          <br />
          {{ customer.booking.post }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Police station</span>
          <br />
          {{ customer.booking.policeStation }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Dist</span>
          <br />
          {{ customer.booking.dist }}
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
          {{ customer.booking.mobile }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Whatsapp</span>
          <br />
          {{ customer.booking.whatsapp }}
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
          {{ customer.booking.challanNo }}
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-btn class="ml-2 mr-2" large color="accent" rounded v-on:click="updateEditBookingOpen">
          <v-icon left>edit</v-icon>Edit
        </v-btn>
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
  name: "ShowBooking",
  props: ["customer", "editBookingOpen"],
  methods: {
    updateEditBookingOpen() {
      this.$emit("update:editBookingOpen", true);
    }
  }
};
</script>
