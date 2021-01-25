<template>
  <div class="financeTab">
    <div class="header">
      <h4>{{ componentData.title }}</h4>
      <p>
        {{ componentData.desc }}
      </p>
    </div>
    <div v-if="componentData.type == 'technology'" class="financeTable">
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
        <finance-table
          v-for="stock in Technology"
          :key="stock.symbol"
          :stockData="stock"
        />
      </table>
    </div>
    <div
      v-if="componentData.type == 'undervalued'"
      style="max-height: 342px; overflow-y: auto"
    >
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
        <finance-table
          v-for="stock in Undervalued"
          :key="stock.symbol"
          :stockData="stock"
        />
      </table>
    </div>
    <div
      v-if="componentData.type == 'growers'"
      style="max-height: 365px; overflow-y: auto"
    >
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
        <finance-table
          v-for="stock in Growers"
          :key="stock.symbol"
          :stockData="stock"
        />
      </table>
    </div>
  </div>
</template>

<script>
import FinanceTable from '@/components/Optional/News/Finance/FinanceTable.vue';
export default {
  name: 'FinanceTabs',
  props: ['componentData'],
  components: {
    FinanceTable,
  },
  computed: {
    Technology() {
      return this.$store.state.finance.technology;
    },
    Undervalued() {
      return this.$store.state.finance.undervalued;
    },
    Growers() {
      return this.$store.state.finance.growers;
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
.financeTable {
  max-height: 385px;
  overflow-y: auto;
}
</style>
