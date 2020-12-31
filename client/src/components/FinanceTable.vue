<template>
  <tr>
    <td>{{ stockData.symbol }}</td>
    <td>{{ stockData.longName }}</td>
    <td>{{ stockData.regularMarketPrice }}</td>
    <td>{{ stockData.fiftyDayAverage }}</td>
    <td>{{ stockData.twoHundredDayAverage }}</td>
    <td class="range">
      {{ stockData.fiftyTwoWeekRange }}
    </td>
    <td>{{ stockData.epsTrailingTwelveMonths }}</td>
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
