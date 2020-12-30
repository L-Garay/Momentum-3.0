<template>
  <div class="financeSection">
    <div class="headerSection">
      <!-- this is where we can put elements that when clicked will display different data in the main 'view' area (i.e. winners/losers, trending, most active, etc ). -->
      <div class="navbar">
        <p @click="toggleWinLose">Winners/Losers</p>
        <p @click="toggleTrending">Trending</p>
        <p @click="toggleActive">Most Active</p>
        <p @click="toggleHeadsUp">Heads Up</p>
      </div>
    </div>
    <div class="bodySection">
      <div class="mainViewSection">
        <!-- NOTE the 'main view' area, where the different tabs' data will be displayed -->
        <finance-win-lose v-if="show.winLose" />
        <div v-else-if="show.trending" class="trending">
          <h5>trending</h5>
        </div>
        <div v-else-if="show.active" class="active">
          <h5>active</h5>
        </div>
        <div v-else-if="show.headsUp" class="headsUp">
          <h5>heads up</h5>
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
import FinanceWinLose from '@/components/FinanceWinLose.vue';

export default {
  name: 'FinanceCompoenent',
  components: {
    FinanceWinLose,
  },
  data() {
    return {
      firstNews: true,
      lastNews: false,
      show: {
        winLose: true,
        trending: false,
        active: false,
        headsUp: false,
      },
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
    toggleWinLose() {
      this.show.winLose = true;
      this.show.trending = false;
      this.show.active = false;
      this.show.headsUp = false;
    },
    toggleTrending() {
      this.show.winLose = false;
      this.show.trending = true;
      this.show.active = false;
      this.show.headsUp = false;
    },
    toggleActive() {
      this.show.winLose = false;
      this.show.trending = false;
      this.show.active = true;
      this.show.headsUp = false;
    },
    toggleHeadsUp() {
      this.show.winLose = false;
      this.show.trending = false;
      this.show.active = false;
      this.show.headsUp = true;
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
