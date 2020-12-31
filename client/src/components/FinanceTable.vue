<template>
  <tr>
    <td>{{ stockData.symbol }}</td>
    <td>{{ stockData.longName }}</td>
    <td>{{ stockData.regularMarketPrice.toFixed(2) }}</td>
    <td>{{ stockData.fiftyDayAverage.toFixed(2) }}</td>
    <td>{{ stockData.twoHundredDayAverage.toFixed(2) }}</td>
    <td class="range">
      {{ stockData.fiftyTwoWeekRange }}
    </td>
    <td>{{ stockData.epsTrailingTwelveMonths.toFixed(2) }}</td>
  </tr>
</template>

<script>
export default {
  name: 'FinanceTableComponent',
  props: ['stockData'],
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style scoped>
tr {
  border-top: 1pt solid black;
  border-bottom: 1pt solid black;
}
.range {
  font-size: 12px;
}
</style>
