<template>
  <div class="newsSection">
    <div class="input">
      <input
        type="text"
        placeholder="New search"
        v-model="news.query"
        v-autowidth="{ maxWidth: '400px', minWidth: '70px', comfortZone: 20 }"
      />
      <i class="fas fa-search" @click="submitNewsQuery"></i>
    </div>
    <div class="content">
      <div class="pictures">
        <div
          v-for="news in NewsWithPicture"
          :key="news.name"
          class="pictureContent"
        >
          <a :href="news.webSearchUrl" target="_blank">
            <img
              v-if="fetchedNewNews"
              :src="news.image.url"
              alt="No image available"
            />
            <img v-else :src="news.image.url" alt="No image available" />
            <h5>{{ news.name }}</h5>
          </a>
        </div>
      </div>
      <div class="textContent">
        <ul>
          <li v-for="news in NewsNoPicture" :key="news.name">
            <a :href="news.webSearchUrl" target="_blank"
              ><p>{{ news.name }}</p></a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);
export default {
  name: 'NewsCompoenent',
  data() {
    return {
      fetchedNewNews: false,
      news: {
        query: '',
      },
    };
  },
  mounted() {
    // this.$store.dispatch('getNews');
  },
  computed: {
    NewsWithPicture() {
      return this.$store.state.news.newsWithPicture;
    },
    NewsNoPicture() {
      return this.$store.state.news.newsNoPicture;
    },
  },
  methods: {
    submitNewsQuery() {
      if (this.news.query !== '') {
        this.$store.dispatch('getNewNews', this.news);
        this.news.query = '';
      } else {
        this.news.query = '';
      }
      this.fetchedNewNews = true;
      console.log(this.fetchedNewNews);
    },
  },
};
</script>

<style scoped>
.newsSection {
  width: 890px;
  height: 500px;
  background-color: rgba(169, 169, 169, 0.596);
  color: white;
}
.input {
  text-align: center;
  margin: 10px 0;
}
.input input {
  margin-right: 10px;
}
.fas:hover {
  cursor: pointer;
}
.content {
  display: flex;
  flex-wrap: wrap;
  height: 450px;
}
.pictures {
  width: 550px;
  display: flex;
  flex-wrap: wrap;
  max-height: 440px;
  overflow-y: auto;
}
.pictureContent {
  width: 170px;
}
.pictureContent h5 {
  max-width: 140px;
  font-size: 17px;
}
.textContent {
  max-height: 440px;
  width: 275px;
  padding-right: 10px;
  overflow-y: auto;
}
a {
  color: white;
  text-shadow: 1pt 1pt 2pt black;
}
a:hover {
  color: blue;
  text-shadow: 1pt 1pt 2pt white;
}
</style>
