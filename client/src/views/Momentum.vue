<template>
  <div class="momentum" id="backgroundImg">
    <div class="container-fluid">
      <settings />
      <weather />
      <momentumQuote />
    </div>
  </div>
</template>

<script>
import Weather from '@/components/Weather.vue';
import momentumQuote from '@/components/MomentumQuote.vue';
import Settings from '@/components/MomentumSettings.vue';
export default {
  name: 'momentum',
  components: {
    Weather,
    momentumQuote,
    Settings,
  },
  data() {
    return {};
  },
  mounted() {
    // this.$store.dispatch('getPhoto');
  },
  computed: {
    // photo() {
    //   return this.$store.state.photo;
    // },
  },
};
</script>

<style>
#backgroundImg {
  background-size: cover;
  background-position: center;
  background-repeat: none;
}
</style>
