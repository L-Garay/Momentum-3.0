<template>
  <div class="financeSection">
    <div class="headerSection">
      <!-- this is where we can put elements that when clicked will display different data in the main 'view' area (i.e. winners/losers, trending, most active, etc ). -->
      <div class="navbar">
        <p>Winners/Losers</p>
        <p>Trending</p>
        <p>Most Active</p>
        <p>Heads Up</p>
      </div>
    </div>
    <div class="bodySection">
      <div class="mainViewSection">
        <!-- This is where the data for the different header elements/topics will appear. This is also where the data for a specific stock will be displayed when a user clicks on a stock (may end up creating a little mini component to handle specified stock data) -->
        <div class="winnersLosers">
          <div class="mainSectionHeader">
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
      </div>
      <div class="newsSection container-fluid">
        <!-- This is where the list for the news articles will go, goal is to create a mini-pagination effect to loop through articles -->
        <div class="row">
          <div class="col newsHeader">
            <h4>Trending News</h4>
          </div>
          <div class="col-12 newsTitles">
            <ul>
              <li v-for="news in financeNews" :key="news.title">
                <a :href="news.link" target="_blank">
                  {{ news.title }}
                </a>
              </li>
            </ul>
          </div>
          <div class="col pagination">
            <div class="left" @click="previousNews" v-if="firstNews == false">
              <i class="fas fa-chevron-left"></i> Previous
            </div>
            <div class="unable" v-else-if="firstNews == true">
              <i class="fas fa-chevron-left"></i> Previous
            </div>
            <div class="right" @click="nextNews" v-if="lastNews == false">
              Next <i class="fas fa-chevron-right"></i>
            </div>
            <div class="unable" v-else-if="lastNews == true">
              Next <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FinanceTable from '@/components/FinanceWinLoseTable.vue';
export default {
  name: 'FinanceCompoenent',
  components: {
    FinanceTable,
  },
  data() {
    return {
      firstNews: true,
      lastNews: false,
    };
  },
  mounted() {
    // this.$store.dispatch('getFinanceNews');
  },
  computed: {
    financeNews() {
      this.checkNews();
      return this.$store.state.currentFinanceNews;
    },
    financeWinners() {
      return this.$store.state.financeWinners;
    },
    financeLosers() {
      return this.$store.state.financeLosers;
    },
    financeWinnersLosers() {
      return this.$store.state.financeWinnersLosers;
    },
  },
  methods: {
    checkNews() {
      if (this.$store.state.currentFinanceNews.length < 10) {
        this.lastNews = true;
        this.firstNews = false;
        console.log(this.firstNews);
        console.log(this.lastNews);
      } else if (
        this.$store.state.currentFinanceNews[0] ==
        this.$store.state.allFinanceNews[0]
      ) {
        this.firstNews = true;
        this.lastNews = false;
        console.log(this.firstNews);
        console.log(this.lastNews);
      }
    },
    nextNews() {
      if (this.firstNews == true) {
        this.firstNews = false;
      }
      this.$store.dispatch('nextNews');
    },
    previousNews() {
      if (this.lastNews == true) {
        this.lastNews == false;
      }
      this.$store.dispatch('previousNews');
    },
  },
};
</script>

<style scoped>
.financeSection {
  width: 890px;
  height: 500px;
  background-color: rgba(169, 169, 169, 0.637);
}
.headerSection {
  border-bottom: 1pt solid white;
}
.navbar {
}
.bodySection {
  display: flex;
}
.mainViewSection {
  width: 600px;
}
.mainSectionHeader h4 {
  text-align: center;
  position: relative;
  padding-bottom: 5px;
}
.mainSectionHeader h4::after {
  position: absolute;
  content: '';
  width: 60%;
  height: 2px;
  left: 20%;
  bottom: 0;
  background: white;
}

/* Winners/Losers styling */
.winLoseTable {
  max-height: 400px;
  overflow-y: auto;
}

/* News section styling */
.newsSection {
  max-width: 250px;
  display: flex;
  flex-direction: column;
  border-left: 1pt solid white;
}
.newsHeader {
  text-align: center;
}
.newsHeader h4 {
  margin-bottom: 0;
  padding: 5px 0;
  border-bottom: 1pt solid white;
}
.newsTitles {
  font-size: 13px;
  max-height: 365px;
  overflow-y: auto;
}
ul {
  padding-left: 10px;
  margin-bottom: 5px;
}
li {
  margin: 4px 0;
}
a {
  color: white;
}
a:hover {
  color: white;
  text-decoration-color: blue;
  text-shadow: 1pt 1pt 2pt blue;
}
.pagination {
  display: flex;
  justify-content: space-between;
  border-top: 1pt solid white;
  padding: 5px 0 0 15px;
}
.left:hover,
.right:hover {
  cursor: pointer;
  color: lightgray;
}
.unable {
  color: gray;
}
.unable:hover {
  cursor: default;
}
</style>
