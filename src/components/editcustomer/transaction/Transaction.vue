<template>
  <div v-if="customer!= null">
    <div>
      <ShowFinalCalculation
        v-if="!editFinalCalculationOpen"
        :customer.sync="customer"
        :editFinalCalculationOpen.sync="editFinalCalculationOpen"
      />
      <EditFinalCalculation v-else :customer.sync="customer" :editFinalCalculationOpen.sync="editFinalCalculationOpen" />
    </div>
  </div>
</template>

<script>
import ShowFinalCalculation from "./ShowFinalCalculation.vue";
import EditFinalCalculation from "./EditFinalCalculation.vue";
export default {
  name: "Transaction",
  props: ["customer"],
  components: {
    ShowFinalCalculation,
    EditFinalCalculation
  },
  data: function() {
    return {
      editFinalCalculationOpen: false,
    };
  },
  methods: {
    changeCustomer: function(customer) {
        this.$emit("update:customer", customer);
    }
  }
};
</script>
