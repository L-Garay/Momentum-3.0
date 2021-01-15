<template>
  <div class="utilitiesComponent">
    <div class="content">
      <div class="header">
        <h5>This is the utilities component</h5>
      </div>
      <div class="mainSection">
        <p>this is the main section</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UtilitiesComponent',
  components: {},
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style scoped>
.utilitiesComponent {
  background-color: rgba(245, 245, 245, 0.815);
  border: 1pt solid black;
  width: 575px;
  height: 450px;
  position: absolute;
  z-index: 5;
  bottom: 50px;
  left: 10px;
}
</style>
