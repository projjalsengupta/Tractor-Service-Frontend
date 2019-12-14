<template>
  <v-navigation-drawer app color="secondary" v-model="drawerOpen"></v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",
  computed: {
    drawerOpen: {
      get: function() {
        return this.$store.state.isDrawerOpen;
      },
      set: function(value) {
        this.$store.commit("setIsDrawerOpen", {
          isDrawerOpen: value
        });
      }
    }
  }
};
</script>
