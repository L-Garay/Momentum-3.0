<template>
  <tr>
    <td>{{ stockData.symbol }}</td>
    <td>{{ stockData.longName }}</td>
    <td>{{ stockData.regularMarketPrice }}</td>
    <td>{{ stockData.regularMarketDayHigh }}</td>
    <td>{{ stockData.regularMarketDayLow }}</td>
    <td :class="{ positive: isPositive, negative: !isPositive }">
      {{ stockData.regularMarketChangePercent }}
    </td>
    <td>{{ stockData.fullExchangeName }}</td>
  </tr>
</template>

<script>
export default {
  name: 'WinLoseTableComponent',
  props: ['stockData'],
  data() {
    return {
      isPositive: false,
    };
  },
  mounted() {
    if (this.stockData.positive == true) {
      this.isPositive = true;
    } else {
      this.isPositive = false;
    }
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
tr {
  border-top: 1pt solid black;
  border-bottom: 1pt solid black;
}
.positive {
  color: green;
}
.negative {
  color: red;
}
</style>
