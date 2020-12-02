<template>
  <div class="quote">
    <p>{{ Quote.quote }}</p>
    <p>Author: {{ Quote.author }}</p>
  </div>
</template>

<script>
export default {
  name: 'Quote',
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch('getQuote');
  },
  computed: {
    Quote() {
      return this.$store.state.quote;
    },
  },
};
</script>

<style scoped>
.quote {
  text-align: center;
}
p {
  font-size: 20px;
  color: white;
  text-shadow: 0px 0px 30px black;
}
p:first-child {
  margin: 0;
  text-shadow: 3px 3px 5px black;
}
p:last-child {
  opacity: 0.7;
}
p:last-child:hover {
  opacity: 1;
  text-shadow: 3px 3px 5px black;
}
@media (max-width: 1024px) {
  p {
    font-size: 15px;
  }
}
</style>
