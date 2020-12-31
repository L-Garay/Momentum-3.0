<template>
  <div class="undervalued">
    <div class="header">
      <h4>Technology Stocks</h4>
      <p>
        These are some techonology stocks whose earnings growth is greater than
        25%.
      </p>
    </div>
    <div class="undervaluedTable">
      <table>
        <tr>
          <th>Symbol</th>
          <th>Stock Name</th>
          <th>Current Price</th>
          <th>50d Avg</th>
          <th>200d Avg</th>
          <th class="range">52wk Rng</th>
          <th>52wk EPS</th>
        </tr>
        <!-- NOTE CHANGE ME BELOW -->
        <finance-table
          v-for="stock in Technology"
          :key="stock.symbol"
          :stockData="stock"
        />
      </table>
    </div>
  </div>
</template>

<script>
import FinanceTable from '@/components/FinanceTable.vue';
export default {
  name: 'FinanceTechnology',
  components: {
    FinanceTable,
  },
  computed: {
    Technology() {
      return this.$store.state.finance.technology;
    },
  },
};
</script>

<style scoped>
.header {
  text-align: center;
}
.header h4 {
  margin-bottom: 0;
}
.header p {
  position: relative;
  padding: 0 5px 5px 5px;
  font-size: 15px;
  margin-bottom: 3px;
}
.header p::after {
  position: absolute;
  content: '';
  width: 60%;
  height: 2px;
  left: 20%;
  bottom: 0;
  background: white;
}
.range {
  width: 90px;
}
.undervaluedTable {
  max-height: 385px;
  overflow-y: auto;
}
</style>
