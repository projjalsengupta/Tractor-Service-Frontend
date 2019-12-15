<template>
  <div v-if="customer!= null">
    <v-form v-model="valid" ref="form" v-on:submit.prevent="editTractorDetails">
      <v-container>
        <v-row>
          <v-chip class="ml-2 mr-2">
            <v-icon left color="accent">mdi-tractor</v-icon>Tractor details
          </v-chip>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="copyTractorDetails.tractorModelNo"
              :rules="tractorModelNoRules"
              :counter="30"
              :disabled="loading"
              label="Tractor model no."
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="copyTractorDetails.tractorEngineNo"
              :rules="tractorEngineNoRules"
              :counter="30"
              :disabled="loading"
              label="Tractor engine no."
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="copyTractorDetails.tractorChassisNo"
              :rules="tractorChassisNoRules"
              :counter="30"
              :disabled="loading"
              label="Tractor chassis no."
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
            v-on:click="editTractorDetails"
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
  name: "EditTractorDetails",
  props: ["customer"],
  data: function() {
    return {
      copyTractorDetails: {
        tractorModelNo: "",
        tractorEngineNo: "",
        tractorChassisNo: ""
      },
      valid: false,
      loading: false,
      tractorModelNoRules: [
        v => !!v || "Tractor model number is required",
        v => v.length <= 30 || "Tractor model number must be less than 30 characters"
      ],
      tractorEngineNoRules: [
        v => !!v || "Tractor engine number is required",
        v => v.length <= 30 || "Tractor engine number must be less than 30 characters"
      ],
      tractorChassisNoRules: [
        v => !!v || "Tractor chassis number is required",
        v => v.length <= 30 || "Tractor chassis number must be less than 30 characters"
      ]
    };
  },
  created: function() {
    if (this.customer.tractorDetails != null) {
      this.copyTractorDetails = this.customer.tractorDetails;
    }
  },
  methods: {
    editTractorDetails: function() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$store
          .dispatch("editTractorDetails", {
            customerId: this.customer.customerId,
            payload: {
              tractorModelNo: this.copyTractorDetails.tractorModelNo,
              tractorEngineNo: this.copyTractorDetails.tractorEngineNo,
              tractorChassisNo: this.copyTractorDetails.tractorChassisNo
            }
          })
          .then(response => {
            if (response.error) {
              this.$store.commit("setSnackbarText", {
                snackbarText: "Error editing tractor details"
              });
              this.$store.commit("setSnackbarVisibility", {
                visible: true
              });
            } else {
              this.$store.commit("setSnackbarText", {
                snackbarText: "Successfully edited tractor details"
              });
              this.$store.commit("setSnackbarVisibility", {
                visible: true
              });
              this.$emit("update:customer", response.body);
              this.$emit("update:editTractorDetailsOpen", false);
            }
          });
      }
    },
    close: function() {
      this.$emit("update:editTractorDetailsOpen", false);
    }
  }
};
</script>
