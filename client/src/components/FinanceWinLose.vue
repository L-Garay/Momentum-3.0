<template>
  <div class="winnersLosers">
    <div class="header">
      <h4>Day Winners and Losers</h4>
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
      return this.$store.state.financeWinnersLosers;
    },
  },
};
</script>

<style scoped>
/* Winners/Losers styling */
.header h4 {
  text-align: center;
  position: relative;
  padding-bottom: 5px;
}
.header h4::after {
  position: absolute;
  content: '';
  width: 60%;
  height: 2px;
  left: 20%;
  bottom: 0;
  background: white;
}
.winLoseTable {
  max-height: 400px;
  overflow-y: auto;
}
</style>
