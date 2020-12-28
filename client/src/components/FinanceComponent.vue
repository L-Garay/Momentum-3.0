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
          <div class="col">
            <p>Trending News</p>
          </div>
          <div class="col-10 newsTitles">
            <p v-for="news in financeNews" :key="news.title">
              {{ news.title }}
            </p>
          </div>
          <div class="col pagination">
            <div class="left">Left</div>
            <div class="right">Right</div>
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
    return {};
  },
  mounted() {
    // this.$store.dispatch('getFinanceNews');
  },
  computed: {
    financeNews() {
      return this.$store.state.firstFinanceNews;
    },
  },
  methods: {},
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
}
.newsSection {
  display: flex;
  flex-direction: column;
  border-left: 1pt solid white;
}
.newsTitles {
  font-size: 13px;
  max-height: 375px;
  overflow-y: auto;
}
.pagination {
  display: flex;
}
</style>
