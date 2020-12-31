<template>
  <div class="undervalued">
    <div class="header">
      <h4>Potentially undervalued stocks</h4>
      <p>
        These are some stocks whose earnings have grown more than 25%, and have
        a relatively low Price-to-Earnings Ratio (which is good) which means
        that they may be currently undervalued.
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
          v-for="stock in Undervalued"
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
  name: 'FinanceUndervalued',
  components: {
    FinanceTable,
  },
  computed: {
    Undervalued() {
      return this.$store.state.finance.undervalued;
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
  font-size: 13px;
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
  width: 80px;
}
.undervaluedTable {
  max-height: 370px;
  overflow-y: auto;
}
</style>
