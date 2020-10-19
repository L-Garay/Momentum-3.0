<template>
  <div class="momentum">
    <momentumNavbar />
    <momentumQuote />
  </div>
</template>

<script>
import momentumNavbar from "@/components/MomentumNavbar.vue";
import momentumQuote from "@/components/MomentumQuote.vue";
export default {
  name: "momentum",
  components: {
    momentumNavbar,
    momentumQuote
  }
};
</script>

<style>
</style>