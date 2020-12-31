<template>
  <div class="financeSection">
    <div class="headerSection">
      <!-- this is where we can put elements that when clicked will display different data in the main 'view' area (i.e. winners/losers, trending, most active, etc ). -->
      <div class="navbar">
        <p @click="toggleWinLose">Winners/Losers</p>
        <p @click="toggleUndervalued">Undervalued</p>
        <p @click="toggleTechnology">Technology</p>
        <p @click="toggleGrowers">Growers</p>
      </div>
    </div>
    <div class="bodySection">
      <div class="mainViewSection">
        <!-- NOTE the 'main view' area, where the different tabs' data will be displayed -->
        <finance-win-lose v-if="show.winLose" />
        <finance-undervalued v-else-if="show.undervalued" />
        <finance-technology v-else-if="show.technology" />
        <finance-growers v-else-if="show.growers" />
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
import FinanceWinLose from '@/components/FinanceWinLose.vue';
import FinanceUndervalued from '@/components/FinanceUndervalued.vue';
import FinanceTechnology from '@/components/FinanceTechnology.vue';
import FinanceGrowers from '@/components/FinanceGrowers.vue';

export default {
  name: 'FinanceCompoenent',
  components: {
    FinanceWinLose,
    FinanceUndervalued,
    FinanceTechnology,
    FinanceGrowers,
  },
  data() {
    return {
      firstNews: true,
      lastNews: false,
      show: {
        winLose: true,
        undervalued: false,
        technology: false,
        growers: false,
      },
    };
  },
  mounted() {},
  computed: {
    financeNews() {
      this.checkNews();
      return this.$store.state.finance.currentFinanceNews;
    },
  },
  methods: {
    checkNews() {
      if (this.$store.state.finance.currentFinanceNews.length < 10) {
        this.lastNews = true;
        this.firstNews = false;
      } else if (
        this.$store.state.finance.currentFinanceNews[0] ==
        this.$store.state.finance.allFinanceNews[0]
      ) {
        this.firstNews = true;
        this.lastNews = false;
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
    toggleWinLose() {
      this.show.winLose = true;
      this.show.undervalued = false;
      this.show.technology = false;
      this.show.growers = false;
    },
    toggleUndervalued() {
      this.show.winLose = false;
      this.show.undervalued = true;
      this.show.technology = false;
      this.show.growers = false;
    },
    toggleTechnology() {
      this.show.winLose = false;
      this.show.undervalued = false;
      this.show.technology = true;
      this.show.growers = false;
    },
    toggleGrowers() {
      this.show.winLose = false;
      this.show.undervalued = false;
      this.show.technology = false;
      this.show.growers = true;
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
.navbar p {
  margin: 7px 0;
}
.navbar p:hover {
  cursor: pointer;
}
.bodySection {
  display: flex;
}
.mainViewSection {
  width: 600px;
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
