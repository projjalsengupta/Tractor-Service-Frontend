<template>
  <div>
    <v-container v-if="customer!= null && customer.tractorDetails != null">
      <v-row>
        <v-chip class="ml-2 mr-2">
          <v-icon left color="accent">mdi-tractor</v-icon>Tractor details
        </v-chip>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Tractor model number</span>
          <br />
          {{ customer.tractorDetails.tractorModelNo }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Tractor engine number</span>
          <br />
          {{ customer.tractorDetails.tractorEngineNo }}
        </v-col>
        <v-col cols="12" md="4">
          <span class="caption blue--text">Tractor chassis number</span>
          <br />
          {{ customer.tractorDetails.tractorChassisNo }}
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-btn class="ml-2 mr-2" large color="accent" rounded v-on:click="updateEditTractorDetailsOpen">
          <v-icon left>edit</v-icon>Edit tractor details
        </v-btn>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row class="justify-center ma-2">No tractor details added</v-row>
      <v-row class="justify-center ma-2">
        <v-btn color="primary" rounded v-on:click="updateEditTractorDetailsOpen">
          <v-icon left>mdi-plus</v-icon>Add tractor details
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ShowTractorDetails",
  props: ["customer"],
  methods: {
    updateEditTractorDetailsOpen: function() {
      this.$emit("update:editTractorDetailsOpen", true);
    }
  }
};
</script>
