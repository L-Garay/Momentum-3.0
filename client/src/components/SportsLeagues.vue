<template>
  <div>
    <h4>This is the tab where league data will be displayed.</h4>
    <h5>{{ leagueData.name }}</h5>
  </div>
</template>

<script>
export default {
  name: 'SportsLeagues',
  props: ['leagueData'],
  components: {},
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style scoped></style>
