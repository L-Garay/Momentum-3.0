<template>
  <div class="winnersLosers">
    <div class="header">
      <h4>Day Winners and Losers</h4>
      <p>
        Some of the day's biggest movers, both positive and negative, based on
        the percent change of the price of the stock today compared to at
        closing yesterday.
      </p>
    </div>
    <div class="winLoseTable">
      <table>
        <tr>
          <th>Symbol</th>
          <th>Stock Name</th>
          <th>Current Price</th>
          <th>Day High</th>
          <th>Day Low</th>
          <th>% Change</th>
          <th>Exchange Name</th>
        </tr>
        <finance-table
          v-for="stock in financeWinnersLosers"
          :key="stock.symbol"
          :stockData="stock"
        />
      </table>
    </div>
  </div>
</template>

<script>
import FinanceTable from '@/components/FinanceWinLoseTable.vue';
export default {
  name: 'FinanceWinLose',
  components: { FinanceTable },
  computed: {
    financeWinnersLosers() {
      return this.$store.state.finance.financeWinnersLosers;
    },
  },
};
</script>

<style scoped>
/* Winners/Losers styling */
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
.winLoseTable {
  max-height: 370px;
  overflow-y: auto;
}
</style>
