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
        <div class="fake">
          <h5>fake header for now</h5>
          <p>
            fake text for now. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Aliquid doloremque, possimus consequuntur
            accusantium ipsa architecto reiciendis pariatur voluptatibus? Cum
            voluptate in hic enim mollitia pariatur saepe ducimus molestias quo
            aut.
          </p>
        </div>
        <div class="fake2">
          <h4>kdjfkd</h4>
          <p>fake fake lorem</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae esse
            adipisci quis ea dolor, animi fugit dolore velit vel. Nam voluptas
            enim sapiente voluptatem dicta harum voluptatum minima similique
            nostrum. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Ipsa labore quis repellat fugiat sint, distinctio quae. Modi, animi!
            Magni libero repellendus quibusdam aperiam reprehenderit consequatur
            ipsam ipsa eos animi ipsum! Lorem ipsum, dolor sit amet.
          </p>
        </div>

        <!-- This is where the data for the different header elements/topics will appear. This is also where the data for a specific stock will be displayed when a user clicks on a stock (may end up creating a little mini component to handle specified stock data) -->
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
export default {
  name: 'FinanceCompoenent',
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
