<template>
  <div>
    <v-container v-if="customer!= null">
      <v-row>
        <v-chip class="ml-2 mr-2">
          <v-icon left color="accent">mdi-calculator</v-icon>Final Calculation
        </v-chip>
      </v-row>
      <v-row v-if="customer.finalCalculation != null">
        <v-col v-for="field in fields" cols="6" md="2" :key="field.name">
          <span class="caption blue--text">{{ field.name }}</span>
          <br />
          {{ field.value }}
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" md="3">No final calculation added</v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-btn
          class="ml-2 mr-2"
          large
          color="accent"
          rounded
          v-on:click="updateEditFinalCalculationOpen"
        >
          <v-icon left v-if="customer.finalCalculation != null">edit</v-icon>
          <v-icon v-else left>mdi-plus</v-icon>
          <span v-if="customer.finalCalculation != null">Edit</span>
          <span v-else>Add</span>
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ShowFinalCalculation",
  props: ["customer"],
  data: function() {
    return {
      fields: [
        {
          name: "Tractor cost",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.tractorCost
            : ""
        },
        {
          name: "Hood",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.hood
            : ""
        },
        {
          name: "Bumper",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.bumper
            : ""
        },
        {
          name: "Hitch",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.hitch
            : ""
        },
        {
          name: "Insurance",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.insurance
            : ""
        },
        {
          name: "Registration",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.registration
            : ""
        },
        {
          name: "Loan expenses",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.loanExp
            : ""
        },
        {
          name: "Rotar",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.rotar
            : ""
        },
        {
          name: "Trailer",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.trailer
            : ""
        },
        {
          name: "Cultivator",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.cultivator
            : ""
        },
        {
          name: "Thresher",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.thresher
            : ""
        },
        {
          name: "Harvesters",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.harvesters
            : ""
        },
        {
          name: "Others",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.others
            : ""
        },
        {
          name: "Total",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.total
            : ""
        },
        {
          name: "Discount",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.discount
            : ""
        },
        {
          name: "Net cost",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.netCost
            : ""
        },
        {
          name: "Village type",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.villageType
            : ""
        },
        {
          name: "Buyer type",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.buyerType
            : ""
        },
        {
          name: "Old vehicle number",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.oldVehicleNumber
            : ""
        },
        {
          name: "Brand name",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.brandName
            : ""
        },
        {
          name: "Model",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.model
            : ""
        },
        {
          name: "Manufacture year",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.manufactureYear
            : ""
        },
        {
          name: "Tax upto",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.taxUpto
            : ""
        },
        {
          name: "Fitness upto",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.fitnessUpto
            : ""
        },
        {
          name: "Insurance upto",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.insuranceUpto
            : ""
        },
        {
          name: "Vehicle price",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.vehiclePrice
            : ""
        },
        {
          name: "Paper cost",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.paperCost
            : ""
        },
        {
          name: "Total cost",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.totalCost
            : ""
        },
        {
          name: "Party account credit",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.partyAccountCredit
            : ""
        },
        {
          name: "Old vehicle sold to",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.oldVehicleSoldTo
            : ""
        },
        {
          name: "Sale price",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.salePrice
            : ""
        },
        {
          name: "Old tractor discount",
          value: this.customer.finalCalculation
            ? this.customer.finalCalculation.discountOldTractor
            : ""
        }
      ]
    };
  },
  methods: {
    updateEditFinalCalculationOpen: function() {
      this.$emit("update:editFinalCalculationOpen", true);
    }
  }
};
</script>
