<template>
  <div v-if="customer!= null">
    <v-form v-model="valid" ref="form" v-on:submit.prevent="editFinalCalculation">
      <v-container>
        <v-row>
          <v-chip class="ml-2 mr-2">
            <v-icon left color="accent">mdi-calculator</v-icon>Final Calculation
          </v-chip>
        </v-row>
        <v-row class="mt-2">
          <v-col v-for="field in fields" cols="6" md="2" :key="field.name" class="mb-n1">
            <v-text-field
              v-model="field.value"
              dense
              :rules="inputRules"
              :disabled="loading"
              :label="field.name"
              :type="field.type"
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
            v-on:click="editFinalCalculation"
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
  name: "EditFinalCalculation",
  props: ["customer"],
  data: function() {
    return {
      fields: [
        { name: "Tractor cost", value: "", type: "number" },
        { name: "Hood", value: "", type: "number" },
        { name: "Bumper", value: "", type: "number" },
        { name: "Hitch", value: "", type: "number" },
        { name: "Insurance", value: "", type: "number" },
        { name: "Registration", value: "", type: "number" },
        { name: "Loan expenses", value: "", type: "number" },
        { name: "Rotar", value: "", type: "number" },
        { name: "Trailer", value: "", type: "number" },
        { name: "Cultivator", value: "", type: "number" },
        { name: "Thresher", value: "", type: "number" },
        { name: "Harvesters", value: "", type: "number" },
        { name: "Others", value: "", type: "number" },
        { name: "Total", value: "", type: "number" },
        { name: "Discount", value: "", type: "number" },
        { name: "Net cost", value: "", type: "number" },
        { name: "Village type", value: "", type: "text" },
        { name: "Buyer type", value: "", type: "text" },
        { name: "Old vehicle number", value: "", type: "text" },
        { name: "Brand name", value: "", type: "text" },
        { name: "Model", value: "", type: "text" },
        { name: "Manufacture year", value: "", type: "text" },
        { name: "Tax upto", value: "", type: "text" },
        { name: "Fitness upto", value: "", type: "text" },
        { name: "Insurance upto", value: "", type: "text" },
        { name: "Vehicle price", value: "", type: "number" },
        { name: "Paper cost", value: "", type: "number" },
        { name: "Total cost", value: "", type: "number" },
        { name: "Party account credit", value: "", type: "number" },
        { name: "Old vehicle sold to", value: "", type: "text" },
        { name: "Sale price", value: "", type: "number" },
        { name: "Old tractor discount", value: "", type: "number" }
      ],
      valid: false,
      loading: false,
      inputRules: [
        v => !!v || "This field cannot be empty",
      ]
    };
  },
  created: function() {
    if (this.customer.finalCalculation != null) {
      this.fields[0].value = this.customer.finalCalculation.tractorCost;
      this.fields[1].value = this.customer.finalCalculation.hood;
      this.fields[2].value = this.customer.finalCalculation.bumper;
      this.fields[3].value = this.customer.finalCalculation.hitch;
      this.fields[4].value = this.customer.finalCalculation.insurance;
      this.fields[5].value = this.customer.finalCalculation.registration;
      this.fields[6].value = this.customer.finalCalculation.loanExp;
      this.fields[7].value = this.customer.finalCalculation.rotar;
      this.fields[8].value = this.customer.finalCalculation.trailer;
      this.fields[9].value = this.customer.finalCalculation.cultivator;
      this.fields[10].value = this.customer.finalCalculation.thresher;
      this.fields[11].value = this.customer.finalCalculation.harvesters;
      this.fields[12].value = this.customer.finalCalculation.others;
      this.fields[13].value = this.customer.finalCalculation.total;
      this.fields[14].value = this.customer.finalCalculation.discount;
      this.fields[15].value = this.customer.finalCalculation.netCost;
      this.fields[16].value = this.customer.finalCalculation.villageType;
      this.fields[17].value = this.customer.finalCalculation.buyerType;
      this.fields[18].value = this.customer.finalCalculation.oldVehicleNumber;
      this.fields[19].value = this.customer.finalCalculation.brandName;
      this.fields[20].value = this.customer.finalCalculation.model;
      this.fields[21].value = this.customer.finalCalculation.manufactureYear;
      this.fields[22].value = this.customer.finalCalculation.taxUpto;
      this.fields[23].value = this.customer.finalCalculation.fitnessUpto;
      this.fields[24].value = this.customer.finalCalculation.insuranceUpto;
      this.fields[25].value = this.customer.finalCalculation.vehiclePrice;
      this.fields[26].value = this.customer.finalCalculation.paperCost;
      this.fields[27].value = this.customer.finalCalculation.totalCost;
      this.fields[28].value = this.customer.finalCalculation.partyAccountCredit;
      this.fields[29].value = this.customer.finalCalculation.oldVehicleSoldTo;
      this.fields[30].value = this.customer.finalCalculation.salePrice;
      this.fields[31].value = this.customer.finalCalculation.discountOldTractor;
    }
  },
  methods: {
    editFinalCalculation: function() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$store
          .dispatch("editFinalCalculation", {
            customerId: this.customer.customerId,
            payload: {
              tractorCost: this.fields[0].value,
              hood: this.fields[1].value,
              bumper: this.fields[2].value,
              hitch: this.fields[3].value,
              insurance: this.fields[4].value,
              registration: this.fields[5].value,
              loanExp: this.fields[6].value,
              rotar: this.fields[7].value,
              trailer: this.fields[8].value,
              cultivator: this.fields[9].value,
              thresher: this.fields[10].value,
              harvesters: this.fields[11].value,
              others: this.fields[12].value,
              total: this.fields[13].value,
              discount: this.fields[14].value,
              netCost: this.fields[15].value,
              villageType: this.fields[16].value,
              buyerType: this.fields[17].value,
              oldVehicleNumber: this.fields[18].value,
              brandName: this.fields[19].value,
              model: this.fields[20].value,
              manufactureYear: this.fields[21].value,
              taxUpto: this.fields[22].value,
              fitnessUpto: this.fields[23].value,
              insuranceUpto: this.fields[24].value,
              vehiclePrice: this.fields[25].value,
              paperCost: this.fields[26].value,
              totalCost: this.fields[27].value,
              partyAccountCredit: this.fields[28].value,
              oldVehicleSoldTo: this.fields[29].value,
              salePrice: this.fields[30].value,
              discountOldTractor: this.fields[31].value
            }
          })
          .then(response => {
            if (response.error) {
              this.$store.commit("setSnackbarText", {
                snackbarText: "Error editing final calculation"
              });
              this.$store.commit("setSnackbarVisibility", {
                visible: true
              });
            } else {
              this.$store.commit("setSnackbarText", {
                snackbarText: "Successfully edited final calculation"
              });
              this.$store.commit("setSnackbarVisibility", {
                visible: true
              });
              this.$parent.changeCustomer(response.body);
              this.$emit("update:editFinalCalculationOpen", false);
            }
          });
      }
    },
    close: function() {
      this.$emit("update:editFinalCalculationOpen", false);
    }
  }
};
</script>
